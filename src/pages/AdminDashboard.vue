<template>
  <q-page class="dashboard-page">
    <div class="page-heading">
      <div>
        <div class="page-eyebrow">PLATFORM OVERVIEW</div>
        <h1>Admin dashboard</h1>
        <p>Monitor users, opportunities, companies, and platform activity.</p>
      </div>
      <q-btn
        flat
        round
        icon="refresh"
        aria-label="Refresh dashboard"
        :loading="loading"
        @click="reload"
      />
    </div>

    <div v-if="loading && !data" class="loading-state">
      <q-spinner-dots color="primary" size="42px" />
      <div>Loading platform data…</div>
    </div>
    <q-banner
      v-else-if="error && !data"
      class="bg-red-1 text-negative rounded-borders"
    >
      {{ error }}
      <template #action><q-btn flat label="Retry" @click="reload" /></template>
    </q-banner>

    <template v-else-if="data">
      <div class="row q-col-gutter-md">
        <div
          v-for="card in cards"
          :key="card.label"
          class="col-12 col-sm-6 col-lg-4"
        >
          <DashboardStatCard v-bind="card" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div id="applications" class="col-12 col-lg-6">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">Application statistics</div>
              <div class="section-subtitle"
                >Applications grouped by current status</div
              >
              <div
                v-if="data.stats.totalApplications === 0"
                class="empty-state"
              >
                No applications have been submitted yet.
              </div>
              <div v-else class="bar-list">
                <div
                  v-for="item in data.applicationStats"
                  :key="item.status"
                  class="bar-row"
                >
                  <div class="bar-label">{{ formatLabel(item.status) }}</div>
                  <div class="bar-track">
                    <div
                      class="bar-fill"
                      :style="{
                        width: percentage(
                          item.count,
                          data.stats.totalApplications
                        )
                      }"
                    ></div>
                  </div>
                  <div class="bar-value">{{ item.count }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div id="companies" class="col-12 col-lg-6">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">User statistics</div>
              <div class="section-subtitle">Registered accounts by role</div>
              <div v-if="data.stats.totalUsers === 0" class="empty-state">
                No users have registered yet.
              </div>
              <div v-else class="bar-list">
                <div
                  v-for="item in data.userStats"
                  :key="item._id"
                  class="bar-row"
                >
                  <div class="bar-label">{{ formatLabel(item._id) }}</div>
                  <div class="bar-track">
                    <div
                      class="bar-fill teal"
                      :style="{
                        width: percentage(item.count, data.stats.totalUsers)
                      }"
                    ></div>
                  </div>
                  <div class="bar-value">{{ item.count }}</div>
                </div>
              </div>
              <q-separator class="q-my-md" />
              <div class="row items-center justify-between">
                <span class="text-grey-7">Companies awaiting verification</span>
                <q-badge
                  color="orange-1"
                  text-color="orange-10"
                  :label="data.stats.pendingCompanies"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div id="users" class="col-12 col-lg-6">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">Recent user registrations</div>
              <div v-if="!data.recentUsers.length" class="empty-state"
                >No registered users yet.</div
              >
              <q-list v-else separator>
                <q-item
                  v-for="user in data.recentUsers"
                  :key="user._id"
                  class="q-px-none"
                >
                  <q-item-section avatar>
                    <q-avatar color="blue-1" text-color="primary">{{
                      initials(user)
                    }}</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold"
                      >{{ user.firstName }} {{ user.lastName }}</q-item-label
                    >
                    <q-item-label caption>{{ user.email }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      color="grey-2"
                      text-color="grey-9"
                      :label="formatLabel(user.role)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div id="opportunities" class="col-12 col-lg-6">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">Recent internship posts</div>
              <div class="section-subtitle"
                >The platform currently stores internship opportunities; a
                separate job-post model is not configured.</div
              >
              <div v-if="!data.recentInternships.length" class="empty-state"
                >No internships have been posted yet.</div
              >
              <q-list v-else separator>
                <q-item
                  v-for="internship in data.recentInternships"
                  :key="internship._id"
                  class="q-px-none"
                >
                  <q-item-section avatar
                    ><q-icon name="work_outline" color="primary"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{
                      internship.title
                    }}</q-item-label>
                    <q-item-label caption>{{
                      internship.company?.name || 'Company not set'
                    }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :color="internship.isActive ? 'green-1' : 'grey-3'"
                      :text-color="internship.isActive ? 'green-9' : 'grey-8'"
                      :label="internship.isActive ? 'Active' : 'Inactive'"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import DashboardStatCard from '../components/DashboardStatCard.vue'
import { useDashboardData } from '../composables/useDashboardData.js'

const { data, loading, error, reload } = useDashboardData('admin')
const cards = computed(() => {
  const stats = data.value?.stats || {}
  return [
    { label: 'Total users', value: stats.totalUsers, icon: 'group' },
    {
      label: 'Job seekers',
      value: stats.students,
      icon: 'person_search',
      color: 'purple-1',
      textColor: 'purple-8'
    },
    {
      label: 'Employers',
      value: stats.employers,
      icon: 'business',
      color: 'teal-1',
      textColor: 'teal-9'
    },
    {
      label: 'Companies',
      value: stats.totalCompanies,
      icon: 'apartment',
      color: 'cyan-1',
      textColor: 'cyan-9'
    },
    {
      label: 'Internship posts',
      value: stats.totalInternships,
      icon: 'work_outline',
      color: 'orange-1',
      textColor: 'orange-10'
    },
    {
      label: 'Job vacancies',
      value: '—',
      detail: 'No separate job-post model',
      icon: 'work',
      color: 'grey-2',
      textColor: 'grey-8'
    },
    {
      label: 'Active opportunities',
      value: stats.activeInternships,
      icon: 'task_alt',
      color: 'green-1',
      textColor: 'green-9'
    },
    {
      label: 'Active job posts',
      value: '—',
      detail: 'No separate job-post model',
      icon: 'work_history',
      color: 'grey-2',
      textColor: 'grey-8'
    },
    {
      label: 'Applications',
      value: stats.totalApplications,
      icon: 'description',
      color: 'indigo-1',
      textColor: 'indigo-8'
    }
  ]
})

function percentage(value, total) {
  return `${total ? Math.round((value / total) * 100) : 0}%`
}

function formatLabel(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'
}

function initials(user) {
  return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
}
</script>

<style scoped>
.dashboard-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 34px clamp(16px, 3vw, 40px) 48px;
}
.page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 23px;
}
.page-heading h1 {
  margin: 4px 0 5px;
  color: #14243a;
  font-size: 27px;
  font-weight: 800;
}
.page-heading p,
.section-subtitle {
  margin: 0;
  color: #77869a;
  font-size: 13px;
  line-height: 1.55;
}
.page-eyebrow {
  color: #2473c9;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
}
.content-card {
  height: 100%;
  border-radius: 13px;
}
.section-title {
  margin-bottom: 3px;
  color: #192b40;
  font-size: 16px;
  font-weight: 750;
}
.bar-list {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}
.bar-row {
  display: grid;
  grid-template-columns: 98px 1fr 30px;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
.bar-label {
  color: #5e6e82;
}
.bar-track {
  height: 8px;
  overflow: hidden;
  border-radius: 9px;
  background: #edf1f6;
}
.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: #347fce;
}
.bar-fill.teal {
  background: #36a88d;
}
.bar-value {
  color: #263a50;
  font-weight: 700;
  text-align: right;
}
.empty-state,
.loading-state {
  padding: 24px 0 8px;
  color: #8793a2;
  font-size: 13px;
}
.loading-state {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 80px 0;
}
</style>
