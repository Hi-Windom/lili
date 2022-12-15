let fs = require("fs");
let path = require("path");
import * as API from "../../../../Sofill-/script/utils/api.min.js";
import { fetchPost, replaceLocalPath } from "../../../script/utils/liliFuns.js";
const { ipcRenderer } = require("electron");
const {
  app,
  BrowserWindow,
  dialog,
  getCurrentWindow,
  ipcMain,
} = require("@electron/remote");

ipcMain.on("siyuan-export-pdf-lili", (event, data) => {
  if (!window.siyuan.printWin) {return;}
  const mainWindow = getCurrentWindow();
  mainWindow.webContents.send("siyuan-export-pdf-lili", data);
});


let originalZoomFactor = 1;
export const renderPDF = (id) => {
  const localData = JSON.parse(
    localStorage.getItem("local-exportpdf") ||
      JSON.stringify({
        landscape: false,
        marginType: "0",
        scale: 1,
        pageSize: "A4",
        removeAssets: true,
        keepFold: false,
        mergeSubdocs: false,
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
  const html = `<!DOCTYPE html><html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="stylesheet" type="text/css" id="baseStyle" href="${servePath}/stage/build/export/base.css?${
    window.siyuan.config.system.kernelVersion
  }"/>
  <link rel="stylesheet" type="text/css" id="themeDefaultStyle" href="${servePath}/appearance/themes/daylight/${
    window.siyuan.config.appearance.customCSS && isDefault ? "custom" : "theme"
  }.css?${window.siyuan.config.system.kernelVersion}"/>
  ${themeStyle}
  <title>${window.siyuan.languages.export} PDF</title>
  <style>
      body {
        margin: 0;
      }
      #action {
        width: 200px;
        background: var(--b3-theme-background-light);
        padding: 16px;
        position: fixed;
        right: 0;
        top: 0;
        overflow: auto;
        bottom: 0;
      }
      #preview {
        max-width: unset;
        margin: 0 auto;
        position: absolute;
        right: 232px;
        left: 0;
      }
      #preview > .code-block,
      #preview > [data-type="NodeMathBlock"] {
        margin-left: auto;
        margin-right: auto;
     }
      #preview.exporting {
        position: inherit;
        max-width: none;
      }
      .exporting::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      pre code {
        max-height: none !important;
        word-break: break-all !important;
        white-space: pre-wrap !important;
      }
      .protyle-wysiwyg {
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
      }
      .b3-label {
        border-bottom: 1px solid var(--b3-theme-surface-lighter);
        display: block;
        color: var(--b3-theme-on-surface);
        padding-bottom: 16px;
        margin-bottom: 16px;
      }

  </style>
</head>
<body>
<div id="action">
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF0}
      </div>
      <span class="fn__hr"></span>
      <select class="b3-select" id="pageSize">
          <option ${
            localData.pageSize === "A3" ? "selected" : ""
          } value="A3">A3</option>
          <option ${
            localData.pageSize === "A4" ? "selected" : ""
          } value="A4">A4</option>
          <option ${
            localData.pageSize === "A5" ? "selected" : ""
          } value="A5">A5</option>
          <option ${
            localData.pageSize === "Legal" ? "selected" : ""
          } value="Legal">Legal</option>
          <option ${
            localData.pageSize === "Letter" ? "selected" : ""
          } value="Letter">Letter</option>
          <option ${
            localData.pageSize === "Tabloid" ? "selected" : ""
          } value="Tabloid">Tabloid</option>
      </select>
  </label>
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF2}
      </div>
      <span class="fn__hr"></span>
      <select class="b3-select" id="marginsType">
          <option ${
            localData.marginType === "0" ? "selected" : ""
          } value="0">Default</option>
          <option ${
            localData.marginType === "1" ? "selected" : ""
          } value="1">None</option>
          <option ${
            localData.marginType === "2" ? "selected" : ""
          } value="2">Minimal</option>
      </select>
  </label>
  <label class="b3-label">
      <div>
          页脚
      </div>
      <span class="fn__hr"></span>
      <select class="b3-select" id="footerTemplate">
          <option selected value="0">无页脚</option>
          <option value="1">原始页脚</option>
          <option value="2">思源导出水印</option>
      </select>
  </label>
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF3}
          <span id="scaleTip" style="float: right;color: var(--b3-theme-on-background);">${
            localData.scale || 1
          }</span>
      </div>
      <span class="fn__hr"></span>
      <input style="width: 192px" value="${
        localData.scale || 1
      }" id="scale" step="0.1" class="b3-slider" type="range" min="0.1" max="2">
  </label>
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF1}
      </div>
      <span class="fn__hr"></span>
    <input id="landscape" class="b3-switch" type="checkbox" ${
      localData.landscape ? "checked" : ""
    }>
  </label>
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF4}
      </div>
      <span class="fn__hr"></span>
      <input id="removeAssets" class="b3-switch" type="checkbox" ${
        localData.removeAssets ? "checked" : ""
      }>
  </label>
  <label class="b3-label">
      <div>
          ${window.siyuan.languages.exportPDF5}
      </div>
      <span class="fn__hr"></span>
      <input id="keepFold" class="b3-switch" type="checkbox" ${
        localData.keepFold ? "checked" : ""
      }>
  </label>
  <label class="b3-label">
        <div>
            ${window.siyuan.languages.exportPDF6}
        </div>
        <span class="fn__hr"></span>
        <input id="mergeSubdocs" class="b3-switch" type="checkbox" ${
          localData.mergeSubdocs ? "checked" : ""
        }>
    </label>
  <div class="fn__flex">
    <div class="fn__flex-1"></div>
    <button class="b3-button b3-button--cancel">${
      window.siyuan.languages.cancel
    }</button>
    <div class="fn__space"></div>
    <button class="b3-button b3-button--text">${
      window.siyuan.languages.confirm
    }</button>
  </div>
</div>
<div class="protyle-wysiwyg${
    window.siyuan.config.editor.displayBookmarkIcon
      ? " protyle-wysiwyg--attr"
      : ""
  }" id="preview">
  <div class="fn__loading" style="left:0"><img width="48px" src="${servePath}/stage/loading-pure.svg"></div>
</div>
<script src="${servePath}/appearance/icons/${
    window.siyuan.config.appearance.icon
  }/icon.js?${window.siyuan.config.system.kernelVersion}}"></script>
<script src="${servePath}/stage/build/export/protyle-method.js?${
    window.siyuan.config.system.kernelVersion
  }"></script>
<script src="${servePath}/stage/protyle/js/lute/lute.min.js?${
    window.siyuan.config.system.kernelVersion
  }"></script>
  <script type="module" src="${servePath}/appearance/themes/Sofill=/extension/Export_Helper/main.js?${
    window.siyuan.config.system.kernelVersion
  }"></script>
<script>
  let pdfLeft = 0;
  let pdfTop = 0;
  let width = "inherit";
  const previewElement = document.getElementById('preview');
    const setLineNumberWidth = (element) => {
        let width = 800
        switch (element.value) {
            case "A3":
              width = 842
              break;
            case "A4":
              width = 595
              break;
            case "A5":
              width = 420
              break;
            case "Legal":
            case "Letter":
              width = 612
              break;
            case "Tabloid":
              width = 792
              break;
        }
        previewElement.querySelectorAll('.hljs.protyle-linenumber').forEach((item) => {
            item.parentElement.style.width = width + "px";
            item.removeAttribute('data-render');
        })
        previewElement.querySelectorAll('[data-type="NodeMathBlock"]').forEach((item) => {
            item.style.width = width + "px";
        })
        Protyle.mathRender(previewElement, "${servePath}/stage/protyle", true);
        Protyle.highlightRender(previewElement, "${servePath}/stage/protyle");
    }
    const setPadding = () => {
        const isLandscape = document.querySelector("#landscape").checked;
        switch (document.querySelector("#marginsType").value) { // none
            case "0":
                if (isLandscape) {
                    pdfLeft = 0.42;
                    pdfTop = 0.42;
                } else {
                    pdfLeft = 0.54;
                    pdfTop = 1;
                }
                break;
            case "2": // minimal
                if (isLandscape) {
                    pdfLeft = 0.07;
                    pdfTop = 0.07;
                } else {
                    pdfLeft = 0.1;
                    pdfTop = 0.58;
                }
                break;
            case "1": // none
                if (isLandscape) {
                    pdfLeft = 0;
                    pdfTop = 0;
                } else {
                    pdfLeft = 0;
                    pdfTop = 0;
                }
                break;
        }
        document.getElementById('preview').style.padding = pdfTop + "in " + pdfLeft + "in";
        setTimeout(() => {
            previewElement.querySelectorAll("table").forEach(item => {
                if (item.clientWidth > item.parentElement.clientWidth) {
                    item.style.zoom = (item.parentElement.clientWidth / item.clientWidth).toFixed(2) - 0.01;
                    item.parentElement.style.overflow = "hidden";
                }
            })
        }, 300);
    }
    const setWidth = () => {
      const isLandscape = document.querySelector("#landscape").checked;
      switch (document.querySelector("#pageSize").value) {
          case "A3":
              if (isLandscape) {
                width = 420 + 3;
              } else {
                width = 297 + 5;
              }
              break;
          case "A4":
              if (isLandscape) {
                width = 297 + 13;
              } else {
                width = 210 + 5;
              }
              break;
          case "A5":
              if (isLandscape) {
                width = 210 + 10;
              } else {
                width = 148 + 7;
              }
              break;
          case "Legal":
              if (isLandscape) {
                width = 356 + 5;
              } else {
                width = 216 + 7;
              }
              break;
          case "Letter":
              if (isLandscape) {
                width = 279 + 4.5;
              } else {
                width = 216 + 4.5;
              }
              break;
          case "Tabloid":
              if (isLandscape) {
                width = 431 + 4.5;
              } else {
                width = 279 + 4.5;
              }
              break;
      }
      document.getElementById('preview').style.width = width + "mm";
      setTimeout(() => {
          previewElement.querySelectorAll("table").forEach(item => {
              if (item.clientWidth > item.parentElement.clientWidth) {
                  item.style.zoom = (item.parentElement.clientWidth / item.clientWidth).toFixed(2) - 0.01;
                  item.parentElement.style.overflow = "hidden";
              }
          })
      }, 300);
  }
    const fetchPost = (url, data, cb) => {
      console.log(data)
      fetch("${servePath}" + url, {
          method: "POST",
          body: JSON.stringify(data)
      }).then((response) => {
          return response.json();
      }).then((response) => {
          cb(response);
      })
  }
  const renderPreview = (html) => {
      previewElement.innerHTML = html;
      Protyle.mermaidRender(previewElement, "${servePath}/stage/protyle");
      Protyle.flowchartRender(previewElement, "${servePath}/stage/protyle");
      Protyle.graphvizRender(previewElement, "${servePath}/stage/protyle");
      Protyle.chartRender(previewElement, "${servePath}/stage/protyle");
      Protyle.mindmapRender(previewElement, "${servePath}/stage/protyle");
      Protyle.abcRender(previewElement, "${servePath}/stage/protyle");
      Protyle.plantumlRender(previewElement, "${servePath}/stage/protyle");
      Protyle.highlightRender(previewElement, "${servePath}/stage/protyle");
      setTimeout(() => {
        setWidth(previewElement);
          setLineNumberWidth(document.querySelector("#action #pageSize"));
      }, 600);
  }
  fetchPost("/api/export/exportPreviewHTML", {
      id: "${id}",
      keepFold: ${localData.keepFold},
      merge: ${localData.mergeSubdocs},
  }, response => {
      if (response.code === 1) {
          alert(response.msg)
          return;
      }
      document.title = '${
        window.siyuan.languages.export
      } PDF - ' + response.data.name
      window.siyuan = {
        config: {
          appearance: { mode: 0, codeBlockThemeDark: "${
            window.siyuan.config.appearance.codeBlockThemeDark
          }", codeBlockThemeLight: "${
    window.siyuan.config.appearance.codeBlockThemeLight
  }" },
          editor: { 
            codeLineWrap: true,
            codeLigatures: ${window.siyuan.config.editor.codeLigatures},
            plantUMLServePath: "${
              window.siyuan.config.editor.plantUMLServePath
            }",
            codeSyntaxHighlightLineNum: ${
              window.siyuan.config.editor.codeSyntaxHighlightLineNum
            },
            katexMacros: JSON.stringify(${
              window.siyuan.config.editor.katexMacros
            }),
          }
        },
        languages: {copy:"${window.siyuan.languages.copy}"}
      };
      previewElement.addEventListener("click", (event) => {
          let target = event.target;
          while (target && !target.isEqualNode(previewElement)) {
              if (target.tagName === "A") {
                  const linkAddress = target.getAttribute("href");
                  if (linkAddress.startsWith("#")) {
                      // 导出预览模式点击块引转换后的脚注跳转不正确 https://github.com/siyuan-note/siyuan/issues/5700
                      previewElement.querySelector(linkAddress).scrollIntoView();
                      event.stopPropagation();
                      event.preventDefault();
                      return;
                  }
              } else if (target.classList.contains("protyle-action__copy")) {
                  navigator.clipboard.writeText(target.parentElement.nextElementSibling.textContent.trimEnd());
                  event.preventDefault();
                  event.stopPropagation();
                  break;
              }
              target = target.parentElement;
          }
      });
      const actionElement = document.getElementById('action');
      const keepFoldElement = actionElement.querySelector('#keepFold');
      keepFoldElement.addEventListener('change', () => {
          refreshPreview();
      });
      const mergeSubdocsElement = actionElement.querySelector('#mergeSubdocs');
      mergeSubdocsElement.addEventListener('change', () => {
          refreshPreview();
      });
      
      const refreshPreview = () => {
        previewElement.innerHTML = '<div class="fn__loading" style="left:0"><img width="48px" src="${servePath}/stage/loading-pure.svg"></div>'
          fetchPost("/api/export/exportPreviewHTML", {
              id: "${id}",
              keepFold: keepFoldElement.checked,
              merge: mergeSubdocsElement.checked,
          }, response2 => {
              if (response2.code === 1) {
                  alert(response2.msg)
                  return;
              }
              setPadding();
              renderPreview(response2.data.content);
          })
      };
      actionElement.querySelector("#scale").addEventListener("input", () => {
          actionElement.querySelector("#scaleTip").innerText = actionElement.querySelector("#scale").value;
      })
      actionElement.querySelector("#marginsType").addEventListener('change', () => {
          setPadding(previewElement);
      });
      actionElement.querySelector("#landscape").addEventListener('change', () => {
          setPadding(previewElement);
          setWidth(previewElement);
      });
      actionElement.querySelector("#pageSize").addEventListener('change', () => {
        setWidth(previewElement);
    });
      actionElement.querySelector('.b3-button--cancel').addEventListener('click', () => {
          const {ipcRenderer}  = require("electron");
          ipcRenderer.send("siyuan-export-close")
      });
      actionElement.querySelector('.b3-button--text').addEventListener('click', () => {
          const {ipcRenderer}  = require("electron");
          ipcRenderer.send("siyuan-export-pdf-lili", {
            pdfOptions:{
              printBackground: true,
              landscape: actionElement.querySelector("#landscape").checked,
              marginType: actionElement.querySelector("#marginsType").value,
              margins: {
                top: pdfTop * 0.6,
                bottom: pdfTop * 0.6,
                left: 0,
                right: 0,
              },
              scale:  parseFloat(actionElement.querySelector("#scale").value),
              pageSize: actionElement.querySelector("#pageSize").value,
              footerTemplate: actionElement.querySelector("#footerTemplate").value,
            },
            left: previewElement.style.paddingLeft,
            keepFold: keepFoldElement.checked,
            mergeSubdocs: mergeSubdocsElement.checked,
            removeAssets: actionElement.querySelector("#removeAssets").checked,
            rootId: "${id}",
            rootTitle: response.data.name,
          })
          actionElement.remove();
          previewElement.classList.add("exporting");
          previewElement.style.paddingTop = "6px";
          previewElement.style.paddingBottom = "0";
      });
      setPadding();
      renderPreview(response.data.content);
  });
</script></body></html>`;
  const mainWindow = getCurrentWindow();
  window.siyuan.printWin = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: true,
    width: 1032,
    height: 800,
    resizable: true,
    frame: "darwin" === window.siyuan.config.system.os,
    icon: path.join(
      window.siyuan.config.system.appDir,
      "stage",
      "icon-large.png"
    ),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#f2f2f3",
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
    // 导出 PDF 预览界面不受主界面缩放影响 https://github.com/siyuan-note/siyuan/issues/6262
    window.siyuan.printWin.webContents.setZoomFactor(1);
  });
  fetchPost("/api/export/exportTempContent", { content: html }, (response) => {
    window.siyuan.printWin.loadURL(response.data.url);
  });
  ipcRenderer.once("siyuan-export-pdf-lili", (e, ipcData) => {
    dialog
      .showOpenDialog({
        title: window.siyuan.languages.export + " PDF",
        properties: ["createDirectory", "openDirectory"],
      })
      .then((result) => {
        if (result.canceled) {
          destroyPrintWindow();
          return;
        }
        API.通知(window.siyuan.languages.exporting);
        localStorage.setItem(
          "local-exportpdf",
          JSON.stringify(
            Object.assign(ipcData.pdfOptions, {
              removeAssets: ipcData.removeAssets,
              keepFold: ipcData.keepFold,
              mergeSubdocs: ipcData.mergeSubdocs,
            })
          )
        );
        try {
          ipcData.pdfOptions.displayHeaderFooter = true;
          ipcData.pdfOptions.headerTemplate = "<span></span>";
          switch(ipcData.pdfOptions.footerTemplate) {
            case "1":
              ipcData.pdfOptions.footerTemplate = ``;
              break;
            case "2":
              ipcData.pdfOptions.footerTemplate = `<div style="width:100%;margin:0 ${ipcData.left};display: flex;line-height:12px;">
              <div style="flex: 1"></div>
              <svg viewBox="0 0 32 32" style="height: 10px;width: 10px;">
                <path fill="#d23e31" d="M8.667 2.812c-0.221 0.219-0.396 0.417-0.39 0.438s-0.004 0.030-0.022 0.020c-0.047-0.029-0.397 0.337-0.362 0.376 0.016 0.018 0.011 0.022-0.013 0.008-0.045-0.025-0.244 0.173-0.244 0.243 0 0.023-0.013 0.033-0.029 0.023-0.037-0.023-0.127 0.074-0.096 0.104 0.013 0.013 0.002 0.023-0.023 0.023-0.060 0-0.234 0.174-0.234 0.234 0 0.025-0.010 0.036-0.023 0.024-0.024-0.024-0.336 0.264-0.753 0.692-0.7 0.72-1.286 1.291-1.304 1.274-0.012-0.012-0.021 0.009-0.021 0.046s-0.017 0.055-0.038 0.042c-0.035-0.021-0.055 0.029-0.042 0.105 0.002 0.016-0.017 0.024-0.043 0.019s-0.043 0.013-0.037 0.041c0.006 0.028-0.006 0.041-0.025 0.029s-0.128 0.075-0.24 0.193c-0.316 0.333-0.72 0.734-1.024 1.017-0.152 0.142-0.265 0.258-0.251 0.258s-0.030 0.047-0.1 0.105c-0.249 0.205-0.689 0.678-0.729 0.783-0.014 0.037-0.052 0.067-0.084 0.067s-0.059 0.027-0.059 0.059-0.014 0.051-0.030 0.041c-0.039-0.024-0.738 0.647-0.706 0.678 0.013 0.013 0.002 0.024-0.024 0.024s-0.134 0.090-0.239 0.2c-0.502 0.524-0.802 0.831-0.814 0.831-0.007 0-0.16 0.147-0.341 0.326l-0.328 0.326-0 9.032c-0 6.176 0.012 9.055 0.039 9.106 0.058 0.108 0.118 0.089 0.247-0.076 0.063-0.081 0.128-0.139 0.143-0.129s0.029-0.013 0.029-0.049 0.009-0.057 0.021-0.045c0.020 0.020 2.899-2.819 4.934-4.866 0.173-0.174 0.796-0.796 1.384-1.381s1.058-1.082 1.044-1.104c-0.013-0.022-0.008-0.029 0.012-0.017 0.052 0.032 0.25-0.159 0.218-0.21-0.015-0.024-0.008-0.031 0.016-0.016 0.043 0.027 0.199-0.114 0.199-0.181 0-0.020 0.009-0.028 0.021-0.017 0.071 0.072 0.863-0.833 0.842-0.963-0.012-0.074-0.022-4.185-0.022-9.136s-0.013-9.001-0.029-8.999-0.209 0.183-0.429 0.402zM22.214 2.895c-0.268 0.268-0.487 0.51-0.487 0.54s-0.011 0.042-0.023 0.029c-0.018-0.019-1.229 1.165-2.765 2.703-0.084 0.084-0.771 0.774-1.527 1.532l-1.374 1.379v9.15c0 5.033 0.009 9.15 0.021 9.15 0.042 0 0.203-0.183 0.181-0.206-0.013-0.013 0.001-0.023 0.031-0.024s0.166-0.124 0.302-0.275c0.136-0.15 0.358-0.377 0.492-0.505s0.487-0.478 0.783-0.78c0.296-0.302 0.647-0.654 0.78-0.783 0.679-0.66 1.153-1.132 1.139-1.132-0.009 0 0.141-0.16 0.333-0.356s0.362-0.35 0.378-0.341 0.029-0.015 0.029-0.051 0.011-0.055 0.023-0.042c0.029 0.029 0.129-0.067 0.129-0.125 0-0.023 0.013-0.036 0.029-0.027 0.027 0.016 0.23-0.17 0.21-0.192-0.005-0.006 0.003-0.014 0.019-0.018 0.053-0.014 0.116-0.088 0.099-0.117-0.010-0.016 0.011-0.029 0.045-0.029s0.051-0.017 0.038-0.038c-0.013-0.021-0.008-0.038 0.011-0.038s0.407-0.369 0.862-0.819l0.827-0.819v-9.068c0-4.988-0.011-9.095-0.023-9.128-0.036-0.094-0.041-0.089-0.559 0.428z"></path>
                <path fill="#3b3e43" d="M9.126 2.368c0 0.021 0.026 0.038 0.057 0.038s0.057-0.017 0.057-0.038c0-0.021-0.026-0.038-0.057-0.038s-0.057 0.017-0.057 0.038zM9.228 2.431c-0.014 0.014-0.025 4.134-0.024 9.156l0.002 9.13 1.626 1.604c1.36 1.341 3.41 3.366 4.223 4.17 0.11 0.109 0.347 0.353 0.525 0.542s0.346 0.345 0.372 0.346c0.038 0.002 0.048-1.851 0.048-9.145v-9.147l-0.176-0.161c-0.097-0.088-0.282-0.269-0.411-0.4-0.204-0.207-0.758-0.763-1.557-1.561-0.123-0.123-0.465-0.47-0.759-0.769s-0.534-0.535-0.534-0.523-0.116-0.1-0.258-0.249c-0.142-0.149-0.524-0.536-0.85-0.86-0.654-0.651-0.8-0.798-1.597-1.604-0.537-0.543-0.58-0.579-0.631-0.528zM22.859 2.491c-0.013 0.047-0.023 4.164-0.023 9.149l-0 9.063 4.487 4.484c3.557 3.554 4.507 4.484 4.583 4.484h0.095v-18.218l-4.525-4.524c-2.489-2.488-4.54-4.524-4.559-4.524s-0.044 0.039-0.057 0.086z"></path>
                <path d="M22.796 2.396c-0.017 3.266-0.010 18.289 0.009 18.269 0.037-0.037 0.057-18.298 0.019-18.298-0.016 0-0.029 0.013-0.029 0.029zM9.129 11.447c0.002 4.972 0.017 9.084 0.034 9.136s0.036-4.016 0.044-9.041c0.011-7.29 0.004-9.136-0.034-9.136s-0.047 1.831-0.044 9.041zM16.018 18.234c0 5.041 0.005 7.097 0.010 4.57s0.006-6.651 0-9.165c-0.006-2.513-0.010-0.446-0.010 4.595zM21.65 21.795l-0.247 0.258 0.258-0.247c0.24-0.229 0.275-0.269 0.247-0.269-0.006 0-0.122 0.116-0.258 0.258z"></path>
                <path d="M4.113 7.332c-0.036 0.042-0.052 0.076-0.036 0.076s0.059-0.035 0.095-0.076c0.036-0.042 0.052-0.076 0.036-0.076s-0.059 0.035-0.095 0.076zM2.578 8.857c-0.014 0.023-0.012 0.041 0.006 0.041s0.005 0.017-0.026 0.038c-0.040 0.026-0.042 0.037-0.008 0.038 0.027 0 0.059-0.026 0.071-0.059 0.027-0.071-0.006-0.116-0.042-0.058zM20.098 23.32c-0.193 0.196-0.338 0.362-0.325 0.37s0.183-0.147 0.377-0.342c0.194-0.195 0.34-0.362 0.325-0.37s-0.185 0.146-0.377 0.342zM3.796 26.053l-0.112 0.124 0.124-0.112c0.068-0.062 0.124-0.117 0.124-0.124 0-0.029-0.031-0.004-0.136 0.112zM0.247 29.557c-0.038 0.042-0.060 0.076-0.050 0.076s0.059-0.035 0.107-0.076 0.071-0.076 0.050-0.076c-0.021 0-0.069 0.035-0.107 0.076z"></path>
              </svg>
              <a style="text-decoration:none;color:#4285f4;font-size: 8px;margin-left: 4px" href="https://b3log.org/siyuan">${window.siyuan.languages.exportBySiYuan}</a>
          </div>`;
              break;
            case "0":
            default:
              ipcData.pdfOptions.footerTemplate = `<span></span>`;
              break;
          }
          window.siyuan.printWin.webContents
            .printToPDF(ipcData.pdfOptions)
            .then((pdfData) => {
              fetchPost(
                "/api/export/exportHTML",
                {
                  id: ipcData.rootId,
                  pdf: true,
                  removeAssets: ipcData.removeAssets,
                  merge: ipcData.mergeSubdocs,
                  savePath: result.filePaths[0],
                },
                () => {
                  const pdfFilePath = path.join(
                    result.filePaths[0],
                    replaceLocalPath(ipcData.rootTitle) + ".pdf"
                  );
                  fs.writeFileSync(pdfFilePath, pdfData);
                  destroyPrintWindow();
                  fetchPost(
                    "/api/export/addPDFOutline",
                    {
                      id: ipcData.rootId,
                      merge: ipcData.mergeSubdocs,
                      path: pdfFilePath,
                    },
                    () => {
                      API.通知(`${window.siyuan.languages.exported}`);
                      if (ipcData.removeAssets) {
                        const removePromise = (dir) => {
                          return new Promise(function (resolve) {
                            //先读文件夹
                            fs.stat(dir, function (err, stat) {
                              if (stat) {
                                if (stat.isDirectory()) {
                                  fs.readdir(dir, function (err, files) {
                                    files = files.map((file) =>
                                      path.join(dir, file)
                                    ); // a/b  a/m
                                    Promise.all(
                                      files.map((file) => removePromise(file))
                                    ).then(function () {
                                      fs.rmdir(dir, resolve);
                                    });
                                  });
                                } else {
                                  fs.unlink(dir, resolve);
                                }
                              }
                            });
                          });
                        };
                        removePromise(path.join(result.filePaths[0], "assets"));
                      }
                    }
                  );
                }
              );
            })
            .catch((error) => {
              API.通知("Export PDF error:" + error, 0, "error");
              destroyPrintWindow();
            });
        } catch (e) {
          API.通知("Export PDF failed: " + e, 0, "error");
          destroyPrintWindow();
        }
        window.siyuan.printWin.hide();
      });
  });
};

function destroyPrintWindow() {
  getCurrentWindow().webContents.setZoomFactor(originalZoomFactor);
  window.siyuan.printWin.destroy();
}

