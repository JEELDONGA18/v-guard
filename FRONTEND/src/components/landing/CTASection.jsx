import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section id="cta" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-vg-bg via-blue-950/40 to-vg-bg" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-poppins leading-tight">
            Take Control of Your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Vehicle Security
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Start monitoring, controlling, and protecting your vehicle today with
            V-Guard's intelligent security system.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              id="cta-goto-dashboard"
              onClick={() => navigate('/dashboard')}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/25 overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Go to Dashboard
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              id="cta-learn-more"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 hover:border-slate-500 transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
