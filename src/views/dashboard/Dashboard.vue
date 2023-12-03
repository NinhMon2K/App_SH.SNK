<template>
  <div class="box no-border">
    <div class="box-header with-border">
      <div class="form-horizontal">
        <div class="form-group__left">
          <!-- Nhập dữ liệu ngày mua
                @author NNNINH (22/11/2022) -->
          <v-input-date
            label="Từ ngày:"
            hasLabel
            positionLabel
            rightIcon="ic-date"
            topIcon="ic-angle_up"
            bottomIcon="ic-angle_down"
            :radius="true"
            tabindex="109"
          ></v-input-date>
        </div>
        <div class="form-group__left">
          <!-- Nhập dữ liệu ngày mua
                @author NNNINH (22/11/2022) -->
          <v-input-date
            label="Đến ngày:"
            hasLabel
            tabindex="109"
            rightIcon="ic-date"
            topIcon="ic-angle_up"
            bottomIcon="ic-angle_down"
            :radius="true"
            positionLabel
          ></v-input-date>
        </div>
      </div>
    </div>
    <div class="box-body">
      <!-- Phần Tổng hợp -->
      <div
        class="row form-group form-group-sm dashboard-center dashboard-center_container"
      >
        <div
          v-for="item in arrDashbord"
          :key="item.title"
          class="col-sm-1 total-request item_dashbord"
          :class="item.class"
        >
          <div class="common">
            <div class="title">{{ item.title }}</div>
            <div class="number">{{ item.number }}</div>
            <div class="precent">{{ item.precent }}</div>
          </div>
        </div>
      </div>
      <!-- Phần Thông Báo -->
      <div class="row form-group form-group-sm dashboard-notify">
        <div class="col-sm-4 new-common new-response">
          <div class="cls-common">
            <div class="notify-header">
              <div class="title">Danh sách phản hồi mới</div>
            </div>
            <div class="notify-content">
              <!-- Bảng dữ liệu tài sản -->
            </div>
          </div>
        </div>

        <div class="col-sm-4 new-common new-attached">
          <div class="cls-common">
            <div class="notify-header">
              <div class="title">Danh sách đính kèm mới</div>
            </div>
            <div class="notify-content"></div>
          </div>
        </div>
        <div class="col-sm-4 new-common new-change">
          <div class="cls-common">
            <div class="notify-header">
              <div class="title">Đã thay đổi ETD,ETA</div>
            </div>
            <div class="notify-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useDashbord } from "./dashboard";
import VInputDate from "@/components/date/VInputDate.vue";
export default {
  name: "MsAsset",
  components: {
    VInputDate,
  },
  async setup() {
    const Dashbord = useDashbord();
    return Dashbord;
  },
};
</script>
<style lang="scss" scoped>
.dashboard-page {
  @import "./Dashboard.scss";
}
</style>
