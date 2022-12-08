let fs = require("fs");
let path = require("path");
const {
  app,
  BrowserWindow,
  dialog,
  getCurrentWindow,
  ipcRenderer,
} = require("@electron/remote");

const fetchPost = (url, data, cb, headers) => {
  const init = {
    method: "POST",
  };
  if (data) {
    if (
      [
        "/api/search/searchRefBlock",
        "/api/graph/getGraph",
        "/api/graph/getLocalGraph",
      ].includes(url)
    ) {
      window.siyuan.reqIds[url] = new Date().getTime();
      if (data.type === "local" && url === "/api/graph/getLocalGraph") {
        // 当打开文档A的关系图、关系图、文档A后刷新，由于防止请求重复处理，文档A关系图无法渲染。
      } else {
        data.reqId = window.siyuan.reqIds[url];
      }
    }
    if (data instanceof FormData) {
      init.body = data;
    } else {
      init.body = JSON.stringify(data);
    }
  }
  if (headers) {
    init.headers = headers;
  }
  fetch(url, init)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (
        [
          "/api/search/searchRefBlock",
          "/api/graph/getGraph",
          "/api/graph/getLocalGraph",
        ].includes(url)
      ) {
        if (
          response.data.reqId &&
          window.siyuan.reqIds[url] &&
          window.siyuan.reqIds[url] > response.data.reqId
        ) {
          return;
        }
      }
      if (cb) {
        cb(response);
      }
    })
    .catch((e) => {
      console.warn("fetch post error", e);
      if (
        url === "/api/transactions" &&
        (e.message === "Failed to fetch" ||
          e.message === "Unexpected end of JSON input")
      ) {
        kernelError();
        return;
      }
      /// #if !BROWSER
      if (
        url === "/api/system/exit" ||
        url === "/api/system/setWorkspaceDir" ||
        (["/api/system/setUILayout", "/api/storage/setLocalStorage"].includes(
          url
        ) &&
          data.exit) // 内核中断，点关闭处理
      ) {
        ipcRenderer.send("siyuan-config-closetray");
        ipcRenderer.send("siyuan-quit");
      }
      /// #endif
    });
};

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
        max-width: 800px;
        margin: 0 auto;
        position: absolute;
        right: 232px;
        left: 0;
      }
      #preview > .code-block {
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
  <script src="${servePath}/appearance/themes/Sofill=/extension/Export_Helper/main.js?${
    window.siyuan.config.system.kernelVersion
  }"></script>
<script>
  let pdfLeft = 0;
  let pdfTop = 0;
  const setPadding = (previewElement) => {
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
          previewElement.querySelectorAll('.hljs.protyle-linenumber').forEach((item) => {
              item.removeAttribute('data-render');
          })
          Protyle.highlightRender(previewElement, "${servePath}/stage/protyle");
      }, 300);
  }
  const fetchPost = (url, data, cb) => {
      fetch("${servePath}" + url, {
          method: "POST",
          body: JSON.stringify(data)
      }).then((response) => {
          return response.json();
      }).then((response) => {
          cb(response);
      })
  }
  const renderPreview = (previewElement, html) => {
      previewElement.innerHTML = html;
      Protyle.mathRender(previewElement, "${servePath}/stage/protyle", true);
      Protyle.mermaidRender(previewElement, "${servePath}/stage/protyle");
      Protyle.flowchartRender(previewElement, "${servePath}/stage/protyle");
      Protyle.graphvizRender(previewElement, "${servePath}/stage/protyle");
      Protyle.chartRender(previewElement, "${servePath}/stage/protyle");
      Protyle.mindmapRender(previewElement, "${servePath}/stage/protyle");
      Protyle.abcRender(previewElement, "${servePath}/stage/protyle");
      Protyle.plantumlRender(previewElement, "${servePath}/stage/protyle");
  }
  fetchPost("/api/export/exportPreviewHTML", {
      id: "${id}",
      keepFold: ${localData.keepFold},
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
      const previewElement = document.getElementById('preview');
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
          previewElement.innerHTML = '<div class="fn__loading" style="left:0"><img width="48px" src="${servePath}/stage/loading-pure.svg"></div>'
          fetchPost("/api/export/exportPreviewHTML", {
              id: "${id}",
              keepFold: keepFoldElement.checked,
          }, response2 => {
              if (response2.code === 1) {
                  alert(response2.msg)
                  return;
              }
              setPadding(previewElement);
              renderPreview(previewElement, response2.data.content);
          })
      })
      actionElement.querySelector("#scale").addEventListener("input", () => {
          actionElement.querySelector("#scaleTip").innerText = actionElement.querySelector("#scale").value;
      })
      actionElement.querySelector("#marginsType").addEventListener('change', () => {
          setPadding(previewElement);
      });
      actionElement.querySelector("#landscape").addEventListener('change', () => {
          setPadding(previewElement);
      });
      actionElement.querySelector('.b3-button--cancel').addEventListener('click', () => {
          const {ipcRenderer}  = require("electron");
          ipcRenderer.send("siyuan-export-close")
      });
      actionElement.querySelector('.b3-button--text').addEventListener('click', () => {
          const {ipcRenderer}  = require("electron");
          ipcRenderer.send("siyuan-export-pdf", {
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
            },
            keepFold: keepFoldElement.checked,
            removeAssets: actionElement.querySelector("#removeAssets").checked,
            rootId: "${id}",
            rootTitle: response.data.name,
          })
          actionElement.remove();
          previewElement.classList.add("exporting");
          previewElement.style.paddingTop = "0";
          previewElement.style.paddingBottom = "0";
      });
      setPadding(previewElement);
      renderPreview(previewElement, response.data.content);
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
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: false,
    },
  });
  window.siyuan.printWin.webContents.userAgent = `SiYuan/${app.getVersion()} https://b3log.org/siyuan Electron`;
  window.siyuan.printWin.once("ready-to-show", () => {
    // 导出 PDF 预览界面不受主界面缩放影响 https://github.com/siyuan-note/siyuan/issues/6262
    window.siyuan.printWin.webContents.setZoomFactor(1);
  });
  fetchPost("/api/export/exportTempContent", { content: html }, (response) => {
    window.siyuan.printWin.loadURL(response.data.url);
  });
};
