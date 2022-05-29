<template>
  <form @submit.prevent>
    <my-input
        v-model:value="post.title" type = "text" placeholder="Название"
    />
    <my-input
        v-model:value="post.body" type = "text" placeholder="тело"
    />
    <my-button @click = "createPost">создать</my-button>
  </form>

</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
export default {
  name: "PostForm",
  components: {MyButton, MyInput},
  data(){
    return{
      post:{
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>

</style>