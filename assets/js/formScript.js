function addFields(targetID, fieldID, labelName){
    // todo: possibly create an fieldType argument and write cotrols for creating the field based on type
    var targetElement = document.getElementById(targetID);
    var label = document.createElement("label");
    label.setAttribute('for', fieldID);
    label.setAttribute('class', "bmd-label-floating");
    label.innerHTML = labelName;
    var input = document.createElement("input");
    input.type = "text";
    input.setAttribute('class', "form-control");
    input.id = input.name = fieldID;
    targetElement.appendChild(label);
    targetElement.appendChild(input);
    targetElement.appendChild(document.createElement("br"));
    document.getElementByID(fieldID).focus();
}