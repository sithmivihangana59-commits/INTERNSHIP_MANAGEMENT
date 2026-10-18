<template>
  <q-page class="bg-grey-1 q-pb-2xl">
    <!-- Header Banner -->
    <div class="page-header text-white q-py-xl border-bottom-navy">
      <div class="max-width-container q-px-md text-center">
        <q-badge color="blue-9" text-color="white" class="q-py-xs q-px-sm text-weight-bold q-mb-sm">
          <q-icon name="category" size="14px" class="q-mr-xs" /> 14 SPECIALIZATION TRACKS
        </q-badge>
        <h1 class="text-h3 font-display text-weight-bolder text-white q-my-none tracking-tight">
          Industry Career Pathways
        </h1>
        <p class="text-body1 text-grey-4 q-mt-sm q-mx-auto" style="max-width: 660px;">
          Explore in-demand industry sectors, average market stipends in Sri Lanka, and mandatory skill stacks for 2026.
        </p>
      </div>
    </div>

    <!-- Specializations Grid -->
    <div class="max-width-container q-px-md q-pt-xl">
      <div class="row q-col-gutter-lg">
        <div v-for="track in SPECIALIZATIONS" :key="track.id" class="col-12 col-md-6 col-lg-4">
          <q-card flat class="spec-card q-pa-lg bg-white border-light rounded-borders hover-card column justify-between" style="min-height: 380px;">
            <div>
              <!-- Top Row: Icon + Roles Count -->
              <div class="row items-center justify-between q-mb-md">
                <q-avatar :color="track.bg" :text-color="track.color" size="48px" rounded>
                  <q-icon :name="track.icon" size="26px" />
                </q-avatar>
                <div class="text-right">
                  <q-badge :color="track.demandColor" text-color="white" class="text-weight-bold q-mb-xs">
                    {{ track.demand }}
                  </q-badge>
                  <div class="text-caption text-weight-bold text-grey-7">{{ track.rolesCount }}</div>
                </div>
              </div>

              <!-- Title & Stipend -->
              <div class="text-h6 font-display text-weight-bold text-navy leading-tight">
                {{ track.title }}
              </div>
              <div class="row items-center q-mt-xs text-caption text-weight-bold text-positive">
                <q-icon name="payments" size="15px" class="q-mr-xs" />
                Avg. {{ track.avgStipend }}
              </div>

              <!-- Description -->
              <p class="text-caption text-grey-7 q-mt-sm leading-relaxed">
                {{ track.desc }}
              </p>

              <!-- In-Demand Skills -->
              <div class="q-mt-md">
                <div class="text-caption text-weight-bold text-grey-6 q-mb-xs">TOP REQUIRED SKILLS:</div>
                <div class="row q-gutter-xs">
                  <span v-for="skill in track.skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer Action Button -->
            <div class="q-pt-md q-mt-md border-top-light">
              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Browse Open Roles"
                icon-right="arrow_forward"
                class="full-width text-weight-bold rounded-borders shadow-1"
                :to="`/internships?category=${track.id}`"
              />
            </div>
          </q-card>
        </div>
      </div>

      <!-- Quick Comparison Section -->
      <div class="q-mt-2xl q-pt-xl border-top-light">
        <div class="text-center q-mb-lg">
          <q-badge color="green-1" text-color="positive" class="q-py-xs q-px-sm text-weight-bold">SALARY & STIPEND BENCHMARK</q-badge>
          <h2 class="text-h4 font-display text-weight-bolder text-navy q-my-xs tracking-tight">
            2026 Undergraduate Stipend Guide
          </h2>
          <p class="text-caption text-grey-6">Based on verified placement data across 450+ tech companies and corporate firms.</p>
        </div>

        <q-card flat class="bg-white rounded-borders border-light overflow-hidden">
          <q-markup-table flat separator="horizontal" class="text-caption">
            <thead class="bg-grey-2 text-weight-bold text-navy">
              <tr>
                <th class="text-left">Specialization Track</th>
                <th class="text-left">Typical Duration</th>
                <th class="text-left">Starting Monthly Stipend</th>
                <th class="text-left">Post-Internship Conversion</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-weight-bold text-navy">Software & Cloud Engineering</td>
                <td>6 Months</td>
                <td class="text-positive text-weight-bold">LKR 75,000 - 110,000</td>
                <td>88% to Associate SE</td>
                <td class="text-right">
                  <q-btn flat dense no-caps color="primary" label="View Roles" to="/internships?category=software" />
                </td>
              </tr>
              <tr>
                <td class="text-weight-bold text-navy">AI & Machine Learning</td>
                <td>6 Months</td>
                <td class="text-positive text-weight-bold">LKR 80,000 - 120,000</td>
                <td>82% to AI Engineer</td>
                <td class="text-right">
                  <q-btn flat dense no-caps color="primary" label="View Roles" to="/internships?category=data" />
                </td>
              </tr>
              <tr>
                <td class="text-weight-bold text-navy">UI/UX Product Design</td>
                <td>6 Months</td>
                <td class="text-positive text-weight-bold">LKR 70,000 - 95,000</td>
                <td>85% to Associate Designer</td>
                <td class="text-right">
                  <q-btn flat dense no-caps color="primary" label="View Roles" to="/internships?category=design" />
                </td>
              </tr>
              <tr>
                <td class="text-weight-bold text-navy">Business Analysis & Strategy</td>
                <td>6 - 12 Months</td>
                <td class="text-positive text-weight-bold">LKR 75,000 - 100,000</td>
                <td>90% to Associate BA</td>
                <td class="text-right">
                  <q-btn flat dense no-caps color="primary" label="View Roles" to="/internships?category=business" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { SPECIALIZATIONS } from '@/data/jobsData'
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

.border-top-light {
  border-top: 1px solid #e2e8f0;
}

.skill-tag {
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 6px;
}
</style>
