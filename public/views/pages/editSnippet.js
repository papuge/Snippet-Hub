import DataControl from "../../scripts/dataControl.js"
import Utils from "../../scripts/utils.js"


const EditSnippet = {

    render: async () => {

        let view = /*html*/ `
        <main>
            <form class="snippet-form" method="post" id="snippetForm">
                <h3 class="mb-20">Edit snippet</h3>
                <fieldset class='access-fieldset'>
                    <legend>Access</legend>
                    <input id='isPublic' name='access' type='radio' value="public" />
                    <label for='isPublic' class='radio-label'>Public</label>
                    <input id='isPrivate' name='access' type='radio' value="private" />
                    <label for='isPrivate' class='radio-label'>Private</label>
                </fieldset>
                <div class="snippet-form-header">
                    <input type="text" name="snippetName" id="snippetName" placeholder="Snippet name w/o extension" required maxlength="120">
                    <select name="lang" id="snippetLang">
                        <option value="bsh">Bash</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="cs">C#</option>
                        <option value="css">CSS</option>
                        <option value="js">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="html">HTML</option>
                        <option value="py">Python</option>
                        <option value="rb">Ruby</option>
                        <option value="xml">XML</option>
                    </select>
                </div>
                <textarea name="code" id="snippetCode" placeholder="Snippet here" wrap="off" required></textarea>
                <button class="primary-btn form-btn" type="submit">Edit</button>
            </form>
        </main>
        `;

        return view;
    },

    afterRender: async () => {

        const selectIndeces = {
            "bsh": 0,
            "c": 1,
            "cpp": 2,
            "cs": 3,
            "css": 4,
            "js": 5,
            "java": 6,
            "html": 7,
            "py": 8,
            "rb": 9,
            "xml": 10
        };

        let snippet = await getSnippet();

        if (snippet.access == "public") {
            document.getElementById("isPublic").checked = true;
        } else {
            document.getElementById("isPrivate").checked = true;
        }

        let snippetName = document.getElementById("snippetName");
        let langSelect = document.getElementById("snippetLang");
        let snippetCode = document.getElementById("snippetCode");

        snippetName.value = snippet.name;
        langSelect.selectedIndex = selectIndeces[snippet.lang];
        snippetCode.innerHTML = snippet.code;


        document.getElementById("snippetForm").addEventListener("submit", async (event) => {

            const rbs = document.querySelectorAll('input[name="access"]');
            let snippetAccess = "public";
            for (const rb of rbs) {
                if (rb.checked) {
                    snippetAccess = rb.value;
                }
            }

            const snippetName = document.getElementById("snippetName").value;
            const langSelect = document.getElementById("snippetLang");
            const snippetLang = langSelect.options[langSelect.selectedIndex].value;
            const snippetCode = document.getElementById("snippetCode").value;

            await DataControl.editSnippet({
                id: Utils.parseUrl().id,
                name: snippetName,
                lang: snippetLang,
                code: snippetCode,
                access: snippetAccess
            });

            event.preventDefault();

        }, false);
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

export default EditSnippet