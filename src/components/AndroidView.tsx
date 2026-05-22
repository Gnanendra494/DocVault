/**
 * DocVault - The Swiss Army Knife for PDFs
 * Copyright (C) 2026 Gnanendra494
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useNavigate } from 'react-router-dom'
import { 
  ChevronRight as ChevronRightIcon,
  FileText as FileTextIcon,
  Layers as LayersIcon, 
  Zap as ZapIcon, 
  Scissors as ScissorsIcon, 
  Lock as LockIcon,
  Moon as MoonIcon, 
  Sun as SunIcon, 
  Upload as UploadIcon,
  LayoutGrid as LayoutGridIcon, 
  ClipboardList
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { getRecentActivity, ActivityEntry } from '../utils/recentActivity'
import { DocVaultLogo } from './Logo'

interface AndroidViewProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  onFileSelect?: (file: File) => void
}

export default function AndroidView({ theme, toggleTheme, onFileSelect }: AndroidViewProps) {
  const navigate = useNavigate()
  const [history, setHistory] = useState<ActivityEntry[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getRecentActivity(3).then(setHistory)
  }, [])

  const quickActions = [
    { title: 'Merge', icon: LayersIcon, path: '/merge', color: 'text-cyan-300', bg: 'bg-cyan-400/10', sub: 'Combine' },
    { title: 'Compress', icon: ZapIcon, path: '/compress', color: 'text-amber-300', bg: 'bg-amber-400/10', sub: 'Optimize' },
    { title: 'Split', icon: ScissorsIcon, path: '/split', color: 'text-blue-300', bg: 'bg-blue-400/10', sub: 'Extract' },
    { title: 'Protect', icon: LockIcon, path: '/protect', color: 'text-violet-300', bg: 'bg-violet-400/10', sub: 'Secure' },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(circle_at_top_left,#E0F7FF_0%,#F7FCFF_42%,#EEF4FF_100%)] dark:bg-[radial-gradient(circle_at_top_left,#0B1222_0%,#030712_46%,#00040B_100%)] transition-colors pb-24 text-left">
      <input 
        type="file" 
        accept=".pdf" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      {/* Minimal Header */}
      <header className="px-5 pt-safe pb-3 sticky top-0 z-50 bg-[#F5FBFF]/80 dark:bg-[#030712]/80 backdrop-blur-2xl border-b border-white/40 dark:border-white/5">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
             <DocVaultLogo size={30} iconColor="#00F2FE" partColor="currentColor" />
             <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                   <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white leading-none">DocVault</span>
                   <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                </div>
                <span className="text-[7px] font-black text-slate-500 dark:text-cyan-300 uppercase tracking-[0.25em] mt-0.5"> 100% SECURE ENGINE </span>
             </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/70 dark:bg-white/5 text-slate-500 dark:text-cyan-200 active:bg-white dark:active:bg-white/10 transition-colors border border-white/70 dark:border-white/10 shadow-sm"
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
        </div>
      </header>

      <main className="px-4 py-3 space-y-5 flex-1 overflow-y-auto scrollbar-hide">
        
        {/* Command Center Hero */}
        <section>
           <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[250px] bg-[#07111F] rounded-[1.75rem] p-6 text-left relative overflow-hidden shadow-2xl shadow-cyan-950/20 group active:scale-[0.98] transition-all duration-100 border border-white/10"
           >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,242,254,0.22),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(79,172,254,0.45),transparent_32%)] pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute -right-10 bottom-2 w-40 h-40 rounded-full border border-cyan-300/20" />
              <div className="absolute right-8 bottom-12 w-20 h-20 rounded-full border border-cyan-300/30" />
              
              <div className="relative z-10 flex h-full min-h-[202px] flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md text-cyan-100 border border-white/10 shadow-inner">
                       <UploadIcon size={28} strokeWidth={2.5} />
                    </div>
                    <div className="px-3 py-1.5 bg-cyan-400/15 text-cyan-100 border border-cyan-300/25 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                       Offline Ready
                    </div>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-cyan-300 uppercase tracking-[0.35em] mb-3">Private Workspace</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-[0.9] mb-3">Open a<br/>local PDF</h2>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-100/75 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                      Device-only processing
                    </div>
                 </div>
              </div>
           </button>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {['No Uploads', 'No Cookies', 'Open Source'].map((label) => (
            <div key={label} className="rounded-2xl border border-white/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3 py-3 text-center shadow-sm backdrop-blur-md">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </section>

        {/* Clipboard History Section */}
        {history.length > 0 && (
          <section>
            <div className="flex items-center justify-between px-2 mb-3">
               <div className="flex items-center gap-2">
                  <ClipboardList size={12} className="text-gray-400" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none">History Clipboard</h3>
               </div>
               <button onClick={() => navigate('/android-history')} className="text-[9px] font-black uppercase text-cyan-500 tracking-wider">View All</button>
            </div>
            
            <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-md rounded-[1.5rem] border border-white/80 dark:border-white/10 shadow-sm divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
              {history.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => navigate('/android-history')}
                  className="w-full p-4 flex items-center gap-4 active:bg-cyan-50 dark:active:bg-white/5 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-cyan-50 dark:bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-500 dark:text-cyan-300 shrink-0">
                    <FileTextIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-gray-900 dark:text-white leading-tight mb-0.5">{item.name}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] text-cyan-500 font-black uppercase tracking-tight">{item.tool}</span>
                       <span className="text-[14px] text-gray-200 dark:text-zinc-800 leading-none">•</span>
                       <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{(item.size / (1024*1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                  <ChevronRightIcon size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Static Bento Grid */}
        <section>
           <div className="px-2 mb-3 flex items-center justify-between">
              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Core Engines</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
             {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="p-5 bg-white/80 dark:bg-white/[0.045] backdrop-blur-md rounded-[1.5rem] border border-white/80 dark:border-white/10 flex flex-col justify-between h-32 shadow-sm active:bg-cyan-50 dark:active:bg-white/10 transition-colors text-left relative overflow-hidden"
                >
                  <div className={`w-10 h-10 ${action.bg} ${action.color} rounded-xl flex items-center justify-center mb-2`}>
                    <action.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="relative z-10">
                     <span className="text-sm font-black text-gray-900 dark:text-white block leading-none mb-1">{action.title}</span>
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{action.sub}</span>
                  </div>
                </button>
              ))}

              <button
                onClick={() => navigate('/android-tools')}
                className="col-span-2 p-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-[1.5rem] flex items-center justify-between shadow-lg shadow-cyan-500/20 active:brightness-95 transition-colors group relative overflow-hidden"
              >
                 <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none">
                    <LayoutGridIcon size={100} />
                 </div>
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                       <LayoutGridIcon size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                       <span className="text-sm font-black block leading-none mb-1">More Engines</span>
                       <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest">Full Catalog</span>
                    </div>
                 </div>
                 <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center relative z-10">
                    <ChevronRightIcon size={16} />
                 </div>
              </button>
           </div>
        </section>

        {/* Minimal Footer */}
        <div className="flex flex-col items-center gap-2 py-8 opacity-20">
           <p className="text-[8px] font-black uppercase tracking-[0.4em] dark:text-white text-center">DocVault v1.0.9</p>
        </div>

      </main>
    </div>
  )
}
