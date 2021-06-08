import {createStore} from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = {
  orderInfo: [],
  pathInfo: {
    path1: [],
    path2: [],
    path3: [],
  },
  algorithm: 'test',
  consumeTime: 0,

};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
