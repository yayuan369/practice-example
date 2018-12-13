<template>
  <div>
    <mu-appbar>
      <mu-button icon slot="left" @click="goback">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      发布帖子
    </mu-appbar>
    <div class="main">
      <!-- header -->
      <mu-tabs :value="activeTab" @change="tabChange">
        <mu-tab value="tab1">编辑</mu-tab>
        <mu-tab value="tab2">预览</mu-tab>
      </mu-tabs>
      <!-- tab 为编辑 -->
      <div v-if="activeTab === 'tab1'" class="tab1">
        <!--标题-->
        <mu-text-field v-model="editorTitle" label="请写标题" fullWidth labelFloat></mu-text-field>
        <!-- 类别 -->
        <mu-select label="请选择板块" filterable v-model="tab" full-width :errorText="errorText">
          <mu-option label="回答" value="ask"></mu-option>
          <mu-option label="分享" value="share"></mu-option>
          <mu-option label="招聘" value="job"></mu-option>
        </mu-select>

        <mu-text-field v-model="editorText" label="正文" placeholder="建议使用 Markdown 语法" multiLine :rows="10" :rowsMax="12" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
      </div>

      <!-- tab 为预览 -->
      <mu-flex v-html="markedText" v-if="activeTab === 'tab2'">
      </mu-flex>

      <!-- 发布 -->
      <div class="publishBtn">
        <mu-button @click="publishText" class="demo-raised-button" primary>发布</mu-button>
      </div>

      <!-- 没有登录时 -->
      <mu-dialog :open="!accesstoken" title="温馨提示：" width="768px">
        请先登录
        <mu-button slot="actions" primary to="/vue-home/dist/">取消</mu-button>
        <mu-button slot="actions" primary to="/vue-home/dist/login">确定</mu-button>
      </mu-dialog>
      <!--输入提示-->
      <mu-dialog :open="publish" title="温馨提示：">
        {{tipMsg}}
        <mu-button label="确定" slot="actions" primary @click="close">确定</mu-button>

      </mu-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
export default {
  data() {
    return {
      accesstoken: "",
      activeTab: "tab1",
      tab: "ask",
      editorTitle: "",
      editorText: "",
      publish: false,
      tipMsg: ""
    };
  },

  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
  },

  components: {},

  methods: {
    goback() {
      this.$router.go(-1);
      // 后退一步记录，等同于 history.back()
    },
    tabChange(val) {
      this.activeTab = val;
    },
    close() {
      this.publish = false;
    },
    // 发布
    publishText() {
      let that = this;
      // 检测输入是否符合要求
      if (that.editorTitle.length < 10) {
        that.publish = true;
        that.tipMsg = "话题标题字数不能小于10个";
        setTimeout(function() {
          that.publish = false;
        }, 2000);
      } else if (that.editorText.length < 1) {
        that.publish = true;
        that.tipMsg = "文章内容不能为空";
        setTimeout(function() {
          that.publish = false;
        }, 2000);
      }
      // 使用markdown编辑器
      that.editorText = marked(this.editorText);
      // 发布上传
      axios
        .post("https://www.vue-js.com/api/v1/topics", {
          accesstoken: that.accesstoken,
          title: that.editorTitle,
          tab: that.tab,
          content: that.editorText
        })
        .then(function(response) {
          that.publish = true;
          that.tipMsg = "发布成功";
          setTimeout(function() {
            that.publish = false;
          }, 2000);
        })
        .catch(function(error) {
          that.publish = true;
        });
    }
  },

  mounted() {},

  computed: {
    errorText() {
      return this.tab ? "" : "这是必选项";
    },
    markedText() {
      return marked(this.editorText);
    }
  }
};
</script>
<style lang='less' scoped>
.mu-tab {
  width: 100%;
}
.main {
  .tab1 {
    padding: 0.6rem;
  }
}

// 发布按钮
.publishBtn {
  display: flex;
  justify-content: center;
  .demo-raised-button {
    position: fixed;
    bottom: 2rem;
  }
}
</style>

<style lang="less" scoped>
// 组件
.mu-input__focus {
  color: #ff5252;
}
.mu-dialog {
  max-width: 80%;
  width: 768px;
}
</style>
