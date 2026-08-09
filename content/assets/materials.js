(() => {
  const cards = Array.from(document.querySelectorAll("[data-material-card]"));
  const buttons = Array.from(document.querySelectorAll("[data-material-tag]"));

  if (!cards.length || !buttons.length) {
    return;
  }

  const sections = Array.from(document.querySelectorAll("[data-material-section]"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-material-section-link]"));
  const count = document.querySelector("[data-material-count]");
  const emptyMessage = document.querySelector("[data-material-empty]");
  const resetButton = document.querySelector("[data-material-reset]");
  const selectedTags = new Set();
  const normalize = (value) => value.trim().toLocaleLowerCase("ru");

  const updateCatalog = () => {
    let visibleCount = 0;

    for (const card of cards) {
      const cardTags = (card.dataset.materialTags || "")
        .split("||")
        .filter(Boolean)
        .map(normalize);
      const isVisible =
        selectedTags.size === 0 || cardTags.some((tag) => selectedTags.has(tag));

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    }

    for (const section of sections) {
      section.hidden = !section.querySelector("[data-material-card]:not([hidden])");
    }

    for (const item of sectionLinks) {
      const section = document.getElementById(item.dataset.materialSectionLink);
      item.hidden = !section || section.hidden;
    }

    for (const button of buttons) {
      button.setAttribute(
        "aria-pressed",
        String(selectedTags.has(normalize(button.dataset.materialTag || "")))
      );
    }

    count.textContent = String(visibleCount);
    emptyMessage.hidden = visibleCount !== 0;
    resetButton.hidden = selectedTags.size === 0;
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const tag = normalize(button.dataset.materialTag || "");
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
      } else {
        selectedTags.add(tag);
      }
      updateCatalog();
    });
  }

  resetButton.addEventListener("click", () => {
    selectedTags.clear();
    updateCatalog();
  });

  updateCatalog();
})();
