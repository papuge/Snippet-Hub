import Utils from "../../scripts/utils.js"
import FollowersList from "../components/followersList.js"
import FollowingList from "../components/followingList.js"
import SnippetsList from "../components/snippetsList.js"
import SavedSnippetsList from "../components/savedSnippetsList.js"
import DataControl from "../../scripts/dataControl.js"


const Home = {
    render: async () =>
     /*html*/ `
     <form class="mobile-search-form" id="mobileSearchForm">
        <button type="submit" class="icon-btn scale-btn" id="searchBtn">
            <i class="material-icons">search</i>
        </button>
        <input type="search" class="search-field" id="mobileSearchField" placeholder="Search">
     </form>
     <div class="page-content profile-view-flex" id="homeDiv">
     <aside class="sidebar">
         <img src="./images/avatar_placeholder.png" class="sidebar-avatar" alt="avatar" id="profilePhoto">
         <h3 id="username"></h3>
         <p id="aboutProfile"></p>
     </aside>
     <main class="tabs-menu">
         <nav class="tab-panel">
             <button class="tab-link current" id="userSnippetsTab">Snippets</button>
             <button class="tab-link" id="followersTab">Followers</button>
             <button class="tab-link" id="followingTab">Following</button>
             <button class="tab-link" id="savedSnippetsTab">Saved</button>
         </nav>
         <div id="userSnippets" class="tab-content"></div>
         <div id="followers" class="tab-content"></div>
         <div id="following" class="tab-content"></div>
         <div id="savedSnippets" class="tab-content"></div>
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

        const userSnippets = document.getElementById("userSnippets");
        const followers = document.getElementById("followers");
        const following = document.getElementById("following");
        const savedSnippets = document.getElementById("savedSnippets");
        const homeDiv = document.getElementById("homeDiv");

        document.getElementById("userSnippetsTab").addEventListener("click", (event) => openTab(event, "userSnippets"));
        document.getElementById("followersTab").addEventListener("click", (event) => openTab(event, "followers"));
        document.getElementById("followingTab").addEventListener("click", (event) => openTab(event, "following"));
        document.getElementById("savedSnippetsTab").addEventListener("click", (event) => openTab(event, "savedSnippets"));

        let tabContent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        document.getElementById("userSnippets").style.display = "block";

        document.getElementById("mobileSearchForm").addEventListener("submit", async (event) => {
            let query = document.getElementById("mobileSearchField").value;
            Utils.navigateTo("#/searchResult/" + query);
        });

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                let currentUser = await DataControl.getUserInfo(user.uid);
                document.getElementById("username").innerHTML = currentUser.username;
                document.getElementById("aboutProfile").innerHTML = currentUser.about;
                document.getElementById("profilePhoto").src = currentUser.photoUrlPath;
                Utils.renderPage(userSnippets, SnippetsList);
                Utils.renderPage(followers, FollowersList);
                Utils.renderPage(following, FollowingList);
                Utils.renderPage(savedSnippets, SavedSnippetsList);
            } else {
                homeDiv.style.display = "block";
                homeDiv.innerHTML = /* html */ `
                    <h1 class="center-text mv-20">Welcome to Snippet Hub</h1>
                    <h2 class="center-text mv-20">To get started, please, log in</h2>
                `
            }
        });
    }
}

export default Home