<template>
  <div class="card">
    <van-row justify="center">
      <van-col span="13">
        <h2>任务执行顺序</h2>
        <el-table
                :data="orderInfo"
                max-height="800"
                stripe
                border
                highlight-current-row
                style="width: 100%">
          <el-table-column
                  prop="orderNo"
                  label="任务编号"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="crane"
                  label="执行行车名称"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="start"
                  label="开始地点">
          </el-table-column>
          <el-table-column
                  prop="end"
                  label="结束地点">
          </el-table-column>
          <el-table-column
                  prop="coilNo"
                  label="钢卷号">
          </el-table-column>
          <el-table-column
                  prop="startTime"
                  label="开始时间">
          </el-table-column>
        </el-table>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import {onMounted, reactive, toRefs, ref, watchEffect, watch} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: "Order",
    setup() {
      const store = useStore();
      const state = reactive({
        orderInfo: [],
      });
      onMounted(() => {
        state.orderInfo = store.getters.getOrderInfo;
        for (let order of state.orderInfo) {
          order.start = order.start.join('-');
          order.end = order.end.join('-');
        }
        console.log(state.orderInfo);
        // console.log(state.orderInfo[0].keys());
      });
      return {
        ...toRefs(state),
      }
    },
  }
</script>

<style scoped>
</style>