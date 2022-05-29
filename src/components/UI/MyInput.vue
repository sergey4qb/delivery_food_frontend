<template>
  <input :value="value" @input = "updateInput" type = "text" placeholder="Название">
</template>

<script>
export default {
  name: "MyInput",
  props:{
    value: [String, Number]
  },
  methods:{
    updateInput(e){
      this.$emit("update:value", e.target.value)
    }
  }
}
</script>

<style scoped>

</style>