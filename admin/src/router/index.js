import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/itemEdit.vue'
import ItemList from '../views/itemList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import AttachmentEdit from '../views/AttachmentEidt.vue'
import AttachmentList from '../views/AttachmentList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      //分类路由
      {path: '/categories/create', component: CategoryEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/categories/edit/:id', component: CategoryEdit, props: true},
      {path: '/categories/list', component: CategoryList},
      
      //物品路由
      {path: '/items/create', component: ItemEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/items/edit/:id', component: ItemEdit, props: true},
      {path: '/items/list', component: ItemList},

      //文章路由
      {path: '/articles/create', component: ArticleEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/articles/edit/:id', component: ArticleEdit, props: true},
      {path: '/articles/list', component: ArticleList},

      //管理员路由
      {path: '/admin_users/create', component: AdminUserEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/admin_users/edit/:id', component: AdminUserEdit, props: true},
      {path: '/admin_users/list', component: AdminUserList},

      //附件管理路由
      {path: '/attachment/create', component: AttachmentEdit},
      /**
       * @param props 将路由参数传递给组件
       */
      {path: '/attachment/edit/:id', component: AttachmentEdit, props: true},
      {path: '/attachment/list', component: AttachmentList}
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if(!to.meta.isPublic && !localStorage.token) {
//     return next('./login')
//   }
// })

export default router
