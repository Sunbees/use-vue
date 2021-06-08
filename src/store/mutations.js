const mutations = {
  setOrderInfo(state, payload) {
    state.orderInfo = payload;
  },
  setPathInfo(state, payload) {
    state.pathInfo = payload;
  },
  setResult(state, payload) {
    state.algorithm = payload.algorithm;
    state.consumeTime = payload.consumeTime;
  }
};
export default mutations;