<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(list) in floorlist" :key="list.id" :floorlist="list" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name: "Home",
  components: { ListContainer ,  Recommend ,Rank ,Like , Floor , Brand},
  computed:{
    ...mapState({
      floorlist:(state)=>{
        return state.home.floorlist
      }
    })

  },
  mounted() {
    this.$store.dispatch('getFloorlist')
  },
};
</script>

<style scoped>
</style>