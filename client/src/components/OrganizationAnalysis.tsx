import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { Network, Zap, TrendingUp } from 'lucide-react';

/**
 * CollaborationNetworkCard Component
 * Design: Visualization of team collaboration patterns
 */

interface TeamNode {
  id: string;
  name: string;
  department: string;
  collaborationScore: number; // 0-100
  connectionCount: number;
}

interface CollaborationNetworkProps {
  teams: TeamNode[];
  totalCollaborationStrength: number;
}

export const CollaborationNetworkCard: React.FC<CollaborationNetworkProps> = ({
  teams,
  totalCollaborationStrength,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="团队协作网络"
        subtitle={`整体协作强度: ${totalCollaborationStrength}%`}
        icon={<Network className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {teams.map((team) => (
          <div key={team.id} className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{team.name}</p>
                <p className="text-xs text-muted-foreground">{team.department}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">协作度</p>
                <p className="text-lg font-bold text-neon-cyan">{team.collaborationScore}%</p>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-cyan"
                style={{ width: `${team.collaborationScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              连接数: {team.connectionCount}
            </p>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * WorkEfficiencyCard Component
 * Design: Analysis of work patterns and productivity
 */

interface EfficiencyMetric {
  name: string;
  score: number; // 0-100
  benchmark: number; // industry benchmark
  trend: 'up' | 'down' | 'stable';
}

interface WorkEfficiencyProps {
  metrics: EfficiencyMetric[];
  overallProductivity: number;
}

export const WorkEfficiencyCard: React.FC<WorkEfficiencyProps> = ({
  metrics,
  overallProductivity,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="工作效率洞察"
        subtitle={`整体生产力指数: ${overallProductivity}`}
        icon={<Zap className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neon-purple">{metric.score}</span>
                {metric.trend === 'up' && (
                  <span className="text-xs text-green-400">↑</span>
                )}
                {metric.trend === 'down' && (
                  <span className="text-xs text-red-400">↓</span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                style={{ width: `${metric.score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              行业基准: {metric.benchmark}
            </p>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * OrganizationOptimizationCard Component
 * Design: AI-generated organizational structure recommendations
 */

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  expectedBenefit: string;
}

interface OrganizationOptimizationProps {
  suggestions: OptimizationSuggestion[];
}

export const OrganizationOptimizationCard: React.FC<OrganizationOptimizationProps> = ({
  suggestions,
}) => {
  const impactColors = {
    high: 'text-red-400 bg-red-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    low: 'text-blue-400 bg-blue-400/10',
  };

  const effortColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="组织结构优化建议"
        subtitle={`${suggestions.length} 项待实施方案`}
        icon={<TrendingUp className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${impactColors[suggestion.impact]}`}>
                {suggestion.impact === 'high' ? '高' : suggestion.impact === 'medium' ? '中' : '低'}
                影响
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">预期收益: {suggestion.expectedBenefit}</span>
              <span className={`font-semibold ${effortColors[suggestion.effort]}`}>
                {suggestion.effort === 'high' ? '高' : suggestion.effort === 'medium' ? '中' : '低'}
                工作量
              </span>
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * HRPlanningCard Component
 * Design: AI-powered HR planning and forecasting
 */

interface HRPlan {
  period: string;
  requiredHeadcount: number;
  currentHeadcount: number;
  gap: number;
  costEstimate: number;
}

interface HRPlanningProps {
  plans: HRPlan[];
}

export const HRPlanningCard: React.FC<HRPlanningProps> = ({ plans }) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader title="人力资源规划" subtitle="基于业务预测的需求测算" />
      <GlassCardContent className="space-y-3">
        {plans.map((plan) => (
          <div key={plan.period} className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{plan.period}</p>
                <p className="text-xs text-muted-foreground">
                  当前: {plan.currentHeadcount} | 需求: {plan.requiredHeadcount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">缺口</p>
                <p
                  className={`text-lg font-bold ${
                    plan.gap > 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {plan.gap > 0 ? '+' : ''}{plan.gap}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              预算: ¥{plan.costEstimate.toLocaleString()}
            </p>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * TrainingAndDevelopmentCard Component
 * Design: Skill gap analysis and training recommendations
 */

interface SkillGap {
  skillName: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  affectedEmployees: number;
  trainingRecommendation: string;
}

interface TrainingAndDevelopmentProps {
  skillGaps: SkillGap[];
}

export const TrainingAndDevelopmentCard: React.FC<TrainingAndDevelopmentProps> = ({
  skillGaps,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader title="培训与发展" subtitle="技能差距分析" />
      <GlassCardContent className="space-y-3">
        {skillGaps.map((gap) => (
          <div key={gap.skillName} className="space-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{gap.skillName}</p>
                <p className="text-xs text-muted-foreground">{gap.trainingRecommendation}</p>
              </div>
              <p className="text-xs text-muted-foreground">{gap.affectedEmployees} 人</p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">当前: {gap.currentLevel}%</p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-purple"
                    style={{ width: `${gap.currentLevel}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">目标: {gap.requiredLevel}%</p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-cyan"
                    style={{ width: `${gap.requiredLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};
