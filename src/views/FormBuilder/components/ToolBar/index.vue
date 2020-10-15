<template>
    <div>
        <el-button @click="$emit('exec','merge')">合并</el-button>
        <el-button @click="$emit('exec','split')">拆分</el-button>
        <el-button @click="$emit('exec','save')">保存</el-button>
    </div>
</template>

<script>
    export default {

    }

</script>

<style lang="scss" scoped>

</style>
