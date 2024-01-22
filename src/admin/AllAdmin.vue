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
    >
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

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button updateBtn"
            @click="updateUserInfo(scope.row.id)"
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

    <!-- Form -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible" width="34%">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
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
import { getUserList } from "@/apis/user";

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
      input: {
        username: "",
        email: "",
        address: "",
      },

      // just the form
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "70px",
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
    delectArtive(id) {
      this.$confirm("此操作将永久删除文章是否确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonClass: "danger",
        confirmButtonText: "删除",
        cancelButtonText: "放弃删除",
      })
        .then(() => {
          DelectArticleById(id).then((resp) => {
            this.$notify({
              title: "成功",
              message: "您已成功删除该文章",
              type: "success",
            });
            //刷新当前页面
            this.getList();
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除" : "保留当前文章",
          });
        });
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm ");
    },
    async getList() {
      this.listLoading = true;
      const res = await getUserList(1, 8);
      this.list = res.records;
      this.total = res.total;
      this.listLoading = false;
      console.log("res", res);
    },
    handleSearch() {
      console.log("搜索");
    },
    handleCancel() {
      console.log("重置");
    },
    handleAdd() {
      console.log("添加");
    },
    handleDelete() {
      console.log("删除");
    },
    handleImport() {
      console.log("导入");
    },
    handleExport() {
      console.log("导出");
    },
    updateUserInfo(id) {
      this.dialogFormVisible = true;
      console.log("id", id);
    },
    delectUserInfo(id) {
      console.log("id", id);
    },
    columnStyle({ columnIndex }) {
      if (columnIndex == 0) {
        return "font-weight: 800;font-size: 16px";
      }
    },
  },
};
</script>

<style>
.el-table__header {
  margin-bottom: 0 !important;
}
.el-table th {
  background-color: #343a3f !important;
  color: #fff;
}

.el-table .el-table__cell {
  padding: 8px 0;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border: none;
  border-bottom: 1px solid #ebeef5;
}

/* 自定义按钮样式 */
/* CSS */
/* 修改与删除按钮 */
.button {
  margin-right: 10px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  min-height: 16px;
  outline: 0;
  padding: 4px 10px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.button:active {
  opacity: 0.5;
}

.deleteBtn {
  background: #ff4742;
  border: 1px solid #ff4742;
}

.deleteBtn:hover,
.deleteBtn:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}

.updateBtn {
  background: #494949;
  border: 1px solid #494949;
}

.updateBtn:hover,
.updateBtn:active {
  background-color: initial;
  background-position: 0 0;
  color: #494949;
}

/* 上方搜索与重置按钮 */
/* CSS */
.topBtn {
  appearance: button;
  background-image: none;
  /* border: 1px solid #000; */
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  /* 按钮长宽 */
  padding: 8px 30px;
  margin-right: 20px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.topBtn:focus {
  text-decoration: none;
}

.topBtn:hover {
  text-decoration: none;
}

.topBtn:active {
  box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
  outline: 0;
}

.topBtn:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .topBtn {
    padding: 7px 30px;
  }
}
/* searchBtn */
/* appendBtn import export */
.searchBtn {
  background-color: #000;
  border: 1px solid #000;
  box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
}

/* resetBtn */
.resetBtn {
  background-color: #efc381;
  border: 1px solid #efc381;
  box-shadow: #fff 4px 4px 0 0, #efc381 4px 4px 0 1px;
}

/* delBtn */
.delBtn {
  background-color: #ff6864;
  border: 1px solid #ff6864;
  box-shadow: #fff 4px 4px 0 0, #ff6864 4px 4px 0 1px;
}

/* 弹窗样式修改 */
.el-dialog {
  border-radius: 20px;
}

.el-dialog__header {
  background-color: #343a3f;
  border-radius: 20px 20px 0 0;
}

.el-dialog__title {
  color: #fff;
  font-weight: 700;
}

.el-dialog__footer {
  text-align: center;
}

/* 修改默认的success颜色，将其改为项目的button */
.el-button--success {
  background-color: #343a3f;
  border: #343a3f;
}

.el-button--success.is-active,
.el-button--success:active {
  background-color: #96a0a9;
  border: #96a0a9;
}

.el-button--success.is-active,
.el-button--success:hover {
  background-color: #96a0a9;
  border: #96a0a9;
}

.el-button--default.is-active,
.el-button--default:active {
  background-color: #96a0a9;
  border: #96a0a9;
}

.el-button--default:hover {
  color: black;
  background-color: #f3f5f6;
  border-color: #f3f5f6;
}
</style>

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
