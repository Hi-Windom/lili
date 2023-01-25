const themeRootDirName = "Sofill="; // 在此修改主题根目录文件夹名。注意：请确保正确填写，默认为 "Sofill=" 会自动判断文件夹名，因此一般无需修改此项
window.lili = {
  funs: {},
  ekits: {},
  where: {
    themeRoot: `/appearance/themes/${themeRootDirName}/`,
    localThemeName: themeRootDirName,
  },
  storage: {},
};
window.lili_proxy = new Proxy(window.lili, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  },
});

switch (window.siyuan.config.appearance.mode) {
  case 1:
    document.body.classList.add("mode--dark");
    if (themeRootDirName === "Sofill=") {
      window.lili.where.localThemeName =
        window.siyuan.config.appearance.themeDark;
      window.lili.where.themeRoot = new URL(themeStyle.href).pathname.replace(
        "theme.css",
        ""
      );
    }
    break;
  default:
    document.body.classList.add("mode--light");
    if (themeRootDirName === "Sofill=") {
      window.lili.where.localThemeName =
        window.siyuan.config.appearance.themeLight;
      window.lili.where.themeRoot = new URL(themeStyle.href).pathname.replace(
        "theme.css",
        ""
      );
    }
    break;
}

window.lili.funs.loadStyle = function (href, id = null) {
  let style = document.createElement("link");
  if (id) style.id = id;
  style.type = "text/css";
  style.rel = "stylesheet";
  style.href = href;
  document.head.appendChild(style);
  return style;
};
window.lili.funs.updateStyle = function (id, href) {
  let style = document.getElementById(id);
  if (style) {
    style.setAttribute("href", href);
    return style
  } else {
    return window.lili.funs.loadStyle(href, id);
  }
};
window.lili.funs.loadScript = function (
  src,
  type = "module",
  async = false,
  defer = false
) {
  const script = document.createElement("script");
  if (type) script.type = type;
  if (async) script.async = true;
  if (defer) script.defer = true;
  script.src = src;
  document.head.appendChild(script);
  return script;
};
window.lili.funs.addURLParam = function (
  url,
  param = {
    v: window.siyuan.config.appearance.themeVer,
  }
) {
  let new_url;
  switch (true) {
    case url.startsWith("//"):
      new_url = new URL(`https:${url}`);
      break;
    case url.startsWith("http://"):
    case url.startsWith("https://"):
      new_url = new URL(url);
      break;
    case url.startsWith("/"):
      new_url = new URL(url, window.location.origin);
      break;
    default:
      new_url = new URL(url, window.location.origin + window.location.pathname);
      break;
  }
  for (let [key, value] of Object.entries(param)) {
    new_url.searchParams.set(key, value);
  }
  switch (true) {
    case url.startsWith("//"):
      return new_url.href.substring(new_url.protocol.length);
    case url.startsWith("http://"):
    case url.startsWith("https://"):
      return new_url.href;
    case url.startsWith("/"):
      return new_url.href.substring(new_url.origin.length);
    default:
      return new_url.href.substring(
        (window.location.origin + window.location.pathname).length
      );
  }
};

window.lili.funs.loadScript(
  window.lili.funs.addURLParam(
    `${window.lili.where.themeRoot}script/lib/sweetalert2.all.min.js`
  ),
  undefined,
  true,
  true
).onload = () => {
  window.lili.funs.loadScript(
    window.lili.funs.addURLParam(
      `${window.lili.where.themeRoot}script/kernel.js`
    ),
    undefined,
    true,
    true
  );
};
