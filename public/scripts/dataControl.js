const DataControl = {

    getSnippets: async (uid, isAll) => {
        let snippets = [];
        let ref = firebase.database().ref(`snippets`);
        await ref.once("value").then(function (snapshot) {
            snapshot.forEach(function (item) {
                let snippet = item.val();
                if (snippet.uid == uid) {
                    if (!isAll && snippet.access == "public" || isAll) {
                        snippets.push(snippet);
                    }
                }
            });
        });

        return snippets;
    },

    getSavedSnippets: async (uid) => {
        let snippets = [];
        let ref = firebase.database().ref(`snippets`);
        await ref.once("value").then(function (snapshot) {
            snapshot.forEach(function (item) {
                let snippet = item.val();
                if (snippet.access == "public") {
                    for (let suid of snippet.suid) {
                        if (suid == uid) {
                            snippets.push(snippet);
                        }
                    }
                }
            });
        });

        return snippets;
    },

    createSnippet: async ({ name, lang, code, access }) => {

    },

    saveSnippet: async (id) => {

    },

    editSnippet: async ({ id, name, lang, code, access }) => {

    },

    deleteSnippet: async (id) => {

    },

    followUser: async (uid) => {
        
    },

    unfollowUser: async (uid) => {

    },

    getUserInfo: async (uid) => {
        let user = null;
        let ref = firebase.database().ref(`users/${uid}`);
        await ref.once("value").then(function (snapshot) {
            user = snapshot.val();
        });

        return user;
    },

    editProfile: async ({ photo, username, email, about }) => {

    },

    filterSnippets: async (query) => {

    }

}

export default DataControl