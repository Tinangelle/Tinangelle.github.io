(function initDevlogListPage() {
  const defaultLocaleAttr = document.body?.getAttribute("data-default-locale");
  const hasPinnedDefault = !!defaultLocaleAttr;
  const defaultLocale = defaultLocaleAttr || "zh";
  const DEVLOG_ENTRIES = [
    {
      id: "devlog2",
      titleKey: "devlog2Title",
      dateKey: "devlog2Date",
      excerptKey: "devlog2Excerpt",
      links: {
        en: "devlog-02-en.html",
        zh: "devlog-02-zh.html",
        fr: "devlog-02-fr.html",
      },
    },
    {
      id: "devlog1",
      titleKey: "devlog1Title",
      dateKey: "devlog1Date",
      excerptKey: "devlog1Excerpt",
      links: {
        en: "devlog-01-en.html",
        zh: "devlog-01-zh.html",
        fr: "devlog-01-fr.html",
      },
    },
  ];

  const timelineList = document.getElementById("devlogTimelineList");
  const contentList = document.getElementById("devlogContentList");

  function getLocalePack(localeId) {
    const loc = localeId === "en" || localeId === "fr" ? localeId : "zh";
    return {
      loc,
      pack: (window.SiteI18n.STRINGS && window.SiteI18n.STRINGS[loc]) || {},
    };
  }

  function buildTimelineItem(entry, loc, pack) {
    const li = document.createElement("li");
    li.className = "devlog-timeline__item";

    const date = document.createElement("time");
    date.className = "devlog-timeline__date";
    date.textContent = pack[entry.dateKey] || "";

    const link = document.createElement("a");
    link.className = "devlog-timeline__link";
    link.href = entry.links[loc] || entry.links.zh;
    link.textContent = pack[entry.titleKey] || "";

    li.append(date, link);
    return li;
  }

  function buildContentItem(entry, loc, pack) {
    const article = document.createElement("article");
    article.className = "devlog-entry";

    const date = document.createElement("time");
    date.className = "devlog-entry__date";
    date.textContent = pack[entry.dateKey] || "";

    const h3 = document.createElement("h3");
    h3.className = "devlog-entry__title";
    const titleLink = document.createElement("a");
    titleLink.className = "devlog-entry__title-link";
    titleLink.href = entry.links[loc] || entry.links.zh;
    titleLink.textContent = pack[entry.titleKey] || "";
    h3.appendChild(titleLink);

    const excerpt = document.createElement("p");
    excerpt.className = "devlog-entry__excerpt";
    excerpt.textContent = pack[entry.excerptKey] || "";

    article.append(date, h3, excerpt);
    return article;
  }

  function renderDevlogEntries(localeId) {
    if (!timelineList || !contentList) return;
    const { loc, pack } = getLocalePack(localeId);
    timelineList.innerHTML = "";
    contentList.innerHTML = "";
    DEVLOG_ENTRIES.forEach((entry) => {
      timelineList.appendChild(buildTimelineItem(entry, loc, pack));
      contentList.appendChild(buildContentItem(entry, loc, pack));
    });
  }

  window.SiteI18n.initLocaleUI();
  const initialLocale = hasPinnedDefault
    ? window.SiteI18n.applyLocale(defaultLocale)
    : window.SiteI18n.getStoredLocale();
  renderDevlogEntries(initialLocale);

  document.getElementById("localeBtnEn")?.addEventListener("click", function () {
    renderDevlogEntries("en");
  });
  document.getElementById("localeBtnZh")?.addEventListener("click", function () {
    renderDevlogEntries("zh");
  });
  document.getElementById("localeBtnFr")?.addEventListener("click", function () {
    renderDevlogEntries("fr");
  });
})();
