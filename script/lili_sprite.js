
var neko = document.createElement("div");
neko.id = "neko";
document.body.appendChild(neko);
var nekoW = neko.offsetWidth;
var nekoH = neko.offsetHeight;
var cuntW = 0;
var cuntH = 0;
neko.style.left =
  parseInt(Math.random() * (document.body.offsetWidth - nekoW)) + "px";
neko.style.top =
  parseInt(Math.random() * (document.body.offsetHeight - nekoH)) + "px";
function move(obj, w, h) {
  if (obj.direction === "left") {
    obj.style.left = 0 - w + "px";
  } else if (obj.direction === "right") {
    obj.style.left = document.body.offsetWidth - nekoW + w + "px";
  }
  if (obj.direction === "top") {
    obj.style.top = 0 - h + "px";
  } else if (obj.direction === "bottom") {
    obj.style.top = document.body.offsetHeight - nekoH + h + "px";
  }
}
function rate(obj, a) {
  //  console.log(a);
  obj.style.transform = " rotate(" + a + ")";
}
function translate(obj, a) {
  //  console.log(a);
  obj.style.transform = " translate(" + a + ")";
}
function action(obj) {
  var dir = obj.direction;
  switch (dir) {
    case "left":
      // rate(obj, "90deg");
      obj.style.pointerEvents = "none";
      obj.style.transition = "translate .31s ease .31s";
      obj.style.translate = "25px";
      obj.classList.add("neko-side");
      obj.style.pointerEvents = "all";
      break;
    case "right":
      // rate(obj, "-90deg");
      obj.style.pointerEvents = "none";
      obj.style.transition = "translate .31s ease .31s";
      obj.style.translate = "15px";
      obj.classList.add("neko-side");
      obj.style.pointerEvents = "all";
      break;
    case "top":
      rate(obj, "-180deg");
      break;
    default:
      rate(obj, "-0");
      break;
  }
}
neko.onmousedown = function (e) {
  var nekoL = e.clientX - neko.offsetLeft;
  var nekoT = e.clientY - neko.offsetTop;
  document.onmousemove = function (e) {
    cuntW = 0;
    cuntH = 0;
    neko.direction = "";
    neko.style.transition = "";
    neko.style.left = e.clientX - nekoL + "px";
    neko.style.top = e.clientY - nekoT + "px";
    if (e.clientX - nekoL < 15) {
      neko.direction = "left";
    }
    if (e.clientY - nekoT < 5) {
      neko.direction = "top";
    }
    if (e.clientX - nekoL > document.body.offsetWidth - nekoW - 15) {
      neko.direction = "right";
    }
    if (e.clientY - nekoT > document.body.offsetHeight - nekoH - 5) {
      neko.direction = "bottom";
    }
    move(neko, 0, 0);
  };
};
neko.onmouseover = function () {
  move(this, 0, 0);
  rate(this, 0);
  this.classList.remove("neko-side");
  this.style.translate = "0px";
};
neko.onmouseout = function () {
  move(this, nekoW / 2, nekoH / 2);
  action(this);
};
neko.onmouseup = function () {
  document.onmousemove = null;
  move(this, nekoW / 2, nekoH / 2);
  action(this);
};
window.onresize = function () {
  var bodyH = document.body.offsetHeight;
  var nekoT = neko.offsetTop;
  var bodyW = document.body.offsetWidth;
  var nekoL = neko.offsetLeft;
  if (nekoT + nekoH > bodyH) {
    neko.style.top = bodyH - nekoH + "px";
    cuntH++;
  }
  if (bodyH > nekoT && cuntH > 0) {
    neko.style.top = bodyH - nekoH + "px";
  }
  if (nekoL + nekoW > bodyW) {
    neko.style.left = bodyW - nekoW + "px";
    cuntW++;
  }
  if (bodyW > nekoL && cuntW > 0) {
    neko.style.left = bodyW - nekoW + "px";
  }
  move(neko, nekoW / 2, nekoH / 2);
};
