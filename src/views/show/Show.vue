<template>
  <div>
    <div class="doc">
      <h4>算法：{{$store.state.algorithm}}</h4>
      <h4>完成所有任务最短消耗时间：{{$store.state.consumeTime}}</h4>
    </div>
    <div class="switch">
      <van-cell-group>
        <van-cell center size="large">
          <template #title>
            <svg id="reshowAll" class="reload"
                 :class="{'reload-init':initAll,'reload-on':onAll,'reload-click':clickAll}"
                 @mouseover="onAll=true,initAll=false"
                 @mouseout="initAll=true,onAll=false"
                 @mousedown="clickAll=true"
                 @mouseup="clickAll=false"
                 @click="clickFunAll"
                 viewBox="0 0 1024 1024" width="30" height="30">
              <path d="M512 960c-211.2 0-384-172.8-384-384s172.8-384 384-384c38.4 0 64 25.6 64 64s-25.6 64-64 64C371.2 320 256 435.2 256 576s115.2 256 256 256 256-115.2 256-256c0-38.4 25.6-64 64-64s64 25.6 64 64c0 211.2-172.8 384-384 384z"
                    fill="#00FF00"/>
              <path d="M806.4 211.2L608 76.8C569.6 51.2 512 76.8 512 121.6v268.8c0 44.8 57.6 70.4 96 44.8l198.4-134.4c32-19.2 32-70.4 0-89.6"
                    fill="#00FF00"/>
            </svg>
            <span class="custom-title" style="font-size: 18px">For all</span>
          </template>
          <template #right-icon>
            <van-button type="primary" style="font-size: 16px;" @click="showOrder">查看指令顺序</van-button>
          </template>
        </van-cell>
        <van-cell center size="large" v-show="$store.getters.getPathInfo.path1.length>0">
          <template #title>
            <svg id="reshow1" class="reload"
                 :class="{'reload-init':init1,'reload-on':on1,'reload-click':click1}"
                 @mouseover="on1=true,init1=false"
                 @mouseout="init1=true,on1=false"
                 @mousedown="click1=true"
                 @mouseup="click1=false"
                 @click="clickFun(1)"
                 viewBox="0 0 1024 1024" width="20" height="20">
              <path d="M512 960c-211.2 0-384-172.8-384-384s172.8-384 384-384c38.4 0 64 25.6 64 64s-25.6 64-64 64C371.2 320 256 435.2 256 576s115.2 256 256 256 256-115.2 256-256c0-38.4 25.6-64 64-64s64 25.6 64 64c0 211.2-172.8 384-384 384z"
                    fill="#0000FF"/>
              <path d="M806.4 211.2L608 76.8C569.6 51.2 512 76.8 512 121.6v268.8c0 44.8 57.6 70.4 96 44.8l198.4-134.4c32-19.2 32-70.4 0-89.6"
                    fill="#0000FF"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="blue">
              <circle cx="8" cy="8" r="16"/>
            </svg>
            <span class="custom-title">crane1-1</span>
          </template>
          <template #right-icon>
            <van-switch v-model="showPath1" @change="switchPath(showPath1, 1)" active-color="#28a745"
                        inactive-color="#dcdee0"/>
          </template>
        </van-cell>
        <van-cell center size="large" v-show="$store.getters.getPathInfo.path2.length>0">
          <template #title>
            <svg id="reshow2" class="reload"
                 :class="{'reload-init':init2,'reload-on':on2,'reload-click':click2}"
                 @mouseover="on2=true,init2=false"
                 @mouseout="init2=true,on2=false"
                 @mousedown="click2=true"
                 @mouseup="click2=false"
                 @click="clickFun(2)"
                 viewBox="0 0 1024 1024" width="20" height="20">
              <path d="M512 960c-211.2 0-384-172.8-384-384s172.8-384 384-384c38.4 0 64 25.6 64 64s-25.6 64-64 64C371.2 320 256 435.2 256 576s115.2 256 256 256 256-115.2 256-256c0-38.4 25.6-64 64-64s64 25.6 64 64c0 211.2-172.8 384-384 384z"
                    fill="#FF0000"/>
              <path d="M806.4 211.2L608 76.8C569.6 51.2 512 76.8 512 121.6v268.8c0 44.8 57.6 70.4 96 44.8l198.4-134.4c32-19.2 32-70.4 0-89.6"
                    fill="#FF0000"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="red"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="16"/>
            </svg>
            <span class="custom-title">crane1-2</span>
          </template>
          <template #right-icon>
            <van-switch v-model="showPath2" @change="switchPath(showPath2, 2)" active-color="#28a745"
                        inactive-color="#dcdee0"/>
          </template>
        </van-cell>
        <van-cell center size="large" v-show="$store.getters.getPathInfo.path3.length>0">
          <template #title>
            <svg id="reshow3" class="reload"
                 :class="{'reload-init':init3,'reload-on':on3,'reload-click':click3}"
                 @mouseover="on3=true,init3=false"
                 @mouseout="init3=true,on3=false"
                 @mousedown="click3=true"
                 @mouseup="click3=false"
                 @click="clickFun(3)"
                 viewBox="0 0 1024 1024" width="20" height="20">
              <path d="M512 960c-211.2 0-384-172.8-384-384s172.8-384 384-384c38.4 0 64 25.6 64 64s-25.6 64-64 64C371.2 320 256 435.2 256 576s115.2 256 256 256 256-115.2 256-256c0-38.4 25.6-64 64-64s64 25.6 64 64c0 211.2-172.8 384-384 384z"
                    fill="#FFA500"/>
              <path d="M806.4 211.2L608 76.8C569.6 51.2 512 76.8 512 121.6v268.8c0 44.8 57.6 70.4 96 44.8l198.4-134.4c32-19.2 32-70.4 0-89.6"
                    fill="#FFA500"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="orange"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="16"/>
            </svg>
            <span class="custom-title">crane1-3</span>
          </template>
          <template #right-icon>
            <van-switch v-model="showPath3" @change="switchPath(showPath3, 3)" active-color="#28a745"
                        inactive-color="#dcdee0"/>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <Path ref="compPath"></Path>
  </div>
</template>

<script>
  import Path from "./children/Path";

  import {onMounted, reactive, toRefs, ref} from 'vue'
  import {useRouter} from 'vue-router'

  export default {
    name: "Show",
    components: {Path},
    setup() {
      const router = useRouter();

      let showPath1 = ref(true);
      let showPath2 = ref(true);
      let showPath3 = ref(true);
      let compPath = ref(null);

      const state1 = reactive({
        init1: true,
        on1: false,
        click1: false,

      });
      const state2 = reactive({
        init2: true,
        on2: false,
        click2: false,
      });
      const state3 = reactive({
        init3: true,
        on3: false,
        click3: false,
      });
      const stateAll = reactive({
        initAll: true,
        onAll: false,
        clickAll: false,
      });

      const switchPath = (value, tag) => {
        let path = "path" + tag;
        let pc = "pc" + tag;
        if (value) {
          document.getElementById(path).setAttribute('display', "true");
          let elementsByClassName = document.getElementsByClassName(pc);
          for (let element of elementsByClassName) {
            element.setAttribute('display', "true");
          }
        } else {
          document.getElementById(path).setAttribute('display', "none");
          let elementsByClassName = document.getElementsByClassName(pc);
          for (let element of elementsByClassName) {
            element.setAttribute('display', "none");
          }
        }
      };

      onMounted(() => {
        // console.log(compPath);
      });

      const clickFun = (flag) => {
        compPath.value.reload(flag);
      };
      const clickFunAll = () => {
        compPath.value.reloadAll();
      };
      const showOrder = () => {
        router.push('/order')
      };


      return {
        showPath1,
        showPath2,
        showPath3,
        clickFun,
        clickFunAll,
        switchPath,
        compPath,
        showOrder,
        ...toRefs(state1),
        ...toRefs(state2),
        ...toRefs(state3),
        ...toRefs(stateAll),
      }
    }
  }
</script>

<style scoped lang="scss">
  .switch {
    margin-bottom: -100px;
    margin-top: 40px;
    margin-right: 250px;
    float: right;
    font-size: 16px;
    font-weight: bold;

    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }
  }

  .reload-init {
    transform: rotate(0deg);
    transition: all 1s ease 0s;
    opacity: 1;
  }

  .reload-on {
    transform: rotate(360deg);
    transition: all 1s ease 0s;
    opacity: 1;
  }

  .reload-click {
    transform: rotate(360deg) scale(1.3);
    transition: all 1s ease 0s;
    opacity: 0.3;
  }

  .doc {
    float: left;
    margin: 40px 0 -100px 150px;
    font-size: 20px;
    text-align: left;

  }
</style>