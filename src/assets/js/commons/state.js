import {ref,computed} from 'vue'
export const collapsed = ref(false);
export const toggleSideBar = () => { collapsed.value = !collapsed.value}
export const SIDEBAR_WiDTH = 300;
export const SIDEBAR_WiDTH_COLLAPSED = 66;
export const sideBarWidth = computed(
    ()=> `${collapsed.value ?SIDEBAR_WiDTH_COLLAPSED :SIDEBAR_WiDTH }px` 
)