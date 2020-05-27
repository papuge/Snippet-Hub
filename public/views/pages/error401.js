const Error401 = {
    render: async () =>
     /*html*/ `
    <h1 class="center-text mv-20">401</h1>
    <p class="center-text mv-20">Unauthorized</p>
    `,

    afterRender: async () => { }
}

export default Error401