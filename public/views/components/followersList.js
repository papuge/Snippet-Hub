import Utils from "../../scripts/utils.js"
import DataControl from "../../scripts/dataControl.js"


const FollowingList = {

    render: async () => {

        let users = await getFollowers();

        let view = /*html*/ `
            <ul class="follow-list">
                ${
                    users.map(user =>
                        /*html*/`
                        <li>
                            <img src="${user.photoUrlPath}" alt="avatar">
                            <a href="#/profile/${user.uid}" class="username black-link">${user.username}</a>
                            <p class=about-list>${user.about}</p>
                        </li>
                        `
                    ).join('\n')
                }
            </ul>
        `;
        
        if (users.length == 0) {
            view = /*html*/ `
                <p class="center-text mv-20">No followers yet</p>
            `;
        }

        return view;
    },

    afterRender: async () => { }
}

async function getFollowers() {
    let request = Utils.parseUrl();

    if (!request.resource) {
        return await DataControl.getFollowers(firebase.auth().currentUser.uid);
    } else {
        return await DataControl.getFollowers(request.id);
    }
}

export default FollowingList