<template>
  <!--顶部bar-->
  <mu-appbar class="HeaderBar">
    <img class="logo" src="../assets/Play_logo.png">
    <!--发布帖子 ===未完成-->
    <mu-button icon slot="right" to="/vue-home/dist/publish">
      <mu-icon value="send"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>

<style scoped>
.HeaderBar {
  width: 100%;
  height: 4rem;
  position: fixed;
  top: 0;
}
.logo {
  width: 3rem;
  height: 3rem;
  position: absolute;
  left: 9px;
  top: 10px;
}
</style>