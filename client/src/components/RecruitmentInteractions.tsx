import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Upload, Send, FileText, Users, CheckCircle } from 'lucide-react';

/**
 * ResumeUploadCard Component
 * Design: Upload and analyze resumes with AI matching
 */

interface ResumeUploadProps {
  jobPosition: string;
  onUpload: (file: File) => void;
  isAnalyzing?: boolean;
}

export const ResumeUploadCard: React.FC<ResumeUploadProps> = ({
  jobPosition,
  onUpload,
  isAnalyzing = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
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
      onUpload(files[0]);
    }
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="简历上传与匹配"
        subtitle={`岗位: ${jobPosition}`}
        icon={<Upload className="w-5 h-5" />}
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
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground mb-1">
            拖拽简历到此处或点击上传
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            支持 PDF, Word (.doc, .docx) 格式
          </p>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '分析中...' : '选择简历'}
          </GlassButton>
        </div>

        {/* Batch Upload Option */}
        <div className="mt-4 p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
          <p className="text-xs font-semibold text-foreground mb-2">批量上传</p>
          <p className="text-xs text-muted-foreground mb-2">
            一次上传多份简历进行批量匹配分析
          </p>
          <GlassButton variant="ghost" size="sm" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            批量上传
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * InterviewVideoUploadCard Component
 * Design: Upload interview video/audio for emotion analysis
 */

interface InterviewUploadProps {
  candidateName: string;
  onUpload: (file: File) => void;
  isAnalyzing?: boolean;
}

export const InterviewVideoUploadCard: React.FC<InterviewUploadProps> = ({
  candidateName,
  onUpload,
  isAnalyzing = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
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
      onUpload(files[0]);
    }
  };

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="面试视频分析"
        subtitle={`候选人: ${candidateName}`}
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
              ? 'border-neon-purple bg-neon-purple/10'
              : 'border-neon-purple bg-neon-purple/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            className="hidden"
          />
          <FileText className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground mb-1">
            上传面试视频或音频文件
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            支持 MP4, MOV, MP3, WAV 等格式
          </p>
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '分析中...' : '选择文件'}
          </GlassButton>
        </div>

        {/* Analysis Features */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-foreground">AI分析内容</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-neon-purple/10 rounded border border-neon-purple/30">
              <p className="text-xs text-foreground">😊 情绪识别</p>
            </div>
            <div className="p-2 bg-neon-purple/10 rounded border border-neon-purple/30">
              <p className="text-xs text-foreground">🎯 能力评估</p>
            </div>
            <div className="p-2 bg-neon-purple/10 rounded border border-neon-purple/30">
              <p className="text-xs text-foreground">💬 表达能力</p>
            </div>
            <div className="p-2 bg-neon-purple/10 rounded border border-neon-purple/30">
              <p className="text-xs text-foreground">🤝 文化匹配</p>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * BulkOfferSendCard Component
 * Design: Send offers or interview invitations in bulk
 */

interface BulkActionProps {
  selectedCandidates: number;
  onSendOffers: () => void;
  onSendInvitations: () => void;
  isProcessing?: boolean;
}

export const BulkOfferSendCard: React.FC<BulkActionProps> = ({
  selectedCandidates,
  onSendOffers,
  onSendInvitations,
  isProcessing = false,
}) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="批量操作"
        subtitle={`已选择 ${selectedCandidates} 位候选人`}
        icon={<Users className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {/* Offer Template */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">发送Offer</p>
          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 mb-2">
            <textarea
              className="w-full h-20 p-2 bg-input border border-border rounded text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink"
              placeholder="自定义Offer内容..."
              defaultValue="尊敬的候选人，\n\n我们很高兴为您提供职位offer。详情请见附件。"
            />
          </div>
          <GlassButton
            variant="primary"
            onClick={onSendOffers}
            disabled={isProcessing || selectedCandidates === 0}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            发送Offer ({selectedCandidates})
          </GlassButton>
        </div>

        {/* Interview Invitation */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">面试邀请</p>
          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 mb-2">
            <textarea
              className="w-full h-20 p-2 bg-input border border-border rounded text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink"
              placeholder="自定义邀请内容..."
              defaultValue="感谢您的申请。我们邀请您参加下一轮面试。请选择您方便的时间。"
            />
          </div>
          <GlassButton
            variant="secondary"
            onClick={onSendInvitations}
            disabled={isProcessing || selectedCandidates === 0}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            发送邀请 ({selectedCandidates})
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * RecruitmentMetricsExportCard Component
 * Design: Export recruitment analytics
 */

interface ExportRecruitmentProps {
  onExport: (format: 'pdf' | 'excel') => void;
  isExporting?: boolean;
}

export const RecruitmentMetricsExportCard: React.FC<ExportRecruitmentProps> = ({
  onExport,
  isExporting = false,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="招聘报表导出"
        subtitle="生成招聘效能分析报告"
        icon={<FileText className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div className="space-y-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-sm font-semibold text-foreground mb-2">报告包含</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ 招聘漏斗分析</li>
              <li>✓ 候选人质量评分</li>
              <li>✓ 招聘周期统计</li>
              <li>✓ 成本效益分析</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GlassButton
              variant="primary"
              onClick={() => onExport('pdf')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              PDF
            </GlassButton>
            <GlassButton
              variant="secondary"
              onClick={() => onExport('excel')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              Excel
            </GlassButton>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
