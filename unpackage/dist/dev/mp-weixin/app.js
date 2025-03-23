"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
  "./subpkg/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    common_vendor.index.__f__("log", "at App.vue:5", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:8", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:11", "App Hide");
  }
};
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.baseUrl = "http://chenfei.site:8080";
common_vendor.index.$showMsg = function(title = "数据加载失败！", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "数据加载中..."
  });
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
