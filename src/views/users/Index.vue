<script lang="ts" setup>
import { reactive, ref } from 'vue'
import SliderBrawer from './components/SliderDrawer.vue'
import { Modal, message } from 'ant-design-vue'

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

const columns = [
  {
    title: '创建时间',
    dataIndex: 'date'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '角色',
    dataIndex: 'role'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]

const handleClick = () => {}

const handleDelete = () => {
  Modal.confirm({
    title: '提示',
    content: '确认是否要删除当前数据？',
    onCancel: () => {
      message.warning('操作已取消')
    },
    onOk: () => {
      message.success('操作成功')
    }
  })
}
</script>

<template>
  <a-form layout="inline" :model="formInline" class="form-container">
    <a-form-item label="用户名">
      <a-input v-model="formInline.userName" placeholder="请输入用户名" clearable />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model="formInline.phone" placeholder="请输入手机号" clearable />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model="formInline.status" placeholder="请选择状态" clearable>
        <a-select-option :value="true">启用</a-select-option>
        <a-select-option :value="false">禁用</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="onSubmit">查询</a-button>
        <a-button @click="onSubmit">重置</a-button>
      </a-space>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="drawerVisible = true">新增</a-button>
    </a-form-item>
  </a-form>
  <a-table :columns="columns" :data-source="tableData">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'status'">
        <a-tag v-if="record.status" color="success">启用</a-tag>
        <a-tag v-else color="error">禁用</a-tag>
      </template>
      <template v-if="column.dataIndex === 'phone'">
        {{ getPhone(record.phone) }}
      </template>
      <template v-if="column.dataIndex === 'operate'">
        <a-space>
          <a-button type="primary" size="small" @click="handleClick">编辑</a-button>
          <a-button type="primary" danger size="small" @click="handleDelete">删除</a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <SliderBrawer v-model:visible="drawerVisible" />
</template>

<style lang="scss" scoped>
.form-container {
  margin-bottom: 10px;
  .ant-input,
  .ant-select {
    width: 200px;
  }
}
</style>
