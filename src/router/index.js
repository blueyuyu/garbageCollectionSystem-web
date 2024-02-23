import Vue from "vue";
import Router from "vue-router";
import { constantRoutes } from './router'
import Layout from "@/layout";

Vue.use(Router);

const createRouter = () => {
  return new Router({
    mode: "history",
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
}

const router = createRouter();


// 动态路由拼装
export const setRoutes = () => {
  const adminRouter = {
    path: "/admin",
    name: "admin",
    component: Layout,
    redirect: "/admin/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    ]
  }
  router.addRoute(adminRouter)
  localStorage.setItem('__ADMINROUTER',JSON.stringify([adminRouter]))
  console.log('122', 122);
}

setRoutes();


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 这是一个remove-router 的帖子,重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
