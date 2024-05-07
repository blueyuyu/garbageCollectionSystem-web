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
          placeholder="请输入文章标题"
          suffix-icon="el-icon-search"
          v-model="input.title"
          class="input-margin"
          clearable
          style="flex: 1"
        >
        </el-input>
        <el-select
          v-model="input.type"
          placeholder="请选择文章类型"
          style="flex: 1; margin-right: 10px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="input.status"
          placeholder="请选择文章状态"
          style="flex: 1; margin-right: 10px"
        >
          <el-option
            v-for="item in statusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <button class="topBtn searchBtn" @click="handleSearch">搜索</button>
        <button class="topBtn resetBtn" @click="handleCancel">重置</button>
      </div>
      <div class="topListLeft" style="padding: 0 0 20px 20px">
        <button class="topBtn searchBtn" @click="handleAdd">新增</button>
        <button class="topBtn delBtn" @click="handleDelete">批量删除</button>
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
      <!-- 在宽度设置的时候，最好设置 min-width: 这样不会出现元素挤压位移的情况 -->
      <el-table-column type="selection" min-width="10%"> </el-table-column>
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
        prop="title"
        label="文章标题"
      >
      </el-table-column>

      <el-table-column
        min-width="20%"
        align="center"
        prop="content"
        label="文章内容"
      >
        <template slot-scope="{ row }">
          <div class="ellipsis">{{ row.content }}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column
        min-width="10%"
        align="center"
        prop="cover"
        label="文章封面"
      >
      </el-table-column> -->

      <el-table-column
        min-width="10%"
        align="center"
        prop="type"
        label="文章类型"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.type === 1"
              >知识</el-tag
            >
            <el-tag size="medium" type="warning" v-if="scope.row.type === 2"
              >政策</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column
        min-width="10%"
        align="center"
        prop="status"
        label="文章状态"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.status === 1"
              >发布</el-tag
            >
            <el-tag size="medium" type="warning" v-if="scope.row.status === 2"
              >草稿</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column
        min-width="10%"
        align="center"
        prop="author"
        label="作者"
      >
      </el-table-column>

      <el-table-column
        min-width="10%"
        align="center"
        prop="updated"
        label="修改时间"
      >
        <template slot-scope="{ row }">
          <div>{{ formatDate(row.updated) }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button updateBtn"
            @click="updateArticleInfo(scope.row.id)"
          >
            修改
          </button>
          <button
            class="button deleteBtn"
            @click="delectArticleInfo(scope.row.id)"
          >
            删除
          </button>
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
import {
  updateArticleInfo,
  getArticleList,
  deleteArticleById,
  deleteArticleByIds,
  uploadFile,
} from "@/apis/article";

import { setValue, clearObj, exportExcel } from "@/utils/datafn";

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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
      },
      multipleSelection: [],
      input: {
        title: "",
        type: "",
        status: "",
      },
      // 为解决bug而引入的中间参数
      searchParam: {
        title: "",
        type: "",
        status: "",
      },
      isSearch: false,
      isUpdate: true,
      //TODO options
      typeOptions: [
        { value: 1, label: "知识" },
        { value: 2, label: "政策" },
      ],
      statusOption: [
        { value: 1, label: "发布状态" },
        { value: 2, label: "草稿状态" },
      ],
      // 文章表单的编辑不通过弹窗
      dialogVisibleExport: false,
      addOrUpdateForm: {
        id: undefined,
        title: "", // 文章题目
        content: "", // 文章内容
        cover: "", // 缩略图
        type: 1, // 1. 知识 2.政策
        status: 2, // 1.发布 2.草稿状态 draft
        allowContent: 2, // 1. 允许评论 2.禁止评论
        views: 0,
        created: undefined, // 创建时间
        updated: undefined, // 更新时间
        author: "佚名",
        authortype: "admin", // admin normarl
      },
      formLabelWidth: "70px",
      uploadDisabled: false, // 是否允许上传文件
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
      return formatDate(time);
    },
    async getList() {
      this.listLoading = true;
      let res;
      if (this.isSearch) {
        res = await getArticleList(
          this.listQuery.page,
          this.listQuery.limit,
          this.searchParam.title,
          this.searchParam.type,
          this.searchParam.status
        );
      } else {
        res = await getArticleList(this.listQuery.page, this.listQuery.limit);
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
      this.addOrUpdateForm.id = ""; // id 不置空会应发问题；
      this.isUpdate = false;
      this.$router.push("/newArticle/NewArticle");
    },
    async handleDelete() {
      try {
        await this.$confirm("是否确认批量删除？", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonClass: "danger",
          confirmButtonText: "删除",
          cancelButtonText: "放弃删除",
        });
        await deleteArticleByIds(this.multipleSelection);
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
    handleClose() {},
    handleExcelSuccess() {
      this.dialogVisibleExport = false;
      this.$notify({
        title: "成功",
        message: "导入资料成功",
        type: "success",
        duration: 2000,
      });
      this.getList();
    },
    async downloadTemplate() {
      this.uploadDisabled = true;
      const res = await exportArticleExcelTemplate();
      exportExcel(res, "垃圾信息模板表");
      this.uploadDisabled = false;
    },
    resetDialog() {
      this.$refs["addOrUpdateForm"].resetFields();
    },
    updateArticleInfo(id) {
      this.isUpdate = true;
      console.log("id", id);
      this.$router.push({
        name: "NewArticle",
        params: { id },
      });
    },
    async delectArticleInfo(id) {
      try {
        await this.$confirm(
          "此操作将永久删除垃圾，是否确认删除？",
          "确认信息",
          {
            distinguishCancelAndClose: true,
            confirmButtonClass: "danger",
            confirmButtonText: "删除",
            cancelButtonText: "放弃删除",
          }
        );
        await deleteArticleById(id);
        this.$notify({
          title: "成功",
          message: "您已成功删除该垃圾",
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
  },
};
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
