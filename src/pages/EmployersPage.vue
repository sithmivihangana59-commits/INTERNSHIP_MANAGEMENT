<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- Header Banner -->
    <div class="page-header text-white q-py-xl border-bottom-navy">
      <div class="max-width-container q-px-md text-center">
        <q-badge color="blue-9" text-color="white" class="q-py-xs q-px-sm text-weight-bold q-mb-sm">
          <q-icon name="business" size="14px" class="q-mr-xs" /> FOR COMPANIES & RECRUITING LEADS
        </q-badge>
        <h1 class="text-h3 font-display text-weight-bolder text-white q-my-none tracking-tight">
          Hire Top 5% University Interns
        </h1>
        <p class="text-body1 text-grey-4 q-mt-sm q-mx-auto" style="max-width: 680px;">
          Connect directly with verified computing, engineering, and business undergraduates. Post your vacancies and receive pre-screened applicant pipelines.
        </p>
      </div>
    </div>

    <!-- Main Content: Form + Benefits -->
    <div class="max-width-container q-px-md q-pt-xl">
      <div class="row q-col-gutter-xl">
        
        <!-- Left Column: Post a Job Form -->
        <div class="col-12 col-md-7">
          <q-card flat class="q-pa-lg bg-white border-light rounded-borders shadow-1">
            <div class="row items-center q-gutter-x-sm q-pb-md border-bottom-light">
              <q-avatar size="36px" color="blue-1" text-color="primary" rounded>
                <q-icon name="post_add" size="20px" />
              </q-avatar>
              <div>
                <div class="text-h6 font-display text-weight-bold text-navy">Post an Internship Vacancy</div>
                <div class="text-caption text-grey-6">Free posting for verified tech & enterprise firms</div>
              </div>
            </div>

            <q-form @submit.prevent="submitJobPost" class="q-gutter-y-md q-pt-md">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.company" dense outlined label="Company Name" placeholder="e.g. Sysco LABS" required />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.email" dense outlined type="email" label="Official HR Email" placeholder="hr@company.com" required />
                </div>
              </div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.title" dense outlined label="Job Title" placeholder="e.g. Associate Software Engineer Intern" required />
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
                  <q-input v-model="form.location" dense outlined label="Location" placeholder="Colombo 03" required />
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

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.stipend" dense outlined label="Monthly Stipend (LKR)" placeholder="e.g. LKR 80,000 / mo" required />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input v-model="form.skills" dense outlined label="Required Tech Skills" placeholder="Java, React, Docker" required />
                </div>
              </div>

              <div>
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
                />
              </div>
            </q-form>
          </q-card>
        </div>

        <!-- Right Column: Employer Perks & Stats -->
        <div class="col-12 col-md-5">
          <div class="q-gutter-y-md">
            
            <q-card flat class="q-pa-lg bg-white border-light rounded-borders">
              <div class="text-subtitle1 font-display text-weight-bold text-navy q-mb-sm">
                Why Partner With InternSphere?
              </div>
              <div class="q-gutter-y-sm text-caption text-grey-7">
                <div class="row items-start">
                  <q-icon name="verified_user" color="positive" size="20px" class="q-mr-sm q-mt-xs" />
                  <div>
                    <span class="text-weight-bold text-navy">100% Verified University Students</span>
                    <p class="q-my-none">Access undergraduates from Moratuwa, UCSC, SLIIT, IIT, and Peradeniya with verified credentials.</p>
                  </div>
                </div>
                <div class="row items-start">
                  <q-icon name="filter_alt" color="primary" size="20px" class="q-mr-sm q-mt-xs" />
                  <div>
                    <span class="text-weight-bold text-navy">Automated Technical Screening</span>
                    <p class="q-my-none">Filter by semester GPA, GitHub contributions, and verified framework proficiencies.</p>
                  </div>
                </div>
                <div class="row items-start">
                  <q-icon name="timer" color="warning" size="20px" class="q-mr-sm q-mt-xs" />
                  <div>
                    <span class="text-weight-bold text-navy">48-Hour Placement Turnaround</span>
                    <p class="q-my-none">Direct message candidates and schedule technical interview rounds without messy email chains.</p>
                  </div>
                </div>
              </div>
            </q-card>

            <!-- Campus Network -->
            <q-card flat class="q-pa-lg bg-navy text-white rounded-borders">
              <div class="text-subtitle1 font-display text-weight-bold q-mb-xs">
                Official Campus Partners
              </div>
              <p class="text-caption text-grey-4">Over 18,500 students enrolled across leading engineering & computing faculties.</p>
              <div class="row q-gutter-xs q-mt-sm">
                <q-badge color="blue-9" class="q-py-xs">Uni of Moratuwa</q-badge>
                <q-badge color="blue-9" class="q-py-xs">UCSC Colombo</q-badge>
                <q-badge color="blue-9" class="q-py-xs">SLIIT</q-badge>
                <q-badge color="blue-9" class="q-py-xs">IIT Sri Lanka</q-badge>
                <q-badge color="blue-9" class="q-py-xs">Uni of Peradeniya</q-badge>
              </div>
            </q-card>

          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { INITIAL_JOBS } from '@/data/jobsData'

const $q = useQuasar()
const router = useRouter()

const categoryOptions = [
  { label: 'Software & Cloud Engineering', value: 'software' },
  { label: 'AI & Data Science', value: 'data' },
  { label: 'UI/UX Product Design', value: 'design' },
  { label: 'Business & Finance', value: 'business' }
]

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
    requirements: ['Undergraduate in relevant field.', 'Solid knowledge in listed skills.', 'Strong communication and problem solving.']
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
</style>
