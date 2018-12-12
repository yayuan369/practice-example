<template>
  <div>
    <div>
      <ul class="tabbar">
        <li v-for="(item,index) in barData" :key="index" :class="item.label === father ? 'active':''">
          <svg class='icon' slot='icon' @click="changeTab(index)">
            <use :xlink:href='item.label === father ? item.hrefActive : item.href'></use>
          </svg>
          <p>{{item.label}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barData: [],
      currentData: {}
    };
  },
  created(){
    let accesstoken = localStorage.getItem("accesstoken")
    if(accesstoken){
      this.barData = [
        {
          label: "主页",
          href: "#icon-unie60e",
          hrefActive: "#icon-zhuye",
          route: "/vue-home/dist"
        },
        {
          label: "信息",
          href: "#icon-xinxi",
          hrefActive: "#icon-xinxi1",
          route: "/vue-home/dist/message"
        },
        {
          label: "我的",
          href: "#icon-wode",
          hrefActive: "#icon-wode_1",
          route: "/vue-home/dist/my"
        },
        {
          label: "更多",
          href: "#icon-gengduo1",
          hrefActive: "#icon-gengduo2",
          route: "/vue-home/dist/more"
        }
      ]
    }else{
      this.barData = [
        {
          label: "主页",
          href: "#icon-unie60e",
          hrefActive: "#icon-zhuye",
          route: "/vue-home/dist"
        },
        {
          label: "信息",
          href: "#icon-xinxi",
          hrefActive: "#icon-xinxi1",
          route: "/vue-home/dist/message"
        },
        {
          label: "我的",
          href: "#icon-wode",
          hrefActive: "#icon-wode_1",
          route: "/vue-home/dist/login"
        },
        {
          label: "更多",
          href: "#icon-gengduo1",
          hrefActive: "#icon-gengduo2",
          route: "/vue-home/dist/more"
        }
      ]
    }
  },
  components: {},
  props: ["father"],
  methods: {
    changeTab(index) {
      this.currentData = this.barData[index];
      this.$router.push(this.currentData.route);
    }
  },
  
  mounted() {},

  computed: {}
};
</script>
<style lang='less' scoped>
.tabbar {
  width: 100%;
  padding: 5px 0;
  text-align: center;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  background: #fff;
  margin-bottom: 0;
  margin-top: 0;
  li {
    float: left;
    list-style: none;
    width: 25%;
    .icon {
      width: 25%;
      height: 3rem;
    }
    p {
      margin: 0;
      margin-top: -5px;
    }
  }
}
.active {
  color: #1296db;
}
</style>