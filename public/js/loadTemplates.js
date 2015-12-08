$(function () {

	// Load Nav Bar
	$.get("templates/navbar.tpl.html", function (data) {
		$("#nav-container").append(data);
	});

	// Load Footer
	$.get("templates/footer.tpl.html", function (data) {
		$("#footer-container").append(data);
	});

});