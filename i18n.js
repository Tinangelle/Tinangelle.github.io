(function () {
  const LOCALE_KEY = "iss-site-locale";
  const URL_LANG_KEY = "lang";
  const STUDIO_LOG_EN = "devlog.html?lang=en";
  const STUDIO_LOG_ZH = "devlog.html?lang=zh";
  const STUDIO_LOG_FR = "devlog.html?lang=fr";
  const PAGE_STRINGS = {
    index: {
      en: {},
      zh: {},
      fr: {},
    },
    devlog: {
      en: {},
      zh: {},
      fr: {},
    },
  };

  const STRINGS = {
    en: {
      brand: "IGNIS SOLARIS STUDIO",
      navProducts: "Our Products",
      navAbout: "About Us",
      navStudioLog: "Studio Field Notes",
      navContact: "Contact",
      aboutHeading: "About Us",
      projectsHeading: "Projects",
      heroSlogan: "Forging worlds from a single spark.",
      btnPressStart: "PRESS START",
      btnContactUs: "CONTACT US",
      aboutIntroBody: "Ignis Solaris Studio is an independent game development studio committed to crafting small yet beautiful game experiences.",
      aboutStudioTitle: "Our Studio",
      aboutStudioBody: "Ignis Solaris Studio is a one-person game development studio based in Toronto. While it is a solo journey, it is fueled by the selfless encouragement of family and friends, and driven by the passion to forge countless wonderful worlds from every humble spark of inspiration.",
      aboutMeTitle: "About Me",
      aboutMeBody: "I'm the founder of Ignis Solaris Studio—an indie studio grounded in psychology. Through narrative games, we offer gentle micro-healing for players facing universal loneliness and efficiency anxiety—small sanctuaries where you can feel unconditionally loved and cared for.",
      aboutAriaIntro: "Studio introduction",
      aboutAriaStudio: "Our Studio slide",
      aboutAriaMe: "About Me slide",
      aboutDotsAria: "Carousel slides",
      aboutDot1Aria: "Go to slide 1",
      aboutDot2Aria: "Go to slide 2",
      aboutDot3Aria: "Go to slide 3",
      projectWhaleTitle: "Let the Whale Breach",
      projectWhaleDesc: "A cozy, comforting pixel-art simulation game—a place to find calm, grow a community, and share gentle, uplifting bonds with nature and the townsfolk.",
      projectIslandTitle: "Take Care of Island",
      projectIslandDesc: "A turn-based strategy simulation game with procedurally generated organ maps and dynamic physiological crisis interventions based on real metabolic systems.",
      projectOutflowTitle: "OutFlow",
      projectOutflowDesc: "A lightweight long-form writing tool with a chat-based interface and local-first architecture.",
      projectViewDetails: "View Details",
      projectFollowProgress: "Follow Progress",
      projectOpenWebApp: "Open Web App",
      projectActionsAria: "Project actions",
      contactHeading: "Contact Me",
      contactTouchTitle: "Get In Touch",
      contactTouchBody: "For strategic partnerships, co-development, or investment discussions aligned with our projects and roadmap, please reach out. We welcome qualified inquiries and are happy to explore fit and next steps in a professional context.",
      contactSocialAria: "Social media",
      contactFormTitle: "Send Message",
      contactLeaveBlank: "Leave blank",
      contactNameLabel: "Name",
      contactNamePlaceholder: "Your name",
      contactEmailLabel: "Email",
      contactEmailPlaceholder: "you@example.com",
      contactMessageLabel: "Message",
      contactMessagePlaceholder: "Briefly describe your inquiry…",
      contactSendButton: "Send Message",
      devlogHeading: "Development Log",
      devlogIntro: "Studio progress notes, design iterations, and milestone snapshots from the long road of game development.",
      devlogTimelineTitle: "Timeline",
      devlog2Title: "Devlog #2: Welcome to the \"Birthplace\"",
      devlog2Date: "November 3, 2025",
      devlog2Excerpt: "We finished the multi-page character creator (PlayerSetup.tscn), including dynamic UI feedback and flavor questionnaires!",
      devlog1Title: "Devlog #1: Laying the Foundation",
      devlog1Date: "October 18, 2025",
      devlog1Excerpt: "Welcome to the very first devlog! In this post, we introduce the studio, our vision for a cozy sanctuary, and the foundations we've laid...",
      devlogFooter: "© 2025 Ignis Solaris Studio. All rights reserved.",
    },
    zh: {
      brand: "IGNIS SOLARIS STUDIO",
      navProducts: "我们的产品",
      navAbout: "关于我们",
      navStudioLog: "工作室手记",
      navContact: "联系我们",
      aboutHeading: "关于我们",
      projectsHeading: "项目作品",
      heroSlogan: "星星之火，锻造万千世界。",
      btnPressStart: "开始探索",
      btnContactUs: "联系我们",
      aboutIntroBody: "Ignis Solaris Studio是一家独立游戏开发工作室，立志于打造小而美的游戏体验。",
      aboutStudioTitle: "我们的工作室",
      aboutStudioBody: "Ignis Solaris Studio 是位于多伦多的一人独立游戏工作室。虽然这是一段独行之旅，但我始终得到家人与朋友无私的鼓励，并怀着热情，把每一束微小灵感都锻造成无数动人的世界。",
      aboutMeTitle: "关于我",
      aboutMeBody: "我是 Ignis Solaris Studio 的创始人，一名以心理学为底层视角的独立开发者。希望通过叙事游戏，为面对孤独与效率焦虑的玩家带来温和的“微疗愈”，打造一处可以被无条件理解与关怀的小小栖居地。",
      aboutAriaIntro: "工作室介绍",
      aboutAriaStudio: "我们的工作室幻灯片",
      aboutAriaMe: "关于我幻灯片",
      aboutDotsAria: "轮播分页",
      aboutDot1Aria: "前往第 1 页",
      aboutDot2Aria: "前往第 2 页",
      aboutDot3Aria: "前往第 3 页",
      projectWhaleTitle: "Let the Whale Breach",
      projectWhaleDesc: "一款舒适温馨的像素艺术模拟游戏。 在这里，你可以找到平静，建立社区，并与自然和镇民享受温和愉快的关系。",
      projectIslandTitle: "Take Care of Island",
      projectIslandDesc: "一款回合制策略模拟游戏，基于真实代谢系统，包含程序化生成的器官地图与动态生理危机干预机制。",
      projectOutflowTitle: "OutFlow",
      projectOutflowDesc: "一款轻量级长文本写作工具，采用对话式交互界面与本地优先架构。",
      projectViewDetails: "查看详情",
      projectFollowProgress: "关注进度",
      projectOpenWebApp: "打开 Web 应用",
      projectActionsAria: "项目操作",
      contactHeading: "联系我",
      contactTouchTitle: "取得联系",
      contactTouchBody: "如果你希望围绕项目方向开展战略合作、联合开发或投资洽谈，欢迎与我们联系。我们乐于在专业语境中沟通适配性与下一步合作可能。",
      contactSocialAria: "社交媒体",
      contactFormTitle: "发送消息",
      contactLeaveBlank: "请留空",
      contactNameLabel: "姓名",
      contactNamePlaceholder: "你的名字",
      contactEmailLabel: "邮箱",
      contactEmailPlaceholder: "you@example.com",
      contactMessageLabel: "留言",
      contactMessagePlaceholder: "请简要描述你的需求…",
      contactSendButton: "发送消息",
      devlogHeading: "开发日志",
      devlogIntro: "记录工作室在游戏开发长路上的进度节点、设计迭代与阶段性里程碑。",
      devlogTimelineTitle: "时间轴",
      devlog2Title: "开发日志 #2：欢迎来到“出生地”",
      devlog2Date: "2025年11月3日",
      devlog2Excerpt: "我们完成了多页捏人系统 (PlayerSetup.tscn)，包括动态 UI 反馈和风味问卷！",
      devlog1Title: "开发日志 #1：奠定基石",
      devlog1Date: "2025年10月18日",
      devlog1Excerpt: "欢迎阅读我们的第一篇开发日志！在这篇文章中，我们将介绍工作室、我们对舒适栖居地的愿景，以及目前已经打下的基础……",
      devlogFooter: "© 2025 Ignis Solaris Studio。保留所有权利。",
    },
    fr: {
      brand: "IGNIS SOLARIS STUDIO",
      navProducts: "Nos projets",
      navAbout: "A propos",
      navStudioLog: "Journal du studio",
      navContact: "Contact",
      aboutHeading: "A propos",
      projectsHeading: "Projets",
      heroSlogan: "Forger d'innombrables mondes a partir d'une etincelle.",
      btnPressStart: "COMMENCER",
      btnContactUs: "NOUS CONTACTER",
      aboutIntroBody: "Ignis Solaris Studio est un studio independant de developpement de jeux, determine a creer des experiences de jeu petites mais elegantes.",
      aboutStudioTitle: "Notre studio",
      aboutStudioBody: "Ignis Solaris Studio est un studio de developpement de jeux en solo base a Toronto. Bien que ce soit un parcours solitaire, il est porte par l'encouragement desinteresse de la famille et des amis, et anime par la passion de forger d'innombrables mondes merveilleux a partir de chaque humble etincelle d'inspiration.",
      aboutMeTitle: "A propos de moi",
      aboutMeBody: "Je suis la fondatrice d'Ignis Solaris Studio, un studio indie ancre dans la psychologie. A travers des jeux narratifs, nous proposons une micro-guerison douce aux joueurs confrontes a la solitude universelle et a l'anxiete de performance, de petits refuges ou vous pouvez vous sentir aime et soutenu sans condition.",
      aboutAriaIntro: "Introduction du studio",
      aboutAriaStudio: "Diapositive Notre studio",
      aboutAriaMe: "Diapositive A propos de moi",
      aboutDotsAria: "Diapositives du carrousel",
      aboutDot1Aria: "Aller a la diapositive 1",
      aboutDot2Aria: "Aller a la diapositive 2",
      aboutDot3Aria: "Aller a la diapositive 3",
      projectWhaleTitle: "Let the Whale Breach",
      projectWhaleDesc: "Un jeu de simulation cosy et reconfortant en pixel art. Ici, vous pouvez trouver le calme, construire une communaute et vivre des liens doux et agreables avec la nature et les habitants.",
      projectIslandTitle: "Take Care of Island",
      projectIslandDesc: "Un jeu de simulation strategique au tour par tour avec des cartes d'organes generees proceduralement et des interventions dynamiques de crises physiologiques basees sur de vrais systemes metaboliques.",
      projectOutflowTitle: "OutFlow",
      projectOutflowDesc: "Un outil leger d'ecriture longue, avec une interface conversationnelle et une architecture local-first.",
      projectViewDetails: "Voir les details",
      projectFollowProgress: "Suivre l'avancement",
      projectOpenWebApp: "Ouvrir l'app Web",
      projectActionsAria: "Actions du projet",
      contactHeading: "Contactez-moi",
      contactTouchTitle: "Entrons en contact",
      contactTouchBody: "Pour des partenariats strategiques, de la co-production ou des discussions d'investissement en lien avec nos projets et notre feuille de route, n'hesitez pas a nous contacter. Nous accueillons volontiers les demandes pertinentes et serons ravis d'explorer l'adequation et les prochaines etapes dans un cadre professionnel.",
      contactSocialAria: "Reseaux sociaux",
      contactFormTitle: "Envoyer un message",
      contactLeaveBlank: "Laisser vide",
      contactNameLabel: "Nom",
      contactNamePlaceholder: "Votre nom",
      contactEmailLabel: "E-mail",
      contactEmailPlaceholder: "vous@example.com",
      contactMessageLabel: "Message",
      contactMessagePlaceholder: "Decrivez brievement votre demande...",
      contactSendButton: "Envoyer le message",
      devlogHeading: "Journal de developpement",
      devlogIntro: "Notes d'avancement du studio, iterations de design et jalons sur le long parcours du developpement de jeux.",
      devlogTimelineTitle: "Chronologie",
      devlog2Title: "Devlog #2 : Bienvenue au \"Lieu de naissance\"",
      devlog2Date: "3 novembre 2025",
      devlog2Excerpt: "Nous avons termine le createur de personnage multi-pages (PlayerSetup.tscn), y compris les retours UI dynamiques et des questionnaires de style.",
      devlog1Title: "Devlog #1 : Poser les fondations",
      devlog1Date: "18 octobre 2025",
      devlog1Excerpt: "Bienvenue dans le tout premier devlog ! Dans cet article, nous presentons le studio, notre vision d'un refuge chaleureux, et les fondations deja posees...",
      devlogFooter: "© 2025 Ignis Solaris Studio. Tous droits reserves.",
    },
  };

  function normalizeLocale(localeId) {
    if (!localeId) return "zh";
    const normalized = String(localeId).trim().toLowerCase().replace(/_/g, "-");
    if (normalized === "en" || normalized.startsWith("en-")) return "en";
    if (normalized === "fr" || normalized.startsWith("fr-")) return "fr";
    if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
    return "zh";
  }

  function getLocaleFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (!params.has(URL_LANG_KEY)) return null;
      return normalizeLocale(params.get(URL_LANG_KEY));
    } catch (_) {
      return null;
    }
  }

  function getLocaleFromBrowser() {
    try {
      return normalizeLocale(navigator.language || navigator.userLanguage || "zh");
    } catch (_) {
      return "zh";
    }
  }

  function getCurrentPageId() {
    const raw = document.body?.getAttribute("data-page");
    return raw ? String(raw).trim() : "";
  }

  function getPagePack(localeId) {
    const pageId = getCurrentPageId();
    if (!pageId) return null;
    const page = PAGE_STRINGS[pageId];
    if (!page) return null;
    return page[localeId] || null;
  }

  function writeLocaleToUrl(localeId) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set(URL_LANG_KEY, localeId);
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (_) {}
  }

  function getStoredLocale() {
    try {
      return normalizeLocale(localStorage.getItem(LOCALE_KEY));
    } catch (_) {
      return "zh";
    }
  }

  function getStudioLogHref(localeId) {
    if (localeId === "en") return STUDIO_LOG_EN;
    if (localeId === "fr") return STUDIO_LOG_FR;
    return STUDIO_LOG_ZH;
  }

  function applyLocale(localeId) {
    const loc = normalizeLocale(localeId);
    const pack = Object.assign({}, STRINGS[loc] || {}, getPagePack(loc) || {});
    document.documentElement.lang = loc === "zh" ? "zh-CN" : loc === "fr" ? "fr" : "en";

    try {
      localStorage.setItem(LOCALE_KEY, loc);
    } catch (_) {}

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && pack[key] !== undefined) node.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria-label");
      if (key && pack[key] !== undefined) node.setAttribute("aria-label", pack[key]);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (key && pack[key] !== undefined) node.setAttribute("placeholder", pack[key]);
    });

    const studioLogNav = document.getElementById("navStudioLog");
    if (studioLogNav) {
      studioLogNav.href = getStudioLogHref(loc);
    }

    const btnEn = document.getElementById("localeBtnEn");
    const btnZh = document.getElementById("localeBtnZh");
    const btnFr = document.getElementById("localeBtnFr");
    if (btnEn) btnEn.classList.toggle("is-current", loc === "en");
    if (btnZh) btnZh.classList.toggle("is-current", loc === "zh");
    if (btnFr) btnFr.classList.toggle("is-current", loc === "fr");

    return loc;
  }

  function initLocaleUI() {
    const localeFromUrl = getLocaleFromUrl();
    const initialLocale = localeFromUrl || getStoredLocale() || getLocaleFromBrowser() || "zh";
    applyLocale(initialLocale);
    writeLocaleToUrl(normalizeLocale(initialLocale));

    document.getElementById("localeBtnEn")?.addEventListener("click", function (event) {
      event.preventDefault();
      const loc = applyLocale("en");
      writeLocaleToUrl(loc);
    });
    document.getElementById("localeBtnZh")?.addEventListener("click", function (event) {
      event.preventDefault();
      const loc = applyLocale("zh");
      writeLocaleToUrl(loc);
    });
    document.getElementById("localeBtnFr")?.addEventListener("click", function (event) {
      event.preventDefault();
      const loc = applyLocale("fr");
      writeLocaleToUrl(loc);
    });
  }

  window.SiteI18n = {
    LOCALE_KEY,
    STRINGS,
    applyLocale,
    getStoredLocale,
    getStudioLogHref,
    getCurrentPageId,
    initLocaleUI,
  };
})();
