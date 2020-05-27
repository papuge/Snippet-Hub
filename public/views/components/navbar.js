import Auth from "../../scripts/auth.js"

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
        <a href="#" class="scale-btn">
            <i class="material-icons" style="color: black;">notifications</i>
        </a>
        <div class="dropdown" id="profileDropdown">
            <img src="./images/avatar_placeholder.png" class="nav-profile dropbtn" alt="avatar">
            <div class="dropdown-content">
                <a href="#/profile/:id/edit">Edit profile</a>
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

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userMenu.style.display = "flex";
            } else {
                loginMenu.style.display = "flex";
            }
        });
    }
}

export default Navbar