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

// 动态路由拼接
export const setRoutes = () => {
  const adminRouter = [] // 存储拼接出的所有router
  const storeMenus = JSON.parse(localStorage.getItem('__MENUS'))
  if (storeMenus) {
    console.log('storeMenus', storeMenus);
    storeMenus.forEach(item => {
      let itemMenu = {
        path: item.path,
        component: Layout,
        name: item.path.slice(1),
        // redirect: item.path + '/' +item.children[0].path,
        meta: {
          title: item.name,
          icon: item.icon,
          requireAuth: true,
        },
        children: []
      }

      if (item.children.length > 0) {
        item.children.forEach(item => {
          const childMenu = {
            path: item.path,
            component: () => import(`../views/${item.path}`),
            name: item.path,
            meta: {
              title: item.name,
              icon: item.icon,
              requireAuth: true,
            },
          }
          itemMenu.children.push(childMenu)
        })
      }
      // router.addRoute(itemMenu)
      adminRouter.push(itemMenu)
    });
  }
  console.log('itemMenu', adminRouter);
  localStorage.setItem('__ADMINROUTER', JSON.stringify(adminRouter))
}

setRoutes();


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 这是一个remove-router 的帖子,重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
