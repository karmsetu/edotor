# Edotor

[![Demo Video](https://i9.ytimg.com/vi/tZJ6GRuzic0/mqdefault.jpg?sqp=CJyU6MYG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGC0gZShWMA8%3D&rs=AOn4CLDNVRdAhlxZOORuZBCfa0n8eCY2-A&retry=4)](https://www.youtube.com/watch?v=tZJ6GRuzic0)

a web based rich text editor with AI features 

## Tech Stack
- [Next.js](https://nextjs.org/) – react framework  
- [TypeScript](https://www.typescriptlang.org/) 
- [Tailwind CSS](https://tailwindcss.com/) -css  
- [shadcn/ui](https://ui.shadcn.com/) 
- [Prisma](https://www.prisma.io/) – ORM  
- [MongoDB](https://www.mongodb.com/) - DB  
- [Docker](https://www.docker.com/)  
- [Zod](https://zod.dev/) –  validation and parsing  
- [Zustand](https://github.com/pmndrs/zustand) – state management for React  
- [React](https://react.dev/)  
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) –  browser-based code editor (used in VS Code)  
- [WebContainer](https://webcontainers.io/) – Run Node.js environments directly in the browser  
- [Xterm.js](https://xtermjs.org/) – Front-end terminal component for web apps  
- [Biome](https://biomejs.dev/) – new linter (ESLint tool a lot of time in my machine)
- [Ollama](https://ollama.com/) – run LLM locally
  - Model: `qwen3:0.6b` (from [Qwen](https://qwenlm.github.io/))  - only good model my machine can run.
- [Auth.js (NextAuth)](https://authjs.dev/) – Self Auth 

## How to Setup

### Prerequisite
1. bun/node
2. Docker / MongoDB Atlas Collection
3. github and Google Cloud Account (OAuth purpuses)
4. MongoDB Compass
5. Ollama 

### Steps
1. clone this repo
2. `cd edotor`
3. install packages

```bash
bun add
``` 

```bash
npm i
``` 

4. pick database
- if you are self hosting mongo then make sure it's replica set is active
- refer to this [link](./devnotes/mongo-replica-set.md)

5. make an `.env` file

```.env
DATABASE_URL = mongodb://localhost:27017/edotor?replicaSet=rs0 # MongoDB Atlas Collection URL
AUTH_SECRET = # Added by `npx auth`. Read more: https://cli.authjs.dev

AUTH_GITHUB_ID = 
AUTH_GITHUB_SECRET = 

AUTH_GOOGLE_ID = 
AUTH_GOOGLE_SECRET = 

AI_URL = http://localhost:11434/api/generate
AI_MODEL = qwen3:0.6b # or any model your device can handle
```

> **Note**: The `AUTH_SECRET` and OAuth credentials (`AUTH_GITHUB_ID`, etc.) are managed via the Auth.js CLI. Run `npx auth secret` and `npx auth add github` / `npx auth add google` as needed.

6. clone starter templates, refer [here](./devnotes/starter-templates-setup.MD)

7. connect database to mongoDB compass
    - if you are using the docker file then first run 
    ```bash
        docker compose up -d
    ```

8. generate models and migrate them to MongoDB  
```bash
bun db:generate
bun db:push
```

9. now run the app
```bash
bun run dev
```


## Building  
since it is in beta version and  has lots of types and linting conflicts, i won't recommend building it yet (until v1.2.0 is released)

but if you wish to, you need to make some changes in `next.config.ts` file

```ts
eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
```
like this
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...
};

export default nextConfig;

```

- then run 
```bash
bun run build
bun run start
```

> **Note:** if you are having any problem with builds then delete the `.next` folder and build again, most of the time they are caching issues