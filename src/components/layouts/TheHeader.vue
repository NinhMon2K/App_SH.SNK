<template>
  <div class="main-header">
    <div class="left-header">
      <!-- <span class="title-page">Danh sách tài sản</span> -->
    </div>
    <div class="right-header">
      <div class="tool-header">
        <div class="tool notification">
          <v-tooltip content="Thông báo" placement="bottom">
            <div class="app-icon app-icon-bell fas fa-bell fa-xs"></div>
            <div class="number_bell">0</div>
          </v-tooltip>
        </div>
        <div class="tool tf-home">
          <v-tooltip content="Lưới" placement="bottom">
            <i class="app-icon-bell fas fa-th"></i>
          </v-tooltip>
        </div>
        <div class="tool help">
          <v-tooltip content="Trợ giúp" placement="bottom">
            <i class="app-icon-bell fas fa-question-circle"></i>
          </v-tooltip>
        </div>
      </div>
      <div class="user-header">
        <div class="c-2 avatar">
          <v-tooltip content="Tài khoản" placement="bottom">
            <i class="app-icon-bell fas fa-user-circle user-icon"></i>
          </v-tooltip>
        </div>
        <div class="c-2 more">
          <v-tooltip content="Xuống" placement="bottom">
            <div @click="isShowUserInfo = !isShowUserInfo">
              <i class="app-icon-bell fas fa-caret-down drop-icon"></i>
            </div>
          </v-tooltip>
        </div>
        <div class="header-user" v-if="isShowUserInfo">
          <div class="user-name">
            <p>Tài khoản:</p>
            <p>{{ userName }}</p>
          </div>
          <div class="user-change_pass">
            <div class="app-icon ic-change_password"></div>
            <div class="text_user_info"><a href="">Đổi mật khẩu</a></div>
          </div>
          <div class="user-manage">
            <div class="app-icon ic-img_user"></div>
            <div class="text_user_info"><a href="">Quản lý tài khoản</a></div>
          </div>
          <div class="logout-user" @click="handleLogoutUser">
            <div class="app-icon ic-logout"></div>
            <div class="text_user_info">Đăng xuất</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import userAPI from "@/apis/api/userAPI.js";
export default {
  name: "TheHeader",
  components: { VTooltip },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isShowUserInfo = ref(false);
    const userName = ref("");
    onUpdated(() => {
      proxy.userName = localStorage.getItem("user_name");
    });
    async function logOutUser() {
      try {
        proxy.isLoading = true;
        let res = await userAPI.get("Users/LogOut", {});
        proxy.isLoading = false;
        return res;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            break;
          case 403:
            console.log("Có lỗi xảy ra");
            proxy.isLoading = false;
            break;
          case 405:
            break;
          case 500:
            break;
          default:
            proxy.isLoading = false;
        }
      }
    }

    onMounted(() => {
      window.addEventListener("click", (e) => {
        if (!proxy.$el.contains(e.target)) {
          proxy.isShowUserInfo = false;
        }
      });
    });

    const handleLogoutUser = () => {
      localStorage.setItem("_token", null);
      localStorage.setItem("user_name", "Yêu cầu đăng nhập!");
      proxy.logOutUser();
      proxy.$router.push("/login");
    };

    // onMounted(() => {
    //   document.addEventListener("click", (e) => {
    //     if (proxy.isShowUserInfo == false) {
    //       proxy.isShowUserInfo = true;
    //     } else {
    //       proxy.isShowUserInfo = false;
    //     }
    //   });
    // });
    return {
      isShowUserInfo,
      userName,
      handleLogoutUser,
      logOutUser,
    };
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/scss/layouts/the_header.scss";
.app-icon-bell {
  width: 20px;
  height: 20px;
  margin-top: 4px;
  color: #fff;
}
.user-icon {
  margin-top: 1px;
}
.drop-icon {
  margin-top: 1px;
}
.number_bell {
  position: absolute;
  top: 24px;
  font-size: 15px;
  color: red;
  background-color: #fff;
  width: 18px;
  border-radius: 50%;
  left: 4px;
  font-weight: 800;
}
.notification {
  position: relative;
}
</style>
