import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';
import { Search, Briefcase, CheckCircle, AlertCircle, Star, TrendingUp } from 'lucide-react';
import { calculateSkillMatch } from '../lib/resumeParser';
import { ResumeProfile } from '../lib/resumeParser';

interface JobMatchAnalysisProps {
  profile: ResumeProfile;
  requiredSkills: string[];
}

/**
 * JobMatchAnalysis Component
 * Design: Job matching analysis between candidate skills and job requirements
 */
export const JobMatchAnalysis: React.FC<JobMatchAnalysisProps> = ({ profile, requiredSkills }) => {
  const [selectedJob, setSelectedJob] = useState<string>('Frontend Developer');

  // 预定义的岗位和其所需技能
  const jobRequirements: Record<string, string[]> = {
    'Frontend Developer': ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
    'Full Stack Developer': ['React', 'Node.js', 'Database', 'JavaScript', 'TypeScript', 'Docker'],
    'Backend Developer': ['Java', 'Spring', 'Database', 'Microservices', 'API', 'Redis'],
    'Product Manager': ['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'Roadmap'],
    'UX/UI Designer': ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'User Testing'],
    'DevOps Engineer': ['CI/CD', 'Docker', 'Kubernetes', 'Cloud', 'Monitoring', 'Scripting'],
  };

  // 选择岗位时的处理函数
  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
  };

  // 计算技能匹配度
  const { matchScore, matchedSkills, missingSkills } = calculateSkillMatch(
    profile,
    jobRequirements[selectedJob]
  );

  // 获取匹配度颜色
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // 获取匹配度标签
  const getMatchScoreLabel = (score: number) => {
    if (score >= 80) return '高度匹配';
    if (score >= 60) return '中度匹配';
    return '需要提升';
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="岗位匹配分析"
        subtitle="智能评估候选人与岗位的匹配度"
        icon={<Briefcase className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* 岗位选择器 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">选择目标岗位</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(jobRequirements).map((job) => (
              <button
                key={job}
                onClick={() => handleJobSelect(job)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  selectedJob === job
                    ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan'
                    : 'bg-muted border-border text-muted-foreground hover:bg-neon-cyan/10 hover:border-neon-cyan/30'
                }`}
              >
                {job}
              </button>
            ))}
          </div>
        </div>

        {/* 匹配度分数 */}
        <div className="p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">总体匹配度</p>
            <p className={`text-xl font-bold ${getMatchScoreColor(matchScore)}`}>
              {matchScore}%
            </p>
          </div>
          
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={`h-full ${
                matchScore >= 80 ? 'bg-green-400' : matchScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
          
          <p className={`text-xs ${getMatchScoreColor(matchScore)}`}>
            {getMatchScoreLabel(matchScore)}
          </p>
        </div>

        {/* 技能匹配详情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 匹配技能 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              匹配技能
            </p>
            <div className="space-y-1">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 bg-green-400/10 rounded border border-green-400/30">
                    <span className="text-xs text-foreground">{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">暂无匹配的技能</p>
              )}
            </div>
          </div>

          {/* 缺失技能 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-400" />
              需要提升
            </p>
            <div className="space-y-1">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 bg-red-400/10 rounded border border-red-400/30">
                    <span className="text-xs text-foreground">{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">所有所需技能均已具备</p>
              )}
            </div>
          </div>
        </div>

        {/* 发展建议 */}
        <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-neon-purple" />
            发展建议
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {missingSkills.length > 0
              ? `建议加强 ${missingSkills.slice(0, 3).join('、')} 等技能的掌握，这将有助于提高岗位匹配度。`
              : '候选人技能全面，可考虑进一步评估其他维度的能力。'}
          </p>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default JobMatchAnalysis;