const Search = (async function () {
  let index = await fetch('./index.json');
  let indexData = await index.json();
  let idx = lunr.Index.load(indexData);

  let docs = await fetch('./raw.json');
  let docs2 = await docs.json();

  return {
    search(query) {
      let results = idx.search(query);
      results.forEach(r => {
        r.title = docs2[r.ref].title;
        r.url = docs2[r.ref].url;
        r.content = docs2[r.ref].content;
      });

      return results;
    },

    getResultsHtml(results) {
      let result = r => `
          <li>
            <h2 class="nhsuk-u-margin-bottom-1">
              <a href="${r.url}">${r.title}</a>
            </h2>
            <p class="nhsuk-body-s nhsuk-u-margin-top-1">${r.content.substring(
              0,
              Math.max(r.content.indexOf(' ', 150), 150)
            )}&#8230;</p>
          </li>
      `;

      let stuff = `
        <ul class="nhsuk-list nhsuk-list--border nhsuk-u-margin-top-3">
          ${results.map(r => result(r)).join('')}
        </ul>`;
      return stuff;
    },
  };
})();
