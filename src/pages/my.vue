<template>
  <div>
    <div class="wrapper">
      <mu-appbar class="header" title="个人中心"></mu-appbar>
      <div class="main">
        <div class="myMessage">
          <img :src="user_msg.avatar_url" alt="user">
          <div class="timer">
            <span style="font-size:1.6rem;">
              <b>{{user_msg.loginname}}</b>
            </span>
            <span>积分:{{user_msg.score}}</span>
            <span>注册时间:{{user_msg.create_at | formatDate }}</span>
          </div>
        </div>

        <!-- 内容 -->
        <!-- 最近话题 -->
        <mu-list>
          <mu-list-item v-if="user_msg.recent_topics" toggleNested :open="false">
            <mu-list-item-action>
              <mu-icon value="drafts"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>最近的话题</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
            </mu-list-item-action>
            <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in user_msg.recent_topics" :key="item.id" slot="nested" title="Starred" :afterText="item.last_reply_at| formatDate">
              <!-- <mu-icon slot="left" value="hdr_weak" /> -->
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <span class="msg-num">{{user_msg.recent_topics.length}}</span>
          </mu-list-item>
          <!--最近的回复-->
          <mu-list-item class="list-item" v-if="user_msg.recent_replies" toggleNested :open="false">
            <mu-list-item-action>
              <mu-icon value="inbox"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>最近的回复</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
            </mu-list-item-action>
            <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in user_msg.recent_replies" :key="item.id" slot="nested" title="Starred" :afterText="item.last_reply_at| formatDate">
              <!-- <mu-icon slot="left" value="hdr_weak" /> -->
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <span class="msg-num">{{user_msg.recent_replies.length}}</span>
          </mu-list-item>
          <!--收藏的话题-->
          <mu-list-item class="list-item" v-if="user_msg.collect_topics" toggleNested :open="false">
            <mu-list-item-action>
              <mu-icon value="grade"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>收藏的话题</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
            </mu-list-item-action>
            <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in user_msg.collect_topics" :key="item.id" slot="nested" title="Starred" :afterText="item.last_reply_at| formatDate">
              <!-- <mu-icon slot="left" value="hdr_weak" /> -->
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <span class="msg-num">{{user_msg.collect_topics.length}}</span>
          </mu-list-item>

        </mu-list>

      </div>
    </div>
    <FooterNav :father='mek'></FooterNav>
  </div>
</template>

<script>
import axios from "axios";
import FooterNav from "../components/FooterNav.vue";
export default {
  data() {
    return {
      //accesstoken: 08554c7c-aa6a-4abd-8bfb-7d80e5a9bfea
      mek: "我的",
      accesstoken: "",
      user: {},
      user_msg: {},
      open: "hhh"
    };
  },
  // 获取储存的accesstoken
  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
    this.getData();
  },
  components: {
    FooterNav
  },

  methods: {
    // 传递accesstoken参数然后 post 取得用户登录名
    getData() {
      let that = this;
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: that.accesstoken
        })
        .then(function(response) {
          that.user = response.data;
          that.getUser();
        });
    },
    // 查用户信息
    getUser() {
      let that = this;
      axios
        .get("https://www.vue-js.com/api/v1/user/" + that.user.loginname)
        .then(function(response) {
          that.user_msg = response.data.data;
          console.log("哈哈哈===", that.user_msg, that.user_msg.collect_topics);
        });
    },
    // 登出并清除缓存
    logout() {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("loginname");
      this.$router.push({
        path: "/vue-home/dist"
      });
    }
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
.main {
  overflow: hidden;
}
.myMessage {
  padding-top: 1rem;
  overflow: hidden;
  img {
    float: left;
    height: 5rem;
    width: 5rem;
    margin-left: 1rem;
  }
  .timer {
    padding: 0.2rem 0 0 8rem;
    font-size: 1.2rem;
    span {
      display: block;
    }
  }
}

.list-item-content {
  position: relative;
  border: 0.1rem solid #eff2f7;
  margin: 0.6rem;
  margin-left: -1rem;
}
.msg-num {
  background-color: #f5f5f5;
  font-size: 0.2rem block;
  padding: 0 0.6rem;
  border-radius: 100%;
  position: absolute;
  right: 4rem;
  top: 1.2rem;
}
</style>