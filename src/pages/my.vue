<template>
  <div>
    <div class="wrapper">
      <mu-appbar class="header" title="个人中心"></mu-appbar>
      <div class="main">
        <div class="myMessage">
          <img src="#" alt="user">
          <span>姓名</span>
          <span>积分:0</span>
          <span>注册时间:5分钟前</span>
        </div>

        <!-- 内容 -->

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
      user_mseg: {}
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
      axios.post("https://www.vue-js.com/api/v1/accesstoken", {
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
      axios.get("https://www.vue-js.com/api/v1/user/" + that.user.loginname)
        .then(function(response) {
          that.user_msg = response.data.data;
        });
    },
    // 登出并清除缓存
      logout() {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('user_id')
        localStorage.removeItem('loginname')
        this.$router.push({
          path: "/vue-home/dist"
        })
      }
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
</style>