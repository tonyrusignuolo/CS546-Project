document.addEventListener('DOMContentLoaded', function (event) {
    Array.from(document.getElementsByClassName('done-btn')).forEach(function (elem) {
        elem.addEventListener('click', async function (e) {
            e.preventDefault();
            /*
             * Note that this "outerContainer" references a different container than the "outerContainer" in the callback above.
             * They just happen to both be 3 generations up from the target
             * */
            const outerContainer = e.target.parentElement.parentElement.parentElement;

            const data = extractModifiedData(outerContainer);

            if (data.password === '') delete data.password;
            data.admin = (data.admin === 'on');

            const updateData = {
                _id: e.target.id,
                update_: {$set: data}
            };

            const msg = outerContainer.getElementsByClassName('msg')[0];
            const responseData = await postData(`/admin/profiles/update`, updateData);
            if(!responseData.error) {
                updateInfoText(msg, 'Profile was updated successfully.');
            } else {
                updateInfoText(msg, responseData.error, true);

                console.error(responseData.error);
            }
        });
    });
});