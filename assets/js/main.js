/* ============================================================
   yehor.dev — interactions
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".nav__links a, .nav__actions a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count + (c.dataset.suffix || "")));
  }

  /* ---------- Signature: typed bot console ---------- */
  const consoleBody = document.getElementById("console-body");
  if (consoleBody) {
    const script = [
      { cmd: "about", reply: "Привіт 👋 Я <b>Єгор</b> — Python-розробник ботів і веб-розробник. Веду повний цикл: архітектура → код → деплой → підтримка." },
      { cmd: "stack", reply: "Backend: <b>Python · aiogram 3 · FastAPI · SQLAlchemy</b>. Бази: PostgreSQL, Redis. Front: JS, Tailwind. Деплой: Docker, Nginx, VPS." },
      { cmd: "projects", reply: "GlowCRM — CRM у Telegram · MyKyivBot — асистент міста · Neon Odyssey — лендинг · KyivBot Docs. Гортайте нижче ↓" },
      { cmd: "hire", reply: "Опишіть задачу — підкажу рішення, терміни й бюджет. Здаю в строк, пишу чистий код. <b>Напишіть у Telegram →</b>" },
    ];

    const esc = (s) => s;

    const addCommandLine = () => {
      const line = document.createElement("div");
      line.className = "console__line";
      const prompt = document.createElement("span");
      prompt.style.color = "var(--ash-dim)";
      prompt.textContent = "you ❯";
      const cmd = document.createElement("span");
      cmd.className = "console__cmd";
      line.appendChild(prompt);
      line.appendChild(cmd);
      consoleBody.appendChild(line);
      return cmd;
    };

    const addReply = (html) => {
      const reply = document.createElement("div");
      reply.className = "console__reply";
      reply.innerHTML = html;
      consoleBody.appendChild(reply);
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function typeText(el, text, speed) {
      for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];
        await sleep(speed);
      }
    }

    async function run() {
      if (prefersReduced) {
        script.forEach((s) => {
          const c = addCommandLine();
          c.textContent = s.cmd;
          addReply(s.reply);
        });
        return;
      }

      const caret = document.createElement("span");
      caret.className = "console__caret";

      for (const step of script) {
        const cmd = addCommandLine();
        cmd.appendChild(caret);
        await typeText(cmd, step.cmd, 55);
        await sleep(350);
        addReply("…");
        const reply = consoleBody.lastChild;
        await sleep(450);
        reply.innerHTML = esc(step.reply);
        await sleep(900);
      }
      // leave caret blinking on a fresh prompt
      const last = addCommandLine();
      last.appendChild(caret);
    }

    // start when hero is in view (or immediately)
    if ("IntersectionObserver" in window) {
      const hero = document.getElementById("hero");
      const hio = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) { run(); obs.disconnect(); }
      }, { threshold: 0.25 });
      hio.observe(hero);
    } else {
      run();
    }
  }

  /* ---------- Reveal on anchor navigation ---------- */
  function revealInSection(section) {
    if (!section) return;
    section.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || hash === "#top") return;
      const section = document.querySelector(hash);
      revealInSection(section);
      setTimeout(() => revealInSection(section), 500);
    });
  });

  if (location.hash) {
    revealInSection(document.querySelector(location.hash));
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll(".nav__links a");
  const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = "#" + e.target.id;
            navLinks.forEach((a) => a.style.color = a.getAttribute("href") === id ? "var(--bone)" : "");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => sio.observe(s));
  }
})();
