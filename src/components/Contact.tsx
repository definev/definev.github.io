import { Mail, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react'

const contactMethods = [
  {
    name: "Email",
    value: "daiduong.workmail@gmail.com",
    href: "mailto:daiduong.workmail@gmail.com",
    icon: Mail,
    description: "Best way to reach me for collaborations or questions"
  },
  {
    name: "GitHub",
    value: "@definev",
    href: "https://github.com/definev",
    icon: Github,
    description: "Check out my code and open source contributions"
  },
  {
    name: "LinkedIn",
    value: "Bùi Đại Dương",
    href: "https://www.linkedin.com/in/definev/",
    icon: Linkedin,
    description: "Let's connect professionally"
  },
  {
    name: "Twitter/X",
    value: "@definev2",
    href: "https://x.com/definev2",
    icon: Twitter,
    description: "Follow my thoughts on tech and development"
  }
]

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-paper paper-texture">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="bg-accent border-2 border-border-brutal shadow-lg p-4 md:p-6 inline-block">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-0 uppercase tracking-tight">
              [LET'S CONNECT]
            </h2>
          </div>
          <div className="bg-paper border-2 border-border-brutal shadow-md p-3 md:p-4 max-w-3xl mx-auto mt-4">
            <p className="text-sm md:text-base text-ink font-medium">
              {">>>"} I'm always excited to discuss technology, share knowledge, or collaborate on interesting projects. 
              Feel free to reach out!
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-brutal p-4 md:p-6 group flex items-start gap-4"
            >
              <div className="bg-accent border-2 border-border-brutal p-3 group-hover:bg-accent-dark transition-colors">
                <method.icon className="text-ink" size={20} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-display font-bold text-ink mb-1 uppercase tracking-tight">
                  {method.name}
                </h3>
                <p className="text-accent font-bold mb-2 text-sm">
                  {method.value}
                </p>
                <p className="text-ink-light text-xs font-medium">
                  {method.description}
                </p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center card-brutal p-6 md:p-8">
          <div className="bg-accent border-2 border-border-brutal p-4 inline-block mb-4">
            <MessageSquare className="text-ink" size={32} />
          </div>
          <h3 className="text-lg font-display font-bold text-ink mb-4 uppercase tracking-tight">
            OPEN TO OPPORTUNITIES
          </h3>
          <p className="text-ink-light mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
            {">>>"} I'm currently exploring new opportunities in software development, particularly in roles 
            that involve low-level programming, machine learning, or building developer tools. 
            I'm also interested in contributing to open source projects and tech communities.
          </p>
          <a
            href="mailto:daiduong.workmail@gmail.com?subject=Let's%20discuss%20an%20opportunity"
            className="btn-brutal text-sm uppercase tracking-wider inline-flex items-center gap-2"
          >
            <Mail size={16} />
            {">"}{">"}START A CONVERSATION
          </a>
        </div>
        
        <div className="text-center mt-12 pt-6 border-t-2 border-border-brutal">
          <div className="bg-paper-dark border-2 border-border-brutal shadow-md p-3 md:p-4 inline-block">
            <p className="text-ink font-medium text-xs">
              BUILT WITH REACT, TYPESCRIPT, AND TAILWIND CSS •{' '}
              <a 
                href="https://definev.github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent font-bold hover:underline uppercase"
              >
                VISIT MAIN SITE
              </a>
            </p>
            <p className="text-ink-light text-xs mt-1 font-bold uppercase tracking-wider">
              © 2024 BÙI ĐẠI DƯƠNG. ALWAYS LEARNING, ALWAYS BUILDING.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 