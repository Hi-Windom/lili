var fs = null;

if (
  document.getElementsByTagName("body")[0].classList.contains("android")
    ? false
    : document
        .getElementsByTagName("body")[0]
        .classList.contains("body--desktop")
    ? false
    : window.siyuan.config.system.os == "windows" ||
      window.siyuan.config.system.os == "darwin"
    ? true
    : false
) {
  fs = require("fs");
}

export const fetchPost = (url, data, cb, headers) => {
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

export async function isFileExisted(path_way) {
  return new Promise((response) => {
    fs
      ? fs.access(path_way, (err) => {
          if (err) {
            response(false);
          } else {
            response(true);
          }
        })
      : null;
  });
}
