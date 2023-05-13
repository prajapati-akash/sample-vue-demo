<template>
<div class="text-left" v-if="error">
    <span class="text-left text-red-600" >{{ error }}</span>
</div>
</template>
<script>
export default {
    props : ['error']
}
</script>