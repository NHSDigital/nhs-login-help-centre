const { sortByPosition } = require('./utils');

const getPages = (hub, collection) => (
    collection
        .filter(p => p.data.hub === hub.data.name)
        .sort(sortByPosition)
);

module.exports = {
    isHub(post) {
        return post.data.type === 'hub' && post.data.name;
    },

    addHubData(collection, hub) {
        hub.pages = getPages(hub, collection);
        return hub;
    },

    addHubToCollection(collection, hub) {
        return { ...collection, [hub.data.name]: hub }
    }
}
