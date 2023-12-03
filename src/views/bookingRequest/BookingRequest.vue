<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <!-- Nhập dữ liệu tìm kiếm theo mã tài sản hoặc bộ phận sử dụng
             @author NNNINH (22/11/2022) -->
        <div class="form-group__left">
          <!-- Nhập dữ liệu ngày mua
                @author NNNINH (22/11/2022) -->
          <v-input-date
            label="Từ ngày:"
            hasLabel
            positionLabel
            rowDisplay
            rightIcon="ic-date"
            topIcon="ic-angle_up"
            bottomIcon="ic-angle_down"
            :radius="true"
            v-model="fromDate"
            tabindex="109"
          ></v-input-date>
        </div>
        <div class="form-group__left">
          <!-- Nhập dữ liệu ngày mua
                @author NNNINH (22/11/2022) -->
          <v-input-date
            label="Đến ngày:"
            v-model="toDate"
            hasLabel
            tabindex="109"
            rowDisplay
            rightIcon="ic-date"
            topIcon="ic-angle_up"
            bottomIcon="ic-angle_down"
            :radius="true"
            positionLabel
          ></v-input-date>
        </div>
      </div>
      <v-combobox
        leftIcon="ic-fillter"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :heightCb="13"
        :tabindex="'3'"
        v-model="selectedAssetDepartment"
        :valueField="ResourceTable.FieldDepartment.departmentId"
        :displayField="ResourceTable.FieldDepartment.departmentName"
        :dataAll="DataDepartment.value"
      ></v-combobox>
      <!-- combobox dữ liệu loại tài sản
            @author NNNINH (22/11/2022) -->
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <!-- buttom thêm mới -->
        <v-button
          text="Tạo yêu cầu"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          @click="handleClickAdd"
          :tabindex="'4'"
        >
        </v-button>
      </v-tooltip>

      <!-- buttom xuất excel -->
      <v-tooltip content="Xuất Excel" placement="bottom">
        <v-button
          leftIcon="ic-export"
          id="btn-export"
          :tabindex="'5'"
          :radius="true"
          :width="40"
          @click="handleExportExcel"
        ></v-button>
      </v-tooltip>

      <!-- buttom xóa -->
      <v-tooltip content="Xóa" placement="bottom">
        <v-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :width="40"
          :radius="true"
          :tabindex="'6'"
          @click="handleShowMessBox"
        >
        </v-button>
      </v-tooltip>
    </div>
  </div>
  <!-- Bảng dữ liệu tài sản -->
  <v-grid
    :columns="columns"
    :allData="allData"
    :selectedCol="true"
    :dataTotal="dataTotal"
    v-model:active="active"
    :disableFooter="true"
    ref="table"
    @deleteOnKey="handleShowMessBox"
    v-model:selectedData="dataSelected"
    @handleEventTable="handleEventTable"
    @handle-close="handlClosePopup"
    @show-message="handleShowMess"
    @currentPage="handleTotalPage"
    @changeTabView="handleChangeTab"
  >
  </v-grid>
  <!-- popup asset -->
  <booking-request-detail
    v-if="isShowPopup"
    :formModel="pram"
    :allData="dataAssetID[0] || dataAssetID"
    @handle-close="handlClosePopup"
    @show-message="handleShowMess"
    :dataAll="dataAllAsset.value"
  ></booking-request-detail>
</template>
<script>
import axios from "axios";
import { useBookingRequest } from "./bookingRequest";
export default {
  name: "MsAsset",
  components: {},
  setup() {
    const bookingRequest = useBookingRequest();
    return bookingRequest;
  },
};
</script>
<style lang="scss" scoped>
@import "./BookingRequest.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
