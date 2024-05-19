<template>
  <div class="home">
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="用户名：">
                    <el-input
                      style="width: 220px"
                      disabled
                      v-model="form.username"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="昵称：">
                    <el-input
                      style="width: 220px"
                      v-model="form.nickname"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateUserInfo } from "@/apis/buser";

export default {
  data() {
    return {
      form: {
        id: "",
        username: "",
        nickname: "",
        gender: "",
        introduction: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async onSubmit() {
      //TODO 提交
      await updateUserInfo(this.form);
      this.$notify({
        title: "成功",
        message: "修改成功",
        type: "success",
        offset: 50,
      });
      localStorage.setItem('__BUSERS',JSON.stringify(this.form))
      // TODO RELOAD 
      location.reload();
    },
    getList() {
      const user = JSON.parse(window.localStorage.getItem("__BUSERS"));
      this.form = user;
    },
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