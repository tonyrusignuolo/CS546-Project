document.addEventListener('DOMContentLoaded', function (event) {
    const form = document.getElementById('create-profile-form');
    const msg = document.getElementById('msg');

    document.getElementById('submit').addEventListener('click', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        const insuranceProvider = formData.get('insuranceProvider');
        const admin = formData.get('admin');

        if (password !== passwordConfirm) {
            updateInfoText(msg, 'Passwords do not match', true);
            return;
        }
        if (password === '') {
            updateInfoText(msg,'Password must not be blank', true);
            return;
        }

        let newProfile = {
            firstName: (firstName.length > 0) ? firstName : null,
            lastName: (lastName.length > 0) ? lastName : null,
            email: (email.length > 0) ? email : null,
            password: (password.length > 0) ? password : null,
            insuranceProvider: (insuranceProvider.length > 0) ? insuranceProvider : null,
            admin: (admin === 'on')
        };

        const responseData = await postData(`/admin/profiles/create`, newProfile);
        if (!responseData.error) {
            updateInfoText(msg, 'Profile was created successfully.');
        } else {
            updateInfoText(msg, responseData.error, true);

            console.error(responseData.error);
        }
    });
});