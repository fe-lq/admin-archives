<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'

interface FormType {
  userName: string
  phone: string
  status?: boolean
}
const drawerVisible = ref(false)
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

const handleClick = () => {}
</script>

<template>
  <ElForm :inline="true" :model="formInline" class="form-container">
    <ElFormItem label="用户名">
      <ElInput v-model="formInline.userName" placeholder="请输入用户名" clearable />
    </ElFormItem>
    <ElFormItem label="手机号">
      <ElInput v-model="formInline.phone" placeholder="请输入手机号" clearable />
    </ElFormItem>
    <ElFormItem label="状态">
      <ElSelect v-model="formInline.status" placeholder="请选择状态" clearable>
        <ElOption label="启用" :value="true" />
        <ElOption label="禁用" :value="false" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onSubmit">查询</ElButton>
      <ElButton type="primary" @click="onSubmit">重置</ElButton>
      <ElButton type="primary" @click="drawerVisible = true">新增</ElButton>
    </ElFormItem>
  </ElForm>
  <ElTable :data="tableData" style="width: 100%">
    <ElTableColumn prop="date" label="时间" width="180" />
    <ElTableColumn prop="userName" label="用户名" width="180" />
    <ElTableColumn prop="role" label="角色" width="120" />
    <ElTableColumn prop="address" label="地址" />
    <ElTableColumn prop="address" label="操作">
      <template #default>
        <ElButton type="primary" size="small" @click="handleClick">编辑</ElButton>
        <ElButton type="danger" size="small">删除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
  <SliderBrawer v-model:visible="drawerVisible" />
</template>

<style lang="scss" scoped>
.form-container {
  .el-input {
    --el-input-width: 220px;
  }
}
</style>
