import {TEST1, TEST2} from './mutation-types.js';

export default {
  [TEST1] (state) {
    state.test1++;
  },
  [TEST2] (state, res) {
    state.test4 = state.test4 + res;
  }
}
