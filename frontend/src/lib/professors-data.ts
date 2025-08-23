export interface Professor {
  id: string
  name: string
  title: string
  university: string
  department: string
  email: string
  researchAreas: string[]
  recentPublications: string[]
  bio: string
  profileImage?: string
  responseRate?: number
  preferredContactMethod: "email" | "linkedin" | "office_hours"
  lastActive: string
}

export const professorsData: Professor[] = [
  {
    id: "1",
    name: "Dr. Shaoming Wu",
    title: "Associate Professor",
    university: "Stanford University",
    department: "Computer Science",
    email: "shaoming.wu@outlook.com",
    researchAreas: ["Machine Learning", "Natural Language Processing", "AI Ethics"],
    recentPublications: [
      "Ethical Considerations in Large Language Models (2024)",
      "Bias Detection in Neural Networks (2023)",
      "Fairness in AI Systems (2023)",
    ],
    bio: "Dr. Chen's research focuses on developing ethical AI systems with particular emphasis on fairness and bias detection in machine learning models. She leads the AI Ethics Lab at Stanford.",
    responseRate: 85,
    preferredContactMethod: "email",
    lastActive: "2024-01-15",
  },
  {
    id: "2",
    name: "Prof. Michael Rodriguez",
    title: "Professor",
    university: "MIT",
    department: "Electrical Engineering",
    email: "mrodriguez@mit.edu",
    researchAreas: ["Robotics", "Computer Vision", "Autonomous Systems"],
    recentPublications: [
      "Advanced Robotics in Manufacturing (2024)",
      "Vision-Based Navigation Systems (2023)",
      "Human-Robot Interaction Patterns (2023)",
    ],
    bio: "Professor Rodriguez is a leading researcher in robotics and autonomous systems. His work has applications in manufacturing, healthcare, and space exploration.",
    responseRate: 72,
    preferredContactMethod: "email",
    lastActive: "2024-01-20",
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    title: "Assistant Professor",
    university: "Harvard University",
    department: "Psychology",
    email: "ewatson@harvard.edu",
    researchAreas: ["Cognitive Psychology", "Memory Research", "Learning Sciences"],
    recentPublications: [
      "Memory Formation in Digital Learning Environments (2024)",
      "Cognitive Load Theory Applications (2023)",
      "Attention and Focus in Modern Education (2023)",
    ],
    bio: "Dr. Watson investigates how people learn and remember information, with a focus on digital learning environments and educational technology.",
    responseRate: 91,
    preferredContactMethod: "email",
    lastActive: "2024-01-18",
  },
  {
    id: "4",
    name: "Prof. David Kim",
    title: "Professor",
    university: "UC Berkeley",
    department: "Biology",
    email: "dkim@berkeley.edu",
    researchAreas: ["Molecular Biology", "Genetics", "Biotechnology"],
    recentPublications: [
      "CRISPR Applications in Gene Therapy (2024)",
      "Molecular Mechanisms of Disease (2023)",
      "Biotechnology in Medicine (2023)",
    ],
    bio: "Professor Kim's research focuses on molecular biology and genetics, with applications in medicine and biotechnology. He directs the Molecular Medicine Lab.",
    responseRate: 68,
    preferredContactMethod: "email",
    lastActive: "2024-01-12",
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    title: "Associate Professor",
    university: "University of Chicago",
    department: "Economics",
    email: "lthompson@uchicago.edu",
    researchAreas: ["Behavioral Economics", "Market Analysis", "Economic Policy"],
    recentPublications: [
      "Behavioral Patterns in Financial Markets (2024)",
      "Economic Impact of Technology (2023)",
      "Policy Analysis and Implementation (2023)",
    ],
    bio: "Dr. Thompson studies behavioral economics and market dynamics, focusing on how psychological factors influence economic decisions.",
    responseRate: 79,
    preferredContactMethod: "email",
    lastActive: "2024-01-16",
  },
  {
    id: "6",
    name: "Prof. James Wilson",
    title: "Professor",
    university: "Yale University",
    department: "History",
    email: "jwilson@yale.edu",
    researchAreas: ["American History", "Political History", "Social Movements"],
    recentPublications: [
      "Social Movements in 20th Century America (2024)",
      "Political Change and Democracy (2023)",
      "Historical Perspectives on Modern Politics (2023)",
    ],
    bio: "Professor Wilson specializes in American political and social history, with particular interest in social movements and democratic institutions.",
    responseRate: 83,
    preferredContactMethod: "office_hours",
    lastActive: "2024-01-14",
  },
]

export function searchProfessors(
  query: string,
  filters?: {
    university?: string
    department?: string
    researchArea?: string
  },
): Professor[] {
  let results = professorsData

  // Apply text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    results = results.filter(
      (prof) =>
        prof.name.toLowerCase().includes(searchTerm) ||
        prof.university.toLowerCase().includes(searchTerm) ||
        prof.department.toLowerCase().includes(searchTerm) ||
        prof.researchAreas.some((area) => area.toLowerCase().includes(searchTerm)) ||
        prof.bio.toLowerCase().includes(searchTerm),
    )
  }

  // Apply filters
  if (filters?.university) {
    results = results.filter((prof) => prof.university === filters.university)
  }

  if (filters?.department) {
    results = results.filter((prof) => prof.department === filters.department)
  }

  if (filters?.researchArea) {
    results = results.filter((prof) =>
      prof.researchAreas.some((area) => area.toLowerCase().includes(filters.researchArea!.toLowerCase())),
    )
  }

  return results
}

export function getProfessorById(id: string): Professor | undefined {
  return professorsData.find((prof) => prof.id === id)
}

export function getUniqueUniversities(): string[] {
  return [...new Set(professorsData.map((prof) => prof.university))].sort()
}

export function getUniqueDepartments(): string[] {
  return [...new Set(professorsData.map((prof) => prof.department))].sort()
}

export function getUniqueResearchAreas(): string[] {
  const allAreas = professorsData.flatMap((prof) => prof.researchAreas)
  return [...new Set(allAreas)].sort()
}
