module.exports = {
  collectionToKeyedObject(collection, page) {
    return { ...collection, [page.url]: page };
  },

  sortByPosition(a, b) {
    return a.data.position - b.data.position;
  },
};
