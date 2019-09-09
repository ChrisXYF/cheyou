<template>
  <div id="carList">
    <ul class="showList">
      <li v-for="list in messages">
        <img :src="list.Curl" width="240px" height="150px" alt>
        <p>
          <span class="desTitle">汽车型号：</span>
          <span class="desText">{{list.Cmodel}}</span>
        </p>
        <p>
          <span class="desTitle">汽车品牌：</span>
          <span class="desText">{{list.Cmader}}</span>
        </p>
        <p>
          <span class="desTitle">汽车类型：</span>
          <span class="desText">{{list.Ctype}}</span>
        </p>
        <p>
          <span class="desTitle">介绍：</span>
          <span class="desText">{{list.Cnote}}</span>
        </p>
        <p>
          <span class="desTitle">单价：</span>
          <span class="carPrice desText">{{list.Cprice}}￥</span> / 日均
        </p>
        <p class="detail">
          <router-link :to="{name:'carDetail',params: { id: list.Cid }}" v-if="list.code==1">详情</router-link>
          <el-button :plain="true" @click="openVn" v-else>详情</el-button>
        </p>
      </li>
    </ul>
    <div class="police">
      <el-button
    plain
    @click="open1">
    温馨提示
  </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "showList",
  props: ["messages"],
  methods:{
     open1() {
        const h = this.$createElement;

        this.$notify({
          title: '安全提醒',
          message: h('i', { style: 'color: teal'}, '道路千万条，安全第一条。行车不规范，亲人两行泪')
        });
      },
    openVn() {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '请先登录 '),
            h('i', { style: 'color: teal' }, '!')
          ])
        });
      }
    }
};
</script>
<style scoped>
.showList {
  width: 85%;
  margin-top: 20px;
}
.showList li {
  float: left;
  width: 320px;
  height: 400px;
  border-radius: 5%;
  box-shadow: 1px 1px 8px #ccc, -1px -1px 8px #ccc;
  margin-left: 50px;
  margin-bottom: 20px;
  background: white;
  overflow: hidden;
}
.showList li img {
  margin-top: 10px;
}
.showList li p {
  text-align: left;
  margin: 15px 39px;
  color: rgb(37, 62, 63);
  white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    width:280px;
}

.carPrice {
  color: red !important;
  font-size: 19px !important;
}
.desTitle {
  font-weight: bold;
  font-size: 16px;
  color: rgb(83, 111, 126);
}
.desText {
  color: black;
  font-size: 13px;
}

.detail {
  position: relative;
  left: 60%;
  bottom: 10%;
}
.detail a {
  background: url(../../static/img/detail.jpg) no-repeat;
  background-size: 100%;
  display: block;
  width: 80px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border: none;
  font-size: 20px;
  color: rgb(34, 82, 23);
  font-weight: bold;
}
.police {
     float: right;
     margin-right: 20px;
}

</style>
