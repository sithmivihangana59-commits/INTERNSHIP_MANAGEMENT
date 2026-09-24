<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- Header Banner -->
    <div class="page-header text-white q-py-lg border-bottom-navy">
      <div class="max-width-container q-px-md">
        <!-- Student Identity Strip -->
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-x-md">
            <q-avatar size="54px" color="primary" text-color="white" class="text-weight-bold shadow-2">
              SV
            </q-avatar>
            <div>
              <div class="row items-center q-gutter-x-sm">
                <h1 class="text-h5 font-display text-weight-bolder text-white q-my-none">
                  Sithmi Vihangana
                </h1>
                <q-badge color="positive" rounded class="text-weight-bold">
                  <q-icon name="verified" size="14px" class="q-mr-xs" /> VERIFIED STUDENT
                </q-badge>
              </div>
              <div class="text-caption text-grey-4 q-mt-xs">
                BSc (Hons) in Software Engineering • 3rd Year • University of Moratuwa
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

        <!-- Metric Counter Badges -->
        <div class="row q-col-gutter-sm q-mt-md">
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-white">5</div>
              <div class="text-caption text-grey-4" style="font-size: 11px;">Total Applied</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-primary">1</div>
              <div class="text-caption text-grey-4" style="font-size: 11px;">Under HR Review</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-purple-3">1</div>
              <div class="text-caption text-grey-4" style="font-size: 11px;">Interviews Scheduled</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-pill q-pa-sm text-center">
              <div class="text-h6 text-weight-bold text-positive">1</div>
              <div class="text-caption text-grey-4" style="font-size: 11px;">Offer Letters 🎉</div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Kanban Board -->
    <div class="max-width-container q-px-md q-pt-lg">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <span class="text-subtitle1 text-weight-bold text-navy">Application Pipeline</span>
          <span class="text-caption text-grey-6 q-ml-sm">Click any application card to view interview times and recruiter notes.</span>
        </div>
        <q-btn flat dense no-caps color="primary" icon="refresh" label="Refresh Status" @click="refreshPipeline" />
      </div>

      <!-- 4 Columns Grid -->
      <div class="row q-col-gutter-md">
        
        <!-- Col 1: Applied -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kanban-column bg-grey-2 q-pa-sm rounded-borders border-light">
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span class="text-caption text-weight-bold text-grey-8 uppercase tracking-wider">APPLIED</span>
              <q-badge color="grey-4" text-color="grey-9" class="text-bold">{{ appliedList.length }}</q-badge>
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
                  <q-badge color="orange-1" text-color="deep-orange" class="text-bold">{{ app.company }}</q-badge>
                  <span class="text-caption text-grey-5" style="font-size: 10px;">{{ app.appliedDate }}</span>
                </div>
                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">{{ app.role }}</div>
                <div class="text-caption text-positive text-weight-bold q-mt-xs">{{ app.stipend }}</div>
                <div class="text-caption text-grey-6 q-mt-xs" style="font-size: 11px;">{{ app.nextAction }}</div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Col 2: In Review -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kanban-column bg-blue-1 q-pa-sm rounded-borders border-light">
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span class="text-caption text-weight-bold text-primary uppercase tracking-wider">IN REVIEW</span>
              <q-badge color="blue-2" text-color="blue-9" class="text-bold">{{ inReviewList.length }}</q-badge>
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
                  <q-badge color="green-1" text-color="green-8" class="text-bold">{{ app.company }}</q-badge>
                  <span class="pulse-dot"></span>
                </div>
                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">{{ app.role }}</div>
                <div class="text-caption text-positive text-weight-bold q-mt-xs">{{ app.stipend }}</div>
                <div class="text-caption text-warning text-weight-bold q-mt-xs" style="font-size: 11px;">
                  {{ app.notes }}
                </div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Col 3: Interview -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kanban-column bg-purple-1 q-pa-sm rounded-borders border-light">
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span class="text-caption text-weight-bold text-purple-9 uppercase tracking-wider">INTERVIEW ROUNDS</span>
              <q-badge color="purple-2" text-color="purple-9" class="text-bold">{{ interviewList.length }}</q-badge>
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
                  <q-badge color="blue-1" text-color="blue-10" class="text-bold">{{ app.company }}</q-badge>
                  <q-icon name="video_camera_front" color="purple" size="16px" />
                </div>
                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">{{ app.role }}</div>
                <div class="text-caption text-positive text-weight-bold q-mt-xs">{{ app.stipend }}</div>
                <div class="q-mt-sm q-pa-xs bg-purple-1 rounded-borders text-purple-9 text-caption text-weight-bold" style="font-size: 11px;">
                  {{ app.nextAction }}
                </div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Col 4: Offer -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="kanban-column bg-green-1 q-pa-sm rounded-borders border-light">
            <div class="row items-center justify-between q-px-xs q-mb-sm">
              <span class="text-caption text-weight-bold text-positive uppercase tracking-wider">OFFER LETTER 🎉</span>
              <q-badge color="green-2" text-color="green-9" class="text-bold">{{ offeredList.length }}</q-badge>
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
                  <q-badge color="purple-1" text-color="purple" class="text-bold">{{ app.company }}</q-badge>
                  <q-icon name="check_circle" color="positive" size="18px" />
                </div>
                <div class="text-subtitle2 text-weight-bold text-navy q-mt-xs">{{ app.role }}</div>
                <div class="text-caption text-positive text-weight-bolder q-mt-xs">
                  {{ app.stipend }} • Accepted
                </div>
                <div class="text-caption text-grey-7 q-mt-xs" style="font-size: 11px;">{{ app.notes }}</div>
              </q-card>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Application Lifecycle Dialog -->
    <q-dialog v-model="showDetailDialog">
      <q-card style="min-width: 360px; max-width: 550px;" class="rounded-borders" v-if="selectedApp">
        <q-card-section class="row items-center q-pb-none">
          <div>
            <q-badge color="blue-1" text-color="primary" class="q-mb-xs text-weight-bold">{{ selectedApp.company }}</q-badge>
            <div class="text-h6 font-display text-weight-bold text-navy leading-tight">{{ selectedApp.role }}</div>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm text-center q-mb-md">
            <div class="col-6">
              <div class="q-pa-sm bg-grey-2 rounded-borders">
                <span class="text-caption text-grey-6" style="font-size: 11px;">CURRENT STAGE</span>
                <div class="text-caption text-weight-bold text-navy">{{ selectedApp.stageName }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="q-pa-sm bg-grey-2 rounded-borders">
                <span class="text-caption text-grey-6" style="font-size: 11px;">STIPEND GUARANTEE</span>
                <div class="text-caption text-weight-bold text-positive">{{ selectedApp.stipend }}</div>
              </div>
            </div>
          </div>

          <div class="text-subtitle2 text-weight-bold text-navy q-mb-xs">Recruitment Details & Logs</div>
          <p class="text-caption text-grey-7 leading-normal bg-grey-1 q-pa-sm rounded-borders border-light">
            {{ selectedApp.notes }}
          </p>

          <div class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs">Next Action Required</div>
          <div class="q-pa-sm bg-blue-1 text-primary rounded-borders text-caption text-weight-bold">
            <q-icon name="info" size="16px" class="q-mr-xs" />
            {{ selectedApp.nextAction }}
          </div>

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
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { MOCK_APPLICATIONS } from '@/data/jobsData'

const $q = useQuasar()
const applications = ref([...MOCK_APPLICATIONS])

const appliedList = computed(() => applications.value.filter(a => a.stage === 'applied'))
const inReviewList = computed(() => applications.value.filter(a => a.stage === 'in_review'))
const interviewList = computed(() => applications.value.filter(a => a.stage === 'interview'))
const offeredList = computed(() => applications.value.filter(a => a.stage === 'offered'))

const showDetailDialog = ref(false)
const selectedApp = ref(null)

function openAppDetail(app) {
  selectedApp.value = app
  showDetailDialog.value = true
}

function refreshPipeline() {
  $q.notify({
    type: 'positive',
    message: 'Pipeline synced with university career database.',
    icon: 'sync'
  })
}

function joinInterview() {
  $q.notify({
    type: 'info',
    message: 'Launching virtual interview lobby...',
    icon: 'video_camera_front'
  })
}

function downloadOffer() {
  $q.notify({
    type: 'positive',
    message: 'Downloading verified Offer Letter PDF...',
    icon: 'description'
  })
}
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
