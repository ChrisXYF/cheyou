<template>
  <div class="carDetail">
    <div class="leftNav">
      <img :src="carData.Cpicture" width="240px" height="150px" alt>
      <div class="intr">
        <h2>{{carData.Cmodel}}</h2>
        <div class="orderIntr">
          <h3>
            租期：
            <span style="color:red">{{carData.time}}天</span>
          </h3>
        </div>
        <div class="place">
          <h3>取车地点</h3>
          <p>取车门店：{{carData.Sname}}</p>
          <p>取车时间：{{carData.Ocreatetime}}</p>
          <p>取车地址：{{carData.Saddress}}</p>
        </div>
        <div class="place">
          <h3>还车地点</h3>
          <p>还车门店：{{carData.Sname}}</p>
          <p>还车时间：{{carData.Oreturntime}}</p>
          <p>还车地址：{{carData.Saddress}}</p>
        </div>
        <div class="introCar">
          <h3>车辆介绍：</h3>
          <p>{{carData.Cnote}}</p>
        </div>
        <div class="orderIntr">
          <h3>订单说明</h3>
          <p>不限公里数，超时费按车辆租赁费及门店服务费均价÷6收取实际超期小时费 (部分0元活动订单，按照40元/小时进行收取)。</p>
        </div>
      </div>
      <div class="Partition">
        <h3>支付方式</h3>
      </div>
      <p class="radioPay">
        <label for="s">门店支付：</label>
        <input type="radio" name="pay" value="store" id="s" checked>
      </p>
      <p class="radioPay">
        <label for="o">在线支付：</label>
        <input type="radio" name="pay" value="online" id="o">
      </p>
    </div>
    <div class="rightNav">
      <p class="Payartition">费用明细</p>
      <p>车辆租赁费及门店服务费</p>
      <p>基本保障服务费</p>
      <p>其他服务费</p>
      <p>押金（可退）3000￥</p>
      <h2>
        总计：
        <span class="cost">{{carData.Cprice}}</span>￥
      </h2>
      <button @click="placeOrder()">提交订单</button>
    </div>
  </div>
</template>

<script>
export default {
    name:'carDetail',
    data(){
      return{
          carData:''
      }
    },
    methods:{
        getDatas(){
        this.$http({
        url: `http://localhost/yafgxw/selectcar/carinfo?Cid=${this.$route.params.id}`,
        method: "get"
      })
        .then(res => {
          console.log(res.data)
          this.carData=res.data 
        })
        .catch(function(error) {
          alert('error');
        });
        },
        placeOrder(){
          this.$http.post("http://localhost//yafgxw/order",{
                Cid: this.carData.Cid,
                Sid: this.carData.Sid
          }).then(
                res=>{
                         if(res.data.code==1){
                           alert('恭喜你，提交成功!')
                            this.$router.push(`/personal`)
                         }else{
                           alert('您不能重复提交!')
                         }
                }
          ).catch(
                 err=>{
                     alert('sorry')
                 }
          )
        }
    },
    beforeMount(){
       this.getDatas()
    }
}
</script>
<style scoped>
.carDetail {
  width: 100%;
  height: 700px;
}
.intr {
  width: 620px;
  float: right;
  padding: 5px;
  font-size: 14px;
  margin-bottom: 20px;
}
.intr h3 {
  font-size: 16px;
  color: rgb(78, 75, 75);
}
.intr p {
  color: rgb(121, 119, 119);
  margin-top: 8px;
}
.orderIntr {
  margin-top: 5px;
}
.leftNav {
  border: 1px solid #ccc;
  width: 900px;
  height: 650px;
  float: left;
  margin: 30px 20px 10px 80px; 
  overflow: hidden;
  padding: 10px;
  text-align: left;
}
.leftNav img {
  margin: 20px 20px 0 0;
}
.rightNav {
  width: 300px;
  border: 1px solid #ccc;
  height: 400px;
  margin-top: 30px;
  float: left;
  text-align: left;
}
.introCar{
  clear: both;
}
.introCar p{
  width: 550px
}
.place {
  float: left;
  margin: 10px 80px 10px 0;
}
.orderIntr {
  clear: left;
}
.Partition {
  width: 120%;
  height: 40px;
  background: rgb(226, 225, 225);
  clear: both;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-left: -15%;
  text-align: left;
}
.Partition h3 {
  line-height: 40px;
  width: 150px;
  margin-left: 140px;
}
.radioPay {
  margin: 20px;
}
.Payartition {
  margin: 0 !important;
  width: 100%;
  height: 40px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: rgb(226, 225, 225);
  text-align: left;
  line-height: 40px;
  color: rgb(248, 138, 59);
  font-weight: bold;
}
.rightNav p {
  margin: 20px 5px;
}
.cost {
  color: rgb(248, 138, 59);
}
button {
  width: 80px;
  height: 40px;
  border: none;
  color: white;
  font-weight: bolder;
  background: rgb(218, 72, 15);
  margin: 30px 0 0 5px;
  border-radius: 10%;
}
</style>
