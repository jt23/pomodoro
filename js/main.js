function startUp() {
	var model = new Model();
    ko.applyBindings(model);
}

document.addEventListener("deviceready", startUp, false);
$(document).ready(startUp)