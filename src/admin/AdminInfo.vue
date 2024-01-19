<template>
  <div class="app-container">
    <div style="width: 100%; margin-top: 10px" class="header">
      <div>
        <div class="titleavatar">
          <el-avatar :size="80" :src="user.avatarUrl"></el-avatar>
        </div>
        <div class="titlename">
          <span>你好呀！ 亲爱的 ♡ {{ user.nickname }} </span>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: center;background-color:#e5f2fd;padding-bottom: 60px;">
      <el-form class="fromclass" ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户名：">
                    <el-input style="width: 220px" v-model="form.username" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="昵称：" prop="nickname" :rules="[
                    { required: true, message: '请输入用户昵称', trigger: 'blur' },
                    { min: 3, max: 9, message: '昵称长度为3-9个字符', trigger: ['blur', 'change'] }
                  ]">
                    <el-input style="width: 220px" v-model="form.nickname" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="email" :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
              <el-input style="width: 220px" v-model="form.email" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码：" prop="phone" :rules="[
              { required: true, message: '请输入电话号码', trigger: 'blur' },
              { pattern: /^1\d{10}/, message: '请输入正确的电话号码', trigger: ['blur', 'change'] }
            ]">
              <el-input style="width: 220px" v-model="form.phone" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址：" prop="address" :rules="[
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]">
          <el-input style="width: 220px" v-model="form.address" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="onSubmit('form')">更新</el-button>
            <el-button>取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateUserInfo } from '@/apis/user'

export default ({
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const user = JSON.parse(localStorage.getItem('__USER'))
      this.user = user
      console.log(this.user)
      // 赋值
      this.form.username = this.user.username
      this.form.nickname = this.user.nickname
      this.form.email = this.user.email
      this.form.phone = this.user.phone
      this.form.address = this.user.address
    },
     onSubmit(formname) {
      this.$refs[formname].validate(async(valid) => {
        if (valid) {
          var that = this
          const res = await updateUserInfo(that.form);
          this.$notify({
            title: '成功',
            message: '更新用户信息成功',
            type: 'success',
            duration: 2000
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
      },
      user: "", // 用户信息
    }
  },
  setup() {

  },
})
</script>


<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss" scoped >
.body {
  padding: 20px;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  height: 204px;
  color: var(--gray-10);
  background: #f1f3f4;
  background-size: cover;
  border-radius: 4px;

  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));

    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }

  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }

    .arco-typography {
      margin-left: 6px;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 204px;
  color: var(--gray-10);
  background: url(../static/images/rainbow.png) no-repeat;
  background-size: cover;
  border-radius: 4px;

  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));

    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }

  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }

    .arco-typography {
      margin-left: 6px;
    }
  }
}

.titlename {
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.titledisplay {
  display: flex;
  justify-content: center;
  padding: 8px;
}

.titleavatar {
  display: flex;
  justify-content: center;
  padding: 8px;
}

.actionintext {
  display: flex;
}

.fromclass {
  margin-top: 20px;
}

.app-container {
  width: 100%;
  padding: 20px;
}
</style>