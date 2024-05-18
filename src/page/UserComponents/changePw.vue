<template>
  <div class="home">
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="原密码：">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.oldPassword"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="新密码：">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.newPassword"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="确认密码:">
                    <el-input
                      style="width: 220px"
                      placeholder="请输入密码"
                      v-model="form.rePassword"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { GetUserInfoByid, ChangePassword } from '@/api/user'
import { changePwd, GetUserInfoByid, updateUserInfo } from "@/apis/buser";

export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        rePassword: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async onSubmit() {
      if (this.form.newPassword != this.form.rePassword) {
        this.$notify({
          title: "失败",
          message: "两次输入密码不一致请重新输入",
          type: "warning",
          offset: 50,
        });
        this.form.newPassword = "";
        this.form.rePassword = "";
        return;
      }
      const user = JSON.parse(
        window.localStorage.getItem("__BUSERS") ?? "null"
      );
      if (user) {
        const form = {
          id: +user.id,
          newPassword: this.form.newPassword,
          oldPassword: this.form.oldPassword,
        };
        // await changePwd(form)
        const res = await GetUserInfoByid(form.id);
        if (res.password !== form.oldPassword) {
          this.$notify({
            title: "失败",
            message: "原密码不正确，请重新输入",
            type: "warning",
            offset: 50,
          });
          this.form.oldPassword = "";
          this.form.newPassword = "";
          this.form.rePassword = "";
        } else {
          await updateUserInfo({
            id: +user.id,
            password: this.form.newPassword,
          });
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            offset: 50,
          });
          this.form.oldPassword = "";
          this.form.newPassword = "";
          this.form.rePassword = "";
        }
      }
    },
    getList() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.site-content {
  display: flex;
  padding: 20px;
  margin-left: 43px;
  margin-right: 43px;
}
.usertopName {
  display: flex;
}
.home {
  background-color: #ffffff;
  border-radius: 13px;
}
.homeContent {
  margin-top: 40px;
}
</style>