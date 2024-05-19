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
        <el-select
          v-model="input.type"
          placeholder="请选择图片类型"
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
        min-width="15%"
        align="center"
        prop="name"
        label="图片名称"
      >
      </el-table-column>

      <el-table-column
        min-width="15%"
        align="center"
        prop="type"
        label="图片类型"
      >
      </el-table-column>

      <el-table-column
        min-width="20%"
        align="center"
        prop="size"
        label="图片大小"
      >
      </el-table-column>

      <el-table-column
        min-width="20%"
        align="center"
        prop="url"
        label="图片地址"
      >
      </el-table-column>

      <el-table-column
        min-width="20%"
        align="center"
        prop="md5"
        label="图片Md5"
      >
      </el-table-column>

      <el-table-column min-width="30%" align="center" prop="url" label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.url"
            alt="图片"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button deleteBtn"
            @click="delectFileInfo(scope.row.id)"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>

    <!-- add and update dialog Form -->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogFormVisible"
      width="60%"
      :before-close="resetDialog"
    >
      <Upload
        :foriscreate="false"
        fortitle="pic"
        v-model="cover"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取 消</el-button>
        <el-button type="success" @click="resetDialog"
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
import {
  getFileList,
  updateFileInfo,
  deleteFileById,
  delFilesByIds,
} from "@/apis/picture";
import { setValue, clearObj, exportExcel } from "@/utils/datafn";
import Upload from "@/components/Upload/SingleImage";

export default {
  name: "ArticlePicture",
  components: { Pagination, Upload },
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
        type: "",
      },
      cover: '',
      // 为解决bug而引入的中间参数
      searchParam: {
        type: "",
      },
      isSearch: false,
      isUpdate: true,
      // options
      options: [
        { value: "jpg", label: "jpg" },
        { value: "jpeg", label: "jpeg" },
        { value: "png", label: "png" },
        { value: "gif", label: "gif" },
        { value: "tiff", label: "tiff" },
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
        res = await getFileList(
          this.listQuery.page,
          this.listQuery.limit,
          this.searchParam.type
        );
      } else {
        res = await getFileList(this.listQuery.page, this.listQuery.limit);
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
        await delFilesByIds(this.multipleSelection);
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
    resetDialog() {
      this.dialogFormVisible = false;
    },
    updateFileInfo(data) {
      // 留意一下这里的执行顺序,Mounted()创建之后，就会执行resetField()记录初始值
      this.dialogFormVisible = true;
      this.isUpdate = true;
      this.$nextTick(() => {
        setValue(this.addOrUpdateForm, data);
      });
    },
    async delectFileInfo(id) {
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
        await deleteFileById(id);
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
