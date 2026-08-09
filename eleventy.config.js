function textValue(value) {
  return String(value ?? "");
}

function fragmentSlug(value) {
  return textValue(value)
    .toLowerCase()
    .replace(/ё/g, "е")
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function plainHeading(value) {
  return textValue(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });

  eleventyConfig.addFilter("materialSections", (items = []) => {
    const sections = new Map();

    for (const item of items) {
      const name = textValue(item.data.section || "Без раздела");
      if (!sections.has(name)) {
        sections.set(name, {
          name,
          id: `section-${fragmentSlug(name)}`,
          items: []
        });
      }
      sections.get(name).items.push(item);
    }

    return [...sections.values()].sort((first, second) =>
      first.name.localeCompare(second.name, "ru")
    );
  });

  eleventyConfig.addFilter("materialTags", (items = []) =>
    [...new Set(items.flatMap((item) => item.data.tags || []))].sort((first, second) =>
      textValue(first).localeCompare(textValue(second), "ru")
    )
  );

  eleventyConfig.addFilter("calendarView", (items = []) => {
    const sorted = [...items].sort((first, second) =>
      textValue(second.data.start_date).localeCompare(textValue(first.data.start_date))
    );
    const groups = new Map();

    for (const item of sorted) {
      const year = textValue(item.data.start_date).slice(0, 4);
      if (!groups.has(year)) {
        groups.set(year, []);
      }
      groups.get(year).push(item);
    }

    return {
      groups: [...groups.entries()].map(([year, entries]) => ({ year, entries }))
    };
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    const source = textValue(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source)) {
      return source;
    }
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(new Date(`${source}T00:00:00Z`));
  });

  eleventyConfig.addFilter("eventContent", (html = "") => {
    const usedIds = new Map();
    const headings = [];
    const rendered = textValue(html).replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
      (match, attributes, innerHtml) => {
        const title = plainHeading(innerHtml);
        const baseId = fragmentSlug(title);
        const count = (usedIds.get(baseId) || 0) + 1;
        usedIds.set(baseId, count);
        const id = count === 1 ? baseId : `${baseId}-${count}`;
        headings.push({ id, title });
        return `<h2${attributes} id="${id}">${innerHtml}</h2>`;
      }
    );

    return { html: rendered, headings };
  });

  eleventyConfig.addFilter("homeContent", (html = "") => {
    const usedIds = new Map();

    const rendered = textValue(html).replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
      (match, attributes, innerHtml) => {
        const title = plainHeading(innerHtml);
        const baseId = fragmentSlug(title);
        const count = (usedIds.get(baseId) || 0) + 1;
        usedIds.set(baseId, count);
        const id = count === 1 ? baseId : `${baseId}-${count}`;
        return `<h2${attributes} id="${id}"><a class="section-anchor" href="#${id}">${innerHtml}</a></h2>`;
      }
    );

    return rendered.replace(
      /<a([^>]*)>(Регистрация[^<]*)<\/a>/g,
      '<a class="registration-action"$1>$2</a>'
    );
  });

  eleventyConfig.addFilter("eventNeighbors", (items = [], currentUrl = "") => {
    const index = items.findIndex((item) => item.url === currentUrl);
    if (index < 0) {
      return {};
    }
    return {
      newer: index > 0 ? items[index - 1] : null,
      older: index < items.length - 1 ? items[index + 1] : null
    };
  });

  eleventyConfig.addFilter("reverseCopy", (items = []) => [...items].reverse());

  eleventyConfig.addFilter("tail", (items = []) => items.slice(1));

  eleventyConfig.addCollection("programs", (collectionApi) =>
    collectionApi.getFilteredByGlob("./content/programs/*.md")
  );

  eleventyConfig.addCollection("materials", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./content/materials/*.md")
      .sort((first, second) =>
        textValue(first.data.title).localeCompare(textValue(second.data.title), "ru")
      )
  );

  eleventyConfig.addCollection("events", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./content/events/*.md")
      .sort((first, second) =>
        textValue(second.data.start_date).localeCompare(textValue(first.data.start_date))
      )
  );

  eleventyConfig.addCollection("olympiads", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./content/olympiads/*.md")
      .sort((first, second) =>
        textValue(first.data.title).localeCompare(textValue(second.data.title), "ru")
      )
  );

  return {
    dir: {
      input: "content",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
