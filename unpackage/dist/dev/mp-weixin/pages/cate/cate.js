"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
      wh: 0,
      //一级分类列表
      cateList: [],
      //二级分类列表
      cateLevel2: [],
      //一级分类点击
      active: 0,
      //滚动回顶部
      scrollTop: 0
    };
  },
  onLoad() {
    const sysInfo = common_vendor.index.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
  },
  methods: {
    //获取分类数据
    async getCateList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/categories");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
      common_vendor.index.__f__("log", "at pages/cate/cate.vue:71", res);
    },
    // 选中项改变的事件处理函数
    activeChanged(i) {
      this.active = i, // 为二级分类列表重新赋值
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop ? 0 : 1;
    },
    // 点击三级分类项跳转到商品列表页面
    gotoGoodsList(item3) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item3.cat_id
      });
    },
    // 跳转到分包中的搜索页面
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.cateList, (item, i, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.n(i === $data.active ? "active" : ""),
        c: common_vendor.o(($event) => $options.activeChanged(i), i),
        d: i
      };
    }),
    c: $data.wh + "px",
    d: common_vendor.f($data.cateLevel2, (item2, i2, i0) => {
      return {
        a: common_vendor.t(item2.cat_name),
        b: common_vendor.f(item2.children, (item3, i3, i1) => {
          return {
            a: item3.cat_icon,
            b: common_vendor.t(item3.cat_name),
            c: i3,
            d: common_vendor.o(($event) => $options.gotoGoodsList(item3), i3)
          };
        }),
        c: i2
      };
    }),
    e: $data.wh + "px",
    f: $data.scrollTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cate/cate.js.map
