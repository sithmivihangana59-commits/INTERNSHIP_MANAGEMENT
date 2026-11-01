<template>
  <q-page class="dashboard-page">
    <div class="page-heading">
      <div>
        <div class="page-eyebrow">YOUR CAREER SPACE</div>
        <h1>Welcome back, {{ user?.firstName || 'there' }}</h1>
        <p
          >Find opportunities, keep applications moving, and plan your next
          step.</p
        >
      </div>
      <q-btn
        color="primary"
        unelevated
        no-caps
        icon="search"
        label="Explore internships"
        to="/internships"
      />
    </div>

    <div v-if="loading && !data" class="loading-state">
      <q-spinner-dots color="primary" size="42px" />
      <div>Loading your dashboard…</div>
    </div>
    <q-banner
      v-else-if="error && !data"
      class="bg-red-1 text-negative rounded-borders"
    >
      {{ error }}
      <template #action><q-btn flat label="Retry" @click="reload" /></template>
    </q-banner>

    <template v-else-if="data">
      <q-card flat bordered class="profile-progress q-mb-md">
        <q-card-section class="row items-center q-col-gutter-md">
          <div class="col">
            <div class="text-weight-bold">Profile completion</div>
            <div class="text-caption text-grey-6"
              >A complete profile helps employers learn more about you.</div
            >
            <q-linear-progress
              class="q-mt-md"
              rounded
              size="8px"
              color="primary"
              :value="data.profileCompletion / 100"
            />
          </div>
          <div class="completion-value">{{ data.profileCompletion }}%</div>
          <q-btn
            flat
            no-caps
            label="Complete profile"
            icon-right="arrow_forward"
            to="/profile"
          />
        </q-card-section>
      </q-card>

      <div class="row q-col-gutter-md">
        <div
          v-for="card in cards"
          :key="card.label"
          class="col-12 col-sm-6 col-lg-3"
        >
          <DashboardStatCard v-bind="card" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div id="opportunities" class="col-12 col-lg-7">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="row items-center justify-between q-mb-sm">
                <div>
                  <div class="section-title">Recently posted opportunities</div>
                  <div class="section-subtitle"
                    >Latest active internships from the platform</div
                  >
                </div>
                <q-btn
                  flat
                  no-caps
                  color="primary"
                  label="Browse all"
                  to="/internships"
                />
              </div>
              <div v-if="!data.recentInternships.length" class="empty-state">
                There are no active internships yet. Check back soon.
              </div>
              <q-list v-else separator>
                <q-item
                  v-for="role in data.recentInternships"
                  :key="role._id"
                  class="q-px-none"
                >
                  <q-item-section avatar>
                    <q-avatar color="blue-1" text-color="primary" rounded>
                      {{ (role.company?.name || 'I').slice(0, 1) }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{
                      role.title
                    }}</q-item-label>
                    <q-item-label caption
                      >{{ role.company?.name || 'Company'
                      }}<span v-if="role.category?.name">
                        · {{ role.category.name }}</span
                      ></q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      color="green-1"
                      text-color="green-9"
                      label="Open"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-lg-5">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">Application progress</div>
              <div class="section-subtitle"
                >Your applications by current status</div
              >
              <div v-if="!data.stats.totalApplications" class="empty-state">
                No applications yet.
                <q-btn
                  flat
                  no-caps
                  color="primary"
                  label="Find your first opportunity"
                  to="/internships"
                />
              </div>
              <div v-else class="status-list">
                <div
                  v-for="item in data.applicationStats"
                  :key="item.status"
                  class="status-row"
                >
                  <span>{{ statusLabel(item.status) }}</span>
                  <q-badge
                    :color="statusColor(item.status)"
                    :text-color="statusTextColor(item.status)"
                    :label="item.count"
                  />
                </div>
              </div>
              <q-separator class="q-my-md" />
              <div class="row items-center justify-between">
                <span class="text-grey-7">Saved opportunities</span>
                <span class="text-weight-bold">{{ data.stats.savedJobs }}</span>
              </div>
              <q-btn
                flat
                no-caps
                color="primary"
                label="View application tracker"
                class="q-mt-sm"
                to="/tracker"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card id="saved" flat bordered class="content-card q-mt-md">
        <q-card-section>
          <div class="section-title">Saved opportunities</div>
          <div v-if="!data.savedOpportunities.length" class="empty-state">
            You have not saved any internships yet.
            <q-btn
              flat
              no-caps
              color="primary"
              label="Explore internships"
              to="/internships"
            />
          </div>
          <q-list v-else separator>
            <q-item
              v-for="bookmark in data.savedOpportunities"
              :key="bookmark._id"
              class="q-px-none"
            >
              <q-item-section>
                <q-item-label class="text-weight-bold">{{
                  bookmark.internship?.title || 'Internship'
                }}</q-item-label>
                <q-item-label caption>{{
                  bookmark.internship?.company?.name || 'Company'
                }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge
                  v-if="bookmark.internship?.isActive"
                  color="green-1"
                  text-color="green-9"
                  label="Open"
                />
                <q-badge
                  v-else
                  color="grey-3"
                  text-color="grey-8"
                  label="Closed"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="content-card q-mt-md">
        <q-card-section>
          <div class="section-title">Recent applications</div>
          <div v-if="!data.recentApplications.length" class="empty-state"
            >Your submitted applications will appear here.</div
          >
          <q-list v-else separator>
            <q-item
              v-for="application in data.recentApplications"
              :key="application._id"
              class="q-px-none"
            >
              <q-item-section>
                <q-item-label class="text-weight-bold">{{
                  application.internship?.title || 'Internship'
                }}</q-item-label>
                <q-item-label caption
                  >{{ application.internship?.company?.name || 'Company' }} ·
                  {{ formatDate(application.appliedAt) }}</q-item-label
                >
              </q-item-section>
              <q-item-section side
                ><q-badge
                  :color="statusColor(application.status)"
                  :text-color="statusTextColor(application.status)"
                  :label="statusLabel(application.status)"
              /></q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </template>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import DashboardStatCard from '../components/DashboardStatCard.vue'
import { useDashboardData } from '../composables/useDashboardData.js'
import { getAuthUser } from '../utils/auth.js'

const user = getAuthUser()
const { data, loading, error, reload } = useDashboardData('student')
const cards = computed(() => {
  const stats = data.value?.stats || {}
  return [
    {
      label: 'Applications',
      value: stats.totalApplications,
      icon: 'description'
    },
    {
      label: 'Pending review',
      value: stats.pendingApplications,
      icon: 'hourglass_top',
      color: 'orange-1',
      textColor: 'orange-10'
    },
    {
      label: 'Shortlisted',
      value: stats.shortlisted,
      icon: 'star_outline',
      color: 'purple-1',
      textColor: 'purple-8'
    },
    {
      label: 'Interviews',
      value: stats.interviews,
      icon: 'event',
      color: 'teal-1',
      textColor: 'teal-9'
    }
  ]
})

function statusLabel(status) {
  return (
    {
      pending: 'Pending',
      reviewed: 'Under Review',
      shortlisted: 'Shortlisted',
      interview: 'Interview',
      accepted: 'Accepted',
      rejected: 'Rejected'
    }[status] || 'Unknown'
  )
}

function statusColor(status) {
  return (
    {
      accepted: 'green-1',
      rejected: 'red-1',
      interview: 'purple-1',
      shortlisted: 'blue-1',
      pending: 'orange-1',
      reviewed: 'grey-3'
    }[status] || 'grey-3'
  )
}

function statusTextColor(status) {
  return (
    {
      accepted: 'green-9',
      rejected: 'red-9',
      interview: 'purple-9',
      shortlisted: 'blue-9',
      pending: 'orange-10',
      reviewed: 'grey-9'
    }[status] || 'grey-9'
  )
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Date unavailable'
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
  gap: 14px;
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
.profile-progress,
.content-card {
  border-radius: 13px;
}
.completion-value {
  color: #1766bd;
  font-size: 23px;
  font-weight: 800;
}
.section-title {
  margin-bottom: 3px;
  color: #192b40;
  font-size: 16px;
  font-weight: 750;
}
.status-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #5e6e82;
  font-size: 13px;
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
@media (max-width: 600px) {
  .page-heading {
    flex-direction: column;
  }
  .completion-value {
    font-size: 18px;
  }
}
</style>
