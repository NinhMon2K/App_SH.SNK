<template>
  <div class="page-view login-partial">
    <div class="login-page">
      <div class="login-container">
        <div class="login-content">
          <div class="content--left"></div>
          <div class="content--right">
            <div class="login_partial--top">
              <div class="login-logo"></div>
              <!-- <div class="login-title">Đăng nhập để làm việc với <b>MISA QLTS</b></div> -->
              <div class="login-form">
                <div class="box_username">
                  <el-input
                    v-model="user.username"
                    ref="username"
                    placeholder="Username, email hoặc số điện thoại"
                    class="mt-20"
                    :class="{ 'input--error': isShowVError.validateUsername }"
                    @blur="handleBlueInputUserName(user.username)"
                  />
                  <span v-if="isShowVError.validateUsername" class="error-message">{{
                    isShowText.textUsername
                  }}</span>
                </div>
                <div class="box_password">
                  <el-input
                    v-model="user.password"
                    ref="password"
                    placeholder="Mật khẩu"
                    show-password
                    @blur="handleBlueInputPassword(user.password)"
                    :class="{ 'input--error': isShowVError.validatePassword }"
                  />
                  <span v-if="isShowVError.validatePassword" class="error-message">{{
                    isShowText.textPassword
                  }}</span>
                </div>
              </div>
            </div>
            <div class="login_partial--bottom">
              <v-tooltip content="Đăng nhập" placement="bottom" right="bottom">
                <!-- buttom thêm mới -->
                <v-button
                  id="btn_login"
                  text="Đăng nhập"
                  :radius="true"
                  :tabindex="'4'"
                  buttonText="login-text"
                  @click="login"
                >
                </v-button>
              </v-tooltip>
              <div class="box__forgot-password">
                <a class="forgot-password" href="">Quên mật khẩu</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>
  <!-- Có hiện thông báo message hay không -->
  <teleport to="body">
    <v-message :type="typeMessage" v-show="isShowMessage"></v-message>
  </teleport>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import userAPI from "@/apis/api/userAPI.js";
import { required } from "@vuelidate/validators";
import Resource from "@/assets/js/resource/resource.js";
import useValidate from "@vuelidate/core";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";

export default {
  components: { VButton, VTooltip, VLoading, VMessage },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.login = proxy;
    const isLoading = ref(false);
    const isShowMessage = ref(false);
    const typeMessage = ref(false);
    const isShowVError = ref({
      validateUsername: false,
      validatePassword: false,
    });
    const isShowText = ref({
      textUsername: "",
      textPassword: "",
    });
    const user = ref({
      username: "",
      password: "",
    });
    const dataFormValidate = computed(() => {
      return {
        username: { required },
        password: { required },
      };
    });
    const v$ = useValidate(dataFormValidate, user);
    async function login() {
      try {
        if (proxy.validateData()) {
          let user = {
            username: proxy.user.username,
            password: proxy.user.password,
          };
          proxy.isLoading = true;
          let res = await userAPI.checksUser(
            "Users/signin",
            proxy.user.username,
            proxy.user.password
          );

          localStorage.setItem("_token", res.token);
          localStorage.setItem("user_name", res.username);
          // document.cookie = `_token=${res.token};secure`;
          proxy.isLoading = false;
          proxy.$router.push("/dashboard");
        } else {
          console.log(proxy.titleErrValidate);
          console.log(proxy.isShowVError);
          console.log(proxy.isShowText);
        }
      } catch (error) {
        console.log(error);
        switch (error.response.status) {
          case 400:
            proxy.handleLoading();
            break;
          case 404:
            proxy.handleLoading();
            break;
          case 403:
            proxy.handleLoading();

            break;
          case 405:
            proxy.handleLoading();
            proxy.typeMessage = "loginFailed";
            proxy.isShowMessage = true;
            break;
          case 500:
            proxy.typeMessage = "loginFailed";
            proxy.isShowMessage = true;
            proxy.handleLoading();

            break;
          default:
            proxy.isLoading = false;
        }
      }
    }

    watch(
      () => isShowMessage.value,
      (newVal) => {
        if (proxy.isShowMessage == true) {
          setTimeout(() => {
            proxy.isShowMessage = false;
          }, 2000);
        }
      }
    );

    const handleLoading = () => {
      setTimeout(() => {
        proxy.isLoading = false;
        proxy.typeMessage = "loginFailed";
        proxy.isShowMessage = true;
      }, 500);
    };

    async function checkUser() {
      try {
        proxy.isLoading = true;
        let res = await userAPI.checksUser(
          "Users/signin",
          proxy.user.username,
          proxy.user.password
        );
        proxy.isLoading = false;
        return res;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            console.log("Có lỗi xảy ra");
            proxy.isLoading = false;
            break;
          case 403:
            console.log("Có lỗi xảy ra");
            proxy.isLoading = false;
            break;
          case 405:
            break;
          case 404:
            console.log("Có lỗi xảy ra");
            proxy.isLoading = false;
            break;
          case 500:
            console.log("Có lỗi xảy ra");
            proxy.isLoading = false;
            break;
          default:
            proxy.isLoading = false;
        }
      }
    }

    const validateData = () => {
      proxy.v$.$validate();
      if (proxy.v$.$error) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        if (proxy.user.username == null || proxy.user.username == "") {
          proxy.titleErrValidate.push("Username không được để trống");
          proxy.isShowText.textUsername = Resource.ErrorInput.ValidateUsername;
          proxy.isShowVError.validateUsername = true;
          proxy.$refs.username.focus();
        }
        if (proxy.user.password == null || proxy.user.password == "") {
          proxy.titleErrValidate.push("Password không được để trống");
          proxy.isShowText.textPassword = Resource.ErrorInput.ValidatePassword;
          proxy.isShowVError.validatePassword = true;
          proxy.$refs.password.focus();
          if (proxy.user.username == null || proxy.user.username == "") {
            proxy.$refs.username.focus();
          }
        }

        return false;
      } else if (proxy.user.username == "" || proxy.user.password == "") {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Username không được để trống");
        proxy.isShowText.textUsername = Resource.ErrorInput.ValidateUsername;
        proxy.isShowVError.validateUsername = true;
        proxy.titleErrValidate.push("Password không được để trống");
        proxy.$refs.username.focus();
        proxy.isShowText.textPassword = Resource.ErrorInput.ValidatePassword;
        proxy.isShowVError.validatePassword = true;

        return false;
      } else {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        return true;
      }
    };
    const handleBlueInputUserName = (val) => {};
    const handleBlueInputPassword = (val) => {};

    return {
      user,
      checkUser,
      login,
      validateData,
      v$,
      isShowVError,
      isShowText,
      handleBlueInputUserName,
      handleBlueInputPassword,
      isLoading,
      handleLoading,
      isShowMessage,
      typeMessage,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/login/LoginPartial";
:deep() {
  .input--error {
    .el-input__wrapper {
      border: solid 0.5px red;
      &:focus,
      &:focus-within,
      &:active {
        border-color: #409eff;
      }
    }
  }
}
</style>
