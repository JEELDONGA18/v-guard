import { NavLink, useNavigate } from 'react-router-dom'

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm-10 9a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm10-2a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />
      </svg>
    ),
  },
  {
    name: 'Live Tracking',
    path: '/tracking',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: 'Alerts',
    path: '/alerts',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    name: 'Logs',
    path: '/logs',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId')
    navigate('/login')
  }

  return (
    <aside
      className={`${
        collapsed ? 'w-[72px]' : 'w-64'
      } bg-vg-sidebar border-r border-vg-border/50 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-vg-border/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-lg shadow-blue-500/20">
          VG
        </div>
        {!collapsed && (
          <span className="ml-3 text-white font-bold text-lg tracking-tight animate-fade-in">
            V-Guard
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-vg-accent/15 text-vg-accent-light'
                  : 'text-vg-text-muted hover:bg-white/5 hover:text-vg-text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-vg-accent rounded-r-full" />
                )}
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium truncate">
                    {item.name}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-vg-border/50 space-y-1">
        {/* Logout */}
        <button
          id="btn-logout"
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          title="Logout"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!collapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          id="sidebar-toggle"
          onClick={onToggle}
          className="w-full flex items-center justify-center px-3 py-2.5 rounded-xl text-vg-text-muted hover:bg-white/5 hover:text-vg-text-secondary transition-all duration-200"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          {!collapsed && (
            <span className="ml-3 text-sm font-medium">Collapse</span>
          )}
        </button>
      </div>
    </aside>
  )
}

