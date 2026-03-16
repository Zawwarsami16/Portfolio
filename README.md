# ZAI Portfolio

> Living portfolio — auto-updates from GitHub. Rose petals. Black theme.
> https://zawwarsami16.github.io/Portfolio/

## Setup

```bash
# 1. Install Node.js (if you don't have it)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs

# 2. Extract and enter the folder
unzip zai-portfolio-v5.zip
cd zai-portfolio-v5

# 3. Copy the env file and fill in your keys
cp .env.example .env
# open .env and set VITE_GH_USER and VITE_AI_KEY

# 4. Install dependencies
npm install

# 5. Run locally
npm run dev
# Opens at http://localhost:3000
```

## .env file

```env
VITE_GH_USER=zawwarsami16        # your GitHub username
VITE_AI_PROVIDER=openrouter      # openrouter / openai / groq / anthropic
VITE_AI_KEY=your_key_here        # API key for the AI chat
```

**Free AI option:** Use OpenRouter with a free model — no credit card needed.
Sign up at https://openrouter.ai and copy your key.

## Deploy to GitHub Pages

```bash
# Build
npm run build

# Push to GitHub
git init
git add .
git commit -m "ZAI Portfolio"
git remote add origin https://github.com/zawwarsami16/zawwarsami16.github.io.git
git push -u origin main

# In GitHub repo:
# Settings → Pages → Source: GitHub Actions
# Settings → Secrets → Add:
#   VITE_GH_USER    = zawwarsami16
#   VITE_AI_PROVIDER = openrouter
#   VITE_AI_KEY     = your_key
```

Every push to `main` auto-deploys. ✅

## What auto-updates

- Hero stats (repos, stars, followers, forks)
- About section bio and location
- Live repos grid with language filter
- GitHub activity feed
- Skills bars (built from repo languages)
- AI chat context (knows your latest projects)

## File structure

```
src/
├── App.jsx                 ← root, wires everything
├── main.jsx                ← React entry
├── index.css               ← design tokens + reset
├── hooks/
│   └── useGitHub.js        ← fetches all GitHub data
├── utils/
│   └── helpers.js          ← colors, timeAgo, icons
└── components/
    ├── Petals.jsx           ← falling rose petals canvas
    ├── Nav.jsx              ← fixed navigation
    ├── Hero.jsx             ← full-screen opener
    ├── About.jsx            ← bio + avatar
    ├── Repos.jsx            ← live repos grid
    ├── Activity.jsx         ← event feed + heatmap
    ├── Skills.jsx           ← language bars
    ├── Contact.jsx          ← contact links
    └── AIChat.jsx           ← floating AI chat widget
```
