import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

/**
 * ResumeMatchCard Component
 * Design: AI-powered resume matching with visual indicators
 */

interface CandidateMatch {
  id: string;
  name: string;
  position: string;
  matchScore: number; // 0-100
  matchReasons: string[];
  mismatchReasons?: string[];
  experience: number; // years
}

interface ResumeMatchProps {
  candidates: CandidateMatch[];
  jobTitle: string;
}

export const ResumeMatchCard: React.FC<ResumeMatchProps> = ({
  candidates,
  jobTitle,
}) => {
  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMatchBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-400/10 border-green-400/30';
    if (score >= 70) return 'bg-yellow-400/10 border-yellow-400/30';
    return 'bg-red-400/10 border-red-400/30';
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="简历智能匹配"
        subtitle={`岗位: ${jobTitle}`}
        icon={<CheckCircle className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className={`p-4 rounded-lg border ${getMatchBgColor(candidate.matchScore)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">{candidate.name}</p>
                <p className="text-xs text-muted-foreground">
                  {candidate.position} · {candidate.experience}年经验
                </p>
              </div>
              <span className={`text-lg font-bold ${getMatchColor(candidate.matchScore)}`}>
                {candidate.matchScore}%
              </span>
            </div>

            {/* Match Reasons */}
            <div className="space-y-1">
              {candidate.matchReasons.map((reason, idx) => (
                <p key={idx} className="text-xs text-foreground flex items-center gap-2">
                  <span className="text-green-400">✓</span> {reason}
                </p>
              ))}
              {candidate.mismatchReasons?.map((reason, idx) => (
                <p key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="text-yellow-400">!</span> {reason}
                </p>
              ))}
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * InterviewAnalysisCard Component
 * Design: AI analysis of interview performance
 */

interface InterviewMetric {
  name: string;
  score: number; // 0-100
  comment: string;
}

interface InterviewAnalysisProps {
  candidateName: string;
  overallScore: number;
  metrics: InterviewMetric[];
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no';
}

export const InterviewAnalysisCard: React.FC<InterviewAnalysisProps> = ({
  candidateName,
  overallScore,
  metrics,
  recommendation,
}) => {
  const recommendationText = {
    strong_yes: '强烈推荐',
    yes: '推荐',
    maybe: '需要进一步评估',
    no: '不推荐',
  };

  const recommendationColor = {
    strong_yes: 'bg-green-400/20 text-green-400 border-green-400/50',
    yes: 'bg-blue-400/20 text-blue-400 border-blue-400/50',
    maybe: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50',
    no: 'bg-red-400/20 text-red-400 border-red-400/50',
  };

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="面试分析"
        subtitle={candidateName}
        icon={<Zap className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Overall Score */}
        <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">综合评分</span>
            <span className="text-2xl font-bold text-neon-purple">{overallScore}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{metric.name}</span>
                <span className="text-sm font-semibold text-neon-cyan">{metric.score}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-neon-cyan"
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{metric.comment}</p>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div
          className={`p-3 rounded-lg border flex items-center gap-2 ${
            recommendationColor[recommendation]
          }`}
        >
          <span className="font-semibold">{recommendationText[recommendation]}</span>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * TalentPoolCard Component
 * Design: Reactivation of past candidates
 */

interface PoolCandidate {
  id: string;
  name: string;
  lastApplied: string;
  relevantSkills: string[];
  matchScore: number;
}

interface TalentPoolProps {
  candidates: PoolCandidate[];
  openPosition: string;
}

export const TalentPoolCard: React.FC<TalentPoolProps> = ({
  candidates,
  openPosition,
}) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="人才库推荐"
        subtitle={`为 ${openPosition} 激活候选人`}
      />
      <GlassCardContent className="space-y-2">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{candidate.name}</p>
                <p className="text-xs text-muted-foreground">
                  上次申请: {candidate.lastApplied}
                </p>
              </div>
              <span className="text-lg font-bold text-neon-pink">{candidate.matchScore}%</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.relevantSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 bg-neon-pink/20 text-neon-pink rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * RecruitmentMetricsCard Component
 * Design: Key recruitment KPIs
 */

interface RecruitmentMetrics {
  timeToHire: number; // days
  costPerHire: number; // currency
  qualityOfHire: number; // 0-100
  offerAcceptanceRate: number; // percentage
}

interface RecruitmentMetricsProps {
  metrics: RecruitmentMetrics;
}

export const RecruitmentMetricsCard: React.FC<RecruitmentMetricsProps> = ({
  metrics,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader title="招聘效能指标" />
      <GlassCardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-xs text-muted-foreground mb-1">平均招聘周期</p>
            <p className="text-2xl font-bold text-neon-cyan">{metrics.timeToHire}</p>
            <p className="text-xs text-muted-foreground">天</p>
          </div>
          <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
            <p className="text-xs text-muted-foreground mb-1">单位招聘成本</p>
            <p className="text-2xl font-bold text-neon-purple">¥{metrics.costPerHire}</p>
          </div>
          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
            <p className="text-xs text-muted-foreground mb-1">招聘质量</p>
            <p className="text-2xl font-bold text-neon-pink">{metrics.qualityOfHire}%</p>
          </div>
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-xs text-muted-foreground mb-1">Offer接受率</p>
            <p className="text-2xl font-bold text-neon-cyan">{metrics.offerAcceptanceRate}%</p>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
