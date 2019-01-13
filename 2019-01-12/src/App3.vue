<template>
  <div id="app">
      {{toDou}},{{this.$store.getters.toDou}}<!-- 这个自己改了一下，后边一个是原始的，为了测试-->
      <hr>
      {{ary}}
      <ul>
        <li v-for="(val,key) in toDou">
          {{val.num}}
          <button @click="changeNum(val.id)">+</button>
         
        </li>
      </ul>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations } from 'vuex';
export default {
  name:'app',
  methods:{
    changeNum(id){
      this.$store.commit({
        type:'INCREMENT',
        n:1,
        id
      });
      // this.INCREMENT(1);
    }
  },
  computed:{
    ...mapState(['ary']),
    ...mapGetters(['toDou']),
    // ...mapMutations(['INCREMENT'])
  }
}
</script>