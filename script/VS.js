import * as API from "./../../Sofill-/script/utils/api.min.js";

var apitoken = window.siyuan.config.api.token;
var SYIP = window.location.host;

async function lsNotebooks(ip) {
  let url = "http://" + ip + "/api/notebook/lsNotebooks";
  return API.request(url, "", "");
}

var nblist = lsNotebooks(SYIP);
nblist
  .then((result) => {
    console.log(result.data);
    return result.data.notebooks;
  })
  .then(async (NBList) => {
    for (let j = 0, len = NBList.length; j < len; j++) {
      if (NBList[j].closed) {
        // API.openNotebook(NBList[j].id); 需等待
      } else {
        // API.closeNotebook(NBList[j].id);
      }
    }
  });

