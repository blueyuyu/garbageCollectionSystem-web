const state = {
    routers: [],
    addRouters: []
}

const mutations = {
    SET_ROUTERS: (state, router) => {
        state.addRouter = router
        // 与静态路由表拼接
        states.routers = constantRoutes.concat(router)
    }
}

const actions = {
    getRoutes({
        commit
    }, data) {
        return new  Promise(resolve =>{
            const {
                role 
            } = data
            // 
            commit('SET_ROUTERS',accessedRouters)
            resolve();
        })
    }
}


