module.exports = {
    addBreadcrumbs(collection, post) {
        post.data.breadcrumbs = [];

        if (!post.data.hub) {
            return post;
        }

        let current = post;

        while (current.data.hub && post.data.breadcrumbs.length <= collection.length) {
            const next = collection.find(
                (post) =>  post.data.name === current.data.hub
            );

            if (!next) break;

            post.data.breadcrumbs.push(next);
            current = next;
        }

        return post;
    }
}
