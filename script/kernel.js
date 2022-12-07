import * as API from "./../../Sofill-/script/utils/api.min.js";
import * as config from "./../../Sofill-/script/config.js";
const fs = require("fs");
const winsay_ROOT = `${window.siyuan.config.system.confDir}\\appearance\\themes\\Sofill-\\`;

async function isFileExisted(path_way) {
  return new Promise((response) => {
    fs.access(path_way, (err) => {
      if (err) {
        response(false);
      } else {
        response(true);
      }
    });
  });
}

async function winsayKernel(path_way) {
  try {
    let xiao = await new Promise((resolve, reject) => {
      isFileExisted(path_way).then((response) => {
        if (response) {
          window.funs.loadScript(
            window.funs.addURLParam("/appearance/themes/Sofill-/theme.js"),
            undefined,
            true
          );
          console.log("Sofill- kernel loaded");
          resolve(true);
        } else {
          new Notification("Sofill- 内核损坏", {
            body: "请前往集市重装 Sofill- 后继续",
          }).onclick = () => console.log("Notification clicked!");
          reject(false);
        }
      });
    });
    return xiao;
  } catch (error) {
    console.log(error);
    return false;
  }
}

setTimeout(async () => {
  if (!window.siyuan.config.appearance.lightThemes.includes("Sofill-")) {
    new Notification("Sofill- 内核未安装", {
      body: "请前往集市安装 Sofill- 后继续",
    }).onclick = () => console.log("Notification clicked!");
  } else {
    let ready = await winsayKernel(`${winsay_ROOT}theme.js`);
    if (ready) {
      window.funs.loadScript(
        window.funs.addURLParam("/appearance/themes/Sofill=/script/VS.js"),
        undefined,
        true
      );
      window.funs.loadScript(
        window.funs.addURLParam("/appearance/themes/Sofill=/script/lili_sprite.js"),
        undefined,
        true
      );
      window.funs.loadScript(
        window.funs.addURLParam("/appearance/themes/Sofill=/script/module/CPext.js"),
        undefined,
        true
      );
    } else {
      console.error("no ready");
    }
  }
});
