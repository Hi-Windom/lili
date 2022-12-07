var neko = document.createElement("div");
neko.id = "neko";
document.body.appendChild(neko);
var nekoW = neko.offsetWidth;
var nekoH = neko.offsetHeight;
var cuntW = 0;
var cuntH = 0;
var latestX = localStorage.getItem("SC_lili_neko_left");
var latestY = localStorage.getItem("SC_lili_neko_top");
var latestD = localStorage.getItem("SC_lili_neko_direction");
neko.style.left = latestX
  ? latestX
  : parseInt(Math.random() * (document.body.offsetWidth - nekoW)) + "px";
neko.style.top = latestY
  ? latestY
  : parseInt(Math.random() * (document.body.offsetHeight - nekoH)) + "px";
neko.direction = latestD ? latestD : null;
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
  localStorage.setItem("SC_lili_neko_left", obj.style.left);
  localStorage.setItem("SC_lili_neko_top", obj.style.top);
}
function rate(obj, a) {
  //  console.log(a);
  obj.style.transform = " rotate(" + a + ")";
}
function action(obj) {
  var dir = obj.direction;
  switch (dir) {
    case "left":
      obj.style.pointerEvents = "none";
      obj.style.transition = "all .31s ease .58s";
      obj.style.translate = "23px";
      obj.classList.add("neko-side");
      obj.style.pointerEvents = "all";
      break;
    case "right":
      // rate(obj, "-90deg");
      obj.style.pointerEvents = "none";
      obj.style.transition = "all .31s ease .58s";
      obj.style.translate = "15px";
      obj.classList.add("neko-side");
      obj.style.pointerEvents = "all";
      break;
    case "top":
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
    if (e.clientX - nekoL < 13) {
      neko.direction = "left";
    } else if (e.clientY - nekoT < 5) {
      // neko.direction = "top";
    } else if (e.clientX - nekoL > document.body.offsetWidth - nekoW - 13) {
      neko.direction = "right";
    } else if (e.clientY - nekoT > document.body.offsetHeight - nekoH - 5) {
      // neko.direction = "bottom";
    } else {
      neko.direction = null;
    }
    localStorage.setItem("SC_lili_neko_direction", neko.direction);
    move(neko, 0, 0);
  };
};
neko.onmouseover = function () {
  document.onmouseleave = null;
  move(this, 0, 0);
  rate(this, 0);
  this.style.transition = "border-radius .13s ease 0s";
  this.classList.remove("neko-side");
  this.style.translate = "none";
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
setTimeout(() => {
  action(neko);
},2000)