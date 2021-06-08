import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import("../views/home/Home");
const Show = () => import('../views/show/Show');
const Order = () => import('../views/order/Order');


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/show',
    name: 'Show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Show
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
];

const router = createRouter({
  history: createWebHistory("/schedule"),
  routes
});

router.beforeEach((to, from) => {
  // console.log(typeof to.fullPath);
  // console.log(from.fullPath);
});

export default router
