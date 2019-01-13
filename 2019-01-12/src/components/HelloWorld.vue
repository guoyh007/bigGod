<template>
  <div class="hello">
    这个是二级数据{{n}}<!--自己注释： 这个是父亲给儿子的数据 -->
    <p>这个是store的数据{{$store.state.count}}</p>
    <C :nn="n"/>
  </div>
</template>

<script>
import C from './c.vue';
export default {
  name: 'HelloWorld',
  props:['n'],
  components:{
    C
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
