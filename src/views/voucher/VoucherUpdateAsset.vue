<template>
  <teleport to="body">
    <div class="model" v-on:keypress="keyboardEvent">
      <div class="form-asset" ref="root">
        <div class="header-popup">
          <div class="form-asset__title">
            Sửa tài sản {{ dataFormAsset.fixed_asset_name }}
          </div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              ref="btnClose"
              @click="handleClosePopup"
              class="form-asset__close app-icon ic-close"
            ></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form_group">
              <v-input
                label="Bộ phận sử dụng"
                tabindex="101"
                hasLabel
                :maxLength="50"
                :radius="false"
                placeholder="Bộ phận sử dụng"
                :disabled="true"
                v-model="dataFormAsset.department_name"
              ></v-input>
            </div>
            <div class="box__title">Nguyên giá</div>
            <div class="box__select-form">
              <p>Nguồn hình thành</p>
              <p>Giá trị</p>
            </div>
            <div class="box_select-item">
              <div class="dialog-update-asset">
                <div
                  v-for="(source, index) in sources"
                  :key="source.id"
                  class="source-item"
                >
                  <div class="form-group">
                    <div class="dialog-item select--cb">
                      <div class="item_dropdown">
                        <el-select
                          v-model="source.budget_id"
                          filterable
                          placeholder="Chọn nguồn hình thành"
                          class="source-item-cbb"
                          @change="handleChangeCbo(source.budget_id, index)"
                          :tabindex="`10${index * 2}`"
                          :class="{
                            'input--error': validateShowError[index],
                            'duplicate-source-input--error': validateShowError[index],
                          }"
                        >
                          <el-option
                            v-for="item in budget_options"
                            :key="item.budget_id"
                            :label="item.budget_name"
                            :value="item.budget_id"
                          />
                        </el-select>
                      </div>

                      <span class="error-message" v-if="validateShowError[index]">{{
                        titleError[index]
                      }}</span>
                    </div>
                    <div class="dialog-item price__cb">
                      <v-number
                        :tabindex="`10${index * 2 - 1}`"
                        leftIcon
                        :disabledRight="false"
                        :radius="true"
                        v-model="source.cost"
                        @change="handleChangeInput(source.cost, index)"
                        @blur="handleChangeInput(source.cost, index)"
                        :disabledMessage="validateShowErrorInput[index]"
                        :message="titleErrorInput[index]"
                        :options="{
                          locale: 'vi-VN',
                          currency: 'EUR',
                          currencyDisplay: 'hidden',
                          valueRange: { min: 0 },
                          hideGroupingSeparatorOnFocus: false,
                        }"
                      >
                      </v-number>
                    </div>
                  </div>
                  <div class="form_group-btn">
                    <div class="position-relative mt-10 mb-20 box-add">
                      <v-tooltip
                        content="Thêm nguồn chi phí"
                        placement="bottom"
                        right="bottom"
                      >
                        <div
                          @click="addField(sources)"
                          class="button-no-border app-icon ic-add-border"
                        ></div>
                      </v-tooltip>
                    </div>
                    <div
                      v-if="sources.length > 1"
                      class="position-relative mt-10 mb-20 box-minus"
                    >
                      <v-tooltip
                        content="Xóa nguồn chi phí"
                        placement="bottom"
                        right="bottom"
                      >
                        <div
                          @click="removeField(index, sources)"
                          class="button-no-border app-icon ic-minus-border"
                        ></div>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form_group--bottom">
              <div class="box_sum">
                <v-input
                  tabindex="250"
                  :maxLength="50"
                  :radius="false"
                  placeholder="Tổng"
                  :disabled="true"
                ></v-input>
              </div>
              <div class="box_sum-price">
                <v-number
                  tabindex="250"
                  leftIcon
                  :disabledRight="false"
                  :radius="true"
                  v-model="sumCost"
                  :disabled="true"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                >
                </v-number>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                ref="btnClosePopup"
                @click="handleClosePopup"
                radius
              >
              </v-button>
            </v-tooltip>

            <!-- Buttom lưu dữ liệu
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Lưu" placement="top" right="top">
              <v-button
                text="Lưu"
                tabindex="111"
                @click="handleSaveOnClick"
                radius
                :disabled="false"
              ></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- Hiển thị thông báo error multiple
       @author NNNINH (04/01/2023) -->
    <teleport to="body">
      <v-message-box
        leftIcon="ic-warning"
        :disabledTop="false"
        :disabled="false"
        disabledLeftMultiple
        :valueMultiple="titleErrValidate"
        :disabledMultiple="true"
        :disabledValueLeft="false"
        :disabledValueRight="false"
        v-if="isShowDialogDetail"
      >
        <v-button
          tabindex="201"
          :text="Resource.TitleBtnDialog.Close.VI"
          radius
          @click="isShowDialogDetail = false"
        ></v-button>
      </v-message-box>
    </teleport>
  </teleport>

  <!-- Hiển thị thông báo cập nhât
       @author NNNINH (22/11/2022) -->
  <teleport to="body">
    <v-message-box
      v-on:keydown="keyboardEvent"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessUpdate"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Save.VI"
        radius
        @click="handleSaveOnClick"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoSave.VI"
        type="abort"
        @click="handleClosePop"
        radius
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Cancel.VI"
        type="secodary"
        @click="closeProValidate"
        radius
      ></v-button>
    </v-message-box>
  </teleport>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  nextTick,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VInput from "@/components/input/VInput.vue";
import vNumber from "@/components/number/VInputMoney.vue";
import Resource from "@/assets/js/resource/resource.js";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import Enum from "@/assets/js/enums/enum.js";
import _ from "lodash";
import assetAPI from "@/apis/api/assetAPI";
import { forEach } from "lodash";
import { integer } from "@vuelidate/validators";
export default {
  components: {
    VButton,
    VTooltip,
    VInput,
    vNumber,
    VMessageBox,
  },
  emits: ["hideDialog", "update:modelValue"],
  props: {
    // Xác định là form thêm, sửa, xóa
    formModel: {
      default: {},
    },
    modelValue: {
      default: {},
    },
    // Đối tượng lấy dữ liệu và cập nhật lại dữ liệu
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.popupUpdate = proxy;
    const sourceCost = ref([]);
    const sumCost = ref(0);
    const dataFormAsset = ref({});
    const oldDataFormAsset = ref([]);
    const titleError = ref({});
    const titleErrorInput = ref({});
    const assetData = ref({});
    const isShowDialogDetail = ref(false);
    const titleErrValidate = ref([]);
    const sources = ref([
      {
        budget_id: "",
        budget_name: "",
        cost: 0,
      },
    ]);

    // Mảng có giá trị 1 tại vị trí trùng
    const duplicateValidate = ref([]);
    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.dataFormAsset = newVal;
      }
    );
    watch(
      () => proxy.dataSelect,
      (newVal) => {
        proxy.assetData = newVal;
      }
    );
    watch(
      () => sources.value,
      (newVal) => {
        if (proxy.modelValue.budget != "" || proxy.modelValue.budget != null) {
          proxy.sumCost = proxy.sources.reduce((acc, item) => acc + item.cost, 0);
          proxy.budget_options.forEach((x, index) => {
            proxy.sources.forEach((y) => {
              if (y["budget_id"] == x["budget_id"]) {
                y["budget_name"] = x["budget_name"];
              }
            });
          });
        }
      },
      {
        deep: true,
      }
    );

    const focusFirst = () => {};
    onMounted(() => {
      proxy.assetData = proxy.dataSelect;
      proxy.dataFormAsset = _.cloneDeep(proxy.modelValue);

      proxy.loadDataComboBudget();
      proxy.defaultValue();

      setTimeout(() => {
        proxy.$refs.root.querySelector("input:not([disabled])").focus();
      }, 300);
    });
    const addField = (list) => {
      list.push({ budget_id: "", budget_name: "", cost: null });
    };
    /**
     * Lấy dữ liệu data ngân sách
     * @Author: NNNinh (02/01/2023)
     */
    async function loadDataComboBudget() {
      try {
        let res = await assetAPI.get("Budgets/GetAll", {});
        proxy.budget_options = res;
      } catch (error) {
        console.log(error);
      }
    }

    const removeField = (index, list) => {
      if (sources.value.length == 1) {
        return;
      } else {
        proxy.validateShowError = [];
        list.splice(index, 1);
        sourceCost.value.splice(index, 1);
      }
    };
    // Mảng lưu các tên nguồn ngân sách
    const budget_options = ref([]);

    const defaultValue = () => {
      if (proxy.modelValue.budget != null) {
        proxy.sources = JSON.parse(proxy.modelValue.budget);
      }
      proxy.oldDataFormAsset = _.cloneDeep(proxy.sources);
    };

    const isDialogMessUpdate = ref(false);
    const handleClosePopup = () => {
      if (proxy.EqualData == true) {
        emit("hideDialog");
      } else {
        proxy.isDialogMessUpdate = true;
      }
    };

    // Sự kiện đóng close popup
    const handleClosePop = () => {
      emit("hideDialog");
    };

    /**
     * Kiểm tra trùng nguồn ngân sách
     * @author NNNINH (03/01/2023)
     */
    const checkDuplicate = () => {
      let check = true;
      for (let i in proxy.sources) {
        for (let j in proxy.sources) {
          if (proxy.sources[i].budget_id == proxy.sources[j].budget_id && i < j) {
            proxy.validateShowError[j] = true;
            proxy.titleError[j] = "Nguồn chi phí đã tồn tại!";

            check = false;
          }
        }
      }
      return check;
    };
    const handleChangeCbo = (data, index) => {
      if (data != "" || data != null) {
        proxy.validateShowError[index] = false;
      } else {
        proxy.validateShowError[index] = true;
      }
    };

    const handleChangeInput = (data, index) => {
      if (data != "" || data != null) {
        proxy.validateShowErrorInput[index] = false;
      } else {
        proxy.validateShowErrorInput[index] = true;
      }
    };

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (13/01/2023)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.ESC) {
        proxy.handleClosePopup();
      }
    };
    const validateData = () => {
      proxy.validateShowError = [];
      proxy.titleErrorInput = [];
      proxy.titleError = [];
      proxy.validateShowErrorInput = [];
      let res = true;
      proxy.sources.forEach((x, index) => {
        if (x.budget_id == "") {
          proxy.validateShowError[index] = true;
          proxy.titleError[index] = "Không được bỏ trống ô này!";
          res = false;
        }
        if (x.cost == null || x.cost == "") {
          proxy.validateShowErrorInput[index] = true;
          proxy.titleErrorInput[index] = "Không được bỏ trống ô này!";
          res = false;
        }
      });
      return res;
    };
    /**
     * Xác nhận đóng cảnh báo validate nghiệp vụ
     * @author NNNINH (13/01/2023)
     */
    const closeProValidate = () => {
      proxy.isDialogMessUpdate = false;
      // proxy.focusFirst();
    };
    const validateShowError = ref([]);
    const validateShowErrorInput = ref([]);
    const EqualData = computed(() => {
      return _.isEqual(proxy.sources, proxy.oldDataFormAsset);
    });
    const handleSaveOnClick = () => {
      if (proxy.checkDuplicate() && proxy.validateData()) {
        proxy.dataFormAsset.budget = JSON.stringify(proxy.sources);
        if (proxy.EqualData == true) {
          proxy.titleErrValidate = [];
          proxy.titleErrValidate.push("Dữ liệu chưa được chỉnh sửa");
          proxy.isShowDialogDetail = true;
        } else {
          proxy.titleErrValidate = [];
          proxy.dataFormAsset.oldCost = proxy.sources.reduce(
            (acc, item) => acc + item.cost,
            0
          );
          if (proxy.dataFormAsset.increment_status) {
            proxy.dataFormAsset.flag = Enum.Mode.Update;
          } else {
            proxy.dataFormAsset.flag = Enum.Mode.Add;
          }

          emit("update:modelValue", proxy.dataFormAsset);
          proxy.handleClosePop();
        }
      }
    };

    return {
      budget_options,
      loadDataComboBudget,
      removeField,
      addField,
      sources,
      sourceCost,
      sumCost,
      duplicateValidate,
      handleSaveOnClick,
      checkDuplicate,
      defaultValue,
      assetData,
      handleClosePopup,
      handleClosePop,
      validateShowError,
      dataFormAsset,
      oldDataFormAsset,
      EqualData,
      titleError,
      titleErrorInput,
      validateShowErrorInput,
      validateData,
      handleChangeCbo,
      Resource,
      isShowDialogDetail,
      titleErrValidate,
      keyboardEvent,
      isDialogMessUpdate,
      closeProValidate,
      handleChangeInput,
      focusFirst,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/VoucherUpdatePopup.scss";
@import "@/assets/scss/components/v_combobox.scss";
@import "@/assets/scss/components/v_message_box.scss";
.source-item-cbb {
  width: 100%;
}
:deep() {
  .el-input__wrapper:focus {
    border: 1px solid #409eff;
    box-shadow: none !important;
  }
  .el-input__wrapper {
    box-shadow: none !important;
  }
  .is-focus {
    box-shadow: none !important;
  }
}
.dialog-item {
  .item_dropdown {
    position: relative;
  }
  .error-message {
    color: red;
    font-size: 13px;
    margin-top: 2px;
    position: absolute;
    max-width: 100%;
    text-overflow: ellipsis;
  }
}
:deep() {
  .el-input__wrapper {
    box-shadow: none !important;
    &:active,
    &:hover,
    &:focus-within {
      box-shadow: none !important;
      border: solid 1px #1492e6 !important;
    }
  }
  .is-focus {
    box-shadow: none !important;
  }
  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
    border: solid 1px #1492e6 !important;
  }
}
</style>
