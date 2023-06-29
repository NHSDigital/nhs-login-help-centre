const Search = (async function () {
  const [docsJson, indexJson] = await Promise.all([fetch('/js/search_data.json'), fetch('/js/search_index.json')]);
  const [docs, index] = await Promise.all([docsJson.json(), indexJson.json()]);

  const FUSE_SEARCH_ENABLED = false;
  let idx;

  if (FUSE_SEARCH_ENABLED) {
    const fuseIdx = Fuse.parseIndex(index)
    const fuseOptions = {}
    const fuse = new Fuse(docs, fuseOptions, fuseIdx)
    idx = fuse;
  } else {
    const lunrIdx = lunr.Index.load(index);
    idx = lunrIdx;
  }

  return {
    search(query) {
      let results = idx.search(query);
      results.forEach(r => {
        if (FUSE_SEARCH_ENABLED) {
          // r looks like:
          // {
          //   "item": {
          //     "url": "/manage/delete#nhs-login-settings",
          //     "title": "NHS login settings",
          //     "content": "You can delete your NHS login by visiting your NHS login settings. Scroll down to the bottom and select Delete NHS login. You will be asked to enter your password to confirm."
          //   },
          //   "refIndex": 26
          // }
          const item = r.item;
          r.title = item.title;
          r.url = item.url;
          r.content = item.content
        } else {
          // r looks like:
          // {
          //   "ref": "27",
          //     "score": 0.6839999999999999,
          //       "matchData": {
          //     "metadata": {
          //       "nh": {
          //         "title": { },
          //         "content": { }
          //       }
          //     }
          //   }
          // }
          r.title = docs[r.ref].title;
          r.url = docs[r.ref].url;
          r.content = docs[r.ref].content;
        }
      });

      return results;
    },

    getResultsHtml(query, results) {
      if (!query) {
        return '';
      }
      if (results.length) {
        return `
          <div>Found <strong>${results.length}</strong> matching result${results.length > 1 ? 's' : ''
          }</div>
          <ul class="nhsuk-list nhsuk-list--border nhsuk-u-margin-top-3">
            ${results.map(r => this.searchResult(r)).join('')}
          </ul>
        `;
      }
      return this.noMatchesMessage(query);
    },

    searchResult(r) {
      return `
          <li>
            <h2 class="nhsuk-u-margin-bottom-1">
              <a href="${r.url}">${r.title}</a>
            </h2>
            <p class="nhsuk-body-s nhsuk-u-margin-top-1">${r.content.substring(
        0,
        Math.max(r.content.indexOf(' ', 120), 120)
      )}&#8230;</p>
          </li>
      `;
    },

    noMatchesMessage(query) {
      return `
          <div class="nhsuk-grid-column-two-thirds">
            <h2>No results found for ${query}</h2>
            <p>Improve your search results by:</p>
            <ul class="nhsuk-list nhsuk-list--bullet">
              <li>double-checking your spelling</li>
              <li>using fewer keywords</li>
              <li>searching a reference number</li>
            </ul>
          </div>
      `;
    },
  };
})();
