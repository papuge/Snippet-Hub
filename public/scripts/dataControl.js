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
                if (snippet.access == "public") {
                    if (item.hasChild(`suid/${uid}`)) {
                        snippet.id = item.key;
                        snippets.push(snippet);
                    }
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

        let updates = {};
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

        let updates = {};
        updates[`snippets/${id}/name`] = name;
        updates[`snippets/${id}/lang`] = lang;
        updates[`snippets/${id}/code`] = code;
        updates[`snippets/${id}/access`] = access;

        await firebase.database().ref().update(updates, () => {
            Utils.navigateTo(`#/snippet/${id}`);
        });
    },

    deleteSnippet: async (id) => {
        await firebase.database().ref(`snippets/${id}`).remove().then(() => {
            Utils.navigateTo(`/`);
        });
    },

    followUser: async (uid) => {
        let id = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${id}/following/${uid}`).set("");
        await firebase.database().ref(`/users/${uid}/followers/${id}`).set("");
    },

    unfollowUser: async (uid) => {
        let id = firebase.auth().currentUser.uid;
        await firebase.database().ref(`/users/${id}/following/${uid}`).remove();
        await firebase.database().ref(`/users/${uid}/followers/${id}`).remove();
    },

    isFollowing: async (uid) => {
        let id = firebase.auth().currentUser.uid;
        let isFollowing = false;
        let ref = firebase.database().ref(`users/${id}/following`);
        let snap = await ref.once("value");
        if (snap.hasChild(`${uid}`)) {
            isFollowing = true;
        }

        return isFollowing;
    },

    getFollowers: async (uid) => {
        let followers = [];
        let followersUsers = [];
        let snap = await firebase.database().ref(`users/${uid}/followers`).once("value");
        snap.forEach(async function (item) {
            let followerId = item.key;
            followers.push(followerId);
        });
        for (let fid of followers) {
            let fsnap = await firebase.database().ref(`users/${fid}`).once("value");
            let user = fsnap.val();
            user.uid = fid;
            followersUsers.push(user);
        }
    
        return followersUsers;
    },

    getFollowing: async (uid) => {
        let following = [];
        let followingUsers = [];
        let snap = await firebase.database().ref(`users/${uid}/following`).once("value");
        snap.forEach(async function (item) {
            let followingId = item.key;
            following.push(followingId);
        });
        for (let fid of following) {
            let fsnap = await firebase.database().ref(`users/${fid}`).once("value");
            let user = fsnap.val();
            user.uid = fid;
            followingUsers.push(user);
        }
    
        return followingUsers;
    },

    getUserInfo: async (uid) => {
        let user = null;
        let ref = firebase.database().ref(`users/${uid}`);
        await ref.once("value").then(function (snapshot) {
            user = snapshot.val();
        });

        return user;
    },

    editProfile: async ({ photoUrl, username, email, about }) => {
        let user = firebase.auth().currentUser;
        let id = user.uid;

        let updates = {};
        if (photoUrl) {
            updates[`users/${id}/photoUrlPath`] = photoUrl;
        }
        if (username) {
            updates[`users/${id}/username`] = username;
        }
        if (email) {
            updates[`users/${id}/email`] = email;
            await user.updateEmail(email);
        }
        if (about) {
            updates[`users/${id}/about`] = about;
        }

        await firebase.database().ref().update(updates, () => {
            Utils.navigateTo(`/`);
        });
    }
}

export default DataControl