export const setRoutes = () => {
  const storeMenus = localStorage.getItem("__MENUS")
  const currentRouteName = router.getRoutes().map(v => v.name)
  if (storeMenus && !currentRouteName.includes('首页')) {
    const adminRoute = []
    const menus = JSON.parse(storeMenus)
    console.log('menus', menus);
    menus.forEach(item => {
      let itemMenu = {
        path: item.path,
        component: Layout,
        name: item.path.slice(1),
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
            component: () => import(`@/views/${item.path}`),
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
      console.log('item.Menu', itemMenu);
      router.addRoute(itemMenu)
      adminRoute.push(itemMenu)
    });
    // debugger
    router.addRoute(
      {
        path: "/admin",
        name: "admin",
        component: Layout,
        redirect: "/admin/dashboard",
      }
    )


    router.addRoute(
      "admin",
      {
        path: "dashboard",
        name: "首页",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard", requireAuth: true },
        // 需要登录才能进入的页面可以增加一个requireAuth属性
      },
    )

    
    console.log('adminRoute', adminRoute);
    console.log('router. get', router.getRoutes());
    // router.addRoutes(adminRoute);
  }
}