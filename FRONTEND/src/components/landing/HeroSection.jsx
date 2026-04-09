import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', delay: 0, color: 'rgba(59, 130, 246, 0.15)' },
  { size: 200, x: '80%', y: '60%', delay: 2, color: 'rgba(34, 211, 238, 0.1)' },
  { size: 250, x: '60%', y: '10%', delay: 4, color: 'rgba(59, 130, 246, 0.08)' },
  { size: 180, x: '20%', y: '70%', delay: 1, color: 'rgba(34, 211, 238, 0.12)' },
  { size: 150, x: '50%', y: '50%', delay: 3, color: 'rgba(99, 102, 241, 0.1)' },
]

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-2xl shadow-2xl shadow-blue-500/30 ring-1 ring-white/10">
            VG
          </div>
          <span className="text-3xl font-bold text-white tracking-tight font-poppins">
            V-Guard
          </span>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          className="glass-card-landing p-10 md:p-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            IoT Powered Security
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 font-poppins"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Smart Vehicle{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Security System
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Real-time tracking, remote control, and intelligent theft protection —
            all from your browser.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.button
              id="cta-get-started"
              onClick={() => navigate('/login')}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/25 overflow-hidden transition-shadow duration-300 hover:shadow-blue-500/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              id="cta-view-demo"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3.5 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 hover:border-slate-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-slate-500 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
