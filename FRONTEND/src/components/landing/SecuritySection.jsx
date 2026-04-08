import { motion } from 'framer-motion'

const securityPoints = [
  {
    title: 'Instant Alerts',
    description: 'Get notified within milliseconds when suspicious activity is detected on your vehicle.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    title: 'Remote Control',
    description: 'Lock, unlock, and monitor your vehicle from anywhere with an internet connection.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    title: 'Reliable Tracking',
    description: 'Precision GPS tracking with continuous updates ensures you always know where your vehicle is.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
]

export default function SecuritySection() {
  return (
    <section id="security" className="relative py-28 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4 tracking-wide uppercase">
              Security
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-poppins leading-tight">
              Secure Your Vehicle{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Anytime
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              With V-Guard, your vehicle is protected 24/7. Our intelligent system
              combines hardware-level security with cloud-powered monitoring to
              give you complete peace of mind.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-extrabold text-white">24/7</div>
                <div className="text-sm text-slate-500">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">&lt;1s</div>
                <div className="text-sm text-slate-500">Alert Speed</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">99.9%</div>
                <div className="text-sm text-slate-500">Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature points */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {securityPoints.map((point, i) => (
              <motion.div
                key={i}
                className="glass-card-landing p-6 flex items-start gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                whileHover={{ x: 6 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-xl ${point.bg} border ${point.border} flex items-center justify-center ${point.color} flex-shrink-0`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {point.icon}
                </motion.div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
