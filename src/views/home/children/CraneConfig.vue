<template>
  <div class="home">
    <div>
      <el-tag type="info" effect="dark" style="font-size: large; margin: 0 5px 10px 0" size="medium">{{craneInfo.craneName}}
      </el-tag>
      <el-tag type="success" style="margin: 0 5px 10px 0" size="small">起始位置
      </el-tag>
      <el-input placeholder="起始位置" v-model="craneInfo.begin" style="width: 197px" size="small">
        <template #suffix>
          <i class="el-icon-edit el-input__icon"> </i>
        </template>
      </el-input>
    </div>
    <div>
      <el-tag type="danger" style="margin: 0 5px 10px 0" size="small">大车速度
      </el-tag>
      <el-input placeholder="起始位置" v-model="craneInfo.v1" style="width: 100px;margin-right: 8px"
                size="small">
        <template #suffix>
          <i class="el-icon-edit el-input__icon"></i>
        </template>
      </el-input>
      <el-tag type="warning" style="margin: 0 5px 10px 0" size="small">小车速度
      </el-tag>
      <el-input placeholder="起始位置" v-model="craneInfo.v2" style="width: 100px" size="small">
        <template #suffix>
          <i class="el-icon-edit el-input__icon"> </i>
        </template>
      </el-input>
    </div>
    <div>
      <el-tag type="primary" style="margin: 0 5px 10px 0" size="small">夹具起降速度
      </el-tag>
      <el-input placeholder="起始位置" v-model="craneInfo.v3" style="width: 150px" size="small">
        <template #suffix>
          <i class="el-icon-edit el-input__icon"></i>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CraneConfig",
    props: {
      craneInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .home {
    margin-bottom: 20px;
    text-align: left;
    margin-left: 40px;
  }
</style>