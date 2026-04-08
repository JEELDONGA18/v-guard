import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Device Collects Data',
    description: 'The ESP32 microcontroller aboard your vehicle captures GPS coordinates, speed, and sensor data continuously.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-500',
  },
  {
    step: '02',
    title: 'Sends to FastAPI Backend',
    description: 'Data is transmitted over the internet to a high-performance FastAPI server that processes and validates the information.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500',
  },
  {
    step: '03',
    title: 'Stored in MongoDB',
    description: 'All telemetry and event data is securely stored in MongoDB with full history for later analysis and retrieval.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-500',
  },
  {
    step: '04',
    title: 'Dashboard Displays & Controls',
    description: 'The React dashboard visualizes real-time data on interactive maps and provides remote vehicle control capabilities.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4 tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-poppins">
            From Device to Dashboard
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A seamless pipeline from hardware to software — four simple steps to
            total vehicle security.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent hidden md:block"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Mobile line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent md:hidden" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Step number node */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ring-4 ring-vg-bg`}>
                  {step.icon}
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                i % 2 === 0 ? 'md:pr-4 md:text-right' : 'md:pl-4 md:text-left'
              }`}>
                <div className="glass-card-landing p-6">
                  <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-1 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
