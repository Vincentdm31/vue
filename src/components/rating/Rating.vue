<template>
  <div ref="rating">
    <span v-for="(star, index) of starsNbr" :key="index">
      <i @click="select(index)" @mouseleave="reset(index)" @mouseover="onHover(index)" class="fas fa-star" />
    </span>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, onBeforeUpdate, ref, reactive } from 'vue-demi';
import { addComponent, removeComponent, generateUid } from '../../utils/global';

export default defineComponent({
  name: 'Rating',
  props: {
    starsNbr: {
      type: Number,
      default: 5,
    },
    color: {
      String,
      default: '#1f1e1e',
    },
    hoverColor: {
      String,
      default: '#ff8741',
    },
    fontSize: {
      String,
      default: '1.2rem',
    },
  },
  setup(props, ctx) {
    const uid = generateUid();

    const rating = ref([]);
    let childs = [];

    const state = reactive({
      count: ref(0),
    });

    onBeforeUpdate(() => {
      rating.value = [];
      childs.value = [];
    });

    onMounted(() => {
      init();

      Array.from(rating.value.children).map((el) => {
        childs.push(el);
      });

      console.log('childs', childs);

      childs.map((element) => {
        element.style.color = props.color;
        element.firstChild.style.fontSize = props.fontSize;
      });
    });

    onUnmounted(() => {
      removeComponent(uid);
    });

    const init = () => {
      addComponent({ type: 'Rating', uid, data: { rating } });

      ctx.emit('setup');
    };

    const onHover = (index) => {
      for (let i = 0; i < childs.length; i++) {
        childs[i].classList.remove('active');
        childs[i].style.color = props.color;
      }
      for (let i = 0; i <= index; i++) {
        childs[i].classList.add('active');
        childs[i].style.color = props.hoverColor;
      }
    };

    const reset = () => {
      for (let i = 0; i < childs.length; i++) {
        childs[i].classList.remove('active');
        childs[i].style.color = props.color;
      }
      onHover(state.count - 1);
    };

    const select = (index) => {
      if (index == state.count - 1) {
        state.count = 0;
      } else {
        state.count = index + 1;
        reset();
      }
    };

    return {
      rating,
      childs,
      state,
      reset,
      onHover,
      select,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>

<style lang="scss">
span {
  &.active {
    .fas.fa-star {
    }
  }
  .fas.fa-star {
    font-size: 45px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
