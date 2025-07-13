import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, FolderOpen, Briefcase, Zap, Mail, Menu, X, BookOpen, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Zap },
  { name: 'Contact', href: '#contact', icon: Mail },
]

const menuItems = [
  { name: 'Blog', href: '/blog', icon: BookOpen, external: false },
  { name: 'GitHub', href: 'https://github.com/definev', icon: Github, external: true },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/definev', icon: Linkedin, external: true },
  { name: 'Twitter', href: 'https://x.com/definev2', icon: Twitter, external: true },
]

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Backdrop - moved outside to prevent interference */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}
      
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        {/* Hamburger Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-paper border-2 border-border-brutal shadow-xl min-w-[280px] animate-in slide-in-from-bottom-2 duration-200">
            <div className="p-4">
              <div className="bg-accent border border-border-brutal p-2 mb-4">
                <h3 className="text-ink font-bold text-sm uppercase tracking-wider">QUICK LINKS</h3>
              </div>
              
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  
                  if (item.external) {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-3 bg-paper-dark border border-border-brutal text-ink hover:bg-accent hover:shadow-md transition-all duration-200 group"
                      >
                        <Icon size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm uppercase tracking-wider flex-1">
                          {item.name}
                        </span>
                        <ExternalLink size={12} className="opacity-70" />
                      </a>
                    )
                  } else {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-3 bg-paper-dark border border-border-brutal text-ink hover:bg-accent hover:shadow-md transition-all duration-200 group"
                      >
                        <Icon size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm uppercase tracking-wider">
                          {item.name}
                        </span>
                      </Link>
                    )
                  }
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border-brutal">
                <div className="text-center">
                  <span className="text-ink/70 font-bold text-xs uppercase tracking-wider">
                    Zennn.mind
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

                        {/* Main Navigation Bar */}
        <div className="bg-paper/95 backdrop-blur-sm border border-border-brutal/50 shadow-xl rounded-2xl p-2 sm:p-3">
          <div className="flex items-center gap-1 sm:gap-2 relative w-max min-w-[280px] sm:min-w-[400px]">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.slice(1)
            
            return (
              <Link
                key={item.name}
                to="/"
                hash={item.href.slice(1)}
                onClick={() => handleTabClick(item.href)}
                className={`relative flex flex-col items-center justify-center flex-1 py-2 px-2 sm:py-3 sm:px-3 rounded-xl transition-all duration-300 ease-out group overflow-hidden min-w-[44px] sm:min-w-[75px] ${
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
                  size={16} 
                  className={`sm:!w-[18px] sm:!h-[18px] relative z-10 transition-all duration-300 ease-out ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} 
                />
                <span className={`relative z-10 text-xs font-medium mt-1 tracking-wide transition-all duration-300 ease-out hidden sm:block whitespace-nowrap ${
                  isActive ? 'opacity-100' : 'opacity-100'
                }`}>
                  {item.name}
                </span>
                
                {/* Subtle pulse for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-accent/20 rounded-xl animate-pulse opacity-50"></div>
                )}
              </Link>
            )
          })}
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
                         className={`relative flex flex-col items-center justify-center py-2 px-2 sm:py-3 sm:px-3 rounded-xl transition-all duration-300 ease-out group overflow-hidden min-w-[44px] sm:min-w-[75px] ${
              isMenuOpen
                ? 'bg-accent text-ink shadow-md transform scale-105'
                : 'text-ink/70 hover:text-ink hover:bg-accent/10 hover:scale-105'
            }`}
            title="Menu"
          >
            {/* Background highlight */}
            <div className={`absolute inset-0 bg-gradient-to-t from-accent/30 to-accent/10 rounded-xl transition-all duration-300 ease-out ${
              isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}></div>
            
            {isMenuOpen ? (
              <X 
                size={16} 
                className="sm:!w-[18px] sm:!h-[18px] relative z-10 transition-all duration-300 ease-out scale-110" 
              />
            ) : (
              <Menu 
                size={16} 
                className="sm:!w-[18px] sm:!h-[18px] relative z-10 transition-all duration-300 ease-out group-hover:scale-110" 
              />
            )}
            
            <span className={`relative z-10 text-xs font-medium mt-1 tracking-wide transition-all duration-300 ease-out hidden sm:block whitespace-nowrap ${
              isMenuOpen ? 'opacity-100' : 'opacity-100'
            }`}>
              Menu
            </span>
            
            {/* Subtle pulse for active state */}
            {isMenuOpen && (
              <div className="absolute inset-0 bg-accent/20 rounded-xl animate-pulse opacity-50"></div>
            )}
          </button>
        </div>
      </div>
      </nav>
    </>
  )
} 