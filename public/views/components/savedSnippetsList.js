import Utils from "../../scripts/utils.js"
import DataControl from "../../scripts/dataControl.js"


const SavedSnippetsList = {

    render: async () => {

        let snippets =  await getSavedSnippets();

        let view = /*html*/ `
            <ul class="snippets">
                ${  snippets.map(s =>
                        /*html*/`
                        <li id="s${s.id}">
                            <div class="snippet-demo-header">
                                <h5 class="snippet-demo-name">${s.name}</h5>
                                <p class="snippet-demo-lang">${Utils.langs[s.lang]}</p>
                            </div>
                            <pre class="prettyprint linenums lang-${s.lang}">${s.code}</pre>
                        </li>
                        `
                    ).join('\n')
                }
            </ul>
       `;

       if (snippets.length == 0) {
            view = /*html*/ `
                <p class="center-text mv-20">No saved snippets yet</p>
            `;
        }

       return view;
    },

    afterRender: async () => { 

        let snippets = await getSavedSnippets();

        snippets.forEach(s => {

            document.getElementById(`s${s.id}`).addEventListener("click", () => {
                Utils.navigateTo(`#/snippet/${s.id}`);
            });

        });

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

async function getSavedSnippets() {

    let request = Utils.parseUrl();

    // home page
    if (!request.resource) {

        return await DataControl.getSavedSnippets(firebase.auth().currentUser.uid);

    } else {

        return await DataControl.getSavedSnippets(request.id);
    }
}

export default SavedSnippetsList