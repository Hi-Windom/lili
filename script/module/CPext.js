import { CP_container_extension } from "./XML/extend_CPDialog_container_extension.js";
const sleep = (timeout= 1000)=>new Promise((resolve, reject)=>{
  setTimeout(resolve, timeout);
});
// 可以使用 bluebird模块中的 bluebird.delay() 替换 sleep()
// const bluebird = ruquire('bluebird');
// let timer = async(timeout) => {
//     await sleep(timeout);
// }
// timer(1000);
async function extension_injury() {
  while(!document.querySelector("#SC-CP #sc-custom-container-extension")) {
    await sleep(1000);
  }
  setTimeout(() => {
    document.querySelector("#SC-CP #sc-custom-container-extension").innerHTML =
      CP_container_extension;
    document
      .querySelector("#SC-CP #sc-custom-container-extension")
      .addEventListener("click", (e) => {
        console.log(e);
        let xyz = [e.target, e.target.parentNode, e.target.parentNode.parentNode];
        xyz.forEach((i) => {
          i.attributes["data-type"] && i.attributes["data-type"].value == "goBack"
            ? (document.querySelector("#SC-CP #configBazaarReadme").style.right =
                "-100%")
            : null;
        });
        xyz.forEach((i) => {
          i.classList.contains("b3-card")
            ? (document.querySelector("#SC-CP #configBazaarReadme").style.right =
                "0px")
            : null;
        });
      });
  }, 1000);
  
}

extension_injury();