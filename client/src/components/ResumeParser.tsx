import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Upload, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { parseResumeFile, ResumeProfile } from '@/lib/resumeParser';

/**
 * ResumeUploadParserCard Component
 * Design: Upload and parse resume with AI extraction
 */

interface ResumeUploadParserProps {
  onParsed: (profile: ResumeProfile) => void;
  isLoading?: boolean;
}

export const ResumeUploadParserCard: React.FC<ResumeUploadParserProps> = ({
  onParsed,
  isLoading = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStatus, setParseStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setParseStatus('error');
      setErrorMessage('仅支持 PDF 和 Word 文档格式');
      setTimeout(() => setParseStatus('idle'), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setParseStatus('error');
      setErrorMessage('文件大小不能超过 5MB');
      setTimeout(() => setParseStatus('idle'), 3000);
      return;
    }

    setIsParsing(true);
    setParseStatus('parsing');

    try {
      const profile = await parseResumeFile(file);
      setParseStatus('success');
      onParsed(profile);

      // Reset status after 2 seconds
      setTimeout(() => setParseStatus('idle'), 2000);
    } catch (error) {
      setParseStatus('error');
      setErrorMessage('解析失败，请重试');
      setTimeout(() => setParseStatus('idle'), 3000);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="AI简历解析"
        subtitle="上传简历文件，自动提取关键信息"
        icon={<FileText className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`p-8 border-2 border-dashed rounded-lg transition-colors text-center cursor-pointer ${
            dragActive
              ? 'border-neon-cyan bg-neon-cyan/10'
              : 'border-neon-cyan bg-neon-cyan/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            className="hidden"
          />

          {parseStatus === 'parsing' && (
            <div className="flex flex-col items-center">
              <Loader className="w-8 h-8 text-neon-cyan animate-spin mb-2" />
              <p className="text-sm font-semibold text-foreground">正在解析简历...</p>
              <p className="text-xs text-muted-foreground mt-1">
                AI正在提取关键信息，请稍候
              </p>
            </div>
          )}

          {parseStatus === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-sm font-semibold text-foreground">解析成功！</p>
              <p className="text-xs text-muted-foreground mt-1">
                简历信息已提取，请查看详情
              </p>
            </div>
          )}

          {parseStatus === 'error' && (
            <div className="flex flex-col items-center">
              <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
              <p className="text-sm font-semibold text-foreground">解析失败</p>
              <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
            </div>
          )}

          {parseStatus === 'idle' && (
            <>
              <Upload className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground mb-1">
                拖拽简历到此处或点击上传
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                支持 PDF, Word (.doc, .docx) 格式，文件大小不超过 5MB
              </p>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing}
              >
                {isParsing ? '处理中...' : '选择简历'}
              </GlassButton>
            </>
          )}
        </div>

        {/* Supported Formats Info */}
        <div className="mt-4 p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
          <p className="text-xs font-semibold text-foreground mb-2">AI提取内容</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>✓ 个人信息</div>
            <div>✓ 教育背景</div>
            <div>✓ 工作经验</div>
            <div>✓ 技能清单</div>
            <div>✓ 证书资质</div>
            <div>✓ 语言能力</div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeParsingProgressCard Component
 * Design: Show parsing progress and extracted data
 */

interface ResumeParsingProgressProps {
  fileName: string;
  progress: number; // 0-100
  extractedFields: string[];
}

export const ResumeParsingProgressCard: React.FC<ResumeParsingProgressProps> = ({
  fileName,
  progress,
  extractedFields,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="解析进度"
        subtitle={`正在处理: ${fileName}`}
        icon={<Loader className="w-5 h-5 animate-spin" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">整体进度</span>
            <span className="text-sm font-bold text-neon-purple">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Extracted Fields */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">已提取字段</p>
          <div className="space-y-1">
            {extractedFields.map((field, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span>{field}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeParsingErrorCard Component
 * Design: Show parsing errors and recovery options
 */

interface ResumeParsingErrorProps {
  error: string;
  fileName: string;
  onRetry: () => void;
  onUploadNew: () => void;
}

export const ResumeParsingErrorCard: React.FC<ResumeParsingErrorProps> = ({
  error,
  fileName,
  onRetry,
  onUploadNew,
}) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="解析错误"
        subtitle={`文件: ${fileName}`}
        icon={<AlertCircle className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        <div className="p-3 bg-red-400/10 rounded-lg border border-red-400/30">
          <p className="text-sm text-red-400 font-semibold mb-1">错误信息</p>
          <p className="text-xs text-red-300">{error}</p>
        </div>

        <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
          <p className="text-sm font-semibold text-foreground mb-2">可能的原因</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 文件格式不支持或损坏</li>
            <li>• 文件内容无法识别</li>
            <li>• 文件大小超过限制</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GlassButton
            variant="primary"
            onClick={onRetry}
            className="text-xs"
          >
            重试
          </GlassButton>
          <GlassButton
            variant="secondary"
            onClick={onUploadNew}
            className="text-xs"
          >
            上传新文件
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
