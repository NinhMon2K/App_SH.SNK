<template>
  <div
    class="wrap-left"
    :class="{ 'menu-hide': collapsed }"
    :style="{ width: sideBarWidth }"
  >
    <div class="wrap-logo">
      <div class="logo logo_app"></div>
      <span class="title--logo">{{ Resource.LeftMenu.TitleLogo }}</span>
    </div>
    <div class="menu">
      <div class="menu-group">
        <div
          class="group__item"
          v-for="(item, index) in menuItems"
          :key="index"
        >
          <v-tooltip
            :content="collapsed ? item.title : ''"
            placement="right"
            right="right"
          >
            <div
              class="menu-item"
              :href="item.path"
              :class="[
                item.path == activeItem?.path ? 'active' : '',
                item.active,
              ]"
              @click.prevent="() => clickMenu(item)"
            >
              <div :class="['app-icon', item.icon]" :style="item.color"></div>
              <span class="text-menu">{{ item.text }}</span>
              <div
                class="arrow-menu misa-icon app-icon"
                @click.prevent="hanhdleShowItemChildrens(index)"
                :class="item.arrow"
              ></div>
            </div>
          </v-tooltip>
          <div class="sidebar__sub-menu">
            <div
              class="sidebar-sub__group"
              v-for="(itemChildrens, i) in item.childrens"
              :key="i"
            >
              <div
                class="sidebar-sub"
                :href="itemChildrens.path"
                :class="[
                  itemChildrens.path == activeItemChildrens?.path
                    ? 'activeChildrens'
                    : '',
                ]"
                @click.prevent="() => clickMenuChildrens(itemChildrens)"
                v-if="Childrens"
              >
                <a class="sidebar-sub__item">
                  <span class="text-menu">{{ itemChildrens.text }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap-bottom-menu">
      <v-tooltip
        :content="collapsed ? 'Mở ra' : 'Thu vào'"
        placement="top"
        right="top"
      >
        <div
          class="menu-resize"
          :class="{ 'rotate-180': collapsed }"
          @click="toggleSideBar"
        >
          <div class="resize-icon app-icon ic-back"></div>
        </div>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
//import { getCurrentInstance } from "vue";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import { collapsed, sideBarWidth } from "@/assets/js/commons/state.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

export default {
  name: "LeftMenu",
  components: { VTooltip },
  data() {
    return {};
  },
  computed: {
    menuItems() {
      return this.getMenuItems();
    },
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    window.sideBar = proxy;
    const isActive = ref(false);
    const activeItem = ref(null);
    const activeItemChildrens = ref(null);
    const Childrens = ref(false);
    function setActive() {
      proxy.isActive = true;
    }
    onMounted(() => {});

    watch(
      () => activeItem.value,
      (newVal) => {
        if (newVal) {
          // proxy.activeMenu(newVal.path);
        }
      }
    );

    watch(
      () => activeItemChildrens.value,
      (newVal) => {
        if (newVal) {
          //  proxy.activeMenuChildrens();
        }
      }
    );
    onMounted(() => {
      let pathName = location.pathname.toLowerCase();
      let item = proxy.menuItems.find((x) => x.path == pathName);
      proxy.activeItem = item || proxy.menuItems[1];
    });

    function activeMenu(item) {
      let pathName = location.pathname.toLowerCase();
      if (item.path == pathName) {
        proxy.activeItem = item;
      } else {
        proxy.activeItem = null;
        proxy.activeItemChildrens = null;
      }
    }
    function activeMenuChildrens(item) {
      proxy.activeChildrens = null;
      setTimeout(() => {
        let pathName = location.pathname.toLowerCase();
        if (item.path == pathName) {
          proxy.activeItemChildrens = item;
        }
      }, 10);
    }

    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    const Listsioner = computed(() => {
      const me = this;
      return {
        click: (event) => {
          cancelEvent(event);
        },
        mousedown: (event) => {
          cancelEvent(event);
        },
        keydown: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
        focus: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
      };
    });
    const collapsed = ref(false);
    const toggleSideBar = () => {
      collapsed.value = !collapsed.value;
    };

    function hanhdleShowItemChildrens(index, e) {
      let id = 0;
      proxy.menuItems.forEach((item) => {
        item.childrens.forEach((element) => (id = element.itemID));
      });
      if ((index = id)) {
        proxy.Childrens = !proxy.Childrens;
      } else {
        proxy.Childrens = false;
      }
      let pathName = location.pathname.toLowerCase();
      let item = proxy.menuItems.find((x) => x.path == pathName);
      proxy.activeItem = item || proxy.menuItems[1];
    }
    const getMenuItems = () => {
      let menuItems = [
        {
          itemID: 1,
          path: "/dashboard",
          icon: "fas fa-tachometer-alt",
          text: "Tổng quan",
          color: "color: #11151d;",
          arrow: "",
          title: "Tổng quan",
          childrens: [],
        },
        {
          itemID: 2,
          path: "/bookingRequest",
          icon: "fas fa-ship fa-xs",
          color: "color: #11151d;",
          text: "Yêu cầu đặt tàu",
          arrow: "",
          title: "Yêu cầu đặt tàu",
          active: "active",
          childrens: [],
        },
        {
          itemID: 3,
          path: "",
          icon: "fas fa-file-invoice fa-xs",
          text: "Thống kê",
          arrow: "ic-angle-down",
          title: "Thống kê",
          color: "color: #11151d;",
          childrens: [
            {
              itemID: 3,
              path: "/voucher",
              text: "Công nợ",
              arrow: "",
            },
            {
              itemID: 3,
              path: "",
              text: "Hủy yêu cầu",
              arrow: "",
            },
          ],
        },
        {
          itemID: 4,
          path: "/accountForwarder",
          icon: "fas fa-dolly-flatbed fa-xs",
          color: "color: #11151d;",
          text: "Nhà vận chuyển",
          arrow: "ic-angle-down",
          title: "Nhà vận chuyển",
          childrens: [],
        },
      ];
      return menuItems;
    };

    function clickMenu(item) {
      proxy.$router.push(item.path);
      proxy.activeMenu(item);
    }
    function clickMenuChildrens(item) {
      proxy.$router.push(item.path);
      proxy.activeMenuChildrens(item);
    }

    return {
      clickMenuChildrens,
      getMenuItems,
      hanhdleShowItemChildrens,
      collapsed,
      toggleSideBar,
      sideBarWidth,
      Listsioner,
      isActive,
      clickMenu,
      activeItem,
      activeItemChildrens,
      activeMenuChildrens,
      activeMenu,
      Resource,
      Childrens,
      setActive,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/layouts/the_sidebar.scss";
.activeChildrens {
  background-color: #f4f7ff !important;
  opacity: 1 !important;
}
</style>
