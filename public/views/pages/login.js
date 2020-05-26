import Auth from "../../scripts/auth.js"

const Login = {
    render: async () =>
     /*html*/ `
     <main class="page-content" id="loginMain">
        <form action="" method="post" class="login-form" id="loginForm">
            <h3 class="mv-20">Login</h3>
            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="usernameInput" placeholder="Username" required>
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordInput" placeholder="Password" required>
            </div>
            <button type="submit" class="primary-btn form-btn">Login</button>
        </form>
     </main>
    `,

    afterRender: async() => {

        document.getElementById("loginForm").addEventListener("submit", (event) => {
            
            let username = document.getElementById("usernameInput").value;
            let password = document.getElementById("passwordInput").value;

            Auth.logIn(username, password);

            event.preventDefault();
            
        }, false);
    }
}

export default Login