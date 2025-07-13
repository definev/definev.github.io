import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import FloatingNavbar from '~/components/FloatingNavbar'

export const Route = createFileRoute('/')({
  component: Index,
  head(ctx) {
    return {
      meta: [
        {
          title: 'Bùi Đại Dương (Zennn.mind) - Full-Stack Developer',
        },
        {
          name: 'description',
          content: 'Full-stack developer with expertise in React, Flutter, Golang, and modern web technologies. Passionate about building exceptional user experiences.',
        },
      ],
    }
  },
})

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <FloatingNavbar />
    </div>
  )
} 