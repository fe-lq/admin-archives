<script lang="ts" setup>
import { reactive } from 'vue'

interface FormType {
  userName: string
  phone: string
  status?: boolean
}
const formInline = reactive<FormType>({
  userName: '',
  phone: ''
})

const tableData = [
  {
    date: '2016-05-03',
    userName: 'Tom',
    role: '超级管理员',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    userName: 'Tom',
    role: '管理员',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    userName: 'Tom',
    role: '管理员',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    userName: 'Tom',
    role: '管理员',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const onSubmit = () => {
  console.log(formInline)
  console.log('submit!')
}
</script>

<template>
  <el-form :inline="true" :model="formInline" class="form-container">
    <el-form-item label="用户名">
      <el-input v-model="formInline.userName" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formInline.phone" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formInline.status" placeholder="请选择状态" clearable>
        <el-option label="启用" :value="true" />
        <el-option label="禁用" :value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<style lang="scss" scoped>
.form-container {
  .el-input {
    --el-input-width: 220px;
  }
}
</style>
