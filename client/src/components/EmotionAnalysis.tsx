import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { Brain, MessageSquare, TrendingDown } from 'lucide-react';

/**
 * EmployeeEmotionCard Component
 * Design: Real-time employee sentiment monitoring
 */

interface EmotionMetric {
  label: string;
  value: number; // 0-100
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

interface EmployeeEmotionProps {
  metrics: EmotionMetric[];
  overallMood: 'positive' | 'neutral' | 'negative';
  moodDescription: string;
}

export const EmployeeEmotionCard: React.FC<EmployeeEmotionProps> = ({
  metrics,
  overallMood,
  moodDescription,
}) => {
  const moodColors = {
    positive: 'bg-green-400/20 text-green-400 border-green-400/50',
    neutral: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50',
    negative: 'bg-red-400/20 text-red-400 border-red-400/50',
  };

  const moodEmoji = {
    positive: '😊',
    neutral: '😐',
    negative: '😟',
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="员工情绪监测"
        subtitle="基于问卷和沟通数据分析"
        icon={<Brain className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Overall Mood */}
        <div
          className={`p-4 rounded-lg border flex items-center justify-between ${
            moodColors[overallMood]
          }`}
        >
          <div>
            <p className="text-sm font-semibold">团队整体情绪</p>
            <p className="text-xs mt-1">{moodDescription}</p>
          </div>
          <span className="text-3xl">{moodEmoji[overallMood]}</span>
        </div>

        {/* Emotion Metrics */}
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neon-cyan">{metric.value}</span>
                  {metric.trend === 'up' && (
                    <span className="text-xs text-green-400">↑ {metric.trendValue}%</span>
                  )}
                  {metric.trend === 'down' && (
                    <span className="text-xs text-red-400">↓ {metric.trendValue}%</span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * SatisfactionPredictionCard Component
 * Design: AI prediction of employee satisfaction factors
 */

interface SatisfactionFactor {
  name: string;
  impact: number; // 0-100, influence on satisfaction
  currentScore: number; // 0-100
  recommendation: string;
}

interface SatisfactionPredictionProps {
  factors: SatisfactionFactor[];
  predictedSatisfaction: number;
}

export const SatisfactionPredictionCard: React.FC<SatisfactionPredictionProps> = ({
  factors,
  predictedSatisfaction,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="满意度预测模型"
        subtitle={`预测满意度: ${predictedSatisfaction}/10`}
        icon={<TrendingDown className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {factors.map((factor) => (
          <div key={factor.name} className="space-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{factor.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{factor.recommendation}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">影响度</p>
                <p className="text-sm font-bold text-neon-purple">{factor.impact}%</p>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-purple"
                style={{ width: `${factor.impact}%` }}
              />
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * AIAssistantCard Component
 * Design: 24/7 HR chatbot for policy Q&A
 */

interface ChatMessage {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: string;
}

interface AIAssistantProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

export const AIAssistantCard: React.FC<AIAssistantProps> = ({
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="智能HR助手"
        subtitle="24小时HR政策问答"
        icon={<MessageSquare className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto space-y-3 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.type === 'question'
                    ? 'bg-neon-pink/20 text-foreground border border-neon-pink/30'
                    : 'bg-neon-cyan/20 text-foreground border border-neon-cyan/30'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题..."
            className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-neon-pink text-deep-blue font-semibold rounded-md hover:shadow-lg transition-all"
          >
            发送
          </button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * DepartmentSentimentCard Component
 * Design: Sentiment comparison across departments
 */

interface DepartmentSentiment {
  name: string;
  sentiment: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  headcount: number;
}

interface DepartmentSentimentProps {
  departments: DepartmentSentiment[];
}

export const DepartmentSentimentCard: React.FC<DepartmentSentimentProps> = ({
  departments,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader title="部门情绪对比" />
      <GlassCardContent className="space-y-3">
        {departments.map((dept) => (
          <div key={dept.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{dept.name}</p>
                <p className="text-xs text-muted-foreground">{dept.headcount} 人</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neon-cyan">{dept.sentiment}</span>
                {dept.trend === 'up' && (
                  <span className="text-xs text-green-400">↑</span>
                )}
                {dept.trend === 'down' && (
                  <span className="text-xs text-red-400">↓</span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                style={{ width: `${dept.sentiment}%` }}
              />
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};
