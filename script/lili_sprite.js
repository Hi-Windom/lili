var neko_container = document.createElement("div");
var neko = document.createElement("div");
neko.id = "neko";
document.body.appendChild(neko_container);
neko_container.appendChild(neko);
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
  if (e.button == 0) {
    console.log("鼠标左键!");
  } else if (e.button == 2) {
    console.log("鼠标右键!");
    var sprite_menu = neko_container.querySelector("#sprite_menu");
    if (sprite_menu) {
      sprite_menu.classList.remove("fn__none");
      console.log(document.body.offsetHeight - neko.offsetTop);
      console.log(neko.offsetTop);
      console.log(document.body.offsetHeight - neko.offsetTop > neko.offsetTop);
      let isClose2Top =
        document.body.offsetHeight - neko.offsetTop > neko.offsetTop;
      let smTop = isClose2Top
        ? Math.max(neko.offsetTop + 60, 0)
        : Math.max(neko.offsetTop - sprite_menu.offsetHeight, 0);
      sprite_menu.style.top = smTop + "px";
      let isClose2Left =
        document.body.offsetWidth - neko.offsetLeft > neko.offsetLeft;
      let smLeft = isClose2Left
        ? Math.max(neko.offsetLeft + 60, 0)
        : Math.max(neko.offsetLeft - sprite_menu.offsetWidth, 0);
      sprite_menu.style.left = smLeft + "px";
    }
    e.stopPropagation();
  } else if (e.button == 1) {
    console.log("鼠标滚轮!");
  }
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
neko.ondragstart = function () {
  return false;
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
}, 2000);

var sprite_menu = document.createElement("div");
sprite_menu.className = "b3-menu fn__none";
sprite_menu.id = "sprite_menu";
// sprite_menu.style = "bottom: 32px;left: 5px";
sprite_menu.style = "max-height: 300px; overflow-y: auto;";
sprite_menu.innerHTML = `
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切2</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切3</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切4</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切5</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切6</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切7</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切8</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切9</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切10</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切11</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
<button class="b3-menu__item" draggable="true"><span class="b3-menu__label">剪切12</span><span class="b3-menu__accelerator">Ctrl+X</span></button>
`;
neko_container.appendChild(sprite_menu);
document.onclick = function () {
  sprite_menu.classList.add("fn__none");
};

var sprite_menu_selected_iterm;
sprite_menu.querySelectorAll(".b3-menu__item").forEach((b) => {
  b.ondragstart = dragStart;
  b.ondragend = dragEnd;
  b.ondragover = dragOver;
});
function dragOver(e) {
  var p = e.target;
  while (!p.classList.contains("b3-menu__item")) {
    p = p.parentNode;
  }
  //向前拖拽向后拖拽
  //拖动目标(drop)是不是在拖拽源(drag)的前面
  if (isBefore(sprite_menu_selected_iterm, p)) {
    p.parentNode.insertBefore(sprite_menu_selected_iterm, p);
  } else {
    p.parentNode.insertBefore(sprite_menu_selected_iterm, p.nextSibling);
  }
}

function dragEnd() {
  sprite_menu_selected_iterm = null;
}

function dragStart(e) {
  sprite_menu_selected_iterm = e.target;
  while (!sprite_menu_selected_iterm.classList.contains("b3-menu__item")) {
    sprite_menu_selected_iterm = sprite_menu_selected_iterm.parentNode;
  }
}

function isBefore(el1, el2) {
  var cur;
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  } else return false;
}
