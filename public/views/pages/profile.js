import Utils from "../../scripts/utils.js"

const Profile = {
    render: async () =>
     /*html*/ `
     <form class="mobile-search-form" id="mobileSearchForm">
        <button type="submit" class="icon-btn scale-btn" id="searchBtn">
            <i class="material-icons">search</i>
        </button>
        <input type="search" class="search-field" id="searchField" placeholder="Search">
    </form>
     <div class="page-content profile-view-flex">
     <aside class="sidebar">
         <img src="./images/avatar_placeholder.png" class="sidebar-avatar" alt="avatar">
         <h3 id="username">Username</h3>
         <p id="aboutProfile">Smth about lorem</p>
         <button class="primary-btn">Follow</button>
     </aside>
     <main class="tabs-menu">
         <nav class="tab-panel">
            <button class="tab-link current" id="userSnippetsTab">Snippets</button>
            <button class="tab-link" id="followersTab">Followers</button>
            <button class="tab-link" id="followingTab">Following</button>
            <button class="tab-link" id="savedSnippetsTab">Saved</button>
         </nav>
         <div id="followers" class="tab-content">
             <ul class="follow-list">
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">coose</h5>
                     <p class=about-list>54 y.o.</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">goblinn</h5>
                     <p class=about-list>iOS developer</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">gwyrwch</h5>
                     <p class=about-list>student at BSUIR</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">levir</h5>
                     <p class=about-list></p>
                 </li>
             </ul>
         </div>
         <div id="following" class="tab-content">
             <ul class="follow-list">
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">goblinn</h5>
                     <p class=about-list>iOS developer</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">coose</h5>
                     <p class=about-list>54 y.o.</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">gwyrwch</h5>
                     <p class=about-list>student at BSUIR</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">levir</h5>
                     <p class=about-list></p>
                 </li>
             </ul>
         </div>
         <div id="following" class="tab-content">
             <ul class="follow-list">
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">goblinn</h5>
                     <p class=about-list>iOS developer</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">coose</h5>
                     <p class=about-list>54 y.o.</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">gwyrwch</h5>
                     <p class=about-list>student at BSUIR</p>
                 </li>
                 <li>
                     <img src="./images/avatar_placeholder.png" alt="avatar">
                     <h5 class="username">levir</h5>
                     <p class=about-list></p>
                 </li>
             </ul>
         </div>
         <div id="userSnippets" class="tab-content">
             <ul class="snippets">
                 <li>
                     <div class="snippet-demo-header">
                         <h5 class="snippet-demo-name">
                             initnitnitnitnitnitnit
                         </h5>
                         <p class="snippet-demo-lang">C++</p>
                     </div>
                     <pre class="prettyprint linenums lang-cpp">
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
                     </pre>
                 </li>
                 <li>
                     <div class="snippet-demo-header">
                         <h5 class="snippet-demo-name">
                             repeat
                         </h5>
                         <p class="snippet-demo-lang">C++</p>
                     </div>
                     <pre class="prettyprint linenums lang-cpp">
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
                     </pre>
                 </li>
                 <li>
                     <div class="snippet-demo-header">
                         <h5 class="snippet-demo-name">
                             initnitnitnitnitnitnitn
                         </h5>
                         <p class="snippet-demo-lang">C++</p>
                     </div>
                     <pre class="prettyprint linenums lang-cpp">
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
                     </pre>
                 </li>
             </ul>
         </div>
         <div id="savedSnippets" class="tab-content">
             <ul class="snippets">
                 <li>
                     <div class="snippet-demo-header">
                         <h5 class="snippet-demo-name">
                             initnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitinitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnitnit
                         </h5>
                         <p class="snippet-demo-lang">C++</p>
                     </div>
                     <pre class="prettyprint linenums lang-cpp">
int x = 42;  /* This is a comment 
Continuation of comment */
int y = 7;
                     </pre>
                 </li>
             </ul>
         </div>
     </main>
 </div>
    `,

    afterRender: async () => {
        function openTab(event, tabId) {
            let tabLinks = document.getElementsByClassName("tab-link");
            for (let i = 0; i < tabLinks.length; i++) {
                tabLinks[i].className = tabLinks[i].className.replace(" current", "");
            }
            let tabContent = document.getElementsByClassName("tab-content");
            for (let i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = "none";
            }
            event.currentTarget.className += " current";
            document.getElementById(tabId).style.display = "block";
        }

        document.getElementById("userSnippetsTab").addEventListener("click", (event) => openTab(event, "userSnippets"));
        document.getElementById("followersTab").addEventListener("click", (event) => openTab(event, "followers"));
        document.getElementById("followingTab").addEventListener("click", (event) => openTab(event, "following"));
        document.getElementById("savedSnippetsTab").addEventListener("click", (event) => openTab(event, "savedSnippets"));

        let tabContent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        document.getElementById("userSnippets").style.display = "block";

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

export default Profile