<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'

interface FormType {
  userName: string
  phone: string
  email?: string
  status?: boolean
}
const drawerVisible = ref(false)
const formInline = reactive<FormType>({
  userName: '',
  phone: ''
})

const getPhone = (value: string) => value.replace(/(?<=\d{3})(?<!\d{4})\d{4}/g, '****')

const tableData = [
  {
    date: '2016-05-03',
    userName: 'Tom',
    role: '超级管理员',
    status: true,
    phone: '17621733753'
  },
  {
    date: '2016-05-02',
    userName: 'Tom',
    role: '管理员',
    status: false,
    phone: '17665433753'
  },
  {
    date: '2016-05-04',
    userName: 'Tom',
    role: '管理员',
    status: true,
    phone: '17611113753'
  },
  {
    date: '2016-05-01',
    userName: 'Tom',
    role: '管理员',
    status: true,
    phone: '17622213753'
  }
]

const onSubmit = () => {
  console.log(formInline)
  console.log('submit!')
}

const handleClick = () => {}

const handleDelete = () => {
  ElMessageBox.confirm('确认是否要删除当前数据？', {
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'warning',
        message: '操作已取消'
      })
    })
}
const handleSizeChange = (val: number) => {
  console.log('size', val)
}
const handleCurrentChange = (val: number) => {
  console.log('current', val)
}
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
      <ElButton @click="onSubmit">重置</ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="drawerVisible = true">新增</ElButton>
    </ElFormItem>
  </ElForm>
  <ElTable :data="tableData" style="width: 100%">
    <ElTableColumn prop="date" label="创建时间" width="180" />
    <ElTableColumn prop="userName" label="用户名" width="180" />
    <ElTableColumn prop="role" label="角色" width="120" />
    <ElTableColumn prop="status" label="状态">
      <template #default="scope">
        <ElTag v-if="scope.row.status" type="success">启用</ElTag>
        <ElTag v-else type="danger">禁用</ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="phone" label="手机号">
      <template #default="scope">
        {{ getPhone(scope.row.phone) }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作">
      <template #default>
        <ElButton type="primary" size="small" @click="handleClick">编辑</ElButton>
        <ElButton type="danger" size="small" @click="handleDelete">删除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
  <div style="padding: 10px 0">
    <el-pagination
      :current-page="1"
      :page-size="10"
      :page-sizes="[10, 20, 30, 40]"
      small
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <SliderBrawer v-model:visible="drawerVisible" />
</template>

<style lang="scss" scoped>
.form-container {
  .el-input {
    --el-input-width: 220px;
  }
}
</style>
