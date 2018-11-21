<template>
    <div class="wrapper">
        <!--顶栏-->
        <HeaderBar></HeaderBar>
        <!--顶部的tabs及列表内容-->
        <HeaderTabs class="tabs"></HeaderTabs>
        <!--底部导航-->
        <FooterNav :father='mek'></FooterNav>
    </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";
import HeaderTabs from "../components/HeaderTabs.vue";
import FooterNav from "../components/FooterNav.vue";
export default {
  data() {
    return {
      mek: "主页"
    };
  },

  components: {
    HeaderBar,
    HeaderTabs,
    FooterNav
  },

  methods: {},

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .tabs {
    flex: 1;
    margin: 8rem 0 5rem 0;
  }
}
</style>