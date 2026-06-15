<template>
  <ul class="flex gap-1 m-0 p-0 list-none overflow-x-auto select-none w-fit">
    <li v-for="(item, index) of tabs" :key="index">
      <a
        class="tab-pill"
        :class="{ active: modelValue === index && !item.disabled, disabled: item.disabled }"
        @click="!item.disabled && $emit('update:modelValue', index)"
      >
        <i v-if="item.icon" :class="item.icon" />
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface TabItem {
  label: string
  icon?: string
  disabled?: boolean
}

defineProps<{
  tabs: TabItem[]
  modelValue: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<style scoped>
.tab-pill {
  cursor: pointer;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.15s;
  color: var(--p-surface-500);
}
:root.dark .tab-pill {
  color: var(--p-surface-400);
}

.tab-pill.active {
  background: var(--p-primary-color);
  color: var(--p-primary-contrast);
}

.tab-pill:not(.active):not(.disabled):hover {
  background: var(--p-surface-200);
}
:root.dark .tab-pill:not(.active):not(.disabled):hover {
  background: var(--p-surface-700);
}

.tab-pill.disabled {
  color: var(--p-surface-300);
  cursor: not-allowed;
  opacity: 0.6;
}
:root.dark .tab-pill.disabled {
  color: var(--p-surface-600);
}
</style>
