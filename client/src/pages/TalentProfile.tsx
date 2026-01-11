import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from '@/components/GlassCard';
import {
  EmployeeDetailModal,
  BulkEmployeeUploadCard,
  ExportGrowthPathCard,
  RiskInterventionTemplateCard,
} from '@/components/TalentInteractions';
import { EmployeeEmotionCard } from '@/components/EmotionAnalysis';
import { ResumeUploadParserCard } from '@/components/ResumeParser';
import {
  ResumeProfileHeaderCard,
  ResumeAIAnalysisCard,
  ResumeSkillsCard,
  ResumeExperienceCard,
  ResumeEducationCard,
  ResumePositionMatchCard,
} from '@/components/ResumeProfileDisplay';
import { ResumeProfile } from '@/lib/resumeParser';

/**
 * TalentProfile Page
 * Design: Complete talent profile management with interactive features
 */

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  riskScore: number;
  satisfactionScore: number;
  growthPotential: number;
  yearsInCompany: number;
  lastReviewDate: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: '张三',
    position: '高级工程师',
    department: '工程部',
    riskScore: 82,
    satisfactionScore: 65,
    growthPotential: 85,
    yearsInCompany: 4,
    lastReviewDate: '2024-01-05',
  },
  {
    id: '2',
    name: '李四',
    position: '产品经理',
    department: '产品部',
    riskScore: 45,
    satisfactionScore: 78,
    growthPotential: 72,
    yearsInCompany: 3,
    lastReviewDate: '2024-01-08',
  },
];

const interventionTemplates = [
  {
    id: 'template1',
    title: '职业发展沟通',
    description: '针对有晋升潜力的员工',
    template: `亲爱的${'{name}'},\n\n我们注意到您在工作中表现出色。我们很想讨论您的职业发展机会和晋升路径。\n\n让我们安排一次沟通，探讨您的职业目标和我们能提供的支持。`,
  },
  {
    id: 'template2',
    title: '薪资调整建议',
    description: '针对高风险离职员工',
    template: `亲爱的${'{name}'},\n\n基于您的出色表现和市场数据，我们建议调整您的薪资待遇。\n\n我们重视您的贡献，希望通过改善薪资来留住您。`,
  },
  {
    id: 'template3',
    title: '培训计划推荐',
    description: '针对需要技能提升的员工',
    template: `亲爱的${'{name}'},\n\n我们为您推荐了一些培训课程，以帮助您提升技能。\n\n这些课程将有助于您的职业发展和晋升。`,
  },
];

export default function TalentProfile() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState(mockEmployees);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedResume, setParsedResume] = useState<ResumeProfile | null>(null);
  const [showResumeParser, setShowResumeParser] = useState(false);

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setTimeout(() => {
      console.log('File uploaded:', file.name);
      setIsUploading(false);
    }, 2000);
  };

  const handleExport = (employeeId: string) => {
    console.log('Exporting growth path for employee:', employeeId);
  };

  const handleIntervene = (employeeId: string, interventionType: string) => {
    console.log('Intervention:', employeeId, interventionType);
  };

  const handleSelectTemplate = (templateId: string) => {
    console.log('Selected template:', templateId);
  };

  const handleResumeParsed = (profile: ResumeProfile) => {
    setParsedResume(profile);
  };

  const handleDownloadResume = () => {
    console.log('Downloading resume...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">人才画像管理</h1>
        <p className="text-muted-foreground">
          查看员工详细信息、管理离职风险、规划职业发展路径、AI简历解析
        </p>
      </div>

      {/* AI Resume Parser Section */}
      {!parsedResume && !showResumeParser && (
        <GlassCard variant="purple">
          <GlassCardHeader
            title="AI简历解析"
            subtitle="快速上传和分析候选人简历"
          />
          <GlassCardContent>
            <p className="text-sm text-muted-foreground mb-4">
              使用AI技术自动提取简历中的关键信息，包括教育背景、工作经验、技能等，快速生成人才画像。
            </p>
            <GlassButton
              variant="primary"
              onClick={() => setShowResumeParser(true)}
            >
              开始解析简历
            </GlassButton>
          </GlassCardContent>
        </GlassCard>
      )}

      {/* Resume Parser */}
      {showResumeParser && !parsedResume && (
        <ResumeUploadParserCard onParsed={handleResumeParsed} />
      )}

      {/* Parsed Resume Display */}
      {parsedResume && (
        <>
          <ResumeProfileHeaderCard
            profile={parsedResume}
            onDownload={handleDownloadResume}
          />
          <ResumeAIAnalysisCard profile={parsedResume} />
          <ResumeSkillsCard profile={parsedResume} />
          <ResumePositionMatchCard
            profile={parsedResume}
            jobTitle="高级工程师"
            requiredSkills={[
              'React',
              'Node.js',
              'TypeScript',
              'AWS',
              'Docker',
              'PostgreSQL',
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumeExperienceCard profile={parsedResume} />
            <ResumeEducationCard profile={parsedResume} />
          </div>
          <GlassCard variant="pink">
            <GlassCardHeader title="后续操作" />
            <GlassCardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">📧</p>
                  <p className="text-xs text-muted-foreground">发送邀请</p>
                </button>
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">💾</p>
                  <p className="text-xs text-muted-foreground">保存到库</p>
                </button>
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">📊</p>
                  <p className="text-xs text-muted-foreground">生成报告</p>
                </button>
                <button
                  onClick={() => setParsedResume(null)}
                  className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center"
                >
                  <p className="text-xs font-semibold text-foreground mb-1">➕</p>
                  <p className="text-xs text-muted-foreground">解析新简历</p>
                </button>
              </div>
            </GlassCardContent>
          </GlassCard>
        </>
      )}

      {/* Employee List */}
      <GlassCard variant="cyan">
        <GlassCardHeader title="员工列表" subtitle="点击查看详细信息" />
        <GlassCardContent>
          <div className="space-y-3">
            {employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => handleEmployeeSelect(employee)}
                className="w-full p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-colors text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {employee.position} · {employee.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">离职风险</p>
                    <p
                      className={`text-lg font-bold ${
                        employee.riskScore > 70
                          ? 'text-red-400'
                          : employee.riskScore > 50
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      {employee.riskScore}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={{
            ...selectedEmployee,
            interventions: [],
          }}
          onClose={() => setSelectedEmployee(null)}
          onExport={handleExport}
          onIntervene={handleIntervene}
        />
      )}

      {/* Main Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bulk Upload */}
        <BulkEmployeeUploadCard onUpload={handleFileUpload} isLoading={isUploading} />

        {/* Export Growth Path */}
        {selectedEmployee && (
          <ExportGrowthPathCard
            employeeId={selectedEmployee.id}
            employeeName={selectedEmployee.name}
            onExport={(format) => console.log('Export:', format)}
          />
        )}
      </div>

      {/* Risk Intervention Templates */}
      <RiskInterventionTemplateCard
        templates={interventionTemplates}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Emotion Metrics */}
      <EmployeeEmotionCard
        metrics={[
          { label: '工作满意度', value: 72, trend: 'up', trendValue: 5 },
          { label: '团队协作', value: 85, trend: 'stable' },
          { label: '工作压力', value: 65, trend: 'down', trendValue: 3 },
          { label: '职业发展', value: 78, trend: 'up', trendValue: 8 },
        ]}
        overallMood="neutral"
        moodDescription="团队整体情绪稳定，部分员工存在压力"
      />
    </div>
  );
}
