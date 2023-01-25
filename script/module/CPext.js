import {
  CP_container_extension,
  configBazaarS3,
  configBazaarPlugin,
} from "./XML/extend_CPDialog_container_extension.js";
import * as API from "../../eHiWindom/winsay/script/utils/api.min.js";
const fs = require("fs");
const path = require("path");
const sleep = (timeout = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });

async function extension_injury() {
  while (!document.querySelector("#SC-CP #sc-custom-container-extension")) {
    await sleep(1000);
  }
  const ec = document.querySelector("#SC-CP #sc-custom-container-extension");
  setTimeout(() => {
    ec.innerHTML = CP_container_extension;
    ec.querySelector("#configBazaarS3").innerHTML = configBazaarS3;
    ec.querySelector("#configBazaarPlugin").innerHTML = configBazaarPlugin;
    ec.addEventListener("click", (e) => {
      console.log(e);
      let xyz = [e.target, e.target.parentNode, e.target.parentNode.parentNode];
      xyz.forEach((i) => {
        i.attributes["data-type"] && i.attributes["data-type"].value == "goBack"
          ? (document.querySelector("#SC-CP #configBazaarReadme").style.right =
              "-100%")
          : null;
        if (
          i.attributes["data-type"] &&
          i.classList.contains("item") &&
          i.attributes["data-type"].value
        ) {
          ec.querySelectorAll(".layout-tab-bar>.item").forEach((e) => {
            e.attributes["data-type"].value == i.attributes["data-type"].value
              ? e.classList.add("item--focus")
              : e.classList.remove("item--focus");
          });
          ec.querySelectorAll(".bazaarPanel").forEach((e) => {
            e.attributes["data-type"].value == i.attributes["data-type"].value
              ? e.classList.remove("fn__none")
              : e.classList.add("fn__none");
          });
        }
      });
      xyz.forEach((i) => {
        let rm = document.querySelector("#SC-CP #configBazaarReadme");
        if (i.classList.contains("b3-card")) {
          let rmP = path.join(
            window.siyuan.config.system.confDir,
            "appearance",
            "themes",
            "Sofill=",
            "extension",
            i.attributes["data-bazaar"].value,
            i.attributes["data-name"].value,
            "README.html"
          );
          fs.readFile(
            rmP,
            "utf-8",
            (err,data)=>{if(err){API.通知(err)}else{rm.querySelector(".item__readme").innerHTML = data}}
          );
          rm.querySelector(".item__preview").style = `background-image: url(${i.querySelector(".b3-card__img>img").attributes["src"].value})`;
          rm.querySelector(".item__title").innerHTML = i.attributes["data-name"].value;
          rm.style.right = "0px";
        }
        if (i.classList.contains("SC-config-button")) {
          let read = rm.querySelector("#read-me");
          let conf = rm.querySelector("#config-me");
          let EVAL = rm.querySelector("#eval-me").innerHTML;
          if (conf.classList.contains("fn__none")) {
            conf.classList.remove("fn__none");
            read.classList.add("fn__none");
            eval(EVAL);
          } else {
            read.classList.remove("fn__none");
            conf.classList.add("fn__none");
          }
        }
      });
    });
  }, 1000);
}

extension_injury();
