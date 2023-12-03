<template>
  <div class="m-toast">
    <div class="m-toast-main" :class="type == 'loginFailed' ? 'login-toast' : ''">
      <div class="left-toast">
        <template
          v-if="
            type === 'success' || type === 'successDelete' || type === 'updateSuccess'
          "
        >
          <div class="box">
            <div class="box_icon">
              <div :class="['app-icon icon--left', 'ic-' + type]"></div>
            </div>
          </div>
        </template>

        <template
          v-else-if="
            type === 'errorSuccess' || type === 'errorDelete' || type === 'errorUpdate'
          "
        >
          <div class="box-error">
            <div class="box_icon">
              <div :class="['app-icon icon--left', 'ic-' + type]"></div>
            </div>
          </div>
        </template>

        <template v-else>
          <div :class="['app-icon icon--left', 'ic-' + type]"></div>
        </template>

        <div class="toast-content">
          <div class="title-toast">
            {{ textMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
  watch,
} from "vue";
import Resource from "@/assets/js/resource/resource.js";
export default {
  name: "VMessage",
  props: {
    type: {
      default: null,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const textMessage = ref("");
    watch(
      () => proxy.type,
      (newVal) => {
        proxy.textMessage = Resource.Toast[newVal];
      }
    );

    return { textMessage };
  },
};
</script>
<style lang="scss" scoped>
.m-toast {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 9999;
  display: block;
  .m-toast-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    box-shadow: 0 3px 8px 3px rgba(0, 0, 0, 0.16);
    height: 48px;
    min-height: 48px;
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
    animation: toastLeft ease 0.3s, toastOut linear 1s 3s forwards;
    .left-toast {
      display: flex;
      .toast-content {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: start;
        justify-content: center;
        .title-toast {
          display: block;
          font-size: 14px;
        }
      }
    }
  }
}
.box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #baeed4;
  display: flex;
  justify-content: center;

  align-items: center;
  margin-right: 14px;
  .box_icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #1ac871;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.box-error {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #eebac7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
  .box_icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #c81a1a;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.ic-failed {
  margin-right: 12px;
}
.ic-loginFailed {
  margin-right: 12px;
}
.login-toast {
  width: 350px;
}
@keyframes toastLeft {
  from {
    opacity: 0;
    transform: translateX(calc(100% + 32px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes toastOut {
  to {
    opacity: 0;
  }
}
</style>
