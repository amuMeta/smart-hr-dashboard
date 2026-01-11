import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Plus, Send, FileText, BarChart3 } from 'lucide-react';

/**
 * SurveyCreationCard Component
 * Design: Create and send employee satisfaction surveys
 */

interface SurveyQuestion {
  id: string;
  text: string;
  type: 'rating' | 'multiple_choice' | 'open_text';
  required: boolean;
}

interface SurveyCreationProps {
  onCreateSurvey: (survey: { title: string; questions: SurveyQuestion[] }) => void;
  isCreating?: boolean;
}

export const SurveyCreationCard: React.FC<SurveyCreationProps> = ({
  onCreateSurvey,
  isCreating = false,
}) => {
  const [surveyTitle, setSurveyTitle] = useState('员工满意度调查');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([
    {
      id: '1',
      text: '您对当前工作的满意度如何？',
      type: 'rating',
      required: true,
    },
    {
      id: '2',
      text: '您认为公司最需要改进的地方是什么？',
      type: 'open_text',
      required: true,
    },
  ]);

  const addQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      text: '新问题',
      type: 'rating',
      required: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, field: keyof SurveyQuestion, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="创建员工问卷"
        subtitle="设计满意度调查问卷"
        icon={<Plus className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Survey Title */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            问卷标题
          </label>
          <input
            type="text"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          />
        </div>

        {/* Questions */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">问题列表</p>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {questions.map((question, idx) => (
              <div key={question.id} className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">问题 {idx + 1}</span>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    删除
                  </button>
                </div>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                  className="w-full px-2 py-1 bg-input border border-border rounded text-xs text-foreground mb-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="问题文本"
                />
                <select
                  value={question.type}
                  onChange={(e) =>
                    updateQuestion(question.id, 'type', e.target.value)
                  }
                  className="w-full px-2 py-1 bg-input border border-border rounded text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                >
                  <option value="rating">评分</option>
                  <option value="multiple_choice">多选</option>
                  <option value="open_text">开放式</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Add Question Button */}
        <GlassButton
          variant="ghost"
          onClick={addQuestion}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加问题
        </GlassButton>

        {/* Create Survey Button */}
        <GlassButton
          variant="primary"
          onClick={() => onCreateSurvey({ title: surveyTitle, questions })}
          disabled={isCreating}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          创建并发送问卷
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * FeedbackCollectionCard Component
 * Design: Real-time feedback collection and sentiment analysis
 */

interface FeedbackCollectionProps {
  onSubmitFeedback: (feedback: string) => void;
  isSubmitting?: boolean;
}

export const FeedbackCollectionCard: React.FC<FeedbackCollectionProps> = ({
  onSubmitFeedback,
  isSubmitting = false,
}) => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmitFeedback(feedback);
      setFeedback('');
    }
  };

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="实时反馈收集"
        subtitle="收集员工反馈并进行情绪分析"
        icon={<Send className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {/* Category Selection */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            反馈类别
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-purple"
          >
            <option value="general">常规反馈</option>
            <option value="workplace">工作环境</option>
            <option value="management">管理反馈</option>
            <option value="benefits">福利待遇</option>
            <option value="career">职业发展</option>
          </select>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            反馈内容
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="请输入您的反馈..."
            className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-purple resize-none"
          />
        </div>

        {/* Submit Button */}
        <GlassButton
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !feedback.trim()}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? '分析中...' : '提交反馈'}
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * SatisfactionImprovementCard Component
 * Design: Auto-generated improvement suggestions
 */

interface ImprovementSuggestion {
  factor: string;
  currentScore: number;
  targetScore: number;
  actions: string[];
}

interface SatisfactionImprovementProps {
  suggestions: ImprovementSuggestion[];
  onImplement: (factor: string) => void;
}

export const SatisfactionImprovementCard: React.FC<SatisfactionImprovementProps> = ({
  suggestions,
  onImplement,
}) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="满意度改进建议"
        subtitle="AI生成的个性化改进方案"
        icon={<BarChart3 className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.factor}
            className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">{suggestion.factor}</p>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {suggestion.currentScore} → {suggestion.targetScore}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
                style={{ width: `${suggestion.currentScore}%` }}
              />
            </div>

            {/* Actions */}
            <div className="space-y-1 mb-2">
              {suggestion.actions.map((action, idx) => (
                <p key={idx} className="text-xs text-muted-foreground">
                  • {action}
                </p>
              ))}
            </div>

            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => onImplement(suggestion.factor)}
              className="w-full"
            >
              实施方案
            </GlassButton>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * SentimentReportExportCard Component
 * Design: Export sentiment analysis reports
 */

interface SentimentExportProps {
  onExport: (format: 'pdf' | 'excel') => void;
  isExporting?: boolean;
}

export const SentimentReportExportCard: React.FC<SentimentExportProps> = ({
  onExport,
  isExporting = false,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="情绪分析报告"
        subtitle="导出员工情绪监测报告"
        icon={<FileText className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div className="space-y-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-sm font-semibold text-foreground mb-2">报告内容</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ 整体情绪趋势分析</li>
              <li>✓ 部门情绪对比</li>
              <li>✓ 关键问题识别</li>
              <li>✓ 改进建议</li>
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
