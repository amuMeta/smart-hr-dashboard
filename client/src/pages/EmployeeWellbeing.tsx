import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from '@/components/GlassCard';
import {
  SurveyCreationCard,
  FeedbackCollectionCard,
  SatisfactionImprovementCard,
  SentimentReportExportCard,
} from '@/components/EmotionInteractions';
import {
  EmployeeEmotionCard,
  SatisfactionPredictionCard,
  DepartmentSentimentCard,
} from '@/components/EmotionAnalysis';

/**
 * EmployeeWellbeing Page
 * Design: Employee experience and emotion analysis
 */

const mockImprovementSuggestions = [
  {
    factor: '工作环境',
    currentScore: 65,
    targetScore: 85,
    actions: ['改善办公室设施', '提供更多休息区域', '优化工作流程'],
  },
  {
    factor: '职业发展',
    currentScore: 72,
    targetScore: 88,
    actions: ['制定清晰的晋升路径', '提供培训机会', '定期职业规划讨论'],
  },
  {
    factor: '薪资待遇',
    currentScore: 70,
    targetScore: 82,
    actions: ['调整薪资结构', '增加福利待遇', '提供股权激励'],
  },
];

const mockDepartmentSentiment = [
  { name: '工程部', sentiment: 78, trend: 'up' as const, headcount: 45 },
  { name: '产品部', sentiment: 82, trend: 'up' as const, headcount: 20 },
  { name: '销售部', sentiment: 72, trend: 'stable' as const, headcount: 35 },
  { name: '运营部', sentiment: 75, trend: 'down' as const, headcount: 15 },
];

const mockSatisfactionFactors = [
  {
    name: '薪资与福利',
    impact: 85,
    currentScore: 72,
    recommendation: '需要调整薪资结构以保持竞争力',
  },
  {
    name: '职业发展',
    impact: 92,
    currentScore: 78,
    recommendation: '提供更清晰的晋升路径',
  },
  {
    name: '工作环境',
    impact: 78,
    currentScore: 80,
    recommendation: '继续改善办公环境',
  },
  {
    name: '团队氛围',
    impact: 88,
    currentScore: 85,
    recommendation: '定期组织团建活动',
  },
];

export default function EmployeeWellbeing() {
  const [surveyCreated, setSurveyCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSurvey = (survey: any) => {
    console.log('Survey created:', survey);
    setSurveyCreated(true);
  };

  const handleSubmitFeedback = (feedback: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Feedback submitted:', feedback);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleImplement = (factor: string) => {
    console.log('Implementing improvement for:', factor);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log('Exporting sentiment report as:', format);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">员工体验与情绪分析</h1>
        <p className="text-muted-foreground">
          监测员工情绪、收集反馈、预测满意度、优化工作体验
        </p>
      </div>

      {/* Survey and Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SurveyCreationCard
          onCreateSurvey={handleCreateSurvey}
          isCreating={surveyCreated}
        />
        <FeedbackCollectionCard
          onSubmitFeedback={handleSubmitFeedback}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Emotion Monitoring */}
      <EmployeeEmotionCard
        metrics={[
          { label: '工作满意度', value: 76, trend: 'up', trendValue: 4 },
          { label: '工作压力', value: 58, trend: 'down', trendValue: 6 },
          { label: '团队协作', value: 84, trend: 'up', trendValue: 3 },
          { label: '职业发展', value: 72, trend: 'stable' },
        ]}
        overallMood="positive"
        moodDescription="团队整体情绪积极，满意度稳步上升"
      />

      {/* Satisfaction Prediction */}
      <SatisfactionPredictionCard
        factors={mockSatisfactionFactors}
        predictedSatisfaction={7.8}
      />

      {/* Department Sentiment Comparison */}
      <DepartmentSentimentCard departments={mockDepartmentSentiment} />

      {/* Improvement Suggestions */}
      <SatisfactionImprovementCard
        suggestions={mockImprovementSuggestions}
        onImplement={handleImplement}
      />

      {/* Export Report */}
      <SentimentReportExportCard onExport={handleExport} />
    </div>
  );
}
