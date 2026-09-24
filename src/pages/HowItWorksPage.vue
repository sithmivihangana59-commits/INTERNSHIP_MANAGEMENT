<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- Header Banner -->
    <div class="page-header text-white q-py-xl border-bottom-navy">
      <div class="max-width-container q-px-md text-center">
        <q-badge color="blue-9" text-color="white" class="q-py-xs q-px-sm text-weight-bold q-mb-sm">
          <q-icon name="help_outline" size="14px" class="q-mr-xs" /> STEP-BY-STEP PROCESS
        </q-badge>
        <h1 class="text-h3 font-display text-weight-bolder text-white q-my-none tracking-tight">
          How InternSphere Works
        </h1>
        <p class="text-body1 text-grey-4 q-mt-sm q-mx-auto" style="max-width: 680px;">
          Bridging the gap between university lecture halls and top industry engineering desks with a modern, transparent pipeline.
        </p>

        <!-- Toggle Audience Tabs -->
        <div class="q-mt-lg inline-block bg-navy-light q-pa-xs rounded-borders border-navy-light">
          <q-btn
            no-caps
            :class="[audienceTab === 'students' ? 'bg-primary text-white text-weight-bold shadow-1' : 'text-grey-4']"
            label="For Students & Undergraduates"
            icon="school"
            class="q-px-md q-py-xs rounded-borders"
            @click="audienceTab = 'students'"
          />
          <q-btn
            no-caps
            :class="[audienceTab === 'employers' ? 'bg-primary text-white text-weight-bold shadow-1' : 'text-grey-4']"
            label="For Companies & Recruiters"
            icon="business"
            class="q-px-md q-py-xs rounded-borders"
            @click="audienceTab = 'employers'"
          />
        </div>
      </div>
    </div>

    <!-- Main Workflow Content -->
    <div class="max-width-container q-px-md q-pt-xl">
      
      <!-- Student Workflow -->
      <div v-if="audienceTab === 'students'" class="q-gutter-y-xl">
        <div class="row q-col-gutter-xl items-center" v-for="(step, idx) in studentSteps" :key="step.title">
          <div class="col-12 col-md-6" :class="{ 'order-last': idx % 2 === 1 }">
            <q-badge color="blue-1" text-color="primary" class="q-py-xs q-px-sm text-weight-bold q-mb-xs">
              STEP {{ step.number }}
            </q-badge>
            <h2 class="text-h4 font-display text-weight-bolder text-navy q-my-xs tracking-tight">
              {{ step.title }}
            </h2>
            <p class="text-body2 text-grey-7 leading-relaxed q-mt-sm">
              {{ step.description }}
            </p>
            <div class="q-mt-md q-gutter-y-sm">
              <div v-for="point in step.highlights" :key="point" class="row items-center text-caption text-grey-8">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>{{ point }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat class="q-pa-lg bg-white border-light rounded-borders shadow-2">
              <div class="row items-center justify-between q-pb-md border-bottom-light">
                <span class="text-caption text-weight-bold text-navy flex items-center">
                  <q-icon :name="step.cardIcon" color="primary" size="20px" class="q-mr-xs" />
                  {{ step.cardLabel }}
                </span>
                <q-badge :color="step.badgeColor" text-color="white">{{ step.badgeText }}</q-badge>
              </div>
              <div class="q-pt-md text-caption text-grey-7 leading-normal">
                {{ step.cardPreview }}
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Employer Workflow -->
      <div v-else class="q-gutter-y-xl">
        <div class="row q-col-gutter-xl items-center" v-for="(step, idx) in employerSteps" :key="step.title">
          <div class="col-12 col-md-6" :class="{ 'order-last': idx % 2 === 1 }">
            <q-badge color="green-1" text-color="positive" class="q-py-xs q-px-sm text-weight-bold q-mb-xs">
              EMPLOYER STEP {{ step.number }}
            </q-badge>
            <h2 class="text-h4 font-display text-weight-bolder text-navy q-my-xs tracking-tight">
              {{ step.title }}
            </h2>
            <p class="text-body2 text-grey-7 leading-relaxed q-mt-sm">
              {{ step.description }}
            </p>
            <div class="q-mt-md q-gutter-y-sm">
              <div v-for="point in step.highlights" :key="point" class="row items-center text-caption text-grey-8">
                <q-icon name="check_circle" color="positive" size="18px" class="q-mr-sm" />
                <span>{{ point }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat class="q-pa-lg bg-white border-light rounded-borders shadow-2">
              <div class="row items-center justify-between q-pb-md border-bottom-light">
                <span class="text-caption text-weight-bold text-navy flex items-center">
                  <q-icon :name="step.cardIcon" color="positive" size="20px" class="q-mr-xs" />
                  {{ step.cardLabel }}
                </span>
                <q-badge color="green-1" text-color="positive">{{ step.badgeText }}</q-badge>
              </div>
              <div class="q-pt-md text-caption text-grey-7 leading-normal">
                {{ step.cardPreview }}
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="q-mt-2xl q-pt-xl border-top-light">
        <div class="text-center q-mb-xl" style="max-width: 620px; margin: 0 auto;">
          <q-badge color="blue-1" text-color="primary" class="q-py-xs q-px-sm text-weight-bold">FREQUENTLY ASKED QUESTIONS</q-badge>
          <h2 class="text-h4 font-display text-weight-bolder text-navy q-my-xs tracking-tight">
            Have Questions? We've Got Answers
          </h2>
        </div>

        <q-card flat class="bg-white rounded-borders border-light q-mx-auto" style="max-width: 820px;">
          <q-list separator>
            <q-expansion-item
              v-for="faq in faqs"
              :key="faq.q"
              group="faqgroup"
              :label="faq.q"
              header-class="text-weight-bold text-navy text-subtitle2"
              expand-icon-class="text-primary"
            >
              <q-card>
                <q-card-section class="text-body2 text-grey-7 q-pt-none">
                  {{ faq.a }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card>
      </div>

      <!-- Bottom Action CTA -->
      <div class="q-mt-2xl q-pa-xl bg-navy rounded-borders text-white text-center">
        <h3 class="text-h4 font-display text-weight-bolder q-my-none">
          Ready to Take Your Next Step?
        </h3>
        <p class="text-body2 text-grey-4 q-mt-sm q-mb-lg q-mx-auto" style="max-width: 500px;">
          Join thousands of university students landing roles at top tech companies.
        </p>
        <div class="row items-center justify-center q-gutter-md">
          <q-btn
            unelevated
            color="primary"
            no-caps
            label="Browse 1,450+ Roles"
            icon-right="arrow_forward"
            to="/internships"
            class="text-weight-bold q-px-lg q-py-sm rounded-borders shadow-2"
          />
          <q-btn
            outline
            color="white"
            no-caps
            label="Live Application Tracker"
            to="/tracker"
            class="text-weight-bold q-px-lg q-py-sm rounded-borders"
          />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const audienceTab = ref('students')

const studentSteps = [
  {
    number: '01',
    title: 'Create Your Verified Profile',
    description: 'Set up your student profile in less than 3 minutes. Upload your CV, connect GitHub/LinkedIn, and verify your university enrollment to earn the official Verified badge.',
    highlights: [
      'Official university verification badge recognized by corporate HR',
      'Parse CV skills automatically without manual data entry',
      'Safe, encrypted privacy controls for academic transcripts'
    ],
    cardIcon: 'badge',
    cardLabel: 'Student Credentials',
    badgeColor: 'positive',
    badgeText: 'Verified Status',
    cardPreview: 'Your profile is tagged with your university faculty, GPA honors, and validated technical projects directly visible to hiring managers.'
  },
  {
    number: '02',
    title: 'Intelligent Role Matching',
    description: 'Our proprietary matching algorithm maps your current academic year, programming frameworks, and preferred locations to open summer/fall placement openings.',
    highlights: [
      'Filter exclusively by paid stipend thresholds (e.g. ≥ LKR 75,000)',
      'Discover hybrid, on-site, or 100% remote software roles',
      'AI gap analyzer showing what skills you need to learn'
    ],
    cardIcon: 'auto_awesome',
    cardLabel: 'AI Recommendation Engine',
    badgeColor: 'primary',
    badgeText: '98% Match',
    cardPreview: 'Top match detected: Associate Software Engineer Intern at WSO2. Matches your Java, React, and Docker coursework with 98% skill alignment.'
  },
  {
    number: '03',
    title: '1-Click Apply & Kanban Tracking',
    description: 'Never fill out long 10-page external forms again. Submit your pre-approved application directly to technical leads and track progress on your personal Kanban board.',
    highlights: [
      'Direct transmission to engineering and HR managers',
      'Real-time status updates: Applied, In Review, Interview, Offer',
      'Zero spam and guaranteed response notifications'
    ],
    cardIcon: 'view_kanban',
    cardLabel: 'Live Application Tracker',
    badgeColor: 'purple',
    badgeText: 'Active Tracking',
    cardPreview: 'Watch your application progress through each interview round with date, time, and Microsoft Teams / Zoom links integrated automatically.'
  },
  {
    number: '04',
    title: 'Receive Formal Corporate Offer',
    description: 'Ace your interviews, compare offers, and accept your formal digital offer letter with full stipend and duration guarantees.',
    highlights: [
      'Official signed PDF offer letter downloadable instantly',
      'University internship coordinator approval integration',
      'Direct pathway to full-time Associate Engineer conversions'
    ],
    cardIcon: 'celebration',
    cardLabel: 'Placement Success',
    badgeColor: 'positive',
    badgeText: 'Signed & Sealed',
    cardPreview: 'Congratulations! Official Offer Received: AI Research Intern at IFS World (LKR 85,000 / mo). Placement recorded with your University Career Guidance Unit.'
  }
]

const employerSteps = [
  {
    number: '01',
    title: 'Post Roles in 3 Minutes',
    description: 'Publish your internship openings, set stipend ranges, specify target universities, and state mandatory skill requirements with zero friction.',
    highlights: ['Free initial postings for verified tech companies', 'Custom screening questionnaires', 'Direct Slack and email notifications'],
    cardIcon: 'post_add',
    cardLabel: 'Job Creator',
    badgeText: 'Instant Live',
    cardPreview: 'Post distributed automatically to over 18,500 active university undergraduates across Sri Lanka and regional campuses.'
  },
  {
    number: '02',
    title: 'Pre-Screened University Talent',
    description: 'Save hundreds of hours filtering through unqualified applications. Every student candidate has verified university credentials and academic transcripts.',
    highlights: ['Verified student identities', 'GitHub repo and portfolio previews', 'Automated technical ranking based on your criteria'],
    cardIcon: 'filter_alt',
    cardLabel: 'Talent Filter',
    badgeText: 'Top 5% Candidates',
    cardPreview: 'Smart filtering sorts candidates with verified Git contributions, high semester GPAs, and matching framework experience to the top.'
  },
  {
    number: '03',
    title: 'Direct Scheduling & Hiring',
    description: 'Schedule interviews directly through the platform, send test assignments, and issue formal digital offer letters in minutes.',
    highlights: ['Built-in calendar sync', 'Standardized feedback scoring', 'One-click digital offer dispatch'],
    cardIcon: 'handshake',
    cardLabel: 'Fast Hiring',
    badgeText: '48h Callback Average',
    cardPreview: 'Issue verified digital offer letters with electronic signature acceptance tracked in real time.'
  }
]

const faqs = [
  {
    q: 'Are all internships on InternSphere paid?',
    a: 'Yes, 100%! We strictly require all verified company partners on InternSphere to provide a guaranteed monthly stipend. Most tech roles in Sri Lanka range from LKR 65,000 to LKR 100,000+ per month.'
  },
  {
    q: 'How does university verification work?',
    a: 'Students sign in using their official university email (e.g., student@uom.lk, sliit.lk, iit.ac.lk). We cross-reference student enrollments to verify you are currently pursuing a degree program.'
  },
  {
    q: 'Can 1st and 2nd year undergraduates apply?',
    a: 'Yes! While most 6-month industrial placements are geared toward 3rd and 4th year students, many startups and tech firms offer summer part-time and apprentice programs open to 1st and 2nd year students.'
  },
  {
    q: 'What is the Kanban Application Tracker?',
    a: 'It is a personalized board inside your account that displays every role you have applied for, categorized into 4 stages: Applied, In Review, Interview Scheduled, and Offer Received. You will receive email/SMS notifications every time an employer updates your stage.'
  }
]
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

.bg-navy-light {
  background: rgba(255, 255, 255, 0.08);
}

.border-navy-light {
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.border-bottom-navy {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.border-light {
  border: 1px solid #e2e8f0;
}

.border-top-light {
  border-top: 1px solid #e2e8f0;
}

.border-bottom-light {
  border-bottom: 1px solid #f1f5f9;
}
</style>
