"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 1. 轮播图的数据列表，默认为空数组
      swiperList: [],
      // 2分类导航
      navList: [],
      //楼层数据
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getfloorList();
  },
  methods: {
    // 3. 获取轮播图数据的方法
    async getSwiperList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.swiperList = res.message;
      common_vendor.index.$showMsg("数据请求成功");
    },
    async getNavList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.navList = res.message;
      common_vendor.index.$showMsg("数据请求成功");
    },
    // nav-item 项被点击时候的事件处理函数
    navClickHandler(item) {
      if (item.name === "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    },
    async getfloorList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
      common_vendor.index.__f__("log", "at pages/home/home.vue:113", res);
    },
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
    b: common_vendor.f($data.swiperList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
        c: i
      };
    }),
    c: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: i,
        c: common_vendor.o(($event) => $options.navClickHandler(item), i)
      };
    }),
    d: common_vendor.f($data.floorList, (item, i, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list.slice(1), (item2, i2, i1) => {
          return {
            a: item2.image_src,
            b: item2.image_width + "rpx",
            c: i2,
            d: item2.url
          };
        }),
        f: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
