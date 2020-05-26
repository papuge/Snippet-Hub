const Utils = {
    parseUrl: () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource: null,
            id: null,
            verb: null
        }
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    },

    renderPage: async (container, content) => {
        container.innerHTML = await content.render();
        await content.afterRender();
    },

    loadScript: (url) => {
        var head = document.head;

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;

        head.appendChild(script);
    }
}

export default Utils;