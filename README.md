# MovieFlix Demo Package

This package contains two demo versions of a "MovieFlix" demo website:

1. **Static HTML/CSS/Vanilla JS demo** (`index.html`, `login.html`, `admin.html`, `styles.css`, `scripts.js`) — a multi-page static site. Movies are stored in `localStorage` (demo-only).
2. **React single-file demo** (`react/App.jsx`) — a single-file React demo component (drop into a React app's `src/App.jsx`).

## Quick start (static package)

1. Extract the ZIP and open `index.html` in your browser.
2. Use **Admin → Add Movie** to add demo entries (saved to `localStorage`).

## Deploy to GitHub Pages (static files)

1. Create a new GitHub repository (public or private).
2. Add the static files (`index.html`, `login.html`, `admin.html`, `styles.css`, `scripts.js`) to the repo root.
3. Commit and push to `main` (or `master`).
4. In GitHub repo, go to **Settings → Pages**.
   - Under **Build and deployment**, choose **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Save — GitHub will publish your site at `https://<username>.github.io/<repo>/` (wait a minute).
5. If your repo root contains only static files, the site will be served directly. `index.html` is the homepage.

**Tip:** If you use a `docs/` folder, put files there and point Pages to that folder instead of root.

## Deploy to Vercel (static or React)

- **Static HTML:** Drag & drop the extracted folder into Vercel's dashboard ("New Project → Import" or "Deploy from Git").
- **React (Vite/CRA):** Push your React project to GitHub and connect the repo to Vercel. Vercel auto-detects React and builds it. For Vite ensure `build` script exists.

## React usage (single-file)

- Create a React app (Vite recommended):
  ```bash
  npm create vite@latest movieflix-demo -- --template react
  cd movieflix-demo
  npm install
  ```
- Replace `src/App.jsx` with the file `react/App.jsx` from this package.
- `npm run dev` to test locally.

## Notes & Legal
- This is a demo. **Do not** host or stream copyrighted content without rights.
- Replace placeholder images with your own or properly licensed images.
- If you want a ready GitHub repo and I can prepare it (with commit + GH Pages config), tell me and I will generate the repo contents or give step-by-step commands.
