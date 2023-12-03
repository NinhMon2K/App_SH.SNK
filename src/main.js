import { createApp } from "vue";
import App from "./../App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
const app = createApp(App);
import {useComponents} from "@/assets/js/commons/globalComponents";
import {register} from "@/assets/js/commons/globalPopup";

//Style SCSS
import "@/assets/scss/font.scss";
import "@/assets/scss/icon.scss";
import "@/assets/scss/app.scss";
import "@/assets/images/fontawesome-free-6.5.1-web/css/all.css"
//Khai báo router
import router from "@/routers/router.js";
useComponents(app)
register(app)
app.use(ElementPlus, {
  locale: vi,
});
app.config.globalProperties.hostname = "http://localhost:8080/"
app.use(router);
app.use(contextmenu)
app.use(ElementPlus);
app.mount("#app");

