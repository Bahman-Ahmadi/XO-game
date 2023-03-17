function goto(link) {
	document.body.innerHTML += `<a href="${link}" id="clickme"></a>`;
	document.getElementById("clickme").click();
}
function share() {
	swal("اشتراک گذاری", "با کلیک روی دکمه «ok» لینک دانلود برنامه را دریافت کنید و آن را با دوستانتان به اشتراگ بگذارید", "success").then(function() {
		document.body.innerHTML += `<input type="text" id="link" value="https://google.com" />`;
		let forcopy = document.getElementById("link")
		forcopy.select();
		forcopy.setSelectionRange(0, 99999);
		document.execCommand("copy");
		forcopy.remove();
	});
}