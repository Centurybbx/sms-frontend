<template>
  <div class="login">
    <a-layout class="layout">
      <a-layout-header id="header">
        <span>教务管理系统</span>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px" id="content">
        <div
          :style="{ background: '#fff', padding: '24px', minHeight: '580px' }"
        >
          <a-form-model
            class="login-form"
            ref="loginForm"
            :model="formData"
            :rules="rules"
          >
            <h1 class="title">管理员登陆</h1>
            <a-form-model-item prop="username">
              <a-input
                class="inputBox"
                placeholder="用户名"
                v-model="formData.username"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="pwd">
              <a-input
                class="inputBox"
                placeholder="密码"
                v-model="formData.pwd"
                type="password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="loginForm" class="submitBtn">
                <span>提交</span>
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-layout-content>
      <a-layout-footer id="footer">
        教务管理系统 ©2020 Created by Century
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import md5 from 'js-md5'
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const formData = {
  username: "",
  pwd: "",
};

const encryptedData = {
  username: '',
  pwd: ''
}

export default {
  data() {
    return {
      rules,
      formData,
      encryptedData,
      status: false,
    };
  },
  methods: {
    judge_legal_user: function () {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:5000/login",
        data: encryptedData,
      })
        .then((response) => {
          this.status = response.data.success;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginForm: function () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          this.encryptedData.username = this.formData.username;
          this.encryptedData.pwd = md5(this.formData.pwd);
          console.log(this.encryptedData);
          this.judge_legal_user();
          setTimeout(() => {
            if (this.status == true) {
              window.location.href = "http://localhost:8080/#/layout";
            } else {
              alert("您输入的账号或密码有误！");
            }
          }, 200);

          console.log("check ok, to submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login .layout #header {
  font-size: 25px;
  color: #ffffff;
  text-align: center;
}
.login #content {
  margin-top: 60px;
}
.login #footer {
  text-align: center;
}
.submitBtn {
  width: 100%;
  margin: 0 auto;
}
.login-form {
  width: 500px;
  height: 200px;
  margin: 0 auto;
  padding: 98px 84px;
}
.title {
  text-align: center;
  font-size: 20px;
  font-family: Microsoft Yahei;
}
</style>
