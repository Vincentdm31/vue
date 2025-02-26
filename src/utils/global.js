import { ref } from 'vue-demi';

/**
 * Example scheme
 * {
 *  type: 'Modal',
 *  uid: uid,
 *  data: {} <= extra data
 * }
 */
export const store = ref([]);

export const addComponent = (data) => store.value.push(data);

export const removeComponent = (uid) => {
  const i = store.value.findIndex((c) => c.uid === uid);
  if (i !== -1) store.value.splice(i, 1);
};

export const getComponentsByType = (type) => {
  return store.value.filter((ins) => ins.type === type);
};

export const generateUid = () => Date.now() + Math.random().toString().split('.')[1];
