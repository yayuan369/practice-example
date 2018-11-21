<template>
  <div>
    <div class="wrapper">
      <mu-appbar class="header" title="个人中心"></mu-appbar>
      <div class="main">
        <div class="content">
          
        </div>
      </div>
    </div>
    <FooterNav :father='mek'></FooterNav>
  </div>
</template>

<script>
import FooterNav from "../components/FooterNav.vue";
export default {
  data() {
    return {
      mek: "我的"
    };
  },

  components: {
    FooterNav
  },

  methods: {},

  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
</style>