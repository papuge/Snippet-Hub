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
                <a href="#">Logout</a>
            </div>
        </div>
    </div>
    <div class="end-flex-group" id="loginMenu">
        <p class="black-link">Login</p>
    </div>
    `,

    afterRender: async () => {

        let userMenu = document.getElementById("userMenu");
        let loginMenu = document.getElementById("loginMenu");

        if (Auth.user == null) {
            userMenu.style.display = "none";
        } else {
            loginMenu.style.display = "none";
        }
    }
}

export default Navbar