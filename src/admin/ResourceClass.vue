<template>
  <div class="app-container" style="width: 100%">
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="8">
        <div style="transform: translateX(40px)">
          <h2>分类</h2>
          <h5>添加垃圾分类</h5>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="父级分类">
            <el-select v-model="form.father" placeholder="请选择父级分类">
              <el-option label="区域一" value="1"></el-option>
              <el-option label="区域二" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="类目标号">
            <el-input v-model="form.category"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入该分类的描述"
              v-model="form.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="处理方法">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入该垃圾处理方法"
              v-model="form.method"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" disabled>添加新分类</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="16">
        <el-table
          v-loading="listLoading"
          :data="list"
          :default-sort="{ prop: 'date', order: 'ascending' }"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column min-width="10%" label="名称">
            <template slot-scope="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="20%" align="center" label="描述">
            <template slot-scope="scope">
              <span
                style="
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 3;
                "
                >{{ scope.row.description }}</span
              >
            </template>
          </el-table-column>

          <el-table-column min-width="30%" label="处理方法">
            <template slot-scope="scope">
              <span
                style="
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 3;
                "
                >{{ scope.row.method }}</span
              >
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <router-link :to="'/article/edit/' + scope.row.id">
                <el-button disabled type="primary" size="mini" icon="el-icon-edit">
                  修改
                </el-button>
              </router-link>

              <el-button
                style="margin-left: 10px"
                type="danger"
                size="mini"
                icon="el-icon-edit"
                @click="delectArtive(scope.row.id)"
                disabled
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getCategoryList,
  deleteCategoryById,
  updateCategoryInfo,
} from "@/apis/category";

import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ArticleList",
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
      },
      form: {
        category: "",
        name: "",
        description: "",
        method: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    delectArtive(id) {
      this.$confirm("此操作将永久删除文章分类是否确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonClass: "danger",
        confirmButtonText: "删除",
        cancelButtonText: "放弃删除",
      })
        .then(() => {
          // DeleteResourceClass(id).then((resp) => {
          //   this.$notify({
          //     title: "成功",
          //     message: "您已成功删除该分类",
          //     type: "success",
          //   });
          //   //刷新当前页面
          //   this.getList();
          // });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除" : "保留当前分类",
          });
        });
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm");
    },
    async getList() {
      this.listLoading = true;
      const res = await getCategoryList(
        this.listQuery.page,
        this.listQuery.limit
      );
      this.list = res.records;
      this.total = res.total;
      this.listLoading = false;
      // allResourceClass(this.listQuery).then((resp) => {
      //   this.list = resp.data.data;
      //   this.total = resp.data.total;
      //   this.listLoading = false;
      // });
    },
    onSubmit() {
      let that = this;
      this.loading = true;
      // newResourceClass(that.form)
      //   .then((resp) => {
      //     //做一个简单的返回数据判断
      //     console.log(resp);
      //     if (resp.status === 200) {
      //       if (resp.data == 143) {
      //         console.log("创建失败");
      //         this.loading = false;
      //         this.$notify.error({
      //           title: "失败",
      //           message: "该分类已存在",
      //         });
      //       }
      //       if (resp.data == 1) {
      //         this.getList();
      //         this.$notify({
      //           title: "成功",
      //           message: "创建分类成功",
      //           type: "success",
      //           duration: 2000,
      //         });
      //         this.loading = false;
      //       }
      //     } else {
      //       console.log("创建失败");
      //     }
      //   })
      //   .catch((e) => {
      //     console.log("error submit!!");
      //     this.loading = false;
      //     this.$notify.error({
      //       title: "失败",
      //       message: "请检查网络连接",
      //     });
      //     return false;
      //   });
    },
  },
};
</script>

<style scoped>
.ellip {
}
</style>
