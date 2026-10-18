<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- ================= HEADER ================= -->

    <div class="page-header text-white q-py-lg border-bottom-navy">
      <div class="max-width-container q-px-md">
        <!-- Student Identity -->

        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-x-md">
            <q-avatar
              size="54px"
              color="primary"
              text-color="white"
              class="text-weight-bold shadow-2"
            >
              SV
            </q-avatar>

            <div>
              <div class="row items-center q-gutter-x-sm">
                <h1
                  class="text-h5 font-display text-weight-bolder text-white q-my-none"
                >
                  Sithmi Vihangana
                </h1>

                <q-badge color="positive" rounded class="text-weight-bold">
                  <q-icon name="verified" size="14px" class="q-mr-xs" />
                  VERIFIED STUDENT
                </q-badge>
              </div>

              <div class="text-caption text-grey-4 q-mt-xs">
                BSc (Hons) in Software Engineering • 3rd Year • University of
                Moratuwa
              </div>
            </div>
          </div>

          <!-- Quick Actions -->

          <div class="gt-xs row items-center q-gutter-x-sm">
            <q-btn
              unelevated
              color="primary"
              no-caps
              label="Explore More Internships"
              icon="search"
              to="/internships"
              class="text-weight-bold rounded-borders text-caption q-px-md"
            />
          </div>
        </div>

        <!-- ================= DYNAMIC METRICS ================= -->

        <div class="row q-col-gutter-sm q-mt-md">
          <!-- Total -->

          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-white">
                {{ applications.length }}
              </div>

              <div class="text-caption text-grey-4" style="font-size: 11px">
                Total Applied
              </div>
            </q-card>
          </div>

          <!-- Review -->

          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-primary">
                {{ inReviewList.length }}
              </div>

              <div class="text-caption text-grey-4" style="font-size: 11px">
                Under Review
              </div>
            </q-card>
          </div>

          <!-- Interview -->

          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-purple-3">
                {{ interviewList.length }}
              </div>

              <div class="text-caption text-grey-4" style="font-size: 11px">
                Interviews Scheduled
              </div>
            </q-card>
          </div>

          <!-- Offers -->

          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-positive">
                {{ offeredList.length }}
              </div>

              <div class="text-caption text-grey-4" style="font-size: 11px">
                Offer Letters 🎉
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= PIPELINE ================= -->

    <div class="max-width-container q-px-md q-pt-lg">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <span class="text-subtitle1 text-weight-bold text-navy">
            Application Pipeline
          </span>

          <span class="text-caption text-grey-6 q-ml-sm">
            Click any application card to view application details.
          </span>
        </div>

        <q-btn
          flat
          dense
          no-caps
          color="primary"
          icon="refresh"
          label="Refresh Status"
          :loading="loading"
          @click="refreshPipeline"
        />
      </div>

      <!-- ================= 4 COLUMNS ================= -->

      <div class="row q-col-gutter-md">
        <!-- ================= APPLIED ================= -->

        <div class="col-12 col-sm-6 col-md-3">
          <div
            class="kanban-column bg-grey-2 q-pa-sm rounded-borders border-light"
          >
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span
                class="text-caption text-weight-bold text-grey-8 uppercase tracking-wider"
              >
                APPLIED
              </span>

              <q-badge color="grey-4" text-color="grey-9" class="text-bold">
                {{ appliedList.length }}
              </q-badge>
            </div>

            <div class="q-gutter-y-sm">
              <q-card
                v-for="app in appliedList"
                :key="app.id"
                flat
                class="kanban-card q-pa-md bg-white border-light rounded-borders cursor-pointer hover-card"
                @click="openAppDetail(app)"
              >
                <div class="row items-center justify-between">
                  <q-badge
                    color="orange-1"
                    text-color="deep-orange"
                    class="text-bold"
                  >
                    {{ app.company }}
                  </q-badge>

                  <span
                    class="text-caption text-grey-5"
                    style="font-size: 10px"
                  >
                    {{ app.appliedDate }}
                  </span>
                </div>

                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">
                  {{ app.role }}
                </div>

                <div
                  class="text-caption text-positive text-weight-bold q-mt-xs"
                >
                  {{ app.stipend }}
                </div>

                <div
                  class="text-caption text-grey-6 q-mt-xs"
                  style="font-size: 11px"
                >
                  {{ app.nextAction }}
                </div>
              </q-card>

              <!-- Empty -->

              <div
                v-if="appliedList.length === 0"
                class="text-center text-caption text-grey-5 q-pa-md"
              >
                No applications
              </div>
            </div>
          </div>
        </div>

        <!-- ================= IN REVIEW ================= -->

        <div class="col-12 col-sm-6 col-md-3">
          <div
            class="kanban-column bg-blue-1 q-pa-sm rounded-borders border-light"
          >
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span
                class="text-caption text-weight-bold text-primary uppercase tracking-wider"
              >
                IN REVIEW
              </span>

              <q-badge color="blue-2" text-color="blue-9" class="text-bold">
                {{ inReviewList.length }}
              </q-badge>
            </div>

            <div class="q-gutter-y-sm">
              <q-card
                v-for="app in inReviewList"
                :key="app.id"
                flat
                class="kanban-card q-pa-md bg-white border-light rounded-borders cursor-pointer hover-card"
                @click="openAppDetail(app)"
              >
                <div class="row items-center justify-between">
                  <q-badge
                    color="green-1"
                    text-color="green-8"
                    class="text-bold"
                  >
                    {{ app.company }}
                  </q-badge>

                  <span class="pulse-dot"></span>
                </div>

                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">
                  {{ app.role }}
                </div>

                <div
                  class="text-caption text-positive text-weight-bold q-mt-xs"
                >
                  {{ app.stipend }}
                </div>

                <div
                  class="text-caption text-warning text-weight-bold q-mt-xs"
                  style="font-size: 11px"
                >
                  {{ app.notes }}
                </div>
              </q-card>

              <div
                v-if="inReviewList.length === 0"
                class="text-center text-caption text-grey-5 q-pa-md"
              >
                No applications
              </div>
            </div>
          </div>
        </div>

        <!-- ================= INTERVIEW ================= -->

        <div class="col-12 col-sm-6 col-md-3">
          <div
            class="kanban-column bg-purple-1 q-pa-sm rounded-borders border-light"
          >
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span
                class="text-caption text-weight-bold text-purple-9 uppercase tracking-wider"
              >
                INTERVIEW ROUNDS
              </span>

              <q-badge color="purple-2" text-color="purple-9" class="text-bold">
                {{ interviewList.length }}
              </q-badge>
            </div>

            <div class="q-gutter-y-sm">
              <q-card
                v-for="app in interviewList"
                :key="app.id"
                flat
                class="kanban-card q-pa-md bg-white border-light rounded-borders cursor-pointer hover-card"
                @click="openAppDetail(app)"
              >
                <div class="row items-center justify-between">
                  <q-badge
                    color="blue-1"
                    text-color="blue-10"
                    class="text-bold"
                  >
                    {{ app.company }}
                  </q-badge>

                  <q-icon
                    name="video_camera_front"
                    color="purple"
                    size="16px"
                  />
                </div>

                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">
                  {{ app.role }}
                </div>

                <div
                  class="text-caption text-positive text-weight-bold q-mt-xs"
                >
                  {{ app.stipend }}
                </div>

                <div
                  class="q-mt-sm q-pa-xs bg-purple-1 rounded-borders text-purple-9 text-caption text-weight-bold"
                  style="font-size: 11px"
                >
                  {{ app.nextAction }}
                </div>
              </q-card>

              <div
                v-if="interviewList.length === 0"
                class="text-center text-caption text-grey-5 q-pa-md"
              >
                No interviews yet
              </div>
            </div>
          </div>
        </div>

        <!-- ================= OFFER ================= -->

        <div class="col-12 col-sm-6 col-md-3">
          <div
            class="kanban-column bg-green-1 q-pa-sm rounded-borders border-light"
          >
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span
                class="text-caption text-weight-bold text-positive uppercase tracking-wider"
              >
                OFFER LETTER 🎉
              </span>

              <q-badge color="green-2" text-color="green-9" class="text-bold">
                {{ offeredList.length }}
              </q-badge>
            </div>

            <div class="q-gutter-y-sm">
              <q-card
                v-for="app in offeredList"
                :key="app.id"
                flat
                class="kanban-card q-pa-md bg-white border-light rounded-borders cursor-pointer hover-card"
                @click="openAppDetail(app)"
              >
                <div class="row items-center justify-between">
                  <q-badge
                    color="purple-1"
                    text-color="purple"
                    class="text-bold"
                  >
                    {{ app.company }}
                  </q-badge>

                  <q-icon name="check_circle" color="positive" size="18px" />
                </div>

                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">
                  {{ app.role }}
                </div>

                <div
                  class="text-caption text-positive text-weight-bolder q-mt-xs"
                >
                  {{ app.stipend }} • Accepted
                </div>

                <div
                  class="text-caption text-grey-7 q-mt-xs"
                  style="font-size: 11px"
                >
                  {{ app.notes }}
                </div>
              </q-card>

              <div
                v-if="offeredList.length === 0"
                class="text-center text-caption text-grey-5 q-pa-md"
              >
                No offers yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= APPLICATION DETAILS ================= -->

    <q-dialog v-model="showDetailDialog">
      <q-card
        v-if="selectedApp"
        style="min-width: 360px; max-width: 550px"
        class="rounded-borders"
      >
        <q-card-section class="row items-center q-pb-none">
          <div>
            <q-badge
              color="blue-1"
              text-color="primary"
              class="q-mb-xs text-weight-bold"
            >
              {{ selectedApp.company }}
            </q-badge>

            <div
              class="text-h6 font-display text-weight-bold text-navy leading-tight"
            >
              {{ selectedApp.role }}
            </div>
          </div>

          <q-space />

          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <!-- Current Stage + Stipend -->

          <div class="row q-col-gutter-sm text-center q-mb-md">
            <div class="col-6">
              <div class="q-pa-sm bg-grey-2 rounded-borders">
                <span class="text-caption text-grey-6" style="font-size: 11px">
                  CURRENT STAGE
                </span>

                <div class="text-caption text-weight-bold text-navy">
                  {{ selectedApp.stageName }}
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="q-pa-sm bg-grey-2 rounded-borders">
                <span class="text-caption text-grey-6" style="font-size: 11px">
                  STIPEND
                </span>

                <div class="text-caption text-weight-bold text-positive">
                  {{ selectedApp.stipend }}
                </div>
              </div>
            </div>
          </div>

          <!-- Details -->

          <div class="text-subtitle2 text-weight-bold text-navy q-mb-xs">
            Recruitment Details & Logs
          </div>

          <p
            class="text-caption text-grey-7 leading-normal bg-grey-1 q-pa-sm rounded-borders border-light"
          >
            {{ selectedApp.notes }}
          </p>

          <!-- Next Action -->

          <div
            class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs"
          >
            Next Action Required
          </div>

          <div
            class="q-pa-sm bg-blue-1 text-primary rounded-borders text-caption text-weight-bold"
          >
            <q-icon name="info" size="16px" class="q-mr-xs" />

            {{ selectedApp.nextAction }}
          </div>

          <div
            v-if="selectedApp.status === 'interview' && selectedApp.interview"
            class="q-pa-sm q-mt-md bg-purple-1 rounded-borders"
          >
            <div class="text-subtitle2 text-weight-bold text-purple-9">
              Interview details
            </div>
            <div
              v-if="selectedApp.interview.scheduledAt"
              class="text-caption q-mt-xs"
            >
              {{ formatInterviewDate(selectedApp.interview.scheduledAt) }}
            </div>
            <div
              v-if="selectedApp.interview.location"
              class="text-caption q-mt-xs"
            >
              {{ selectedApp.interview.location }}
            </div>
            <a
              v-if="selectedApp.interview.meetingUrl"
              :href="selectedApp.interview.meetingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-caption"
            >
              Join interview
            </a>
            <div
              v-if="selectedApp.interview.notes"
              class="text-caption q-mt-xs"
            >
              {{ selectedApp.interview.notes }}
            </div>
          </div>

          <!-- Status History -->

          <div
            v-if="selectedApp.statusHistory && selectedApp.statusHistory.length"
            class="q-mt-md"
          >
            <div class="text-subtitle2 text-weight-bold text-navy q-mb-xs">
              Application History
            </div>

            <div
              v-for="(history, index) in selectedApp.statusHistory"
              :key="index"
              class="q-pa-sm q-mb-xs bg-grey-1 rounded-borders border-light"
            >
              <div class="row items-center justify-between">
                <span class="text-caption text-weight-bold text-primary">
                  {{ formatStatus(history.status) }}
                </span>

                <span class="text-caption text-grey-5">
                  {{ formatDate(history.changedAt) }}
                </span>
              </div>

              <div v-if="history.note" class="text-caption text-grey-7 q-mt-xs">
                {{ history.note }}
              </div>
            </div>
          </div>

          <!-- Interview -->

          <div class="q-mt-lg row q-gutter-x-sm">
            <q-btn
              v-if="selectedApp.stage === 'interview'"
              unelevated
              color="purple"
              no-caps
              label="Join Microsoft Teams Room"
              icon="video_call"
              class="full-width text-weight-bold q-py-sm"
              @click="joinInterview"
            />

            <q-btn
              v-else-if="selectedApp.stage === 'offered'"
              unelevated
              color="positive"
              no-caps
              label="Download Official Offer Letter (PDF)"
              icon="download"
              class="full-width text-weight-bold q-py-sm"
              @click="downloadOffer"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { getAuthToken as readAuthToken } from '../utils/auth.js'

import { ref, computed, onMounted } from 'vue'

import { useQuasar } from 'quasar'

// =====================================================
// Quasar
// =====================================================

const $q = useQuasar()

// =====================================================
// API
// =====================================================

const APPLICATION_API_URL = 'http://localhost:5000/api/applications/my'

// =====================================================
// State
// =====================================================

const applications = ref([])

const loading = ref(false)

const showDetailDialog = ref(false)

const selectedApp = ref(null)

// =====================================================
// Get Token
// =====================================================

function getAuthToken() {
  return readAuthToken()
}

// =====================================================
// Format Date
// =====================================================

function formatDate(date) {
  if (!date) {
    return 'Date not available'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date not available'
  }

  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// =====================================================
// Format Status
// =====================================================

function formatStatus(status) {
  if (!status) {
    return 'Unknown'
  }

  const labels = {
    pending: 'Pending',

    reviewed: 'Under Review',

    shortlisted: 'Shortlisted',

    interview: 'Interview',

    accepted: 'Accepted',

    rejected: 'Rejected'
  }

  return (
    labels[status] ||
    status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())
  )
}

// =====================================================
// Convert Backend Application
// =====================================================

function transformApplication(item) {
  const internship = item.internship || {}

  const company = internship.company || {}

  const salary = internship.salary || {}

  const status = item.status || 'pending'

  let stage = 'applied'

  // Pending
  if (status === 'pending') {
    stage = 'applied'
  }

  // Reviewed / shortlisted
  if (status === 'reviewed' || status === 'shortlisted') {
    stage = 'in_review'
  }

  // Interview
  if (status === 'interview') {
    stage = 'interview'
  }

  // Accepted
  if (status === 'accepted') {
    stage = 'offered'
  }

  // Rejected
  if (status === 'rejected') {
    stage = 'rejected'
  }

  const stipendAmount = Number(salary.amount || 0)

  const stipendCurrency = salary.currency || 'LKR'

  const stipendPeriod = salary.period || 'month'

  return {
    id: item._id,

    role: internship.title || 'Internship',

    company: company.name || 'Unknown Company',

    stipend: stipendAmount
      ? `${stipendCurrency} ${stipendAmount.toLocaleString()} / ${stipendPeriod}`
      : 'Stipend not specified',

    stage: stage,

    stageName: formatStatus(status),

    status: status,

    appliedDate: formatDate(item.appliedAt || item.createdAt),

    nextAction: getNextAction(status),

    notes: getApplicationNote(item, status),

    statusHistory: Array.isArray(item.statusHistory) ? item.statusHistory : [],

    interview: item.interview || null,

    resumeUrl: item.resumeUrl || '',

    coverLetter: item.coverLetter || '',

    applicationDeadline: internship.applicationDeadline || null,

    location: internship.location || '',

    workMode: internship.workMode || ''
  }
}

// =====================================================
// Next Action
// =====================================================

function getNextAction(status) {
  const actions = {
    pending:
      'Your application has been submitted. Waiting for employer review.',

    reviewed: 'HR is reviewing your application.',

    shortlisted: 'You have been shortlisted. Watch for interview details.',

    interview: 'Interview stage reached. Check your interview instructions.',

    accepted: 'Congratulations! Your application has been accepted.',

    rejected:
      'This application was not selected. You can explore other internships.'
  }

  return actions[status] || 'Check your application for updates.'
}

function formatInterviewDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Interview time not available'
    : date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
}

// =====================================================
// Application Notes
// =====================================================

function getApplicationNote(item, status) {
  // Latest status history note

  if (Array.isArray(item.statusHistory) && item.statusHistory.length > 0) {
    const latest = item.statusHistory[item.statusHistory.length - 1]

    if (latest?.note) {
      return latest.note
    }
  }

  return getNextAction(status)
}

// =====================================================
// Computed Pipeline Lists
// =====================================================

const appliedList = computed(() =>
  applications.value.filter(app => app.stage === 'applied')
)

const inReviewList = computed(() =>
  applications.value.filter(app => app.stage === 'in_review')
)

const interviewList = computed(() =>
  applications.value.filter(app => app.stage === 'interview')
)

const offeredList = computed(() =>
  applications.value.filter(app => app.stage === 'offered')
)

// =====================================================
// Fetch Applications
// =====================================================

async function fetchApplications() {
  loading.value = true

  try {
    const token = getAuthToken()

    if (!token) {
      applications.value = []

      $q.notify({
        type: 'warning',

        message: 'Please login to view your applications.',

        icon: 'login'
      })

      return
    }

    const response = await fetch(APPLICATION_API_URL, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`
      }
    })

    const result = await response.json()

    console.log('My applications API response:', result)

    if (!response.ok) {
      throw new Error(
        result.message || `Failed to load applications (${response.status})`
      )
    }

    if (!result.success) {
      throw new Error(result.message || 'Failed to load applications.')
    }

    applications.value = (result.data || []).map(transformApplication)
  } catch (error) {
    console.error('Application pipeline error:', error)

    applications.value = []

    $q.notify({
      type: 'negative',

      message: error.message || 'Unable to load your applications.',

      icon: 'error',

      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

// =====================================================
// Open Application
// =====================================================

function openAppDetail(app) {
  selectedApp.value = app

  showDetailDialog.value = true
}

// =====================================================
// Refresh Pipeline
// =====================================================

async function refreshPipeline() {
  await fetchApplications()

  if (!loading.value) {
    $q.notify({
      type: 'positive',

      message: 'Application pipeline refreshed successfully.',

      icon: 'sync'
    })
  }
}

// =====================================================
// Join Interview
// =====================================================

function joinInterview() {
  $q.notify({
    type: 'info',

    message: 'Launching virtual interview lobby...',

    icon: 'video_camera_front'
  })
}

// =====================================================
// Download Offer
// =====================================================

function downloadOffer() {
  $q.notify({
    type: 'positive',

    message: 'Offer letter download will be available here.',

    icon: 'description'
  })
}

// =====================================================
// Initial Load
// =====================================================

onMounted(() => {
  fetchApplications()
})
</script>

<style scoped lang="scss">
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.page-header {
  background: linear-gradient(135deg, #080d1a 0%, #0f172a 100%);
}

.border-bottom-navy {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.border-light {
  border: 1px solid #e2e8f0;
}

.stat-pill {
  background: rgba(255, 255, 255, 0.06);

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 10px;
}

.kanban-column {
  min-height: 480px;
}

.pulse-dot {
  width: 8px;

  height: 8px;

  background-color: #10b981;

  border-radius: 50%;

  animation: pulse 1.8s infinite;

  display: inline-block;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }

  70% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}
</style>
