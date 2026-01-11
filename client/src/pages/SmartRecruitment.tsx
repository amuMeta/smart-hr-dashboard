import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from '@/components/GlassCard';
import {
  ResumeUploadCard,
  InterviewVideoUploadCard,
  BulkOfferSendCard,
  RecruitmentMetricsExportCard,
} from '@/components/RecruitmentInteractions';
import { ResumeMatchCard, InterviewAnalysisCard } from '@/components/RecruitmentAI';

/**
 * SmartRecruitment Page
 * Design: Complete recruitment management with AI features
 */

const mockCandidates = [
  {
    id: '1',
    name: '王小明',
    position: '高级工程师',
    matchScore: 92,
    matchReasons: ['5年相关经验', '精通React和Node.js', '有大型项目经验'],
    experience: 5,
  },
  {
    id: '2',
    name: '李晓红',
    position: '产品经理',
    matchScore: 78,
    matchReasons: ['3年产品经验', '有互联网背景'],
    mismatchReasons: ['缺少AI相关知识'],
    experience: 3,
  },
];

const mockInterviewAnalysis = {
  candidateName: '王小明',
  overallScore: 88,
  metrics: [
    { name: '表达能力', score: 85, comment: '清晰流畅' },
    { name: '技术深度', score: 92, comment: '回答深入' },
    { name: '团队协作', score: 80, comment: '有团队经验' },
    { name: '文化匹配', score: 88, comment: '价值观一致' },
  ],
  recommendation: 'strong_yes' as const,
};

export default function SmartRecruitment() {
  const [selectedCandidates, setSelectedCandidates] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResumeUpload = (file: File) => {
    console.log('Resume uploaded:', file.name);
  };

  const handleVideoUpload = (file: File) => {
    console.log('Interview video uploaded:', file.name);
  };

  const handleSendOffers = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Offers sent to', selectedCandidates, 'candidates');
      setIsProcessing(false);
    }, 2000);
  };

  const handleSendInvitations = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Invitations sent to', selectedCandidates, 'candidates');
      setIsProcessing(false);
    }, 2000);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log('Exporting recruitment metrics as', format);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">智能招聘助手</h1>
        <p className="text-muted-foreground">
          AI驱动的简历匹配、面试分析和候选人管理
        </p>
      </div>

      {/* Resume Upload and Matching */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeUploadCard
          jobPosition="高级工程师"
          onUpload={handleResumeUpload}
        />
        <ResumeMatchCard
          candidates={mockCandidates}
          jobTitle="高级工程师"
        />
      </div>

      {/* Interview Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InterviewVideoUploadCard
          candidateName="王小明"
          onUpload={handleVideoUpload}
        />
        <InterviewAnalysisCard
          candidateName={mockInterviewAnalysis.candidateName}
          overallScore={mockInterviewAnalysis.overallScore}
          metrics={mockInterviewAnalysis.metrics}
          recommendation={mockInterviewAnalysis.recommendation}
        />
      </div>

      {/* Bulk Actions */}
      <BulkOfferSendCard
        selectedCandidates={selectedCandidates}
        onSendOffers={handleSendOffers}
        onSendInvitations={handleSendInvitations}
        isProcessing={isProcessing}
      />

      {/* Export Metrics */}
      <RecruitmentMetricsExportCard onExport={handleExport} />

      {/* Recruitment KPIs */}
      <GlassCard variant="cyan">
        <GlassCardHeader title="招聘效能指标" />
        <GlassCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-xs text-muted-foreground mb-1">平均招聘周期</p>
              <p className="text-2xl font-bold text-neon-cyan">28</p>
              <p className="text-xs text-muted-foreground">天</p>
            </div>
            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-xs text-muted-foreground mb-1">单位招聘成本</p>
              <p className="text-2xl font-bold text-neon-purple">¥8500</p>
            </div>
            <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-xs text-muted-foreground mb-1">招聘质量</p>
              <p className="text-2xl font-bold text-neon-pink">86%</p>
            </div>
            <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-xs text-muted-foreground mb-1">Offer接受率</p>
              <p className="text-2xl font-bold text-neon-cyan">92%</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
