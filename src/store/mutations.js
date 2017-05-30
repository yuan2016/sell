import {RECORD_FOODS, RECORD_SELLER} from './mutation-types.js';

export default {
  [RECORD_FOODS] (state, foods) {
    state.foods = foods;
  },
  [RECORD_SELLER] (state, seller) {
    state.seller = seller;
  }
}
