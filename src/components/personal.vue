<template>
    <div id="personal">
        <div class="container">
        <div class="navButton">
             <input type="button" value="个人中心" class="btn" @click="msg=1" :class="{'curr':msg===1}">
              <input type="button" value="订单管理" class="btn" @click="msg=0" :class="{'curr':msg===0}">
         </div>
         <div v-show="msg==0" class="showMes">
             <ul class="liHistory">
                 <li v-for="orderMes in orderMessage.data">
                     <p><img :src="orderMes.Cpicture" width="150px" alt=""></p>
                     <p> 车辆名称：<span>{{orderMes.Cmodel}}</span> <br> <br>
                         归还时间：<span>{{orderMes.Creturntime}}</span><br><br>
                    取车电话:<span>{{orderMes.Sphone}}</span>&nbsp;&nbsp;是否违约：<span>{{orderMes.distime}}</span>
                         </p>
                 </li>
             </ul>
         </div>
         <div v-show="msg==1" class="showMes">
                 <img src="../../static/img/touxiang.jpg" width="100px" alt="" class="touxiang">
                 <p>你好，{{orderMessage.Uname}}</p>
                 <br>
                 <p>您的订单：{{orderMessage.Ulength}} | 违约次数：{{orderMessage.distime}}</p>
         </div>
        </div>
         
    </div>
</template>

<script>
export default {
    name:'personal',
    data(){
        return{
            msg:1,
            orderMessage:''
        }
    },
    methods:{
        getData(){
              this.$http({
                url: `http://localhost/yafgxw/userhome`,
                method: 'get'
            })
            .then(res=>{
                this.orderMessage=res.data;
              this.orderMessage.distime=res.data.dismis==1?'违约':'无违约记录'
            })
            .catch(err=>{
                alert('error')
            })
        }
    },
    beforeMount(){
        this.getData()
    }
}
</script>
<style scoped>
#personal{
    background: rgb(216, 216, 216);
    width: 100%;
    box-sizing: border-box;
    height: 800px;
    padding: 1px;
}
.container{
    width: 1200px;
    height: 750px;
    background: white;
    margin: 20px auto;
    border-radius: 2%
}
.navButton{
    float: left;
    width: 250px;
    height: 500px;
    border-right: 1px solid #ccc
}
.curr{
    font-size: 21px !important;
    color: black !important
}
.navButton .btn{
     display: block;
     width: 200px;
     height: 100px;
     background: none;
     border: none;
     font-size: 18px;
     font-weight: bold;
     outline:0;
     color: rgb(112, 107, 107)
}
.showMes{
    float: left;
    width: 900px;
    margin-left: 20px;
    height: 730px
}
.liHistory{
    text-align: left
}
.liHistory li{
    border-bottom: 1px solid;
    overflow: hidden;
}
.liHistory li p{
    float: left;
        margin: 20px;
}
.liHistory li button{
    margin:60px 0 0 300px
}
.liHistory li input[type='text']{
    width: 60px
}
.touxiang{
    margin: 50px 0 10px 0;
}
</style>
