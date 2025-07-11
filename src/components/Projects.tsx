import { ExternalLink, Github } from 'lucide-react'

const projects = [
    {
        title: "Zentab",
        description: "Multi-account manager for web apps that allows cloning, isolating, and syncing multiple logins across devices. Login once, use everywhere with seamless account switching.",
        technologies: ["Web Extension", "Cross-device Sync", "Account Management", "Privacy"],
        github: "https://github.com/definev",
        demo: "https://github.com/definev",
        image: "/zentab-thumbnail.jpg"
    },
    {
        title: "Slideparty",
        description: "Cross-platform slide puzzle game with realtime multiplayer functionality. Winner of 'Best Multiplatform' at Flutter Puzzle Hack Hackathon.",
        technologies: ["Flutter", "Dart Backend", "WebSocket", "Cross-platform"],
        github: "https://github.com/definev",
        demo: "https://github.com/definev",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop&crop=center"
    },
    {
        title: "ViL Programming Language",
        description: "A scripting language with pure Vietnamese syntax designed to help students approach programming more easily.",
        technologies: ["Language Design", "Compiler", "Web Editor", "Vietnamese"],
        github: "https://github.com/definev",
        demo: "https://github.com/definev",
        image: "https://images.unsplash.com/photo-1516134850191-6aaac2bdf42c?w=400&h=250&fit=crop&crop=center"
    },
    {
        title: "Gemboard",
        description: "A powerful Flutter application with infinite canvas for brainstorming sessions and data mining. Combines visual representations with large language models to explore complex ideas dynamically.",
        technologies: ["Flutter", "Dart", "Google Gemini", "AI/ML"],
        github: "https://github.com/definev",
        demo: "https://github.com/definev",
        image: "/gemboard-thumbnail.jpg"
    },
]

const Projects = () => {
    return (
        <section id="projects" className="section-padding bg-paper-dark paper-texture">
            <div className="container-max">
                <div className="text-center mb-12">
                    <div className="bg-paper border-2 border-border-brutal shadow-lg p-4 md:p-6 inline-block">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2 uppercase tracking-tight">
                            [FEATURED PROJECTS]
                        </h2>
                    </div>
                    <div className="bg-paper border-2 border-border-brutal shadow-md p-3 md:p-4 max-w-3xl mx-auto mt-4">
                        <p className="text-sm md:text-base text-ink font-medium">
                            {">>>"} A collection of projects that showcase my passion for understanding how things work
                            and building solutions that matter.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto space-y-5">
                    {/* First Row: 2:1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-auto lg:h-80">
                        {/* Project 1 - Large Card - Image on right */}
                        <div className="lg:col-span-2 bg-paper-dark border-2 border-border-brutal shadow-lg overflow-hidden lg:flex lg:h-full gap-5">
                            <div className="lg:w-1/2 p-3 lg:p-4 flex flex-col justify-between bg-paper-dark">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <h3 className="text-lg lg:text-xl font-display font-bold text-ink uppercase tracking-tight leading-tight">
                                            {projects[0].title}
                                        </h3>
                                        <div className="bg-accent border border-border-brutal px-3 py-1 flex-shrink-0">
                                            <span className="text-xs font-bold text-ink uppercase">FEATURED</span>
                                        </div>
                                    </div>

                                    <p className="text-ink text-sm leading-relaxed mb-4">
                                        {projects[0].description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {projects[0].technologies.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-accent border border-border-brutal text-ink text-xs font-bold uppercase shadow-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <a href={projects[0].github} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 bg-paper border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent shadow-md hover:shadow-lg transition-all duration-200">
                                            <Github size={12} />CODE
                                        </a>
                                        <a href={projects[0].demo} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 bg-accent border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200">
                                            <ExternalLink size={12} />DEMO
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 h-48 lg:h-full overflow-hidden relative bg-paper sm:border-t-2 md:border-t-2 lg:border-l-2 border-border-brutal">
                                <img
                                    src={projects[0].image}
                                    alt={projects[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Project 2 - Small Card - No image */}
                        <div className="bg-paper border-2 border-border-brutal shadow-lg overflow-hidden h-full p-3 lg:p-4 flex flex-col justify-between bg-gradient-to-br from-paper-dark to-paper">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-base font-display font-bold text-ink uppercase tracking-tight leading-tight">
                                        {projects[1].title}
                                    </h3>
                                    <div className="bg-accent border border-border-brutal px-3 py-1 flex-shrink-0">
                                        <span className="text-xs font-bold text-ink uppercase">GAME</span>
                                    </div>
                                </div>

                                <p className="text-ink text-sm leading-relaxed mb-4 flex-grow">
                                    {projects[1].description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-1">
                                    {projects[1].technologies.slice(0, 2).map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-accent border border-border-brutal text-ink text-xs font-bold uppercase">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <a href={projects[1].github} className="inline-flex items-center justify-center gap-1 bg-paper border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent shadow-md hover:shadow-lg transition-all duration-200">
                                        <Github size={12} />CODE
                                    </a>
                                    <a href={projects[1].demo} className="inline-flex items-center justify-center gap-1 bg-accent border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200">
                                        <ExternalLink size={12} />DEMO
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row: 1:2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-auto lg:h-80">
                        {/* Project 3 - Small Card - No image */}
                        <div className="bg-paper border-2 border-border-brutal shadow-lg overflow-hidden h-full p-3 lg:p-4 flex flex-col justify-between bg-gradient-to-br from-paper to-paper-dark">
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-base font-display font-bold text-ink uppercase tracking-tight leading-tight">
                                        {projects[2].title}
                                    </h3>
                                    <div className="bg-accent border border-border-brutal px-3 py-1 flex-shrink-0">
                                        <span className="text-xs font-bold text-ink uppercase">LANGUAGE</span>
                                    </div>
                                </div>

                                <p className="text-ink text-sm leading-relaxed mb-4 flex-grow">
                                    {projects[2].description}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-1">
                                    {projects[2].technologies.slice(0, 2).map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-accent border border-border-brutal text-ink text-xs font-bold uppercase">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <a href={projects[2].github} className="inline-flex items-center justify-center gap-1 bg-paper border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent shadow-md hover:shadow-lg transition-all duration-200">
                                        <Github size={12} />CODE
                                    </a>
                                    <a href={projects[2].demo} className="inline-flex items-center justify-center gap-1 bg-accent border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200">
                                        <ExternalLink size={12} />DEMO
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Project 4 - Large Card - Image on left */}
                        <div className="lg:col-span-2 bg-paper-dark border-2 border-border-brutal shadow-lg overflow-hidden lg:flex lg:h-full gap-5">
                            <div className="lg:w-1/2 h-48 lg:h-full overflow-hidden relative bg-paper sm:border-b-2 md:border-b-2 lg:border-r-2 border-border-brutal">
                                <img
                                    src={projects[3].image}
                                    alt={projects[3].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="lg:w-1/2 p-3 lg:p-4 flex flex-col justify-between bg-paper-dark">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <h3 className="text-lg lg:text-xl font-display font-bold text-ink uppercase tracking-tight leading-tight">
                                            {projects[3].title}
                                        </h3>
                                        <div className="bg-accent border border-border-brutal px-3 py-1 flex-shrink-0">
                                            <span className="text-xs font-bold text-ink uppercase">UTILITY</span>
                                        </div>
                                    </div>

                                    <p className="text-ink text-sm leading-relaxed mb-4">
                                        {projects[3].description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {projects[3].technologies.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-accent border border-border-brutal text-ink text-xs font-bold uppercase shadow-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <a href={projects[3].github} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 bg-paper border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent shadow-md hover:shadow-lg transition-all duration-200">
                                            <Github size={12} />CODE
                                        </a>
                                        <a href={projects[3].demo} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1 bg-accent border border-border-brutal px-3 py-2 font-bold text-xs uppercase text-ink hover:bg-accent-dark shadow-md hover:shadow-lg transition-all duration-200">
                                            <ExternalLink size={12} />DEMO
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects 