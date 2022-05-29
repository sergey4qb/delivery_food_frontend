<template>
  <div v-for="menuItem in menu.menu" :key="menuItem.id">{{menuItem.name}}</div>
</template>

<script>
export default {
  name: "MenuList",
  props : {
    menu :{
      required: true
    }
  },
  methods:{

  },
  mounted() {
    console.log(this.menu)

  }
}
</script>

<style scoped>

</style>