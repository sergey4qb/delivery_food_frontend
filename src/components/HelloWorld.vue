<template>
 <div class="post">
   <form action="#" @submit.prevent>
     <input
         v-bind:value="title"
         @input = "this.title = $event.target.value"
     >
     <input
         v-bind:value="body"
         @input = "this.body = $event.target.value"

     >
     <button @click = "createPost">
      ДОБАВИТЬ ПОСТ
     </button>
   </form>
   <div class="posts" v-for="post in posts" :key="post.id">
   <div>
     {{ post.title }}
   </div>
   <div>
     {{ post.body }}
   </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {},

  props: {
    msg: String
  },
  data(){
    return{
      posts: [
        {id:1, title: "post", body:"post body"}
      ],
      title: '',
      body : ''
    }
  },
  methods:{
    createPost(){
      const newObject = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newObject)
      this.title = ''
      this.body = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
