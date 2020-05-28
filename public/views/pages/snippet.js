import Utils from "../../scripts/utils.js";
import DataControl from "../../scripts/dataControl.js"


const Snippet = {

    render: async () => {

        let snippet = await getSnippet();

        let view = /*html*/ `
            <main class="page-content">
                <h3 class="info-text" id="snippetName">${snippet.name}</h3>
                <time class="info-text" id="dateText" datetime="${snippet.time}"> At ${Utils.toDateFormat(snippet.time)}</time>
                <div class="snippet-container">
                    <section class="snippet-header">
                        <div class="start-flex-group">
                            <!-- find user by id -->
                            <img src="./images/avatar_placeholder.png" class="profile-img" alt="avatar">
                            <p id="snippetLang">${Utils.langs[snippet.lang]}</p>
                        </div>
                        <div class="end-flex-group">
                            <button class="primary-btn not-displayed" id="editBtn">
                                Edit
                            </button>
                            <button class="primary-btn not-displayed" id="deleteBtn">
                                Delete
                            </button>
                            <button class="btn icon-btn not-displayed" id="saveBtn">
                                <i class="material-icons" id="saveStateIc">bookmark</i>
                            </button>
                        </div>
                    </section>
                    <pre class="prettyprint linenums lang-${snippet.lang}">${snippet.code}</pre>
                </div>
            </main>
        `;

        return view;
    },

    afterRender: async () => {

        let snippet = await getSnippet();
        let snippetId = Utils.parseUrl().id;


        const saveBtn = document.getElementById("saveBtn");
        const editBtn = document.getElementById("editBtn");
        const deleteBtn = document.getElementById("deleteBtn");

        saveBtn.style.display = "none";
        editBtn.style.display = "none";
        deleteBtn.style.display = "none";

        saveBtn.addEventListener("click", async () => {

            let state = document.getElementById("saveStateIc").innerHTML;

            if (state == "bookmark") {
                await DataControl.unsaveSnippet(snippetId);
                document.getElementById("saveStateIc").innerHTML = "bookmark_border";
            } else {
                await DataControl.saveSnippet(snippetId);
                document.getElementById("saveStateIc").innerHTML = "bookmark";
            }
        });

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {

                let isSaved = await DataControl.isSavedSnippet(snippetId);
                if (isSaved) {
                    document.getElementById("saveStateIc").innerHTML = "bookmark";
                } else {
                    document.getElementById("saveStateIc").innerHTML = "bookmark_border";
                }

                saveBtn.style.display = "block";

                if (snippet.uid == user.uid) {
                    editBtn.style.display = "block";
                    deleteBtn.style.display = "block";
                }
            }
        });

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

async function getSnippet() {

    let request = Utils.parseUrl();

    if (!request.id) {

        Utils.navigateTo("/");

    } else {

        return await DataControl.getSnippet(request.id);
    }
}

export default Snippet