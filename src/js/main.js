// Shared header search handler
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function initSearch() {
  const form = qs("#searchForm");
  if (!form) return;

  const input = qs("#searchInput", form);
  const button = qs("#searchBtn", form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }
  });
}

initSearch();

