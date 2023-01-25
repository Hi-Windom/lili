import { isFileExisted } from "./utils/liliFuns.js";
var fs = null;
var lili = null;
var winsay_ROOT = `${window.lili.where.themeRoot}eHiWindom/winsay/`;
var winsay_ROOT_ABS = window.siyuan.config.system.confDir + winsay_ROOT;

if (
  document.body.classList.contains("android")
    ? false
    : document.body.classList.contains("body--desktop")
    ? false
    : window.siyuan.config.system.os == "windows"
    ? true
    : false
) {
  fs = require("fs");
  window.lili.isDesktopAppMode = true;
  const { exec } = require("child_process");
  const iconv = require("iconv-lite");
  const child = exec("node2 -v", { encoding: "buffer" });

  child.stdout.on("data", (data) => {
    console.log("stdout :", iconv.decode(data, "cp936"));
  });
  child.stderr.on("data", (err) => {
    console.log("error :", iconv.decode(err, "cp936"));
  });
}

async function winsayKernel(path_way) {
  try {
    let xiao = await new Promise((resolve, reject) => {
      isFileExisted(path_way).then((response) => {
        if (response) {
          window.lili.funs.loadScript(`${winsay_ROOT}theme.js`, true);
          console.log("Sofill- kernel loaded");
          resolve(true);
        } else {
          window.Sweetalert2.fire(
            "Sofill- 内核损坏！",
            "请前往集市重装 Sofill- 后继续。",
            "error"
          );
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
    window.Sweetalert2.fire(
      "未识别到 Sofill- 主题！",
      "请前往集市安装 Sofill- 后继续。<br>如已安装，请确保文件夹名称为 Sofill- 未修改。",
      "error"
    );
  } else {
    let ready = winsayKernel(`${winsay_ROOT_ABS}theme.js`);
    if (ready) {
      window.lili.funs.updateStyle(
        "winsayThemeStyle",
        `${winsay_ROOT}theme.css`
      ).onload = () => {
        console.log("ready");
      };
      window.lili.funs.loadScript(`${winsay_ROOT}theme.js`, true);
      if (window.lili.isDesktopAppMode) {
        window.lili.funs.loadScript(
          `${window.lili.where.themeRoot}script/VS.js`,
          true
        );
        window.lili.funs.loadScript(
          `${window.lili.where.themeRoot}script/lili_sprite.js`,
          true
        );
        window.lili.funs.loadScript(
          `${window.lili.where.themeRoot}script/module/CPext.js`,
          true
        );
      } else {
        window.Sweetalert2.fire(
          "仅为您加载 Sofill- 内核！",
          "当前正在不支持的平台使用 Sofill= 主题，若想体验 Sofill= 主题，请使用思源笔记 Windows 客户端",
          "error"
        );
      }
    } else {
      window.Sweetalert2.fire("出了点问题，主题还没准备好", "", "error");
      console.error("no ready");
    }
  }
});
