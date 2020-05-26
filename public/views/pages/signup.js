const SignUp = {
    render: async () =>
     /*html*/ `
     <main class="page-content">
        <form class="login-form" action="" method="post" id="signUpForm">
            <h3 class="mv-20">Sign Up</h3>

            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="" placeholder="Username" required maxlength="20"
                    pattern="[_-0-9A-Za-z]+">
            </div>

            <div class="form-field">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id="" placeholder="First name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="" placeholder="Last name" required maxlength="30">
            </div>

            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" id="" placeholder="Email" required>
            </div>

            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" name="password" id="" placeholder="Password" required minlength="5"
                    maxlength="30">
            </div>

            <div class="form-field">
                <label for="confirmPassword">Password again</label>
                <input type="password" name="confirmPassword" id="" placeholder="Confirm password" required
                    minlength="5" maxlength="30">
            </div>

            <button type="submit" class="primary-btn form-btn">Sign up</button>
        </form>
     </main>
    `,

    afterRender: async() => {
        // TODO auth
    }
}

export default SignUp