<template>
  <div>
    <div class="headerTabs">
      <mu-tabs class="tabs" :value="activeTab" @change="tabChange" indicator-color="blue">
        <mu-tab value="all">全部</mu-tab>
        <mu-tab value="good">精华</mu-tab>
        <mu-tab value="weex">weex</mu-tab>
        <mu-tab value="share">分享</mu-tab>
        <mu-tab value="ask">问答</mu-tab>
        <mu-tab value="job">招聘</mu-tab>
      </mu-tabs>
      <div class="inloading" v-if="inloading">
        Loading...
      </div>
    </div>
    <!-- 列表展示 -->
    <mu-list>
      <div v-for="(item,index) in items">
        <div class="list">
          <!-- 用户头像以及基本信息 -->
          <router-link :to="{path:'/vue-home/dist/people',query:{user:item.author.loginname}}" :src="item.author.avatar_url" tag="img" alt="user"></router-link>
          <!-- 发布的内容 -->
          <router-link :to="{path:'/vue-home/dist/content',query:{id:item.id}}" tag="div" class="content">
            <div class="list-title">
              <span v-if="item.top">置顶</span>
              <span v-else-if="item.good">精华</span>
              <span v-else-if="item.tab == 'share'" :style="styleObj">分享</span>
              <span v-else-if="item.tab == 'ask'" :style="styleObj">问答</span>
              <span v-else-if="item.tab == 'job'" :style="styleObj">招聘</span>
              <strong>{{item.title}}</strong>
            </div>
            <!-- 评论数,浏览量,时间 -->
            <div class="timer">
              <span>
                <mu-icon value="chat" :size="14" />{{item.reply_count}}&nbsp
                <mu-icon value="visibility" :size="14" />{{item.visit_count}}
              </span>
              <span>{{item.last_reply_at | formatDate}}</span>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 下拉加载 -->
      <p class="nomore" v-show="nomore" style="text-align: center;">内容到底了</p>
    </mu-list>
    <!-- 暂无 -->
    <div v-if="!items.length">
      <strong>暂无内容</strong>
    </div>
    <!-- 下拉更多 -->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      inloading: false,
      activeTab: "all", //当前选中tab项
      nomore: false,
      url: "https://www.vue-js.com/api/v1/topics?tab=all",
      page: 1,
      items: [],
      styleObj: {
        backgroundColor: "#c5c5c7"
      },
      scroller: null
    };
  },

  components: {},
  // 先导航和渲染组件，然后在组件的 created 钩子中获取数据
  // 组件创建完后获取数据，
  created() {
    this.getData();
  },
  methods: {
    //   tab切换
    tabChange(val) {
      this.page = 1; //切换tab,页码重置为第一页
      this.nomore = false; //切换tab  重置
      this.activeTab = val;
      console.log("222222", this.activeTab);
      this.url = "https://www.vue-js.com/api/v1/topics?tab=" + val;
      console.log("url--->", this.url);
      this.getData();
    },
    // 获取数据
    getData() {
      let that = this;
      that.inloading = true;
      axios.get(this.url).then(function(response) {
        that.items = response.data.data;
        console.log("数据=>", that.items);
        that.inloading = false;
      });
    },

    // 下拉刷新
    loadMore() {
      if (!this.nomore && !this.inloading) {
        this.loading = true;
        this.page += 1;
        let url =
          "https://www.vue-js.com/api/v1/topics?tab=all" + "&page=" + this.page;
        let arr = [];
        setTimeout(() => {
          let that = this;
          axios.get(url).then(function(response) {
            arr = response.data.data;
            if (arr.length === 0) {
              that.loading = false;
              that.nomore = true;
              return;
            }
            that.items = [...that.items, ...arr];
            arr = [];
          });
          this.loading = false;
        }, 1000);
      }
    }
  },

  mounted() {
    this.scroller = this.$el;
  },

  computed: {}
};
</script>
<style lang='less' scoped>
.headerTabs {
  overflow: auto;
  //   height: 100vh;
  .tabs {
    margin-top: 4rem;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
  }
}
.list {
  display: flex;
  border-bottom: 0.6rem solid #eff2f7;
  padding: 1rem;
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list-title {
      span {
        background-color: #369219;
        color: #fff;
        padding: 0.2rem;
        border-radius: 0.2rem;
        font-size: 1rem;
        margin-right: 0.5rem;
      }
    }
    .timer {
      display: flex;
      justify-content: space-between;
      color: gray;
      padding-top: 1rem;
    }
  }
}
</style>