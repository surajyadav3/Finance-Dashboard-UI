"use client";

import { CodeXml, Briefcase, Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-5 w-5 rounded-md bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-emerald-500"
            >
              <path d="M16 4C10 4 6 12 6 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M8 20C14 20 18 12 18 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span>© 2026 Zorvyn Fintech. Built by <span className="font-semibold text-foreground">Suraj Yadav</span></span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <CodeXml className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Briefcase className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
