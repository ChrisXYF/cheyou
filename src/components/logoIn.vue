<template>
  <div id="status">
    <input type="button" name value="登陆" class="btn" @click="msg=0" :class="{'cur':msg===0}"> |
    <input type="button" name value="注册" class="btn" @click="msg=1" :class="{'cur':msg===1}">
    <section class="formContent" v-show="msg==0">
      <form action>
        <p>
          <label for>账号:</label>
          <input type="text" name id v-model="username">
        </p>
        <p>
          <label for>密码:</label>
          <input type="password" name id v-model="password">
        </p>
         <p>
          <label for>身份:</label>
          用户：<input type="radio" name="iden" value="1"  v-model="admin"  checked>
         管理员：<input type="radio" name="iden" value="0"  v-model="admin">
        </p>
        <input type="button" value="登陆" @click="log()">
      </form>
    </section>
    <section class="formContent" v-show="msg==1">
      <form action>
        <p>
          <label for>账号:</label>
          <input type="text" name placeholder="请输入6~15位账号" v-model="regUsername">
          <b>o</b>
        </p>
        <p>
          <label for>密码:</label>
          <input type="password" name id v-model="regPassword" placeholder="请输入6-15位密码">
          <b>{{passwordValidate.errorText}}</b>
        </p>
        <p>
          <label for>确认密码:</label>
          <input type="password" name id v-model="passwordcheckModel">
          <b>{{passwordCheckValidate.errorText}}</b>
        </p>
        <p>
          <label for>电话:</label>
          <input type="number" name id v-model="uphone">
         <b>{{nameValidate.showText}}</b>
        </p>
        <input type="button" @click="reg()" value="注册">
      </form>
    </section>
  </div>
</template>
<script>
export default {
  name: "logreg",
  data() {
    return {
      msg: 0,
      username: "",
      password: "",
      regUsername: "",
      regPassword: "",
      admin:"",
      uphone: "",
      passwordcheckModel: "",
      isCheckedName: false,
      isCheckedPas: false,
      isCheckedRePas: false
    }
  },
  methods: {
      open3(m,n,w) {
        this.$message({
          message: m==1?w:n,
          type: 'warning'
        });
      },
      open2(m) {
        this.$message({
          message: m==1?'恭喜你，登陆成功！':'恭喜你，注册成功！',
          type: 'success'
        });
      },
    log() {
      this.$http
        .post("http://localhost/yafgxw/login", {
          username: this.username,
          password: this.password,
          admin: this.admin
        })
        .then(res => {
          if(res.data.code==1){
              this.open2(1) 
              if(this.admin==0){
              window.location.href="/admin/index"
              }else
          this.$router.push('/')
          }
          else {
            this.open3(1,'','密码错误或用户名不存在')
          }
        })
        .catch(err => {
         this.open3(1,'','网络错误')
              window.location.href="/admin"

        });
    },
    reg() {
         if(this.isCheckedName&&this.isCheckedPas&&this.isCheckedRePas)
      this.$http
        .post("http://localhost/yafgxw/regist", {
          username: this.regUsername,
          password: this.regPassword,
          uphone:this.uphone
        })
        .then(res => {
         if(res.data.code==1)
         {
           this.open2(2)
            this.$router.push('/')
         }
          else {
            this.open3(2,res.data.mes)
          }
        })
        .catch(err => {
          this.open3(2,'网络错误')
        })
        else
        this.open3(2,'输入有误')
    }
  },
  computed: {
    nameValidate: function() {
      var showText;
      if (!/^[0-9A-Za-z]{0,15}$/.test(this.uphone)) {
        showText = "×";
        this.isCheckedName=false
      } else {
        showText = "√";
        this.isCheckedName=true
      }
      if (!this.uphone) {
        showText = "x";
        this.isCheckedName=false
      }
      return {
        showText
      };
    },
    passwordValidate: function() {
      var errorText;
      if (!/^[0-9A-Za-z]{6,15}$/.test(this.regPassword)) {
        errorText = "×";
        this.isCheckedPas=false
      } else {
        errorText = "√";
        this.isCheckedPas=true
      }
      if (!this.regPassword) {
        errorText = "x";
        this.isCheckedPas=false
      }
      return {
        errorText
      };
    },
    passwordCheckValidate: function() {
      var errorText;
      if (!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
        errorText = "×";
        this.isCheckedRePas=false
      } else if (this.passwordcheckModel !== this.regPassword) {
        errorText = "×";
        this.isCheckedRePas=false
      } else {
        errorText = "√";
        this.isCheckedRePas=true
      }
      return {
        errorText
      };
    }
  }
};
</script>
<style scoped>
#status {
  width: 400px;
  height: 300px;
  border: 1px solid #cccccc;
  border-radius: 10%;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -200px;
  overflow: hidden;
  animation: waiting 1s;
}
@keyframes waiting {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}
.btn {
  border: none;
  background: none;
  font-size: 25px;
  margin-top: 30px;
  cursor: pointer;
  outline: 0;
  color: rgb(4, 92, 207);
}
.cur {
  font-weight: bold;
}
.formContent {
  position: absolute;
  top: 30%;
  left: 10%;
}
.formContent label {
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 32px;
  color: rgb(4, 11, 17);
  text-align: right;
  font-size: 18px;
  margin-right: 5px;
}
.formContent input[type="text"],
.formContent input[type="number"],
.formContent input[type="password"] {
  width: 160px;
  height: 25px;
  font-size: 16px;
  border: 1px solid #ccc;
  background: none;
}
.formContent input[type="button"] {
  width: 60px;
  height: 40px;
  background: none;
  border: 1px solid #cccccc;
  border-radius: 10%;
  margin-top: 0px;
  margin-left: 10px;
  outline: none;
}
.formContent p {
  margin-bottom: 10px;
  /* width: 300px;border: 1px solid */
}
.formContent p:last-of-type {
  margin-top: 10px;
}
.formContent b {
  color: rgb(16, 135, 214);
}
</style>
