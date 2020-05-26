const Login = {
    render: async () =>
     /*html*/ `
     <main class="page-content">
        <form action="" method="post" class="login-form" id="loginForm">
            <h3 class="mv-20">Login</h3>
            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="" placeholder="Username" required>
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" id="" placeholder="Password" required>
            </div>
            <button type="submit" class="primary-btn form-btn">Login</button>
        </form>
     </main>
    `,

    afterRender: async() => {
        // TODO auth
    }
}

export default Login;