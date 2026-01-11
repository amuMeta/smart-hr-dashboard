import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { Brain, Lightbulb, TrendingUp, Target, Book, Star } from 'lucide-react';
import { ResumeProfile, generateTalentInsights } from '../lib/resumeParser';

interface TalentInsightsCardProps {
  profile: ResumeProfile;
}

/**
 * TalentInsightsCard Component
 * Design: Display AI-generated talent insights and development suggestions
 */
export const TalentInsightsCard: React.FC<TalentInsightsCardProps> = ({ profile }) => {
  const insights = generateTalentInsights(profile);

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="AI人才洞察"
        subtitle="基于简历内容的智能分析"
        icon={<Brain className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* 人才概述 */}
        <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <Star className="w-4 h-4 text-neon-purple" />
            人才概述
          </p>
          <p className="text-xs text-muted-foreground mt-1">{insights.summary}</p>
        </div>

        {/* 关键优势 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <Target className="w-4 h-4 text-neon-cyan" />
            关键优势
          </p>
          <div className="flex flex-wrap gap-2">
            {insights.keyStrengths.map((strength, idx) => (
              <div
                key={idx}
                className="px-2 py-1 bg-neon-cyan/10 rounded border border-neon-cyan/30 text-xs text-neon-cyan"
              >
                {strength}
              </div>
            ))}
          </div>
        </div>

        {/* 发展建议 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <Book className="w-4 h-4 text-neon-pink" />
            发展建议
          </p>
          <div className="flex flex-wrap gap-2">
            {insights.developmentPriorities.map((area, idx) => (
              <div
                key={idx}
                className="px-2 py-1 bg-neon-pink/10 rounded border border-neon-pink/30 text-xs text-neon-pink"
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* 推荐岗位 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            推荐岗位
          </p>
          <div className="flex flex-wrap gap-2">
            {insights.recommendedRoles.map((role, idx) => (
              <div
                key={idx}
                className="px-2 py-1 bg-green-400/10 rounded border border-green-400/30 text-xs text-green-400"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* 职业轨迹 */}
        <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <Lightbulb className="w-4 h-4 text-neon-cyan" />
            职业轨迹
          </p>
          <p className="text-xs text-muted-foreground mt-1">{insights.careerTrajectory}</p>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default TalentInsightsCard;