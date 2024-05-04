<template>
  <div class="createPost-container app-top">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky :z-index="10" :class-name="'sub-navbar draft'">
        <CommentDropdown v-model="postForm.allowContent" />
        <el-button
          v-loading="loading"
          style="margin-left: 10px"
          type="success"
          @click="submitForm(1)"
        >
          提交
        </el-button>
        <el-button v-loading="loading" type="warning" @click="submitForm(2)">
          草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px" prop="title">
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item
              label-width="60px"
              label="分类:"
              class="postInfo-container-item"
              prop="class"
            >
              <el-select
                v-model="postForm.type"
                :remote-method="getRemoteUserList"
                filterable
                default-first-option
                remote
                placeholder="选择分类"
              >
                <el-option
                  v-for="(item, index) in ClassListOptions"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce ref="editor" v-model="postForm.content" :height="500" />
        </el-form-item>
        <!-- <h4>生成图片文字(根据所填写标题)</h4>
        <el-switch v-model="isCreate" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch> -->
        <!-- <h4>上传封面</h4>
        <el-form-item prop="image_uri" style="margin-bottom: 30px">
          <Upload
            :foriscreate="this.postForm.created"
            :fortitle="this.postForm.title"
            v-model="postForm.cover"
          />
        </el-form-item>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过2mb
        </div> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { validURL } from "@/utils/validate";
import { Todate } from "@/utils/date.js";

import ElDragSelect from "@/components/DragSelect"; // base on element-ui
// import Upload from "@/components/Upload/SingleImage";
import Sticky from "@/components/Sticky"; // 粘性header组件
import Warning from "./Warning";
import { CommentDropdown } from "./Dropdown";

import { getArticleById } from "@/api/article";
import { getAllUserName } from "@/api/user";
import { createArticle } from "@/api/article";
import { getAllClassName } from "@/api/article";
import { getClassNameById } from "@/api/article";

import { getAllTag } from "@/api/alltag";

import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";

import { updateArticleInfo } from "@/apis/article";

// TODO 文章数据位置
const defaultForm = {
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
  // 下面的是多余的
  intro: "", // 文章摘要
  source_uri: "", // 文章外链
  // image_uri: '', // 文章图片
  platforms: ["a-platform"],
  commentDisabled: false,
  ownerTag: 0,
};

export default {
  name: "ArticleDetail",
  components: {
    ElDragSelect,
    Tinymce,
    MDinput,
    Sticky,
    Warning,
    CommentDropdown,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    var listRule = (rule, value, callback) => {
      undefined;
      if (
        this.postForm.author === "" ||
        this.postForm.author === undefined ||
        this.postForm.author === null
      ) {
        undefined;
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
        });
        callback(new Error(rule.field + "为必填字段"));
      } else {
        undefined;
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        /* eslint-disable */
        if (validURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error",
          });
          callback(new Error("外链url填写不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      isCreate: false,
      value: [],
      options: [],
      articleid: "",
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      ClassListOptions: [
        {
          key: 1,
          value: "知识",
        },
        {
          key: 2,
          value: "政策",
        },
      ],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        author: [{ validator: listRule }],
        content: [{ validator: validateRequire }],
        // source_uri: [{ validator: validateSourceUri, trigger: "blur" }],
      },
      tempRoute: {},
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.intro.length;
    },
    // displayTime: {
    //   // set and get is useful when the data
    //   // returned by the back end api is different from the front end
    //   // back end return => "2013-06-25 06:59:25"
    //   // front end need timestamp => 1372114765000
    //   get() {
    //     return +new Date(this.postForm.createTime);
    //   },
    //   set(val) {
    //     this.postForm.createTime = new Date(val);
    //     this.postForm.createTime = Todate(this.postForm.createTime);
    //   },
    // },
  },
  created() {
    const id = this.$route.params && this.$route.params.id;

    //获取作者列表，和分类列表
    // this.getRemoteUserList();

    //获取标签列表
    // this.getRemoteTagList(id);

    //数据回填
    // if (this.isEdit) {
    //   this.articleid = this.$route.params.id;
    //   this.fetchData(id);
    //   this.fetchData(this.articleid);
    // }

    // // Why need to make a copy of this.$route here?
    // // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    // this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    async fetchData(id) {
      getArticleById(id)
        .then((response) => {
          console.log(response);

          this.postForm = response.data;
          //根据classId查询对应的名称
          getClassNameById(response.data.sortClass).then((response) => {
            this.postForm.sortClass = response.data;
          });
          this.postForm.articleStatus = response.data.articleStatus;
          this.setTagsViewTitle();
          // set page title
          this.setPageTitle();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTagsViewTitle() {
      const title = "编辑文章";
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.id}`,
      });
      this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    setPageTitle() {
      const title = "编辑文章";
      document.title = `${title} - ${this.postForm.id}`;
    },
    submitForm(val) {
      //TODO 提交文章
      let that = this;
      this.$refs.postForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.postForm.author =
            JSON.parse(localStorage.getItem("__USER"))?.id ?? "佚名";
          this.postForm.status = val;
          console.log("postForm", this.postForm);
          const res = await updateArticleInfo(this.postForm);
          this.$notify({
            title: "成功",
            message: val === 1 ? "发布文章成功" : "保存草稿成功",
            type: "success",
            duration: 2000,
          });
          this.$refs.editor.setContent("");
          this.postForm = Object.assign({}, defaultForm);
          this.loading = false;
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    draftForm() {
      // if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
      //   this.$message({
      //     message: '请填写必要的标题和内容',
      //     type: 'warning'
      //   })
      //   return
      // }
      // var that = this
      // this.loading = true
      // this.postForm.status = 'draft'
      // //后端保存草稿处理
      // //再调用一次发布
      // createArticle(that.postForm).then(resp => {
      //   //做一个简单的返回数据判断
      //   if (resp.status === 200) {
      //     this.$message({
      //       message: '保存成功',
      //       type: 'success',
      //       showClose: true,
      //       duration: 1000
      //     })
      //     this.postForm.status = 'draft'
      //     this.loading = false
      //   } else {
      //     console.log("保存失败")
      //     this.loading = false
      //   }
      // })
      //   .catch((e) => {
      //     console.log('error submit!!')
      //     this.loading = false
      //     return false
      //   })
    },
    getRemoteUserList(query) {
      /* eslint-disable */
      //获取作者列表
      getAllUserName().then((resp) => {
        this.userListOptions = resp.data.map((o) => {
          return [o.username].toString();
        });
      });
      //获取分类列表
      getAllClassName().then((resp) => {
        this.ClassListOptions = resp.data.map((o) => {
          return [o.name].toString();
        });
      });
    },
    getRemoteTagList(id) {
      getAllTag(id).then((response) => {
        this.options = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
  width: 100%;

  .createPost-main-container {
    padding: 10px 50px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    position: absolute;
    right: -50px;
    top: 1px;
  }
}

.article-textarea ::v-deep {
  textarea {
    width: 100%;
    padding-right: 30px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.app-top {
  padding-top: 0px !important;
}
</style>
