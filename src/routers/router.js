import { createRouter, createWebHistory } from "vue-router";
import routerReport from "./routerReport";
import LoginView from "./routerLoginPartial";
import routerVoucher from "./routerVoucher";
import routerDashboard from "./routerDashboard";
import routerBookingRequest from "./routerBookingRequest";
import routerAccountForwarder from "./routerAccountForwarder";
const routes = [
  {
    path:"/login",
    children:[...LoginView]
},
  {
    path: "",
    component: () => import("@/components/layouts/TheMain.vue"),
    children: [...routerDashboard, ...routerReport,...routerVoucher,...routerBookingRequest,...routerAccountForwarder],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from,next) => {
  const token = localStorage.getItem('_token');
 if(to.path == '/' && token == null  ){ 
  next({path: "/login"})
 }
 else{
  next()
 }
});
export default router;
