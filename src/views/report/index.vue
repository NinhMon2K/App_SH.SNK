<template>
    <div class="report-page page-view">
    <ms-report></ms-report>
    </div>
  </template>
  
  <script>
  import { defineAsyncComponent } from "vue";
  import MsReport from "./MsReport.vue";
  
  export default {
    components: {
        MsReport: defineAsyncComponent(() => import("./MsReport.vue")),
    },
    setup() {},
  };
  </script>
  