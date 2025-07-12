import { Link } from '@tanstack/react-router'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen paper-texture">
      {/* Hero Content */}
      <div className="min-h-screen flex items-center justify-center section-padding pt-20">
        <div className="container-max">
          <div className="text-center space-y-6">
            {/* Name & Intro */}
            <div className="space-y-4">
              <div className="bg-paper border-2 border-border-brutal shadow-md p-6 md:p-8 inline-block">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
                  HI, I'M BÙI ĐẠI DƯƠNG (ZEN)
                </h1>
              </div>
              
              <div className="bg-accent border-2 border-border-brutal shadow-md p-3 md:p-4 max-w-xl mx-auto">
                <p className="text-base md:text-lg text-ink font-bold">
                  22 • HANOI • SOFTWARE ENGINEER
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="#projects"
                className="btn-brutal text-sm uppercase tracking-wider"
              >
                {">"}{">"}SEE MY WORK
              </a>
              <Link
                to="/"
                className="btn-brutal-outline text-sm uppercase tracking-wider"
              >
                {">"}{">"}READ MY BLOG
              </Link>
              <a
                href="#contact"
                className="btn-brutal-outline text-sm uppercase tracking-wider"
              >
                {">"}{">"}LET'S CONNECT
              </a>
            </div>
          </div>
          

        </div>
      </div>
      
      {/* About Section */}
      <div className="section-padding">
        <div className="container-max">
          {/* About Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="card-brutal p-4 md:p-6">
              <div className="bg-paper-dark border border-border-brutal p-2 mb-4 inline-block">
                <h3 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                  WHAT I LOVE
                </h3>
              </div>
              <p className="text-ink text-sm leading-relaxed">
                Figuring out how machines think and exploring what's under the hood. 
                From low-level programming to building apps that connect to the real world.
              </p>
            </div>
            
            <div className="card-brutal p-4 md:p-6">
              <div className="bg-paper-dark border border-border-brutal p-2 mb-4 inline-block">
                <h3 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                  WHY I CODE
                </h3>
              </div>
              <p className="text-ink text-sm leading-relaxed">
                It's not just about writing code that runs — it's about understanding WHY it runs 
                and how to make it run smarter next time.
              </p>
            </div>
            
            <div className="card-brutal p-4 md:p-6">
              <div className="bg-paper-dark border border-border-brutal p-2 mb-4 inline-block">
                <h3 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                  SHARING KNOWLEDGE
                </h3>
              </div>
              <p className="text-ink text-sm leading-relaxed">
                Leading our university's developer club and joining local conferences. 
                I grow faster when sharing what I know with others.
              </p>
            </div>
            
            <div className="card-brutal p-4 md:p-6">
              <div className="bg-paper-dark border border-border-brutal p-2 mb-4 inline-block">
                <h3 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                  MY GOAL
                </h3>
              </div>
              <p className="text-ink text-sm leading-relaxed">
                Understanding machines so I can make them do more for people — 
                and share that knowledge so others can do the same.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 