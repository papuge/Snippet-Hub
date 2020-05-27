import Utils from "./utils.js";

let Auth = {

    logIn: (email, password) => {
        // TODO find email from username
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {

            Utils.navigateTo("/");

        }).catch(function (error) {

            console.log(error.code);
            console.log(error.message);
            alert("Login wasn't successful");

        });
    },

    signUp: ({ username, firstName, lastName, email, password }) => {

        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {

            firebase.database().ref(`users/${result.user.uid}`).set({
                username: username,
                firstName: firstName,
                lastName: lastName,
                photoUrlPath: "./images/avatar_placeholder.png"
            }, function (error) {
                if (error) {
                    console.log(error.message);
                } else {
                    Utils.navigateTo("/");
                }
            });

        }).catch(function (error) {

            console.log(error.code);
            console.log(error.message);
            alert("Sign up failed, please, try again");

        });

        Auth.user
    },

    logout: () => {
        firebase.auth().signOut().then(() => {

            Utils.navigateTo("/");
            
        }).catch(function (error) {

            console.log(error.code);
            console.log(error.message);

        });
    }
}


export default Auth