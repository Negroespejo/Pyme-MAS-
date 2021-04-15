import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import My_componente from '../components/My_componente.vue'
import Articulo from '../components/Articulo.vue'
import Categoria from '../components/Categoria.vue'
import Rol from '../components/Rol.vue'
import Usuario from '../components/Usuario.vue'
import Cliente from '../components/Cliente.vue'
import OrdenDeVenta from '../components/OrdenDeVenta.vue'
import Proveedor from '../components/Proveedor.vue'
import Ingreso from '../components/Ingreso.vue'
import ConsultaVenta from '../components/ConsultaVenta.vue'
import ConsultaCompra from '../components/ConsultaCompra.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 // Componente para pruebas 
 // { 
 //   path: '/My_componente',
 //   name: 'mi_componente',
 //   component: My_componente  
 // },
  {
    path: '/Categoria',
    name: 'categoria',
    component: Categoria
  },
  {
    path: '/Articulo',
    name: 'articulo',
    component: Articulo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuario,
  }, 
  {
    path: '/roles',
    name: 'roles',
    component: Rol,
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Cliente,
  },
  {
    path: '/OrdenDeVentas',
    name: 'OrdenDeVentas',
    component: OrdenDeVenta,
  },
  {
    path: '/Proveedores',
    name: 'Proveedores',
    component: Proveedor,
  },
  {
    path: '/Ingresos',
    name: 'Ingresos',
    component: Ingreso,
  },
  {
    path: '/ConsultaVentas',
    name: 'ConsultaVentas',
    component: ConsultaVenta,
  },
   {
    path: '/ConsultaCompras',
    name: 'ConsultaCompras',
    component: ConsultaCompra,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
