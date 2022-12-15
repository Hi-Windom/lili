export const CP_container_extension = `
<div class="fn__flex-column" style="height: 100%">
  <div class="layout-tab-bar fn__flex" style="position: sticky;top: 0;z-index: 3;">
    <div data-type="S3" class="item item--full">
      <span class="fn__flex-1"></span>
      <span class="item__text">主题形态</span>
      <span class="fn__flex-1"></span>
    </div>
    <div data-type="template" class="item item--full">
      <span class="fn__flex-1"></span>
      <span class="item__text">模板</span>
      <span class="fn__flex-1"></span>
    </div>
    <div data-type="icon" class="item item--full">
      <span class="fn__flex-1"></span>
      <span class="item__text">图标</span>
      <span class="fn__flex-1"></span>
    </div>
    <div data-type="plugin" class="item item--full">
      <span class="fn__flex-1"></span>
      <span class="item__text">插件</span>
      <span class="fn__flex-1"></span>
    </div>
    <div data-type="downloaded" class="item item--full">
      <span class="fn__flex-1"></span>
      <span class="item__text">已启用</span>
      <span class="fn__flex-1"></span>
    </div>
  </div>
  <div class="fn__flex-1">
    <div class="bazaarPanel" data-type="S3">
      <div class="fn__hr"></div>
      <div id="configBazaarS3">
        <div style="height: 477px;display: flex;align-items: center;justify-content: center;"><img
          src="/stage/loading-pure.svg"></div>
      </div>
    </div>
    <div class="fn__none bazaarPanel" data-type="template">
      <div class="fn__hr"></div>
      <div id="configBazaarTemplate">
        <div style="height: 477px;display: flex;align-items: center;justify-content: center;"><img
            src="/stage/loading-pure.svg"></div>
      </div>
    </div>
    <div class="fn__none bazaarPanel" data-type="icon">
      <div class="fn__hr"></div>
      <div id="configBazaarIcon">
        <div style="height: 477px;display: flex;align-items: center;justify-content: center;"><img
            src="/stage/loading-pure.svg"></div>
      </div>
    </div>
    <div class="fn__none bazaarPanel" data-type="plugin">
      <div class="fn__hr"></div>
      <div id="configBazaarPlugin">
        <div style="height: 477px;display: flex;align-items: center;justify-content: center;"><img
            src="/stage/loading-pure.svg"></div>
      </div>
    </div>
    <div class="bazaarPanel fn__none" data-type="downloaded">
      <div class="fn__hr"></div>
      <div class="fn__flex">
        <div class="fn__space"></div>
        <div class="fn__space"></div>
        <button data-type="myS3" class="b3-button">主题形态</button>
        <div class="fn__space"></div>
        <button data-type="myTemplate" class="b3-button b3-button--outline">模板</button>
        <div class="fn__space"></div>
        <button data-type="myIcon" class="b3-button b3-button--outline">图标</button>
        <div class="fn__space"></div>
        <button data-type="myPlugin" class="b3-button b3-button--outline">插件</button>
      </div>
      <div id="configBazaarDownloaded">
        <div style="height: 477px;display: flex;align-items: center;justify-content: center;"><img
            src="/stage/loading-pure.svg"></div>
      </div>
    </div>
  </div>
  <div id="configBazaarReadme" class="config-bazaar__readme" style="right: -100%;">
    <div class="item__side" style="
    max-height: 100%;
    box-sizing: border-box;
">
      <div class="fn__flex"><button class="b3-button b3-button--outline" data-type="goBack" title="Go back"><svg>
            <use xlink:href="#iconLeft"></use>
          </svg></button>
        <div class="item__nav">暗黑 主题</div>
      </div>
      <div class="fn__flex SC_mall_badge_container" style="justify-content: center;flex-wrap: wrap;"><img alt=""
          src="https://img.shields.io/badge/-%E4%BA%BA%E5%B7%A5%E4%BA%B2%E6%B5%8B-black?logo=AdGuard"><img alt=""
          src="https://img.shields.io/badge/-%E5%BC%80%E6%BA%90%E5%AE%A1%E6%A0%B8-131?logo=Git"><img alt=""
          src="https://img.shields.io/badge/-%E6%AD%A3%E7%89%88%E6%8E%88%E6%9D%83-black?logo=Google Fit"><img alt=""
          src="https://img.shields.io/badge/-%E5%AE%98%E6%96%B9%E5%87%BA%E5%93%81-black?logo=Opsgenie"></div><a
        href="https://github.com/Hi-Windom/winsay" target="_blank" class="item__title" title="GitHub Repo">Sofill-</a>
      <div class="fn__hr--b"></div>
      <div class="fn__hr--b"></div>
      <div style="line-height: 20px;"><span class="ft__smaller">Made with ❤️ by</span><br><a
          href="https://github.com/Hi-Windom" target="_blank" title="Creator">Soltus</a></div>
      <div class="fn__hr--b"></div>
      <div class="fn__hr--b"></div>
      <div class="fn__hr"></div>
      <div class="fn__hr"></div>
      <div class="fn__hr--b"></div>
      <div data-type="light,dark"><button class="b3-button" style="width: 168px"
          data-hash="16681e3e195d2d8b4eb366843dc0ee1f907e2c8d" data-name="Sofill-" data-bazaar="S3"
          data-url="https://github.com/Hi-Windom/winsay" data-type="install">下载</button></div>
    </div>
    <div class="item__main">
      <div class="item__preview"
        style="background-image: url(https://oss.b3logfile.com/package/Hi-Windom/winsay@16681e3e195d2d8b4eb366843dc0ee1f907e2c8d/preview.png?imageslim)">
      </div>
      <div class="item__readme b3-typography b3-typography--default" style="position:relative;">
      </div>
    </div>
  </div>
</div>
`

export const configBazaarS3 = `
<div class="b3-cards">
<div data-bazaar="S3" data-name="winsay" class="b3-card b3-card--current" data-type="light,dark"
  data-updated="2022-12-05T19:00:52Z">
  <div class="b3-card__img"><img
      src="https://oss.b3logfile.com/package/Hi-Windom/winsay@16681e3e195d2d8b4eb366843dc0ee1f907e2c8d/preview.png?imageView2/2/w/436/h/232">
  </div>
  <div class="b3-card__info fn__flex">
    <span class="fn__flex-center fn__ellipsis">Sofill-形态</span>
    <span class="fn__space"></span>
    <span class="fn__flex-1"></span>
    <svg class="svg fn__flex-center">
      <use xlink:href="#iconDownload"></use>
    </svg>
    <span class="fn__space"></span>
    <span class="fn__flex-center">2035</span>
  </div>
  <div class="b3-card__actions" data-name="Sofill-" data-url="https://github.com/Hi-Windom/winsay"
    data-hash="16681e3e195d2d8b4eb366843dc0ee1f907e2c8d">
    <div class="fn__flex-1"></div>
    <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="uninstall"
      aria-label="卸载">
      <svg>
        <use xlink:href="#iconTrashcan"></use>
      </svg>
    </span>
    <div class="fn__space fn__none"></div>
    <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="switch"
      aria-label="使用">
      <svg>
        <use xlink:href="#iconSelect"></use>
      </svg>
    </span>
    <div class="fn__space"></div>
    <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show"
      aria-label="更新">
      <svg class="ft__primary">
        <use xlink:href="#iconRefresh"></use>
      </svg>
    </span>
  </div>
</div>
</div>
`

export const configBazaarPlugin = `
<div class="b3-cards">
<div data-bazaar="plugin" data-name="DocTab_Helper" class="b3-card" data-type="dark,light" data-updated="2022-11-29T16:50:43Z">
<div class="b3-card__img"><img src="/appearance/themes/Sofill=/extension/plugin/DocTab_Helper/preview.png">
</div>
<div class="b3-card__info fn__flex">
  <span class="fn__flex-center fn__ellipsis">页签助手</span>
  <span class="fn__space"></span>
  <span class="fn__flex-1"></span>
  <svg class="svg fn__flex-center">
    <use xlink:href="#iconDownload"></use>
  </svg>
  <span class="fn__space"></span>
  <span class="fn__flex-center">7965</span>
</div>
<div class="b3-card__actions" data-name="页签助手" data-url=""
  data-hash="de08445523c22f1eddaf4800ea068fd4301033ef">
  <div class="fn__flex-1"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="uninstall"
    aria-label="卸载">
    <svg>
      <use xlink:href="#iconTrashcan"></use>
    </svg>
  </span>
  <div class="fn__space"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="switch"
    aria-label="使用">
    <svg>
      <use xlink:href="#iconSelect"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
    aria-label="更新">
    <svg class="ft__primary">
      <use xlink:href="#iconRefresh"></use>
    </svg>
  </span>
</div>
</div>
<div data-bazaar="plugin" data-name="Export_Helper" class="b3-card" data-type="dark,light" data-updated="2022-11-21T02:53:06Z">
<div class="b3-card__img"><img src="/appearance/themes/Sofill=/extension/plugin/Export_Helper/preview.png">
</div>
<div class="b3-card__info fn__flex">
  <span class="fn__flex-center fn__ellipsis">导出助手</span>
  <span class="fn__space"></span>
  <span class="fn__flex-1"></span>
  <svg class="svg fn__flex-center">
    <use xlink:href="#iconDownload"></use>
  </svg>
  <span class="fn__space"></span>
  <span class="fn__flex-center">3271</span>
</div>
<div class="b3-card__actions" data-name="导出助手" data-url=""
  data-hash="ea28261f3e03d0f325dca9bd1184562dcf7c3751">
  <div class="fn__flex-1"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="uninstall"
    aria-label="卸载">
    <svg>
      <use xlink:href="#iconTrashcan"></use>
    </svg>
  </span>
  <div class="fn__space"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="switch"
    aria-label="使用">
    <svg>
      <use xlink:href="#iconSelect"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
    aria-label="更新">
    <svg class="ft__primary">
      <use xlink:href="#iconRefresh"></use>
    </svg>
  </span>
</div>
</div>
<div data-bazaar="plugin" data-name="Fusion_Helper" class="b3-card" data-type="light" data-updated="2022-11-20T14:50:03Z">
<div class="b3-card__img"><img src="/appearance/themes/Sofill=/extension/plugin/Fusion_Helper/preview.png">
</div>
<div class="b3-card__info fn__flex">
  <span class="fn__flex-center fn__ellipsis">混搭助手</span>
  <span class="fn__space"></span>
  <span class="fn__flex-1"></span>
  <svg class="svg fn__flex-center">
    <use xlink:href="#iconDownload"></use>
  </svg>
  <span class="fn__space"></span>
  <span class="fn__flex-center">1039</span>
</div>
<div class="b3-card__actions" data-name="混搭助手" data-url=""
  data-hash="cadc315b7976701e03df79415fb16d7a386320aa">
  <div class="fn__flex-1"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="uninstall"
    aria-label="卸载">
    <svg>
      <use xlink:href="#iconTrashcan"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="switch"
    aria-label="使用">
    <svg>
      <use xlink:href="#iconSelect"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
    aria-label="更新">
    <svg class="ft__primary">
      <use xlink:href="#iconRefresh"></use>
    </svg>
  </span>
</div>
</div>
<div data-bazaar="plugin" data-name="Publish_Helper" class="b3-card" data-type="light" data-updated="2022-11-20T14:50:03Z">
<div class="b3-card__img"><img src="/appearance/themes/Sofill=/extension/plugin/Publish_Helper/preview.png">
</div>
<div class="b3-card__info fn__flex">
  <span class="fn__flex-center fn__ellipsis">发布助手</span>
  <span class="fn__space"></span>
  <span class="fn__flex-1"></span>
  <svg class="svg fn__flex-center">
    <use xlink:href="#iconDownload"></use>
  </svg>
  <span class="fn__space"></span>
  <span class="fn__flex-center">1039</span>
</div>
<div class="b3-card__actions" data-name="发布助手" data-url=""
  data-hash="cadc315b7976701e03df79415fb16d7a386320aa">
  <div class="fn__flex-1"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="uninstall"
    aria-label="卸载">
    <svg>
      <use xlink:href="#iconTrashcan"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="switch"
    aria-label="使用">
    <svg>
      <use xlink:href="#iconSelect"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
    aria-label="更新">
    <svg class="ft__primary">
      <use xlink:href="#iconRefresh"></use>
    </svg>
  </span>
</div>
</div>
<div data-bazaar="plugin" data-name="Graph_Helper" class="b3-card" data-type="light" data-updated="2022-11-20T14:50:03Z">
<div class="b3-card__img"><img src="/appearance/themes/Sofill=/extension/plugin/Graph_Helper/preview.png">
</div>
<div class="b3-card__info fn__flex">
  <span class="fn__flex-center fn__ellipsis">图谱助手</span>
  <span class="fn__space"></span>
  <span class="fn__flex-1"></span>
  <svg class="svg fn__flex-center">
    <use xlink:href="#iconDownload"></use>
  </svg>
  <span class="fn__space"></span>
  <span class="fn__flex-center">1039</span>
</div>
<div class="b3-card__actions" data-name="图谱助手" data-url=""
  data-hash="cadc315b7976701e03df79415fb16d7a386320aa">
  <div class="fn__flex-1"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="uninstall"
    aria-label="卸载">
    <svg>
      <use xlink:href="#iconTrashcan"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="switch"
    aria-label="使用">
    <svg>
      <use xlink:href="#iconSelect"></use>
    </svg>
  </span>
  <div class="fn__space fn__none"></div>
  <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
    aria-label="更新">
    <svg class="ft__primary">
      <use xlink:href="#iconRefresh"></use>
    </svg>
  </span>
</div>
</div>
</div>
`