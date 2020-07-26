import Auth from "../../scripts/auth.js"
import DataControl from "../../scripts/dataControl.js"
import Utils from "../../scripts/utils.js";


const Navbar = {
    render: async () =>
     /*html*/ `
    <div class="start-flex-group">
        <a href="#" class="site-heading">Snippet Hub</a>
        <form class="search-form" id="searchForm">
            <button type="submit" class="icon-btn scale-btn" id="searchBtn">
                <i class="material-icons">search</i>
            </button>
            <input type="search" class="search-field" id="searchField" placeholder="Search">
        </form>
    </div>
    <div class="end-flex-group" id="userMenu">
        <a href="#/newSnippet" class="scale-btn">
            <i class="material-icons" style="color: black;">add</i>
        </a>
        <div class="dropdown" id="profileDropdown">
            <img src="./images/avatar_placeholder.png" class="nav-profile dropbtn" alt="avatar" id="photoDrop">
            <div class="dropdown-content">
                <a href="#/editProfile">Edit profile</a>
                <button id="logoutBtn">Logout</button>
            </div>
        </div>
    </div>
    <div class="end-flex-group" id="loginMenu">
        <a href="#/login" class="black-link">Login</a>
        |
        <a href="#/signup" class="black-link">Sign Up</a>
    </div>
    `,

    afterRender: async () => {

        document.getElementById("logoutBtn").addEventListener("click", () => {
            Auth.logout();
        });

        let userMenu = document.getElementById("userMenu");
        let loginMenu = document.getElementById("loginMenu");

        userMenu.style.display = "none";
        loginMenu.style.display = "none";

        document.getElementById("searchForm").addEventListener("submit", async (event) => {
            let query = document.getElementById("searchField").value;
            Utils.navigateTo("#/searchResult/" + query);
        });

        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                userMenu.style.display = "flex";
                let currentUser = await DataControl.getUserInfo(user.uid);
                document.getElementById("photoDrop").src = currentUser.photoUrlPath;
            } else {
                loginMenu.style.display = "flex";
            }
        });

    }
}

export default Navbar