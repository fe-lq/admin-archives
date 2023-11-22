<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'
import { ElSpace } from 'element-plus'

interface FormType {
  userName: string
  phone: string
  email?: string
  role?: string
}
const drawerVisible = ref(false)
const searchForm = reactive<FormType>({
  userName: '',
  phone: ''
})

const tableData = [
  {
    users: ['Tom', '李四', '张总', '高总'],
    role: '超级管理员',
    permissions: ['线上档案', '商品信息']
  },
  {
    users: ['Sire', '李四', '张总', '高总'],
    role: '管理员',
    permissions: ['客户管理', '商品信息']
  },
  {
    users: ['Sire', '李四', '高总'],
    role: '管理员',
    permissions: ['客户管理', '线上商品']
  }
]

const onSubmit = () => {
  console.log(searchForm)
  console.log('submit!')
}

const handleClick = (row: any) => {
  console.log(row)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认是否要删除当前数据？', {
    type: 'warning'
  })
    .then(() => {
      console.log(row)
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
  <ElForm :inline="true" :model="searchForm" class="form-container">
    <ElFormItem label="用户名">
      <ElInput v-model="searchForm.userName" placeholder="请输入用户名" clearable />
    </ElFormItem>
    <ElFormItem label="角色">
      <ElInput v-model="searchForm.role" placeholder="请输入角色名称" clearable />
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
    <ElTableColumn prop="role" label="角色名称" width="120" />
    <ElTableColumn prop="users" label="成员">
      <template #default="scope">
        <ElSpace wrap>
          <ElTag v-for="user in scope.row.users" :key="user">{{ user }}</ElTag>
        </ElSpace>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="permissions" label="权限范围">
      <template #default="scope">
        {{ scope.row.permissions.join(', ') }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作" width="180">
      <template #default="scope">
        <ElButton type="primary" size="small" @click="handleClick(scope.row)">编辑</ElButton>
        <ElButton type="danger" size="small" @click="handleDelete(scope.row)">删除</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
  <div style="padding: 10px 0">
    <el-pagination
      :current-page="1"
      :page-size="10"
      :page-sizes="[100, 200, 300, 400]"
      small
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <SliderBrawer :visible="drawerVisible" @close="drawerVisible = false" />
</template>

<style lang="scss" scoped>
.form-container {
  .el-input {
    --el-input-width: 220px;
  }
}
</style>
