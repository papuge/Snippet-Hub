import Login from './views/pages/login.js'
import Utils from './scripts/utils.js'
import Navbar from './views/components/navbar.js'
import Footer from './views/components/footer.js'
import Snippet from './views/pages/snippet.js'
import NewSnippet from './views/pages/newSnippet.js'
import EditSnippet from './views/pages/editSnippet.js'
import SignUp from './views/pages/signup.js'
import EditProfile from './views/pages/editProfile.js'
import Home from './views/pages/home.js'
import Profile from './views/pages/profile.js'
import SearchResult from './views/pages/searchResult.js'
import Error404 from './views/pages/error404.js'


const routes = {
    "/": Home,
    "/profile/:id": Profile,
    "/editProfile": EditProfile,
    "/login": Login,
    "/signup": SignUp,
    "/snippet/:id": Snippet,
    "/newSnippet": NewSnippet,
    "/snippet/:id/edit": EditSnippet,
    "/searchResult/:id": SearchResult
};

const router = async () => {

    const header = document.getElementById('pageHeader');
    const content = document.getElementById('pageContent');
    const footer = document.getElementById('pageFooter');

    await Utils.renderPage(header, Navbar);
    await Utils.renderPage(footer, Footer);

    let request = Utils.parseUrl();
    let parsedUrl = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');

    let page = routes[parsedUrl] ? routes[parsedUrl] : Error404;

    await Utils.renderPage(content, page);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);