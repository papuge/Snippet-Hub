import Utils from "../../scripts/utils.js"
import DataControl from "../../scripts/dataControl.js"

let users = null;

let snippets = null;

const SearchResult = {

    render: async () => {

     users = await getUsersFromQuery();
     snippets = await getSnippetsFromQuery();

     const view = /*html*/ `
        <main class="page-content" id="searchMain">
            <h3 class="m-search-content">Users</h3>
            <div class="m-search-content" id="foundUsersDiv">
                <ul class="follow-list">
                ${
                    users.map(user =>
                        /*html*/`
                        <li>
                            <img src="${user.photoUrlPath}" alt="avatar">
                            <a href="#/profile/${user.uid}" class="username black-link">${user.username}</a>
                            <p class=about-list>${user.about}</p>
                        </li>
                        `
                    ).join('\n')
                }
                </ul>
            </div>

            <h3 class="m-search-content">Snippets</h3>
            <div class="m-search-content" id="foundSnippetsDiv">
                <ul class="snippets">
                ${  
                    snippets.map(s =>
                        /*html*/`
                        <li id="${s.id}">
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
            </div>
        </main>
     `;


     return view;
    },

    afterRender: async() => {

        if (users.length == 0) {
            document.getElementById("foundUsersDiv").innerHTML =  /*html*/ `<p class="m-search-content">No users found</p>`;
        }

        if (snippets.length == 0) {
            document.getElementById("foundSnippetsDiv").innerHTML =  /*html*/ `<p class="m-search-content">No snippets found</p>`;
        }

        snippets.forEach(s => {

            document.getElementById(s.id).addEventListener("click", () => {
                Utils.navigateTo(`#/snippet/${s.id}`);
            });

        });

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

async function getUsersFromQuery() {
    let request = Utils.parseUrl();

    return await DataControl.getUsersFromQuery(request.id);
}

async function getSnippetsFromQuery() {

    let request = Utils.parseUrl();

    return await DataControl.getSnippetsFromQuery(request.id);
}

export default SearchResult