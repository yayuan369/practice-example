<template>
  <div>
    <mu-appbar>
      <mu-button icon slot="left" @click="goback">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      {{userData.title}}
      <mu-button icon slot="right" @click="check">
        <mu-icon value="more_vert"></mu-icon>
      </mu-button>
      <div class="checkDiv" ref="adk">
        <button>
          <a href="#content-tip">顶部</a>
        </button>
        <button>
          <a href="#content-main">评论区</a>
        </button>
        <button>
          <a href="#content-input">写评论</a>
        </button>
        <button>
          <a to="/vue-home/dist">返回首页</a>
        </button>
      </div>
    </mu-appbar>
    <!-- 内容 -->
    <div class="main">
      <div id="content-tip">
        <!--和首页同理实现的标签-->
        <span v-if="userData.top">置顶</span>
        <span v-else-if="userData.good">精华</span>
        <span v-else-if="userData.tab === 'share'" :style="styleObj">分享</span>
        <span v-else-if="userData.tab === 'ask'" :style="styleObj">问答</span>
        <span v-else-if="userData.tab === 'job'" :style="styleObj">招聘</span>
        <strong> {{userData.title}} </strong>
      </div>
      <div id="content-about">
        <router-link :to="{path:'/vue-home/dist/people',query:{user:userData.author.loginname}}" alt="user">
          <img class="content-author-pic" v-if="userData.author" :src="userData.author.avatar_url" />
        </router-link>
        <span>作者：{{userData.author.loginname}}</span>
        <span>发表时间：{{userData.create_at | formatDate}}</span><br>
        <!--用 util>filter.js 里的formatData方法 转换时间格式-->
        <span>最后回复：{{userData.last_reply_at | formatDate}}</span>
        <span>浏览量：{{userData.visit_count}}</span>
      </div>
      <!--收藏-->
      <!--用户登录状态才显示-->
      <div class="collect">
        <mu-checkbox v-if="accesstoken" v-model="collectK" :label="collectText" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" />
      </div>

      <!--正文 -->
      <div class="content-text" v-html="userData.content"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ak: false,
      accesstoken: "",
      loginname: "",
      user_id: "",
      // 用户信息
      userData: {
        author: {},
        replies: {}
      },
      styleObj: {
        backgroundColor: "#999"
      },
      collectK: false,
      collectText: "收藏"
    };
  },
  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
    this.user_id = localStorage.getItem("user_id");
    this.loginname = localStorage.getItem("loginname");
    this.getData(); //获取用户信息
    this.hasCollected(); //判断收藏的状态
  },

  //v-model 双向数据绑定 collectK
  watch: {
    collectK: function(newVal) {
      if (newVal) {
        this.collectOn(); //执行收藏帖子的函数
        this.collectText = "取消收藏"; //显示为 取消收藏
      } else {
        this.collectOff();
        this.collectText = "收藏";
      }
    }
  },

  components: {},

  methods: {
    goback() {
      this.$router.go(-1);
      // 后退一步记录，等同于 history.back()
    },
    check() {
      this.ak = !this.ak;
      if (this.ak) {
        this.$refs.adk.style.display = "block";
      } else {
        this.$refs.adk.style.display = "none";
      }
    },
    // 获取文章信息
    getData() {
      // 文章的id
      let id = this.$route.query.id;
      let that = this;
      axios
        .get("https://www.vue-js.com/api/v1/topic/" + id)
        .then(function(response) {
          that.userData = response.data.data;
        });
    },
    // 收藏的状态
    hasCollected() {
      if (this.accesstoken) {
        let that = this;
        axios
          .get("https://www.vue-js.com/api/v1/user/" + that.loginname)
          .then(function(response) {
            let collecting = response.data.data.collect_topics;
            //此页面的id
            let thisId = that.userData.id;
            collecting.find(function(item) {
              if (item.id === thisId) {
                that.collectK = true;
              }
            });
          });
      }
    },
    //收藏帖子
    collectOn() {
      let that = this;
      axios
        .post("https://www.vue-js.com/api/v1/topic/collect", {
          accesstoken: that.accesstoken,
          topic_id: that.userData.id
        })
        .then(function(response) {});
    },
    //取消收藏帖子
    collectOff() {
      let that = this;
      axios
        .post("https://www.vue-js.com/api/v1/topic/de_collect", {
          accesstoken: that.accesstoken,
          topic_id: that.userData.id
        })
        .then(function(response) {});
    }
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
.checkDiv {
  position: fixed;
  width: 102px;
  right: 6px;
  top: 44px;
  border: 1px solid #ccc;
  display: none;
  button {
    float: left;
    height: 50px;
    line-height: 50px;
    width: 100px;
    background: #fff;
    border: 0;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    padding: 0;
  }
  a {
    color: #847f7f;
  }
}

// 内容
.main {
  #content-tip {
    position: relative;
    padding: 2rem;
    border-bottom: 0.1rem #dcdcdc solid;
    span {
      position: relative;
      background-color: #369219;
      color: #fff;
      padding: 0.2rem;
      border-radius: 0.2rem;
      font-size: 1rem;
      bottom: 0.2rem;
    }
    strong {
      font-size: 1.8rem;
    }
  }
  #content-about {
    position: relative;
    height: 5rem;
    padding-bottom: 1rem;
    border-bottom: 0.1rem #dcdcdc solid;
    font-size: 1.2rem;
    color: #808080;
    text-align: left;
    line-height: 2rem;
    span {
      position: relative;
      padding-left: 2rem;
      top: 0.5rem;
      left: 5rem;
    }
    .content-author-pic {
      position: absolute;
      left: 0.6rem;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      top: 0.4rem;
    }
  }
  .collect {
    text-align: center;
    .demo-checkbox {
      font-size: 1.6rem;
      margin-top: 1.6rem;
      position: relative;
    }
  }
  .content-text {
    width: 100%;
    padding: 1rem;
  }
}
</style>