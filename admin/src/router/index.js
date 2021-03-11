import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/itemEdit.vue'
import ItemList from '../views/itemList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

Vue.use(VueRouter)

const routes = [
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
      {path: '/articles/list', component: ArticleList}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
