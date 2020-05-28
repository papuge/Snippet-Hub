const NewSnippet = {
    render: async () =>
     /*html*/ `
     <main>
        <form class="snippet-form" method="post">
            <h3 class="mb-20">New snippet</h3>
            <fieldset class='access-fieldset'>
                <legend>Access</legend>
                <input id='isPublic' name='access' type='radio' value="public" checked />
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
            <textarea name="" id="" placeholder="Snippet here" wrap="off" required></textarea>
            <button class="primary-btn form-btn" type="submit">Create</button>
        </form>
    </main>
    `,

    afterRender: async() => {
        // TODO() send
    }
}

export default NewSnippet