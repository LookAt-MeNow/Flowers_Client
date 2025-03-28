"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  computed: {
    ...common_vendor.mapState("m_cart", []),
    ...common_vendor.mapGetters("m_cart", ["total"])
  },
  watch: {
    // total(newVal) {
    //   const findResult = this.options.find(x => x.text === '购物车')
    //   if (findResult) {
    //     findResult.info = newVal
    //   }
    // }
    total: {
      handler(newVal) {
        const findResult = this.options.find((x) => x.text === "购物车");
        if (findResult) {
          findResult.info = newVal;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      goods_info: {},
      options: [{
        icon: "shop",
        text: "店铺",
        infoBackgroundColor: "#007aff",
        infoColor: "red"
      }, {
        icon: "cart",
        text: "购物车",
        info: 0
      }],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff"
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff"
        }
      ]
    };
  },
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["addToCart"]),
    async getGoodsDetail(goods_id) {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", { goods_id });
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, "jpg");
      this.goods_info = res.message;
      common_vendor.index.__f__("log", "at subpkg/goods_detail/goods_detail.vue:101", res.message);
    },
    preview(i) {
      common_vendor.index.previewImage({
        current: i,
        urls: this.goods_info.pics.map((x) => x.pics_big)
      });
    },
    onClick(e) {
      if (e.content.text === "购物车") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    },
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        const goods = {
          goods_id: this.goods_info.goods_id,
          goods_name: this.goods_info.goods_name,
          goods_price: this.goods_info.goods_price,
          goods_count: 1,
          goods_small_logo: this.goods_info.goods_small_logo,
          goods_state: true
        };
        this.addToCart(goods);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.goods_info.goods_name
  }, $data.goods_info.goods_name ? {
    b: common_vendor.f($data.goods_info.pics, (item, i, i0) => {
      return {
        a: item.pics_big,
        b: common_vendor.o(($event) => $options.preview(i), i),
        c: i
      };
    }),
    c: common_vendor.t($data.goods_info.goods_price),
    d: common_vendor.t($data.goods_info.goods_name),
    e: common_vendor.p({
      type: "star",
      size: "18",
      color: "gray"
    }),
    f: $data.goods_info.goods_introduce,
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      fill: true,
      options: $data.options,
      buttonGroup: $data.buttonGroup
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/goods_detail/goods_detail.js.map
