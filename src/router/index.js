import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/",
    component: () => import("@/page/Home"),
    hidden: true,
  },
  // 这个登录是后台系统的登陆界面
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/error",
    component: () => import("@/views/LongOutErr"), // 没有权限展示图片
    hidden: true,
  },

  // 前台页面
  {
    path: "/home",
    component: () => import("@/page/Home"),
    hidden: true,
  },
  {
    path: "/pay", // 暂时只需要页面的背景
    component: () => import("@/page/Resource"),
    hidden: true,
  },
  {
    path: "/post/:id(\\d+)", // 单篇文章展示页面
    component: () => import("@/page/Post"),
    hidden: true,
  },
  {
    path: "/userinfo",
    component: () => import("@/page/UserInfo"),
    hidden: true,
    children: [
      {
        path: "/userinfo/index",
        component: () => import("@/page/UserComponents/Info"),
      },
      {
        path: "/userinfo/changePw",
        component: () => import("@/page/UserComponents/changePw"),
      },
    ],
  },
  // 搜索文章页面
  {
    path: "/post/:content/all",
    component: () => import("@/page/SearchPost"),
    hidden: true,
  },
  // 下载页面
  {
    path: "/download/:id",
    component: () => import("@/page/Download"),
    hidden: true,
  },
  {
    path: "/content", // 这个作为内容展示页面模板
    component: () => import("@/page/Content"),
    hidden: true,
  },
  // admin page home
  {
    path: "/admin",
    component: Layout,
    redirect: "/admin/dashboard",
    children: [
      {
        path: "dashboard",
        name: "首页",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ],
  },

  // admin page （my）
  {
    path: "/newArticle",
    component: Layout,
    redirect: "/article/AllArticle",
    name: "newArticle",
    meta: {
      title: "文章",
      icon: "article",
      requireAuth: true,
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: "NewArticle",
        component: () => import("@/admin/NewArticle"),
        name: "NewArticle",
        meta: {
          title: "创建文章",
          icon: "el-icon-edit",
          requireAuth: true,
          noCache: false,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ],
  },
  {
    path: "/newResource",
    component: Layout,
    redirect: "/resource/Allresource",
    name: "newresource",
    meta: {
      title: "资源",
      icon: "resource",
      requireAuth: true,
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: "NewResource",
        component: () => import("@/admin/NewResource"), 
        name: "NewResource",
        meta: {
          title: "创建资源",
          icon: "el-icon-edit-outline",
          requireAuth: true,
          noCache: false,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/AllArticle",
    name: "article",
    meta: {
      title: "内容管理",
      icon: "list",
      requireAuth: true,
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/admin/ArticleEdit"),
        name: "EditArticle",
        meta: {
          title: "编辑文章",
          noCache: true,
          activeMenu: "/article/list",
          requireAuth: true,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
        hidden: true,
      },
      {
        path: "AllArticle",
        component: () => import("@/admin/ArticleList"),
        name: "AllArticle",
        meta: { title: "文章列表", icon: "documentation", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: "ArticleComment",
        component: () => import("@/admin/ArticleComment"),
        name: "ArticleComment",
        meta: { title: "评论管理", icon: "message", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: "ArticleClass",
        component: () => import("@/admin/ArticleClass"),
        name: "ArticleClass",
        meta: {
          title: "分类管理",
          icon: "el-icon-receiving",
          requireAuth: true,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ],
  },
  // 这一块的垃圾资源的路由
  {
    path: "/resource",
    component: Layout,
    redirect: "/resource/AllResource",
    name: "resource",
    meta: {
      title: "垃圾管理",
      icon: "el-icon-discover",
      requireAuth: true,
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/admin/ResourceEdit"),
        name: "EditResource",
        meta: {
          title: "编辑资源",
          noCache: true,
          activeMenu: "/resource/list",
          requireAuth: true,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
        hidden: true,
      },
      {
        path: "AllResource",
        component: () => import("@/admin/ResourceList"),
        name: "AllResource",
        meta: { title: "资源列表", icon: "documentation", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: "ResourceComment",
        component: () => import("@/admin/ResourceComment"),
        name: "ResourceComment",
        meta: { title: "评论管理", icon: "message", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
      {
        path: "ResourceClass",
        component: () => import("@/admin/ResourceClass"),
        name: "ResourceClass",
        meta: {
          title: "分类管理",
          icon: "el-icon-receiving",
          requireAuth: true,
        },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ],
  },
  {
    path: "/selfInfo",
    component: Layout,
    redirect: "/Manage/selfInfo",
    name: "selfInfo",
    meta: {
      title: "用户管理",
      icon: "user",
      requireAuth: true,
      // 需要登录才能进入的页面可以增加一个requireAuth属性
    },
    children: [
      {
        path: "AdminInfo",
        component: () => import("@/admin/AdminInfo"),
        name: "编辑个人信息",
        meta: { title: "个人信息", icon: "el-icon-s-custom" },
      },
      {
        path: "allAdmin",
        component: () => import("@/admin/AllAdmin"),
        name: "allAdmin",
        meta: { title: "管理员信息", icon: "el-icon-s-custom" },
      },
      {
        path: "RoleEdit",
        component: () => import("@/admin/RoleEdit"),
        name: "角色管理",
        meta: { title: "角色管理", icon: "el-icon-s-check" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // 全部匹配不成功，就会到404页面
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history",
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 这是一个remove-router 的帖子
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
