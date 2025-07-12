import { useState, useEffect } from 'react'
import { Home, FolderOpen, Briefcase, Zap, Mail } from 'lucide-react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'

const navigation = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Zap },
  { name: 'Contact', href: '#contact', icon: Mail },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        threshold: window.innerWidth < 768 ? 0.3 : 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleTabClick = (href: string) => {
    const sectionId = href.slice(1)
    setActiveSection(sectionId)
  }

  return (
    <div className="min-h-screen bg-paper paper-texture">
      {/* Main Content */}
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Floating Bottom Tabbar */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-paper/95 backdrop-blur-sm border border-border-brutal/50 shadow-xl rounded-2xl px-3 py-2">
          <div className="flex items-center gap-2 relative w-max min-w-[320px] sm:min-w-[400px]">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.slice(1)
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleTabClick(item.href)}
                  className={`relative flex flex-col items-center justify-center flex-1 py-3 px-3 rounded-xl transition-all duration-300 ease-out group overflow-hidden min-w-[60px] sm:min-w-[75px] ${
                    isActive
                      ? 'bg-accent text-ink shadow-md transform scale-105'
                      : 'text-ink/70 hover:text-ink hover:bg-accent/10 hover:scale-105'
                  }`}
                  title={item.name}
                >
                  {/* Background highlight */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-accent/30 to-accent/10 rounded-xl transition-all duration-300 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}></div>
                  
                  <Icon 
                    size={18} 
                    className={`relative z-10 transition-all duration-300 ease-out ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} 
                  />
                  <span className={`relative z-10 text-xs font-medium mt-1 tracking-wide transition-all duration-300 ease-out hidden sm:block whitespace-nowrap ${
                    isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Subtle pulse for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-accent/20 rounded-xl animate-pulse opacity-50"></div>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App 