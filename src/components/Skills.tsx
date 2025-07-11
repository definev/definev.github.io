const getSkillClass = (level: number) => {
  if (level >= 90) return 'skill-expert'
  if (level >= 80) return 'skill-advanced'
  if (level >= 70) return 'skill-intermediate'
  if (level < 30) return 'skill-ngmi'
  return 'skill-learning'
}

const getSkillLabel = (level: number) => {
  if (level >= 90) return 'EXPERT'
  if (level >= 80) return 'ADVANCED'
  if (level >= 70) return 'INTERMEDIATE'
  if (level < 30) return 'NGMI'
  return 'LEARNING'
}

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Dart", level: 95 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Swift", level: 85 },
      { name: "Go", level: 80 },
      { name: "C/C++", level: 70 },
      { name: "Rust", level: 70 },
    ]
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "Flutter", level: 95 },
      { name: "SwiftUI", level: 80 },
      { name: "Jetpack Compose", level: 75 },
    ]
  },
  {
    title: "Frontend & Backend",
    skills: [
      { name: "Shelf (Dart)", level: 90 },
      { name: "Flask (Python)", level: 80 },
      { name: "Fiber (Go)", level: 80 },
      { name: "Node.js (JavaScript)", level: 70 },
      { name: "React/Next.js", level: 70 },
    ]
  },
  {
    title: "Design & UI Tools",
    skills: [
      { name: "Prototyping", level: 90 },
      { name: "Design Systems", level: 90 },
      { name: "Figma", level: 85 },
      { name: "UI/UX Design", level: 80 },
    ]
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Git/GitHub", level: 92 },
      { name: "Supabase", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Firebase", level: 85 },
      { name: "AWS/GCP", level: 70 },
      { name: "CI/CD", level: 75 }
    ]
  },
  {
    title: "Fun stuff",
    skills: [
      { name: "Guitar", level: 80 },
      { name: "Skateboarding", level: 60 },
      { name: "Cooking", level: 20 },
    ]
  }
]

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-paper-dark paper-texture">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="bg-paper border-2 border-border-brutal shadow-lg p-4 md:p-6 inline-block">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-0 uppercase tracking-tight">
              [SKILLS & TECH]
            </h2>
          </div>
          <div className="bg-paper border-2 border-border-brutal shadow-md p-3 md:p-4 max-w-3xl mx-auto mt-4">
            <p className="text-sm md:text-base text-ink font-medium">
              {">>>"} Technologies I've learned through hands-on projects, academic study, and endless curiosity 
              about how things work under the hood.
            </p>
          </div>
        </div>
        
        {/* Skills Grid - Stable Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="card-brutal p-4 md:p-6">
              <div className="bg-accent border-2 border-border-brutal p-2 mb-4 inline-block">
                <h3 className="text-sm font-display font-bold text-ink uppercase tracking-tight">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-ink font-bold text-xs uppercase tracking-wider">
                      {skill.name}
                    </span>
                    <div className={`${getSkillClass(skill.level)} px-2 py-1 text-xs font-bold uppercase tracking-wider`}>
                      {getSkillLabel(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend Section */}
        <div className="card-brutal p-4 md:p-6 text-center">
          <div className="bg-paper-dark border-2 border-border-brutal p-2 mb-4 inline-block">
            <h3 className="text-sm font-display font-bold text-ink uppercase tracking-tight">
              SKILL LEVELS
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="skill-expert px-2 py-1 text-xs font-bold uppercase">EXPERT</div>
              <span className="text-ink text-xs">90%+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="skill-advanced px-2 py-1 text-xs font-bold uppercase">ADVANCED</div>
              <span className="text-ink text-xs">80-89%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="skill-intermediate px-2 py-1 text-xs font-bold uppercase">INTERMEDIATE</div>
              <span className="text-ink text-xs">70-79%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="skill-learning px-2 py-1 text-xs font-bold uppercase">LEARNING</div>
              <span className="text-ink text-xs">60-69%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-paper border-2 border-border-brutal shadow-md p-4 md:p-6 max-w-4xl mx-auto">
            <p className="text-ink font-medium text-sm md:text-base">
              {">>>"} "I'm always learning something new. The best part about technology is that there's 
              always another layer to explore, another problem to solve."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 