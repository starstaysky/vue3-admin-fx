<template>
  <div>我是user: {{ user }}</div>
</template>
<script setup>
import { ref } from 'vue'
const user = ref('fuxing')
</script>
