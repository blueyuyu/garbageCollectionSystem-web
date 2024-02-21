<template>
  <div class="app-container">
    <!-- 上方处理按钮 -->
    <div class="topList">
      <div
        style="
          width: 60%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0 20px 20px;
        "
      >
        <el-input
          placeholder="请输入用户名"
          suffix-icon="el-icon-search"
          v-model="input.username"
          class="input-margin"
        >
        </el-input>
        <el-input
          placeholder="请输入用户邮箱"
          suffix-icon="el-icon-message"
          v-model="input.email"
          class="input-margin"
        >
        </el-input>
        <el-input
          placeholder="请输入用户地址"
          suffix-icon="el-icon-position"
          v-model="input.address"
          class="input-margin"
        >
        </el-input>
        <button class="topBtn searchBtn" @click="handleSearch">搜索</button>
        <button class="topBtn resetBtn" @click="handleCancel">重置</button>
      </div>
      <div class="topListLeft" style="padding: 0 0 20px 20px">
        <button class="topBtn searchBtn" @click="handleAdd">新增</button>
        <button class="topBtn delBtn" @click="handleDelete">批量删除</button>
        <button class="topBtn searchBtn" @click="handleImport">导入</button>
        <button class="topBtn searchBtn" @click="handleExport">导出</button>
      </div>
    </div>
    <!-- 下方数据表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      :cell-style="columnStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        label="ID"
        min-width="10%"
        style="font-weight: 800"
      >
      </el-table-column>

      <el-table-column
        min-width="10%"
        align="center"
        prop="username"
        label="用户名"
      >
      </el-table-column>

      <el-table-column
        min-width="10%"
        align="center"
        prop="nickname"
        label="昵称"
      >
      </el-table-column>

      <el-table-column min-width="15%" align="center" prop="email" label="邮箱">
      </el-table-column>

      <el-table-column min-width="15%" align="center" prop="phone" label="电话">
      </el-table-column>

      <el-table-column
        min-width="15%"
        align="center"
        prop="address"
        label="地址"
      >
      </el-table-column>

      <el-table-column min-width="15%" align="center" prop="role" label="权限">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              type="danger"
              v-if="scope.row.role === 'TOP_ADMIN'"
              >最高权限管理</el-tag
            >
            <el-tag
              size="medium"
              type="success"
              v-if="scope.row.role === 'DATA_ADMIN'"
            >
              资料管理员
            </el-tag>
            <el-tag size="medium" type="info" v-if="!scope.row.role"
              >未分配权限</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button deleteBtn"
            @click="PermissionAssignment(scope.row.id)"
          >
            分配权限
          </button>
          <button
            class="button updateBtn"
            @click="updateUserInfo(scope.row, 'addOrUpdateForm')"
          >
            修改
          </button>
          <button
            class="button deleteBtn"
            @click="delectUserInfo(scope.row.id)"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>

    <!--dialog Form -->
    <el-dialog
      :title="isUpdate ? '修改' : '新增'"
      :visible.sync="dialogFormVisible"
      width="34%"
      :before-close="resetDialog"
    >
      <el-form :model="addOrUpdateForm" ref="addOrUpdateForm" :rules="rules">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="addOrUpdateForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input
            v-model="addOrUpdateForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <template v-if="!isUpdate">
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="addOrUpdateForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input
            v-model="addOrUpdateForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model="addOrUpdateForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input
            v-model="addOrUpdateForm.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取 消</el-button>
        <el-button type="success" @click="confirmDialog('addOrUpdateForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="权限分配"
      :visible.sync="permissionDialogVisible"
      width="34%"
      center
    >
      <div>
        <span style="margin-right: 10px">权限分配</span>
        <el-select v-model="addOrUpdateForm.role" placeholder="请选择权限">
          <el-option label="最高权限管理" value="TOP_ADMIN"></el-option>
          <el-option label="资料管理" value="DATA_ADMIN"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="permissionFn">确 定</el-button>
      </span>
    </el-dialog>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/date.js";
import {
  getUserList,
  updateUserInfo,
  deleteUserById,
  exportUserExcel,
  delUsersByIds,
} from "@/apis/user";
import { setValue, clearObj } from "@/utils/datafn";

export default {
  name: "AllAdmin",
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null, // userlist
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
      },
      multipleSelection: [],
      input: {
        username: "",
        email: "",
        address: "",
      },
      // 为解决bug而引入的中间参数
      searchParam: {
        username: "",
        email: "",
        address: "",
      },
      isSearch: false,
      isUpdate: true,
      // just the userForm
      dialogFormVisible: false,
      permissionDialogVisible: false,
      addOrUpdateForm: {
        id: "",
        username: "",
        nickname: "",
        password: "",
        email: "",
        address: "",
        phone: "",
        role: "",
      },
      formLabelWidth: "70px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" },
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        phone: [
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getStyles() {
      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;

      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);";
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);";
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);";
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);";
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);";
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);";
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);";
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);";
      }

      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);";
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm ");
    },
    async getList() {
      this.listLoading = true;
      let res;
      if (this.isSearch) {
        res = await getUserList(
          this.listQuery.page,
          this.listQuery.limit,
          this.searchParam.username,
          this.searchParam.address,
          this.searchParam.email
        );
      } else {
        res = await getUserList(this.listQuery.page, this.listQuery.limit);
      }
      this.list = res.records;
      this.total = res.total;
      this.listLoading = false;
    },
    async handleSearch() {
      this.isSearch = true;
      this.listQuery.page = 1;
      setValue(this.searchParam, this.input);
      await this.getList();
    },
    handleCancel() {
      clearObj(this.input);
      clearObj(this.searchParam);
      this.isSearch = false;
      this.getList();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.addOrUpdateForm.id = ""; // id 不置空会应发问题；
      this.isUpdate = false;
    },
    async handleDelete() {
      try {
        await this.$confirm("是否确认批量删除？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonClass: "danger",
          confirmButtonText: "删除",
          cancelButtonText: "放弃删除",
        });
        await delUsersByIds(this.multipleSelection);
        this.$notify({
          title: "成功",
          message: "批量删除成功",
          type: "success",
          duration: 2000,
        });
        this.getList();
      } catch (error) {
        this.$notify.error({
          title: "失败",
          message: "取消删除",
        });
      }
    },
    async handleImport() {
      // 等待完成
    },
    async handleExport() {
      console.log("导出");
      const res = await exportUserExcel();
      const blob = new Blob([res], { type: "application/vnd.ms-excel" });
      console.log(res, "who are you");
      // 创建 href 超链接，点击进行下载
      window.URL = window.URL || window.webkitURL;
      const href = URL.createObjectURL(blob);
      const downA = document.createElement("a");
      downA.href = href;
      downA.download = "用户表";
      downA.click();
      // 销毁超连接
      window.URL.revokeObjectURL(href);
      this.$notify({
        title: "成功",
        message: "您已成功导出用户表",
        type: "success",
      });
    },
    confirmDialog(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          var that = this;
          const message = this.isUpdate
            ? "修改用户信息成功"
            : "新增用户信息成功";
          await updateUserInfo(that.addOrUpdateForm);
          this.$notify({
            title: "成功",
            message,
            type: "success",
            duration: 2000,
          });
          this.listQuery.page = 1;
          await this.getList();
          this.resetDialog();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetDialog() {
      this.$refs["addOrUpdateForm"].resetFields();
      this.addOrUpdateForm.password = "";
      this.dialogFormVisible = false;
    },
    updateUserInfo(data) {
      // 留意一下这里的执行顺序,Mounted()创建之后，就会执行resetField()记录初始值
      this.dialogFormVisible = true;
      this.isUpdate = true;
      this.$nextTick(() => {
        setValue(this.addOrUpdateForm, data);
      });
    },
    async delectUserInfo(id) {
      console.log("id", id);
      try {
        await this.$confirm(
          "此操作将永久删除用户，是否确认删除？",
          "确认信息",
          {
            distinguishCancelAndClose: true,
            confirmButtonClass: "danger",
            confirmButtonText: "删除",
            cancelButtonText: "放弃删除",
          }
        );
        await deleteUserById(id);
        this.$notify({
          title: "成功",
          message: "您已成功删除该用户",
          type: "success",
        });
      } catch (error) {
        this.$notify.error({
          title: "失败",
          message: "取消删除",
        });
      }
      this.getList();
    },
    columnStyle({ columnIndex }) {
      if (columnIndex == 0) {
        return "font-weight: 800;font-size: 16px";
      }
    },
    async handleSelectionChange(val) {
      const idList = val.map((item) => item.id);
      this.multipleSelection = idList;
    },
    PermissionAssignment(id) {
      // 赋值id
      this.addOrUpdateForm.id = id;
      this.permissionDialogVisible = true;
    },
    async permissionFn() {
      await updateUserInfo({
        id: this.addOrUpdateForm.id,
        role: this.addOrUpdateForm.role,
      });
      this.$notify({
        title: "成功",
        message: "权限分配成功",
        type: "success",
      });
      await this.getList();
      this.addOrUpdateForm.id = ""
      this.addOrUpdateForm.role = ""
      this.permissionDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.input-margin {
  margin-right: 8px;
}

.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.post-item__preview {
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-size: cover;
  background-position: 50%;
}
.delay-0 {
  -webkit-animation-delay: 0ms;
  animation-delay: 0ms;
  -webkit-animation-fill-mode: backwards !important;
  animation-fill-mode: backwards !important;
}
.text-center {
  text-align: center !important;
}
.flex {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.flex {
  flex: 1;
}
.text-white {
  color: #fff !important;
}
.opacity-50 {
  opacity: 0.5 !important;
}
.app-container {
  padding: 20px;
  width: 100%;
}
.topList {
  background-color: #fff !important;
  border-radius: 8px 8px 0 0;
}

.topListLeft {
  display: flex;
  width: 500px;
}
</style>
