import {getInfo} from '../service/getData'

import {TEST2} from './mutation-types.js'

export default {
  async getUserInfo ({
    commit,
    state
  }) {
    let res = await getInfo();
    commit(TEST2, res);
  }
}
