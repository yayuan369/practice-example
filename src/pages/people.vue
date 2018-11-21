<template>
    <div class="wrapper">
        <mu-appbar class="header">
            <mu-button icon slot="left" @click="goback">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <mu-button icon slot="right" to="/vue-home/dist/message">
                <mu-icon value="email"></mu-icon>
            </mu-button>
            <span class="my-news-title">个人中心</span>
        </mu-appbar>
        <div class="main">
            <!-- 标题 -->
            <div class="my-information">
                <img :src="peopleUsg.avatar_url" alt="user">
                <div class="timer">
                    <p class="name">
                        <b>{{peopleUsg.loginname}}</b>
                    </p>
                    <p>积分：{{peopleUsg.score}}</p>
                    <p>注册时间：{{peopleUsg.create_at | formatDate }}</p>
                </div>
            </div>

            <!-- <mu-list-item class="my-information-firstitem list-item" title="最近的话题" v-if="peopleUsg.recent_topics" toggleNested :open="false">
                <mu-icon slot="left" value="chat" />
                <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in peopleUsg.recent_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at| formatDate">
                    <mu-icon slot="left" value="hdr_weak" />
                </mu-list-item>
                <span class="msg-num">{{peopleUsg.recent_topics.length}}</span>
            </mu-list-item> -->

            <!-- 最近的话题 -->
            <mu-list  toggleNested>
              <mu-list-item button class="my-information-firstitem list-item" :ripple="false" v-if="peopleUsg.recent_topics" :open="false">
                  <mu-list-item-action>
                      <mu-icon value="chat" slot="left"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>最近的话题</mu-list-item-title>
                  <mu-list-item-action>
                      <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item button :ripple="false" class="list-item-content" v-for="item in peopleUsg.recent_topics" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" :key="item.id" slot="nested" >
                      <mu-list-item-title>{{item.title}}</mu-list-item-title>
                  </mu-list-item>
                  <span class="msg-num">{{ask.length}}</span>
              </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      accesstoken: "",
      user: {},
      peopleUsg: {},
      //   open: "send"
      ask: []
    };
  },

  components: {},
  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
    this.getData();
  },
  methods: {
    //   获取数据
    getData() {
      let that = this;
      let author_name = this.$route.query.user;
      let url = "https://www.vue-js.com/api/v1/user/" + author_name;
      axios.get(url).then(function(response) {
        that.peopleUsg = response.data.data;
        console.log("数据-->", that.peopleUsg);
        that.ask = that.peopleUsg.recent_topics;
      });
    },
    goback() {
      this.$router.go(-1);
    }
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
.wrapper {
  height: 100%;
  .my-information {
    padding-top: 1rem;
    img {
      float: left;
      height: 5rem;
      width: 5rem;
      margin-left: 1rem;
    }
    .name {
      font-size: 1.6rem;
    }
    .timer {
      text-align: left;
      padding: 0.2rem 0 0 8rem;
      font-size: 1.2rem;
      p {
        margin: 0;
      }
    }
  }
  .my-information-firstitem {
    margin-top: 2rem;
  }

  .list-item {
    text-align: left;
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
  }
}
</style>

<style>
.mu-appbar-title {
  text-align: center;
}
</style>
