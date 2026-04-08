import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

const highlights = [
  { label: 'Map Tracking', color: 'bg-blue-500', icon: '📍' },
  { label: 'Control Panel', color: 'bg-emerald-500', icon: '🎛️' },
  { label: 'System Logs', color: 'bg-violet-500', icon: '📊' },
]

export default function DashboardPreview() {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useTransform(mouseY, [0, 1], [6, -6])
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <section id="dashboard-preview" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4 tracking-wide uppercase">
            Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-poppins">
            Powerful Dashboard
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A clean, intuitive interface designed for quick access to everything you need.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          ref={cardRef}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-blue-500/10"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* Browser chrome */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-slate-900/60 rounded-lg px-4 py-1.5 text-xs text-slate-400 border border-slate-700/30 max-w-xs w-full">
                  <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="truncate">localhost:5173/dashboard</span>
                </div>
              </div>
            </div>

            {/* Dashboard image */}
            <motion.div
              className="relative"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/dashboard-preview.png"
                alt="V-Guard Dashboard Preview"
                className="w-full h-auto block"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-vg-bg/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Decorative glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-blue-600/20 rounded-3xl blur-3xl -z-10 opacity-50" />
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-slate-700/50 text-sm text-slate-300"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
