<template>
  <q-card flat bordered class="stat-card">
    <q-card-section class="row no-wrap items-center">
      <q-avatar :color="color" :text-color="textColor" size="46px" rounded>
        <q-icon :name="icon" size="23px" />
      </q-avatar>
      <div class="q-ml-md">
        <div class="stat-label">{{ label }}</div>
        <div class="stat-value">{{ value ?? '—' }}</div>
        <div v-if="detail" class="stat-detail">{{ detail }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], default: '—' },
  detail: { type: String, default: '' },
  icon: { type: String, default: 'insights' },
  color: { type: String, default: 'blue-1' },
  textColor: { type: String, default: 'primary' }
})
</script>

<style scoped>
.stat-card {
  height: 100%;
  border-radius: 13px;
  background: #fff;
}

.stat-label {
  color: #68788c;
  font-size: 12px;
  font-weight: 600;
}

.stat-value {
  margin-top: 3px;
  color: #14243a;
  font-size: 25px;
  font-weight: 800;
  line-height: 1.2;
}

.stat-detail {
  margin-top: 3px;
  color: #8793a2;
  font-size: 11px;
}
</style>
