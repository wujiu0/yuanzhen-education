<template>
  <div id="app">
    <MainComponent></MainComponent>

  </div>
</template>

<script>
import MainComponent from '@/components/MainComponent.vue';

export default {
  name: 'App',
  components: {
    MainComponent,
  },
  data() {
    return {
      name: '张三',
      sex: '',
      phone: '17878787878',
    };
  },
  methods: {},
};
</script>

<style>
body {
  background-color: #f7f8fa;
}

#userForm {
  margin: 5vh 5vw;
}
</style>
