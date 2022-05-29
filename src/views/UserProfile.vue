<template >
<p>{{userinfo.name}}</p>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "UserProfile",
  methods:{
    ...mapActions("user", ["getUserLoggedIn", "getUserInfo"])

  },
  computed:{
    ...mapState("user", ["userinfo"])
  },
  mounted() {
    // this.getUserInfo()
    console.log(this.userinfo)
  }
}
</script>

<style scoped>

</style>