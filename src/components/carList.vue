<template>
    <div id="searchCar">
        <div class="backSearch">
            <form action="" class="formSearch">
               <h2>租车信息查询</h2>
                <p><label for="">车辆类型：</label><select name="" id="" v-model="user.Cmodel">
                    <option value="小型">小型</option>
                    <option value="紧凑型">紧凑型</option>
                    <option value="中型">中型</option>
                    <option value="大型">大型</option>
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="跑车">跑车</option>
                    </select></p>
                    <p><label for="">汽车品牌：</label><select name="" id="" v-model="user.Cmader">
                    <option value="福特">福特</option>
                    <option value="奔驰">奔驰</option>
                    <option value="保时捷">保时捷</option>
                    <option value="宾利">宾利</option>
                    <option value="广汽丰田">广汽丰田</option>
                    <option value="东风本田">东风本田</option>
                    <option value="一汽丰田">一汽丰田</option>
                    <option value="华晨宝马">华晨宝马</option>
                    <option value="上汽通用凯迪拉克">上汽通用凯迪拉克</option>
                    <option value="广汽本田">广汽本田</option>
                    <option value="上汽大众">上汽大众</option>
                    <option value="大众奥迪">大众奥迪</option>
                    </select></p>
                    <p>
                        <label for="">租车时间：</label><input type="date" name="Ocreatetime" v-model="user.Ocreatetime" id=""> 至 <input type="date" name="Oreturntime" v-model="user.Oreturntime" id="">
                    </p>
                    <p>
                  <label for="">门店位置：</label>
                  <input type="text" placeholder="输入关键字智能检索" @keyup="tipsShow()" @blur="keywordBlur()"  @focus="tipsShow()" v-model="user.Saddress">
                    <div class="tips" v-show="hasContent">
                        <ul class="tipsList">
                        <li v-for="(list,index) in tipsList" @click="addInput(index)" ref="tipsmenu">{{list}}</li>  
                        </ul>
                        </div>
                    </p>
                    <input type="button" value="查询" @click="searchMes()" class="btnSearch">
            </form>
            <div class="tipsSearch">
                 <h2>小贴士</h2>
                 <p>
                     <span class="title">常见问题：</span>
                     <p>1.计费问题：(1)　基本计费单位：1天（24小时），其中租期中非整日的部分:a)不足4小时（含）的，不计基础服务费；b)4小时以上的，按1天计费。
                    　   (2)　计价方式：按天计费，总额=单价*租期;
                    　   (3)　计价说明:
                    　　　a) 不同车型基础服务费价格不同；b) 基础服务费不计入停运损失费、超期违约金。</p>
                    <p> 2.理赔说明：1. 以下情况及其他保险公司不予赔偿的情况，造成的所有经济损失和后果将由您自行承担，请您务必避免：
                        　(1)　超过48小时报案；
                        　(2)　饮酒后驾驶车辆；
                        　(3)　无证驾驶车辆；
                        　(4)　持逾期未审验的驾驶执照驾驶车辆；
                        　(5)　发生事故后驾车逃逸。
                    </p>
                     <p>  3.租车资格：1. 年龄要求：年满18周岁
                    2. 证件要求：A. 首次取车时，请出示以下证件的原件：(1)　本人的有效身份证件.a)	境内客户：二代身份证.b)	港澳客户：港澳居民来往内地通行证（回乡证）.c)	台湾客户：大陆通行证（台胞证）.d)	外籍客户：护照，签证/居住证(2)　本人国内有效驾驶证
　　                  </p>  
                      <p>   4.事故处理问题：1. 如车辆不慎出险，请您注意人身安全，并立即致电神州租车24小时热线400-616-6666转3报案，车辆需由保险公司定损后再修理；
                        2. 为避免处理不当给您带来损失，请您按以下指引处理事故：
                        　(1)　双方交通事故：
                        　　　a)请您立即停车，记录相关事故车辆的车牌号码，索要对方电话号码；
                        　　　b)检查对方驾驶执照，如对方无有效驾照，请立即拨打122报警；
                        　　　c)依据《交通事故快速处理办法》所列的事故情形明确双方责任，如能达成一致
                     </p>
                 </p>
                 <div>
                     <p class="chatTip">您可以进行在线咨询！</p>
                     <a href="http://www.zyy5.cn" class="chat">进入一对一聊天室</a>
                 </div>
            </div>       
        </div>
        <showList v-bind:messages="messages" v-show="dataLength" id="showList"></showList>
    </div>
</template>

<script>
import showList from './showList';
export default {
    name:'carSearch',
    data(){
        return{
            messages:'',
            user:{
                Cmodel:'',
                Cmader:'',
                Saddress:'',
                Ocreatetime:'',
                Oreturntime:''
            },
            dataLength:false ,
            tipsList:'',
            hasContent:false
            
        }
    },
    methods:{
        searchMes(){
             let formData = this.user;
             if(formData.Oreturntime<formData.Ocreatetime){
                 alert('时间输入有误')
                 return
             }
             this.$http({
                url: 'http://localhost/yafgxw/selectcar',
                method: 'post',
                data:{
                  formData
                }
            }).then((res)=>{
                if(!res){
                    alert('暂无此类车信息')
                this.dataLength=false
                    return
                }
                this.messages=res.data;
                let m=0;
                  let timer=null
              timer= setInterval(() => {
                   m+=80;
                   if(m<800){
                       document.documentElement.scrollTop = document.body.scrollTop += m;    
                   }else{
                       clearInterval(timer)
                   }
               }, 50);
                this.dataLength=true
            }).catch((err)=>{
                alert('error')
            })
        },
        tipsShow(){
            if(!this.user.Saddress){
                this.hasContent=false;
                return
            }
            this.$http({
                url: 'http://localhost/yafgxw/selectcar/checkaddress',
                method: 'post',
                data:{
                Saddress:this.user.Saddress
                }
            }).then((res)=>{
                this.tipsList=res.data;
                console.log(res.data)
                this.hasContent=true
            }).catch((err)=>{
                alert('error')
            })
        },
        keywordBlur(){
             setTimeout(()=>{
           this.hasContent=false
        },1100)
            
        },
        addInput(index){
            setTimeout(() => {
                 this.user.Saddress=this.$refs.tipsmenu[index].innerText 
            }, 1000);
           
        }
    },
    components:{
        showList
    }
}
</script>
<style scoped>
#searchCar{
    width: 100%;  
}
.backSearch{
    width: 100%;
    background: url(../../static/img/car.jpeg) no-repeat;
    background-size: 100%;
    background-position-y: 20%;
    padding: 1px;
    box-sizing: border-box;
    animation: back 20s infinite steps(1,start);
}
@keyframes back{
    0%{
        background: url(../../static/img/car.jpeg) no-repeat;
        background-size: 100%;
    }
    25%{
        background: url(../../static/img/car2.jpeg) no-repeat;
        background-size: 100%;
    }
    50%{
        background: url(../../static/img/car3.jpeg) no-repeat;
         background-size: 100%;
    }
    75%{
        background: url(../../static/img/car4.jpeg) no-repeat;
    background-size: 100%;
    }
    100%{
        background: url(../../static/img/car5.jpg) no-repeat;
         background-size: 100%;
    }
}
.backSearch::after{
   content:"."; 
   display:block;
    height:0; 
    visibility:hidden;
     clear:both;
    
}
#showList{
    margin: 10px auto;  
    box-sizing: border-box;
    height: auto;
    background: rgb(255, 255, 255);
    overflow: hidden;    
}
.formSearch{
    width: 550px;
    height: 500px;
    opacity: .9;
    border-radius: 10%;
    background: white;
    box-shadow: 1px 1px 5px #ccc;
    margin:100px 13% 0 8%;
    float: left;
}
.formSearch p{
    margin: 35px 20px;
    text-align: left;
}
.formSearch input{
    height: 20px;
}
.formSearch label{
            display: inline-block;
            width: 120px;
            height: 32px;
            line-height: 32px;
            color: rgb(4, 11, 17);
            text-align: right;
            margin-right: 5px;

}
.tips{
    border: 1px solid;
    border-top:0; 
    margin: -37px 149px;
    width: 159px;
    height: 100px;
    overflow: auto
}
.tips li{
    text-align: left;
    cursor: pointer;
    font-size: 14px;
}
.btnSearch{
    background: rgb(247, 194, 51);
    border-radius: 10%;
    border: none;
    width: 70px;
    line-height: 5px;
    outline: 0;
    margin:80px 0 0 280px;
    padding: 20px
}
.tipsSearch{
    width: 500px;
    height: 600px;
    background: white;
    border: 1px seagreen solid;
    float: left;
    margin:50px 0 20px 0;
    padding: 10px;
    opacity: .9;
    border-radius: 5%;
}
.tipsSearch p{
    text-align: left;
    margin: 5px;
    font-size: 14px
}
.title{
    color: red;
    font-size: 16px;    
    font-weight: bold;
    display: inline-block;
    margin-bottom:10px ;

}
.chatTip{
    font-size: 16px;
    color: red;
    font-weight: bold;
    margin:15px 0 30px 0 !important   
}
.chat{
    font-size: 22px;
    text-decoration: underline;
}
</style>
