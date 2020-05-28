import Utils from "../../scripts/utils.js"
import DataControl from "../../scripts/dataControl.js"


const SnippetsList = {
    render: async () => {

        let snippets = await getSnippets();

        let view = /*html*/ `
        <ul class="snippets">
            ${ snippets.map(s =>
                    /*html*/`
                    <li id="snippet1">
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
                <p class="center-text mv-20">No snippets yet</p>
            `;
        }

       return view;
    },

    afterRender: async () => { }
}

async function getSnippets() {

    let request = Utils.parseUrl();

    // home page
    if (request.resource == null) {
    
        return await DataControl.getSnippets(firebase.auth().currentUser, true);

    } else {

        return await DataControl.getSnippets(request.id, false);
    }
}

export default SnippetsList