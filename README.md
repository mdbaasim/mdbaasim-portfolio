# Mohammed baasim H — Cybersecurity & AI Builder Portfolio

A modern, high-performance personal portfolio website engineered for **Mohammed baasim H**, a Computer Science Engineering student specializing in Cybersecurity at **PSNA College of Engineering and Technology**.

Designed for presentation to senior technical recruiters and engineering leaders at top-tier technology companies (Microsoft, NVIDIA, Amazon, Google, OpenAI).

---

## 🛡️ Key Features

- **Cybersecurity Aesthetics & Design**: Dark-mode palette with deep navy, charcoal, and electric cyan/blue accents. Subtle grid overlay and interactive network particle canvas.
- **Interactive Cyber CLI Terminal**: Press `Ctrl + K` or click **CLI Terminal** to access a terminal emulator with commands (`whoami`, `projects`, `skills`, `certs`, `contact`, `status`).
- **Interactive Project Architecture Modals**: Deep-dive technical sheets detailing the architecture, threat models, and feature implementation of every project:
  - **HopTrace Forensics**: AI email threat detection and MTA hop anomaly triage.
  - **Agent Workflow Security**: Denial-aware stateful policy guardrail preventing agent tool-switching and policy evasion.
  - **ScamGuard Pro**: Multi-vector AI anti-scam platform analyzing URLs, phone numbers, and phishing artifacts.
  - **FraudFlow Intelligence**: Financial flow graph anomaly detection concept.
- **Categorized Skills Matrix**: Clear, realistic skill badges organized into Programming, Cybersecurity, Development, Tools, and Cloud without inflated proficiency bars.
- **Verified Certifications**: Clean credential cards for *Introduction to Kubernetes (Linux Foundation)* and *Networking Basics (Cisco Networking Academy)*.
- **Interactive Contact Engine**: Copy-to-clipboard email actions, responsive contact form with cyber transmission feedback, and toast notifications.
- **Lightweight & Fast**: Zero heavy dependencies, pure vanilla HTML5/CSS3/JavaScript, retina-ready canvas, responsive from mobile devices to 4K displays.

---

## 🚀 Quick Start (Local Preview)

### Option 1: Direct Browser Opening
Simply double-click `portfolio/index.html` in your file explorer to open it in Chrome, Edge, Brave, or Firefox.

### Option 2: Local HTTP Server (Python)
Run the following in PowerShell:
```powershell
cd portfolio
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🌐 Free 1-Click Deployment

### Deploy to GitHub Pages:
1. Push this `portfolio` repository to GitHub.
2. In your repository, go to **Settings > Pages**.
3. Under **Branch**, select `main` and set the folder to `/portfolio` or `/root` and click **Save**.
4. Your website will be live in 60 seconds at `https://<your-username>.github.io/<repo-name>`.

### Deploy to Vercel:
1. Run `npx vercel` inside the `portfolio` directory.
2. Follow the 2-step prompt to deploy instantly to a global edge CDN with HTTPS.

---

## 📂 Project Structure

```
portfolio/
├── index.html              # Main semantic HTML5 document
├── README.md               # Documentation and setup instructions
├── css/
│   └── styles.css          # Cyber theme styles, grid overlays & responsive layouts
├── js/
│   ├── main.js             # Navigation, modals, contact form & toasts
│   ├── nodes.js            # Interactive network canvas background
│   └── terminal.js         # Interactive CLI terminal modal
└── assets/                 # Icons and media placeholders
```
