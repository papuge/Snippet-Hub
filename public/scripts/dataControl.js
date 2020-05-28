import Utils from "./utils.js";


const DataControl = {

    getSnippets: async (uid, isAll) => {
        let snippets = [];
        let ref = firebase.database().ref(`snippets`);
        await ref.once("value").then(function (snapshot) {
            snapshot.forEach(function (item) {
                let snippet = item.val();
                if (snippet.uid == uid) {
                    if (!isAll && snippet.access == "public" || isAll) {
                        snippet.id = item.key;
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
                if (item.hasChild(`suid/${uid}`)) {
                    snippet.id = item.key;
                    snippets.push(snippet);
                }
            });
        });

        return snippets;
    },

    getSnippet: async (id) => {

        let snippet = null;
        let ref = firebase.database().ref(`snippets/${id}`);

        await ref.once("value").then(function (snapshot) {
            snippet = snapshot.val();
        });

        return snippet;
    },

    createSnippet: async ({ name, lang, code, access }) => {

        let uid = firebase.auth().currentUser.uid;

        let snippet = {
            name: name,
            lang: lang,
            code: code,
            access: access,
            uid: uid,
            time: Date.now()
        };

        let newSnippetKey = firebase.database().ref().child('snippets').push().key;

        var updates = {};
        updates["/snippets/" + newSnippetKey] = snippet;

        await firebase.database().ref().update(updates);

        Utils.navigateTo("/");

    },

    saveSnippet: async (id) => {

        let uid = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/snippets/${id}/suid/${uid}`).set("");
    },

    unsaveSnippet: async (id) => {
        let uid = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/snippets/${id}/suid/${uid}`).remove();
    },

    isSavedSnippet: async (id) => {

        let uid = firebase.auth().currentUser.uid;
        let isSaved = false;
        let ref = firebase.database().ref(`snippets/${id}`);
        await ref.once("value").then(async (snapshot) => {

            if (snapshot.hasChild(`suid/${uid}`)) {
                isSaved = true;
            }
        });

        return isSaved;
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