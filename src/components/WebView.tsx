/**
 * DocVault - Professional Web Dashboard
 * A desktop-optimized, sidebar-driven interface.
 */

import { useState, useMemo } from 'react'
import { 
  Search as SearchIcon, 
  ChevronRight as ChevronRightIcon, 
  Sparkles as SparklesIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Tool, ToolCategory } from '../types'

const categoryColors: Record<ToolCategory, { bg: string, text: string, border: string, hover: string, glow: string }> = {
  Edit: { 
    bg: 'bg-cyan-50 dark:bg-cyan-950/20', 
    text: 'text-cyan-500', 
    border: 'border-cyan-100 dark:border-cyan-950/30',
    hover: 'group-hover:bg-cyan-500',
    glow: 'dark:hover:shadow-cyan-950/20'
  },
  Secure: { 
    bg: 'bg-indigo-50 dark:bg-indigo-900/20', 
    text: 'text-indigo-500', 
    border: 'border-indigo-100 dark:border-indigo-900/30',
    hover: 'group-hover:bg-indigo-500',
    glow: 'dark:hover:shadow-indigo-900/20'
  },
  Convert: { 
    bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
    text: 'text-emerald-500', 
    border: 'border-emerald-100 dark:border-emerald-900/30',
    hover: 'group-hover:bg-emerald-500',
    glow: 'dark:hover:shadow-emerald-900/20'
  },
  Optimize: { 
    bg: 'bg-amber-50 dark:bg-amber-900/20', 
    text: 'text-amber-500', 
    border: 'border-amber-100 dark:border-amber-900/30',
    hover: 'group-hover:bg-amber-500',
    glow: 'dark:hover:shadow-amber-900/20'
  }
}

const ToolCard = ({ title, desc, icon: Icon, onClick, category }: Tool & { onClick?: () => void }) => {
  const colors = categoryColors[category]
  
  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col p-6 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 text-left hover:shadow-2xl hover:shadow-cyan-500/5 hover:-translate-y-1"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${colors.bg} ${colors.text} group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <h3 className="font-black text-gray-900 dark:text-white mb-2 text-lg tracking-tight group-hover:text-cyan-500 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2">{desc}</p>
      
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500">
        <ChevronRightIcon size={20} />
      </div>
    </button>
  )
}

export default function WebView({ tools }: { tools: Tool[] }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All')

  const categories: (ToolCategory | 'All')[] = ['All', 'Edit', 'Secure', 'Convert', 'Optimize']

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [tools, searchQuery, activeCategory])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#E0F7FF_0%,#F7FCFF_42%,#EEF4FF_100%)] dark:bg-[radial-gradient(circle_at_top_left,#0B1222_0%,#030712_46%,#00040B_100%)] transition-colors duration-500">
      <section className="relative px-6 py-10 md:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.25rem] bg-[#07111F] border border-white/10 shadow-2xl shadow-cyan-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,242,254,0.22),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(79,172,254,0.45),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:36px_36px]" />
          <div className="relative grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-center p-7 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 text-cyan-200 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-7 border border-cyan-300/20">
                <SparklesIcon size={14} /> Local Vault Workspace
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                Private PDFs, <br/>
                <span className="text-cyan-300">zero detours.</span>
              </h1>
              <p className="max-w-xl text-sm md:text-base text-slate-300 font-medium leading-relaxed">
                Run document tools in your browser with a sharp desktop workspace built for quick scanning, local processing, and repeated use.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-white/8 border border-white/10 p-5 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {['Local', 'Offline', 'Private'].map((label) => (
                  <div key={label} className="rounded-2xl bg-white/10 border border-white/10 px-3 py-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-cyan-200">{label}</p>
                  </div>
                ))}
              </div>
              <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
              <SearchIcon size={22} />
            </div>
            <input 
              type="text"
              placeholder="Search tools (e.g. merge, compress, protect...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/95 border border-white/20 rounded-[1.35rem] py-5 pl-16 pr-8 shadow-2xl shadow-cyan-950/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20 outline-none transition-all font-bold text-lg text-slate-900"
            />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeCategory === cat ? 'bg-cyan-400 text-slate-950 border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/80 dark:bg-white/[0.045] text-slate-500 dark:text-slate-400 border-white/80 dark:border-white/10 hover:border-cyan-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest">{filteredTools.length} Modules Active</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard 
                  key={tool.title} 
                  {...tool} 
                  onClick={() => navigate(tool.path || '/')}
                />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="py-32 text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <SearchIcon size={32} />
                </div>
                <h3 className="text-2xl font-black dark:text-white mb-2">No tools matched.</h3>
                <p className="text-gray-500 dark:text-zinc-400 font-medium">Try searching for a different keyword or clear your filters.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-8 text-cyan-500 font-black uppercase tracking-widest text-xs hover:underline underline-offset-8">Reset Dashboard</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
