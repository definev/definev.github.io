import { Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    title: "AI Engineer",
    company: "Edge8",
    location: "Remote - HCM, Vietnam",
    period: "Feb 2025 - Present",
    description: [
      "Building cutting-edge agentic systems from foundational agentic frameworks to production-ready implementations",
      "Developing intelligent mobile applications that leverage AI agents for enhanced user experiences and automated workflows",
      "Architecting and implementing multi-agent systems that can autonomously perform complex tasks and decision-making",
      "Integrating large language models and AI capabilities into mobile applications using Flutter and native platform features",
      "Collaborating with cross-functional teams to design AI-powered features that solve real-world user problems",
      "Optimizing AI model performance for mobile devices while maintaining quality and responsiveness",
      "Contributing to the development of proprietary agentic frameworks and AI infrastructure"
    ]
  },
  {
    title: "Mobile Lead Engineer",
    company: "SaveDay",
    location: "Hanoi, Vietnam",
    period: "Jan 2024 - Dec 2024",
    description: [
      "Lead developer for mobile applications at SaveDay, managing team collaboration and development processes",
      "Developed scalable architecture using GitLab for version control, Jira for project management, and Riverpod with Flutter Hook for efficient state management",
      "Implemented consistent design system and smooth animations to enhance user retention",
      "Collaborated with designers, product managers, and backend developers to ensure seamless platform integration",
      "Ensured mobile app quality through rigorous testing, debugging, and CI/CD processes",
      "Leveraged native capabilities such as Home Widgets and Share Extensions to integrate SaveDay into users' daily tasks"
    ]
  },
  {
    title: "Chapter Leader",
    company: "Google Developer Student Club · Phenikaa University",
    location: "Hanoi, Vietnam",
    period: "Jul 2023 - Sep 2024",
    description: [
      "Led Google Developer Student Club chapter at Phenikaa University",
      "Organized workshops, events, and technical sessions for student developers",
      "Mentored students in various Google technologies and development practices",
      "Built community engagement and fostered knowledge sharing among members"
    ]
  },
  {
    title: "Mobile Engineer",
    company: "Caroot",
    location: "Hanoi, Vietnam",
    period: "Dec 2022 - May 2023",
    description: [
      "Focused on learning and enhancing team collaboration while developing mobile applications",
      "Implemented smooth animations and optimized user interactions for polished app experiences",
      "Developed features following Clean Architecture principles for scalability and maintainability",
      "Collaborated with cross-functional teams to align app design and functionality with project goals"
    ]
  },
  {
    title: "Mobile Engineer",
    company: "Hapi Solutions",
    location: "Hanoi, Vietnam",
    period: "Sep 2019 - Jan 2024",
    description: [
      "Developed Flutter-based mobile applications with tailored state management and architecture",
      "Sojo Hotel Inroom App: Implemented guest control for in-room devices (TV, lights, bath) and service ordering using GetX, Bloc, http, and custom native Bluetooth integration",
      "MHotel: Built hotel booking and check-in/out app with Riverpod, Dio, Freezed, json_serializable, and MVC architecture",
      "Winmoney: Delivered digital wallet app for Winmart with similar architecture and features as MHotel",
      "Maintained consistent code quality and followed best practices across multiple mobile projects"
    ]
  }
]

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-paper paper-texture">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="bg-accent border-2 border-border-brutal shadow-lg p-4 md:p-6 inline-block">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-0 uppercase tracking-tight">
              [EXPERIENCE]
            </h2>
          </div>
          <div className="bg-paper border-2 border-border-brutal shadow-md p-3 md:p-4 max-w-3xl mx-auto mt-4">
            <p className="text-sm md:text-base text-ink font-medium">
              {">>>"} My journey in technology, from learning the fundamentals to leading developer communities 
              and building real-world applications.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-10 border-l-4 border-border-brutal"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-accent border-2 border-border-brutal flex items-center justify-center">
                <span className="text-ink font-bold text-xs">{index + 1}</span>
              </div>
              
              <div className="card-brutal p-4 md:p-6 ml-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-display font-bold text-ink mb-2 uppercase tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="text-accent font-bold text-sm">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:items-end mt-3 md:mt-0 bg-paper-dark border border-border-brutal p-2">
                    <div className="flex items-center gap-2 text-ink text-xs font-bold">
                      <Calendar size={12} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-ink text-xs font-bold mt-1">
                      <MapPin size={12} />
                      {exp.location}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-ink-light leading-relaxed text-xs flex items-start">
                      <span className="bg-accent border border-border-brutal w-2 h-2 mr-2 mt-1 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 