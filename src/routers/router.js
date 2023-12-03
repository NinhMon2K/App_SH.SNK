import { createRouter, createWebHistory } from "vue-router";
import routerAsset from "./routerAsset";
import routerReport from "./routerReport";
import LoginView from "./routerLoginPartial";
import routerVoucher from "./routerVoucher";
import routerDashboard from "./routerDashboard";
import routerBookingRequest from "./routerBookingRequest";
const routes = [
  {
    path:"/login",
    children:[...LoginView]
},
  {
    path: "",
    component: () => import("@/components/layouts/TheMain.vue"),
    children: [...routerAsset, ...routerReport,...routerVoucher,...routerDashboard,...routerBookingRequest],
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
