import DataControl from "../../scripts/dataControl.js"
import Utils from "../../scripts/utils.js"


const EditProfile = {
    render: async () =>
     /*html*/ `
     <main>
        <form class="profile-form" action="" method="post" id="profileForm">
            <h3 class="mb-20">Edit profile</h3>

            <div class="form-field">
                <label for="avatar">Profile image</label>
                <input type="file" name="avatar" accept="image/*" id="avatarFile">
            </div>

            <div class="form-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" maxlength="20">
            </div>

            <div class="form-field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email">
            </div>

            <div class="form-field">
                <label for="about">About you</label>
                <input type="text" name="about" id="about" placeholder="Short tell about you" maxlength="250">
            </div>

            <button type="submit" class="primary-btn form-btn">Save</button>
        </form>
    </main>
    `,

    afterRender: async() => {

        let file = document.getElementById("snippetName");
        let langSelect = document.getElementById("snippetLang");
        let snippetCode = document.getElementById("snippetCode");

    }
}

export default EditProfile