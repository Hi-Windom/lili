import { CP_container_extension } from "./XML/extend_CPDialog_container_extension.js";
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
}, 3000);
