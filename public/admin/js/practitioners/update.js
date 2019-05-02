document.addEventListener('DOMContentLoaded', function (event) {
    Array.from(document.getElementsByClassName('adder')).forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            e.preventDefault();
            const caller = e.target;
            const outerContainer = e.target.parentElement.parentElement.parentElement;

            const keyType = caller.getAttribute('data-key-type');
            const valueClass = caller.getAttribute('data-value-class');
            const keyClass = caller.getAttribute('data-key-class');
            const keyFor = caller.getAttribute('data-key-for');

            const timestamp = new Date().toISOString();

            let keyHTML = '';
            let dataID = '';
            if (keyType === 'key-value') {
                keyHTML = '<span class="' + keyClass + '" data-key="' + keyFor + '" data-id="' + timestamp + '" contenteditable>[Key]</span>\n';
                dataID = 'data-id="' + timestamp + '"'
            }

            outerContainer.insertAdjacentHTML('beforeend',
                '<div class="info-text element">\n' +
                keyHTML +
                '<span class="' + valueClass + '" ' + dataID + ' data-value-for="' + keyFor + '" contenteditable>[value]</span>\n' +
                '</div>'
            );
        });
    });

    Array.from(document.getElementsByClassName('remover')).forEach(function (elem) {
        elem.addEventListener('click', function (e) {
            e.preventDefault();
            const outerContainer = e.target.parentElement.parentElement.parentElement;

            if (outerContainer.childElementCount > 0) {
                const lastChild = outerContainer.lastElementChild;
                if (lastChild.classList.contains('element'))
                    outerContainer.removeChild(outerContainer.lastElementChild);
            }
        });
    });

    Array.from(document.getElementsByClassName('done-btn')).forEach(function (elem) {
        elem.addEventListener('click', async function (e) {
            e.preventDefault();
            /*
             * Note that this "outerContainer" references a different container than the "outerContainer" in the callback above.
             * They just happen to both be 3 generations up from the target
             * */
            const outerContainer = e.target.parentElement.parentElement.parentElement;

            const data = extractModifiedData(outerContainer);

            data.location = {lat: Number(data.lat), long: Number(data.long)};
            delete data.lat;
            delete data.long;

            if (!data.procedures)
                data.procedures = {};

            if (data.providers) {
                if (!Array.isArray(data.providers))
                    data.providers = [data.providers];
            } else
                data.providers = [];


            const updateData = {
                _id: e.target.id,
                update_: {$set: data}
            };

            const msg = outerContainer.getElementsByClassName('msg')[0];
                const response_data = await postData(`/admin/practitioners/update`, updateData);
                if (!response_data.error) {
                    msg.classList.remove('bad');
                    if (!msg.classList.contains('good')) msg.classList.add('good');
                    msg.innerText = 'Practitioner was updated successfully.';

                    console.log(JSON.stringify(response_data));
                }
                else {
                    msg.classList.remove('good');
                    if (!msg.classList.contains('bad')) msg.classList.add('bad');
                    msg.innerText = response_data.error;

                    console.error(response_data.error);
                }
        });
    });
});