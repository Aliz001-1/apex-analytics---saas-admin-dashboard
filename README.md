# Apex Analytics - Enterprise SaaS Admin Dashboard

A fully responsive, enterprise-grade SaaS Admin Dashboard built with React 19, TypeScript, Tailwind CSS, and Firebase (Cloud Firestore & Firebase Auth).

![Apex Analytics Dashboard Preview](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.jpg)

---

## 🚀 Features

- **Full-Stack Firebase Integration:**
  - Firebase Authentication with Google Sign-in.
  - Cloud Firestore for real-time customer and subscription persistence.
  - Deployed ABAC security rules (`firestore.rules`).
- **5 KPI Stats Cards:**
  - Total Revenue ($48,290) with smooth SVG sparkline curve.
  - Active Users (1,245) with team avatar stack.
  - New Signups (240) with visual 6-bar sparkline.
  - Subscription Rate (99.8%) with circular donut/progress ring.
  - Conversion Rate (4.5%) with benchmark gap indicator.
- **Dynamic Data Table:**
  - Multi-column sorting (Customer, Plan, Date, Status, Amount).
  - Status filters (All, Active, Pending, Canceled).
  - Live global search & filtering.
  - Interactive row actions (change status, delete records).
  - Clean pagination (`< 1 of 10 >`).
- **Revenue Growth Chart:**
  - Dual-line SVG area chart comparing Actual Revenue against Target Benchmark.
  - Interactive hover cursor with floating monthly tooltips.
- **Data Export:**
  - Export to CSV (Spreadsheet / Excel).
  - Export to PDF (Print-ready document).
  - Export to JSON (Raw backup data).
- **Modern UI & Theming:**
  - Dark & Light mode toggle with saved local storage preference.
  - Collapsible mobile navigation drawer.
  - Real-time notification center drawer.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend / Database:** Google Firebase (Cloud Firestore & Firebase Authentication)
- **Bundler:** Vite 8

---

## 📦 How to Push this Project to GitHub

Follow these steps in your terminal:

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Apex Analytics SaaS Admin Dashboard"
```

### 2. Connect to your GitHub Repository
Create a new empty repository on [GitHub](https://github.com/new), then run:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

---

## 🌐 How to Deploy Live (Hosting Options)

### Option 1: Deploy on Vercel (Recommended - 1 Click)
1. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New"** > **"Project"** and import your GitHub repository.
3. Keep default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your dashboard will be live on a `*.vercel.app` URL in under a minute!

---

### Option 2: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `package.json`, add:
   ```json
   "homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. In `vite.config.ts`, set the base path:
   ```ts
   export default defineConfig({
     base: '/<YOUR_REPOSITORY_NAME>/',
     // ... rest of config
   });
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

### Option 3: Deploy to Firebase Hosting
Since this project is already connected to Firebase:
1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize hosting:
   ```bash
   firebase login
   firebase init hosting
   ```
   - Select public directory: `dist`
   - Configure as single-page app: `Yes`
   - Overwrite index.html: `No`
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## 🔑 Important Firebase Configuration Note

When hosting on a new domain (e.g., `your-app.vercel.app` or `your-username.github.io`):
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **`solar-entropy-0xctm`**.
3. Go to **Authentication** > **Settings** > **Authorized domains**.
4. Click **Add domain** and enter your deployed domain (e.g. `your-app.vercel.app` or `your-username.github.io`).
5. This allows Google Sign-in to work securely from your custom deployed URL!
