<template>
  <q-page class="dashboard-page">
    <div class="page-heading">
      <div>
        <div class="page-eyebrow">RECRUITMENT WORKSPACE</div>
        <h1>Employer dashboard</h1>
        <p>Manage your internship posts and keep up with candidates.</p>
      </div>
      <q-btn
        color="primary"
        unelevated
        no-caps
        icon="add"
        label="Manage vacancies"
        to="/employers"
      />
      <q-btn
        outline
        color="primary"
        no-caps
        icon="groups"
        label="Review applications"
        to="/employers#applications"
      />
    </div>

    <div v-if="loading && !data" class="loading-state">
      <q-spinner-dots color="primary" size="42px" />
      <div>Loading recruitment data…</div>
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
          class="col-12 col-sm-6 col-lg-3"
        >
          <DashboardStatCard v-bind="card" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-sm">
        <div class="col-12 col-lg-7">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="row items-center justify-between q-mb-sm">
                <div>
                  <div class="section-title">Your internship posts</div>
                  <div class="section-subtitle"
                    >Only opportunities posted by your account are shown.</div
                  >
                </div>
                <q-btn
                  flat
                  no-caps
                  color="primary"
                  label="Manage posts"
                  to="/employers"
                />
              </div>
              <div v-if="!data.internships.length" class="empty-state">
                You have not posted any internships yet.
                <q-btn
                  flat
                  no-caps
                  color="primary"
                  label="Create a post"
                  to="/employers"
                />
              </div>
              <q-list v-else separator>
                <q-item
                  v-for="internship in data.internships"
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
                    <q-item-label caption
                      >{{ internship.company?.name || 'Company' }} ·
                      {{ formatDate(internship.createdAt) }}</q-item-label
                    >
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

        <div id="analytics" class="col-12 col-lg-5">
          <q-card flat bordered class="content-card">
            <q-card-section>
              <div class="section-title">Candidate pipeline</div>
              <div class="section-subtitle"
                >Application counts across your posts</div
              >
              <div v-if="!data.stats.totalApplicants" class="empty-state"
                >Applications to your posts will appear here.</div
              >
              <div v-else class="status-list">
                <div
                  v-for="item in data.applicationStats"
                  :key="item.status"
                  class="status-row"
                >
                  <span>{{ label(item.status) }}</span>
                  <q-badge
                    :color="color(item.status)"
                    text-color="grey-9"
                    :label="item.count"
                  />
                </div>
              </div>
              <div class="text-caption text-grey-6 q-mt-md"
                >Job vacancies are not tracked separately; the current backend
                supports internship posts.</div
              >
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card id="applicants" flat bordered class="content-card q-mt-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="section-title">Recent applications</div>
            <q-btn
              flat
              no-caps
              color="primary"
              label="Review all"
              to="/employers#applications"
            />
          </div>
          <div v-if="!data.recentApplications.length" class="empty-state"
            >No candidates have applied to your posts yet.</div
          >
          <q-list v-else separator>
            <q-item
              v-for="application in data.recentApplications"
              :key="application._id"
              class="q-px-none"
            >
              <q-item-section avatar>
                <q-avatar color="blue-1" text-color="primary">{{
                  (application.applicant?.firstName || 'C').slice(0, 1)
                }}</q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >{{ application.applicant?.firstName }}
                  {{ application.applicant?.lastName }}</q-item-label
                >
                <q-item-label caption
                  >{{ application.internship?.title || 'Internship' }} ·
                  {{ application.applicant?.email }}</q-item-label
                >
                <q-item-label caption>
                  Applied {{ formatDate(application.appliedAt) }}
                </q-item-label>
                <q-item-label v-if="application.applicant?.university" caption>
                  {{ application.applicant.university }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="items-end">
                <q-badge
                  :color="color(application.status)"
                  text-color="grey-9"
                  :label="label(application.status)"
                />
                <q-btn
                  flat
                  dense
                  no-caps
                  :color="
                    hasApplicantCv(application) ? 'primary' : 'grey-6'
                  "
                  icon="description"
                  :label="
                    hasApplicantCv(application) ? 'View CV' : 'CV not available'
                  "
                  :disable="
                    !hasApplicantCv(application)
                  "
                  @click="viewApplicantResume(application)"
                />
                <q-item-label
                  v-if="!hasApplicantCv(application)"
                  caption
                  class="text-grey-6"
                >
                  Student has not uploaded a CV.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </template>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import DashboardStatCard from '../components/DashboardStatCard.vue'
import { useDashboardData } from '../composables/useDashboardData.js'
import { getAuthToken } from '../utils/auth.js'
import { hasApplicantCv, openApplicantCv } from '../utils/openApplicantCv.js'

const { data, loading, error, reload } = useDashboardData('employer')
const $q = useQuasar()
const cards = computed(() => {
  const stats = data.value?.stats || {}
  return [
    {
      label: 'Internship posts',
      value: stats.totalInternships,
      icon: 'work_outline'
    },
    {
      label: 'Active vacancies',
      value: stats.activeInternships,
      icon: 'task_alt',
      color: 'green-1',
      textColor: 'green-9'
    },
    {
      label: 'Total applicants',
      value: stats.totalApplicants,
      icon: 'groups',
      color: 'purple-1',
      textColor: 'purple-8'
    },
    {
      label: 'New applications',
      value: stats.newApplications,
      icon: 'mark_email_unread',
      color: 'orange-1',
      textColor: 'orange-10'
    }
  ]
})

function label(status) {
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

function color(status) {
  return (
    {
      accepted: 'green-2',
      rejected: 'red-2',
      interview: 'purple-2',
      shortlisted: 'blue-2',
      pending: 'orange-2'
    }[status] || 'grey-3'
  )
}

async function viewApplicantResume(application) {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Your session has expired. Please sign in again.')
    }
    await openApplicantCv(application._id, token)
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to load the applicant CV.',
      position: 'top'
    })
  }
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
}
</style>
