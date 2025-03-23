<template>
  <view>
    <view class="search-box">
       <!-- 使用 uni-ui 提供的搜索组件 -->
       <uni-search-bar @input="input" :radius="100" :focus="true" cancelButton="none"></uni-search-bar>
     </view>
      <!-- 搜索建议列表啊手动阀啊沙发沙发啊手动阀手动阀发射点发生 -->
      <view class="sugg-list" v-if="searchResults.length !== 0">
        <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" 
          @click="gotoDetail(item.ID)">
          <view class="goods-name">{{item.Name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      
       <!-- 搜索历史 -->
       <view class="history-box" v-else>
          <!-- 标题区域 -->
          <view class="history-title">
            <text>搜索历史</text>
            <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
          </view>
          <!-- 列表区域 -->
          <view class="history-list">
               <uni-tag :text="item" v-for="(item, i) in historys" :key="i" 
              @click="gotoGoodsList(item)"></uni-tag>
          </view>
       </view>
      
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //防抖延时器，避免每次搜索输入一个字就跳出搜索内容
        timer: null,
        //搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        //搜索历史, 现在放的是假数据
        historyList: []
      };
    },
    onLoad() {
     this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
     },
     methods: {
       input(e) {
           // 清除 timer 对应的延时器
          clearTimeout(this.timer)
           // 重新启动一个延时器，并把 timerId 赋值给 this.timer
          this.timer = setTimeout(() => {
           // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
            this.kw = e
            // 根据关键词，查询搜索建议列表
            this.getSearchList()
            console.log("tiaoshi")
            console.log(this.kw)
          }, 500)
       },
       // 根据搜索关键词，搜索商品建议列表
       async getSearchList() {
          // 判断关键词是否为空
         if (this.kw === '') {
          this.searchResults = []
          return
          }
          // 发起请求，获取搜索建议列表
         const { data: res } = await 
         uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
          if (res.meta.status !== 200) return uni.$showMsg()
          this.searchResults = res.message
          //查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
          this.saveSearchHistory()
        },
        gotoDetail(goods_id) {
          uni.navigateTo({
            // 指定详情页面的 URL 地址，并传递 goods_id 参数
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
          })
        },
        // 2. 保存搜索关键词的方法
        saveSearchHistory() {
           const set = new Set(this.historyList)
           set.delete(this.kw)
           set.add(this.kw)
           this.historyList = Array.from(set)
           // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
          uni.setStorageSync('kw', JSON.stringify(this.historyList))
        },
        // 清空搜索历史记录
        cleanHistory() {
           // 清空 data 中保存的搜索历史
          this.historyList = []
           // 清空本地存储中记录的搜索历史
          uni.setStorageSync('kw', '[]')
        },
         // 点击跳转到商品列表页面
        gotoGoodsList(kw) {
           uni.navigateTo({
           url: '/subpkg/goods_list/goods_list?query=' + kw
           })
        }
    },
    computed: {
       historys() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .uni-searchbar {
   /* #ifndef APP-NVUE */
   display: flex;
   /* #endif */
   flex-direction: row;
   position: relative;
   padding: 16rpx;
   /* 将默认的 #FFFFFF 改为 #C00000 */
   background-color: #c00000;
   }
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
   .sugg-list {
   padding: 0 5px;
   .sugg-item {
     font-size: 12px;
     padding: 13px 0;
     border-bottom: 1px solid #efefef;
     display: flex;
     align-items: center;
     justify-content: space-between;
       .goods-name {
         // 文字不允许换行（单行文本）
        white-space: nowrap;
         // 溢出部分隐藏
        overflow: hidden;
         // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
         margin-right: 3px;
       }
     }
   }
   
  .history-box {
     padding: 0 5px;
     .history-title {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 40px;
       font-size: 13px;
       border-bottom: 1px solid #efefef;
     }
     .history-list {
       display: flex;
       flex-wrap: wrap;
       .uni-tag {
          margin-top: 5px;
          margin-right: 5px;
      }
    }
  }
</style>
