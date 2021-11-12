<template>
  <div id="app" class="layout">
    <header>
      <nav class="navbar primary"><span class="navbar-brand">Vue Axentix</span></nav>
    </header>

    <main class="m-5">
      <div class="d-flex fx-center" style="justify-content: flex-end">
        <Rating :stars-nbr="3" :color="'blue'" :hoverColor="'green'" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    currentTab: null,
    rules: {
      required: (value) => !!value || 'Required.',
      autocomplete: (v) => v.length > 0 || 'Required.',
    },
    modal: false,
    modal2: false,
    isSidenavOpened: false,
    isCollapsibleOpened: false,
    isCollapsibleOpened2: true,
    isDropdownOpened: false,
    current: 4,
    maxVisible: 5,
    radio: 'Yes',
    checked: true,
    items: ['Voiture', 'Moto', 'Bus', 'Velo', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    // items: [],
    // items: [
    //   { name: 'Voiture', value: 'Voiture', disabled: false, selected: true },
    //   { name: 'Moto', value: 'Moto', disabled: false },
    // ],
    selectedValue: '',
    multipleSelectedValue: [],
    test: '',
  }),
  watch: {
    currentTab(val) {
      console.log('currentTab', val);
    },
    radio(val) {
      console.log('radio', val);
    },
    checked(state) {
      console.log('check', state);
    },
    selectedValue(val) {
      console.log('selected', val);
    },
    multipleSelectedValue(val) {
      console.log('multipleSelectedValue', val);
    },
  },
  methods: {
    selectAll(toggle) {
      this.multipleSelectedValue = this.multipleSelectedValue.length > 0 ? [] : this.items;
      console.log(this.multipleSelectedValue);
      toggle(false);
    },
    validateForm() {
      console.log(this.$refs.form.validate());
    },
    say() {
      console.log('hey');
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.multipleSelectedValue.push('Voiture');
    //   setTimeout(() => {
    //     this.multipleSelectedValue = [];
    //     setTimeout(() => {
    //       this.multipleSelectedValue = ['Moto'];
    //     }, 1000);
    //   }, 1000);
    // }, 1000);
  },
};
</script>

<style lang="scss">
.pagination li {
  transition: none !important;
}
</style>
