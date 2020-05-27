const Error403 = {
    render: async () =>
     /*html*/ `
    <h1 class="center-text mv-20">403</h1>
    <p class="center-text mv-20">Forbidden</p>
    `,

    afterRender: async () => { }
}

export default Error403