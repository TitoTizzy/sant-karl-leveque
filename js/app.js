const state = {
  lang: "fr",
  newsFilter: "all",
  docFilter: "all",
  docSearch: ""
};

const translations = {
  fr: {
    skip: "Aller au contenu",
    tagline: "Unis pour défendre, engagés pour changer",
    docCenter: "Centre de documentation",
    navWho: "Qui nous sommes",
    navHeritage: "Notre héritage",
    navMission: "Mission et vision",
    navDirector: "Mot du Directeur",
    navTeam: "Équipe",
    navAreas: "Nos domaines d'intervention",
    navActions: "Actions & réalisations",
    navNews: "Actualités & publications",
    navContact: "Contact & implication",
    donate: "Soutenir SKL",
    areaRights: "Droits humains",
    areaJustice: "Accès à la justice",
    areaChildren: "Protection de l'enfance",
    areaMigration: "Migration et déplacés",
    areaHealth: "Santé communautaire",
    heroEyebrow: "Organisation haïtienne de droits humains",
    heroTitle: "Sant Karl Lévêque défend la dignité, la justice et l'État de droit en Haïti.",
    heroLead: "Depuis sa création, SKL promeut, protège et défend les droits humains, soutient les victimes et accompagne les communautés les plus vulnérables.",
    heroPhotoAlt: "Mobilisation citoyenne dans une communauté haïtienne",
    discover: "Découvrir nos actions",
    readReports: "Lire les rapports",
    impactLegacy: "Héritage du Rév. Père Karl Lévêque",
    impactAreas: "Domaines d'intervention prioritaires",
    impactNetworks: "Réseaux nationaux partenaires",
    impactReach: "Présence ancrée dans les communautés",
    valuesEyebrow: "Nos repères",
    valuesTitle: "Une présence indépendante, impartiale et ancrée dans les réalités locales.",
    value1Title: "Défense des droits",
    value1Text: "Promotion et protection des droits fondamentaux, documentation et plaidoyer pour les populations vulnérables.",
    value2Title: "Accès à la justice",
    value2Text: "Assistance aux victimes, appui juridique et suivi des lieux de détention.",
    value3Title: "Engagement civique",
    value3Text: "Formation, éducation civique et développement d'une nouvelle génération de leaders.",
    areasEyebrow: "Domaines d'intervention",
    areasTitle: "Des priorités humanitaires et civiques au service de la protection.",
    directorEyebrow: "Mot du Directeur Exécutif",
    directorQuote: "Inspirée par l'héritage du Révérend Père Karl Lévêque, notre organisation travaille avec indépendance, professionnalisme et dévouement au service des communautés les plus vulnérables.",
    readMessage: "Lire le message complet",
    newsEyebrow: "Actualités",
    newsTitle: "Actions de terrain et plaidoyer",
    allNews: "Toutes les actualités",
    partnersEyebrow: "Réseaux et partenaires",
    partnersTitle: "SKL contribue au renforcement du mouvement haïtien des droits humains.",
    donors: "Bailleurs institutionnels",
    footerText: "Organisation haïtienne engagée pour les droits humains, la justice sociale et l'État de droit.",
    execDirector: "Directeur Exécutif",
    secretary: "Secrétaire Général",
    aboutEyebrow: "Qui nous sommes",
    aboutTitle: "Une organisation historique de la société civile haïtienne.",
    aboutLead: "SKL est dédiée à la défense et à la promotion des droits humains, de la démocratie, de la justice sociale et de l'État de droit.",
    heritageEyebrow: "Notre héritage",
    heritageTitle: "Porter l'engagement du Révérend Père Karl Lévêque.",
    heritageText: "L'organisation porte le nom du Révérend Père Karl Lévêque (1937-1986), prêtre jésuite et intellectuel profondément engagé dans la défense des droits fondamentaux et la lutte contre la dictature. Ce nom reflète l'engagement de SKL à poursuivre son héritage de justice, de démocratie et d'engagement social.",
    missionLabel: "Mission",
    missionText: "Promouvoir, protéger et défendre les droits humains, renforcer l'État de droit, soutenir les victimes et contribuer à une société plus juste et équitable.",
    visionLabel: "Vision",
    visionText: "Une Haïti où chaque personne jouit pleinement de ses droits dans la dignité, la justice et la paix.",
    directorHeading: "Indépendance, professionnalisme et dévouement.",
    directorLong: "Depuis sa création, SANT KARL LÉVÊQUE (SKL) s'engage dans la promotion, la protection et la défense des droits humains en Haïti. Inspirée par l'héritage du Révérend Père Karl Lévêque, notre organisation travaille avec indépendance, professionnalisme et dévouement au service des communautés les plus vulnérables et de toutes les institutions engagées pour la dignité humaine, la justice et l'État de droit.",
    teamEyebrow: "Équipe de référence",
    teamTitle: "Une gouvernance identifiable et accessible.",
    newsPageTitle: "Actions, réalisations et plaidoyer de terrain.",
    newsPageLead: "Suivez les initiatives de SKL pour l'accès à la justice, la protection et l'appui aux communautés affectées.",
    filterAll: "Tout",
    filterField: "Terrain",
    filterAdvocacy: "Plaidoyer",
    filterNetwork: "Réseaux",
    galleryEyebrow: "Galerie terrain",
    galleryTitle: "La mobilisation communautaire en images.",
    docsEyebrow: "Centre de documentation",
    docsTitle: "Rapports, notes de plaidoyer et ressources institutionnelles.",
    docsLead: "Un espace filtrable pour consulter et télécharger les documents officiels de SKL.",
    searchDocs: "Rechercher",
    filterInstitutional: "Institutionnel",
    filterReports: "Rapports",
    download: "Télécharger",
    compassLabel: "Boussole des valeurs SKL",
    compassJustice: "Justice",
    compassDignity: "Dignité",
    compassPeace: "Paix",
    compassParticipation: "Participation",
    impactLabel: "Repères institutionnels",
    countryName: "Haïti",
    portraitAlt: "Portrait du Révérend Père Gardy Maisonneuve",
    gardyName: "Rév. Père Gardy Maisonneuve",
    karlName: "Rév. Père Karl Lévêque",
    aboutIndexEyebrow: "Découvrir SKL",
    aboutIndexTitle: "Les fondements de notre identité institutionnelle.",
    aboutHeritageCard: "L'engagement du Révérend Père Karl Lévêque et ses fondements.",
    aboutMissionCard: "La raison d'être de SKL et la société haïtienne qu'elle contribue à construire.",
    aboutDirectorCard: "Le message institutionnel du Révérend Père Gardy Maisonneuve.",
    aboutTeamCard: "Les responsables qui portent la gouvernance et les actions de SKL.",
    heritageHeroLead: "Une mémoire active au service des droits fondamentaux et de la démocratie en Haïti.",
    heritagePersonRole: "Prêtre jésuite, intellectuel et figure engagée contre la dictature.",
    heritageLineage: "Une filiation de justice",
    heritageCommitmentTitle: "Un nom qui engage l'organisation.",
    heritageClosing: "Son héritage oriente une action indépendante, impartiale et ancrée dans les réalités vécues par les communautés haïtiennes.",
    missionHeroTitle: "Transformer la défense des droits en progrès collectif.",
    missionHeroLead: "Deux repères complémentaires pour guider chaque intervention de SKL.",
    strategicEyebrow: "Objectifs stratégiques",
    strategicTitle: "Six engagements qui structurent l'action de SKL.",
    strategic1: "Promouvoir et protéger les droits humains.",
    strategic2: "Renforcer les capacités des communautés locales.",
    strategic3: "Soutenir la protection et la réintégration des personnes retournées et réfugiées.",
    strategic4: "Contribuer à l'amélioration des conditions de vie des populations vulnérables.",
    strategic5: "Soutenir le développement communautaire.",
    strategic6: "Promouvoir l'engagement civique et la transformation sociale.",
    directorHeroLead: "Une parole institutionnelle sur l'engagement et la responsabilité de SKL.",
    teamLead: "Des responsables engagés au service de la mission institutionnelle de SKL.",
    areasLead: "Chaque domaine dispose d'une page dédiée présentant clairement les enjeux et l'approche de SKL.",
    contactTitle: "Entrer en relation avec SKL.",
    contactLead: "Pour les demandes institutionnelles, la documentation, les partenariats et l'engagement citoyen.",
    contactDirection: "Direction",
    contactSecretariat: "Secrétariat",
    supportTitle: "Renforcer une action haïtienne indépendante.",
    supportLead: "Votre implication contribue à la défense des droits, à l'accès à la justice et à l'accompagnement des communautés vulnérables.",
    supportActTitle: "Agir avec nous",
    supportActText: "Partenariat institutionnel, soutien matériel ou mise en réseau.",
    supportEyebrow: "S'impliquer",
    supportResponsibleTitle: "Construire un soutien responsable et transparent.",
    supportDonationNote: "La modalité de don en ligne sera activée après validation du canal financier officiel de SKL.",
    supportContactText: "Pour toute proposition de partenariat ou de soutien, contactez directement l'organisation. Les logos des bailleurs sont présentés à titre institutionnel, sans publier leurs coordonnées directes.",
    newsFilterLabel: "Filtrer les actualités",
    docsFilterLabel: "Filtrer les documents",
    searchPlaceholder: "SKL, droits humains, mission",
    navMainLabel: "Navigation principale",
    homeLabel: "Accueil SKL",
    openMenuLabel: "Ouvrir le menu principal",
    openAboutLabel: "Ouvrir le sous-menu Qui nous sommes",
    openAreasLabel: "Ouvrir le sous-menu Domaines d'intervention",
    languageLabel: "Langue",
    publishSoon: "À publier"
  },
  ht: {
    skip: "Ale nan kontni an",
    tagline: "Ini pou defann, angaje pou chanje",
    docCenter: "Sant dokimantasyon",
    navWho: "Kiyès nou ye",
    navHeritage: "Eritaj nou",
    navMission: "Misyon ak vizyon",
    navDirector: "Pawòl Direktè a",
    navTeam: "Ekip",
    navAreas: "Domèn entèvansyon",
    navActions: "Aksyon ak reyalizasyon",
    navNews: "Aktyalite ak piblikasyon",
    navContact: "Kontak ak patisipasyon",
    donate: "Soutni SKL",
    areaRights: "Dwa moun",
    areaJustice: "Aksè ak lajistis",
    areaChildren: "Pwoteksyon timoun",
    areaMigration: "Migrasyon ak moun deplase",
    areaHealth: "Sante kominotè",
    heroEyebrow: "Òganizasyon ayisyen pou dwa moun",
    heroTitle: "Sant Karl Lévêque defann diyite, jistis ak Leta de dwa ann Ayiti.",
    heroLead: "Depi li fonde, SKL ankouraje, pwoteje epi defann dwa moun, sipòte viktim yo epi akonpaye kominote ki pi frajil yo.",
    heroPhotoAlt: "Mobilizasyon sitwayen nan yon kominote ayisyen",
    discover: "Dekouvri aksyon nou yo",
    readReports: "Li rapò yo",
    impactLegacy: "Eritaj Reveran Pè Karl Lévêque",
    impactAreas: "Domèn entèvansyon priyoritè yo",
    impactNetworks: "Rezo nasyonal patnè",
    impactReach: "Prezans ankre nan kominote yo",
    valuesEyebrow: "Pwen referans nou yo",
    valuesTitle: "Yon prezans endepandan, san patipri, ki chita sou reyalite lokal yo.",
    value1Title: "Defans dwa yo",
    value1Text: "Pwomosyon ak pwoteksyon dwa fondamantal, dokimantasyon ak pledwaye pou popilasyon vilnerab yo.",
    value2Title: "Aksè ak lajistis",
    value2Text: "Asistans pou viktim, apui legal ak siveyans kote detansyon yo.",
    value3Title: "Angajman sitwayen",
    value3Text: "Fòmasyon, edikasyon sivik ak devlopman yon nouvo jenerasyon lidè.",
    areasEyebrow: "Domèn entèvansyon",
    areasTitle: "Priyorite imanitè ak sitwayen pou pwoteksyon moun.",
    directorEyebrow: "Pawòl Direktè Egzekitif la",
    directorQuote: "Enspire pa eritaj Reveran Pè Karl Lévêque, òganizasyon nou an travay ak endepandans, pwofesyonalis ak devouman pou kominote ki pi vilnerab yo.",
    readMessage: "Li mesaj la antye",
    newsEyebrow: "Aktyalite",
    newsTitle: "Aksyon teren ak pledwaye",
    allNews: "Tout aktyalite yo",
    partnersEyebrow: "Rezo ak patnè",
    partnersTitle: "SKL kontribye nan ranfòsman mouvman ayisyen pou dwa moun.",
    donors: "Patnè finansye enstitisyonèl",
    footerText: "Òganizasyon ayisyen ki angaje pou dwa moun, jistis sosyal ak Leta de dwa.",
    execDirector: "Direktè Egzekitif",
    secretary: "Sekretè Jeneral",
    aboutEyebrow: "Kiyès nou ye",
    aboutTitle: "Yon òganizasyon istorik nan sosyete sivil ayisyen an.",
    aboutLead: "SKL dedye a defans ak pwomosyon dwa moun, demokrasi, jistis sosyal ak Leta de dwa.",
    heritageEyebrow: "Eritaj nou",
    heritageTitle: "Pote angajman Reveran Pè Karl Lévêque.",
    heritageText: "Òganizasyon an pote non Reveran Pè Karl Lévêque (1937-1986), yon pè jezuit ak entelektyèl ki te angaje anpil nan defans dwa fondamantal ak batay kont diktati. Non sa a montre angajman SKL pou kontinye eritaj jistis, demokrasi ak angajman sosyal li.",
    missionLabel: "Misyon",
    missionText: "Ankouraje, pwoteje epi defann dwa moun, ranfòse Leta de dwa, sipòte viktim yo epi kontribye nan bati yon sosyete ki pi jis ak ekitab.",
    visionLabel: "Vizyon",
    visionText: "Yon Ayiti kote chak moun jwi dwa li yo ak diyite, jistis ak lapè.",
    directorHeading: "Endepandans, pwofesyonalis ak devouman.",
    directorLong: "Depi li fonde, SANT KARL LÉVÊQUE (SKL) angaje nan pwomosyon, pwoteksyon ak defans dwa moun ann Ayiti. Enspire pa eritaj Reveran Pè Karl Lévêque, òganizasyon an travay ak endepandans, pwofesyonalis ak devouman pou kominote ki pi vilnerab yo ak tout enstitisyon ki angaje pou diyite moun, jistis ak Leta de dwa.",
    teamEyebrow: "Ekip referans",
    teamTitle: "Yon gouvènans ki klè epi aksesib.",
    newsPageTitle: "Aksyon, reyalizasyon ak pledwaye sou teren.",
    newsPageLead: "Swiv inisyativ SKL pou aksè ak lajistis, pwoteksyon ak apui pou kominote ki afekte yo.",
    filterAll: "Tout",
    filterField: "Teren",
    filterAdvocacy: "Pledwaye",
    filterNetwork: "Rezo",
    galleryEyebrow: "Galeri teren",
    galleryTitle: "Mobilizasyon kominotè a an imaj.",
    docsEyebrow: "Sant dokimantasyon",
    docsTitle: "Rapò, nòt pledwaye ak resous enstitisyonèl.",
    docsLead: "Yon espas pou filtre, konsilte ak telechaje dokiman ofisyèl SKL yo.",
    searchDocs: "Chèche",
    filterInstitutional: "Enstitisyonèl",
    filterReports: "Rapò",
    download: "Telechaje",
    compassLabel: "Bousòl valè SKL yo",
    compassJustice: "Jistis",
    compassDignity: "Diyite",
    compassPeace: "Lapè",
    compassParticipation: "Patisipasyon",
    impactLabel: "Pwen referans enstitisyonèl",
    countryName: "Ayiti",
    portraitAlt: "Pòtrè Reveran Pè Gardy Maisonneuve",
    gardyName: "Reveran Pè Gardy Maisonneuve",
    karlName: "Reveran Pè Karl Lévêque",
    aboutIndexEyebrow: "Dekouvri SKL",
    aboutIndexTitle: "Fondasyon idantite enstitisyonèl nou an.",
    aboutHeritageCard: "Angajman Reveran Pè Karl Lévêque ak fondasyon li yo.",
    aboutMissionCard: "Rezon ki fè SKL egziste ak sosyete ayisyen li ede konstwi a.",
    aboutDirectorCard: "Mesaj enstitisyonèl Reveran Pè Gardy Maisonneuve.",
    aboutTeamCard: "Responsab ki pote gouvènans ak aksyon SKL yo.",
    heritageHeroLead: "Yon memwa vivan nan sèvis dwa fondamantal ak demokrasi ann Ayiti.",
    heritagePersonRole: "Pè jezuit, entelektyèl ak pèsonalite ki te angaje kont diktati.",
    heritageLineage: "Yon eritaj jistis",
    heritageCommitmentTitle: "Yon non ki angaje òganizasyon an.",
    heritageClosing: "Eritaj li gide yon aksyon endepandan, san patipri epi ki chita sou reyalite kominote ayisyen yo.",
    missionHeroTitle: "Transfòme defans dwa moun an pwogrè kolektif.",
    missionHeroLead: "De pwen referans ki mache ansanm pou gide chak entèvansyon SKL.",
    strategicEyebrow: "Objektif estratejik",
    strategicTitle: "Sis angajman ki òganize aksyon SKL.",
    strategic1: "Ankouraje epi pwoteje dwa moun.",
    strategic2: "Ranfòse kapasite kominote lokal yo.",
    strategic3: "Sipòte pwoteksyon ak reyentegrasyon moun ki retounen ak refijye yo.",
    strategic4: "Kontribye nan amelyore kondisyon lavi popilasyon vilnerab yo.",
    strategic5: "Sipòte devlopman kominotè.",
    strategic6: "Ankouraje angajman sivik ak transfòmasyon sosyal.",
    directorHeroLead: "Yon pawòl enstitisyonèl sou angajman ak responsablite SKL.",
    teamLead: "Responsab ki angaje nan sèvis misyon enstitisyonèl SKL.",
    areasLead: "Chak domèn gen yon paj apa ki prezante klèman pwoblèm yo ak apwòch SKL.",
    contactTitle: "Antre an kontak ak SKL.",
    contactLead: "Pou demann enstitisyonèl, dokimantasyon, patenarya ak angajman sitwayen.",
    contactDirection: "Direksyon",
    contactSecretariat: "Sekretarya",
    supportTitle: "Ranfòse yon aksyon ayisyen endepandan.",
    supportLead: "Patisipasyon ou kontribye nan defans dwa moun, aksè ak lajistis ak akonpayman kominote vilnerab yo.",
    supportActTitle: "Aji avèk nou",
    supportActText: "Patenarya enstitisyonèl, sipò materyèl oswa mete an rezo.",
    supportEyebrow: "Patisipe",
    supportResponsibleTitle: "Konstwi yon sipò responsab ak transparan.",
    supportDonationNote: "Don sou entènèt ap aktive apre validasyon kanal finansye ofisyèl SKL la.",
    supportContactText: "Pou nenpòt pwopozisyon patenarya oswa sipò, kontakte òganizasyon an dirèkteman. Logo patnè finansye yo prezante pou rezon enstitisyonèl san yo pa pibliye kontak dirèk yo.",
    newsFilterLabel: "Filtre aktyalite yo",
    docsFilterLabel: "Filtre dokiman yo",
    searchPlaceholder: "SKL, dwa moun, misyon",
    navMainLabel: "Navigasyon prensipal",
    homeLabel: "Akèy SKL",
    openMenuLabel: "Ouvri meni prensipal la",
    openAboutLabel: "Ouvri soumeni Kiyès nou ye a",
    openAreasLabel: "Ouvri soumeni Domèn entèvansyon an",
    languageLabel: "Lang",
    publishSoon: "Pou pibliye"
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
    areaChildren: "Child protection",
    areaMigration: "Migration and IDPs",
    areaHealth: "Community health",
    heroEyebrow: "Haitian human rights organization",
    heroTitle: "Sant Karl Lévêque defends dignity, justice and the rule of law in Haiti.",
    heroLead: "Since its establishment, SKL has promoted, protected and defended human rights, supported victims and served the most vulnerable communities.",
    heroPhotoAlt: "Civic mobilization in a Haitian community",
    discover: "Discover our work",
    readReports: "Read reports",
    impactLegacy: "Legacy of Rev. Father Karl Lévêque",
    impactAreas: "Priority areas of intervention",
    impactNetworks: "National partner networks",
    impactReach: "A presence rooted in communities",
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
    directorQuote: "Inspired by the legacy of Reverend Father Karl Lévêque, our organization works with independence, professionalism and dedication to serve the most vulnerable communities.",
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
    heritageTitle: "Carrying Reverend Father Karl Lévêque's commitment forward.",
    heritageText: "The organization is named after Reverend Father Karl Lévêque (1937-1986), a Jesuit priest and intellectual deeply committed to the defense of fundamental rights and the struggle against dictatorship. His name reflects SKL's commitment to carrying forward his legacy of justice, democracy and social engagement.",
    missionLabel: "Mission",
    missionText: "To promote, protect and defend human rights, strengthen the rule of law, support victims and contribute to a more just and equitable society.",
    visionLabel: "Vision",
    visionText: "A Haiti where every individual fully enjoys their rights in dignity, justice and peace.",
    directorHeading: "Independence, professionalism and dedication.",
    directorLong: "Since its establishment, SANT KARL LÉVÊQUE (SKL) has been committed to the promotion, protection and defense of human rights in Haiti. Inspired by the legacy of Reverend Father Karl Lévêque, our organization works with independence, professionalism and dedication to serve the most vulnerable communities and all institutions committed to human dignity, justice and the rule of law.",
    teamEyebrow: "Reference team",
    teamTitle: "Identifiable and accessible leadership.",
    newsPageTitle: "Actions, achievements and field advocacy.",
    newsPageLead: "Follow SKL initiatives for access to justice, protection and support for affected communities.",
    filterAll: "All",
    filterField: "Field",
    filterAdvocacy: "Advocacy",
    filterNetwork: "Networks",
    galleryEyebrow: "Field gallery",
    galleryTitle: "Community mobilization in pictures.",
    docsEyebrow: "Documentation center",
    docsTitle: "Reports, advocacy briefs and institutional resources.",
    docsLead: "A filterable space to consult and download official SKL documents.",
    searchDocs: "Search",
    filterInstitutional: "Institutional",
    filterReports: "Reports",
    download: "Download",
    compassLabel: "SKL values compass",
    compassJustice: "Justice",
    compassDignity: "Dignity",
    compassPeace: "Peace",
    compassParticipation: "Participation",
    impactLabel: "Institutional highlights",
    countryName: "Haiti",
    portraitAlt: "Portrait of Reverend Father Gardy Maisonneuve",
    gardyName: "Rev. Father Gardy Maisonneuve",
    karlName: "Rev. Father Karl Lévêque",
    aboutIndexEyebrow: "Discover SKL",
    aboutIndexTitle: "The foundations of our institutional identity.",
    aboutHeritageCard: "Reverend Father Karl Lévêque's commitment and its foundations.",
    aboutMissionCard: "SKL's purpose and the Haitian society it helps build.",
    aboutDirectorCard: "The institutional message of Reverend Father Gardy Maisonneuve.",
    aboutTeamCard: "The leaders who guide SKL's governance and work.",
    heritageHeroLead: "A living legacy serving fundamental rights and democracy in Haiti.",
    heritagePersonRole: "Jesuit priest, intellectual and committed opponent of dictatorship.",
    heritageLineage: "A legacy of justice",
    heritageCommitmentTitle: "A name that carries responsibility.",
    heritageClosing: "His legacy guides independent, impartial action grounded in the realities experienced by Haitian communities.",
    missionHeroTitle: "Turning the defense of rights into collective progress.",
    missionHeroLead: "Two complementary guideposts for every SKL intervention.",
    strategicEyebrow: "Strategic objectives",
    strategicTitle: "Six commitments that shape SKL's work.",
    strategic1: "Promote and protect human rights.",
    strategic2: "Strengthen the capacities of local communities.",
    strategic3: "Support the protection and reintegration of returnees and refugees.",
    strategic4: "Contribute to improving the living conditions of vulnerable populations.",
    strategic5: "Support community development.",
    strategic6: "Promote civic engagement and social transformation.",
    directorHeroLead: "An institutional message about SKL's commitment and responsibility.",
    teamLead: "Leaders committed to serving SKL's institutional mission.",
    areasLead: "Each area has a dedicated page clearly presenting its challenges and SKL's approach.",
    contactTitle: "Connect with SKL.",
    contactLead: "For institutional inquiries, documentation, partnerships and civic engagement.",
    contactDirection: "Executive office",
    contactSecretariat: "Secretariat",
    supportTitle: "Strengthen independent Haitian action.",
    supportLead: "Your involvement supports the defense of rights, access to justice and assistance to vulnerable communities.",
    supportActTitle: "Work with us",
    supportActText: "Institutional partnership, material support or network connections.",
    supportEyebrow: "Get involved",
    supportResponsibleTitle: "Build responsible and transparent support.",
    supportDonationNote: "Online giving will be activated after SKL's official financial channel has been approved.",
    supportContactText: "For partnership or support proposals, contact the organization directly. Donor logos are displayed for institutional purposes without publishing their direct contact details.",
    newsFilterLabel: "Filter news",
    docsFilterLabel: "Filter documents",
    searchPlaceholder: "SKL, human rights, mission",
    navMainLabel: "Main navigation",
    homeLabel: "SKL home",
    openMenuLabel: "Open main menu",
    openAboutLabel: "Open Who we are submenu",
    openAreasLabel: "Open Areas of intervention submenu",
    languageLabel: "Language",
    publishSoon: "Coming soon"
  }
};

function renderSiteShell() {
  const base = document.body.dataset.base || "";
  const section = document.body.dataset.section || document.body.dataset.page || "home";
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
          <img src="${path("assets/skl-logo.png")}" alt="Logo Sant Karl Lévêque SKL">
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
              <a href="${path("pages/heritage.html")}" data-i18n="navHeritage">Notre héritage</a>
              <a href="${path("pages/mission-vision.html")}" data-i18n="navMission">Mission et vision</a>
              <a href="${path("pages/directeur.html")}" data-i18n="navDirector">Mot du Directeur</a>
              <a href="${path("pages/equipe.html")}" data-i18n="navTeam">Équipe</a>
            </div>
          </li>
          <li class="has-menu${section === "areas" ? " is-current" : ""}">
            <div class="nav-item-row">
              <a href="${path("pages/interventions.html")}" data-i18n="navAreas"${active("areas")}>Nos domaines d'intervention</a>
              <button class="submenu-toggle" type="button" aria-expanded="false" aria-controls="areas-menu" aria-label="Ouvrir le sous-menu Domaines d'intervention" data-i18n-aria-label="openAreasLabel"><span aria-hidden="true"></span></button>
            </div>
            <div class="mega-menu mega-menu-wide" id="areas-menu">
              <a href="${path("pages/droits-humains.html")}" data-i18n="areaRights">Droits humains</a>
              <a href="${path("pages/acces-justice.html")}" data-i18n="areaJustice">Accès à la justice</a>
              <a href="${path("pages/protection-enfance.html")}" data-i18n="areaChildren">Protection de l'enfance</a>
              <a href="${path("pages/migration-deplaces.html")}" data-i18n="areaMigration">Migration et déplacés</a>
              <a href="${path("pages/sante-communautaire.html")}" data-i18n="areaHealth">Santé communautaire</a>
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
      <div><h2>Sant Karl Lévêque (SKL)</h2><p data-i18n="footerText">Organisation haïtienne engagée pour les droits humains, la justice sociale et l'État de droit.</p></div>
      <address><strong data-i18n="gardyName">Rév. Père Gardy Maisonneuve</strong><br><span data-i18n="execDirector">Directeur Exécutif</span><br><a href="tel:+50947051133">+509 4705-1133</a><br><a href="mailto:reverendperegmaisonneuve@gmail.com">reverendperegmaisonneuve@gmail.com</a></address>
      <address><strong>Sébastien Estinvil</strong><br><span data-i18n="secretary">Secrétaire Général</span><br><a href="tel:+50936827431">+509 3682-7431</a><br><a href="mailto:estinviljnbsebastien@gmail.com">estinviljnbsebastien@gmail.com</a></address>`;
  }
}

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
  ["PE", "areaChildren", {
    fr: "Protection des enfants et des groupes vulnérables.",
    ht: "Pwoteksyon timoun ak gwoup vilnerab yo.",
    en: "Protection of children and vulnerable groups."
  }],
  ["MD", "areaMigration", {
    fr: "Protection des migrants, retournés, réfugiés et personnes déplacées.",
    ht: "Pwoteksyon migran, moun ki retounen, refijye ak moun deplase.",
    en: "Protection of migrants, returnees, refugees and internally displaced persons."
  }],
  ["SC", "areaHealth", {
    fr: "Santé communautaire, eau potable, assainissement et assistance humanitaire.",
    ht: "Sante kominotè, dlo potab, asenisman ak asistans imanitè.",
    en: "Community health, safe water, sanitation and humanitarian assistance."
  }]
];

const areaSlugs = [
  "droits-humains.html",
  "acces-justice.html",
  "protection-enfance.html",
  "migration-deplaces.html",
  "sante-communautaire.html"
];

const areaDetails = [
  {
    fr: ["Documenter les violations et porter la voix des personnes affectées.", "Former les communautés à la connaissance et à l'exercice de leurs droits.", "Produire des rapports, notes et actions de plaidoyer."],
    ht: ["Dokimante vyolasyon yo epi pote vwa moun ki afekte yo.", "Fòme kominote yo pou yo konnen epi egzèse dwa yo.", "Pwodui rapò, nòt ak aksyon pledwaye."],
    en: ["Document violations and amplify the voices of affected people.", "Train communities to understand and exercise their rights.", "Produce reports, briefs and advocacy initiatives."]
  },
  {
    fr: ["Accompagner juridiquement les victimes et les communautés.", "Suivre les prisons et les lieux de détention.", "Plaider pour des institutions judiciaires accessibles et responsables."],
    ht: ["Akonpaye viktim ak kominote yo sou plan legal.", "Siveye prizon ak kote detansyon yo.", "Plede pou enstitisyon jistis ki aksesib epi responsab."],
    en: ["Provide legal support to victims and communities.", "Monitor prisons and detention facilities.", "Advocate for accessible and accountable justice institutions."]
  },
  {
    fr: ["Prévenir les violences et les atteintes aux droits des enfants.", "Accompagner les enfants et les groupes particulièrement vulnérables.", "Promouvoir des environnements communautaires protecteurs."],
    ht: ["Prevni vyolans ak vyolasyon dwa timoun yo.", "Akonpaye timoun ak gwoup ki pi vilnerab yo.", "Ankouraje anviwonman kominote ki pwoteje timoun."],
    en: ["Prevent violence and violations of children's rights.", "Support children and particularly vulnerable groups.", "Promote protective community environments."]
  },
  {
    fr: ["Protéger les migrants, retournés, réfugiés et déplacés internes.", "Documenter les risques liés au déplacement et à la traite.", "Coordonner les réponses avec les réseaux spécialisés."],
    ht: ["Pwoteje migran, moun ki retounen, refijye ak moun deplase yo.", "Dokimante risk ki lye ak deplasman ak trafik moun.", "Kowodone repons yo ak rezo espesyalize yo."],
    en: ["Protect migrants, returnees, refugees and internally displaced people.", "Document risks linked to displacement and trafficking.", "Coordinate responses with specialized networks."]
  },
  {
    fr: ["Améliorer l'accès à l'eau potable et à l'assainissement.", "Soutenir les initiatives de santé communautaire.", "Apporter une assistance humanitaire adaptée aux besoins locaux."],
    ht: ["Amelyore aksè ak dlo potab ak asenisman.", "Sipòte inisyativ sante kominotè yo.", "Pote asistans imanitè ki adapte ak bezwen lokal yo."],
    en: ["Improve access to safe water and sanitation.", "Support community health initiatives.", "Deliver humanitarian assistance adapted to local needs."]
  }
];

const news = [
  {
    category: "field",
    date: "2025",
    title: { fr: "Initiative Retour dans les quartiers à Nazon", ht: "Inisyativ Retounen nan katye yo nan Nazon", en: "Return to the Neighborhoods initiative in Nazon" },
    text: { fr: "SKL a mis en œuvre une initiative de terrain pour accompagner les familles et soutenir la reprise communautaire.", ht: "SKL mete ann aplikasyon yon inisyativ teren pou akonpaye fanmi yo epi soutni relans kominote a.", en: "SKL implemented a field initiative to accompany families and support community recovery." }
  },
  {
    category: "advocacy",
    date: "Tabarre",
    title: { fr: "Appui aux résidents menacés de démolition", ht: "Apui pou rezidan ki menase ak demolisyon", en: "Support for residents affected by demolition measures" },
    text: { fr: "Assistance juridique et plaidoyer pour les résidents de Tabarre affectés par des mesures de démolition près de l'Ambassade des États-Unis.", ht: "Asistans legal ak pledwaye pou rezidan Taba ki afekte pa mezi demolisyon pre Anbasad Etazini.", en: "Legal assistance and advocacy for Tabarre residents affected by demolition measures near the U.S. Embassy." }
  },
  {
    category: "network",
    date: { fr: "Réseaux", ht: "Rezo", en: "Networks" },
    title: { fr: "Contribution aux plateformes POHDH, GARR et ECC", ht: "Kontribisyon nan platfòm POHDH, GARR ak ECC", en: "Contribution to POHDH, GARR and ECC networks" },
    text: { fr: "SKL contribue au développement et au renforcement du mouvement haïtien des droits humains.", ht: "SKL kontribye nan devlopman ak ranfòsman mouvman ayisyen pou dwa moun.", en: "SKL contributes to the development and strengthening of Haiti's human rights movement." }
  },
  {
    category: "advocacy",
    date: { fr: "Justice", ht: "Jistis", en: "Justice" },
    title: { fr: "Suivi des prisons et lieux de détention", ht: "Siveyans prizon ak kote detansyon", en: "Monitoring prisons and detention facilities" },
    text: { fr: "Missions de monitoring et plaidoyer pour les personnes privées de liberté.", ht: "Misyon siveyans ak pledwaye pou moun ki prive libète yo.", en: "Monitoring missions and advocacy for persons deprived of liberty." }
  },
  {
    category: "field",
    date: { fr: "Eau", ht: "Dlo", en: "Water" },
    title: { fr: "Programmes communautaires eau et assainissement", ht: "Pwogram kominotè dlo ak asenisman", en: "Community water and sanitation programs" },
    text: { fr: "Programmes communautaires pour améliorer l'accès à l'eau potable et à l'assainissement.", ht: "Pwogram kominotè pou amelyore aksè ak dlo potab ak asenisman.", en: "Community-based programs to improve access to safe drinking water and sanitation." }
  }
];

const documents = [
  {
    type: "institutional",
    year: "2026",
    file: "assets/docs/brochure-officielle-skl.pdf",
    title: { fr: "Brochure officielle SKL", ht: "Brochi ofisyel SKL", en: "Official SKL brochure" },
    text: { fr: "Mission, vision, domaines d'intervention, priorités et contacts institutionnels.", ht: "Misyon, vizyon, domèn entèvansyon, priyorite ak kontak enstitisyonèl.", en: "Mission, vision, areas of intervention, priorities and institutional contacts." }
  },
  {
    type: "institutional",
    year: "2026",
    file: "assets/docs/fact-sheet-skl.pdf",
    title: { fr: "Fiche institutionnelle - Qui nous sommes", ht: "Fèy enfòmasyon - Kiyès nou ye", en: "Fact sheet - Who we are" },
    text: { fr: "Présentation de l'héritage, du positionnement, des objectifs stratégiques et des réalisations.", ht: "Prezantasyon eritaj, pozisyon, objektif estratejik ak reyalizasyon yo.", en: "Overview of legacy, positioning, strategic objectives and achievements." }
  },
  {
    type: "advocacy",
    year: { fr: "À publier", ht: "Pou pibliye", en: "Coming soon" },
    file: "assets/docs/fact-sheet-skl.pdf",
    title: { fr: "Notes de plaidoyer", ht: "Nòt pledwaye", en: "Advocacy briefs" },
    text: { fr: "Espace prévu pour les notes sur les droits humains, l'accès à la justice et la protection.", ht: "Espas pou nòt sou dwa moun, aksè ak lajistis ak pwoteksyon.", en: "Space planned for briefs on human rights, access to justice and protection." }
  },
  {
    type: "report",
    year: { fr: "À publier", ht: "Pou pibliye", en: "Coming soon" },
    file: "assets/docs/brochure-officielle-skl.pdf",
    title: { fr: "Rapports annuels", ht: "Rapò anyèl", en: "Annual reports" },
    text: { fr: "Collection filtrable pour les rapports annuels et rapports thématiques de SKL.", ht: "Koleksyon pou filtre rapò anyèl ak rapò tematik SKL yo.", en: "Filterable collection for SKL annual and thematic reports." }
  }
];

const gallery = [
  {
    image: "assets/photos-4k/equipe-chantier-urbain.png",
    label: { fr: "Terrain", ht: "Teren", en: "Field work" },
    title: { fr: "Agir au plus près des communautés", ht: "Aji toupre kominote yo", en: "Working alongside communities" },
    text: { fr: "Une mobilisation collective au service d'un environnement plus sûr et plus digne.", ht: "Yon mobilizasyon kolektif pou yon anviwonman ki pi an sekirite epi ki gen plis diyite.", en: "Collective action for a safer and more dignified environment." },
    alt: { fr: "Équipe communautaire mobilisée sur un chantier urbain", ht: "Ekip kominotè mobilize sou yon chantye nan vil", en: "Community team mobilized on an urban worksite" }
  },
  {
    image: "assets/photos-4k/nettoyage-rue-tropicale.png",
    label: { fr: "Participation", ht: "Patisipasyon", en: "Participation" },
    title: { fr: "Transformer l'espace commun", ht: "Transfòme espas kominotè a", en: "Transforming shared spaces" },
    text: { fr: "Des citoyennes et citoyens réunis autour d'une action concrète de proximité.", ht: "Sitwayèn ak sitwayen reyini pou yon aksyon konkrè nan katye a.", en: "Residents united around practical neighborhood action." },
    alt: { fr: "Volontaires nettoyant une rue dans un quartier haïtien", ht: "Volontè k ap netwaye yon lari nan yon katye ayisyen", en: "Volunteers cleaning a street in a Haitian neighborhood" }
  },
  {
    image: "assets/photos-4k/operation-nettoyage-soleil.png",
    label: { fr: "Coordination", ht: "Kowòdinasyon", en: "Coordination" },
    title: { fr: "Coordonner les forces locales", ht: "Kowòdone fòs lokal yo", en: "Coordinating local efforts" },
    text: { fr: "Communautés et acteurs locaux coordonnent leurs efforts pour répondre aux besoins du terrain.", ht: "Kominote ak aktè lokal yo mete efò yo ansanm pou reponn ak bezwen teren an.", en: "Communities and local stakeholders coordinate their efforts to address needs on the ground." },
    alt: { fr: "Opération communautaire coordonnée avec des acteurs locaux", ht: "Operasyon kominotè ki kowòdone ak aktè lokal yo", en: "Community operation coordinated with local stakeholders" }
  }
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
    support: `${t("donate")} - SKL`
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
    support: "supportLead"
  };
  document.title = page === "area" && area ? `${t(area[1])} - SKL` : titleByPage[page] || "Sant Karl Lévêque - SKL";
  const description = page === "area" && area ? localize(area[2]) : t(descriptionKeyByPage[page]);
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
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
  target.innerHTML = gallery.map((item) => `
    <article class="gallery-card">
      <div class="gallery-thumb">
        <img src="${base}${item.image}" alt="${localize(item.alt)}" loading="lazy" decoding="async">
        <span class="tag">${localize(item.label)}</span>
      </div>
      <h3>${localize(item.title)}</h3>
      <p>${localize(item.text)}</p>
    </article>
  `).join("");
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
  });
  target.innerHTML = filtered.map((doc) => `
    <article class="doc-card">
      <div>
        <span class="doc-type">${localize(doc.year)} - ${t(doc.type === "institutional" ? "filterInstitutional" : doc.type === "advocacy" ? "filterAdvocacy" : "filterReports")}</span>
        <h3>${localize(doc.title)}</h3>
        <p class="doc-meta">${localize(doc.text)}</p>
      </div>
      <a class="btn btn-secondary" href="${document.body.dataset.base || ""}${doc.file}" download>${t("download")}</a>
    </article>
  `).join("");
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

  const page = document.body.dataset.page;
  const activeHref = page === "home" ? "index.html" : page === "about" ? "about.html" : page === "news" ? "news.html" : "documentation.html";
  document.querySelectorAll(".nav-menu > li > a").forEach((link) => {
    if (link.getAttribute("href") === activeHref) link.setAttribute("aria-current", "page");
  });

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
});
