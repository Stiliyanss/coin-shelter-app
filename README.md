🪙 Coins Shelter
<p align="center"> A modern full-stack coin collection manager built with React, Supabase & Vercel. </p> <p align="center"> <a href="https://coin-shelter-app.vercel.app"><strong>🔗 Live Demo</strong></a> </p> <p align="center"> <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" /> <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase" /> <img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel" /> <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" /> </p>
✨ Features

🔐 Secure authentication (Supabase Auth)

🗂 Add, edit & delete coins

📅 Purchase date tracking

🔎 Sort by price & purchase date

🧱 Filter by material

💰 Automatic total collection value

📱 Fully responsive UI

🔒 Row Level Security (RLS)

| Frontend     | Backend                      | Deployment       |
| ------------ | ---------------------------- | ---------------- |
| React (Vite) | Supabase (PostgreSQL + Auth) | Vercel           |
| TailwindCSS  | Row Level Security           | CI/CD via GitHub |

⚙️ Local Setup
npm install
npm run dev


Create a .env file in the root:

VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_public_key

🔒 Security

Database access is protected with Row Level Security, ensuring users can only manage their own coins.

🚀 Deployment

Automatically deployed via Vercel on every GitHub push.