import VDynamicPopup from "@/components/popup/VDynamicPopup.vue";
import VInputDate from "@/components/date/VInputDate.vue";
import VInputNumber from "@/components/number/VInputNumber.vue";
import VDropDown from "@/components/dropdown/VDropDown.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import VCombobox from "@/components/combobox/VCombobox.vue";
import VGrid from "@/components/grid/VGrid.vue";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";
export function useComponents(app){
    app.component(VDynamicPopup.name,VDynamicPopup)
    app.component(VInputDate.name,VInputDate)
    app.component(VInputNumber.name,VInputNumber)
    app.component(VDropDown.name,VDropDown)
    app.component(VTooltip.name,VTooltip)
    app.component(VMessageBox.name,VMessageBox)
    app.component(VButton.name,VButton)
    app.component(VInput.name,VInput)
    app.component(VCombobox.name,VCombobox)
    app.component(VGrid.name,VGrid)
    app.component(VLoading.name,VLoading)
    app.component(VMessage.name,VMessage)
}