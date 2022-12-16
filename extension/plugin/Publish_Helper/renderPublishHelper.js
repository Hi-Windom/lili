let fs = require("fs");
let path = require("path");
import { fetchPost } from "../../../script/utils/liliFuns.js";
const {
  app,
  BrowserWindow,
  dialog,
  getCurrentWindow,
  ipcRenderer,
} = require("@electron/remote");

let originalZoomFactor = 1;
export const renderPublishHelper = (id) => {
  const localData = JSON.parse(
    localStorage.getItem("local-exportpdf") ||
      JSON.stringify({
        landscape: false,
        marginType: "0",
        scale: 1,
        pageSize: "A4",
        removeAssets: true,
        keepFold: false,
      })
  );
  const servePath = window.location.protocol + "//" + window.location.host;
  const isDefault =
    (window.siyuan.config.appearance.mode === 1 &&
      window.siyuan.config.appearance.themeDark === "midnight") ||
    (window.siyuan.config.appearance.mode === 0 &&
      window.siyuan.config.appearance.themeLight === "daylight");
  let themeStyle = "";
  if (!isDefault) {
    themeStyle = `<link rel="stylesheet" type="text/css" id="themeStyle" href="${servePath}/appearance/themes/${
      window.siyuan.config.appearance.themeLight
    }/${window.siyuan.config.appearance.customCSS ? "custom" : "theme"}.css?${
      window.siyuan.config.system.kernelVersion
    }"/>`;
  }

  new Promise(function (html) {
    fs.readFile(
      `${window.siyuan.config.system.dataDir}/widgets/sy-post-publisher/index.html`,
      function (err, data) {
        if (err) {
          console.log(err);
        }
        var txt = data.toString().replace(/<!--.*-->/gs, "");
        html(txt);
      }
    );
  }).then(function (html) {
    const mainWindow = getCurrentWindow();
    window.siyuan.printWin = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      show: true,
      width: 900,
      height: 680,
      resizable: true,
      frame: true,
      icon: path.join(
        window.siyuan.config.system.dataDir,
        "widgets",
        "sy-post-publisher",
        "favicon.ico"
      ),
      titleBarStyle: "hidden",
      titleBarOverlay: {
        color: "#cccccca5",
        symbolColor: "black",
      },
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webviewTag: true,
        webSecurity: false,
      },
    });
    window.siyuan.printWin.webContents.userAgent = `SiYuan/${app.getVersion()} https://b3log.org/siyuan Electron`;
    window.siyuan.printWin.once("ready-to-show", () => {
      window.siyuan.printWin.webContents.setZoomFactor(1);
    });
    fetchPost(
      "/api/export/exportTempContent",
      { content: html },
      (response) => {
        window.siyuan.printWin.loadURL(response.data.url);
      }
    );
    window.siyuan.printWin.webContents.on("dom-ready", () => {
      window.siyuan.printWin.webContents
        .executeJavaScript(
          `
      const waitForExternal = setInterval(()=>{
        if(document.getElementById("app")) {
          clearInterval(waitForExternal);
          var btn = document.createElement("button");
          btn.innerHTML = " ${window.siyuan.languages.cancel} ";
          btn.className = "b3-button b3-button--cancel";
          btn.id = "btn-cancel";
          document.getElementById("app").insertAdjacentElement("afterbegin",btn);
          document.querySelector('#btn-cancel').addEventListener('click', () => {
            const {ipcRenderer}  = require("electron");
            ipcRenderer.send("siyuan-export-close")
        });
        }
      }, 300);
      `,
          false,
          (result) => console.log("1")
        )
        .then((result) => console.log("2"));
    });
  });
};
