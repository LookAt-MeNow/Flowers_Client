<template>
   <view>
      <!-- 使用自定义的搜索组件 -->
      <view class="search-box">
        <my-search @click="gotoSearch"></my-search>
      </view>
     <!-- 轮播图区域 -->
     <swiper :indicator-dots="true" :autoplay="true" :interval="3000" 
    :duration="1000" :circular="true">
       <!-- 循环渲染轮播图的 item 项 -->
       <swiper-item v-for="(item, i) in swiperList" :key="i">
         <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
         <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
         </navigator>
       </swiper-item>
     </swiper>
    <!-- 分类导航 -->
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
    <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
         <image :src="item.floor_title.image_src" class="floor-title"></image>
         <!-- 楼层图片区域 -->
          <view class="floor-img-box">
            <!-- 左侧大图片的盒子 -->
            <navigator class="left-img-box" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{width: 
             item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
            <!-- 右侧 4 个小图片的盒子 -->
            <view class="right-img-box">
              <navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" 
             :key="i2" :url="item2.url">
                <image :src="item2.image_src" mode="widthFix" :style="{width: 
               item2.image_width + 'rpx'}"></image>
              </navigator>
            </view>
          </view>
      </view>
     </view>
    </view>
 </template>

<script>
  export default {
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
        // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
        this.getSwiperList()
        this.getNavList()
        this.getfloorList()
    },
    methods: {
    // 3. 获取轮播图数据的方法
      async getSwiperList() {
            // 3.1 发起请求
            const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
            // 3.2 请求失败
            if (res.meta.status !== 200) {
              return uni.$showMsg()
            }
            // 3.3 请求成功，为 data 中的数据赋
            this.swiperList = res.message
            uni.$showMsg('数据请求成功')
      },
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
          if (res.meta.status !== 200) {
            return uni.$showMsg()
          }
          // 3.3 请求成功，为 data 中的数据赋
          this.navList = res.message
          uni.$showMsg('数据请求成功')
      },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(item) {
         // 判断点击的是哪个 nav
         if (item.name === '分类') {
           uni.switchTab({
           url: '/pages/cate/cate'
         })
         }
       },
       async getfloorList() {
         const{data: res} = await uni.$http.get('/api/public/v1/home/floordata')
          if (res.meta.status !== 200) {
            return uni.$showMsg()
          }
          //对数据处理
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
         this.floorList = res.message
         console.log(res)
       },
      gotoSearch() {
        uni.navigateTo({
        url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper{
    height: 330;
    .swiper-item,
    image{
      width: 100%;
      height: 100%;
    }
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  }
  //导航图片美化
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
  //楼层美化
  .floor-title {
   height: 60rpx;
   width: 100%;
   display: flex;
   }
    .floor-img-box {
     display: flex;
     padding-left: 10rpx;
     }
   .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    }
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆
    z-index: 999;
  }
</style>
