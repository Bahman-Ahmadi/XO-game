function load() {
	var gamePlayes = localStorage.getItem("GamePlayes").split("|");
	for (var i = 2; i < gamePlayes.length; i++) {
		var content = localStorage.getItem(gamePlayes[i]).split("|");
		document.getElementById('main').innerHTML += `
		<tr>
		<td onclick='rm("${gamePlayes[i]});")'>${gamePlayes[i]}</td>
		<td>${content[0]}</td>
		<td>${content[1]}</td>
		<td>${content[2] == "xplayer"?content[0]: content[1]}</td>
		<td>${content[3]}</td>
		</tr>`;
	}
}
function rm(key) {
	try {
		localStorage.removeItem(key);
		window.location.reload();
	} catch (e) {
		alert(e);
	}
}