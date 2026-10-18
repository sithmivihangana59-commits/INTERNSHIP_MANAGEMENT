<template>
  <q-page class="employers-page q-pb-xl">
    <!-- ================================================= -->
    <!-- HEADER -->
    <!-- ================================================= -->

    <div class="page-header q-py-lg">
      <div class="max-width-container q-px-md">
        <q-badge
          color="blue-1"
          text-color="primary"
          class="q-py-xs q-px-sm text-weight-bold q-mb-sm"
        >
          <q-icon name="business" size="14px" class="q-mr-xs" />
          EMPLOYER PORTAL
        </q-badge>

        <h1 class="text-h4 font-display text-weight-bold text-navy q-my-xs">
          Find the right intern for your team
        </h1>

        <p class="text-body1 text-grey-7 q-my-none" style="max-width: 680px">
          Share an internship opportunity and review applications in one place.
        </p>
      </div>
    </div>

    <!-- ================================================= -->
    <!-- MAIN CONTENT -->
    <!-- ================================================= -->

    <div class="max-width-container q-px-md q-pt-lg">
      <div class="row q-col-gutter-lg">
        <!-- ================================================= -->
        <!-- LEFT : POST INTERNSHIP -->
        <!-- ================================================= -->

        <div class="col-12 col-md-8">
          <q-card
            flat
            class="q-pa-lg bg-white border-light rounded-borders shadow-1"
          >
            <div
              class="row items-center q-gutter-x-sm q-pb-md border-bottom-light"
            >
              <q-avatar size="36px" color="blue-1" text-color="primary" rounded>
                <q-icon name="post_add" size="20px" />
              </q-avatar>

              <div>
                <div class="text-h6 font-display text-weight-bold text-navy">
                  Create an internship
                </div>

                <div class="text-caption text-grey-6">
                  Add a few details to publish your opening.
                </div>
              </div>
            </div>

            <q-form
              @submit.prevent="submitJobPost"
              class="q-gutter-y-md q-pt-md"
            >
              <div class="form-section-title">Company details</div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.company"
                    dense
                    outlined
                    label="Company Name"
                    placeholder="e.g. Sysco LABS"
                    required
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.email"
                    dense
                    outlined
                    type="email"
                    label="Official HR Email"
                    placeholder="hr@company.com"
                    required
                  />
                </div>
              </div>

              <div class="form-section-title">Role details</div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.title"
                    dense
                    outlined
                    label="Job Title"
                    placeholder="e.g. Associate Software Engineer Intern"
                    required
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="form.category"
                    dense
                    outlined
                    :options="categoryOptions"
                    emit-value
                    map-options
                    label="Specialization Track"
                    required
                  />
                </div>
              </div>

              <div class="form-section-title">Work arrangement</div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-4">
                  <q-select
                    v-model="form.mode"
                    dense
                    outlined
                    :options="['Hybrid', 'On-Site', '100% Remote']"
                    label="Work Mode"
                    required
                  />
                </div>

                <div class="col-12 col-sm-4">
                  <q-input
                    v-model="form.location"
                    dense
                    outlined
                    label="Location"
                    placeholder="Colombo 03"
                    required
                  />
                </div>

                <div class="col-12 col-sm-4">
                  <q-select
                    v-model="form.duration"
                    dense
                    outlined
                    :options="['6 Months', '1 Year Trainee', '3 Months Summer']"
                    label="Duration"
                    required
                  />
                </div>
              </div>

              <div class="form-section-title">Compensation and skills</div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.stipend"
                    dense
                    outlined
                    label="Monthly Stipend (LKR)"
                    placeholder="e.g. LKR 80,000 / mo"
                    required
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="form.skills"
                    dense
                    outlined
                    label="Required Tech Skills"
                    placeholder="Java, React, Docker"
                    required
                  />
                </div>
              </div>

              <div class="q-pt-xs">
                <div class="form-section-title q-mb-sm"> Role overview </div>

                <q-input
                  v-model="form.description"
                  dense
                  outlined
                  type="textarea"
                  label="Role Responsibilities & Overview"
                  rows="3"
                  placeholder="Outline key project expectations, tech stack, and learning opportunities..."
                  required
                />
              </div>

              <div class="q-pt-sm">
                <q-btn
                  unelevated
                  color="primary"
                  type="submit"
                  no-caps
                  label="Publish Internship Opening"
                  icon-right="rocket_launch"
                  class="full-width text-weight-bold q-py-sm rounded-borders shadow-1"
                  :loading="postingJob"
                />
              </div>
            </q-form>
          </q-card>
        </div>

        <!-- ================================================= -->
        <!-- RIGHT : BENEFITS -->
        <!-- ================================================= -->

        <div class="col-12 col-md-4">
          <div class="q-gutter-y-md">
            <q-card flat class="q-pa-lg bg-white border-light rounded-borders">
              <div
                class="text-subtitle1 font-display text-weight-bold text-navy q-mb-sm"
              >
                Why Partner With InternSphere?
              </div>

              <div class="q-gutter-y-sm text-caption text-grey-7">
                <div class="row items-start">
                  <q-icon
                    name="verified_user"
                    color="positive"
                    size="20px"
                    class="q-mr-sm q-mt-xs"
                  />

                  <div>
                    <span class="text-weight-bold text-navy">
                      100% Verified University Students
                    </span>

                    <p class="q-my-none">
                      Access undergraduates from Moratuwa, UCSC, SLIIT, IIT, and
                      Peradeniya with verified credentials.
                    </p>
                  </div>
                </div>

                <div class="row items-start">
                  <q-icon
                    name="filter_alt"
                    color="primary"
                    size="20px"
                    class="q-mr-sm q-mt-xs"
                  />

                  <div>
                    <span class="text-weight-bold text-navy">
                      Automated Technical Screening
                    </span>

                    <p class="q-my-none">
                      Filter by semester GPA, GitHub contributions, and verified
                      framework proficiencies.
                    </p>
                  </div>
                </div>

                <div class="row items-start">
                  <q-icon
                    name="timer"
                    color="warning"
                    size="20px"
                    class="q-mr-sm q-mt-xs"
                  />

                  <div>
                    <span class="text-weight-bold text-navy">
                      48-Hour Placement Turnaround
                    </span>

                    <p class="q-my-none">
                      Direct message candidates and schedule technical interview
                      rounds without messy email chains.
                    </p>
                  </div>
                </div>
              </div>
            </q-card>

            <q-card flat class="q-pa-lg bg-navy text-white rounded-borders">
              <div class="text-subtitle1 font-display text-weight-bold q-mb-xs">
                Official Campus Partners
              </div>

              <p class="text-caption text-grey-4">
                Over 18,500 students enrolled across leading engineering &
                computing faculties.
              </p>

              <div class="row q-gutter-xs q-mt-sm">
                <q-badge color="blue-9" class="q-py-xs">
                  Uni of Moratuwa
                </q-badge>

                <q-badge color="blue-9" class="q-py-xs"> UCSC Colombo </q-badge>

                <q-badge color="blue-9" class="q-py-xs"> SLIIT </q-badge>

                <q-badge color="blue-9" class="q-py-xs">
                  IIT Sri Lanka
                </q-badge>

                <q-badge color="blue-9" class="q-py-xs">
                  Uni of Peradeniya
                </q-badge>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <!-- ================================================= -->
      <!-- EMPLOYER APPLICATION MANAGEMENT -->
      <!-- ================================================= -->

      <div id="applications" class="q-mt-lg">
        <q-card flat class="bg-white border-light rounded-borders shadow-1">
          <!-- Section Header -->

          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6 font-display text-weight-bold text-navy">
                  <q-icon name="groups" color="primary" class="q-mr-sm" />

                  My Internship Applications
                </div>

                <div class="text-caption text-grey-6 q-mt-xs">
                  Review candidates and update application statuses.
                </div>
              </div>

              <q-btn
                flat
                dense
                no-caps
                color="primary"
                icon="refresh"
                label="Refresh"
                :loading="loadingApplications"
                @click="loadEmployerApplications"
              />
            </div>
          </q-card-section>

          <q-separator />

          <!-- Loading -->

          <q-card-section
            v-if="loadingApplications"
            class="text-center q-py-xl"
          >
            <q-spinner color="primary" size="40px" />

            <div class="text-caption text-grey-6 q-mt-sm">
              Loading applications...
            </div>
          </q-card-section>

          <!-- No applications -->

          <q-card-section
            v-else-if="employerApplications.length === 0"
            class="text-center q-py-xl"
          >
            <q-icon name="inbox" size="55px" color="grey-5" />

            <div class="text-subtitle1 text-weight-bold text-grey-7 q-mt-sm">
              No applications yet
            </div>

            <div class="text-caption text-grey-5">
              Applications from students will appear here.
            </div>
          </q-card-section>

          <!-- Applications -->

          <q-card-section v-else class="q-pa-md">
            <div class="q-gutter-y-md">
              <q-card
                v-for="application in employerApplications"
                :key="application._id"
                flat
                class="application-card border-light rounded-borders"
              >
                <q-card-section>
                  <div class="row items-start justify-between">
                    <!-- Applicant -->

                    <div class="row items-center">
                      <q-avatar
                        size="48px"
                        color="blue-1"
                        text-color="primary"
                        class="text-weight-bold"
                      >
                        {{ getApplicantInitials(application.applicant) }}
                      </q-avatar>

                      <div class="q-ml-md">
                        <div class="text-subtitle1 text-weight-bold text-navy">
                          {{ getApplicantName(application.applicant) }}
                        </div>

                        <div class="text-caption text-grey-6">
                          {{
                            application.applicant?.email ||
                            'Email not available'
                          }}
                        </div>

                        <div
                          v-if="application.applicant?.university"
                          class="text-caption text-grey-6"
                        >
                          <q-icon name="school" size="14px" />

                          {{ application.applicant.university }}
                        </div>
                      </div>
                    </div>

                    <!-- Current Status -->

                    <q-badge
                      :color="getStatusColor(application.status)"
                      class="q-py-xs q-px-sm text-weight-bold"
                    >
                      {{ formatStatus(application.status) }}
                    </q-badge>
                  </div>

                  <!-- Internship -->

                  <div class="q-mt-md q-pa-sm bg-grey-1 rounded-borders">
                    <div class="text-subtitle2 text-weight-bold text-navy">
                      {{ application.internship?.title || 'Internship' }}
                    </div>

                    <div class="text-caption text-grey-6">
                      <q-icon name="business" size="14px" />

                      {{ application.internship?.company?.name || 'Company' }}

                      <span class="q-mx-xs">•</span>

                      Applied:
                      {{
                        formatDate(
                          application.appliedAt || application.createdAt
                        )
                      }}
                    </div>
                  </div>

                  <!-- Candidate details -->

                  <div class="row q-col-gutter-sm q-mt-sm">
                    <div
                      v-if="application.applicant?.skills?.length"
                      class="col-12 col-md-8"
                    >
                      <div
                        class="text-caption text-weight-bold text-grey-7 q-mb-xs"
                      >
                        Skills
                      </div>

                      <div class="row q-gutter-xs">
                        <q-badge
                          v-for="skill in application.applicant.skills"
                          :key="skill"
                          color="blue-1"
                          text-color="primary"
                        >
                          {{ skill }}
                        </q-badge>
                      </div>
                    </div>

                    <div class="col-12 col-md-4">
                      <div
                        class="text-caption text-weight-bold text-grey-7 q-mb-xs"
                      >
                        Application Status
                      </div>

                      <q-btn
                        v-if="
                          isEmployerReviewer &&
                          availableStatusOptions(application).length
                        "
                        dense
                        no-caps
                        outline
                        color="primary"
                        label="Review"
                        :loading="updatingApplicationId === application._id"
                        @click="updateApplicationStatus(application)"
                      />
                      <q-badge
                        v-else
                        :color="getStatusColor(application.status)"
                        :label="formatStatus(application.status)"
                      />
                    </div>
                  </div>

                  <q-expansion-item
                    dense
                    icon="person_search"
                    label="Applicant profile"
                    header-class="text-caption text-primary"
                    class="q-mt-sm"
                  >
                    <div class="q-pa-sm text-caption text-grey-7">
                      <div v-if="application.applicant?.bio">
                        {{ application.applicant.bio }}
                      </div>
                      <div
                        v-if="application.applicant?.linkedinUrl"
                        class="q-mt-xs"
                      >
                        <a
                          :href="application.applicant.linkedinUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn profile
                        </a>
                      </div>
                      <div
                        v-if="application.applicant?.githubUrl"
                        class="q-mt-xs"
                      >
                        <a
                          :href="application.applicant.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub profile
                        </a>
                      </div>
                      <div
                        v-if="
                          !application.applicant?.bio &&
                          !application.applicant?.linkedinUrl &&
                          !application.applicant?.githubUrl
                        "
                      >
                        No additional profile details provided.
                      </div>
                    </div>
                  </q-expansion-item>

                  <!-- Cover Letter -->

                  <div v-if="application.coverLetter" class="q-mt-md">
                    <div
                      class="text-caption text-weight-bold text-grey-7 q-mb-xs"
                    >
                      Application Message
                    </div>

                    <div
                      v-if="
                        application.status === 'interview' &&
                        application.interview?.scheduledAt
                      "
                      class="q-mt-md q-pa-sm bg-purple-1 rounded-borders"
                    >
                      <div class="text-caption text-weight-bold text-purple-9">
                        Interview scheduled
                      </div>
                      <div class="text-caption">
                        {{
                          formatInterviewDate(application.interview.scheduledAt)
                        }}
                        <span v-if="application.interview.location">
                          · {{ application.interview.location }}
                        </span>
                      </div>
                      <a
                        v-if="application.interview.meetingUrl"
                        :href="application.interview.meetingUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-caption"
                      >
                        Join interview
                      </a>
                      <div
                        v-if="application.interview.notes"
                        class="text-caption"
                      >
                        {{ application.interview.notes }}
                      </div>
                    </div>

                    <div
                      class="text-caption text-grey-7 bg-grey-1 q-pa-sm rounded-borders"
                    >
                      {{ application.coverLetter }}
                    </div>
                  </div>

                  <!-- Actions -->

                  <div class="row items-center justify-between q-mt-md">
                    <div class="row q-gutter-sm">
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="primary"
                        icon="person"
                        label="View Profile"
                        @click="viewApplicantProfile(application)"
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
                          hasApplicantCv(application)
                            ? 'View CV / Resume'
                            : 'CV not available'
                        "
                        :disable="
                          !hasApplicantCv(application)
                        "
                        @click="openResume(application)"
                      />
                      <q-btn
                        v-for="option in availableStatusOptions(application)"
                        :key="option.value"
                        dense
                        no-caps
                        :outline="option.value !== 'rejected'"
                        :color="
                          option.value === 'rejected'
                            ? 'negative'
                            : 'primary'
                        "
                        :icon="
                          option.value === 'interview'
                            ? 'event'
                            : option.value === 'accepted'
                              ? 'check_circle'
                              : option.value === 'rejected'
                                ? 'close'
                                : option.value === 'shortlisted'
                                  ? 'star'
                                  : 'rate_review'
                        "
                        :label="option.label"
                        :loading="updatingApplicationId === application._id"
                        @click="
                          updateApplicationStatus(application, option.value)
                        "
                      />
                    </div>

                    <div class="text-caption text-grey-5">
                      {{ getStatusNote(application) }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ================================================= -->
    <!-- STATUS UPDATE DIALOG -->
    <!-- ================================================= -->

    <q-dialog v-model="showApplicantProfile">
      <q-card style="width: 560px; max-width: 95vw">
        <q-card-section>
          <div class="row items-center">
            <q-avatar color="blue-1" text-color="primary" class="q-mr-md">
              {{
                selectedApplication
                  ? getApplicantInitials(selectedApplication.applicant)
                  : ''
              }}
            </q-avatar>
            <div>
              <div class="text-h6 text-weight-bold text-navy">
                {{
                  selectedApplication
                    ? getApplicantName(selectedApplication.applicant)
                    : 'Applicant profile'
                }}
              </div>
              <div class="text-caption text-grey-6">
                {{ selectedApplication?.applicant?.email || 'Email not available' }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section v-if="selectedApplication?.applicant" class="q-gutter-y-sm">
          <div v-if="selectedApplication.applicant.phone">
            <strong>Phone:</strong> {{ selectedApplication.applicant.phone }}
          </div>
          <div v-if="selectedApplication.applicant.university">
            <strong>University:</strong>
            {{ selectedApplication.applicant.university }}
          </div>
          <div v-if="selectedApplication.applicant.bio">
            <strong>About:</strong> {{ selectedApplication.applicant.bio }}
          </div>
          <div v-if="selectedApplication.applicant.skills?.length">
            <strong>Skills:</strong>
            <div class="row q-gutter-xs q-mt-xs">
              <q-badge
                v-for="skill in selectedApplication.applicant.skills"
                :key="skill"
                color="blue-1"
                text-color="primary"
              >
                {{ skill }}
              </q-badge>
            </div>
          </div>
          <a
            v-if="selectedApplication.applicant.linkedinUrl"
            :href="selectedApplication.applicant.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
          </a>
          <a
            v-if="selectedApplication.applicant.githubUrl"
            :href="selectedApplication.applicant.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
          </a>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showStatusDialog">
      <q-card style="width: 450px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6 text-weight-bold text-navy">
            Update Application Status
          </div>

          <div class="text-caption text-grey-6 q-mt-xs">
            {{
              selectedApplication
                ? getApplicantName(selectedApplication.applicant)
                : ''
            }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="statusForm.status"
            outlined
            emit-value
            map-options
            label="Application Status"
            :options="availableStatusOptions(selectedApplication)"
          />

          <template v-if="statusForm.status === 'interview'">
            <q-input
              v-model="statusForm.interviewScheduledAt"
              outlined
              type="datetime-local"
              label="Interview date and time"
              class="q-mt-md"
            />
            <q-input
              v-model="statusForm.interviewLocation"
              outlined
              label="Location (optional)"
              class="q-mt-sm"
            />
            <q-input
              v-model="statusForm.interviewMeetingUrl"
              outlined
              type="url"
              label="Meeting link (optional)"
              class="q-mt-sm"
            />
            <q-input
              v-model="statusForm.interviewNotes"
              outlined
              type="textarea"
              rows="2"
              label="Interview instructions (optional)"
              class="q-mt-sm"
            />
          </template>

          <q-input
            v-model="statusForm.note"
            outlined
            type="textarea"
            rows="3"
            label="Note for student"
            placeholder="e.g. You have been shortlisted for the technical interview."
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat no-caps label="Cancel" v-close-popup />

          <q-btn
            unelevated
            color="primary"
            no-caps
            label="Update Status"
            :loading="updatingApplication"
            @click="confirmStatusUpdate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { getAuthToken as readAuthToken, getAuthUser } from '../utils/auth.js'
import {
  hasApplicantCv,
  openApplicantCv
} from '../utils/openApplicantCv.js'

import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import { useQuasar } from 'quasar'

import { INITIAL_JOBS } from '@/data/jobsData'

// =====================================================
// QUASAR / ROUTER
// =====================================================

const $q = useQuasar()

const router = useRouter()

// =====================================================
// API
// =====================================================

const API_BASE_URL = 'http://localhost:5000/api'
const isEmployerReviewer = getAuthUser()?.role === 'employer'

// =====================================================
// CATEGORY OPTIONS
// =====================================================

const categoryOptions = [
  {
    label: 'Software & Cloud Engineering',
    value: 'software'
  },

  {
    label: 'AI & Data Science',
    value: 'data'
  },

  {
    label: 'UI/UX Product Design',
    value: 'design'
  },

  {
    label: 'Business & Finance',
    value: 'business'
  }
]

// =====================================================
// POST JOB FORM
// =====================================================

const form = ref({
  company: '',

  email: '',

  title: '',

  category: 'software',

  mode: 'Hybrid',

  location: 'Colombo, Sri Lanka',

  duration: '6 Months',

  stipend: 'LKR 80,000 / mo',

  skills: 'React, Node.js, SQL',

  description: ''
})

const postingJob = ref(false)

// =====================================================
// APPLICATION MANAGEMENT
// =====================================================

const employerApplications = ref([])

const loadingApplications = ref(false)

const updatingApplicationId = ref(null)

const updatingApplication = ref(false)

const showStatusDialog = ref(false)

const showApplicantProfile = ref(false)

const selectedApplication = ref(null)

const statusForm = ref({
  status: 'pending',

  note: '',
  interviewScheduledAt: '',
  interviewLocation: '',
  interviewMeetingUrl: '',
  interviewNotes: ''
})

// =====================================================
// STATUS OPTIONS
// =====================================================

const statusOptions = [
  {
    label: 'Pending',
    value: 'pending'
  },

  {
    label: 'Under Review',
    value: 'reviewed'
  },

  {
    label: 'Shortlisted',
    value: 'shortlisted'
  },

  {
    label: 'Schedule Interview',
    value: 'interview'
  },

  {
    label: 'Accepted',
    value: 'accepted'
  },

  {
    label: 'Rejected',
    value: 'rejected'
  }
]

// =====================================================
// AUTH TOKEN
// =====================================================

function getAuthToken() {
  return readAuthToken()
}

// =====================================================
// GET CURRENT USER
// =====================================================

// =====================================================
// POST INTERNSHIP
// =====================================================

function submitJobPost() {
  const newJob = {
    id: `custom-${Date.now()}`,

    company: form.value.company,

    logoText: form.value.company.charAt(0).toUpperCase(),

    logoBg: 'primary',

    title: form.value.title,

    location: `${form.value.location} • ${form.value.mode}`,

    category: form.value.category,

    stipend: form.value.stipend,

    stipendVal: 80000,

    duration: form.value.duration,

    mode: form.value.mode,

    deadline: 'Closes in 14 days',

    isBookmarked: false,

    skills: form.value.skills.split(',').map(s => s.trim()),

    description: form.value.description,

    requirements: [
      'Undergraduate in relevant field.',

      'Solid knowledge in listed skills.',

      'Strong communication and problem solving.'
    ]
  }

  INITIAL_JOBS.unshift(newJob)

  $q.notify({
    type: 'positive',

    message: `🎉 Internship for "${form.value.title}" published successfully!`,

    icon: 'check_circle',

    timeout: 3500
  })

  setTimeout(() => {
    router.push('/internships')
  }, 1200)
}

// =====================================================
// LOAD EMPLOYER APPLICATIONS
// =====================================================

async function loadEmployerApplications() {
  loadingApplications.value = true
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Please sign in to view applications.')
    }

    const response = await fetch(`${API_BASE_URL}/applications/received`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to load applications.')
    }
    employerApplications.value = result.data
  } catch (error) {
    employerApplications.value = []
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to load applications.',
      timeout: 5000
    })
  } finally {
    loadingApplications.value = false
  }
}

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

function viewApplicantProfile(application) {
  selectedApplication.value = application
  showApplicantProfile.value = true
}

function updateApplicationStatus(
  application,
  status =
    availableStatusOptions(application)[0]?.value || application.status
) {
  selectedApplication.value = application
  statusForm.value = {
    status,
    note: '',
    interviewScheduledAt: application.interview?.scheduledAt
      ? new Date(
          new Date(application.interview.scheduledAt).getTime() -
            new Date(application.interview.scheduledAt).getTimezoneOffset() *
              60000
        )
          .toISOString()
          .slice(0, 16)
      : '',
    interviewLocation: application.interview?.location || '',
    interviewMeetingUrl: application.interview?.meetingUrl || '',
    interviewNotes: application.interview?.notes || ''
  }
  showStatusDialog.value = true
}

// =====================================================
// CONFIRM STATUS UPDATE
// =====================================================

async function confirmStatusUpdate() {
  if (!selectedApplication.value) {
    return
  }

  const token = getAuthToken()

  if (!token) {
    $q.notify({
      type: 'negative',

      message: 'Please login again.',

      icon: 'login'
    })

    return
  }

  updatingApplication.value = true

  updatingApplicationId.value = selectedApplication.value._id

  try {
    if (
      statusForm.value.status === 'interview' &&
      !statusForm.value.interviewScheduledAt
    ) {
      throw new Error('Choose an interview date and time.')
    }

    const response = await fetch(
      `${API_BASE_URL}/applications/${selectedApplication.value._id}/status`,

      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          status: statusForm.value.status,

          note:
            statusForm.value.note.trim() ||
            `Application status updated to ${statusForm.value.status}.`,

          interview: {
            scheduledAt: statusForm.value.interviewScheduledAt,
            location: statusForm.value.interviewLocation,
            meetingUrl: statusForm.value.interviewMeetingUrl,
            notes: statusForm.value.interviewNotes
          }
        })
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update application status.')
    }

    // Update local application
    selectedApplication.value.status = statusForm.value.status

    // Close dialog
    showStatusDialog.value = false

    // Reload applications
    await loadEmployerApplications()

    $q.notify({
      type: 'positive',

      message: 'Application status updated successfully!',

      caption: `Student status changed to ${formatStatus(statusForm.value.status)}.`,

      icon: 'check_circle',

      timeout: 4000
    })

    console.log('Application status updated:', result.data)
  } catch (error) {
    console.error('Status update error:', error)

    $q.notify({
      type: 'negative',

      message: error.message || 'Unable to update application status.',

      icon: 'error',

      timeout: 5000
    })
  } finally {
    updatingApplication.value = false

    updatingApplicationId.value = null
  }
}

// =====================================================
// STATUS LABEL
// =====================================================

function formatStatus(status) {
  const labels = {
    pending: 'Pending',

    reviewed: 'Under Review',

    shortlisted: 'Shortlisted',

    interview: 'Interview',

    accepted: 'Accepted',

    rejected: 'Rejected'
  }

  return labels[status] || 'Unknown'
}

function formatInterviewDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
}

function availableStatusOptions(application) {
  const nextStatuses = {
    pending: ['reviewed', 'shortlisted', 'rejected'],
    reviewed: ['shortlisted', 'rejected'],
    shortlisted: ['interview', 'accepted', 'rejected'],
    interview: ['interview', 'accepted', 'rejected'],
    accepted: [],
    rejected: []
  }
  const available = nextStatuses[application?.status] || []
  return statusOptions.filter(option => available.includes(option.value))
}

// =====================================================
// STATUS COLOR
// =====================================================

function getStatusColor(status) {
  const colors = {
    pending: 'orange',

    reviewed: 'blue',

    shortlisted: 'purple',

    interview: 'deep-purple',

    accepted: 'positive',

    rejected: 'negative'
  }

  return colors[status] || 'grey'
}

// =====================================================
// APPLICANT NAME
// =====================================================

function getApplicantName(applicant) {
  if (!applicant) {
    return 'Unknown Applicant'
  }

  const fullName =
    `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim()

  return fullName || applicant.name || 'Student Applicant'
}

// =====================================================
// APPLICANT INITIALS
// =====================================================

function getApplicantInitials(applicant) {
  const name = getApplicantName(applicant)

  const parts = name.split(' ').filter(Boolean)

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()
}

// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {
  if (!date) {
    return 'Date unavailable'
  }

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return 'Date unavailable'
  }

  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',

    month: 'short',

    year: 'numeric'
  })
}

// =====================================================
// STATUS NOTE
// =====================================================

function getStatusNote(application) {
  if (
    Array.isArray(application.statusHistory) &&
    application.statusHistory.length
  ) {
    const latest =
      application.statusHistory[application.statusHistory.length - 1]

    if (latest && latest.note) {
      return latest.note
    }
  }

  return 'No additional notes.'
}

// =====================================================
// OPEN RESUME
// =====================================================

async function openResume(application) {
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

// =====================================================
// ON MOUNT
// =====================================================

onMounted(() => {
  loadEmployerApplications()
})
</script>

<style scoped lang="scss">
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.employers-page {
  background: #f8fafc;
}

.page-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.border-light {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.border-bottom-light {
  border-bottom: 1px solid #e2e8f0;
}

.form-section-title {
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.4;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #f1f5f9;
}

.application-card {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.application-card:hover {
  border-color: #bfdbfe;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
}

@media (max-width: 599px) {
  .page-header {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
    line-height: 1.2;
  }
}
</style>
