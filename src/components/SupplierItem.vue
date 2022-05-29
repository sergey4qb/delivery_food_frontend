<template>
  <div class="suppliers">
    <div class="supplier clearfix">
      <div class="supplier-media-left-block">
        <div class="supplier-image ">
          <img v-if="!image.isExist" :src="image.noImage" alt="">
          <img v-else :src="supplier.image"  alt="image">
        </div>
      </div>
      <div class="supplier-info-right-block">
        <div>
          <div class="supplier-name--menu__block">
            <div class="supplier-name item-title">{{supplier.name}}</div>
<!--            <div class="supplier-menu" @click = "getMenu">Show menu</div>-->
<!--            <menu-list :menu = "menu"/>-->
          </div>
        </div>
        <div class="supplier-type badge-type">
          {{supplier.type}}
        </div>
        <div class="supplier-address-block">
          <p class="supplier-address">Адрес: {{supplier.address}}</p>
        </div>
        <div class="supplier-working-time__block">
          <div class="supplier-working-time">
            <p>Время работы: {{supplier.workingHours.opening}} - {{supplier.workingHours.closing}}</p>
          </div>
        </div>
        <router-link :to="{name: 'supplierPage', params:{supplierID: this.supplier.id}}">Меню</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import MenuList from "@/components/MenuList";

export default {
  components: {},

  data(){
    return{
      image :{
        isExist : true,
        noImage: require('../assets/No_image_available.png') // не работает, только хардкодом в img src
      },
      menu:{},
    }
  },
  name: "SupplierItem",
  props:{
    supplier:{
      type: Object,
      required: true
    }
  },
  methods:{
    getMenu(){
      axios.get(`http://localhost:8080/GetMenuBySupplierID/${this.supplier.id}`).then(res =>{
        console.log(res.data)
        this.menu = res.data
      }).catch(err => {
        console.log(err)
      })
    },
  },
  beforeCreate() {
    axios.get(this.supplier.image).catch(err => {
      if (err){
        this.image.isExist = false
      }
    })
  }
}
</script>

<style scoped>
  img {
    max-width: 200px;
    border-radius: 20px;
  }
  .supplier{
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    transition: all .5s ;
    box-sizing: border-box;
    border-radius: 60px;
    padding: 50px 75px;
  }
  .supplier:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  /*.supplier > div{*/
  /*  order: 0;*/
  /*  flex: 0 1 auto;*/
  /*  align-self: center;*/
  /*}*/
  .suppliers{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: space-around;
    align-items: flex-start;
    justify-content: space-around;

  }
  .supplier-image{
  }
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .supplier-media-left-block, .supplier-info-right-block{
    float: left;
  }
  .supplier-info-right-block{
    text-align: left;
    padding-left: 50px;
  }
  .supplier-type{

  }
  /*TODO перенести в глобальные стили*/
  .item-title{
    font-size: 22px;
  }
</style>