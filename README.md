# LogAnalyzer

## Prerequisites

1. Node.JS 22.x.x(최신 LTS)
2. NPM 11.x.x

## NPM Scripts

- npm install
  - 종속성 설치


- npm run lint
  - eslint를 실행 및 오류 체크
  
  
- npm start
  - 개발 모드로 빌드 및 실행


- npm run package
  - 배포 모드로 빌드
  - 빌드 결과는 /out/loganalyzer-win32-x64에 생성되며, loganalyzer.exe로 실행


- npm run make
  - package 후 설치 파일 생성
  - 빌드 결과는 아래의 두 경로에 생성됨
    - /out/make/squirrel.windows/x64/loganalyzer-{x.y.z} Setup.exe
    - /out/make/zip/win32/x64/loganalyzer-win32-x64-{x.y.z}.zip

  
## How to...

- Add npm package
  - npm install (package) (-D)


- Add shadcn collection
  - npx shadcn@latest add (collection)
  - 선택지를 물어볼 때 Use --legacy-peer-deps 선택
  - 추가된 collection은 /renderer/components/ui에 추가됨
  - 추가된 파일에서 `import { cn } from "@/lib/utils"`를 `import { cn } from "../../lib/utils"`로 수정

