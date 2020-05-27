import Auth from "../../scripts/auth.js"

const SignUp = {
    render: async () =>
     /*html*/ `
     <main class="page-content">
        <form class="login-form" action="" method="post" id="signUpForm">
            <h3 class="mv-20">Sign Up</h3>

            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="usernameInput" placeholder="Username" required maxlength="20"
                    pattern="[_0-9A-Za-z]+">
            </div>

            <div class="form-field">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id="firstNameInput" placeholder="First name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="lastNameInput" placeholder="Last name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" id="emailInput" placeholder="Email" required>
            </div>

            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordInput" placeholder="Password" required minlength="6"
                    maxlength="30">
            </div>

            <div class="form-field">
                <label for="confirmPassword">Password again</label>
                <input type="password" name="confirmPassword" id="confirmInput" placeholder="Confirm password" required
                    minlength="6" maxlength="30">
            </div>

            <button type="submit" class="primary-btn form-btn">Sign up</button>
        </form>
     </main>
    `,

    afterRender: async () => {
        document.getElementById("signUpForm").addEventListener("submit", (event) => {

            let username = document.getElementById("usernameInput").value;
            let firstName = document.getElementById("firstNameInput").value;
            let lastName = document.getElementById("lastNameInput").value;
            let email = document.getElementById("emailInput").value;
            let password = document.getElementById("passwordInput").value;
            let confirmPassword = document.getElementById("confirmInput").value;

            if (password == confirmPassword) {

                Auth.signUp({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                });

            } else {

                alert("Passwords do not match");
            }

            event.preventDefault();
            
        }, false);
    }
}

export default SignUp