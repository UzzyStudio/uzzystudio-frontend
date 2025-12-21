# UzzyStudio Frontend

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/Ubaid-UllahGitHub/landingPage-react-gsap-SenityCMS)

A modern frontend web application built with **React + Vite**, powered by **Sanity CMS** as a headless content management system.

This project fetches live content from Sanity and is deployed on **Vercel**.

---

## 🛠 Tech Stack

- **React** (Vite)
- **Sanity CMS** (Headless CMS)
- **Material UI (MUI)**
- **GSAP / Lenis / AOS** (Animations)
- **ESLint** (Code quality)

---

## 📦 Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ubaid-UllahGitHub/landingPage-react-gsap-SenityCMS.git
cd uzzy-studio


2️⃣ Install dependencies
npm install

3️⃣ Environment Variables
cp .env.example .env


Fill in the values:

VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01


4️⃣ Run the project locally
npm run dev or yarn dev

The app will be available at:
http://localhost:5173


🧠 Sanity CMS Integration

This project uses @sanity/client to fetch live content from Sanity.
src/sanityClient.js


UzzyStudio/
├── public/
├── src/
├── .env.example
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
├── README.md
