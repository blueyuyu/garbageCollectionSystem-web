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
          placeholder="请输入垃圾名称"
          suffix-icon="el-icon-search"
          v-model="input.name"
          class="input-margin"
          clearable
          style="flex: 1"
        >
        </el-input>
        <el-select
          v-model="input.category"
          placeholder="请选择垃圾类型"
          style="flex: 1; margin-right: 10px"
        >
          <el-option
            v-for="item in options"
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
        min-width="40%"
        align="center"
        prop="name"
        label="垃圾名称"
      >
      </el-table-column>

      <el-table-column
        min-width="30%"
        align="center"
        prop="category"
        label="垃圾类型"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success" v-if="scope.row.category === 1"
              >可回收垃圾</el-tag
            >
            <el-tag size="medium" type="danger" v-if="scope.row.category === 2"
              >有害垃圾</el-tag
            >
            <el-tag size="medium" type="info" v-if="scope.row.category === 4"
              >湿垃圾</el-tag
            >
            <el-tag size="medium" type="info" v-if="scope.row.category === 8"
              >干垃圾</el-tag
            >
            <el-tag
              size="medium"
              type="warning"
              v-if="scope.row.category === 16"
              >大件垃圾</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button updateBtn"
            @click="updateArticleInfo(scope.row, 'addOrUpdateForm')"
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

    <!-- add and update dialog Form -->
    <el-dialog
      :title="isUpdate ? '修改' : '新增'"
      :visible.sync="dialogFormVisible"
      width="34%"
      :before-close="resetDialog"
    >
      <el-form
        :model="addOrUpdateForm"
        ref="addOrUpdateForm"
        :rules="rules"
        hide-required-asterisk
      >
        <el-form-item label="垃圾名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="addOrUpdateForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="垃圾类型"
          :label-width="formLabelWidth"
          prop="category"
        >
          <el-select
            v-model="addOrUpdateForm.category"
            placeholder="请选择垃圾类型"
            style="flex: 1; margin-right: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      title="导入垃圾资料"
      :visible.sync="dialogVisibleExport"
      width="34%"
      :before-close="handleClose"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:9091/garbage/import"
        accept=".xls"
        :multiple="false"
        :disabled="uploadDisabled"
        :on-success="handleExcelSuccess"
      >
        <!-- TODO 导入功能，导入数据不成功，到时候再修复-->
        <i class="el-icon-upload"></i>
        <div>
          <el-button type="text" @click="downloadTemplate">
            下载导入模板
          </el-button>
        </div>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请按照模板excel上传，只能上传.xls文件，且不超过5M
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleExport = false">取 消</el-button>
        <el-button type="success" @click="dialogVisibleExport = false"
          >确 定</el-button
        >
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
  getGarbageList,
  updateGarbageInfo,
  deleteGarbageById,
  exportGarbageExcel,
  exportGarbageExcelTemplate,
  delGarbagesByIds,
} from "@/apis/garbage";
import {
  updateArticleInfo,
  getArticleList,
  deleteArticleById,
  deleteArticleByIds,
  uploadFile
} from '@/apis/article'

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
        name: "",
        category: "",
      },
      // 为解决bug而引入的中间参数
      searchParam: {
        name: "",
        category: "",
      },
      isSearch: false,
      isUpdate: true,
      // options
      options: [
        { value: 1, label: "可回收垃圾" },
        { value: 2, label: "有害垃圾" },
        { value: 4, label: "湿垃圾" },
        { value: 8, label: "干垃圾" },
        { value: "16", label: "大件垃圾" },
      ],
      // just the userForm
      dialogFormVisible: false,
      dialogVisibleExport: false,
      addOrUpdateForm: {
        id: "",
        name: "",
        category: "",
      },
      formLabelWidth: "70px",
      rules: {
        name: [
          { required: true, message: "请输入垃圾名", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5a-zA-Z]{0,20}/,
            message: "长度在 0 到 20 个字符",
            trigger: "blur",
          },
        ],
        category: [{ required: true, message: "请选择垃圾类型" }],
      },
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
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm ");
    },
    async getList() {
      this.listLoading = true;
      let res;  
      if (this.isSearch) {
        res = await getArticleList(
          this.listQuery.page,
          this.listQuery.limit,
          this.searchParam.name,
          this.searchParam.category
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
        await delArticlesByIds(this.multipleSelection);
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
      this.dialogVisibleExport = true;
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
    async handleExport() {
      const res = await exportArticleExcel();
      // 销毁超连接
      exportExcel(res, "垃圾信息表");
      this.$notify({
        title: "成功",
        message: "您已成功导出垃圾表",
        type: "success",
      });
    },

    confirmDialog(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          var that = this;
          const message = this.isUpdate
            ? "修改垃圾信息成功"
            : "新增垃圾信息成功";
          await updateArticleInfo(that.addOrUpdateForm);
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
    updateArticleInfo(data) {
      // 留意一下这里的执行顺序,Mounted()创建之后，就会执行resetField()记录初始值
      this.dialogFormVisible = true;
      this.isUpdate = true;
      this.$nextTick(() => {
        setValue(this.addOrUpdateForm, data);
      });
    },
    async delectArticleInfo(id) {
      console.log("id", id);
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
