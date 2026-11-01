<template>
  <q-page class="bg-grey-1 q-pb-2xl">

    <!-- ================= HEADER ================= -->

    <div class="page-header text-white q-py-xl border-bottom-navy">
      <div class="max-width-container q-px-md text-center">

        <q-badge
          color="positive"
          text-color="white"
          class="q-py-xs q-px-sm text-weight-bold q-mb-sm"
        >
          <q-icon name="work" size="14px" class="q-mr-xs" />
          1,450+ VERIFIED OPPORTUNITIES
        </q-badge>

        <h1
          class="text-h3 font-display text-weight-bolder text-white q-my-none tracking-tight"
        >
          Find Your Ideal Internship
        </h1>

        <p
          class="text-body1 text-grey-4 q-mt-sm q-mx-auto"
          style="max-width: 650px;"
        >
          Filter through verified corporate placements, compare monthly
          stipends, and apply directly with 1-click.
        </p>

        <!-- Search -->
        <q-card
          class="q-pa-sm q-mt-lg rounded-borders shadow-2 q-mx-auto bg-white"
          style="max-width: 880px;"
        >
          <div class="row q-col-gutter-sm items-center">

            <div class="col-12 col-sm-6">
              <q-input
                v-model="searchKeyword"
                dense
                outlined
                placeholder="Search job title, tech stack, or company..."
                class="bg-grey-1"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" color="grey-6" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-4">
              <q-select
                v-model="selectedCategory"
                dense
                outlined
                :options="categoryOptions"
                emit-value
                map-options
                class="bg-grey-1"
              >
                <template v-slot:prepend>
                  <q-icon name="category" color="grey-6" />
                </template>
              </q-select>
            </div>

            <div class="col-12 col-sm-2">
              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Filter"
                icon="filter_alt"
                class="full-width text-weight-bold q-py-sm rounded-borders"
              />
            </div>

          </div>
        </q-card>

      </div>
    </div>


    <!-- ================= MAIN CONTENT ================= -->

    <div class="max-width-container q-px-md q-pt-xl">

      <div class="row q-col-gutter-lg">

        <!-- ================= SIDEBAR ================= -->

        <div class="col-12 col-md-3">

          <q-card
            flat
            class="filter-sidebar q-pa-md bg-white border-light rounded-borders sticky-sidebar"
          >

            <div
              class="row items-center justify-between q-pb-sm border-bottom-light"
            >
              <span
                class="text-subtitle2 text-weight-bold text-navy flex items-center"
              >
                <q-icon
                  name="tune"
                  size="18px"
                  class="q-mr-xs text-primary"
                />
                Filter Results
              </span>

              <q-btn
                flat
                dense
                no-caps
                color="primary"
                label="Reset All"
                class="text-caption"
                @click="resetFilters"
              />
            </div>


            <!-- WORK MODE -->

            <div class="q-pt-md">

              <div class="text-caption text-weight-bold text-navy q-mb-xs">
                WORK MODE
              </div>

              <div class="column q-gutter-y-xs">

                <q-checkbox
                  v-model="selectedModes"
                  val="all"
                  label="All Modes"
                  dense
                  class="text-caption"
                />

                <q-checkbox
                  v-model="selectedModes"
                  val="Hybrid"
                  label="Hybrid (Office + Home)"
                  dense
                  class="text-caption"
                />

                <q-checkbox
                  v-model="selectedModes"
                  val="On-Site"
                  label="On-Site Only"
                  dense
                  class="text-caption"
                />

                <q-checkbox
                  v-model="selectedModes"
                  val="100% Remote"
                  label="100% Remote"
                  dense
                  class="text-caption"
                />

              </div>

            </div>


            <!-- DURATION -->

            <div class="q-pt-md">

              <div class="text-caption text-weight-bold text-navy q-mb-xs">
                DURATION
              </div>

              <div class="column q-gutter-y-xs">

                <q-checkbox
                  v-model="selectedDurations"
                  val="all"
                  label="Any Duration"
                  dense
                  class="text-caption"
                />

                <q-checkbox
                  v-model="selectedDurations"
                  val="6 Months"
                  label="6 Months Internship"
                  dense
                  class="text-caption"
                />

                <q-checkbox
                  v-model="selectedDurations"
                  val="1 Year Trainee"
                  label="1 Year Trainee Program"
                  dense
                  class="text-caption"
                />

              </div>

            </div>


            <!-- STIPEND -->

            <div class="q-pt-md">

              <div class="text-caption text-weight-bold text-navy q-mb-xs">
                MINIMUM STIPEND
              </div>

              <div class="text-caption text-primary text-weight-bolder q-mb-xs">
                ≥ LKR {{ minStipend.toLocaleString() }} / mo
              </div>

              <q-slider
                v-model="minStipend"
                :min="50000"
                :max="100000"
                :step="5000"
                label
                color="primary"
              />

            </div>


            <!-- TECH SKILLS -->

            <div class="q-pt-md">

              <div class="text-caption text-weight-bold text-navy q-mb-xs">
                TECH SKILLS
              </div>

              <div class="row q-gutter-xs">

                <span
                  v-for="skill in popularSkills"
                  :key="skill"
                  class="skill-filter-chip"
                  :class="{
                    active: activeSkillFilter === skill
                  }"
                  @click="toggleSkillFilter(skill)"
                >
                  {{ skill }}
                </span>

              </div>

            </div>

          </q-card>

        </div>


        <!-- ================= JOB LIST ================= -->

        <div class="col-12 col-md-9">

          <!-- Result Header -->

          <div class="row items-center justify-between q-mb-md">

            <div>

              <span class="text-subtitle1 text-weight-bold text-navy">
                {{ filteredJobs.length }} Available Positions
              </span>

              <span class="text-caption text-grey-6 q-ml-sm">
                Updated today
              </span>

            </div>


            <div class="row items-center q-gutter-x-sm">

              <span class="text-caption text-grey-6 gt-xs">
                Sort by:
              </span>

              <q-select
                v-model="sortBy"
                dense
                outlined
                :options="sortOptions"
                emit-value
                map-options
                class="bg-white rounded-borders"
                style="min-width: 170px;"
              />

            </div>

          </div>


          <!-- Loading -->

          <div
            v-if="loading"
            class="text-center q-py-xl"
          >

            <q-spinner
              color="primary"
              size="50px"
            />

            <div class="text-subtitle2 text-grey-7 q-mt-md">
              Loading internships...
            </div>

          </div>


          <!-- Job Cards -->

          <div
            v-else-if="filteredJobs.length > 0"
            class="row q-col-gutter-md"
          >

            <div
              v-for="job in filteredJobs"
              :key="job.id"
              class="col-12 col-sm-6"
            >

              <q-card
                flat
                class="job-card q-pa-lg bg-white border-light rounded-borders hover-card column justify-between"
                style="min-height: 350px;"
              >

                <div>

                  <!-- Company -->

                  <div class="row items-start justify-between">

                    <div class="row items-center q-gutter-x-sm">

                      <q-avatar
                        :color="job.logoBg"
                        text-color="white"
                        size="44px"
                        rounded
                        class="text-weight-bold"
                      >
                        {{ job.logoText }}
                      </q-avatar>

                      <div>

                        <div class="text-subtitle2 text-weight-bold text-navy">
                          {{ job.company }}
                        </div>

                        <div class="text-caption text-grey-6 flex items-center">

                          <q-icon
                            name="place"
                            size="14px"
                            class="q-mr-xs"
                          />

                          {{ job.location }}

                        </div>

                      </div>

                    </div>


                    <!-- Bookmark -->

                    <q-btn
                      flat
                      round
                      dense
                      :icon="
                        job.isBookmarked
                          ? 'bookmark'
                          : 'bookmark_border'
                      "
                      :color="
                        job.isBookmarked
                          ? 'primary'
                          : 'grey-5'
                      "
                      @click="toggleBookmark(job)"
                    />

                  </div>


                  <!-- Title -->

                  <div
                    class="text-subtitle1 text-weight-bold text-navy q-mt-md leading-tight"
                  >
                    {{ job.title }}
                  </div>


                  <!-- Description -->

                  <p
                    class="text-caption text-grey-6 q-mt-xs text-ellipsis-2"
                  >
                    {{ job.description }}
                  </p>


                  <!-- Badges -->

                  <div class="row items-center q-gutter-xs q-mt-sm">

                    <q-badge
                      color="green-1"
                      text-color="positive"
                      class="text-weight-bold q-py-xs"
                    >

                      <q-icon
                        name="payments"
                        size="13px"
                        class="q-mr-xs"
                      />

                      {{ job.stipend }}

                    </q-badge>


                    <q-badge
                      color="blue-1"
                      text-color="primary"
                      class="text-weight-medium q-py-xs"
                    >
                      {{ job.duration }}
                    </q-badge>


                    <q-badge
                      color="grey-2"
                      text-color="grey-8"
                      class="text-weight-medium q-py-xs"
                    >
                      {{ job.mode }}
                    </q-badge>

                  </div>


                  <!-- Skills -->

                  <div
                    class="row items-center q-gutter-xs q-mt-md"
                  >

                    <span
                      v-for="skill in job.skills.slice(0, 4)"
                      :key="skill"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </span>

                    <span
                      v-if="job.skills.length > 4"
                      class="skill-tag text-grey-5"
                    >
                      +{{ job.skills.length - 4 }}
                    </span>

                  </div>

                </div>


                <!-- Footer -->

                <div
                  class="row items-center justify-between q-pt-md q-mt-md border-top-light"
                >

                  <span class="text-caption text-grey-5">
                    {{ job.deadline }}
                  </span>


                  <q-btn
                    unelevated
                    color="grey-9"
                    no-caps
                    label="View Details & Apply"
                    icon-right="arrow_forward"
                    class="apply-btn text-weight-bold text-caption rounded-borders"
                    @click="openJobDetail(job)"
                  />

                </div>

              </q-card>

            </div>

          </div>


          <!-- Empty -->

          <div
            v-else
            class="text-center q-py-2xl bg-white rounded-borders border-light q-pa-xl"
          >

            <q-avatar
              size="64px"
              color="blue-1"
              text-color="primary"
              class="q-mb-md"
            >
              <q-icon
                name="search_off"
                size="36px"
              />
            </q-avatar>


            <div class="text-h6 text-weight-bold text-navy">
              No matching internships match your criteria
            </div>


            <p
              class="text-caption text-grey-6 q-mb-md"
              style="max-width: 380px; margin-left: auto; margin-right: auto;"
            >
              Try lowering the minimum stipend threshold or clearing active
              search keywords.
            </p>


            <q-btn
              unelevated
              color="primary"
              no-caps
              label="Clear All Filters"
              @click="resetFilters"
            />

          </div>

        </div>

      </div>

    </div>


    <!-- ================= JOB DETAIL MODAL ================= -->

    <q-dialog v-model="showJobModal">

      <q-card
        v-if="selectedJob"
        style="min-width: 360px; max-width: 640px;"
        class="rounded-borders"
      >

        <!-- Modal Header -->

        <q-card-section
          class="row items-center q-pb-none"
        >

          <div class="row items-center q-gutter-x-sm">

            <q-avatar
              :color="selectedJob.logoBg"
              text-color="white"
              size="44px"
              rounded
              class="text-weight-bold"
            >
              {{ selectedJob.logoText }}
            </q-avatar>


            <div>

              <div
                class="text-subtitle1 text-weight-bold text-navy leading-tight"
              >
                {{ selectedJob.title }}
              </div>

              <div class="text-caption text-grey-6">
                {{ selectedJob.company }}
                •
                {{ selectedJob.location }}
              </div>

            </div>

          </div>


          <q-space />


          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />

        </q-card-section>


        <q-card-section class="q-pt-md">

          <!-- Summary -->

          <div
            class="row text-center q-py-sm bg-grey-2 rounded-borders border-light q-mb-md"
          >

            <div class="col-4">

              <div
                class="text-caption text-grey-6"
                style="font-size: 11px;"
              >
                STIPEND
              </div>

              <div
                class="text-caption text-weight-bolder text-positive"
              >
                {{ selectedJob.stipend }}
              </div>

            </div>


            <div class="col-4 border-x-light">

              <div
                class="text-caption text-grey-6"
                style="font-size: 11px;"
              >
                DURATION
              </div>

              <div
                class="text-caption text-weight-bold text-navy"
              >
                {{ selectedJob.duration }}
              </div>

            </div>


            <div class="col-4">

              <div
                class="text-caption text-grey-6"
                style="font-size: 11px;"
              >
                WORK MODE
              </div>

              <div
                class="text-caption text-weight-bold text-primary"
              >
                {{ selectedJob.mode }}
              </div>

            </div>

          </div>


          <!-- Description -->

          <div
            class="text-subtitle2 text-weight-bold text-navy q-mb-xs"
          >
            Role Overview
          </div>

          <p class="text-caption text-grey-7 leading-normal">
            {{ selectedJob.description }}
          </p>


          <!-- Requirements -->

          <div
            class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs"
          >
            Key Prerequisites
          </div>


          <ul
            class="text-caption text-grey-7 q-pl-md q-my-none"
          >

            <li
              v-for="req in selectedJob.requirements"
              :key="req"
              class="q-mb-xs"
            >
              {{ req }}
            </li>

          </ul>


          <!-- Responsibilities -->

          <div
            v-if="
              selectedJob.responsibilities &&
              selectedJob.responsibilities.length
            "
            class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs"
          >
            Responsibilities
          </div>


          <ul
            v-if="
              selectedJob.responsibilities &&
              selectedJob.responsibilities.length
            "
            class="text-caption text-grey-7 q-pl-md q-my-none"
          >

            <li
              v-for="item in selectedJob.responsibilities"
              :key="item"
              class="q-mb-xs"
            >
              {{ item }}
            </li>

          </ul>


          <!-- Benefits -->

          <div
            v-if="
              selectedJob.benefits &&
              selectedJob.benefits.length
            "
            class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs"
          >
            Internship Perks & Benefits
          </div>


          <div
            v-if="
              selectedJob.benefits &&
              selectedJob.benefits.length
            "
            class="row q-gutter-xs"
          >

            <q-badge
              v-for="b in selectedJob.benefits"
              :key="b"
              color="green-1"
              text-color="positive"
              class="q-py-xs"
            >

              <q-icon
                name="check"
                size="12px"
                class="q-mr-xs"
              />

              {{ b }}

            </q-badge>

          </div>


          <!-- ================= APPLY FORM ================= -->

          <div
            class="bg-blue-1 q-pa-md rounded-borders border-light q-mt-md"
          >

            <div
              class="text-subtitle2 text-weight-bold text-primary flex items-center q-mb-sm"
            >

              <q-icon
                name="send"
                size="16px"
                class="q-mr-xs"
              />

              Submit 1-Click Application

            </div>


            <div class="q-gutter-y-sm">

              <div class="text-caption text-grey-7">
                Applying as
                <strong>{{ applicantName }}</strong>
                <span v-if="applicantEmail"> · {{ applicantEmail }}</span>
              </div>


              <q-file
                v-model="applyCvFile"
                dense
                outlined
                bg-color="white"
                accept=".pdf,application/pdf"
                :max-file-size="5242880"
                label="Upload CV (PDF, max 5 MB)"
                clearable
              >
                <template #prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>


              <q-input
                v-model="applyCv"
                dense
                outlined
                bg-color="white"
                label="CV share URL (optional)"
                hint="Or leave blank to use the CV saved in your student profile."
              />


              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Submit Application & Track Status"
                class="full-width text-weight-bold q-py-sm"
                :loading="submittingApplication"
                :disable="submittingApplication"
                @click="submitJobApplication"
              />

            </div>

          </div>

        </q-card-section>

      </q-card>

    </q-dialog>

  </q-page>
</template>


<script setup>
import {
  getAuthToken as readAuthToken,
  getAuthUser
} from '../utils/auth.js'

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useRoute
} from 'vue-router'

import {
  useQuasar
} from 'quasar'


// =====================================================
// Quasar
// =====================================================

const $q = useQuasar()

const route = useRoute()


// =====================================================
// API
// =====================================================

const API_URL =
  'http://localhost:5000/api/internships'

const APPLICATION_API_URL =
  'http://localhost:5000/api/applications'


// =====================================================
// Filters
// =====================================================

const searchKeyword =
  ref(route.query.keyword || '')

const selectedCategory =
  ref(route.query.category || 'all')

const selectedModes =
  ref(['all'])

const selectedDurations =
  ref(['all'])

const minStipend =
  ref(50000)

const activeSkillFilter =
  ref('')

const sortBy =
  ref('newest')


// =====================================================
// Internship Data
// =====================================================

const jobsList =
  ref([])

const loading =
  ref(false)


// =====================================================
// Application Loading
// =====================================================

const submittingApplication =
  ref(false)

const currentUser = getAuthUser()

const applicantName = [
  currentUser?.firstName,
  currentUser?.lastName
]
  .filter(Boolean)
  .join(' ') || 'Signed-in student'

const applicantEmail = currentUser?.email || ''


// =====================================================
// Categories
// =====================================================

const categoryOptions = [

  {
    label: 'All Specializations',
    value: 'all'
  },

  {
    label: 'Software & Engineering',
    value: 'software'
  },

  {
    label: 'AI & Data Science',
    value: 'data'
  },

  {
    label: 'UI/UX & Product Design',
    value: 'design'
  },

  {
    label: 'Business & Finance',
    value: 'business'
  }

]


// =====================================================
// Sort Options
// =====================================================

const sortOptions = [

  {
    label: 'Newest First',
    value: 'newest'
  },

  {
    label: 'Highest Stipend',
    value: 'stipend'
  },

  {
    label: 'Deadline Urgency',
    value: 'deadline'
  }

]


// =====================================================
// Popular Skills
// =====================================================

const popularSkills = [
  'Java',
  'React',
  'Python',
  'Figma',
  'Docker',
  'AWS',
  'SQL'
]


// =====================================================
// Category Mapping
// =====================================================

function mapCategory(categoryName) {

  const category =
    (categoryName || '').toLowerCase()


  if (
    category.includes('software') ||
    category.includes('cloud')
  ) {

    return 'software'

  }


  if (
    category.includes('ai') ||
    category.includes('data')
  ) {

    return 'data'

  }


  if (
    category.includes('ui') ||
    category.includes('ux') ||
    category.includes('design')
  ) {

    return 'design'

  }


  if (
    category.includes('business') ||
    category.includes('finance')
  ) {

    return 'business'

  }


  return 'all'

}


// =====================================================
// Work Mode Mapping
// =====================================================

function mapWorkMode(mode) {

  if (mode === 'Remote') {

    return '100% Remote'

  }

  return mode || 'On-Site'

}


// =====================================================
// Logo Text
// =====================================================

function getLogoText(companyName) {

  if (!companyName) {

    return 'IN'

  }


  const words =
    companyName
      .split(' ')
      .filter(
        word => word.trim() !== ''
      )


  if (words.length === 1) {

    return words[0]
      .substring(0, 2)
      .toUpperCase()

  }


  return (
    words[0].charAt(0) +
    words[1].charAt(0)
  ).toUpperCase()

}


// =====================================================
// Logo Background
// =====================================================

function getLogoBg(companyName) {

  const colors = [

    'blue-7',
    'indigo-7',
    'purple-7',
    'teal-7',
    'cyan-8',
    'deep-orange-7',
    'green-7',
    'blue-grey-7'

  ]


  if (!companyName) {

    return colors[0]

  }


  let total = 0


  for (
    let i = 0;
    i < companyName.length;
    i++
  ) {

    total +=
      companyName.charCodeAt(i)

  }


  return colors[
    total % colors.length
  ]

}


// =====================================================
// Deadline Format
// =====================================================

function formatDeadline(date) {

  if (!date) {

    return 'Deadline not specified'

  }


  const deadline =
    new Date(date)


  if (
    Number.isNaN(
      deadline.getTime()
    )
  ) {

    return 'Deadline not specified'

  }


  return `Apply by ${deadline.toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )}`

}


// =====================================================
// Backend → Frontend Data
// =====================================================

function transformInternship(item) {

  const companyName =
    item.company?.name ||
    'Unknown Company'


  const categoryName =
    item.category?.name ||
    ''


  const stipendAmount =
    Number(
      item.salary?.amount || 0
    )


  const stipendCurrency =
    item.salary?.currency ||
    'LKR'


  const stipendPeriod =
    item.salary?.period ||
    'month'


  return {

    _id:
      String(item._id || ''),

    id:
      String(item._id || ''),

    internshipId:
      String(item._id || ''),

    title:
      item.title ||
      'Untitled Internship',

    company:
      companyName,

    category:
      mapCategory(categoryName),

    categoryName:
      categoryName,

    description:
      item.description ||
      'No description available.',

    requirements:
      Array.isArray(item.requirements)
        ? item.requirements
        : [],

    responsibilities:
      Array.isArray(item.responsibilities)
        ? item.responsibilities
        : [],

    skills:
      Array.isArray(item.skills)
        ? item.skills
        : [],

    benefits:
      Array.isArray(item.benefits)
        ? item.benefits
        : [],

    stipendVal:
      stipendAmount,

    stipend:
      `${stipendCurrency} ${stipendAmount.toLocaleString()} / ${stipendPeriod}`,

    duration:
      item.duration ||
      'Not specified',

    mode:
      mapWorkMode(item.workMode),

    location:
      item.location ||
      'Location not specified',

    deadline:
      formatDeadline(
        item.applicationDeadline
      ),

    applicationDeadline:
      item.applicationDeadline,

    isFeatured:
      item.isFeatured ||
      false,

    isActive:
      item.isActive !== false,

    applicantCount:
      item.applicantCount ||
      0,

    isBookmarked:
      false,

    logoText:
      getLogoText(companyName),

    logoBg:
      getLogoBg(companyName),

    createdAt:
      item.createdAt

  }

}


// =====================================================
// Load Internships
// =====================================================

async function fetchInternships() {

  loading.value = true


  try {

    const response =
      await fetch(API_URL)


    if (!response.ok) {

      throw new Error(
        `API Error: ${response.status}`
      )

    }


    const result =
      await response.json()


    if (!result.success) {

      throw new Error(
        result.message ||
        'Failed to load internships'
      )

    }


    jobsList.value =
      (result.data || [])
        .map(transformInternship)


    console.log(
      'Internships loaded:',
      jobsList.value
    )


  } catch (error) {

    console.error(
      'Error loading internships:',
      error
    )


    jobsList.value = []


    $q.notify({

      type: 'negative',

      message:
        'Unable to load internships from server.',

      caption:
        'Please make sure the backend server is running.',

      icon:
        'error'

    })


  } finally {

    loading.value = false

  }

}


// =====================================================
// Filtered Jobs
// =====================================================

const filteredJobs =
  computed(() => {

    let list =
      jobsList.value.filter(job => {


        const keyword =
          searchKeyword.value
            .trim()
            .toLowerCase()


        const matchesKeyword =
          !keyword ||

          job.title
            .toLowerCase()
            .includes(keyword) ||

          job.company
            .toLowerCase()
            .includes(keyword) ||

          job.description
            .toLowerCase()
            .includes(keyword) ||

          job.skills.some(
            skill =>
              skill
                .toLowerCase()
                .includes(keyword)
          )


        const matchesCategory =
          selectedCategory.value === 'all' ||
          job.category ===
            selectedCategory.value


        const matchesMode =
          selectedModes.value.includes('all') ||
          selectedModes.value.includes(
            job.mode
          )


        const matchesDuration =
          selectedDurations.value.includes('all') ||
          selectedDurations.value.includes(
            job.duration
          )


        const matchesStipend =
          job.stipendVal >=
          minStipend.value


        const matchesSkill =
          !activeSkillFilter.value ||
          job.skills.some(
            skill =>
              skill.toLowerCase() ===
              activeSkillFilter.value.toLowerCase()
          )


        return (
          matchesKeyword &&
          matchesCategory &&
          matchesMode &&
          matchesDuration &&
          matchesStipend &&
          matchesSkill
        )

      })


    // Highest Stipend

    if (
      sortBy.value === 'stipend'
    ) {

      list.sort(
        (a, b) =>
          b.stipendVal -
          a.stipendVal
      )

    }


    // Newest

    if (
      sortBy.value === 'newest'
    ) {

      list.sort(
        (a, b) =>
          new Date(
            b.createdAt || 0
          ) -
          new Date(
            a.createdAt || 0
          )
      )

    }


    // Deadline

    if (
      sortBy.value === 'deadline'
    ) {

      list.sort(
        (a, b) =>
          new Date(
            a.applicationDeadline ||
            '9999-12-31'
          ) -
          new Date(
            b.applicationDeadline ||
            '9999-12-31'
          )
      )

    }


    return list

  })


// =====================================================
// Skill Filter
// =====================================================

function toggleSkillFilter(skill) {

  activeSkillFilter.value =
    activeSkillFilter.value === skill
      ? ''
      : skill

}


// =====================================================
// Reset Filters
// =====================================================

function resetFilters() {

  searchKeyword.value =
    ''

  selectedCategory.value =
    'all'

  selectedModes.value =
    ['all']

  selectedDurations.value =
    ['all']

  minStipend.value =
    50000

  activeSkillFilter.value =
    ''

  sortBy.value =
    'newest'


  $q.notify({

    type: 'info',

    message:
      'Filters reset to default.'

  })

}


// =====================================================
// Bookmark
// =====================================================

function toggleBookmark(job) {

  job.isBookmarked =
    !job.isBookmarked


  $q.notify({

    type:
      job.isBookmarked
        ? 'positive'
        : 'info',

    message:
      job.isBookmarked
        ? `"${job.title}" saved to your profile! 📌`
        : 'Role removed from saved list.',

    icon:
      job.isBookmarked
        ? 'bookmark'
        : 'bookmark_border'

  })

}


// =====================================================
// APPLICATION MODAL
// =====================================================

const showJobModal =
  ref(false)

const selectedJob =
  ref(null)


const applyCv =
  ref('')

const applyCvFile =
  ref(null)


// =====================================================
// Open Job
// =====================================================

function openJobDetail(job) {

  selectedJob.value =
    job

  showJobModal.value =
    true

}


// =====================================================
// Get JWT Token
// =====================================================

function getAuthToken() {
  return readAuthToken()
}


// =====================================================
// SUBMIT APPLICATION
// =====================================================

async function submitJobApplication() {

  // -----------------------------------------
  // Check selected internship
  // -----------------------------------------

  if (!selectedJob.value) {

    $q.notify({

      type: 'negative',

      message:
        'Please select an internship first.',

      icon:
        'error'

    })

    return

  }

  const internshipId = selectedJob.value._id
  if (!/^[a-f\d]{24}$/i.test(internshipId || '')) {
    $q.notify({
      type: 'negative',
      message:
        'This internship is missing its database ID. Refresh the page and select the internship again.',
      icon: 'error'
    })
    return
  }


  // -----------------------------------------
  // Get token
  // -----------------------------------------

  const token =
    getAuthToken()


  if (!token) {

    $q.notify({

      type: 'negative',

      message:
        'Please login before applying.',

      caption:
        'Your student login session was not found.',

      icon:
        'login',

      timeout:
        5000

    })

    return

  }


  // -----------------------------------------
  // Start loading
  // -----------------------------------------

  submittingApplication.value =
    true


  try {

    console.log(
      'Submitting application for:',
      selectedJob.value.title
    )

    const applicationData = new FormData()
    applicationData.append('internshipId', internshipId)
    if (applyCvFile.value) {
      applicationData.append('resume', applyCvFile.value)
    } else if (applyCv.value.trim()) {
      applicationData.append('resumeUrl', applyCv.value.trim())
    }

    // ---------------------------------------
    // POST Application
    // ---------------------------------------

    const response =
      await fetch(
        APPLICATION_API_URL,
        {

          method:
            'POST',

          headers: {

            'Authorization':
              `Bearer ${token}`

          },

          body: applicationData

        }
      )


    const result =
      await response.json()


    console.log(
      'Application API response:',
      result
    )


    // ---------------------------------------
    // Backend Error
    // ---------------------------------------

    if (!response.ok) {

      throw new Error(
        result.message ||
        `Application failed (${response.status})`
      )

    }


    // ---------------------------------------
    // Success
    // ---------------------------------------

    selectedJob.value.applicantCount =
      (selectedJob.value.applicantCount || 0) + 1

    applyCvFile.value = null
    applyCv.value = ''

    showJobModal.value =
      false


    $q.notify({

      type:
        'positive',

      message:
        '🎉 Application submitted successfully!',

      caption:
        'Your application has been saved and is now pending review.',

      icon:
        'check_circle',

      timeout:
        5000

    })


    console.log(
      'Application saved successfully:',
      result.data
    )


  } catch (error) {

    console.error(
      'Application submission error:',
      error
    )


    $q.notify({

      type:
        'negative',

      message:
        error.message ||
        'Unable to submit application.',

      caption:
        'Please check your login session and try again.',

      icon:
        'error',

      timeout:
        6000

    })

  } finally {

    submittingApplication.value =
      false

  }

}


// =====================================================
// PAGE LOAD
// =====================================================

onMounted(() => {

  fetchInternships()

})

</script>


<style scoped lang="scss">

.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}


.page-header {
  background:
    linear-gradient(
      135deg,
      #080d1a 0%,
      #0f172a 100%
    );
}


.border-bottom-navy {
  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.08);
}


.border-light {
  border:
    1px solid
    #e2e8f0;
}


.border-bottom-light {
  border-bottom:
    1px solid
    #f1f5f9;
}


.border-top-light {
  border-top:
    1px solid
    #f1f5f9;
}


.border-x-light {
  border-left:
    1px solid
    #e2e8f0;

  border-right:
    1px solid
    #e2e8f0;
}


.sticky-sidebar {
  position: sticky;
  top: 110px;
}


.skill-tag {
  background:
    #f1f5f9;

  color:
    #475569;

  font-size:
    11px;

  font-weight:
    500;

  padding:
    3px 8px;

  border-radius:
    6px;
}


.skill-filter-chip {
  background:
    #f1f5f9;

  color:
    #475569;

  font-size:
    11px;

  font-weight:
    500;

  padding:
    3px 8px;

  border-radius:
    6px;

  cursor:
    pointer;

  transition:
    all 0.2s;


  &:hover {
    background:
      #e0e7ff;

    color:
      #2563eb;
  }


  &.active {
    background:
      #2563eb;

    color:
      #ffffff;
  }
}


.text-ellipsis-2 {
  display:
    -webkit-box;

  -webkit-line-clamp:
    2;

  -webkit-box-orient:
    vertical;

  overflow:
    hidden;
}


.apply-btn {
  transition:
    all 0.2s;


  &:hover {
    background-color:
      #2563eb !important;
  }
}

</style>