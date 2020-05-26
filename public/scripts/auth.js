import Utils from "./utils.js";

let Auth = {
    logIn: (username, password) => {
        // TODO find email from username
        firebase.auth().signInWithEmailAndPassword(username, password).then(() => {

            Utils.navigateTo("/");

        }).catch(function (error) {

            console.log(error.code);
            console.log(error.message);
            alert("Login wasn't successful");
        });
    },

    signUp: ({username, email, firstName, lastName, password}) => {
        // TODO() check unique user id
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {

            // TODO fill info for user

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },

    logout: () => {
        firebase.auth().signOut().catch(function (error) {

            console.log(error.code);
            console.log(error.message);
        });
    },

    user: firebase.auth().currentUser
}

export default Auth