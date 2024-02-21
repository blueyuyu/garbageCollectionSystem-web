<template>
  <div class="app-container">
    <!-- 上方处理按钮 -->
    <div class="topList">
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
        min-width="40%"
        align="center"
        prop="name"
        label="角色名称"
      >
      </el-table-column>

      <el-table-column
        min-width="40%"
        align="center"
        prop="description"
        label="角色描述"
      >
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <button
            class="button updateBtn"
            @click="setRoleAuthority(scope.row, 'addOrUpdateForm')"
          >
            分配权限
          </button>
          <button
            class="button deleteBtn"
            @click="delectGarbageInfo(scope.row.id)"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>

    <!-- add dialog Form -->
    <el-dialog
      :title="'新增'"
      :visible.sync="dialogFormVisibleAdd"
      width="34%"
      :before-close="resetDialog"
    >
      <el-form
        :model="addOrUpdateForm"
        ref="addOrUpdateForm"
        :rules="rules"
        hide-required-asterisk
      >
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="addOrUpdateForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          :label-width="formLabelWidth"
          prop="description"
        >
          <el-input
            v-model="addOrUpdateForm.description"
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

    <!-- update  -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogFormVisibleUpdate"
      width="34%"
      :before-close="resetDialog"
    >
      <el-tree
        ref="tree"
        :data="authorityData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2]"
        :default-checked-keys="checkedID"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog">取 消</el-button>
        <el-button type="success" @click="confirmAthority">确 定</el-button>
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
  getRoleList,
  updateRoleInfo,
  deleteRoleById,
  deleteRoleByIds,
  getMenu,
  getRoleMenu,
  setRoleMenu,
} from "@/apis/user";
import { setValue, clearObj, exportExcel } from "@/utils/datafn";

export default {
  name: "roleadmin",
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
      // just the userForm
      dialogFormVisibleUpdate: false, // 分配
      dialogFormVisibleAdd: false, // 新增
      dialogVisibleExport: false,
      addOrUpdateForm: {
        id: "",
        name: "",
        desctiption: "",
      },
      formLabelWidth: "70px",
      rules: {
        name: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5a-zA-Z]{0,20}/,
            message: "长度在 0 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      authorityData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkedID: [], // 菜单选中
      nowid: 0, //当前项id
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
      let res = await getRoleList();
      this.list = res;
      this.total = res.length;
      this.listLoading = false;
    },
    handleCancel() {
      clearObj(this.input);
      clearObj(this.searchParam);
      this.isSearch = false;
      this.getList();
    },
    handleAdd() {
      this.dialogFormVisibleAdd = true;
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
        await deleteRoleByIds(this.multipleSelection);
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
    confirmDialog(formname) {
      this.$refs[formname].validate(async (valid) => {
        if (valid) {
          var that = this;
          await updateRoleInfo(that.addOrUpdateForm);
          this.$notify({
            title: "成功",
            message: "新增用户成功",
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
    async confirmAthority() {
      // console.log(this.$refs.tree.getCheckedNodes());
      const nodes = this.$refs.tree.getCheckedNodes();
      const roleList = [];
      nodes.forEach((item) => {
        if (item.pid && !roleList.includes(item.pid)) {
          roleList.push(item.pid);
        }
        roleList.push(item.id);
      });
      console.log("roleList", roleList);
      await setRoleMenu(this.nowid, roleList);
      this.$notify({
        title: "成功",
        message: "修改角色权限成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormVisibleUpdate = false;
    },
    resetDialog() {
      this.dialogFormVisibleAdd = false;
      this.dialogFormVisibleUpdate = false;
      clearObj(this.addOrUpdateForm);
    },
    async setRoleAuthority(data) {
      // 留意一下这里的执行顺序,Mounted()创建之后，就会执行resetField()记录初始值
      this.dialogFormVisibleUpdate = true;
      this.nowid = data.id;
      const res = await getMenu();
      let checkedMenu = await getRoleMenu(data.id);
      res.forEach((item) => {
        if (item.name) item["label"] = item.name;
        if (item.children.length > 0) {
          checkedMenu = checkedMenu.filter((i) => i != item.id);
          item.children.forEach((i) => {
            if (i.name) i["label"] = i.name;
          });
        }
      });
      // console.log("res", res);
      this.authorityData = res;
      this.checkedID = checkedMenu;
      // this.isUpdate = true;
    },
    async delectGarbageInfo(id) {
      console.log("id", id);
      try {
        await this.$confirm(
          "此操作将永久删除该角色，是否确认删除？",
          "确认信息",
          {
            distinguishCancelAndClose: true,
            confirmButtonClass: "danger",
            confirmButtonText: "删除",
            cancelButtonText: "放弃删除",
          }
        );
        await deleteRoleById(id);
        this.$notify({
          title: "成功",
          message: "您已成功删除该角色",
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
