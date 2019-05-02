document.addEventListener('DOMContentLoaded', function (event) {
    const procedures = document.getElementById('procedures');
    const providers = document.getElementById('providers');
    const form = document.getElementById('create-practitioner-form');
    const msg = document.getElementById('msg');

    document.getElementById('del-procedure').addEventListener('click', function (e) {
        e.preventDefault();

        if (procedures.childElementCount > 0)
            procedures.removeChild(procedures.lastElementChild);
    });

    document.getElementById('add-procedure').addEventListener('click', function (e) {
        e.preventDefault();

        procedures.insertAdjacentHTML('beforeend',
            '<div class="flex-row">\n' +
            '          <label>Name <input type="text" name="procedures[]"></label>\n' +
            '          <label>Price <input type="number" step="0.01" min="0" name="prices[]"></label>\n' +
            '      </div>');
    });

    document.getElementById('del-provider').addEventListener('click', function (e) {
        e.preventDefault();

        if (providers.childElementCount > 0)
            providers.removeChild(providers.lastElementChild);
    });

    document.getElementById('add-provider').addEventListener('click', function (e) {
        e.preventDefault();

        providers.insertAdjacentHTML('beforeend', '<label>Provider <input type="text" name="providers[]"></label>');
    });

    document.getElementById('submit').addEventListener('click', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        const providers = formData.getAll('providers[]');
        const procedures = formData.getAll('procedures[]');
        const prices = formData.getAll('prices[]').map(Number);
        const name = formData.get('name');
        const lat = formData.get('lat');
        const long = formData.get('long');

        let newPractitioner = {
            name: (name.length > 0) ? name : null,
            location: {
                lat: (lat.length > 0) ? Number(lat) : null,
                long: (long.length > 0) ? Number(long) : null,
            },
        };

        if (providers.length > 0)
            newPractitioner.providers = providers;

        if (procedures.length > 0) {
            newPractitioner.procedures = {};
            for (let a = 0; a < procedures.length; a++)
                newPractitioner.procedures[procedures[a]] = prices[a];
        }

        const responseData = await postData(`/admin/practitioners/create`, newPractitioner);
        if(!responseData.error) {
            updateInfoText(msg, 'Practitioner was created successfully');
        } else {
            updateInfoText(msg, responseData.error, true);

            console.error(responseData.error);
        }
    });
});