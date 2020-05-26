const Error404 = {
    render: async () =>
     /*html*/ `
    <h1 class="center-text mv-20">404</h1>
    <p class="center-text mv-20">You've found a glitch in a matrix</p>
    `,

    afterRender: async () => {
    }
}

export default Error404;