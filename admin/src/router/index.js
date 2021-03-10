import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {path: '/categories/create', component: CategoryEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/categories/edit/:id', component: CategoryEdit, props: true},
      {path: '/categories/list', component: CategoryList}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
