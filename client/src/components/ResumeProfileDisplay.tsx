import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import {
  ResumeProfile,
  generateTalentInsights,
  calculateSkillMatch,
  formatResumeForDisplay,
} from '@/lib/resumeParser';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  BookOpen,
  Code,
  TrendingUp,
  Star,
} from 'lucide-react';

/**
 * ResumeProfileHeaderCard Component
 * Design: Display candidate's basic information
 */

interface ResumeProfileHeaderProps {
  profile: ResumeProfile;
  onDownload: () => void;
}

export const ResumeProfileHeaderCard: React.FC<ResumeProfileHeaderProps> = ({
  profile,
  onDownload,
}) => {
  const formatted = formatResumeForDisplay(profile);

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title={profile.fullName}
        subtitle={formatted.currentRoleFormatted}
      />
      <GlassCardContent className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-neon-cyan" />
            <span className="text-muted-foreground">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-neon-cyan" />
            <span className="text-muted-foreground">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            <MapPin className="w-4 h-4 text-neon-cyan" />
            <span className="text-muted-foreground">{profile.location}</span>
          </div>
        </div>

        {/* Summary */}
        {profile.summary && (
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-xs font-semibold text-foreground mb-1">职业概述</p>
            <p className="text-xs text-muted-foreground">{profile.summary}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <GlassButton
            variant="primary"
            onClick={onDownload}
            className="flex-1 text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            下载简历
          </GlassButton>
          <GlassButton
            variant="secondary"
            className="flex-1 text-xs"
          >
            <Mail className="w-3 h-3 mr-1" />
            发送邀请
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeAIAnalysisCard Component
 * Design: Display AI analysis scores and insights
 */

interface ResumeAIAnalysisProps {
  profile: ResumeProfile;
}

export const ResumeAIAnalysisCard: React.FC<ResumeAIAnalysisProps> = ({ profile }) => {
  const insights = generateTalentInsights(profile);

  const scores = [
    { label: '总体评分', value: profile.overallTalentScore, color: 'neon-cyan' },
    { label: '技术深度', value: profile.technicalDepthScore, color: 'neon-purple' },
    { label: '文化匹配', value: profile.cultureFitScore, color: 'neon-pink' },
    { label: '领导力', value: profile.leadershipScore, color: 'neon-cyan' },
    { label: '适应性', value: profile.adaptabilityScore, color: 'neon-purple' },
  ];

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="AI人才分析"
        subtitle="基于简历内容的智能评估"
        icon={<Star className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {scores.map((score, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                score.color === 'neon-cyan'
                  ? 'bg-neon-cyan/10 border-neon-cyan/30'
                  : score.color === 'neon-purple'
                  ? 'bg-neon-purple/10 border-neon-purple/30'
                  : 'bg-neon-pink/10 border-neon-pink/30'
              }`}
            >
              <p className="text-xs text-muted-foreground mb-1">{score.label}</p>
              <p className="text-2xl font-bold text-foreground">{score.value}</p>
              <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    score.color === 'neon-cyan'
                      ? 'bg-neon-cyan'
                      : score.color === 'neon-purple'
                      ? 'bg-neon-purple'
                      : 'bg-neon-pink'
                  }`}
                  style={{ width: `${score.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Career Trajectory */}
        <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-neon-purple flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground">职业发展轨迹</p>
            <p className="text-xs text-muted-foreground">{insights.careerTrajectory}</p>
          </div>
        </div>

        {/* Key Strengths */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">核心优势</p>
          <div className="flex flex-wrap gap-2">
            {insights.keyStrengths.map((strength, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded text-xs text-foreground"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* Development Areas */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">发展方向</p>
          <div className="flex flex-wrap gap-2">
            {insights.developmentPriorities.map((area, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan/30 rounded text-xs text-foreground"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeSkillsCard Component
 * Design: Display skills with proficiency levels
 */

interface ResumeSkillsProps {
  profile: ResumeProfile;
}

export const ResumeSkillsCard: React.FC<ResumeSkillsProps> = ({ profile }) => {
  const skillsByCategory = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof profile.skills>
  );

  const proficiencyColors = {
    beginner: 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400',
    intermediate: 'bg-blue-400/20 border-blue-400/30 text-blue-400',
    advanced: 'bg-purple-400/20 border-purple-400/30 text-purple-400',
    expert: 'bg-green-400/20 border-green-400/30 text-green-400',
  };

  const proficiencyLabels = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    expert: '专家',
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="技能清单"
        subtitle={`共 ${profile.skills.length} 项技能`}
        icon={<Code className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category}>
            <p className="text-sm font-semibold text-foreground mb-2">{category}</p>
            <div className="space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${
                          proficiencyColors[skill.proficiency]
                        }`}
                      >
                        {proficiencyLabels[skill.proficiency]}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neon-cyan"
                        style={{
                          width: `${
                            skill.proficiency === 'beginner'
                              ? 25
                              : skill.proficiency === 'intermediate'
                              ? 50
                              : skill.proficiency === 'advanced'
                              ? 75
                              : 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {skill.yearsOfExperience}年
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeExperienceCard Component
 * Design: Display work experience timeline
 */

interface ResumeExperienceProps {
  profile: ResumeProfile;
}

export const ResumeExperienceCard: React.FC<ResumeExperienceProps> = ({ profile }) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="工作经历"
        subtitle={`${profile.yearsOfExperience}年工作经验`}
        icon={<Briefcase className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {profile.workExperience.map((exp, idx) => (
          <div
            key={idx}
            className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{exp.position}</p>
                <p className="text-xs text-muted-foreground">{exp.company}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {exp.startDate} - {exp.currentlyWorking ? '至今' : exp.endDate}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-2">{exp.description}</p>

            {exp.achievements.length > 0 && (
              <div className="space-y-1">
                {exp.achievements.map((achievement, aidx) => (
                  <p key={aidx} className="text-xs text-muted-foreground">
                    • {achievement}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumeEducationCard Component
 * Design: Display education and certifications
 */

interface ResumeEducationProps {
  profile: ResumeProfile;
}

export const ResumeEducationCard: React.FC<ResumeEducationProps> = ({ profile }) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="教育背景"
        subtitle="学历和证书资质"
        icon={<BookOpen className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Education */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">学历</p>
          <div className="space-y-2">
            {profile.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-2 bg-neon-purple/10 rounded border border-neon-purple/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {edu.degree} - {edu.field}
                    </p>
                    <p className="text-xs text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">证书资质</p>
            <div className="space-y-2">
              {profile.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-neon-cyan/10 rounded border border-neon-cyan/30 flex items-start gap-2"
                >
                  <Award className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} · {cert.issueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {profile.languages.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">语言能力</p>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-neon-pink/20 border border-neon-pink/30 rounded text-xs text-foreground"
                >
                  {lang.name} - {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ResumePositionMatchCard Component
 * Design: Show match score against job requirements
 */

interface ResumePositionMatchProps {
  profile: ResumeProfile;
  jobTitle: string;
  requiredSkills: string[];
}

export const ResumePositionMatchCard: React.FC<ResumePositionMatchProps> = ({
  profile,
  jobTitle,
  requiredSkills,
}) => {
  const match = calculateSkillMatch(profile, requiredSkills);

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="岗位匹配度"
        subtitle={`职位: ${jobTitle}`}
      />
      <GlassCardContent className="space-y-4">
        {/* Match Score */}
        <div className="text-center p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
          <p className="text-xs text-muted-foreground mb-1">匹配度</p>
          <p className="text-4xl font-bold text-neon-cyan">{match.matchScore}%</p>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-neon-cyan"
              style={{ width: `${match.matchScore}%` }}
            />
          </div>
        </div>

        {/* Matched Skills */}
        {match.matchedSkills.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">匹配的技能</p>
            <div className="flex flex-wrap gap-2">
              {match.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-400/20 border border-green-400/30 rounded text-xs text-green-400"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {match.missingSkills.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">缺失的技能</p>
            <div className="flex flex-wrap gap-2">
              {match.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded text-xs text-yellow-400"
                >
                  ✗ {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};
