import { motion } from 'framer-motion'

const features = [
  {
    title: 'Live GPS Tracking',
    description: 'Track your vehicle\'s location in real-time with precision GPS coordinates updated every second.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/20',
  },
  {
    title: 'Remote Lock/Unlock',
    description: 'Secure your vehicle remotely with one-tap lock and unlock controls from anywhere in the world.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'from-emerald-500 to-green-500',
    glow: 'shadow-emerald-500/20',
  },
  {
    title: 'Theft Alerts',
    description: 'Instant push notifications when unauthorized movement or tampering is detected on your vehicle.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: 'from-red-500 to-orange-500',
    glow: 'shadow-red-500/20',
  },
  {
    title: 'Real-Time Dashboard',
    description: 'A comprehensive dashboard displaying live telemetry, controls, and analytics at a glance.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm-10 9a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm10-2a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500',
    glow: 'shadow-violet-500/20',
  },
  {
    title: 'Cloud Data Storage',
    description: 'All vehicle data is securely stored in the cloud with MongoDB, accessible anytime anywhere.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: 'from-cyan-500 to-teal-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    title: 'Speed Monitoring',
    description: 'Monitor vehicle speed in real-time with historical data logging and over-speed alerts.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-amber-500 to-yellow-500',
    glow: 'shadow-amber-500/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6">
      {/* Section heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4 tracking-wide uppercase">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-poppins">
            Everything You Need
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Comprehensive vehicle security powered by IoT technology, delivering
            real-time monitoring and control.
          </p>
        </motion.div>
      </div>

      {/* Feature cards */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className={`group relative glass-card-landing p-7 cursor-default hover:shadow-2xl ${feature.glow} transition-shadow duration-500`}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), transparent, rgba(34,211,238,0.1))',
              }}
            />

            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 shadow-lg ${feature.glow}`}>
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="relative text-lg font-bold text-white mb-2">{feature.title}</h3>
            <p className="relative text-sm text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
