<template>
<div>
  <Header />
  <router-view></router-view>
  <Footer v-show="this.$route.meta.show" />
</div>
  
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通过vuex发送那个请求，获取数据，存储在仓库中 并且只会执行一次
    this.$store.dispatch("getcategory");
  },
};
</script>

<style>
</style>
