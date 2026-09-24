<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- Header Banner -->
    <div class="page-header text-white q-py-xl border-bottom-navy">
      <div class="max-width-container q-px-md text-center">
        <q-badge color="positive" text-color="white" class="q-py-xs q-px-sm text-weight-bold q-mb-sm">
          <q-icon name="work" size="14px" class="q-mr-xs" /> 1,450+ VERIFIED OPPORTUNITIES
        </q-badge>
        <h1 class="text-h3 font-display text-weight-bolder text-white q-my-none tracking-tight">
          Find Your Ideal Internship
        </h1>
        <p class="text-body1 text-grey-4 q-mt-sm q-mx-auto" style="max-width: 650px;">
          Filter through verified corporate placements, compare monthly stipends, and apply directly with 1-click.
        </p>

        <!-- Search Bar -->
        <q-card class="q-pa-sm q-mt-lg rounded-borders shadow-2 q-mx-auto bg-white" style="max-width: 880px;">
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
                <template v-slot:prepend><q-icon name="search" color="grey-6" /></template>
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
                <template v-slot:prepend><q-icon name="category" color="grey-6" /></template>
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

    <!-- Main Content Area: Sidebar Filters + Job Cards -->
    <div class="max-width-container q-px-md q-pt-xl">
      <div class="row q-col-gutter-lg">
        
        <!-- Sidebar Filters -->
        <div class="col-12 col-md-3">
          <q-card flat class="filter-sidebar q-pa-md bg-white border-light rounded-borders sticky-sidebar">
            <div class="row items-center justify-between q-pb-sm border-bottom-light">
              <span class="text-subtitle2 text-weight-bold text-navy flex items-center">
                <q-icon name="tune" size="18px" class="q-mr-xs text-primary" /> Filter Results
              </span>
              <q-btn flat dense no-caps color="primary" label="Reset All" class="text-caption" @click="resetFilters" />
            </div>

            <!-- Work Mode -->
            <div class="q-pt-md">
              <div class="text-caption text-weight-bold text-navy q-mb-xs">WORK MODE</div>
              <div class="column q-gutter-y-xs">
                <q-checkbox v-model="selectedModes" val="all" label="All Modes" dense class="text-caption" />
                <q-checkbox v-model="selectedModes" val="Hybrid" label="Hybrid (Office + Home)" dense class="text-caption" />
                <q-checkbox v-model="selectedModes" val="On-Site" label="On-Site Only" dense class="text-caption" />
                <q-checkbox v-model="selectedModes" val="100% Remote" label="100% Remote" dense class="text-caption" />
              </div>
            </div>

            <!-- Duration -->
            <div class="q-pt-md">
              <div class="text-caption text-weight-bold text-navy q-mb-xs">DURATION</div>
              <div class="column q-gutter-y-xs">
                <q-checkbox v-model="selectedDurations" val="all" label="Any Duration" dense class="text-caption" />
                <q-checkbox v-model="selectedDurations" val="6 Months" label="6 Months Internship" dense class="text-caption" />
                <q-checkbox v-model="selectedDurations" val="1 Year Trainee" label="1 Year Trainee Program" dense class="text-caption" />
              </div>
            </div>

            <!-- Minimum Stipend -->
            <div class="q-pt-md">
              <div class="text-caption text-weight-bold text-navy q-mb-xs">MINIMUM STIPEND</div>
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

            <!-- Quick Tag Filters -->
            <div class="q-pt-md">
              <div class="text-caption text-weight-bold text-navy q-mb-xs">TECH SKILLS</div>
              <div class="row q-gutter-xs">
                <span
                  v-for="skill in popularSkills"
                  :key="skill"
                  class="skill-filter-chip"
                  :class="{ active: activeSkillFilter === skill }"
                  @click="toggleSkillFilter(skill)"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </q-card>
        </div>

        <!-- Job Listings -->
        <div class="col-12 col-md-9">
          <!-- Results Header & Sort -->
          <div class="row items-center justify-between q-mb-md">
            <div>
              <span class="text-subtitle1 text-weight-bold text-navy">
                {{ filteredJobs.length }} Available Positions
              </span>
              <span class="text-caption text-grey-6 q-ml-sm">Updated today</span>
            </div>

            <div class="row items-center q-gutter-x-sm">
              <span class="text-caption text-grey-6 gt-xs">Sort by:</span>
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

          <!-- Cards Grid -->
          <div class="row q-col-gutter-md" v-if="filteredJobs.length > 0">
            <div v-for="job in filteredJobs" :key="job.id" class="col-12 col-sm-6">
              <q-card flat class="job-card q-pa-lg bg-white border-light rounded-borders hover-card column justify-between" style="min-height: 350px;">
                <div>
                  <!-- Header -->
                  <div class="row items-start justify-between">
                    <div class="row items-center q-gutter-x-sm">
                      <q-avatar :color="job.logoBg" text-color="white" size="44px" rounded class="text-weight-bold">
                        {{ job.logoText }}
                      </q-avatar>
                      <div>
                        <div class="text-subtitle2 text-weight-bold text-navy">{{ job.company }}</div>
                        <div class="text-caption text-grey-6 flex items-center">
                          <q-icon name="place" size="14px" class="q-mr-xs" />
                          {{ job.location }}
                        </div>
                      </div>
                    </div>
                    <q-btn
                      flat
                      round
                      dense
                      :icon="job.isBookmarked ? 'bookmark' : 'bookmark_border'"
                      :color="job.isBookmarked ? 'primary' : 'grey-5'"
                      @click="toggleBookmark(job)"
                    />
                  </div>

                  <!-- Title -->
                  <div class="text-subtitle1 text-weight-bold text-navy q-mt-md leading-tight">
                    {{ job.title }}
                  </div>
                  <p class="text-caption text-grey-6 q-mt-xs text-ellipsis-2">
                    {{ job.description }}
                  </p>

                  <!-- Badges -->
                  <div class="row items-center q-gutter-xs q-mt-sm">
                    <q-badge color="green-1" text-color="positive" class="text-weight-bold q-py-xs">
                      <q-icon name="payments" size="13px" class="q-mr-xs" />
                      {{ job.stipend }}
                    </q-badge>
                    <q-badge color="blue-1" text-color="primary" class="text-weight-medium q-py-xs">
                      {{ job.duration }}
                    </q-badge>
                    <q-badge color="grey-2" text-color="grey-8" class="text-weight-medium q-py-xs">
                      {{ job.mode }}
                    </q-badge>
                  </div>

                  <!-- Skill tags -->
                  <div class="row items-center q-gutter-xs q-mt-md">
                    <span v-for="skill in job.skills.slice(0, 4)" :key="skill" class="skill-tag">
                      {{ skill }}
                    </span>
                    <span v-if="job.skills.length > 4" class="skill-tag text-grey-5">
                      +{{ job.skills.length - 4 }}
                    </span>
                  </div>
                </div>

                <!-- Footer -->
                <div class="row items-center justify-between q-pt-md q-mt-md border-top-light">
                  <span class="text-caption text-grey-5">{{ job.deadline }}</span>
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

          <!-- Empty State -->
          <div v-else class="text-center q-py-2xl bg-white rounded-borders border-light q-pa-xl">
            <q-avatar size="64px" color="blue-1" text-color="primary" class="q-mb-md">
              <q-icon name="search_off" size="36px" />
            </q-avatar>
            <div class="text-h6 text-weight-bold text-navy">No matching internships match your criteria</div>
            <p class="text-caption text-grey-6 q-mb-md" style="max-width: 380px; margin-left: auto; margin-right: auto;">
              Try lowering the minimum stipend threshold or clearing active search keywords.
            </p>
            <q-btn unelevated color="primary" no-caps label="Clear All Filters" @click="resetFilters" />
          </div>

        </div>

      </div>
    </div>

    <!-- ================= JOB DETAIL & APPLICATION MODAL ================= -->
    <q-dialog v-model="showJobModal">
      <q-card style="min-width: 360px; max-width: 640px;" class="rounded-borders" v-if="selectedJob">
        <q-card-section class="row items-center q-pb-none">
          <div class="row items-center q-gutter-x-sm">
            <q-avatar :color="selectedJob.logoBg" text-color="white" size="44px" rounded class="text-weight-bold">
              {{ selectedJob.logoText }}
            </q-avatar>
            <div>
              <div class="text-subtitle1 text-weight-bold text-navy leading-tight">{{ selectedJob.title }}</div>
              <div class="text-caption text-grey-6">{{ selectedJob.company }} • {{ selectedJob.location }}</div>
            </div>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <!-- Summary Strip -->
          <div class="row text-center q-py-sm bg-grey-2 rounded-borders border-light q-mb-md">
            <div class="col-4">
              <div class="text-caption text-grey-6" style="font-size: 11px;">STIPEND</div>
              <div class="text-caption text-weight-bolder text-positive">{{ selectedJob.stipend }}</div>
            </div>
            <div class="col-4 border-x-light">
              <div class="text-caption text-grey-6" style="font-size: 11px;">DURATION</div>
              <div class="text-caption text-weight-bold text-navy">{{ selectedJob.duration }}</div>
            </div>
            <div class="col-4">
              <div class="text-caption text-grey-6" style="font-size: 11px;">WORK MODE</div>
              <div class="text-caption text-weight-bold text-primary">{{ selectedJob.mode }}</div>
            </div>
          </div>

          <div class="text-subtitle2 text-weight-bold text-navy q-mb-xs">Role Overview</div>
          <p class="text-caption text-grey-7 leading-normal">{{ selectedJob.description }}</p>

          <div class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs">Key Prerequisites</div>
          <ul class="text-caption text-grey-7 q-pl-md q-my-none">
            <li v-for="req in selectedJob.requirements" :key="req" class="q-mb-xs">{{ req }}</li>
          </ul>

          <div class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs" v-if="selectedJob.benefits">
            Internship Perks & Benefits
          </div>
          <div class="row q-gutter-xs" v-if="selectedJob.benefits">
            <q-badge v-for="b in selectedJob.benefits" :key="b" color="green-1" text-color="positive" class="q-py-xs">
              <q-icon name="check" size="12px" class="q-mr-xs" /> {{ b }}
            </q-badge>
          </div>

          <!-- Quick 1-Click Apply Form -->
          <div class="bg-blue-1 q-pa-md rounded-borders border-light q-mt-md">
            <div class="text-subtitle2 text-weight-bold text-primary flex items-center q-mb-sm">
              <q-icon name="send" size="16px" class="q-mr-xs" /> Submit 1-Click Application
            </div>
            <div class="q-gutter-y-sm">
              <q-input v-model="applyName" dense outlined bg-color="white" label="Full Name" />
              <q-input v-model="applyEmail" dense outlined bg-color="white" label="University Email" />
              <q-input v-model="applyCv" dense outlined bg-color="white" label="CV / LinkedIn URL" />
              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Submit Application & Track Status"
                class="full-width text-weight-bold q-py-sm"
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { INITIAL_JOBS } from '@/data/jobsData'

const $q = useQuasar()
const route = useRoute()

const searchKeyword = ref(route.query.keyword || '')
const selectedCategory = ref(route.query.category || 'all')
const selectedModes = ref(['all'])
const selectedDurations = ref(['all'])
const minStipend = ref(50000)
const activeSkillFilter = ref('')
const sortBy = ref('newest')

const jobsList = ref([...INITIAL_JOBS])

const categoryOptions = [
  { label: 'All Specializations', value: 'all' },
  { label: 'Software & Engineering', value: 'software' },
  { label: 'AI & Data Science', value: 'data' },
  { label: 'UI/UX & Product Design', value: 'design' },
  { label: 'Business & Finance', value: 'business' }
]

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Highest Stipend', value: 'stipend' },
  { label: 'Deadline Urgency', value: 'deadline' }
]

const popularSkills = ['Java', 'React', 'Python', 'Figma', 'Docker', 'AWS', 'SQL']

const filteredJobs = computed(() => {
  let list = jobsList.value.filter(job => {
    // Keyword
    const matchesKeyword = !searchKeyword.value ||
      job.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchKeyword.value.toLowerCase()))

    // Category
    const matchesCategory = selectedCategory.value === 'all' || job.category === selectedCategory.value

    // Work Mode
    const matchesMode = selectedModes.value.includes('all') || selectedModes.value.includes(job.mode)

    // Duration
    const matchesDuration = selectedDurations.value.includes('all') || selectedDurations.value.includes(job.duration)

    // Stipend
    const matchesStipend = job.stipendVal >= minStipend.value

    // Tech Skill
    const matchesSkill = !activeSkillFilter.value || job.skills.includes(activeSkillFilter.value)

    return matchesKeyword && matchesCategory && matchesMode && matchesDuration && matchesStipend && matchesSkill
  })

  if (sortBy.value === 'stipend') {
    list.sort((a, b) => b.stipendVal - a.stipendVal)
  }

  return list
})

function toggleSkillFilter(skill) {
  activeSkillFilter.value = activeSkillFilter.value === skill ? '' : skill
}

function resetFilters() {
  searchKeyword.value = ''
  selectedCategory.value = 'all'
  selectedModes.value = ['all']
  selectedDurations.value = ['all']
  minStipend.value = 50000
  activeSkillFilter.value = ''
  $q.notify({ type: 'info', message: 'Filters reset to default.' })
}

function toggleBookmark(job) {
  job.isBookmarked = !job.isBookmarked
  $q.notify({
    type: job.isBookmarked ? 'positive' : 'info',
    message: job.isBookmarked ? `"${job.title}" saved to your profile! 📌` : 'Role removed from saved list.',
    icon: job.isBookmarked ? 'bookmark' : 'bookmark_border'
  })
}

// Modal state
const showJobModal = ref(false)
const selectedJob = ref(null)
const applyName = ref('Sithmi Vihangana')
const applyEmail = ref('sithmi.v@students.ac.lk')
const applyCv = ref('https://linkedin.com/in/sithmi-vihangana')

function openJobDetail(job) {
  selectedJob.value = job
  showJobModal.value = true
}

function submitJobApplication() {
  showJobModal.value = false
  $q.notify({
    type: 'positive',
    message: '🎉 Application submitted successfully! Track it in the Live Pipeline.',
    icon: 'check_circle'
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

.border-bottom-light {
  border-bottom: 1px solid #f1f5f9;
}

.border-top-light {
  border-top: 1px solid #f1f5f9;
}

.border-x-light {
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
}

.sticky-sidebar {
  position: sticky;
  top: 110px;
}

.skill-tag {
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 6px;
}

.skill-filter-chip {
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e7ff;
    color: #2563eb;
  }

  &.active {
    background: #2563eb;
    color: #ffffff;
  }
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apply-btn {
  transition: all 0.2s;
  &:hover {
    background-color: #2563eb !important;
  }
}
</style>
