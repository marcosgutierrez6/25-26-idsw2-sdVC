<template>
  <div
    class="kpi-card"
    :style="{ '--accent-color': accentColor }"
  >
    <div class="kpi-card__header">
      <div class="kpi-card__icon-container">
        <i :class="icon" class="kpi-card__icon" />
      </div>
      <span v-if="badge" class="kpi-card__badge">
        {{ badge }}
      </span>
    </div>

    <div class="kpi-card__content">
      <span class="kpi-card__label">{{ label }}</span>
      <div class="kpi-card__value">{{ value }}</div>
    </div>

    <div v-if="trend" class="kpi-card__footer">
      <span :class="['kpi-card__trend', trendClass]">
        <i :class="trendIcon" class="kpi-card__trend-icon" />
        {{ trend }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  value: string | number;
  icon: string;
  badge?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  accentColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: 'var(--color-primary)',
  trendDirection: 'neutral',
});

const trendClass = computed(() => {
  return {
    'kpi-card__trend--up': props.trendDirection === 'up',
    'kpi-card__trend--down': props.trendDirection === 'down',
    'kpi-card__trend--neutral': props.trendDirection === 'neutral',
  };
});

const trendIcon = computed(() => {
  switch (props.trendDirection) {
    case 'up': return 'pi pi-arrow-up';
    case 'down': return 'pi pi-arrow-down';
    default: return 'pi pi-minus';
  }
});
</script>

<style scoped>
.kpi-card {
  --accent-color: var(--color-primary);

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 1rem;

  background: linear-gradient(
    135deg,
    var(--color-bg-surface),
    var(--color-bg-surface)
  );

  border: 1px solid var(--color-primary-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent-color),
    transparent
  );
  opacity: 0.5;
}

.kpi-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(8, 160, 216, 0.15);
  transform: translateY(-2px);
}

.kpi-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.kpi-card__icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--color-primary-muted);
  color: var(--accent-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-card__icon {
  font-size: 1.125rem;
}

.kpi-card__badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kpi-card__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-card__value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.kpi-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.kpi-card__trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.kpi-card__trend--up {
  color: var(--accent-success);
}

.kpi-card__trend--down {
  color: var(--accent-error);
}

.kpi-card__trend--neutral {
  color: var(--color-text-secondary);
}

.kpi-card__trend-icon {
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .kpi-card {
    padding: 1rem;
    gap: 1rem;
  }

  .kpi-card__value {
    font-size: 1.875rem;
  }
}
</style>
