import Utils from "../../scripts/utils.js";

const Snippet = {
    render: async () =>
     /*html*/ `
     <main class="page-content">
        <h3 class="info-text" id="snippetName">File</h3>
        <time class="info-text" id="dateText" datetime=""> At Feb 12, 2020</time>
        <div class="snippet-container">
            <section class="snippet-header">
                <div class="start-flex-group">
                    <img src="./images/avatar_placeholder.png" class="profile-img" alt="avatar">
                    <p id="snippetLang">C++</p>
                </div>
                <div class="end-flex-group">
                    <button class="primary-btn">
                        Edit
                    </button>
                    <button class="primary-btn">
                        Delete
                    </button>
                    <button class="btn icon-btn" id="saveBtn">
                        <i class="material-icons" id="saveStateIc">bookmark</i>
                    </button>
                </div>
            </section>
            <pre class="prettyprint linenums lang-cpp">
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;


int main() {
 while(true) {
     printf("sippin on straight chlorine");
 }
 return 0;
}
            </pre>
        </div>
    </main>
    `,

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

export default Snippet