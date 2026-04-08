import { motion } from 'framer-motion'

const technologies = [
  {
    name: 'React',
    description: 'Frontend UI',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#61DAFB">
        <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        <path fillRule="evenodd" d="M12 9.5c5.07 0 9.18 1.19 9.18 2.66S17.07 14.83 12 14.83 2.82 13.63 2.82 12.17 6.93 9.5 12 9.5z" fill="none" stroke="#61DAFB" strokeWidth="1" />
        <path fillRule="evenodd" d="M8.37 10.84c2.53-4.39 5.76-7.15 7.22-6.3s.79 4.69-1.74 9.08-5.76 7.15-7.22 6.3-.79-4.69 1.74-9.08z" fill="none" stroke="#61DAFB" strokeWidth="1" />
        <path fillRule="evenodd" d="M8.37 13.62c-2.53-4.39-3.2-8.23-1.74-9.08s4.69 1.91 7.22 6.3 3.2 8.23 1.74 9.08-4.69-1.91-7.22-6.3z" fill="none" stroke="#61DAFB" strokeWidth="1" />
      </svg>
    ),
    color: 'border-cyan-500/30 hover:border-cyan-400/60',
    glow: 'hover:shadow-cyan-500/10',
  },
  {
    name: 'FastAPI',
    description: 'Backend Server',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#009688">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="#009688" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'border-teal-500/30 hover:border-teal-400/60',
    glow: 'hover:shadow-teal-500/10',
  },
  {
    name: 'MongoDB',
    description: 'Database',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#4DB33D">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.55 0 1 .45 1 1v6.5l2.5 2.5c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L11.5 13.5V6c0-.55.45-1 1-1z" fill="none" stroke="#4DB33D" strokeWidth="1.5" />
        <text x="7" y="17" fontSize="10" fontWeight="bold" fill="#4DB33D">M</text>
      </svg>
    ),
    color: 'border-green-500/30 hover:border-green-400/60',
    glow: 'hover:shadow-green-500/10',
  },
  {
    name: 'ESP32',
    description: 'IoT Hardware',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#F59E0B" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: 'border-amber-500/30 hover:border-amber-400/60',
    glow: 'hover:shadow-amber-500/10',
  },
  {
    name: 'Tailwind CSS',
    description: 'Styling',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#38BDF8">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.73 1.9 1.34C13.35 10.8 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.73-1.9-1.34C15.65 7.2 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.73 1.9 1.34C8.35 16.8 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.73-1.9-1.34C10.65 13.2 9.5 12 7 12z" />
      </svg>
    ),
    color: 'border-sky-500/30 hover:border-sky-400/60',
    glow: 'hover:shadow-sky-500/10',
  },
  {
    name: 'Leaflet',
    description: 'Maps',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#22C55E" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'border-emerald-500/30 hover:border-emerald-400/60',
    glow: 'hover:shadow-emerald-500/10',
  },
]

// Double the array for seamless scrolling
const scrollItems = [...technologies, ...technologies]

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-28 px-6 overflow-hidden">
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
            Technology
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-poppins">
            Built With Modern Tech
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powered by a robust tech stack combining hardware and software excellence.
          </p>
        </motion.div>

        {/* Scrolling carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-vg-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-vg-bg to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {scrollItems.map((tech, i) => (
              <motion.div
                key={i}
                className={`flex-shrink-0 w-52 glass-card-landing p-6 text-center cursor-default border ${tech.color} transition-all duration-300 hover:shadow-xl ${tech.glow}`}
                whileHover={{ scale: 1.08, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex justify-center mb-4">{tech.logo}</div>
                <h3 className="text-base font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-xs text-slate-500">{tech.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Static grid for mobile */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              className={`glass-card-landing p-5 text-center border ${tech.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex justify-center mb-3">{tech.logo}</div>
              <h3 className="text-sm font-bold text-white mb-0.5">{tech.name}</h3>
              <p className="text-xs text-slate-500">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
