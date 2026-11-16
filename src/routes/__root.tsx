import { Outlet, createRootRoute, Link, useRouterState } from '@tanstack/react-router'
import { FileText, History } from 'lucide-react'

import { Toaster } from '@/components/ui/sonner'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

const NAV_ITEMS = [
  { label: 'Cover', icon: FileText, to: '/cover' },
  { label: 'History', icon: History, to: '/history' },
] as const

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <div className="min-h-screen bg-background">
      {/* Brand header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 shadow-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <Link to="/cover" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25">
              <img
                src="/college-logo.webp"
                alt=""
                className="h-7 w-7 object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-wide text-white">
                Cover Page Maker
              </span>
              <span className="block text-[11px] text-emerald-100/90">
                Government Tolaram College
              </span>
            </span>
          </Link>
        </div>
      </header>

      <main className="pb-24">
        <Outlet />
      </main>

      {/* Floating bottom navigation */}
      <nav className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl border border-emerald-100 bg-white/95 px-2 py-1.5 shadow-lg shadow-emerald-900/10 backdrop-blur">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = pathname === item.to
            return (
              <Link
                key={item.label}
                to={item.to}
                className={
                  active
                    ? 'flex flex-col items-center gap-1 rounded-lg bg-emerald-600 px-4 py-1.5 text-white shadow-sm shadow-emerald-600/30'
                    : 'flex flex-col items-center gap-1 rounded-lg px-4 py-1.5 text-emerald-900/55 transition-colors hover:bg-emerald-50 hover:text-emerald-900'
                }
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="text-[11px] font-medium leading-none">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
