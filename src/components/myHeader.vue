<template>
  <div id="myHeader">
    <div class="banner" id="banner">
      <img src="../assets/logo.png" width="70px">
    </div>
    <span class="title">
     <router-link :to="{name:'root'}"> <b>车友</b></router-link>
      <i>汽车租聘平台</i>
    </span>
    <div class="status" v-if="loading">
        <router-link :to="{name:'logreg'}">登陆</router-link> |
        <router-link :to="{name:'logreg'}">注册</router-link>
    </div>
    <div class="status" v-else> 
       <router-link :to="{name:'personal'}">个人主页</router-link> | <span class="out" @click="logout()">退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "myHeader",
  data(){
    return{
       loading:true
    }
  },
  inject:['reload'],
  methods:{
getData() {
      //获取用户信息
      this.$http({
        url: `http://localhost/yafgxw/login`,
        method: "get"
      })
        .then(res => {
          if (res.data.code == 1) {
            this.loading = false;
          }else{
            this.loading= true
          }
        })
        .catch(err=>{
          alert('error')
        });
    },
    logout(){
       this.$http({
        url: `http://localhost/yafgxw/loginout`,
        method: "get"
      })
        .then(res => {
          this.$router.push('/')
           this.reload()             
        })
        .catch(err=>{
          this.$router.push('/')
           this.reload()
        } 
        );
    }
  }, 
  watch:{
            $route(){
              this.getData()
            }
  },
  beforeMount(){
      this.loading=true;
      this.getData()
  }
};
</script>
<style scoped>
#myHeader{
  width: 100%;
  height: 70px;
  box-shadow:2px 2px 10px white;
  background: #1B2B3B;
  overflow: hidden;
}
.banner{
	width:  8.5%;
	height: 120px;
	float: left;
    overflow: hidden;
     transition: all 0.2s;
}
#myHeader .title{
	display: inline-block;
	width: 180px;
	font-size: 35px;
	height: 62px;
	text-align: left;
	margin: 0 80px;
	line-height: 50px;
  position: relative;
	left: -450px;
	top: 10px;
}
#myHeader span b{
  color: rgb(253, 253, 253);
}
#myHeader span i{
	font-size: 14px;
    color: #FFB200;
    font-style: normal;
}
.status{
  float: right;
  width: 200px;
  margin-top: 30px;
}
.status,.status a{
      color: white
}
.status .out{
  font-size: 16px;
  display: inline-block;
  cursor: pointer;
}
</style>


