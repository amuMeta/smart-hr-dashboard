import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from '@/components/GlassCard';
import { ResumeUploadParserCard } from '@/components/ResumeParser';
import {
  ResumeProfileHeaderCard,
  ResumeAIAnalysisCard,
  ResumeSkillsCard,
  ResumeExperienceCard,
  ResumeEducationCard,
  ResumePositionMatchCard,
} from '@/components/ResumeProfileDisplay';
import JobMatchAnalysis from '@/components/JobMatchAnalysis';
import TalentInsightsCard from '@/components/TalentInsightsCard';
import { ResumeProfile } from '@/lib/resumeParser';

/**
 * ResumeParsingPage
 * Design: Complete resume parsing and analysis interface
 */

export default function ResumeParsingPage() {
  const [parsedProfile, setParsedProfile] = useState<ResumeProfile | null>(null);
  const [parseHistory, setParseHistory] = useState<ResumeProfile[]>([]);

  const handleResumeParsed = (profile: ResumeProfile) => {
    setParsedProfile(profile);
    setParseHistory([profile, ...parseHistory.slice(0, 9)]); // Keep last 10
  };

  const handleDownloadResume = () => {
    console.log('Downloading resume...');
    // In production, generate and download PDF
  };

  const handleSelectFromHistory = (profile: ResumeProfile) => {
    setParsedProfile(profile);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI简历解析</h1>
        <p className="text-muted-foreground">
          上传简历文件，AI自动提取关键信息并生成人才画像分析
        </p>
      </div>

      {!parsedProfile ? (
        <>
          {/* Upload Section */}
          <ResumeUploadParserCard onParsed={handleResumeParsed} />

          {/* Parse History */}
          {parseHistory.length > 0 && (
            <GlassCard variant="purple">
              <GlassCardHeader
                title="解析历史"
                subtitle={`共 ${parseHistory.length} 份简历`}
              />
              <GlassCardContent>
                <div className="space-y-2">
                  {parseHistory.map((profile, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectFromHistory(profile)}
                      className="w-full p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30 hover:bg-neon-purple/20 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {profile.fullName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {profile.currentPosition} · {profile.fileName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-neon-purple">
                            {profile.overallTalentScore}
                          </p>
                          <p className="text-xs text-muted-foreground">总体评分</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          )}

          {/* Tips */}
          <GlassCard variant="cyan">
            <GlassCardHeader title="使用提示" />
            <GlassCardContent>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  • 支持 PDF 和 Word 格式的简历，文件大小不超过 5MB
                </p>
                <p>
                  • AI 会自动提取个人信息、教育背景、工作经验、技能等关键信息
                </p>
                <p>
                  • 解析结果包含人才评分、岗位匹配度、发展建议等分析
                </p>
                <p>
                  • 您可以将解析结果导出为 PDF 或添加到人才库
                </p>
              </div>
            </GlassCardContent>
          </GlassCard>
        </>
      ) : (
        <>
          {/* Profile Header */}
          <ResumeProfileHeaderCard
            profile={parsedProfile}
            onDownload={handleDownloadResume}
          />

          {/* AI Analysis */}
          <ResumeAIAnalysisCard profile={parsedProfile} />

          {/* Skills */}
          <ResumeSkillsCard profile={parsedProfile} />

          {/* Position Match */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumePositionMatchCard
              profile={parsedProfile}
              jobTitle="高级工程师"
              requiredSkills={[
                'React',
                'Node.js',
                'TypeScript',
                'AWS',
                'Docker',
                'PostgreSQL',
              ]}
            />
            <JobMatchAnalysis profile={parsedProfile} requiredSkills={[
                'React',
                'JavaScript',
                'CSS',
                'HTML',
                'TypeScript',
            ]} />
          </div>
          
          {/* AI人才洞察 */}
          <TalentInsightsCard profile={parsedProfile} />

          {/* Experience and Education */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumeExperienceCard profile={parsedProfile} />
            <ResumeEducationCard profile={parsedProfile} />
          </div>

          {/* Additional Actions */}
          <GlassCard variant="pink">
            <GlassCardHeader title="后续操作" />
            <GlassCardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">📧</p>
                  <p className="text-xs text-muted-foreground">发送邀请</p>
                </button>
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">💾</p>
                  <p className="text-xs text-muted-foreground">保存到库</p>
                </button>
                <button className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center">
                  <p className="text-xs font-semibold text-foreground mb-1">📊</p>
                  <p className="text-xs text-muted-foreground">生成报告</p>
                </button>
                <button
                  onClick={() => setParsedProfile(null)}
                  className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-center"
                >
                  <p className="text-xs font-semibold text-foreground mb-1">➕</p>
                  <p className="text-xs text-muted-foreground">解析新简历</p>
                </button>
              </div>
            </GlassCardContent>
          </GlassCard>
        </>
      )}
    </div>
  );
}
