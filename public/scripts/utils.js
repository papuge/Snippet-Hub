const Utils = {

    langs: {
        "bsh": "Bash",
        "c": "C",
        "cpp": " C++",
        "cs": "C#",
        "css": "CSS",
        "js": "JavaScript",
        "java": "Java",
        "html": "HTML",
        "py": "Python",
        "rb": "Ruby",
        "xml": "XML"
    },

    parseUrl: () => {
        let url = location.hash.slice(1) || '/';
        let r = url.split("/");
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
        let head = document.head;

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;

        head.appendChild(script);
    },

    navigateTo: (url) => {
        window.location.href = url;
    },

    toDateFormat: (timestamp) => {
        let date = new Date(timestamp);
        return ` ${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    }
}

export default Utils;