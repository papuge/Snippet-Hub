import Login from './views/pages/login.js'
import Utils from './scripts/utils.js'
import Navbar from './views/components/navbar.js'
import Footer from './views/components/footer.js'

const routes = {
    "/": Home,
    "/profile/:id": Profile,
    "/profile/:id/edit": EditProfile,
    "/login": Login,
    "/signup": SignUp,
    "/snippet/:id": SnippetShow,
    "/newsnippet": NewSnippet,
    "/snippet/:id/edit": SnippetEdit,
    "/search/:template": Search,
    "/notifications/": Notifications,
    "/logout": Logout
};

const router = async () => {

    const header = document.getElementById('pageHeader');
    const content = document.getElementById('pageContent');
    const footer = document.getElementById('pageFooter');

    await Utils.renderPage(header, Navbar);
    await Utils.renderPage(footer, Footer);


    let request = Utils.parseUrl();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    await Utils.renderPage(content, page);

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);