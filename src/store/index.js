import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  test1: 1,
  test2: [1, 2, 3],
  test3: {
    pr1: 1,
    pr2: 2,
    pr3: 3
  },
  test4: 10
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
