$("button.btn-profile-edit").click(function () {
	let email = $(this).parent().parent().children(".email").text();
	let user = function () {
		let tmp = null;
		$.ajax({
			'async': false,
			'type': "GET",
			'dataType': 'json',
			'url': "/admin/profile/" + email,
			'success': function (data) {
				tmp = data;
			}
		});
		return tmp;
	}();
	let modal = $("#profileEdit");
	modal.find("#firstName").val(user.firstName);
	modal.find("#lastName").val(user.lastName);
	modal.find("#email").val(user.email);
	modal.find("#insuranceProvider").val(user.insuranceProvider);
	modal.modal('show');
});

$("button.btn-practitioner-edit").click(function () {
	let practitionerId = $(this).parent().parent().attr("name");
	// console.log(practitionerId);
	let practitioner = function () {
		let tmp = null;
		$.ajax({
			'async': false,
			'type': "GET",
			'dataType': 'json',
			'url': "/admin/practitioner/" + practitionerId,
			'success': function (data) {
				tmp = data;
			}
		});
		return tmp;
	}();
	let modal = $("#practitionerEdit");
	// modal.find("#procedures").val(user.firstName);
	// modal.find("#lastName").val(user.lastName);
	// modal.find("#email").val(user.email);
	// modal.find("#insuranceProvider").val(user.insuranceProvider);
	modal.modal('show');
});