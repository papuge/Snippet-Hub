import Utils from "../../scripts/utils.js";

const Snippet = {

    render: async () => {

        let snippet = getSnippet();

        let view = /*html*/ `
            <main class="page-content">
                <h3 class="info-text" id="snippetName">${snippet.name}</h3>
                <time class="info-text" id="dateText" datetime="${snippet.time}"> At Feb 12, 2020</time>
                <div class="snippet-container">
                    <section class="snippet-header">
                        <div class="start-flex-group">
                            <!-- find user by id -->
                            <img src="./images/avatar_placeholder.png" class="profile-img" alt="avatar">
                            <p id="snippetLang">${Utils.langs[snippet.lang]}</p>
                        </div>
                        <div class="end-flex-group">
                            <button class="primary-btn" id="editBtn">
                                Edit
                            </button>
                            <button class="primary-btn" id="deleteBtn">
                                Delete
                            </button>
                            <button class="btn icon-btn" id="saveBtn">
                                <i class="material-icons" id="saveStateIc">bookmark</i>
                            </button>
                        </div>
                    </section>
                    <pre class="prettyprint linenums lang-${snippet.lang}"snippet.code></pre>
                </div>
            </main>
        `
    },

    afterRender: async () => {
        document.getElementById("saveBtn").addEventListener("click", function () {
            let state = document.getElementById("saveStateIc").innerHTML;
            if (state == "bookmark") {
                document.getElementById("saveStateIc").innerHTML = "bookmark_border";
            } else {
                document.getElementById("saveStateIc").innerHTML = "bookmark";
            }
        });

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

function getSnippet() {
    // parse url id
}

export default Snippet