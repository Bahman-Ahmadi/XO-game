var xplayer = document.getElementById('xplayer');
var oplayer = document.getElementById('oplayer');

var xradio = document.getElementById('first');
var yradio = document.getElementById('second');

var xshower = document.getElementById('xshower');
var oshower = document.getElementById('oshower');

// event - radio labels changing text with editing text in fields
xplayer.onkeyup = function(e) {
  let value = this.value;
  value !== ""?xshower.innerHTML = value: xshower.innerHTML = "بازیکن اول";
};
oplayer.onkeyup = function(e) {
  let value = this.value;
  value !== ""?oshower.innerHTML = value: oshower.innerHTML = "بازیکن دوم";
};

// checking form and go to game
let send = document.getElementById('send');
var datas;
send.onclick = function(e) {
  if (xplayer.value != "" && oplayer.value != "" && xplayer.value.split("").indexOf("|") == -1 && oplayer.value.split("").indexOf("|") == -1) {
    datas = {
      "xplayer": xplayer.value,
      "oplayer": oplayer.value,
      "starter": xradio.checked?"xplayer": "oplayer"
    };

    document.getElementsByClassName("toolbar")[0].innerHTML = `<div onclick="goto('index.html');"><span class="arrow-text">←</span></div>XO Play`;
    document.getElementById("realbody").innerHTML = `<table border="1"><tr><td id="one"> </td><td id="two"> </td><td id="three"> </td></tr><tr><td id="four"> </td><td id="five"> </td><td id="six"> </td></tr><tr><td id="seven"> </td><td id="eight"> </td><td id="nine"> </td></tr></table><br/>`;

    var squares = document.getElementsByTagName("td");
    var moves = 0;
    for (var i = 0; i < squares.length; i++) {
      var xo = datas.starter == "xplayer"?"X": "O";
      toast(`نوبت <span class='${xo}'>${xo == "X"?datas.xplayer: datas.oplayer}</span> است.`, 1500);
      squares[i].onclick = async function(e) {
        if (this.innerHTML == " ") {
          xo == "X"?this.style = "color: #dc3545;": this.style = "color: #0d6efd;";
          this.innerHTML = xo;
          toast(`نوبت <span class='${xo == "X"?"O": "X"}'>${xo == "O"?datas.xplayer: datas.oplayer}</span> است.`, 1500);
          xo = xo == "X"?"O": "X";
        }if (moves >= 4) {
          winnerStatus = checkWinner();

          var one = document.getElementById('one').innerHTML;
          var two = document.getElementById('two').innerHTML;
          var three = document.getElementById('three').innerHTML;
          var four = document.getElementById('four').innerHTML;
          var five = document.getElementById('five').innerHTML;
          var six = document.getElementById('six').innerHTML;
          var seven = document.getElementById('seven').innerHTML;
          var eight = document.getElementById('eight').innerHTML;
          var nine = document.getElementById('nine').innerHTML;

          if (winnerStatus == "X") {
            save(datas, datas.xplayer);
            alertDialog (
              "بازی تمام شد!",
              `<span class='X'>${datas.xplayer}</span> برنده شد!`,
              "منوی اصلی",
              "بازی جدید",
              function () {
                goto("index.html");
              },
              function () {
                window.location.reload();
              }
            );
          } else if (winnerStatus == "O") {
            save(datas, datas.oplayer);
            alertDialog (
              "بازی تمام شد!",
              `<span class='O'>${datas.oplayer}</span> برنده شد!`,
              "منوی اصلی",
              "بازی جدید",
              function () {
                goto("index.html");
              },
              function () {
                window.location.reload();
              }
            );
          } else if (one != " " && two != " " && three != " " && four != " " && five != " " && six != " " && seven != " " && eight != " " && nine != " ") {
            save(datas, "_");
            alertDialog (
              "بازی تمام شد!",
              `<span class='text-dark nobody'>هردو</span> مساوی شدید.`,
              "منوی اصلی",
              "بازی جدید",
              function () {
                goto("index.html");
              },
              function () {
                window.location.reload();
              }
            );
          }
        }
        moves++;
      };
    }
  } else {
    toast("لطفا نام کاربران را بدرستی وارد کنید!", 1500);
  }

};

function checkWinner() {
  var one = document.getElementById('one').innerHTML;
  var two = document.getElementById('two').innerHTML;
  var three = document.getElementById('three').innerHTML;
  var four = document.getElementById('four').innerHTML;
  var five = document.getElementById('five').innerHTML;
  var six = document.getElementById('six').innerHTML;
  var seven = document.getElementById('seven').innerHTML;
  var eight = document.getElementById('eight').innerHTML;
  var nine = document.getElementById('nine').innerHTML;

  var all = one+two+three+four+five+six+seven+eight+nine;

  if (one == "X" && two == "X" && three == "X" || four == "X" && five == "X" && six == "X" || seven == "X" && eight == "X" && nine == "X" || one == "X" && four == "X" && seven == "X" || two == "X" && five == "X" && eight == "X" || three == "X" && six == "X" && nine == "X" || one == "X" && five == "X" && nine == "X" || three == "X" && five == "X" && seven == "X") {
    return "X";
  } else if (one == "O" && two == "O" && three == "O" || four == "O" && five == "O" && six == "O" || seven == "O" && eight == "O" && nine == "O" || one == "O" && four == "O" && seven == "O" || two == "O" && five == "O" && eight == "O" || three == "O" && six == "O" && nine == "O" || one == "O" && five == "O" && nine == "O" || three == "O" && five == "O" && seven == "O") {
    return "O";
  } else if (all !== "         ") {
    return "equal";
  }
}

function goto(link) {
  document.body.innerHTML += `<a href="${link}" id="clickme"></a>`;
  document.getElementById("clickme").click();
}

function toast(text, time) {
  document.getElementById("BoxToastBox").innerHTML = `<div id='toastBox'>${text}</div>`;
  var x = document.getElementById("toastBox");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, time);
}

async function sleep(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

function alertDialog(title, description, button1, button2, btn1event, btn2event) {
  let element = document.getElementById("alert");
  let mtitle = document.getElementById("atitle");
  let mdescription = document.getElementById("adescription");
  let mbutton1 = document.getElementById("btn1");
  let mbutton2 = document.getElementById("btn2");

  console.log(element);

  element.style = "visibility: visible;";
  mtitle.innerHTML = title;
  mdescription.innerHTML = description;
  mbutton1.innerHTML = button1;
  mbutton2.innerHTML = button2;

  mbutton1.onclick = btn1event;
  mbutton2.onclick = btn2event;
}
function save(datas, winner) {
  let date = new Date();
  let now = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  localStorage.setItem(now, datas.xplayer+"|"+datas.oplayer+"|"+datas.starter+"|"+winnerStatus);
  localStorage.setItem("GamePlayes", localStorage.getItem("GamePlayes")+"|"+now);
}