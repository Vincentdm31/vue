import AxClickOutside from '../../../directives/click-outside';

export const selectMixin = {
  directives: {
    axClickOutside: AxClickOutside,
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    singleLine: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    chipsClosable: {
      type: Boolean,
      default: false,
    },
  },
};

export const updateComputedItems = (computedItems, itemsRef, vmodel, props, multipleSelected, selected) => {
  computedItems.value = itemsRef.value.reduce((acc, item, i) => {
    let obj;
    const isSelected =
      (item.selected && !vmodel.value) ||
      (!props.multiple && vmodel.value === item) ||
      (props.multiple && vmodel.value.includes(item.value)) ||
      (props.multiple && vmodel.value.length === 0 && item.selected);

    const baseObj = {
      index: i,
      selected: isSelected,
    };

    if (typeof item !== 'object') {
      obj = Object.assign(
        {
          name: item,
          value: item,
        },
        baseObj
      );
    } else {
      obj = Object.assign(item, baseObj);
      if (!obj.value) obj.value = obj.name;
    }

    if (isSelected) props.multiple ? multipleSelected.value.push(obj) : (selected.value = obj);

    acc.push(obj);
    return acc;
  }, []);
};

export const toggleState = (state = false, isOpened, opacity, isTop, container) => {
  if (state) {
    isOpened.value = true;
    setTimeout(() => {
      const bottomEl = container.value.getBoundingClientRect().bottom;
      const isInViewport = bottomEl <= (window.innerHeight || document.documentElement.clientHeight) - 10;

      isInViewport ? (isTop.value = false) : (isTop.value = true);

      opacity.value = 1;
    }, 50);
    return;
  }

  opacity.value = 0;
  setTimeout(() => {
    isOpened.value = false;
    isTop.value = false;
  }, 300);
};

export const selectEl = (i, selected, computedItems, ctx, vmodelEvent) => {
  if (selected.value && selected.value.index >= 0) {
    if (selected.value.index === i) return;
    const lastItem = computedItems.value[selected.value.index];
    lastItem.selected = false;
    computedItems.value.splice(selected.value.index, 1, lastItem);
  }

  const item = computedItems.value[i];
  item.selected = true;
  selected.value = item;

  computedItems.value.splice(i, 1, item);

  ctx.emit(vmodelEvent, item.value);
};

export const selectMultipleEl = (i, computedItems, multipleSelected, ctx, vmodelEvent, result) => {
  const item = computedItems.value[i];

  const index = multipleSelected.value.findIndex((val) => val.value === item.value && item.selected);

  if (index !== -1) {
    multipleSelected.value.splice(index, 1);
    item.selected = false;
  } else {
    multipleSelected.value.push(item);
    item.selected = true;
  }

  computedItems.value.splice(i, 1, item);

  ctx.emit(vmodelEvent, result.value);
};

export const unselectEl = (i, computedItems, multipleSelected) => {
  const item = computedItems.value[i];
  item.selected = false;
  computedItems.value.splice(i, 1, item);

  const index = multipleSelected.value.findIndex((val) => val.value === item.value);
  multipleSelected.value.splice(index, 1);
};

export const removeByVal = (value, computedItems, multipleSelected) => {
  const i = computedItems.value.findIndex((val) => val.value === value);
  unselectEl(i, computedItems, multipleSelected);
};
