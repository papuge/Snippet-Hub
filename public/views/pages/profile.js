import Utils from "../../scripts/utils.js"
import FollowersList from "../components/followersList.js"
import FollowingList from "../components/followingList.js"
import SnippetsList from "../components/snippetsList.js"
import SavedSnippetsList from "../components/savedSnippetsList.js"
import DataControl from "../../scripts/dataControl.js"


const Profile = {
    render: async () =>
     /*html*/ `
     <div class="page-content profile-view-flex">
     <aside class="sidebar">
         <img src="./images/avatar_placeholder.png" class="sidebar-avatar" alt="avatar" id="profilePhoto">
         <h3 id="username"></h3>
         <p id="aboutProfile"></p>
         <button class="primary-btn" id="followBtn">Follow</button>
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

        const userId = Utils.parseUrl().id;

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
        const followBtn = document.getElementById("followBtn");

        followBtn.addEventListener("click", async () => {
            if (followBtn.innerHTML == "Follow") {
                await DataControl.followUser(Utils.parseUrl().id);
                followBtn.innerHTML = "Unfollow";
            } else {
                await DataControl.unfollowUser(Utils.parseUrl().id);
                followBtn.innerHTML = "Follow";
            }
            Utils.renderPage(followers, FollowersList);
        })

        followBtn.style.display = "none";

        document.getElementById("userSnippetsTab").addEventListener("click", (event) => openTab(event, "userSnippets"));
        document.getElementById("followersTab").addEventListener("click", (event) => openTab(event, "followers"));
        document.getElementById("followingTab").addEventListener("click", (event) => openTab(event, "following"));
        document.getElementById("savedSnippetsTab").addEventListener("click", (event) => openTab(event, "savedSnippets"));

        let tabContent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        document.getElementById("userSnippets").style.display = "block";

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                if (user.uid == userId) {
                    Utils.navigateTo("/");
                } else {
                    followBtn.style.display = "inline-block";
                }
            }

            let currentUser = await DataControl.getUserInfo(userId);
            document.getElementById("username").innerHTML = currentUser.username;
            document.getElementById("aboutProfile").innerHTML = currentUser.about;
            document.getElementById("profilePhoto").src = currentUser.photoUrlPath;

            Utils.renderPage(userSnippets, SnippetsList);
            Utils.renderPage(followers, FollowersList);
            Utils.renderPage(following, FollowingList);
            Utils.renderPage(savedSnippets, SavedSnippetsList);

            let isFollowing = await DataControl.isFollowing(Utils.parseUrl().id);
            if (isFollowing) {
                followBtn.innerHTML = "Unfollow";
            } else {
                followBtn.innerHTML = "Follow";
            }
        });

        Utils.loadScript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js");
    }
}

export default Profile