async function postData(url = ``, data = {}) {
    const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    });
    return await res.json();
}

async function getData(url = ``, data = {}) {
    const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    });
    return await res.json();
}

function extractModifiedData(outerContainer) {
    const values = outerContainer.querySelectorAll('[data-value-for]');
    const keys = {};

    const dictValues = {};
    values.forEach(function (elem) {
        const dataId = elem.getAttribute('data-id');
        const key = elem.getAttribute('data-value-for');
        const value = (elem.tagName.toLowerCase() === 'input') ? elem.value : elem.innerHTML;
        if (dataId)
            dictValues[dataId] = value;
        else if (!keys[key])
            keys[key] = value;
        else if (Array.isArray(keys[key]))
            keys[key].push(value);
        else
            keys[key] = [keys[key], value];

    });

    outerContainer.querySelectorAll('[data-key]').forEach(function (elem) {
        const outerKey = elem.getAttribute('data-key');
        const innerKey = elem.innerHTML;
        const dataId = elem.getAttribute('data-id');

        if (!keys[outerKey])
            keys[outerKey] = {};
        keys[outerKey][innerKey] = dictValues[dataId];
    });

    return keys;
}

function updateInfoText(elem, text, error = false) {
    if (text.errmsg) text = text.errmsg;
    if (error) {
        elem.classList.remove('good');
        if (!elem.classList.contains('bad')) elem.classList.add('bad');
    } else {
        elem.classList.remove('bad');
        if (!elem.classList.contains('good')) elem.classList.add('good');
    }
    elem.innerText = text;
}

$("button.btn-profile-edit").click(function () {
	let modal = $("#profileEdit");
	modal.find('#insuranceProvider').val(modal.find("#ip").val());
	modal.modal('show');
});
