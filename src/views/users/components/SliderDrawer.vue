<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  visible: boolean
}

type Emits = {
  'update:visible': [value: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const visible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

const handleCancel = () => {
  visible.value = false
}
const handleConfirm = () => {
  visible.value = false
}
</script>
<template>
  <ElDrawer v-model="visible" title="添加用户" direction="rtl">
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleConfirm">确认</ElButton>
      </div>
    </template>
  </ElDrawer>
</template>
