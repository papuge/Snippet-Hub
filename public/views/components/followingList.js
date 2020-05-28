const FollowingList = {

    render: async () => {

        let users = getFollowing();

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
                <p class="center-text mv-20">No following yet</p>
            `;
        }

        return view;
    },

    afterRender: async () => { }
}

function getFollowing() {
    // parse url here
    return [];
}

export default FollowingList