<template>
  <div id="nav">
    <van-row justify="center">
      <van-col span="13">
        <div class="grid-content bg-purple">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/" route>首页</el-menu-item>
            <el-menu-item index="/show" route>路径展示</el-menu-item>
            <el-menu-item index="/order" route>指令顺序</el-menu-item>
          </el-menu>
        </div>
      </van-col>
    </van-row>
  </div>
  <router-view v-slot="{Component}">
    <transition>
      <keep-alive include="Home">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';

  export default {
    name: "App",
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .nav {
    width: 1500px;
  }
</style>