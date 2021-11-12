import Rating from './Rating.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Rating);
  },
};

use(Plugin);

export default Plugin;

export { Rating };
