import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ChevronRight
} from 'lucide-react'
import { Tool, ToolCategory } from '../types'
import { DocVaultLogo } from './Logo'

export default function AndroidToolsView({ tools }: { tools: Tool[] }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const categoryColors: Record<ToolCategory, { bg: string, text: string, icon: string, border: string }> = {
    Edit: { bg: 'bg-cyan-50 dark:bg-cyan-950/10', text: 'text-cyan-500 dark:text-cyan-300', icon: 'text-cyan-500', border: 'border-cyan-100/50 dark:border-cyan-950/20' },
    Secure: { bg: 'bg-indigo-50 dark:bg-indigo-900/10', text: 'text-indigo-600 dark:text-indigo-400', icon: 'text-indigo-500', border: 'border-indigo-100/50 dark:border-indigo-900/20' },
    Convert: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', text: 'text-emerald-600 dark:text-emerald-400', icon: 'text-emerald-500', border: 'border-emerald-100/50 dark:border-emerald-900/20' },
    Optimize: { bg: 'bg-amber-50 dark:bg-amber-900/10', text: 'text-amber-600 dark:text-amber-400', icon: 'text-amber-500', border: 'border-amber-100/50 dark:border-amber-900/20' }
  }

  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [tools, searchQuery])

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = []
      acc[tool.category].push(tool)
      return acc
    }, {} as Record<ToolCategory, Tool[]>)
  }, [filteredTools])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#E0F7FF_0%,#F7FCFF_42%,#EEF4FF_100%)] dark:bg-[radial-gradient(circle_at_top_left,#0B1222_0%,#030712_46%,#00040B_100%)] pb-32 transition-colors">
      <header className="px-5 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-6">
        <div className="mb-6 rounded-[1.75rem] bg-[#07111F] p-5 text-white shadow-2xl shadow-cyan-950/20 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.35),transparent_34%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-cyan-300 mb-2">Vault Modules</p>
              <h1 className="text-4xl font-black tracking-tighter leading-none">Tool Grid</h1>
            </div>
            <DocVaultLogo size={48} className="rounded-2xl shadow-lg" />
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-cyan-500 dark:text-cyan-300">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search for a tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 dark:bg-white/[0.06] border border-white/80 dark:border-white/10 rounded-[1.35rem] py-4 pl-14 pr-6 text-base font-bold placeholder:text-gray-400 focus:bg-white dark:focus:bg-white/[0.1] ring-2 ring-transparent focus:ring-cyan-500/20 transition-all dark:text-white outline-none shadow-sm backdrop-blur-md"
          />
        </div>
      </header>

      <main className="px-4 space-y-7">
        {(Object.keys(groupedTools) as ToolCategory[]).map((category) => (
          <section key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="px-2 mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {category} Tools
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {groupedTools[category].map((tool, i) => {
                const colors = categoryColors[tool.category]
                const Icon = tool.icon
                return (
                  <button
                    key={i}
                    onClick={() => tool.implemented && tool.path && navigate(tool.path)}
                    className="flex items-center gap-4 p-4 bg-white/80 dark:bg-white/[0.045] backdrop-blur-md rounded-[1.35rem] border border-white/80 dark:border-white/10 active:bg-cyan-50 dark:active:bg-white/10 transition-all shadow-sm"
                  >
                    <div className={`w-12 h-12 ${colors.bg} ${colors.icon} rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-white/60 dark:ring-white/10`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-bold text-sm dark:text-white truncate">{tool.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-cyan-400/70" />
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center py-12 opacity-20">
         <DocVaultLogo size={24} iconColor="#00F2FE" partColor="currentColor" className="mx-auto mb-4" />
         <p className="text-[9px] font-black uppercase tracking-[0.5em]">DocVault Version 1.0.9</p>
      </footer>
    </div>
  )
}
