<template>
  <div id="app">
    父级的数据{{num}}
    <p>{{count}}</p><!-- 自己注释：这个count是放在store里边的 -->
    <button @click="fn">按钮</button>
     <hr />
    <HelloWorld :n="num"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import {mapState} from 'vuex';



export default {
  name: 'app',
  data(){
    return {
      num:1
    }
  },
  methods:{
    fn(){
      this.num ++ ;
      // this.$store.commit('add',1); //为了触发mutations
      this.$store.commit({
        type:'add',
        n:10
      });
    }
  },
  // computed:mapState(['count']),

  computed:{
     ...mapState(['count'])
    // count(){
    //   return this.$store.state.num;
    // }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
