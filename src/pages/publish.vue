<template>
  <div>
    <mu-appbar>
      <mu-button icon slot="left" @click="goback">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      发布帖子
    </mu-appbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    goback() {
      this.$router.go(-1);
      // 后退一步记录，等同于 history.back()
    },
  },

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
</style>