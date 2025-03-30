# LogAnalyzer

## Prerequisites

1. Node.JS 22.x.x(Latest LTS)
2. NPM 11.x.x


## Used frameworks / libraries
- Electron (+ Forge) + Vite + Typescript
- React + Zustand
- shadcn + Tailwind
- Effect for Functional Programming
  
## How to...

- Add shadcn collection
  - npx shadcn@latest add (collection)
  - Choose "Use --legacy-peer-deps"
  - Collections would be added in /renderer/components/ui
  - Modify `import { cn } from "@/lib/utils"` to `import { cn } from "../../lib/utils"`

