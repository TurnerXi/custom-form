<template>
    <div>
        <button @click="$emit('exec','merge')">合并</button>
        <button @click="$emit('exec','split')">拆分</button>
    </div>
</template>

<script>
    export default {

    }

</script>

<style lang="scss" scoped>

</style>
