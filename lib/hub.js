const { sortByPosition } = require('./utils');

const getPages = (hub, collection) => (
    collection
        .filter(p => p.data.hub === hub.data.name)
        .sort(sortByPosition)
);

module.exports = {
    isHub(post) {
        const { type, name, hub } = post.data;
        return type === 'hub' && name && hub;
    },

    addHubData(collection, hub) {
        hub.pages = getPages(hub, collection);
        return hub;
    },

    addHubToCollection(collection, hub) {
        return { ...collection, [hub.data.name]: hub }
    }
}
