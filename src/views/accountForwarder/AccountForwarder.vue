<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <v-input
          id="txt-search"
          :hasLabel="false"
          :radius="true"
          leftIcon="ic-search"
          placeholder="Tìm kiếm tài sản"
          :disabledMessage="false"
          :tabindex="'1'"
        ></v-input>
      </div>

      <!-- combobox dữ liệu loại tài sản
            @author NNNINH (22/11/2022) -->
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <!-- buttom thêm mới -->
        <v-button
          text="Thêm nhà vận chuyển"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          :width="160"
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
    :dataTotal="dataTotal"
    v-model:active="active"
    :disableFooter="true"
    ref="table"
    :selectedCol="true"
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
import { useAccountForwarder } from "./accountForwarder";
export default {
  name: "MsAsset",
  components: {},
  setup() {
    const accountForwarder = useAccountForwarder();
    return accountForwarder;
  },
};
</script>
<style lang="scss" scoped>
@import "./AccountForwarder.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
