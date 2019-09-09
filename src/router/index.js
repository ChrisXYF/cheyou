import Vue from 'vue'
import Router from 'vue-router'
import logreg from '@/components/logoIn'
import carList from '@/components/carList'
import personal from '@/components/personal'
import carDetail from '@/components/carDetail'
import axios from 'axios'
// import vueResource from 'vue-resource'

Vue.use(Router)
// Vue.use(vueResource)

Vue.prototype.$http = axios;

export default new Router({
  // mode:'history',
  routes: [
     {
       path:'/',
       name:'root',
       components:{
              main: carList
       }
     }
    ,
    {
      path: '/logreg',
      name: 'logreg',
      components: {
        main: logreg
      }
    },
    {
      path: '/personal',
      name: 'personal',
      components: {
        main: personal
      }
    },
    {
      path: '/detail/:id',
      name: 'carDetail',
      components: {
        main: carDetail
      }
    }
  ]
})
