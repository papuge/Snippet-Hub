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
    <div class="end-flex-group">
        <button class="icon-btn scale-btn">
            <i class="material-icons">add</i>
        </button>
        <a href="#">
            <i class="material-icons" style="color: black;">notifications</i>
        </a>
        <div class="dropdown" id="profileDropdown">
            <img src="./images/avatar_placeholder.png" class="nav-profile dropbtn" alt="avatar">
            <div class="dropdown-content">
                <a href="#">Edit profile</a>
                <a href="#">Logout</a>
            </div>
        </div>
    </div>
    `,

    afterRender: async () => {

    }
}

export default Navbar;