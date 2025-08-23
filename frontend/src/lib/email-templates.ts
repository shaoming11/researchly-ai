export interface EmailTemplate {
  id: string
  name: string
  description: string
  subject: string
  body: string
  category: "research" | "phd" | "collaboration" | "general"
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "research-opportunity",
    name: "Research Opportunity Inquiry",
    description: "Express interest in joining a research project or lab",
    category: "research",
    subject: "Research Opportunity Inquiry - {studentName}",
    body: `Dear Professor {professorName},

I hope this email finds you well. My name is {studentName}, and I am a {studentLevel} at {studentUniversity} studying {studentMajor}.

I have been following your research in {researchArea}, particularly your recent work on "{recentPublication}". Your approach to {specificInterest} aligns perfectly with my academic interests and career goals.

I am writing to inquire about potential research opportunities in your lab. I am particularly interested in {specificProject} and would love to contribute to ongoing projects or assist with new initiatives.

My relevant experience includes:
- {experience1}
- {experience2}
- {experience3}

I have attached my resume and would be happy to discuss how I might contribute to your research team. Would you be available for a brief meeting to discuss potential opportunities?

Thank you for your time and consideration.

Best regards,
{studentName}
{studentEmail}
{studentPhone}`,
  },
  {
    id: "phd-application",
    name: "PhD Application Interest",
    description: "Express interest in PhD programs and potential supervision",
    category: "phd",
    subject: "PhD Application Inquiry - {studentName}",
    body: `Dear Professor {professorName},

I hope you are doing well. My name is {studentName}, and I am currently completing my {currentDegree} in {studentMajor} at {studentUniversity}.

I am writing to express my strong interest in pursuing a PhD under your supervision. Your research in {researchArea}, especially your work on "{recentPublication}", has greatly influenced my academic trajectory and research interests.

My research interests align closely with your work, particularly in:
- {interest1}
- {interest2}
- {interest3}

During my {currentDegree}, I have gained experience in {relevantSkills} and have worked on projects involving {projectDescription}. I believe this background has prepared me well for doctoral research in your lab.

I would be honored to discuss potential PhD opportunities and how my research interests might contribute to your ongoing projects. Would you be available for a conversation about your research program and admission requirements?

I have attached my CV, transcripts, and a brief research statement for your review.

Thank you for considering my inquiry.

Sincerely,
{studentName}
{studentEmail}
{studentUniversity}`,
  },
  {
    id: "collaboration-request",
    name: "Research Collaboration",
    description: "Propose collaboration on research projects or publications",
    category: "collaboration",
    subject: "Research Collaboration Opportunity - {studentName}",
    body: `Dear Professor {professorName},

I hope this message finds you well. My name is {studentName}, and I am a {studentLevel} researcher at {studentUniversity} working in {researchArea}.

I have been following your excellent work on {specificTopic}, particularly your recent publication "{recentPublication}". Your findings on {specificFinding} are highly relevant to my current research on {studentResearch}.

I believe there may be valuable opportunities for collaboration between our research efforts. Specifically, I think our work on {collaborationArea} could complement your research in {professorExpertise}.

Some potential areas for collaboration include:
- {collaboration1}
- {collaboration2}
- {collaboration3}

I would welcome the opportunity to discuss how we might work together, whether through joint publications, shared datasets, or collaborative grant applications.

Would you be interested in a brief call or meeting to explore these possibilities?

Thank you for your time and consideration.

Best regards,
{studentName}
{studentEmail}
{studentAffiliation}`,
  },
  {
    id: "general-inquiry",
    name: "General Academic Inquiry",
    description: "General outreach for advice, mentorship, or information",
    category: "general",
    subject: "Academic Inquiry from {studentName}",
    body: `Dear Professor {professorName},

I hope you are having a great day. My name is {studentName}, and I am a {studentLevel} at {studentUniversity} with a strong interest in {researchArea}.

I have been reading about your work in {specificArea}, and I find your research on "{recentPublication}" particularly fascinating. Your insights into {specificInsight} have been very influential in shaping my understanding of the field.

I am reaching out to seek your advice on {inquiryTopic}. As someone with extensive experience in {professorExpertise}, your perspective would be invaluable.

Specifically, I would appreciate your thoughts on:
- {question1}
- {question2}
- {question3}

I understand you have a busy schedule, but if you have a few minutes to share your insights, I would be extremely grateful. Even a brief email response would be incredibly helpful.

Thank you very much for your time and for the important work you do in advancing our field.

Respectfully,
{studentName}
{studentEmail}
{studentUniversity}`,
  },
]

export function getTemplateById(id: string): EmailTemplate | undefined {
  return emailTemplates.find((template) => template.id === id)
}

export function getTemplatesByCategory(category: EmailTemplate["category"]): EmailTemplate[] {
  return emailTemplates.filter((template) => template.category === category)
}
