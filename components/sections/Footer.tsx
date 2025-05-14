"use client";

import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-16 border-t border-muted/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Developer Portfolio. All Rights
            Reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-muted/10 text-muted-foreground hover:bg-green-500/20 hover:text-green-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/10 text-muted-foreground hover:bg-green-500/20 hover:text-green-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/10 text-muted-foreground hover:bg-green-500/20 hover:text-green-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/10 text-muted-foreground hover:bg-green-500/20 hover:text-green-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
