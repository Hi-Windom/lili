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
export const renderGraphHelper = (id) => {
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
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Graph</title>
      <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
      <script type="module" src="http://127.0.0.1:6806/widgets/Graph/lib/jquery-3.6.1.min.js"></script>
      <script>if (window.module) module = window.module;</script>
      <link rel="stylesheet" href="http://127.0.0.1:6806/widgets/Graph/lib/bootstrap-3.4.1-dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="http://127.0.0.1:6806/widgets/Graph/src/css/main.css" />
      <link rel="stylesheet" href="http://127.0.0.1:6806/widgets/Graph/lib/font-awesome.min.css" />
  </head>
  <body>
      <div class="container-fluid">
          <div id="mountNode">
              <div class="btn-group g6-toolbar-ul" role="group" aria-label="..."><button id="searchNote" type="button"
                      class="btn btn-default" data-toggle="tooltip" data-placement="top" title="搜索"><i
                          class="glyphicon glyphicon-search" aria-hidden="true"></i></button><button type="button"
                      class="btn btn-default" onclick="getAllLinksToGraph()" title="全局关系图"><i class="fa fa-spinner"
                          aria-hidden="true"></i></button><button type="file" class="btn btn-default"
                      onclick="select_file()" title="导入数据"><i class="glyphicon glyphicon-upload"
                          aria-hidden="true"></i></button><button type="button" class="btn btn-default"
                      onclick="saveData()" title="保存数据"><i class="glyphicon glyphicon-floppy-save"
                          aria-hidden="true"></i></button><button type="button" class="btn btn-default"
                      onclick="refreshGraph()" title="刷新画布布局"><i class="glyphicon glyphicon-refresh"
                          aria-hidden="true"></i></button><button type="button" class="btn btn-default"
                      onclick="getSuperNode()" title="超级节点高亮"><i class="fa fa-lightbulb-o"
                          aria-hidden="true"></i></button><button type="button" class="btn btn-default"
                      onclick="clearGraph()" title="清除画布"><i class="glyphicon glyphicon-trash"
                          aria-hidden="true"></i></button><input class="button" type="file" id="file"
                      onchange="importData(this.files)" style="display: none" /></div>
              <div id="rightNav" style="background-color:white;">
                  <ul id="rightNav-left" class="nav nav-pills nav-stacked">
                      <li id="tab0" role="presentation" class="selected"><a><i class="glyphicon glyphicon-remove"
                                  aria-hidden="true"></i></a></li>
                      <li id="tab1" role="presentation" class="active selected"><a href="#rightNav-tab1"><i
                                  class="glyphicon glyphicon-search" aria-hidden="true"></i></a></li>
                      <li id="tab2" role="presentation"><a href="#rightNav-tab2"><i class="glyphicon glyphicon-info-sign"
                                  aria-hidden="true"></i></a></li>
                  </ul>
                  <div id="rightNav-tab1" style="width: 100%;height: 100%">
                      <div class="panel">
                          <form class="form-inline">
                              <div class="form-group" style="display:flex;width: 100%;"><input type="text"
                                      class="form-control" id="text" placeholder="关键字"
                                      onkeydown="if(event.keyCode==13){return false}"
                                      style="width: 80%;margin-right: 5px;"><button id="btnGetNode" type="button"
                                      class="btn btn-default" onclick="getNote()">查询</button></div>
                          </form>
                      </div>
                      <div class="panel panel-default">
                          <div class="panel-heading">
                              <h3 class="panel-title"><i class="glyphicon glyphicon-info-sign"
                                      aria-hidden="true"></i>&nbsp&nbsp信息展示</h3>
                          </div>
                          <div class="list-group" id="note-info" style="overflow:auto;"></div>
                      </div>
                  </div>
                  <div id="rightNav-tab2" style="width: 100%;height: 100%;">
                      <div class="panel panel-default">
                          <div class="panel-heading">
                              <h3 class="panel-title"><i class="glyphicon glyphicon-info-sign"
                                      aria-hidden="true"></i>&nbsp&nbsp详细信息</h3>
                          </div>
                          <div class="panel-body" id="detailInfo" style="height: 100%;"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </body>
  <script
      type="text/javascript">
      function createScript(src, type) { let script = document.createElement('script'); script.src = src; script.async = false; script.type = type ? type : 'text/javascript'; document.body.appendChild(script); }; window.onload = () => { createScript("http://127.0.0.1:6806/widgets/Graph/lib/bootstrap-3.4.1-dist/js/bootstrap.min.js", null); createScript("http://127.0.0.1:6806/widgets/Graph/lib/g6.min.js", null); createScript("http://127.0.0.1:6806/widgets/Graph/main.js", "module"); };
      setTimeout(()=>{getAllLinksToGraph();},300)
      </script>
  </html>
  `;
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
      window.siyuan.config.system.appDir,
      "stage",
      "icon-large.png"
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
  window.siyuan.printWin.maximize();
  window.siyuan.printWin.webContents.userAgent = `SiYuan/${app.getVersion()} https://b3log.org/siyuan Electron`;
  window.siyuan.printWin.once("ready-to-show", () => {
    window.siyuan.printWin.webContents.setZoomFactor(1);
  });
  fetchPost("/api/export/exportTempContent", { content: html }, (response) => {
    window.siyuan.printWin.loadURL(response.data.url);
  });
  window.siyuan.printWin.webContents.on('dom-ready', ()=>{
    window.siyuan.printWin.webContents.executeJavaScript(`
    const waitForExternal = setInterval(()=>{
      if(document.getElementById("mountNode")) {
        clearInterval(waitForExternal);
        var btn = document.createElement("button");
        btn.innerHTML = " ${window.siyuan.languages.cancel} ";
        btn.className = "b3-button b3-button--cancel";
        btn.id = "btn-cancel";
        document.getElementById("mountNode").insertAdjacentElement("afterbegin",btn);
        document.querySelector('#btn-cancel').addEventListener('click', () => {
          const {ipcRenderer}  = require("electron");
          ipcRenderer.send("siyuan-export-close")
      });
      }
    }, 300);
    `, false, (result)=>console.log("1")).then((result)=>console.log("2"));
  })
};
