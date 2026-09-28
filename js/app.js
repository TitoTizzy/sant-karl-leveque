const state = {
  lang: "fr",
  newsFilter: "all",
  docFilter: "all",
  docSearch: ""
};

const translations = {
  fr: {
    skip: "Aller au contenu",
    tagline: "Unis pour defendre, engages pour changer",
    docCenter: "Centre de documentation",
    navWho: "Qui nous sommes",
    navHeritage: "Notre heritage",
    navMission: "Mission et vision",
    navDirector: "Mot du Directeur",
    navTeam: "Equipe",
    navAreas: "Nos domaines d'intervention",
    navActions: "Actions & realisations",
    navNews: "Actualites & publications",
    navContact: "Contact & implication",
    donate: "Soutenir SKL",
    areaRights: "Droits humains",
    areaJustice: "Acces a la justice",
    areaFood: "Securite alimentaire",
    areaChildren: "Protection de l'enfance",
    areaMigration: "Migration et deplaces",
    areaHealth: "Sante communautaire",
    heroEyebrow: "Organisation haitienne de droits humains",
    heroTitle: "Sant Karl Leveque defend la dignite, la justice et l'Etat de droit en Haiti.",
    heroLead: "Depuis sa creation, SKL promeut, protege et defend les droits humains, soutient les victimes et accompagne les communautes les plus vulnerables.",
    discover: "Decouvrir nos actions",
    readReports: "Lire les rapports",
    valuesEyebrow: "Nos reperes",
    valuesTitle: "Une presence independante, impartiale et ancree dans les realites locales.",
    value1Title: "Defense des droits",
    value1Text: "Promotion et protection des droits fondamentaux, documentation et plaidoyer pour les populations vulnerables.",
    value2Title: "Acces a la justice",
    value2Text: "Assistance aux victimes, appui juridique et suivi des lieux de detention.",
    value3Title: "Engagement civique",
    value3Text: "Formation, education civique et developpement d'une nouvelle generation de leaders.",
    areasEyebrow: "Domaines d'intervention",
    areasTitle: "Des priorites humanitaires et civiques au service de la protection.",
    directorEyebrow: "Mot du Directeur Executif",
    directorQuote: "Inspiree par l'heritage du Reverend Pere Karl Leveque, notre organisation travaille avec independance, professionnalisme et devouement au service des communautes les plus vulnerables.",
    readMessage: "Lire le message complet",
    newsEyebrow: "Actualites",
    newsTitle: "Actions de terrain et plaidoyer",
    allNews: "Toutes les actualites",
    partnersEyebrow: "Reseaux et partenaires",
    partnersTitle: "SKL contribue au renforcement du mouvement haitien des droits humains.",
    donors: "Bailleurs institutionnels",
    footerText: "Organisation haitienne engagee pour les droits humains, la justice sociale et l'Etat de droit.",
    execDirector: "Directeur Executif",
    secretary: "Secretaire General",
    aboutEyebrow: "Qui nous sommes",
    aboutTitle: "Une organisation historique de la societe civile haitienne.",
    aboutLead: "SKL est dediee a la defense et a la promotion des droits humains, de la democratie, de la justice sociale et de l'Etat de droit.",
    heritageEyebrow: "Notre heritage",
    heritageTitle: "Porter l'engagement du Reverend Pere Karl Leveque.",
    heritageText: "L'organisation porte le nom du Reverend Pere Karl Leveque (1937-1986), pretre jesuite et intellectuel profondement engage dans la defense des droits fondamentaux et la lutte contre la dictature. Ce nom reflete l'engagement de SKL a poursuivre son heritage de justice, de democratie et d'engagement social.",
    missionLabel: "Mission",
    missionText: "Promouvoir, proteger et defendre les droits humains, renforcer l'Etat de droit, soutenir les victimes et contribuer a une societe plus juste et equitable.",
    visionLabel: "Vision",
    visionText: "Une Haiti ou chaque personne jouit pleinement de ses droits dans la dignite, la justice et la paix.",
    directorHeading: "Independance, professionnalisme et devouement.",
    directorLong: "Depuis sa creation, SANT KARL LEVEQUE (SKL) s'engage dans la promotion, la protection et la defense des droits humains en Haiti. Inspiree par l'heritage du Reverend Pere Karl Leveque, notre organisation travaille avec independance, professionnalisme et devouement au service des communautes les plus vulnerables et de toutes les institutions engagees pour la dignite humaine, la justice et l'Etat de droit.",
    teamEyebrow: "Equipe de reference",
    teamTitle: "Une gouvernance identifiable et accessible.",
    newsPageTitle: "Actions, realisations et plaidoyer de terrain.",
    newsPageLead: "Suivez les initiatives de SKL pour l'acces a la justice, la protection, la securite alimentaire et l'appui aux communautes affectees.",
    filterAll: "Tout",
    filterField: "Terrain",
    filterAdvocacy: "Plaidoyer",
    filterNetwork: "Reseaux",
    galleryEyebrow: "Galerie terrain",
    galleryTitle: "Photos et videos a publier depuis les missions communautaires.",
    docsEyebrow: "Centre de documentation",
    docsTitle: "Rapports, notes de plaidoyer et ressources institutionnelles.",
    docsLead: "Un espace filtrable pour consulter et telecharger les documents officiels de SKL.",
    searchDocs: "Rechercher",
    filterInstitutional: "Institutionnel",
    filterReports: "Rapports",
    download: "Telecharger"
  },
  ht: {
    skip: "Ale nan kontni an",
    tagline: "Ini pou defann, angaje pou chanje",
    docCenter: "Sant dokimantasyon",
    navWho: "Kiyes nou ye",
    navHeritage: "Eritaj nou",
    navMission: "Misyon ak vizyon",
    navDirector: "Pawol Direkte a",
    navTeam: "Ekip",
    navAreas: "Domenn entevansyon",
    navActions: "Aksyon ak reyalizasyon",
    navNews: "Aktyalite ak piblikasyon",
    navContact: "Kontak ak patisipasyon",
    donate: "Soutni SKL",
    areaRights: "Dwa moun",
    areaJustice: "Aksè ak lajistis",
    areaFood: "Sekirite alimante",
    areaChildren: "Pwoteksyon timoun",
    areaMigration: "Migrasyon ak deplase",
    areaHealth: "Sante kominote",
    heroEyebrow: "Oganizasyon ayisyen dwa moun",
    heroTitle: "Sant Karl Leveque defann diyite, jistis ak Leta de dwa ann Ayiti.",
    heroLead: "Depi li fonde, SKL ankouraje, pwoteje epi defann dwa moun, sipote viktim yo epi akonpaye kominote ki pi frajil yo.",
    discover: "Dekouvri aksyon nou yo",
    readReports: "Li rapo yo",
    valuesEyebrow: "Pwen referans nou",
    valuesTitle: "Yon prezans endepandan, san patipri, ki chita sou reyalite lokal yo.",
    value1Title: "Defans dwa yo",
    value1Text: "Pwomosyon ak pwoteksyon dwa fondamantal, dokimantasyon ak pledwaye pou popilasyon vilnerab yo.",
    value2Title: "Aksè ak lajistis",
    value2Text: "Asistans pou viktim, api legal ak siveyans kote detansyon yo.",
    value3Title: "Angajman sitwayen",
    value3Text: "Fomasyon, edikasyon sivik ak devlopman yon nouvo jenerasyon lidè.",
    areasEyebrow: "Domenn entevansyon",
    areasTitle: "Priyorite imanitè ak sitwayen pou pwoteksyon moun.",
    directorEyebrow: "Pawol Direkte Egzekitif la",
    directorQuote: "Enspire pa eritaj Reveran Pè Karl Leveque, òganizasyon nou an travay ak endepandans, pwofesyonalis ak devouman pou kominote ki pi vilnerab yo.",
    readMessage: "Li mesaj la antye",
    newsEyebrow: "Aktyalite",
    newsTitle: "Aksyon teren ak pledwaye",
    allNews: "Tout aktyalite yo",
    partnersEyebrow: "Rezo ak patnè",
    partnersTitle: "SKL kontribye nan ranfosman mouvman ayisyen dwa moun.",
    donors: "Baye fon enstitisyonèl",
    footerText: "Oganizasyon ayisyen ki angaje pou dwa moun, jistis sosyal ak Leta de dwa.",
    execDirector: "Direkte Egzekitif",
    secretary: "Sekretè Jeneral",
    aboutEyebrow: "Kiyes nou ye",
    aboutTitle: "Yon òganizasyon istorik nan sosyete sivil ayisyen an.",
    aboutLead: "SKL dedye ak defans ak pwomosyon dwa moun, demokrasi, jistis sosyal ak Leta de dwa.",
    heritageEyebrow: "Eritaj nou",
    heritageTitle: "Pote angajman Reveran Pè Karl Leveque.",
    heritageText: "Oganizasyon an pote non Reveran Pè Karl Leveque (1937-1986), yon pè jezuit ak entelektyel ki te angaje fon nan defans dwa fondamantal ak batay kont diktati. Non sa a montre angajman SKL pou kontinye eritaj jistis, demokrasi ak angajman sosyal li.",
    missionLabel: "Misyon",
    missionText: "Ankouraje, pwoteje epi defann dwa moun, ranfose Leta de dwa, sipote viktim yo epi kontribye nan bati yon sosyete ki pi jis ak ekitab.",
    visionLabel: "Vizyon",
    visionText: "Yon Ayiti kote chak moun jwi dwa li yo ak diyite, jistis ak lapè.",
    directorHeading: "Endepandans, pwofesyonalis ak devouman.",
    directorLong: "Depi li fonde, SANT KARL LEVEQUE (SKL) angaje nan pwomosyon, pwoteksyon ak defans dwa moun ann Ayiti. Enspire pa eritaj Reveran Pè Karl Leveque, òganizasyon an travay ak endepandans, pwofesyonalis ak devouman pou kominote ki pi vilnerab yo ak tout enstitisyon ki angaje pou diyite moun, jistis ak Leta de dwa.",
    teamEyebrow: "Ekip referans",
    teamTitle: "Yon gouvènans ki klè epi aksesib.",
    newsPageTitle: "Aksyon, reyalizasyon ak pledwaye sou teren.",
    newsPageLead: "Swiv inisyativ SKL pou aksè ak lajistis, pwoteksyon, sekirite alimante ak api pou kominote ki afekte yo.",
    filterAll: "Tout",
    filterField: "Teren",
    filterAdvocacy: "Pledwaye",
    filterNetwork: "Rezo",
    galleryEyebrow: "Galeri teren",
    galleryTitle: "Foto ak videyo pou pibliye depi misyon kominotè yo.",
    docsEyebrow: "Sant dokimantasyon",
    docsTitle: "Rapo, nòt pledwaye ak resous enstitisyonèl.",
    docsLead: "Yon espas pou filtre, konsilte ak telechaje dokiman ofisyèl SKL yo.",
    searchDocs: "Chèche",
    filterInstitutional: "Enstitisyonèl",
    filterReports: "Rapo",
    download: "Telechaje"
  },
  en: {
    skip: "Skip to content",
    tagline: "United to defend, committed to change",
    docCenter: "Documentation center",
    navWho: "Who we are",
    navHeritage: "Our legacy",
    navMission: "Mission and vision",
    navDirector: "Director's message",
    navTeam: "Team",
    navAreas: "Areas of intervention",
    navActions: "Actions & achievements",
    navNews: "News & publications",
    navContact: "Contact & engagement",
    donate: "Support SKL",
    areaRights: "Human rights",
    areaJustice: "Access to justice",
    areaFood: "Food security",
    areaChildren: "Child protection",
    areaMigration: "Migration and IDPs",
    areaHealth: "Community health",
    heroEyebrow: "Haitian human rights organization",
    heroTitle: "Sant Karl Leveque defends dignity, justice and the rule of law in Haiti.",
    heroLead: "Since its establishment, SKL has promoted, protected and defended human rights, supported victims and served the most vulnerable communities.",
    discover: "Discover our work",
    readReports: "Read reports",
    valuesEyebrow: "Our compass",
    valuesTitle: "An independent, impartial presence grounded in local realities.",
    value1Title: "Rights defense",
    value1Text: "Promotion and protection of fundamental rights, documentation and advocacy for vulnerable populations.",
    value2Title: "Access to justice",
    value2Text: "Victim assistance, legal support and monitoring of detention facilities.",
    value3Title: "Civic engagement",
    value3Text: "Training, civic education and development of a new generation of leaders.",
    areasEyebrow: "Areas of intervention",
    areasTitle: "Humanitarian and civic priorities in service of protection.",
    directorEyebrow: "Message from the Executive Director",
    directorQuote: "Inspired by the legacy of Reverend Father Karl Leveque, our organization works with independence, professionalism and dedication to serve the most vulnerable communities.",
    readMessage: "Read the full message",
    newsEyebrow: "News",
    newsTitle: "Field action and advocacy",
    allNews: "All news",
    partnersEyebrow: "Networks and partners",
    partnersTitle: "SKL contributes to strengthening Haiti's human rights movement.",
    donors: "Institutional donors",
    footerText: "Haitian organization committed to human rights, social justice and the rule of law.",
    execDirector: "Executive Director",
    secretary: "Secretary General",
    aboutEyebrow: "Who we are",
    aboutTitle: "A long-standing organization in Haitian civil society.",
    aboutLead: "SKL is dedicated to the defense and promotion of human rights, democracy, social justice and the rule of law.",
    heritageEyebrow: "Our legacy",
    heritageTitle: "Carrying Reverend Father Karl Leveque's commitment forward.",
    heritageText: "The organization is named after Reverend Father Karl Leveque (1937-1986), a Jesuit priest and intellectual deeply committed to the defense of fundamental rights and the struggle against dictatorship. His name reflects SKL's commitment to carrying forward his legacy of justice, democracy and social engagement.",
    missionLabel: "Mission",
    missionText: "To promote, protect and defend human rights, strengthen the rule of law, support victims and contribute to a more just and equitable society.",
    visionLabel: "Vision",
    visionText: "A Haiti where every individual fully enjoys their rights in dignity, justice and peace.",
    directorHeading: "Independence, professionalism and dedication.",
    directorLong: "Since its establishment, SANT KARL LEVEQUE (SKL) has been committed to the promotion, protection and defense of human rights in Haiti. Inspired by the legacy of Reverend Father Karl Leveque, our organization works with independence, professionalism and dedication to serve the most vulnerable communities and all institutions committed to human dignity, justice and the rule of law.",
    teamEyebrow: "Reference team",
    teamTitle: "Identifiable and accessible leadership.",
    newsPageTitle: "Actions, achievements and field advocacy.",
    newsPageLead: "Follow SKL initiatives for access to justice, protection, food security and support for affected communities.",
    filterAll: "All",
    filterField: "Field",
    filterAdvocacy: "Advocacy",
    filterNetwork: "Networks",
    galleryEyebrow: "Field gallery",
    galleryTitle: "Photos and videos to publish from community missions.",
    docsEyebrow: "Documentation center",
    docsTitle: "Reports, advocacy briefs and institutional resources.",
    docsLead: "A filterable space to consult and download official SKL documents.",
    searchDocs: "Search",
    filterInstitutional: "Institutional",
    filterReports: "Reports",
    download: "Download"
  }
};

const areas = [
  ["DH", "areaRights", {
    fr: "Promotion, protection et documentation des droits fondamentaux.",
    ht: "Pwomosyon, pwoteksyon ak dokimantasyon dwa fondamantal yo.",
    en: "Promotion, protection and documentation of fundamental rights."
  }],
  ["AJ", "areaJustice", {
    fr: "Assistance juridique, accompagnement des victimes et plaidoyer.",
    ht: "Asistans legal, akonpayman viktim ak pledwaye.",
    en: "Legal assistance, victim support and advocacy."
  }],
  ["SA", "areaFood", {
    fr: "Appui aux populations vulnerables et lutte contre la faim.",
    ht: "Api pou popilasyon vilnerab yo ak batay kont grangou.",
    en: "Support for vulnerable populations and the fight against hunger."
  }],
  ["PE", "areaChildren", {
    fr: "Protection des enfants et des groupes vulnerables.",
    ht: "Pwoteksyon timoun ak gwoup vilnerab yo.",
    en: "Protection of children and vulnerable groups."
  }],
  ["MD", "areaMigration", {
    fr: "Protection des migrants, retournes, refugies et personnes deplacees.",
    ht: "Pwoteksyon migran, moun ki retounen, refijye ak moun deplase.",
    en: "Protection of migrants, returnees, refugees and internally displaced persons."
  }],
  ["SC", "areaHealth", {
    fr: "Sante communautaire, eau potable, assainissement et assistance humanitaire.",
    ht: "Sante kominote, dlo potab, asenisman ak asistans imanitè.",
    en: "Community health, safe water, sanitation and humanitarian assistance."
  }]
];

const news = [
  {
    category: "field",
    date: "2025",
    title: { fr: "Initiative Retour dans les quartiers a Nazon", ht: "Inisyativ Retounen nan katye yo nan Nazon", en: "Return to the Neighborhoods initiative in Nazon" },
    text: { fr: "SKL a mis en oeuvre une initiative de terrain pour accompagner les familles et soutenir la reprise communautaire.", ht: "SKL mete ann aplikasyon yon inisyativ teren pou akonpaye fanmi yo epi soutni relans kominote a.", en: "SKL implemented a field initiative to accompany families and support community recovery." }
  },
  {
    category: "advocacy",
    date: "Tabarre",
    title: { fr: "Appui aux residents menaces de demolition", ht: "Api pou rezidan ki menase ak demolisyon", en: "Support for residents affected by demolition measures" },
    text: { fr: "Assistance juridique et plaidoyer pour les residents de Tabarre affectes par des mesures de demolition pres de l'Ambassade des Etats-Unis.", ht: "Asistans legal ak pledwaye pou rezidan Taba ki afekte pa mezi demolisyon pre Anbasad Etazini.", en: "Legal assistance and advocacy for Tabarre residents affected by demolition measures near the U.S. Embassy." }
  },
  {
    category: "field",
    date: "Protection",
    title: { fr: "Distribution de kits alimentaires et d'hygiene", ht: "Distribisyon kit manje ak ijyen", en: "Distribution of food and hygiene kits" },
    text: { fr: "Soutien aux personnes deplacees internes et aux menages vulnerables.", ht: "Sipò pou moun deplase andedan peyi a ak fanmi vilnerab yo.", en: "Support for internally displaced persons and vulnerable households." }
  },
  {
    category: "network",
    date: "Reseaux",
    title: { fr: "Contribution aux plateformes POHDH, GARR et ECC", ht: "Kontribisyon nan platfom POHDH, GARR ak ECC", en: "Contribution to POHDH, GARR and ECC networks" },
    text: { fr: "SKL contribue au developpement et au renforcement du mouvement haitien des droits humains.", ht: "SKL kontribye nan devlopman ak ranfosman mouvman ayisyen dwa moun.", en: "SKL contributes to the development and strengthening of Haiti's human rights movement." }
  },
  {
    category: "advocacy",
    date: "Justice",
    title: { fr: "Suivi des prisons et lieux de detention", ht: "Siveyans prizon ak kote detansyon", en: "Monitoring prisons and detention facilities" },
    text: { fr: "Missions de monitoring et plaidoyer pour les personnes privees de liberte.", ht: "Misyon siveyans ak pledwaye pou moun ki prive libète yo.", en: "Monitoring missions and advocacy for persons deprived of liberty." }
  },
  {
    category: "field",
    date: "Eau",
    title: { fr: "Programmes communautaires eau et assainissement", ht: "Pwogram kominotè dlo ak asenisman", en: "Community water and sanitation programs" },
    text: { fr: "Programmes communautaires pour ameliorer l'acces a l'eau potable et a l'assainissement.", ht: "Pwogram kominotè pou amelyore aksè ak dlo potab ak asenisman.", en: "Community-based programs to improve access to safe drinking water and sanitation." }
  }
];

const documents = [
  {
    type: "institutional",
    year: "2026",
    file: "assets/docs/brochure-officielle-skl.pdf",
    title: { fr: "Brochure officielle SKL", ht: "Brochi ofisyel SKL", en: "Official SKL brochure" },
    text: { fr: "Mission, vision, domaines d'intervention, priorites et contacts institutionnels.", ht: "Misyon, vizyon, domenn entevansyon, priyorite ak kontak enstitisyonel.", en: "Mission, vision, areas of intervention, priorities and institutional contacts." }
  },
  {
    type: "institutional",
    year: "2026",
    file: "assets/docs/fact-sheet-skl.pdf",
    title: { fr: "Fact Sheet - Qui nous sommes", ht: "Fèy enfomasyon - Kiyes nou ye", en: "Fact sheet - Who we are" },
    text: { fr: "Presentation de l'heritage, du positionnement, des objectifs strategiques et des realisations.", ht: "Prezantasyon eritaj, pozisyon, objektif estratejik ak reyalizasyon yo.", en: "Overview of legacy, positioning, strategic objectives and achievements." }
  },
  {
    type: "advocacy",
    year: "A publier",
    file: "assets/docs/fact-sheet-skl.pdf",
    title: { fr: "Notes de plaidoyer", ht: "Not pledwaye", en: "Advocacy briefs" },
    text: { fr: "Espace prevu pour les notes sur les droits humains, l'acces a la justice et la protection.", ht: "Espas pou not sou dwa moun, aksè ak lajistis ak pwoteksyon.", en: "Space planned for briefs on human rights, access to justice and protection." }
  },
  {
    type: "report",
    year: "A publier",
    file: "assets/docs/brochure-officielle-skl.pdf",
    title: { fr: "Rapports annuels", ht: "Rapo anyel", en: "Annual reports" },
    text: { fr: "Collection filtrable pour les rapports annuels et rapports thematiques de SKL.", ht: "Koleksyon pou filtre rapo anyel ak rapo tematik SKL yo.", en: "Filterable collection for SKL annual and thematic reports." }
  }
];

const gallery = [
  { label: "Nazon", title: { fr: "Retour dans les quartiers", ht: "Retounen nan katye yo", en: "Return to the neighborhoods" } },
  { label: "Tabarre", title: { fr: "Acces a la justice", ht: "Aksè ak lajistis", en: "Access to justice" } },
  { label: "IDP", title: { fr: "Assistance aux deplaces", ht: "Asistans pou moun deplase", en: "Support for displaced persons" } }
];

function getInitialLanguage() {
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
  renderAll();
}

function renderAreas() {
  const target = document.querySelector('[data-render="areas"]');
  if (!target) return;
  target.innerHTML = areas.map(([abbr, key, text]) => `
    <article class="area-card">
      <div class="icon-box" aria-hidden="true">${abbr}</div>
      <h3>${t(key)}</h3>
      <p>${text[state.lang] || text.fr}</p>
    </article>
  `).join("");
}

function newsCard(item) {
  return `
    <article class="news-card">
      <div class="news-thumb"><span class="tag">${item.date}</span></div>
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
  target.innerHTML = gallery.map((item) => `
    <article class="gallery-card">
      <div class="gallery-thumb"><span class="tag">${item.label}</span></div>
      <h3>${item.title[state.lang] || item.title.fr}</h3>
      <p>${state.lang === "en" ? "Media slot ready for field photos or videos." : state.lang === "ht" ? "Espas pare pou foto oswa videyo teren." : "Emplacement pret pour photos ou videos de terrain."}</p>
    </article>
  `).join("");
}

function renderDocuments() {
  const target = document.querySelector('[data-render="documents"]');
  if (!target) return;
  const query = state.docSearch.trim().toLowerCase();
  const filtered = documents.filter((doc) => {
    const text = `${doc.title[state.lang] || doc.title.fr} ${doc.text[state.lang] || doc.text.fr} ${doc.year}`.toLowerCase();
    const matchesType = state.docFilter === "all" || doc.type === state.docFilter;
    const matchesQuery = !query || text.includes(query);
    return matchesType && matchesQuery;
  });
  target.innerHTML = filtered.map((doc) => `
    <article class="doc-card">
      <div>
        <span class="doc-type">${doc.year} - ${doc.type}</span>
        <h3>${doc.title[state.lang] || doc.title.fr}</h3>
        <p class="doc-meta">${doc.text[state.lang] || doc.text.fr}</p>
      </div>
      <a class="btn btn-secondary" href="${doc.file}" download>${t("download")}</a>
    </article>
  `).join("");
}

function renderAll() {
  renderAreas();
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
}

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindFilters();
  document.querySelectorAll(".language-select").forEach((select) => {
    select.addEventListener("change", (event) => setLanguage(event.target.value));
  });
  setLanguage(getInitialLanguage());
});
