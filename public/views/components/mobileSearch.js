const MobileSearch = {
    render: async () =>
     /*html*/ `
     <form class="mobile-search-form" id="mobileSearchForm">
         <button type="submit" class="icon-btn scale-btn" id="searchBtn">
             <i class="material-icons">search</i>
         </button>
         <input type="search" class="search-field" id="searchField" placeholder="Search">
     </form>
    `,

    afterRender: async () => {
    }
}

export default MobileSearch;