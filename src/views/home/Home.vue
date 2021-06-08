<template>
  <div id="home">
    <h1>宝信软件UACS模拟系统</h1>
    <div>
      <el-form>
        <van-row justify="center">
          <van-col span="5" class="block">
            <van-field
                    v-show="showCrane[0]"
                    label="Crane1 类别"
                    style="padding: 15px">
              <template #input>
                <el-select v-model="form.crane1" multiple placeholder="该行车可执行的任务类型" style="width: 240px">
                  <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </van-field>
            <van-field
                    v-show="showCrane[1]"
                    label="Crane_2 类别"
                    style="padding: 15px">
              <template #input>
                <el-select v-model="form.crane2" multiple placeholder="该行车可执行的任务类型" style="width: 240px">
                  <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </van-field>
            <van-field
                    v-show="showCrane[2]"
                    label="Crane_3 类别"
                    style="padding: 15px"
            >
              <template #input>
                <el-select v-model="form.crane3" multiple placeholder="该行车可执行的任务类型" style="width: 240px">
                  <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </van-field>
          </van-col>
          <van-col span="8" class="block">
            <div>
              <el-dropdown split-button type="primary" @command="addCrane" style="margin: 10px 10px 10px 10px">
                添加行车
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="0">Crane_1</el-dropdown-item>
                    <el-dropdown-item command="1">Crane_2</el-dropdown-item>
                    <el-dropdown-item command="2">Crane_3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown split-button type="danger" @command="removeCrane" style="margin:10px 10px 10px 10px">
                删除行车
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="0">Crane_1</el-dropdown-item>
                    <el-dropdown-item command="1">Crane_2</el-dropdown-item>
                    <el-dropdown-item command="2">Crane_3</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div>
              <el-select v-model="form.algorithm" placeholder="请选择算法" style="padding: 10px 20px">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-button type="success" icon="el-icon-check" style="padding: 10px 10px"
                         @click="onSubmit"
                         :loading="load">
                计算
              </el-button>
            </div>
          </van-col>
        </van-row>
        <van-row justify="center">
          <van-col span="8" class="block">
            <h4 style="text-align:left;margin-left: 30px">任务配置</h4>
            <div class="stock">
              <div>
                <el-tag type="danger" effect="dark" style="font-size: large; margin: 0 5px 10px 0">倒剁 任务(0)</el-tag>
                <el-input-number v-model="form.task1.num" :min="0" :max="99" controls-position="right" size="medium"
                                 style="width: 85px"/>
              </div>
              <div>
                <el-select v-model="form.task1.beginType" multiple placeholder="开始库位"
                           style="width: 280px;margin: 0 5px 0 0" :disabled="form.task1.num===0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="form.task1.endType" multiple placeholder="结束库位" style="width: 280px"
                           :disabled="form.task1.num===0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>

            </div>
            <div class="stock">
              <div>
                <el-tag type="warning" effect="dark" style="font-size: medium; margin: 0 5px 10px 0">出入库任务(1)</el-tag>
                <el-input-number v-model="form.task2.num" :min="0" :max="99" controls-position="right" size="medium"
                                 style="width: 85px"/>
              </div>
              <div>
                <el-select v-model="form.task2.beginType" multiple placeholder="开始库位" :disabled="form.task2.num===0"
                           style="width: 280px;margin: 0 5px 0 0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="form.task2.endType" multiple placeholder="结束库位" style="width: 280px"
                           :disabled="form.task2.num===0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>

            </div>
            <div class="stock">
              <div>
                <el-tag type="primary" effect="dark" style="font-size: large; margin: 0 5px 10px 0">机组 任务(2)</el-tag>
                <el-input-number v-model="form.task3.num" :min="0" :max="99" controls-position="right" size="medium"
                                 style="width: 85px"/>
              </div>
              <div>
                <el-select v-model="form.task3.beginType" multiple placeholder="开始库位"
                           style="width: 280px;margin: 0 5px 0 0" :disabled="form.task3.num===0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="form.task3.endType" multiple placeholder="结束库位" style="width: 280px"
                           :disabled="form.task3.num===0">
                  <el-option
                          v-for="item in stocks"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>

            </div>
          </van-col>
          <van-col span="5" class="block">
            <h4 style="text-align:left;margin-left: 20px">
              行车配置
              <el-button type="success" size="mini" round plain
                         @click="submitCrane"
                         style="margin-left: 5px; font-size: 14px">修改
              </el-button>
            </h4>
            <div class="crane">
              <el-tag type="info" effect="dark" style="font-size: large; margin: 0 5px 10px 0">避让距离（mm）</el-tag>

              <el-input placeholder="请输入避让距离" v-model="craneInfo.distance" style="width: 150px">
                <template #suffix>
                  <i class="el-icon-edit el-input__icon"> </i>
                </template>
              </el-input>
            </div>
            <crane-config-list v-model:crane-list="craneInfo.craneList"
                               :show-list="showCrane">
            </crane-config-list>
          </van-col>
        </van-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getStockNo, query, getCraneInfo, updateCraneInfo} from "../../network/home";
  import {onMounted, reactive, toRefs, ref} from 'vue'
  import {useRouter} from 'vue-router'
  import {useStore} from 'vuex'
  import {ElNotification, ElMessage} from 'element-plus';

  import CraneConfigList from "./children/CraneConfigList";

  export default {
    name: "Home",
    components: {
      CraneConfigList,
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      let state = reactive({
        showCrane: [false, false, false],
        types: [
          {value: 0, label: "倒剁"},
          {value: 1, label: "出入库"},
          {value: 2, label: "机组"},
        ],
        load: false,
        stocks: [],
        form: {
          crane1: [],
          crane2: [],
          crane3: [],
          algorithm: 0,
          task1: {
            beginType: [],
            endType: [],
            num: 0,
          },
          task2: {
            beginType: [],
            endType: [],
            num: 0,
          },
          task3: {
            beginType: [],
            endType: [],
            num: 0,
          },
        },
        craneInfo: {
          distance: 26000,
          craneList: [
            {
              craneName: "crane1",
              begin: "1, 2, 3",
              v1: 2,
              v2: 3,
              v3: 4
            },
            {
              craneName: "crane2",
              begin: "2, 1, 3",
              v1: 2,
              v2: 3,
              v3: 4
            },
            {
              craneName: "crane3",
              begin: "3, 2, 1",
              v1: 2,
              v2: 3,
              v3: 4
            }
          ]
        }
      });
      let values = ref("ssssdas");
      let options = ref([{
        value: 0,
        label: '模拟退火'
      }, {
        value: 1,
        label: '遗传算法'
      }, {
        value: 2,
        label: '蚁群算法'
      }]);

      onMounted(() => {
        getStockNo().then(res => {
          for (let index in res.data) {
            state.stocks.push({
              value: Number(index),
              label: res.data[index]
            })
          }
        });
        getCraneInfo().then(res => {
          state.craneInfo = res;
        })

      });

      let addCrane = (command) => {
        state.showCrane[command] = true;
      };
      let removeCrane = (command) => {
        state.showCrane[command] = false;
        if (command === '0') {
          state.form.crane1 = [];
        } else if (command === '1') {
          state.form.crane2 = [];
        } else {
          state.form.crane3 = [];
        }
      };
      let onSubmit = () => {
        // console.log('submit', state.form);
        state.load = true;
        console.log(state.form);
        query(state.form).then(res => {
          console.log(res);
          if (res.code && res.code === 200) {
            console.log(res.time);
            let algorithm = state.form.algorithm === 0 ? "模拟退火" : state.form.algorithm === 1 ? "遗传算法" : "蚁群算法";
            store.commit("setResult", {algorithm, consumeTime: res.time});
            state.load = false;
            setTimeout(() => {
              router.push("/show");
            }, 100);
          }
          state.load = false;
        }).catch(err => {
          state.load = false;
          ElNotification({
            title: '错误',
            message: '可能发生了一些错误！！！',
            type: 'error'
          });
          // console.log(err);

        })
      };
      const submitCrane = () => {
        updateCraneInfo(state.craneInfo).then(res => {
          ElMessage.success({
            message: '修改成功',
          });
          console.log(res);
        }).catch(error => {
          ElMessage.error({
            message: '发生了一些错误',
          });
        });
      };
      return {
        addCrane,
        removeCrane,
        onSubmit,
        options,
        values,
        submitCrane,
        ...toRefs(state),
      }
    },
    data() {
      return {};
    },
    methods: {},
  }
</script>

<style lang="scss">
  .block {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .van-field__label {
      margin-top: 10px;
    }
  }

  .stock {
    margin-bottom: 60px;
    text-align: left;
    margin-left: 59px;
  }

  .crane {
    margin-bottom: 20px;
    text-align: left;
    margin-left: 40px;
  }

</style>