import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { TrendingUp, AlertCircle, Star } from 'lucide-react';

/**
 * TalentProfileCard Component
 * Design: AI-powered talent profile with multi-dimensional analysis
 * Displays: Skills, risk factors, growth potential
 */

interface SkillItem {
  name: string;
  level: number; // 0-100
  trend?: 'up' | 'down' | 'stable';
}

interface TalentProfileProps {
  name: string;
  position: string;
  department: string;
  skills: SkillItem[];
  riskScore: number; // 0-100, higher = higher risk
  growthPotential: number; // 0-100
  satisfaction: number; // 0-100
  yearsInCompany: number;
  nextPromotionDate?: string;
}

export const TalentProfileCard: React.FC<TalentProfileProps> = ({
  name,
  position,
  department,
  skills,
  riskScore,
  growthPotential,
  satisfaction,
  yearsInCompany,
  nextPromotionDate,
}) => {
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-400/10 border-green-400/30';
    if (score < 60) return 'bg-yellow-400/10 border-yellow-400/30';
    return 'bg-red-400/10 border-red-400/30';
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title={name}
        subtitle={`${position} · ${department}`}
        icon={<Star className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-xs text-muted-foreground">工作年限</p>
            <p className="text-lg font-bold text-neon-cyan">{yearsInCompany}</p>
            <p className="text-xs text-muted-foreground">年</p>
          </div>
          <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
            <p className="text-xs text-muted-foreground">成长潜力</p>
            <p className="text-lg font-bold text-neon-purple">{growthPotential}</p>
            <p className="text-xs text-muted-foreground">分</p>
          </div>
          <div className={`p-3 rounded-lg border ${getRiskBgColor(riskScore)}`}>
            <p className="text-xs text-muted-foreground">离职风险</p>
            <p className={`text-lg font-bold ${getRiskColor(riskScore)}`}>{riskScore}</p>
            <p className="text-xs text-muted-foreground">分</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">核心技能</p>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{skill.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    {skill.trend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Satisfaction & Promotion */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-xs text-muted-foreground">满意度</p>
            <p className="text-lg font-bold text-neon-cyan">{satisfaction}%</p>
          </div>
          {nextPromotionDate && (
            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-xs text-muted-foreground">晋升预计</p>
              <p className="text-xs font-bold text-neon-purple">{nextPromotionDate}</p>
            </div>
          )}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * TalentMatrixCard Component
 * Design: 2D matrix visualization for talent segmentation
 */

interface TalentSegment {
  name: string;
  count: number;
  color: string;
  description: string;
}

interface TalentMatrixProps {
  segments: TalentSegment[];
  title?: string;
}

export const TalentMatrixCard: React.FC<TalentMatrixProps> = ({
  segments,
  title = '人才矩阵分析',
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader title={title} subtitle="按潜力和表现分类" />
      <GlassCardContent>
        <div className="space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className="p-3 rounded-lg border-l-4 transition-all hover:translate-x-1"
              style={{
                backgroundColor: `${segment.color}10`,
                borderLeftColor: segment.color,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{segment.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{segment.description}</p>
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ color: segment.color }}
                >
                  {segment.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * RetentionRiskCard Component
 * Design: Focused view on retention risks
 */

interface RiskFactor {
  factor: string;
  impact: number; // 0-100
  affectedCount: number;
}

interface RetentionRiskProps {
  riskFactors: RiskFactor[];
  overallRiskScore: number;
}

export const RetentionRiskCard: React.FC<RetentionRiskProps> = ({
  riskFactors,
  overallRiskScore,
}) => {
  return (
    <GlassCard variant="pink" glowIntensity="high">
      <GlassCardHeader
        title="离职风险预警"
        subtitle={`整体风险评分: ${overallRiskScore}/100`}
        icon={<AlertCircle className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {riskFactors.map((factor) => (
          <div key={factor.factor} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{factor.factor}</span>
              <span className="text-xs text-muted-foreground">
                {factor.affectedCount} 人
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-pink to-neon-purple"
                style={{ width: `${factor.impact}%` }}
              />
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};
