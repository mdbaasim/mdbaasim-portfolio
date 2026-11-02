/**
 * Interactive Cybersecurity CLI Terminal Modal
 * Allows recruiters & engineers to explore profile data via terminal commands
 */
(function() {
  const terminalModal = document.getElementById('terminal-modal');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const openTerminalBtns = document.querySelectorAll('.open-terminal-btn');
  const closeTerminalBtn = document.getElementById('close-terminal-btn');

  if (!terminalModal || !terminalOutput || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: `
<span class="term-cyan">AVAILABLE COMMANDS:</span>
  <span class="term-green">whoami</span>       - Display engineer profile & background
  <span class="term-green">projects</span>     - List core security & AI projects
  <span class="term-green">skills</span>       - Print cybersecurity & engineering tech stack
  <span class="term-green">certs</span>        - View verified industry certifications
  <span class="term-green">education</span>    - Display academic institution and degree details
  <span class="term-green">contact</span>      - Output communication channels & email
  <span class="term-green">status</span>       - Check system operational status
  <span class="term-green">clear</span>        - Clear terminal viewport
  <span class="term-green">exit</span>         - Close terminal session
`,
    whoami: `
<span class="term-purple"># IDENTITY SUMMARY</span>
  <span class="term-cyan">Name:</span> Mohammed baasim H
  <span class="term-cyan">Role:</span> Computer Science & Cybersecurity Student
  <span class="term-cyan">College:</span> PSNA College of Engineering and Technology
  <span class="term-cyan">Target:</span> Aspiring Cybersecurity Engineer & Cloud Security Engineer
  <span class="term-cyan">Focus:</span> AI-driven security, software development, threat detection, secure agent workflows, and cloud security.
`,
    projects: `
<span class="term-purple"># FEATURED PROJECTS:</span>
  1. <span class="term-cyan">HopTrace Forensics</span> [Software Development / AI]
     AI-powered email threat detection & security intelligence platform.
     <span class="term-dim">Stack: Python, FastAPI, AI, Software Development</span>

  2. <span class="term-cyan">Agent Workflow Security</span> [AI Security / Policy Enforcement]
     Prototype detecting policy evasion across autonomous AI agents & tools.
     <span class="term-dim">Stack: Python, AI Security, Policy Enforcement, GitHub</span>

  3. <span class="term-cyan">ScamGuard Pro</span> [Threat Intelligence / Anti-Fraud]
     AI platform identifying suspicious URLs, phone numbers, and phishing vectors.
     <span class="term-dim">Stack: Python, AI, Threat Intelligence, Web Security</span>

  4. <span class="term-cyan">FraudFlow Intelligence</span> [FinSec / Anomaly Detection]
     AI concept for detecting suspicious transaction graphs and fraudulent money flow.
     <span class="term-dim">Stack: AI / Graph Analysis, FinSec, Anomaly Detection</span>
`,
    skills: `
<span class="term-purple"># TECHNICAL CAPABILITIES:</span>
  <span class="term-cyan">[Programming]</span>    Python, C, SQL
  <span class="term-cyan">[Cybersecurity]</span>  Application Security, Network Security, Threat Detection
  <span class="term-cyan">[Software Dev]</span>   FastAPI, HTML, CSS, JavaScript
  <span class="term-cyan">[Tools]</span>          Git, GitHub, Linux, VS Code
  <span class="term-cyan">[Cloud]</span>          Cloud Security Fundamentals
`,
    certs: `
<span class="term-purple"># VERIFIED CREDENTIALS:</span>
  * <span class="term-green">[VERIFIED]</span> Introduction to Kubernetes — Linux Foundation
  * <span class="term-green">[VERIFIED]</span> Networking Basics — Cisco Networking Academy
`,
    education: `
<span class="term-purple"># ACADEMIC RECORD:</span>
  <span class="term-cyan">Institution:</span> PSNA College of Engineering and Technology
  <span class="term-cyan">Degree:</span> Bachelor of Engineering (B.E.)
  <span class="term-cyan">Specialization:</span> Computer Science and Engineering – Cybersecurity
  <span class="term-cyan">Batch:</span> 2024 — 2028 (Undergraduate)
`,
    contact: `
<span class="term-purple"># COMMUNICATIONS CHANNELS:</span>
  <span class="term-cyan">Email:</span>    mdbaasim06@gmail.com
  <span class="term-cyan">LinkedIn:</span> linkedin.com/in/mohammed-baasim-h-929369227
  <span class="term-cyan">GitHub:</span>   github.com/mdbaasim
  <span class="term-dim">Hint: Use the contact form below or click the quick-copy buttons.</span>
`,
    status: `
<span class="term-green">[OK]</span> SOC Telemetry: ACTIVE
<span class="term-green">[OK]</span> Zero Trust Guard: ENFORCED
<span class="term-green">[OK]</span> Open for: Security Engineering Internships & Full-time Roles
`
  };

  function printLine(html) {
    const p = document.createElement('div');
    p.className = 'term-line';
    p.innerHTML = html;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    printLine(`<span class="term-prompt">secops@baasim:~$</span> ${escapeHTML(cmdRaw)}`);

    if (!cmd) return;

    history.push(cmdRaw);
    historyIndex = history.length;

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (cmd === 'exit' || cmd === 'quit') {
      closeTerminal();
      return;
    }

    if (COMMANDS[cmd]) {
      printLine(COMMANDS[cmd]);
    } else {
      printLine(`<span class="term-red">Command not recognized: "${escapeHTML(cmdRaw)}". Type <span class="term-cyan">help</span> for supported commands.</span>`);
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function openTerminal() {
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openTerminalBtns.forEach(btn => btn.addEventListener('click', openTerminal));
  if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Expose openTerminal globally
  window.openCyberTerminal = openTerminal;
})();
