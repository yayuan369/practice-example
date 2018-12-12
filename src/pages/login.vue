<template>
    <div class="wrapper">
        <mu-appbar class="header">
            <span>登录</span>
            <a href="https://www.vue-js.com/signup" class="signup">注册</a>
        </mu-appbar>
        <div class="loginKey">
            <mu-text-field label="请输入accessToken" v-model="val" :errorText="error" hintText="accessToken" type="password" labelFloat/><br>
            <mu-button @click="login" class="demo-raised-button" color="primary">登录</mu-button>
        </div>
        <div class="getData">
            <mu-button @click="showSnackbar">
                <mu-icon left value="help_outline"></mu-icon>
                如何获取accessToken
            </mu-button>
            <mu-snackbar :open.sync="snackbar" position="bottom">
                登录vue.js中文社区，在设置页面可看到自己的accessToken
                <mu-button flat slot="action" color="secondary" @click="snackbar = false">Close</mu-button>
            </mu-snackbar>
        </div>
        <FooterNav></FooterNav>
    </div>
</template>

<script>
import axios from "axios";
import FooterNav from "../components/FooterNav.vue";
export default {
  data() {
    return {
      val: "",
      error: "",
      snackbar: false
    };
  },

  components: {
    FooterNav
  },

  mounted() {},

  methods: {
    showSnackbar() {
      this.snackbar = true;
      if (this.snackTimer) clearTimeout(this.snackTimer);
      this.snackTimer = setTimeout(() => {
        this.snackbar = false;
      }, 5000);
    },
    //v-model双向数居绑定  输入值值 post给后端验证 accessToken 的正确性 并且用localstorage储存 没输入值或者输入错误值 给反馈
    login() {
      let that = this;
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", {
          accesstoken: that.val
        })
        .then(function(response) {
          that.error = "";
          //  使用localStorage API
          localStorage.setItem("accesstoken", that.val);
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("loginname", response.data.loginname);
          that.$router.push({
            path: "/vue-home/dist/my"
          });
        })
        .catch(function(error) {
          if (!that.val) {
            that.error = "accesstoken不能为空";
          } else {
            console.log("error");
            that.error = "输入错误，请重新输入";
            console.log(that.$route.matched);
            that.$route.matched[0].meta = {
              requiresAuth: true
            };
          }
        });
    }
  },

  computed: {}
};
</script>
<style lang='less' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .header {
    position: fixed;
    top: 0;
    background-color: #474a4f;
    color: #ffffff;
    width: 100%;
  }
  .main {
    margin-top: 4rem;
  }
  .signup {
    font-size: 1.6rem;
    float: right;
  }
  .loginKey {
    text-align: center;
    position: relative;
    margin-top: 14rem;
    .demo-raised-button {
      margin-top: 6rem;
    }
  }
  .getData {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
  }
}
</style>