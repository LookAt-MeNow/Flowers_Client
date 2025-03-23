"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      queryObj: {
        // 查询关键词
        query: "",
        // 商品分类Id
        cid: "",
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10
      },
      // 商品列表的数据
      goodsList: [],
      // 总数量，用来实现分页
      total: 0,
      // 默认的空图片
      //defaultPic: 'https://pic3.zhimg.com/v2-bea0f018684450b592d252a9ce018ce0_1440w.jpg'
      // 是否正在请求数据
      isloading: false
    };
  },
  onLoad(options) {
    common_vendor.index.__f__("log", "at subpkg/goods_list/goods_list.vue:38", options);
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表数据的方法
    async getGoodsList() {
      this.isloading = true;
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/search", this.queryObj);
      this.isloading = false;
      cb && cb();
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.goodsList = res.message.goods;
      this.total = res.message.total;
      common_vendor.index.__f__("log", "at subpkg/goods_list/goods_list.vue:60", res);
    },
    // 获取商品列表数据的方法
    async getGoodsList() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/search", this.queryObj);
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
    },
    // 点击跳转到商品详情页面
    gotoDetail(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
      });
    }
  },
  // 触底的事件
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return common_vendor.index.$showMsg("数据加载完毕！");
    if (this.isloading)
      return;
    this.queryObj.pagenum += 1;
    this.getGoodsList();
  },
  // 下拉刷新的事件
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isloading = false;
    this.goodsList = [];
    this.getGoodsList(() => common_vendor.index.stopPullDownRefresh());
  }
};
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsList, (item, i, i0) => {
      return {
        a: "3df97543-0-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: i,
        d: common_vendor.o(($event) => $options.gotoDetail(item), i)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/goods_list/goods_list.js.map
