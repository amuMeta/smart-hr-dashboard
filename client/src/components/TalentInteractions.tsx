import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Download, Upload, MessageSquare, FileText, Eye } from 'lucide-react';

/**
 * EmployeeDetailModal Component
 * Design: Detailed employee profile view with intervention options
 */

interface EmployeeDetail {
  id: string;
  name: string;
  position: string;
  department: string;
  riskScore: number;
  satisfactionScore: number;
  growthPotential: number;
  yearsInCompany: number;
  lastReviewDate: string;
  nextPromotionDate?: string;
  interventions: string[];
}

interface EmployeeDetailModalProps {
  employee: EmployeeDetail;
  onClose: () => void;
  onExport: (employeeId: string) => void;
  onIntervene: (employeeId: string, interventionType: string) => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  onClose,
  onExport,
  onIntervene,
}) => {
  const [selectedIntervention, setSelectedIntervention] = useState<string>('');

  const interventionOptions = [
    { id: 'communication', label: '安排1对1沟通', icon: '💬' },
    { id: 'career_development', label: '职业发展规划', icon: '📈' },
    { id: 'compensation', label: '薪资福利调整', icon: '💰' },
    { id: 'training', label: '培训计划推荐', icon: '🎓' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GlassCard variant="cyan" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <GlassCardHeader
          title={employee.name}
          subtitle={`${employee.position} · ${employee.department}`}
        />
        <GlassCardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-xs text-muted-foreground">离职风险</p>
              <p className="text-2xl font-bold text-neon-cyan">{employee.riskScore}</p>
            </div>
            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-xs text-muted-foreground">满意度</p>
              <p className="text-2xl font-bold text-neon-purple">{employee.satisfactionScore}</p>
            </div>
            <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-xs text-muted-foreground">成长潜力</p>
              <p className="text-2xl font-bold text-neon-pink">{employee.growthPotential}</p>
            </div>
            <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-xs text-muted-foreground">工作年限</p>
              <p className="text-2xl font-bold text-neon-cyan">{employee.yearsInCompany}年</p>
            </div>
          </div>

          {/* Intervention Actions */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">干预措施</p>
            <div className="space-y-2">
              {interventionOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedIntervention(option.id);
                    onIntervene(employee.id, option.id);
                  }}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    selectedIntervention === option.id
                      ? 'bg-neon-cyan/20 border-neon-cyan/50'
                      : 'bg-neon-cyan/10 border-neon-cyan/30 hover:bg-neon-cyan/15'
                  }`}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span className="text-sm font-semibold text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Communication Template */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">沟通模板</p>
            <textarea
              className="w-full h-32 p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              placeholder="根据选择的干预措施，自动生成沟通建议..."
              defaultValue={`亲爱的${employee.name}，\n\n我们注意到您最近的工作表现和职业发展需求。我们很重视您在公司的贡献，希望能为您提供更好的发展机会。\n\n让我们安排一次沟通，讨论您的职业目标和公司能提供的支持。`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <GlassButton
              variant="primary"
              onClick={() => onExport(employee.id)}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              导出成长路径
            </GlassButton>
            <GlassButton variant="ghost" onClick={onClose} className="flex-1">
              关闭
            </GlassButton>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

/**
 * BulkEmployeeUploadCard Component
 * Design: Upload employee data for batch analysis
 */

interface BulkUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export const BulkEmployeeUploadCard: React.FC<BulkUploadProps> = ({
  onUpload,
  isLoading = false,
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
        title="批量员工数据导入"
        subtitle="上传CSV或Excel文件进行批量分析"
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
              : 'border-neon-purple bg-neon-purple/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground mb-1">
            拖拽文件到此处或点击上传
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            支持 CSV, Excel (.xlsx, .xls) 格式
          </p>
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            {isLoading ? '处理中...' : '选择文件'}
          </GlassButton>
        </div>

        {/* Template Download */}
        <div className="mt-4 p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
          <p className="text-sm font-semibold text-foreground mb-2">下载模板</p>
          <GlassButton variant="ghost" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            下载Excel模板
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ExportGrowthPathCard Component
 * Design: Export employee growth path as PDF
 */

interface ExportGrowthPathProps {
  employeeId: string;
  employeeName: string;
  onExport: (format: 'pdf' | 'excel') => void;
  isExporting?: boolean;
}

export const ExportGrowthPathCard: React.FC<ExportGrowthPathProps> = ({
  employeeId,
  employeeName,
  onExport,
  isExporting = false,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="导出成长路径"
        subtitle={`为 ${employeeName} 生成个性化发展计划`}
        icon={<FileText className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div className="space-y-3">
          <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-sm font-semibold text-foreground mb-2">包含内容</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ 当前技能评估</li>
              <li>✓ 晋升路径规划</li>
              <li>✓ 推荐培训计划</li>
              <li>✓ 6-12个月发展目标</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GlassButton
              variant="primary"
              onClick={() => onExport('pdf')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1" />
              PDF
            </GlassButton>
            <GlassButton
              variant="secondary"
              onClick={() => onExport('excel')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Excel
            </GlassButton>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * RiskInterventionTemplateCard Component
 * Design: Pre-built communication templates for at-risk employees
 */

interface InterventionTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
}

interface RiskInterventionProps {
  templates: InterventionTemplate[];
  onSelectTemplate: (templateId: string) => void;
}

export const RiskInterventionTemplateCard: React.FC<RiskInterventionProps> = ({
  templates,
  onSelectTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="风险干预模板"
        subtitle="预设沟通模板快速应对离职风险"
        icon={<MessageSquare className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              setSelectedTemplate(template.id);
              onSelectTemplate(template.id);
            }}
            className={`w-full p-3 rounded-lg border text-left transition-all ${
              selectedTemplate === template.id
                ? 'bg-neon-pink/20 border-neon-pink/50'
                : 'bg-neon-pink/10 border-neon-pink/30 hover:bg-neon-pink/15'
            }`}
          >
            <p className="text-sm font-semibold text-foreground">{template.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
          </button>
        ))}

        {selectedTemplate && (
          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
            <p className="text-xs font-semibold text-foreground mb-2">模板预览</p>
            <textarea
              className="w-full h-24 p-2 bg-input border border-border rounded text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink"
              readOnly
              value={templates.find((t) => t.id === selectedTemplate)?.template || ''}
            />
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};
