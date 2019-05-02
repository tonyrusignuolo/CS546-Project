document.addEventListener('DOMContentLoaded', function (event) {
    Array.from(document.getElementsByClassName('delete-btn')).forEach(function (elem) {
        elem.addEventListener('click', async function (e) {
            e.preventDefault();

            const outerContainer = e.target.parentElement.parentElement.parentElement;

            const msg = outerContainer.getElementsByClassName('msg')[0];
            const responseData = await postData(`/admin/appointments/delete`, {_id: e.target.id});
            if (!responseData.error) {
                updateInfoText(msg, 'Appointment was deleted successfully');

                console.log(JSON.stringify(responseData));
            } else {
                updateInfoText(msg, responseData.error, true);

                console.error(responseData.error);
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

            data.verified = (data.verified === 'on');
            data.price = Number(data.price);

            const updateData = {
                _id: e.target.id,
                update_: {$set: data}
            };

            const msg = outerContainer.getElementsByClassName('msg')[0];
            const responseData = await postData(`/admin/appointment/update`, updateData);
            if(!responseData.error) {
                updateInfoText(msg, 'Appointment was updated successfully');
            } else {
                updateInfoText(msg, responseData.error, true);

                console.error(responseData.error);
            }
        });
    });
});