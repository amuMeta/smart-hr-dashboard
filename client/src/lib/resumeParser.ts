/**
 * Resume Parser Utilities
 * AI-powered resume parsing and talent profile extraction
 */

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  category: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Language {
  name: string;
  proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
}

export interface ResumeProfile {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;

  // Professional Details
  currentPosition?: string;
  currentCompany?: string;
  yearsOfExperience: number;
  industryExperience: string[];

  // Education & Certifications
  education: Education[];
  certifications: Certification[];
  languages: Language[];

  // Skills
  skills: Skill[];
  topSkills: string[]; // Top 5 skills
  skillGaps?: string[];

  // Work History
  workExperience: WorkExperience[];

  // AI Analysis
  careerTrend: 'ascending' | 'stable' | 'descending';
  cultureFitScore: number; // 0-100
  technicalDepthScore: number; // 0-100
  leadershipScore: number; // 0-100
  adaptabilityScore: number; // 0-100
  overallTalentScore: number; // 0-100

  // Recommendations
  recommendedPositions: string[];
  developmentAreas: string[];
  strengths: string[];

  // Metadata
  uploadDate: string;
  fileName: string;
  fileSize: number;
}

/**
 * Mock AI Resume Parser
 * In production, this would integrate with a real NLP/OCR service
 */
export function parseResumeFile(file: File): Promise<ResumeProfile> {
  return new Promise((resolve) => {
    // Simulate file reading and parsing delay
    setTimeout(() => {
      const mockProfile = generateMockProfile(file.name);
      resolve(mockProfile);
    }, 2000);
  });
}

/**
 * Generate mock resume profile for demonstration
 * In production, this would be replaced with actual AI parsing
 */
function generateMockProfile(fileName: string): ResumeProfile {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Generate multiple mock profiles based on file characteristics
  const mockProfiles = getMockProfiles(currentYear);
  
  // Use file hash or name to determine which profile to return
  const profileIndex = Math.abs(fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % mockProfiles.length;
  
  const selectedProfile = mockProfiles[profileIndex];
  selectedProfile.fileName = fileName;
  selectedProfile.fileSize = Math.floor(Math.random() * 500000) + 100000;
  selectedProfile.uploadDate = new Date().toISOString();
  
  return selectedProfile;
}

function getMockProfiles(currentYear: number): ResumeProfile[] {
  return [
    // Profile 1: 资深前端工程师
    {
      fullName: '王小明',
      email: 'wangxm@example.com',
      phone: '+86 138-1234-5678',
      location: '北京市朝阳区',
      summary: '具有8年互联网产品开发经验的资深工程师，精通全栈开发技术，在大型分布式系统设计和优化方面有深入研究。',
      
      currentPosition: '高级前端工程师',
      currentCompany: '腾讯科技',
      yearsOfExperience: 8,
      industryExperience: ['互联网', '金融科技', '电子商务'],
      
      education: [
        {
          school: '北京大学',
          degree: '硕士',
          field: '计算机科学与技术',
          startDate: '2014-09',
          endDate: '2017-06',
          description: '研究方向：分布式系统和云计算',
        },
        {
          school: '清华大学',
          degree: '学士',
          field: '计算机科学与技术',
          startDate: '2010-09',
          endDate: '2014-06',
          description: '绩点：3.8/4.0',
        },
      ],
      
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          issueDate: '2022-03',
          credentialId: 'AWS-SA-2022-001',
        },
        {
          name: 'Google Cloud Professional Developer',
          issuer: 'Google Cloud',
          issueDate: '2021-11',
          credentialId: 'GCP-PD-2021-001',
        },
      ],
      
      languages: [
        { name: '中文', proficiency: 'native' },
        { name: '英文', proficiency: 'fluent' },
        { name: '日文', proficiency: 'intermediate' },
      ],
      
      skills: [
        { name: 'React', proficiency: 'expert', yearsOfExperience: 6, category: 'Frontend' },
        { name: 'Vue.js', proficiency: 'expert', yearsOfExperience: 5, category: 'Frontend' },
        { name: 'TypeScript', proficiency: 'advanced', yearsOfExperience: 5, category: 'Language' },
        { name: 'Node.js', proficiency: 'advanced', yearsOfExperience: 4, category: 'Backend' },
        { name: 'Webpack', proficiency: 'advanced', yearsOfExperience: 5, category: 'Build Tools' },
        { name: 'Redux', proficiency: 'advanced', yearsOfExperience: 4, category: 'State Management' },
        { name: 'GraphQL', proficiency: 'intermediate', yearsOfExperience: 2, category: 'API' },
        { name: 'Docker', proficiency: 'intermediate', yearsOfExperience: 3, category: 'DevOps' },
      ],
      
      topSkills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Webpack'],
      skillGaps: ['微前端', 'Flutter', 'AI/ML'],
      
      workExperience: [
        {
          company: '腾讯科技',
          position: '高级前端工程师',
          startDate: '2021-03',
          endDate: currentYear.toString(),
          currentlyWorking: true,
          description: '负责核心产品的全栈开发和架构设计，带领5人前端团队',
          achievements: [
            '设计并实现了新的微前端架构，项目复用率提升60%',
            '建立了完整的前端性能监控系统，页面加载速度提升40%',
            '培养了3名初级工程师成长为高级工程师',
          ],
        },
        {
          company: '字节跳动',
          position: '前端工程师',
          startDate: '2018-06',
          endDate: '2021-02',
          currentlyWorking: false,
          description: '开发和维护抖音Web端和内部管理系统',
          achievements: [
            '主导了Web端小程序框架的选型和实现',
            '优化了首屏渲染时间，从2.5s降低到0.8s',
            '建立了前端组件库，服务10+个业务线',
          ],
        },
        {
          company: '美团',
          position: '初级前端工程师',
          startDate: '2016-07',
          endDate: '2018-05',
          currentlyWorking: false,
          description: '开发美团外卖前端页面和移动端H5',
          achievements: [
            '独立完成了订单详情页的组件化重构',
            '实现了移动端适配方案，解决了多端兼容问题',
            '参与了双11大促的前端性能优化工作',
          ],
        },
      ],
      
      careerTrend: 'ascending',
      cultureFitScore: 85,
      technicalDepthScore: 90,
      leadershipScore: 78,
      adaptabilityScore: 82,
      overallTalentScore: 88,
      
      recommendedPositions: ['技术负责人', '前端架构师', '技术总监', '前端技术专家'],
      developmentAreas: ['团队管理', '微前端架构', '移动端开发'],
      strengths: ['技术深度', '前端架构', '团队协作', '学习能力'],
      
      // 暂时设置这些字段，后面会覆盖
      uploadDate: '',
      fileName: '',
      fileSize: 0,
    },
    
    // Profile 2: 产品经理
    {
      fullName: '李晓红',
      email: 'lixh@example.com',
      phone: '+86 139-8765-4321',
      location: '上海市浦东新区',
      summary: '具有6年互联网产品管理经验，专注于B端SaaS产品和数据驱动决策，在用户增长和商业化方面有丰富经验。',
      
      currentPosition: '高级产品经理',
      currentCompany: '阿里巴巴',
      yearsOfExperience: 6,
      industryExperience: ['企业服务', 'SaaS', '电商'],
      
      education: [
        {
          school: '复旦大学',
          degree: '硕士',
          field: '工商管理（MBA）',
          startDate: '2018-09',
          endDate: '2020-06',
          description: '主修：战略管理、产品创新',
        },
        {
          school: '上海交通大学',
          degree: '学士',
          field: '信息管理',
          startDate: '2014-09',
          endDate: '2018-06',
          description: '绩点：3.7/4.0',
        },
      ],
      
      certifications: [
        {
          name: 'Certified Product Manager',
          issuer: 'Pragmatic Institute',
          issueDate: '2021-08',
          credentialId: 'CPM-2021-001',
        },
        {
          name: 'PMP项目管理专业人士',
          issuer: 'PMI',
          issueDate: '2020-12',
          credentialId: 'PMP-2020-001',
        },
      ],
      
      languages: [
        { name: '中文', proficiency: 'native' },
        { name: '英文', proficiency: 'fluent' },
        { name: '韩文', proficiency: 'basic' },
      ],
      
      skills: [
        { name: '产品规划', proficiency: 'expert', yearsOfExperience: 6, category: 'Product' },
        { name: '需求分析', proficiency: 'expert', yearsOfExperience: 6, category: 'Product' },
        { name: '数据分析', proficiency: 'advanced', yearsOfExperience: 5, category: 'Analytics' },
        { name: '用户研究', proficiency: 'advanced', yearsOfExperience: 4, category: 'Research' },
        { name: '项目管理', proficiency: 'advanced', yearsOfExperience: 5, category: 'Management' },
        { name: 'SQL', proficiency: 'intermediate', yearsOfExperience: 3, category: 'Analytics' },
        { name: 'Python', proficiency: 'intermediate', yearsOfExperience: 2, category: 'Analytics' },
        { name: 'Figma', proficiency: 'advanced', yearsOfExperience: 4, category: 'Design' },
      ],
      
      topSkills: ['产品规划', '需求分析', '数据分析', '用户研究', '项目管理'],
      skillGaps: ['机器学习', '区块链', 'IoT产品'],
      
      workExperience: [
        {
          company: '阿里巴巴',
          position: '高级产品经理',
          startDate: '2020-01',
          endDate: currentYear.toString(),
          currentlyWorking: true,
          description: '负责企业SaaS产品的规划和管理，主导产品从0到1的构建',
          achievements: [
            '主导的产品用户数从0增长到100万，月活跃用户30万',
            '设计了完整的产品漏斗和转化体系，转化率提升35%',
            '建立了跨部门协作机制，缩短了产品迭代周期50%',
          ],
        },
        {
          company: '字节跳动',
          position: '产品经理',
          startDate: '2018-07',
          endDate: '2019-12',
          currentlyWorking: false,
          description: '负责B端SaaS产品的需求分析和功能设计',
          achievements: [
            '完成了核心功能的用户调研和需求分析',
            '设计了数据看板系统，帮助企业提升运营效率25%',
            '建立了产品数据监控体系，实时追踪关键指标',
          ],
        },
        {
          company: '京东',
          position: '产品助理',
          startDate: '2017-07',
          endDate: '2018-06',
          currentlyWorking: false,
          description: '参与电商平台后台管理系统的产品设计',
          achievements: [
            '协助完成了商家管理系统2.0版本的升级',
            '参与了用户行为分析和体验优化项目',
            '建立了产品需求文档模板和规范',
          ],
        },
      ],
      
      careerTrend: 'ascending',
      cultureFitScore: 90,
      technicalDepthScore: 70,
      leadershipScore: 85,
      adaptabilityScore: 88,
      overallTalentScore: 86,
      
      recommendedPositions: ['产品总监', '高级产品经理', '产品战略总监', '产品顾问'],
      developmentAreas: ['技术理解', '商业模式', '国际业务'],
      strengths: ['用户洞察', '数据分析', '团队领导', '商业思维'],
      
      uploadDate: '',
      fileName: '',
      fileSize: 0,
    },
    
    // Profile 3: 后端架构师
    {
      fullName: '张伟强',
      email: 'zhangwq@example.com',
      phone: '+86 137-5555-1234',
      location: '深圳市南山区',
      summary: '具有10年大型分布式系统架构设计经验，精通微服务架构和高并发系统设计，在系统性能优化和团队管理方面有丰富经验。',
      
      currentPosition: '技术架构师',
      currentCompany: '华为云',
      yearsOfExperience: 10,
      industryExperience: ['云计算', '企业服务', '金融科技'],
      
      education: [
        {
          school: '中科院计算技术研究所',
          degree: '硕士',
          field: '计算机系统结构',
          startDate: '2011-09',
          endDate: '2014-06',
          description: '研究方向：分布式计算和高性能计算',
        },
        {
          school: '华中科技大学',
          degree: '学士',
          field: '计算机科学与技术',
          startDate: '2007-09',
          endDate: '2011-06',
          description: '绩点：3.9/4.0',
        },
      ],
      
      certifications: [
        {
          name: 'Kubernetes Certified Administrator',
          issuer: 'Cloud Native Computing Foundation',
          issueDate: '2023-06',
          credentialId: 'KCA-2023-001',
        },
        {
          name: 'AWS Certified Solutions Architect Professional',
          issuer: 'Amazon Web Services',
          issueDate: '2022-09',
          credentialId: 'AWS-SAP-2022-001',
        },
        {
          name: 'Red Hat Certified Architect',
          issuer: 'Red Hat',
          issueDate: '2021-12',
          credentialId: 'RHCA-2021-001',
        },
      ],
      
      languages: [
        { name: '中文', proficiency: 'native' },
        { name: '英文', proficiency: 'fluent' },
        { name: '德文', proficiency: 'intermediate' },
      ],
      
      skills: [
        { name: 'Java', proficiency: 'expert', yearsOfExperience: 8, category: 'Backend' },
        { name: 'Spring Cloud', proficiency: 'expert', yearsOfExperience: 6, category: 'Framework' },
        { name: '微服务架构', proficiency: 'expert', yearsOfExperience: 7, category: 'Architecture' },
        { name: 'Kubernetes', proficiency: 'expert', yearsOfExperience: 5, category: 'DevOps' },
        { name: '数据库优化', proficiency: 'expert', yearsOfExperience: 8, category: 'Database' },
        { name: 'Redis', proficiency: 'advanced', yearsOfExperience: 6, category: 'Cache' },
        { name: 'Kafka', proficiency: 'advanced', yearsOfExperience: 5, category: 'Message Queue' },
        { name: 'Elasticsearch', proficiency: 'advanced', yearsOfExperience: 4, category: 'Search' },
      ],
      
      topSkills: ['Java', 'Spring Cloud', '微服务架构', 'Kubernetes', '数据库优化'],
      skillGaps: ['Go语言', 'Rust', '边缘计算'],
      
      workExperience: [
        {
          company: '华为云',
          position: '技术架构师',
          startDate: '2019-03',
          endDate: currentYear.toString(),
          currentlyWorking: true,
          description: '负责华为云核心产品的架构设计和技术决策',
          achievements: [
            '主导设计了新一代云原生架构，支持千万级并发',
            '建立了完整的微服务治理体系，服务可用性提升到99.99%',
            '领导了数据库分库分表方案，成功支撑业务10倍增长',
          ],
        },
        {
          company: '阿里巴巴',
          position: '高级技术专家',
          startDate: '2016-01',
          endDate: '2019-02',
          currentlyWorking: false,
          description: '负责电商核心交易系统的架构设计',
          achievements: [
            '设计了高可用分布式事务解决方案',
            '优化了订单处理流程，峰值处理能力提升3倍',
            '建立了完善的监控和告警体系，故障定位时间缩短80%',
          ],
        },
        {
          company: '腾讯',
          position: '后端工程师',
          startDate: '2014-07',
          endDate: '2015-12',
          currentlyWorking: false,
          description: '负责社交产品的后端开发',
          achievements: [
            '优化了消息推送系统，推送成功率从95%提升到99%',
            '设计了社交关系图谱存储方案',
            '参与了实时音视频通话系统的基础架构建设',
          ],
        },
      ],
      
      careerTrend: 'ascending',
      cultureFitScore: 88,
      technicalDepthScore: 95,
      leadershipScore: 90,
      adaptabilityScore: 85,
      overallTalentScore: 92,
      
      recommendedPositions: ['首席架构师', 'CTO', '技术总监', '架构顾问'],
      developmentAreas: ['云原生生态', 'AI/ML基础设施', '技术战略'],
      strengths: ['架构设计', '技术领导', '性能优化', '团队培养'],
      
      uploadDate: '',
      fileName: '',
      fileSize: 0,
    }
  ];
}

/**
 * Extract key insights from resume profile
 */
export function generateTalentInsights(profile: ResumeProfile) {
  return {
    summary: `${profile.fullName}是一位${profile.yearsOfExperience}年经验的${profile.currentPosition}，在${profile.industryExperience.join('、')}等领域有深入经验。`,
    keyStrengths: profile.strengths,
    developmentPriorities: profile.developmentAreas,
    recommendedRoles: profile.recommendedPositions,
    matchingScore: profile.overallTalentScore,
    careerTrajectory: `职业发展趋势${profile.careerTrend === 'ascending' ? '向上' : profile.careerTrend === 'stable' ? '稳定' : '下降'}`,
  };
}

/**
 * Calculate skill match score against job requirements
 */
export function calculateSkillMatch(
  profile: ResumeProfile,
  requiredSkills: string[]
): { matchScore: number; matchedSkills: string[]; missingSkills: string[] } {
  const profileSkillNames = profile.skills.map((s) => s.name.toLowerCase());
  const requiredSkillsLower = requiredSkills.map((s) => s.toLowerCase());

  const matchedSkills = requiredSkillsLower.filter((skill) =>
    profileSkillNames.some((ps) => ps.includes(skill) || skill.includes(ps))
  );

  const missingSkills = requiredSkillsLower.filter(
    (skill) => !matchedSkills.includes(skill)
  );

  const matchScore = Math.round((matchedSkills.length / requiredSkills.length) * 100);

  return {
    matchScore,
    matchedSkills,
    missingSkills,
  };
}

/**
 * Format resume profile for display
 */
export function formatResumeForDisplay(profile: ResumeProfile) {
  return {
    ...profile,
    yearsOfExperienceFormatted: `${profile.yearsOfExperience}年`,
    topSkillsFormatted: profile.topSkills.join(' · '),
    educationFormatted: profile.education
      .map((e) => `${e.degree} - ${e.field} (${e.school})`)
      .join(' | '),
    currentRoleFormatted: `${profile.currentPosition} @ ${profile.currentCompany}`,
  };
}
