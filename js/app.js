import { translations } from "./translations.js";
import { areas, areaSlugs, areaDetails, news, documents, documentMetadata, gallery } from "./content-data.js";

const state = {
  lang: "fr",
  newsFilter: "all",
  docFilter: "all",
  docSearch: "",
  docSort: "date-desc"
};

const supportedLanguages = ["fr", "ht", "en"];

function renderSiteShell() {
  const base = document.body.dataset.base || "";
  const section = document.body.dataset.section || document.body.dataset.page || "home";
  const page = document.body.dataset.page || "home";
  const path = (file) => `${base}${file}`;
  const active = (name) => section === name ? ' aria-current="page"' : "";
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");

  if (header) {
    header.innerHTML = `
      <div class="topbar">
        <p data-i18n="tagline">Unis pour défendre, engagés pour changer</p>
        <div class="topbar-actions">
          <a href="${path("pages/publications.html")}" data-i18n="docCenter">Centre de documentation</a>
          <select class="language-select" aria-label="Langue" data-i18n-aria-label="languageLabel">
            <option value="ht">Kreyòl Ayisyen</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <nav class="navbar" aria-label="Navigation principale" data-i18n-aria-label="navMainLabel">
        <a class="brand" href="${path("index.html")}" aria-label="Accueil SKL" data-i18n-aria-label="homeLabel">
          <img src="${path("assets/skl-logo-160.webp")}" alt="Logo Sant Karl Lévêque SKL" width="160" height="103">
          <span>Sant Karl Lévêque</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Ouvrir le menu principal" data-i18n-aria-label="openMenuLabel">
          <span></span><span></span><span></span>
        </button>
        <ul id="primary-menu" class="nav-menu">
          <li class="has-menu${section === "about" ? " is-current" : ""}">
            <div class="nav-item-row">
              <a href="${path("pages/about.html")}" data-i18n="navWho"${active("about")}>Qui nous sommes</a>
              <button class="submenu-toggle" type="button" aria-expanded="false" aria-controls="about-menu" aria-label="Ouvrir le sous-menu Qui nous sommes" data-i18n-aria-label="openAboutLabel"><span aria-hidden="true"></span></button>
            </div>
            <div class="mega-menu" id="about-menu">
              <a href="${path("pages/heritage.html")}" data-i18n="navHeritage"${page === "heritage" ? ' aria-current="page"' : ""}>Notre héritage</a>
              <a href="${path("pages/mission-vision.html")}" data-i18n="navMission"${page === "mission" ? ' aria-current="page"' : ""}>Mission et vision</a>
              <a href="${path("pages/directeur.html")}" data-i18n="navDirector"${page === "director" ? ' aria-current="page"' : ""}>Mot du Directeur</a>
              <a href="${path("pages/equipe.html")}" data-i18n="navTeam"${page === "team" ? ' aria-current="page"' : ""}>Équipe</a>
            </div>
          </li>
          <li class="has-menu${section === "areas" ? " is-current" : ""}">
            <div class="nav-item-row">
              <a href="${path("pages/interventions.html")}" data-i18n="navAreas"${active("areas")}>Nos domaines d'intervention</a>
              <button class="submenu-toggle" type="button" aria-expanded="false" aria-controls="areas-menu" aria-label="Ouvrir le sous-menu Domaines d'intervention" data-i18n-aria-label="openAreasLabel"><span aria-hidden="true"></span></button>
            </div>
            <div class="mega-menu mega-menu-wide" id="areas-menu">
              ${areas.map(([, key], index) => `<a href="${path(`pages/${areaSlugs[index]}`)}" data-i18n="${key}"${page === "area" && Number(document.body.dataset.area) === index ? ' aria-current="page"' : ""}>${translations.fr[key]}</a>`).join("")}
            </div>
          </li>
          <li><a href="${path("pages/actions.html")}" data-i18n="navActions"${active("actions")}>Actions & réalisations</a></li>
          <li><a href="${path("pages/publications.html")}" data-i18n="navNews"${active("publications")}>Actualités & publications</a></li>
          <li><a href="${path("pages/contact.html")}" data-i18n="navContact"${active("contact")}>Contact & implication</a></li>
          <li><a class="btn btn-primary" href="${path("pages/soutenir.html")}" data-i18n="donate"${active("support")}>Soutenir SKL</a></li>
        </ul>
      </nav>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-brand"><h2>Sant Karl Lévêque (SKL)</h2><p data-i18n="footerText">Organisation haïtienne engagée pour les droits humains, la justice sociale et l'État de droit.</p></div>
      <nav aria-label="Navigation secondaire"><h3 data-i18n="quickLinks">Navigation</h3><a href="${path("pages/about.html")}" data-i18n="navWho">Qui nous sommes</a><a href="${path("pages/interventions.html")}" data-i18n="navAreas">Domaines d'intervention</a><a href="${path("pages/actions.html")}" data-i18n="navActions">Actions & réalisations</a><a href="${path("pages/publications.html")}" data-i18n="navNews">Actualités & publications</a></nav>
      <div><h3 data-i18n="resources">Ressources</h3><a href="${path("pages/mentions-legales.html")}" data-i18n="legalNotice">Mentions légales</a><a href="${path("pages/confidentialite.html")}" data-i18n="privacy">Confidentialité</a><a href="${path("pages/accessibilite.html")}" data-i18n="accessibility">Accessibilité</a></div>
      <address><h3 data-i18n="navContact">Contact & implication</h3><strong data-i18n="gardyName">Rév. Père Gardy Maisonneuve</strong><br><a href="tel:+50947051133">+509 4705-1133</a><br><a href="mailto:reverendperegmaisonneuve@gmail.com">reverendperegmaisonneuve@gmail.com</a></address>
      <div class="footer-bottom"><label><span data-i18n="footerLanguage">Choisir la langue</span><select class="language-select" aria-label="Langue" data-i18n-aria-label="languageLabel"><option value="ht">Kreyòl Ayisyen</option><option value="fr">Français</option><option value="en">English</option></select></label><p>&copy; <span data-current-year></span> Sant Karl Lévêque. <span data-i18n="copyright">Tous droits réservés.</span></p></div>`;
    footer.querySelector("[data-current-year]").textContent = new Date().getFullYear();
  }
}

function getInitialLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested && translations[requested]) return requested;
  const saved = localStorage.getItem("skl-language");
  if (saved && translations[saved]) return saved;
  const browser = (navigator.language || "fr").toLowerCase();
  if (browser.startsWith("ht")) return "ht";
  if (browser.startsWith("en")) return "en";
  return "fr";
}

function t(key) {
  return translations[state.lang][key] || translations.fr[key] || key;
}

function localize(value) {
  if (value && typeof value === "object") return value[state.lang] || value.fr || "";
  return value;
}

function updatePageMetadata() {
  const page = document.body.dataset.page || "home";
  const area = areas[Number(document.body.dataset.area)];
  const titleByPage = {
    home: "Sant Karl Lévêque - SKL",
    about: `${t("navWho")} - Sant Karl Lévêque`,
    heritage: `${t("navHeritage")} - SKL`,
    mission: `${t("navMission")} - SKL`,
    director: `${t("navDirector")} - SKL`,
    team: `${t("navTeam")} - SKL`,
    areas: `${t("navAreas")} - SKL`,
    news: `${t("navActions")} - SKL`,
    docs: `${t("navNews")} - SKL`,
    contact: `${t("navContact")} - SKL`,
    support: `${t("donate")} - SKL`,
    legal: `${t("legalTitle")} - SKL`,
    privacy: `${t("privacyTitle")} - SKL`,
    accessibility: `${t("accessibilityTitle")} - SKL`
  };
  const descriptionKeyByPage = {
    home: "heroLead",
    about: "aboutLead",
    heritage: "heritageHeroLead",
    mission: "missionHeroLead",
    director: "directorHeroLead",
    team: "teamLead",
    areas: "areasLead",
    news: "newsPageLead",
    docs: "docsLead",
    contact: "contactLead",
    support: "supportLead",
    legal: "legalLead",
    privacy: "privacyLead",
    accessibility: "accessibilityLead"
  };
  if (page === "area" && area) document.title = `${t(area[1])} - SKL`;
  else if (titleByPage[page]) document.title = titleByPage[page];
  const description = page === "area" && area ? localize(area[2]) : descriptionKeyByPage[page] ? t(descriptionKeyByPage[page]) : document.querySelector('meta[name="description"]')?.content || "";
  if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", document.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
}

function updateLanguageUrls() {
  const current = new URL(window.location.href);
  current.searchParams.set("lang", state.lang);
  window.history.replaceState({}, "", `${current.pathname}${current.search}${current.hash}`);
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([download])').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^(https?:)?\/\//.test(href)) return;
    const url = new URL(href, window.location.href);
    url.searchParams.set("lang", state.lang);
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
    const lang = link.getAttribute("hreflang");
    if (!supportedLanguages.includes(lang)) return;
    const url = new URL(link.href);
    url.searchParams.set("lang", lang);
    link.href = url.href;
  });
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", state.lang === "fr" ? "fr_HT" : state.lang === "ht" ? "ht_HT" : "en_US");
}

function setLanguage(lang) {
  state.lang = translations[lang] ? lang : "fr";
  localStorage.setItem("skl-language", state.lang);
  document.documentElement.lang = state.lang;
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = state.lang;
  });
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  ["aria-label", "placeholder", "alt"].forEach((attribute) => {
    const dataName = `i18n${attribute.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("")}`;
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((node) => {
      node.setAttribute(attribute, t(node.dataset[dataName]));
    });
  });
  updatePageMetadata();
  renderAll();
  updateLanguageUrls();
}

function renderAreas() {
  const target = document.querySelector('[data-render="areas"]');
  if (!target) return;
  const base = document.body.dataset.base || "";
  target.innerHTML = areas.map(([abbr, key, text], index) => `
    <a class="area-card" href="${base}pages/${areaSlugs[index]}">
      <div class="icon-box" aria-hidden="true">${abbr}</div>
      <h3>${t(key)}</h3>
      <p>${text[state.lang] || text.fr}</p>
      <span class="card-link" aria-hidden="true">&rarr;</span>
    </a>
  `).join("");
}

function renderAreaDetail() {
  const target = document.querySelector('[data-render="area-detail"]');
  if (!target) return;
  const index = Number(document.body.dataset.area);
  const area = areas[index];
  const details = areaDetails[index];
  if (!area || !details) return;
  const [, key, description] = area;
  const heroLead = document.querySelector(".page-hero > p:not(.eyebrow)");
  if (heroLead) heroLead.textContent = description[state.lang] || description.fr;
  const labels = state.lang === "en"
    ? ["Protect", "Accompany", "Transform"]
    : state.lang === "ht"
      ? ["Pwoteje", "Akonpaye", "Transfòme"]
      : ["Protéger", "Accompagner", "Transformer"];
  const items = details[state.lang] || details.fr;
  target.innerHTML = `
    <div class="detail-shell">
      <aside class="detail-aside">
        <span class="detail-number">0${index + 1}</span>
        <h2>${t(key)}</h2>
        <p>${description[state.lang] || description.fr}</p>
      </aside>
      <div class="detail-content">
        <p class="eyebrow">SKL</p>
        <h2>${state.lang === "en" ? "An approach grounded in rights and local realities." : state.lang === "ht" ? "Yon apwòch ki chita sou dwa ak reyalite lokal yo." : "Une approche fondée sur les droits et les réalités locales."}</h2>
        <div class="action-list">
          ${items.map((item, itemIndex) => `<article><span>0${itemIndex + 1}</span><h3>${labels[itemIndex]}</h3><p>${item}</p></article>`).join("")}
        </div>
      </div>
    </div>`;
}

function newsCard(item) {
  return `
    <article class="news-card">
      <div class="news-thumb"><span class="tag">${localize(item.date)}</span></div>
      <div class="news-body">
        <p class="news-meta">${t(`filter${item.category === "field" ? "Field" : item.category === "network" ? "Network" : "Advocacy"}`)}</p>
        <h3>${item.title[state.lang] || item.title.fr}</h3>
        <p>${item.text[state.lang] || item.text.fr}</p>
      </div>
    </article>
  `;
}

function renderNews() {
  const full = document.querySelector('[data-render="news"]');
  const featured = document.querySelector('[data-render="featured-news"]');
  if (full) {
    const filtered = state.newsFilter === "all" ? news : news.filter((item) => item.category === state.newsFilter);
    full.innerHTML = filtered.map(newsCard).join("");
  }
  if (featured) {
    featured.innerHTML = news.slice(0, 3).map(newsCard).join("");
  }
}

function renderGallery() {
  const target = document.querySelector('[data-render="gallery"]');
  if (!target) return;
  const base = document.body.dataset.base || "";
  target.innerHTML = gallery.map((item) => {
    const webp = item.image.replace(/\.png$/, ".webp");
    const small = item.image.replace(/\.png$/, "-640.webp");
    const medium = item.image.replace(/\.png$/, "-960.webp");
    return `
    <article class="gallery-card">
      <div class="gallery-thumb">
        <picture><source type="image/webp" srcset="${base}${small} 640w, ${base}${medium} 960w, ${base}${webp} 1448w" sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"><img src="${base}${item.image}" alt="${localize(item.alt)}" loading="lazy" decoding="async" width="1448" height="1086"></picture>
        <span class="tag">${localize(item.label)}</span>
      </div>
      <h3>${localize(item.title)}</h3>
      <p>${localize(item.text)}</p>
    </article>
  `; }).join("");
}

function formatFileSize(bytes) {
  return bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

function renderDocuments() {
  const target = document.querySelector('[data-render="documents"]');
  if (!target) return;
  const query = state.docSearch.trim().toLowerCase();
  const filtered = documents.filter((doc) => {
    const text = `${localize(doc.title)} ${localize(doc.text)} ${localize(doc.year)}`.toLowerCase();
    const matchesType = state.docFilter === "all" || doc.type === state.docFilter;
    const matchesQuery = !query || text.includes(query);
    return matchesType && matchesQuery;
  }).sort((a, b) => {
    if (state.docSort === "title") return localize(a.title).localeCompare(localize(b.title), state.lang);
    const aDate = documentMetadata[a.file]?.date || "0000-00-00";
    const bDate = documentMetadata[b.file]?.date || "0000-00-00";
    return state.docSort === "date-asc" ? aDate.localeCompare(bDate) : bDate.localeCompare(aDate);
  });
  const typeKeys = {
    institutional: "filterInstitutional",
    analysis: "filterAnalysis",
    advocacy: "filterAdvocacy",
    report: "filterReports",
    press: "filterPress",
    correspondence: "filterCorrespondence"
  };
  target.innerHTML = filtered.length ? filtered.map((doc) => {
    const meta = documentMetadata[doc.file] || {};
    const date = typeof doc.year === "object" ? localize(doc.year) : doc.year;
    return `
    <article class="doc-card">
      <div>
        <span class="doc-type"><time${meta.date ? ` datetime="${meta.date}"` : ""}>${date}</time> · ${t(typeKeys[doc.type])}</span>
        <h3>${localize(doc.title)}</h3>
        <p class="doc-meta">${localize(doc.text)}</p>
        <p class="doc-facts">PDF · ${formatFileSize(meta.size || 0)} · ${state.lang.toUpperCase()} · ${meta.pages || "–"} ${t("documentPages")}</p>
      </div>
      <div class="doc-actions"><a class="btn btn-secondary" href="${document.body.dataset.base || ""}${doc.file}" target="_blank" rel="noopener">${t("openDocument")}</a><a class="btn btn-primary" href="${document.body.dataset.base || ""}${doc.file}" download>${t("download")}</a></div>
    </article>
  `; }).join("") : `<div class="empty-state"><h3>${t("noResults")}</h3><p>${t("changeSearch")}</p></div>`;
  const status = document.querySelector("[data-doc-results]");
  if (status) status.textContent = `${filtered.length} ${filtered.length === 1 ? t("resultSingle") : t("resultPlural")}`;
}

function renderAll() {
  renderAreas();
  renderAreaDetail();
  renderNews();
  renderGallery();
  renderDocuments();
}

function bindNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#primary-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const closeSubmenus = (exception = null) => {
    menu.querySelectorAll(".has-menu.is-open").forEach((item) => {
      if (item === exception) return;
      item.classList.remove("is-open");
      item.querySelector(".submenu-toggle")?.setAttribute("aria-expanded", "false");
    });
  };

  menu.querySelectorAll(".submenu-toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const item = button.closest(".has-menu");
      const willOpen = !item.classList.contains("is-open");
      closeSubmenus(item);
      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    menu.querySelectorAll(".has-menu").forEach((item) => {
      let closeTimer;
      const button = item.querySelector(".submenu-toggle");
      item.addEventListener("mouseenter", () => {
        window.clearTimeout(closeTimer);
        closeSubmenus(item);
        item.classList.add("is-open");
        button?.setAttribute("aria-expanded", "true");
      });
      item.addEventListener("mouseleave", () => {
        closeTimer = window.setTimeout(() => {
          item.classList.remove("is-open");
          button?.setAttribute("aria-expanded", "false");
        }, 180);
      });
    });
  }

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      closeSubmenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    closeSubmenus();
  });
}

function enhanceInterface() {
  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 56);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealTargets = document.querySelectorAll(".value-card, .area-card, .news-card, .gallery-card, .doc-card, .team-card, .mission-grid article");
  revealTargets.forEach((node) => node.setAttribute("data-reveal", ""));
  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((node) => node.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px" });
  revealTargets.forEach((node) => observer.observe(node));
}

function bindFilters() {
  document.querySelectorAll("[data-news-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.newsFilter = button.dataset.newsFilter;
      document.querySelectorAll("[data-news-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderNews();
    });
  });
  document.querySelectorAll("[data-doc-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.docFilter = button.dataset.docFilter;
      document.querySelectorAll("[data-doc-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderDocuments();
    });
  });
  const search = document.querySelector("#doc-search");
  if (search) {
    search.addEventListener("input", (event) => {
      state.docSearch = event.target.value;
      renderDocuments();
    });
  }
  const sort = document.querySelector("#doc-sort");
  if (sort) {
    sort.addEventListener("change", (event) => {
      state.docSort = event.target.value;
      renderDocuments();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSiteShell();
  bindNavigation();
  bindFilters();
  document.querySelectorAll(".language-select").forEach((select) => {
    select.addEventListener("change", (event) => setLanguage(event.target.value));
  });
  setLanguage(getInitialLanguage());
  enhanceInterface();
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    const base = document.body.dataset.base || "";
    navigator.serviceWorker.register(`${base}service-worker.js`).catch(() => {});
  }
});
