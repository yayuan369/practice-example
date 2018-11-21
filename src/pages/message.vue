<template>
  <div>
    <div class="wrapper">
      <mu-appbar class="header" title="我的消息"></mu-appbar>
      <div class="main">
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
            <el-tab-pane label="已读消息" name="first">
              <div style="text-align: center;">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane label="未读消息" name="second">
              <div>我不想知道</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <FooterNav :father="mek"></FooterNav>
  </div>
</template>

<script>
import FooterNav from "../components/FooterNav.vue";
import axios from "axios";
export default {
  data() {
    return {
      activeName: "first",
      mek: "信息",

      // 图片弹窗
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  components: {
    FooterNav
  },
  created() {
    // this.accesstoken = localStorage.getItem("accesstoken");
    // this.getData();
  },
  methods: {
    getData() {
      let that = this;
      axios
        .get(
          "https://www.vue-js.com/api/v1/messages?accesstoken=" +
            that.accesstoken
        )
        .then(function(response) {
          that.readMsg = response.data.data;
          console.log(that.readMsg);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 图片弹窗
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
</style>