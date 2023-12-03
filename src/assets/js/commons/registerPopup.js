import { defineAsyncComponent } from "vue";
const bookingRequestDetail = defineAsyncComponent(()=> import('@/views/bookingRequest/BookingRequestDetail.vue'))
const bookingResponse = defineAsyncComponent(()=> import('@/views/bookingRequest/BookingResponse.vue'))
const bookingResponseDetail = defineAsyncComponent(()=> import('@/views/bookingRequest/BookingResponseDetail.vue'))
const accountForwarderDetail = defineAsyncComponent(()=> import('@/views/accountForwarder/AccountForwarderDetail.vue'))
export function registerPopup(app){
    app.component('BookingRequestDetail',bookingRequestDetail)
    app.component('BookingResponse',bookingResponse)
    app.component('BookingResponseDetail',bookingResponseDetail)
    app.component('AccountForwarderDetail',accountForwarderDetail)
}