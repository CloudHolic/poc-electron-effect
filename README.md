## Prerequisites

1. Node.JS 22.x.x(Latest LTS)
2. NPM 11.x.x


## Used frameworks / libraries
- Electron + Forge + Vite + Typescript
- React + Zustand
- shadcn + Tailwind
- [Effect](https://effect.website/) for Functional Programming


## What's inside
- Boilerplate for Electron + Forge + Vite + React + Tailwind + shadcn
- Some custom hooks using [Effect](https://effect.website/)
  - See /src/renderer/hooks
  - useEffectCache.ts: Provide some caching hooks different from useMemo, useCallback.
  - useEvent.ts: Provide eventing system.
  - useZeroMq.ts: Provide ZeroMQ patterns.


## What's next

1. Add some UI to test custom hooks using [Effect](https://effect.website/)
2. Implement more hooks / services that can be used in React / Electron
3. Add interesting libraries for using, testing, etc.


## How to...

- Add shadcn collection
  - npx shadcn@latest add (collection)
  - Choose "Use --legacy-peer-deps"
  - Collections would be added in /renderer/components/ui
  - Modify `import { cn } from "@/lib/utils"` to `import { cn } from "../../lib/utils"`
    - Idk why should I do...