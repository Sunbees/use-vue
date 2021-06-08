<template>
  <div>
    <crane-config v-for="(item,index) in craneList" :key="item.craneName"
                  v-show="showList[index]"
                  :crane-info="item"/>
  </div>
</template>

<script>
  import CraneConfig from "./CraneConfig";

  export default {
    name: "CraneConfigList",
    components: {
      CraneConfig,
    },
    props: {
      craneList: {
        type: Array,
        default: [
          {
            isShow: true,
            craneName: "",
            begin: "",
            v1: 0,
            v2: 0,
            v3: 0
          }
        ]
      },
      showList: {
        type: Array,
        default: [false, false, false]
      }
    }
  }
</script>

<style scoped>

</style>