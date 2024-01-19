<template>
  <div class="app-container">
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
        <el-button
          class="input-margin"
          icon="el-icon-search"
          type="success"
          @click="handleSearch"
        >
          搜索
        </el-button>
        <el-button
          class="input-margin"
          icon="el-icon-remove-outline"
          type="warning"
          @click="handleCancel"
        >
          重置
        </el-button>
      </div>
      <div class="topListLeft" style="padding: 0 0 20px 20px">
        <el-button
          class="input-margin"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="handleAdd"
        >
          新增
        </el-button>
        <el-button
          class="input-margin"
          icon="el-icon-delete"
          type="danger"
          @click="handleDelete"
        >
          批量删除
        </el-button>
        <el-button
          class="input-margin"
          icon="el-icon-bottom"
          type="primary"
          @click="handleImport"
        >
          导入
        </el-button>
        <el-button
          class="input-margin"
          icon="el-icon-top"
          type="primary"
          @click="handleExport"
        >
          导出
        </el-button>
      </div>
    </div>

    <el-table v-loading="listLoading" :data="list" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" min-width="10%">
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
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="updateUserInfo(scope.row.id)"
          >
            修改
          </el-button>
          <el-button
            style="margin: 10px"
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="delectUserInfo(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
      console.log("updateUserInfo");
    },
    delectUserInfo(id) {
      console.log("id", id);
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
  /* flex样式呈现*/
  display: flex;
  /*垂直排列*/
  flex-direction: column;
  align-items: center; /*由于flex-direction: column，因此align-items代表的是水平方向*/
  justify-content: center; /*由于flex-direction: column，因此justify-content代表的是垂直方向*/
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
