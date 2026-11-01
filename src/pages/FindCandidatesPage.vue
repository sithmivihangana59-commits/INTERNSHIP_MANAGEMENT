<template>
  <q-page class="candidates-page q-pb-xl">
    <div class="page-heading">
      <div>
        <div class="page-eyebrow">EMPLOYER WORKSPACE</div>
        <h1>Find candidates</h1>
        <p>Discover students who may be a match for your vacancies.</p>
      </div>
    </div>

    <q-card flat bordered class="content-card q-mb-md">
      <q-card-section>
        <q-input
          v-model="filters.search"
          outlined
          clearable
          label="Search candidates by name"
          placeholder="Name or skill"
          @keyup.enter="loadCandidates"
        >
          <template #prepend><q-icon name="search" /></template>
        </q-input>

        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-12 col-sm-6 col-lg">
            <q-input
              v-model="filters.skills"
              outlined
              dense
              clearable
              label="Skills"
              placeholder="e.g. SQL"
              @keyup.enter="loadCandidates"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <q-input
              v-model="filters.education"
              outlined
              dense
              clearable
              label="Education / qualification"
              @keyup.enter="loadCandidates"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <q-input
              v-model="filters.experience"
              outlined
              dense
              clearable
              label="Experience"
              @keyup.enter="loadCandidates"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <q-input
              v-model="filters.category"
              outlined
              dense
              clearable
              label="Preferred category"
              @keyup.enter="loadCandidates"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <q-input
              v-model="filters.location"
              outlined
              dense
              clearable
              label="Location"
              @keyup.enter="loadCandidates"
            />
          </div>
        </div>

        <div class="row justify-end q-gutter-sm q-mt-md">
          <q-btn
            flat
            no-caps
            color="grey-7"
            label="Clear filters"
            @click="clearFilters"
          />
          <q-btn
            unelevated
            no-caps
            color="primary"
            icon="filter_list"
            label="Search candidates"
            :loading="loading"
            @click="loadCandidates"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-banner
      v-if="error"
      class="bg-red-1 text-negative rounded-borders q-mb-md"
    >
      {{ error }}
      <template #action>
        <q-btn flat label="Retry" @click="loadCandidates" />
      </template>
    </q-banner>

    <div v-if="loading && !candidates.length" class="loading-state">
      <q-spinner-dots color="primary" size="42px" />
      <div>Loading candidates…</div>
    </div>

    <div v-else-if="!loading && !error && !candidates.length" class="empty-state">
      No candidates found
    </div>

    <template v-else-if="candidates.length">
      <div class="row items-center justify-between q-mb-sm">
        <div class="section-subtitle">
          {{ candidates.length }} candidate{{ candidates.length === 1 ? '' : 's' }}
          found
        </div>
        <q-spinner v-if="loading" color="primary" size="20px" />
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="candidate in candidates"
          :key="candidate._id"
          class="col-12 col-md-6 col-xl-4"
        >
          <q-card flat bordered class="content-card candidate-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <q-avatar size="48px" color="blue-1" text-color="primary">
                  {{ initials(candidate) }}
                </q-avatar>
                <div class="q-ml-md overflow-hidden">
                  <div class="text-subtitle1 text-weight-bold text-navy ellipsis">
                    {{ fullName(candidate) }}
                  </div>
                  <div class="text-caption text-grey-6 ellipsis">
                    {{ candidate.email }}
                  </div>
                </div>
              </div>

              <div v-if="candidate.education || candidate.university" class="q-mt-md">
                <div class="text-caption text-weight-bold text-grey-7">Education</div>
                <div class="text-body2">
                  {{ candidate.education || 'Education not provided' }}
                  <span v-if="candidate.university"> · {{ candidate.university }}</span>
                </div>
              </div>

              <div v-if="candidate.experience" class="q-mt-sm">
                <div class="text-caption text-weight-bold text-grey-7">Experience</div>
                <div class="text-body2 candidate-summary">{{ candidate.experience }}</div>
              </div>

              <div v-if="candidate.skills?.length" class="q-mt-sm">
                <div class="text-caption text-weight-bold text-grey-7 q-mb-xs">
                  Skills
                </div>
                <div class="row q-gutter-xs">
                  <q-badge
                    v-for="skill in candidate.skills"
                    :key="skill"
                    color="blue-1"
                    text-color="primary"
                  >
                    {{ skill }}
                  </q-badge>
                </div>
              </div>

              <div v-if="candidate.location" class="text-caption text-grey-7 q-mt-sm">
                <q-icon name="place" /> {{ candidate.location }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions class="q-pa-md">
              <q-btn
                flat
                dense
                no-caps
                color="primary"
                icon="person"
                label="View Profile"
                @click="openProfile(candidate)"
              />
              <q-space />
              <q-btn
                v-if="candidate.hasCv"
                flat
                dense
                no-caps
                color="primary"
                icon="description"
                label="View CV"
                @click="viewCv(candidate)"
              />
              <q-badge v-else color="grey-2" text-color="grey-7">
                CV not available
              </q-badge>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </template>

    <q-dialog v-model="showProfile">
      <q-card v-if="selectedCandidate" class="profile-dialog">
        <q-card-section class="row items-center no-wrap">
          <q-avatar size="52px" color="blue-1" text-color="primary">
            {{ initials(selectedCandidate) }}
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold text-navy">
              {{ fullName(selectedCandidate) }}
            </div>
            <div class="text-caption text-grey-6">{{ selectedCandidate.email }}</div>
          </div>
          <q-space />
          <q-btn v-close-popup flat round dense icon="close" aria-label="Close profile" />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-y-md">
          <div v-if="selectedCandidate.education || selectedCandidate.university">
            <div class="text-caption text-weight-bold text-grey-7">Education</div>
            <div>{{ selectedCandidate.education || 'Education not provided' }}</div>
            <div v-if="selectedCandidate.university">{{ selectedCandidate.university }}</div>
          </div>
          <div v-if="selectedCandidate.experience">
            <div class="text-caption text-weight-bold text-grey-7">Experience</div>
            <div>{{ selectedCandidate.experience }}</div>
          </div>
          <div v-if="selectedCandidate.skills?.length">
            <div class="text-caption text-weight-bold text-grey-7 q-mb-xs">Skills</div>
            <div class="row q-gutter-xs">
              <q-chip
                v-for="skill in selectedCandidate.skills"
                :key="skill"
                color="blue-1"
                text-color="primary"
              >
                {{ skill }}
              </q-chip>
            </div>
          </div>
          <div v-if="selectedCandidate.preferredCategories?.length">
            <div class="text-caption text-weight-bold text-grey-7">Preferred categories</div>
            <div>{{ selectedCandidate.preferredCategories.join(', ') }}</div>
          </div>
          <div v-if="selectedCandidate.location">
            <div class="text-caption text-weight-bold text-grey-7">Location</div>
            <div>{{ selectedCandidate.location }}</div>
          </div>
          <div v-if="selectedCandidate.bio">
            <div class="text-caption text-weight-bold text-grey-7">About</div>
            <div>{{ selectedCandidate.bio }}</div>
          </div>
          <a
            v-if="selectedCandidate.linkedinUrl"
            :href="selectedCandidate.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
          </a>
          <a
            v-if="selectedCandidate.githubUrl"
            :href="selectedCandidate.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
          </a>
          <div
            v-if="
              !selectedCandidate.education &&
              !selectedCandidate.university &&
              !selectedCandidate.experience &&
              !selectedCandidate.skills?.length &&
              !selectedCandidate.preferredCategories?.length &&
              !selectedCandidate.location &&
              !selectedCandidate.bio &&
              !selectedCandidate.linkedinUrl &&
              !selectedCandidate.githubUrl
            "
            class="text-grey-6"
          >
            No additional profile information provided.
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn v-close-popup flat no-caps label="Close" />
          <q-btn
            v-if="selectedCandidate.hasCv"
            unelevated
            no-caps
            color="primary"
            icon="description"
            label="View CV"
            @click="viewCv(selectedCandidate)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { getAuthToken } from '../utils/auth.js'
import { openCandidateCv } from '../utils/openApplicantCv.js'

const API_URL = 'http://localhost:5000/api/users/candidates'
const $q = useQuasar()
const candidates = ref([])
const loading = ref(false)
const error = ref('')
const selectedCandidate = ref(null)
const showProfile = ref(false)
const filters = reactive({
  search: '',
  skills: '',
  education: '',
  experience: '',
  category: '',
  location: ''
})

function fullName(candidate) {
  return [candidate.firstName, candidate.lastName].filter(Boolean).join(' ')
}

function initials(candidate) {
  return [candidate.firstName, candidate.lastName]
    .filter(Boolean)
    .map(name => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

async function loadCandidates() {
  loading.value = true
  error.value = ''
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Your session has expired. Please sign in again.')
    }

    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      if (value.trim()) params.set(key, value.trim())
    }
    const response = await fetch(`${API_URL}?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || result.error || 'Unable to load candidates.')
    }
    candidates.value = result.data
  } catch (requestError) {
    error.value = requestError.message || 'Unable to load candidates.'
    candidates.value = []
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  Object.keys(filters).forEach(key => {
    filters[key] = ''
  })
  loadCandidates()
}

function openProfile(candidate) {
  selectedCandidate.value = candidate
  showProfile.value = true
}

async function viewCv(candidate) {
  try {
    const token = getAuthToken()
    if (!token) throw new Error('Your session has expired. Please sign in again.')
    await openCandidateCv(candidate._id, token)
  } catch (requestError) {
    $q.notify({
      type: 'negative',
      message: requestError.message || 'Unable to load the candidate CV.',
      position: 'top'
    })
  }
}

onMounted(loadCandidates)
</script>

<style scoped>
.candidates-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 34px clamp(16px, 3vw, 40px) 48px;
}

.page-heading {
  margin-bottom: 23px;
}

.page-heading h1 {
  margin: 4px 0 5px;
  color: #14243a;
  font-size: 27px;
  font-weight: 800;
}

.page-heading p {
  margin: 0;
  color: #718096;
}

.page-eyebrow {
  color: #1766bd;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.candidate-card {
  height: 100%;
}

.candidate-summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.profile-dialog {
  width: 560px;
  max-width: 95vw;
}
</style>
