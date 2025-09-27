# Next.js TypeScript with Tailwind CSS Countries Application
---

# 🌍 Countries App

A **Next.js** + **TypeScript** + **Tailwind CSS** project that displays a list of countries using the [REST Countries API](https://restcountries.com/). Features include:

* Grid view of countries with flags and basic info
* Search and filter by country name or region
* Click on a country to see detailed information
* Fully responsive design
* Redux Toolkit for state management
* Image optimization for flags

---

## 🚀 Features

* **Next.js + TypeScript** for a modern, scalable app
* **Tailwind CSS** for responsive and modern UI
* **Redux Toolkit** for managing state
* **Axios** for API requests
* **Cloudinary support** for remote images (optional)
* **SSR and Static Export ready**

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

Install dependencies:

```bash
npm install
# or
yarn
```

---

## ⚡ Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗 Production Build

Build and run the production version locally:

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Deploy on Netlify

1. Install dependencies and build:

```bash
npm install
npm run build
```

2. Use **Netlify CLI** or link your repo in Netlify.

4. Publish the folder: `out/` if using `next export` or use **Netlify Next.js plugin** for SSR.
