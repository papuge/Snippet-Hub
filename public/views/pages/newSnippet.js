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
                    <option value="">Bash</option>
                    <option value="">JavaScript</option>
                    <option value="">Java</option>
                    <option value="">HTML</option>
                    <option value="">C</option>
                    <option value="">C++</option>
                    <option value="">C#</option>
                    <option value="">CSS</option>
                    <option value="">Python</option>
                    <option value="">Rust</option>
                    <option value="">XML</option>
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

export default NewSnippet;