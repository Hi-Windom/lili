import * as config from "./../../Sofill-/script/config.js";
import { ConfirmDialog } from "./../../Sofill-/script/module/CPM.js";
import * as CD from "./../../Sofill-/script/module/XML/ConfirmDialog.js";
import { isFileExisted } from "./utils/liliFuns.js";
var fs = null;
var lili = null;

if (
  document.getElementsByTagName("body")[0].classList.contains("android")
    ? false
    : document
        .getElementsByTagName("body")[0]
        .classList.contains("body--desktop")
    ? false
    : window.siyuan.config.system.os == "windows"
    ? true
    : false
) {
  fs = require("fs");
  lili = true;
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
    console.log(xiao);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

setTimeout(() => {
  if (!window.siyuan.config.appearance.lightThemes.includes("Sofill-")) {
    new Notification("Sofill- 内核未安装", {
      body: "请前往集市安装 Sofill- 后继续",
    }).onclick = () => console.log("Notification clicked!");
  } else {
    let ready = winsayKernel(`${config.winsay_ROOT_ABS}theme.js`);
    if (ready) {
      if (lili) {
        window.funs.loadScript(
          window.funs.addURLParam("/appearance/themes/Sofill=/script/VS.js"),
          undefined,
          true
        );
        window.funs.loadScript(
          window.funs.addURLParam(
            "/appearance/themes/Sofill=/script/lili_sprite.js"
          ),
          undefined,
          true
        );
        window.funs.loadScript(
          window.funs.addURLParam(
            "/appearance/themes/Sofill=/script/module/CPext.js"
          ),
          undefined,
          true
        );
      } else {
        window.funs.loadScript(
          window.funs.addURLParam("/appearance/themes/Sofill-/theme.js"),
          undefined,
          true
        );
        let once = new ConfirmDialog({
          isCancel: true,
          dragable: false,
          XML: CD.ConfirmDialog8,
          success() {
            console.log("点击了确定");
          },
          cancel() {
            console.log("点击了取消");
          },
          maskable: true,
        });
        once.open(() => {
          document.getElementById(
            "UpdateInfo"
          ).innerHTML = `注意：当前正在不支持的平台使用 ${config.ThemeName} 主题，仅为您加载 Sofill- 内核！若想体验 Sofill= 主题，请使用思源笔记 Windows 客户端`;
          document.getElementById(
            "CoverWarming"
          ).innerHTML = `当前环境推荐使用全平台支持的 Sofill- 主题`;
        });
      }
    } else {
      new Notification("No Ready", {
        body: "出了点问题，主题还没准备好",
      }).onclick = () => console.log("Notification clicked!");
      console.error("no ready");
    }
  }
});
