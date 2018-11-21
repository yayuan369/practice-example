<template>
  <div>
    <div class="wrapper">
      <mu-appbar class="header" title="更多"></mu-appbar>
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
      mek: "更多"
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