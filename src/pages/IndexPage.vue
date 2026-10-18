<template>
  <q-page class="bg-grey-1">
    <!-- ================= HERO SECTION ================= -->
    <section class="hero-section q-pt-xl q-pb-xl relative-position">
      <div class="max-width-container q-px-md text-center">
        <!-- Eyebrow Pill -->
        <div class="row justify-center q-mb-md">
          <div
            class="row items-center q-gutter-x-sm bg-white q-px-md q-py-xs rounded-borders shadow-1 border-light"
          >
            <span class="pulse-dot"></span>
            <span class="text-caption text-weight-bold text-navy">
              Verified University & Corporate Network • Summer & Fall 2026
            </span>
          </div>
        </div>

        <!-- Headline -->
        <h1
          class="text-h3 sm:text-h2 font-display text-weight-bolder text-navy q-my-none tracking-tight leading-tight"
        >
          Launch Your Dream Career With <br class="gt-xs" />
          <span class="text-gradient">Verified Internships</span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-body1 text-grey-7 q-mt-md q-mb-xl q-mx-auto"
          style="max-width: 720px; line-height: 1.6"
        >
          The all-in-one platform for undergraduates, fresh graduates, and
          leading enterprises. Discover verified paid internships, apply with
          1-click, and track every stage in real-time.
        </p>

        <!-- Search Bar Card -->
        <q-card
          class="search-card q-pa-sm q-pa-md-md rounded-borders shadow-2 q-mx-auto border-light"
          style="max-width: 980px"
        >
          <div class="row q-col-gutter-sm items-center">
            <!-- Keyword -->
            <div class="col-12 col-sm-4">
              <q-input
                v-model="searchKeyword"
                dense
                outlined
                placeholder="Job title, skill, or company..."
                class="bg-grey-1 rounded-borders"
                @keyup.enter="handleSearch"
              >
                <template v-slot:prepend>
                  <q-icon name="search" color="grey-6" />
                </template>
              </q-input>
            </div>

            <!-- Category -->
            <div class="col-12 col-sm-3">
              <q-select
                v-model="selectedCategory"
                dense
                outlined
                :options="categoryOptions"
                emit-value
                map-options
                class="bg-grey-1 rounded-borders"
              >
                <template v-slot:prepend>
                  <q-icon name="work_outline" color="grey-6" />
                </template>
              </q-select>
            </div>

            <!-- Location -->
            <div class="col-12 col-sm-3">
              <q-select
                v-model="selectedLocation"
                dense
                outlined
                :options="locationOptions"
                emit-value
                map-options
                class="bg-grey-1 rounded-borders"
              >
                <template v-slot:prepend>
                  <q-icon name="place" color="grey-6" />
                </template>
              </q-select>
            </div>

            <!-- Submit Button -->
            <div class="col-12 col-sm-2">
              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Find Roles"
                icon-right="arrow_forward"
                class="full-width text-weight-bold rounded-borders q-py-sm shadow-1"
                @click="handleSearch"
              />
            </div>
          </div>

          <!-- Quick Filter Tags -->
          <div
            class="row items-center q-gutter-xs q-mt-sm q-pt-xs border-top-light text-caption"
          >
            <span
              class="text-weight-bold text-grey-7 q-mr-xs flex items-center"
            >
              <q-icon
                name="local_fire_department"
                color="warning"
                size="16px"
                class="q-mr-xs"
              />
              Popular:
            </span>
            <q-btn
              flat
              dense
              no-caps
              label="Software Engineer"
              class="quick-chip"
              @click="setTagFilter('Software Engineer')"
            />
            <q-btn
              flat
              dense
              no-caps
              label="React / Next.js"
              class="quick-chip"
              @click="setTagFilter('React')"
            />
            <q-btn
              flat
              dense
              no-caps
              label="Data Science"
              class="quick-chip"
              @click="setTagFilter('Data')"
            />
            <q-btn
              flat
              dense
              no-caps
              label="UI/UX Design"
              class="quick-chip"
              @click="setTagFilter('UI/UX')"
            />
            <q-btn
              flat
              dense
              no-caps
              label="💰 Paid Internships"
              class="quick-chip text-positive text-weight-bold"
              @click="setTagFilter('Paid')"
            />
          </div>
        </q-card>

        <!-- Metrics Counters -->
        <div
          class="row q-col-gutter-md q-mt-xl q-mx-auto"
          style="max-width: 860px"
        >
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-box q-pa-md text-center border-light">
              <div class="text-h5 text-weight-bolder text-navy font-display"
                >1,450+</div
              >
              <div class="text-caption text-grey-6">Active Internships</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-box q-pa-md text-center border-light">
              <div class="text-h5 text-weight-bolder text-primary font-display"
                >420+</div
              >
              <div class="text-caption text-grey-6">Vetted Tech Firms</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-box q-pa-md text-center border-light">
              <div class="text-h5 text-weight-bolder text-positive font-display"
                >96.8%</div
              >
              <div class="text-caption text-grey-6">Callback Rate</div>
            </q-card>
          </div>
          <div class="col-6 col-sm-3">
            <q-card flat class="stat-box q-pa-md text-center border-light">
              <div class="text-h5 text-weight-bolder text-navy font-display"
                >18,500+</div
              >
              <div class="text-caption text-grey-6">Students Placed</div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PARTNERS BAR ================= -->
    <section class="bg-white q-py-lg border-y-light">
      <div class="max-width-container q-px-md text-center">
        <div
          class="text-caption text-weight-bold text-grey-7 text-uppercase tracking-wider q-mb-md"
        >
          Partnering with Sri Lanka & Global Industry Leaders & Universities
        </div>
        <div
          class="row items-center justify-center q-gutter-x-xl q-gutter-y-md partner-row"
        >
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="deep-orange"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >W</q-avatar
            >
            <span>WSO2</span>
          </div>
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="purple"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >IFS</q-avatar
            >
            <span>IFS World</span>
          </div>
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="blue-9"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >V</q-avatar
            >
            <span>Virtusa</span>
          </div>
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="green-8"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >SL</q-avatar
            >
            <span>Sysco LABS</span>
          </div>
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="blue-10"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >L</q-avatar
            >
            <span>LSEG Tech</span>
          </div>
          <div
            class="row items-center text-weight-bold text-subtitle1 text-grey-8"
          >
            <q-avatar
              size="28px"
              color="red-8"
              text-color="white"
              rounded
              class="q-mr-xs text-caption"
              >D</q-avatar
            >
            <span>Dialog Axiata</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SPECIALIZATIONS / CATEGORIES ================= -->
    <section id="categories" class="q-py-xl bg-grey-1">
      <div class="max-width-container q-px-md">
        <div class="row items-end justify-between q-mb-lg">
          <div>
            <q-badge
              color="blue-1"
              text-color="primary"
              class="q-py-xs q-px-sm text-weight-bold"
            >
              EXPLORE BY FIELD
            </q-badge>
            <h2
              class="text-h4 text-weight-bolder text-navy font-display q-mt-xs q-mb-xs tracking-tight"
            >
              Popular Career Pathways
            </h2>
            <div class="text-caption text-grey-7"
              >Find curated opportunities aligned with your academic major and
              interests.</div
            >
          </div>
          <q-btn
            flat
            no-caps
            color="primary"
            label="Browse All 14 Tracks"
            icon-right="arrow_forward"
            to="/specializations"
          />
        </div>

        <div class="row q-col-gutter-md">
          <div
            v-for="cat in categoriesList"
            :key="cat.id"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card
              flat
              class="category-card q-pa-md cursor-pointer border-light hover-card"
              @click="filterByField(cat.filterKey)"
            >
              <div class="row items-center justify-between q-mb-sm">
                <q-avatar
                  :color="cat.bg"
                  :text-color="cat.color"
                  size="44px"
                  rounded
                >
                  <q-icon :name="cat.icon" size="24px" />
                </q-avatar>
                <span class="text-caption text-weight-bold text-grey-6">{{
                  cat.count
                }}</span>
              </div>
              <div
                class="text-subtitle1 text-weight-bold text-navy font-display"
                >{{ cat.title }}</div
              >
              <div
                class="text-caption text-grey-6 q-mt-xs"
                style="min-height: 38px"
                >{{ cat.desc }}</div
              >
              <div
                class="row items-center text-primary text-caption text-weight-bold q-mt-sm"
              >
                Explore <q-icon name="chevron_right" size="16px" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FEATURED INTERNSHIPS LISTING ================= -->
    <section id="featured-roles" class="q-py-xl bg-white border-y-light">
      <div class="max-width-container q-px-md">
        <div class="row items-end justify-between q-mb-lg">
          <div>
            <q-badge
              color="green-1"
              text-color="positive"
              class="q-py-xs q-px-sm text-weight-bold"
            >
              ● ACTIVELY RECRUITING
            </q-badge>
            <h2
              class="text-h4 text-weight-bolder text-navy font-display q-mt-xs q-mb-xs tracking-tight"
            >
              Featured Opportunities
            </h2>
            <div class="text-caption text-grey-7"
              >Verified corporate internships with competitive monthly
              stipends.</div
            >
          </div>

          <!-- Role Filter Tabs -->
          <div
            class="q-gutter-x-xs q-mt-sm q-mt-md-none bg-grey-2 q-pa-xs rounded-borders"
          >
            <q-btn
              v-for="tab in filterTabs"
              :key="tab.value"
              dense
              no-caps
              :label="tab.label"
              :class="[
                'q-px-sm',
                activeTab === tab.value
                  ? 'bg-white text-navy text-weight-bold shadow-1'
                  : 'text-grey-7 text-weight-medium'
              ]"
              @click="activeTab = tab.value"
            />
          </div>
        </div>

        <!-- Job Cards Grid -->
        <div class="row q-col-gutter-lg" v-if="filteredJobs.length > 0">
          <div
            v-for="job in filteredJobs"
            :key="job.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card
              flat
              class="job-card q-pa-lg border-light hover-card column justify-between"
              style="min-height: 340px"
            >
              <div>
                <!-- Company Header -->
                <div class="row items-center justify-between">
                  <div class="row items-center q-gutter-x-sm">
                    <q-avatar
                      :color="job.logoBg"
                      text-color="white"
                      size="42px"
                      rounded
                      class="text-weight-bold"
                    >
                      {{ job.logoText }}
                    </q-avatar>
                    <div>
                      <div class="text-subtitle2 text-weight-bold text-navy">{{
                        job.company
                      }}</div>
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

                <!-- Job Title & Snippet -->
                <div
                  class="text-subtitle1 text-weight-bold text-navy q-mt-md leading-tight"
                >
                  {{ job.title }}
                </div>
                <p class="text-caption text-grey-6 q-mt-xs text-ellipsis-2">
                  {{ job.description }}
                </p>

                <!-- Badges -->
                <div class="row items-center q-gutter-xs q-mt-sm">
                  <q-badge
                    color="green-1"
                    text-color="positive"
                    class="text-weight-bold q-py-xs"
                  >
                    <q-icon name="payments" size="13px" class="q-mr-xs" />
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

                <!-- Tech Skills -->
                <div class="row items-center q-gutter-xs q-mt-md">
                  <span
                    v-for="skill in job.skills"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Footer -->
              <div
                class="row items-center justify-between q-pt-md q-mt-md border-top-light"
              >
                <span class="text-caption text-grey-5">{{ job.deadline }}</span>
                <q-btn
                  unelevated
                  color="grey-9"
                  no-caps
                  label="Quick Apply"
                  icon-right="arrow_forward"
                  class="apply-btn text-weight-bold text-caption rounded-borders"
                  @click="openJobDetail(job)"
                />
              </div>
            </q-card>
          </div>
        </div>

        <!-- No Results Fallback -->
        <div v-else class="text-center q-py-xl">
          <q-avatar
            size="64px"
            color="grey-2"
            text-color="grey-5"
            class="q-mb-md"
          >
            <q-icon name="search_off" size="36px" />
          </q-avatar>
          <div class="text-h6 text-weight-bold text-navy"
            >No matching internships found</div
          >
          <div class="text-caption text-grey-6 q-mb-md"
            >Try modifying your keyword search or switching to "All Roles".</div
          >
          <q-btn
            unelevated
            color="primary"
            no-caps
            label="Reset Filters"
            @click="resetFilters"
          />
        </div>
      </div>
    </section>

    <!-- ================= LIVE APPLICATION TRACKER PREVIEW ================= -->
    <section id="tracker-preview" class="q-py-xl bg-grey-1">
      <div class="max-width-container q-px-md">
        <div
          class="text-center q-mb-xl"
          style="max-width: 680px; margin-left: auto; margin-right: auto"
        >
          <q-badge
            color="blue-1"
            text-color="primary"
            class="q-py-xs q-px-sm text-weight-bold"
          >
            TRANSPARENT RECRUITMENT PIPELINE
          </q-badge>
          <h2
            class="text-h4 text-weight-bolder text-navy font-display q-mt-xs q-mb-xs tracking-tight"
          >
            Never Wonder What Happened to Your Application
          </h2>
          <div class="text-body2 text-grey-7">
            Our interactive student Kanban board updates the exact stage of your
            application from initial HR review to technical interviews and
            formal offer letters.
          </div>
        </div>

        <!-- Kanban Board Preview Mockup -->
        <q-card
          flat
          class="q-pa-md q-pa-md-lg bg-white rounded-borders border-light shadow-2 q-mx-auto"
          style="max-width: 1040px"
        >
          <!-- Board Header -->
          <div
            class="row items-center justify-between q-pb-md border-bottom-light"
          >
            <div class="row items-center q-gutter-x-sm">
              <q-avatar
                color="primary"
                text-color="white"
                size="36px"
                class="text-weight-bold text-caption"
              >
                SK
              </q-avatar>
              <div>
                <div class="text-subtitle2 text-weight-bold text-navy"
                  >Sithmi Vihangana</div
                >
                <div class="text-caption text-grey-6"
                  >BSc (Hons) in Software Engineering • 3rd Year</div
                >
              </div>
            </div>
            <q-badge
              color="green-1"
              text-color="positive"
              class="text-weight-bold q-py-xs q-px-sm"
            >
              <q-icon name="verified" size="14px" class="q-mr-xs" /> Verified
              University Profile
            </q-badge>
          </div>

          <!-- 4 Kanban Columns -->
          <div class="row q-col-gutter-md q-pt-md">
            <!-- Col 1: Applied -->
            <div class="col-12 col-sm-6 col-md-3">
              <div class="kanban-col q-pa-sm bg-grey-2 rounded-borders">
                <div class="row items-center justify-between q-px-xs q-mb-sm">
                  <span class="text-caption text-weight-bold text-grey-8"
                    >APPLIED</span
                  >
                  <q-badge color="grey-4" text-color="grey-9" class="text-bold"
                    >2</q-badge
                  >
                </div>
                <div class="q-gutter-y-sm">
                  <q-card flat class="q-pa-sm bg-white border-light">
                    <q-badge
                      color="orange-1"
                      text-color="deep-orange"
                      class="text-bold"
                      >WSO2</q-badge
                    >
                    <div class="text-caption text-weight-bold text-navy q-mt-xs"
                      >SE Intern (Cloud)</div
                    >
                    <div
                      class="text-caption text-grey-5"
                      style="font-size: 11px"
                      >Applied 2 days ago</div
                    >
                  </q-card>
                  <q-card flat class="q-pa-sm bg-white border-light">
                    <q-badge
                      color="blue-1"
                      text-color="blue-9"
                      class="text-bold"
                      >Virtusa</q-badge
                    >
                    <div class="text-caption text-weight-bold text-navy q-mt-xs"
                      >DevOps Intern</div
                    >
                    <div
                      class="text-caption text-grey-5"
                      style="font-size: 11px"
                      >Applied 4 days ago</div
                    >
                  </q-card>
                </div>
              </div>
            </div>

            <!-- Col 2: In Review -->
            <div class="col-12 col-sm-6 col-md-3">
              <div class="kanban-col q-pa-sm bg-blue-1 rounded-borders">
                <div class="row items-center justify-between q-px-xs q-mb-sm">
                  <span class="text-caption text-weight-bold text-primary"
                    >IN REVIEW</span
                  >
                  <q-badge color="blue-2" text-color="blue-9" class="text-bold"
                    >1</q-badge
                  >
                </div>
                <div class="q-gutter-y-sm">
                  <q-card flat class="q-pa-sm bg-white border-light">
                    <q-badge
                      color="green-1"
                      text-color="green-8"
                      class="text-bold"
                      >Sysco LABS</q-badge
                    >
                    <div class="text-caption text-weight-bold text-navy q-mt-xs"
                      >UI/UX Design Intern</div
                    >
                    <div
                      class="text-caption text-warning text-weight-bold q-mt-xs"
                      style="font-size: 11px"
                    >
                      Portfolio Reviewed by Design Lead
                    </div>
                  </q-card>
                </div>
              </div>
            </div>

            <!-- Col 3: Interview -->
            <div class="col-12 col-sm-6 col-md-3">
              <div class="kanban-col q-pa-sm bg-purple-1 rounded-borders">
                <div class="row items-center justify-between q-px-xs q-mb-sm">
                  <span class="text-caption text-weight-bold text-purple-9"
                    >INTERVIEW</span
                  >
                  <q-badge
                    color="purple-2"
                    text-color="purple-9"
                    class="text-bold"
                    >1</q-badge
                  >
                </div>
                <div class="q-gutter-y-sm">
                  <q-card flat class="q-pa-sm bg-white border-light">
                    <q-badge
                      color="blue-1"
                      text-color="blue-10"
                      class="text-bold"
                      >LSEG</q-badge
                    >
                    <div class="text-caption text-weight-bold text-navy q-mt-xs"
                      >Business Analyst</div
                    >
                    <div
                      class="q-mt-xs q-pa-xs bg-purple-1 rounded-borders text-purple-9 text-caption"
                      style="font-size: 11px"
                    >
                      <q-icon name="video_camera_front" size="14px" /> Round 2:
                      Tomorrow 10:30 AM
                    </div>
                  </q-card>
                </div>
              </div>
            </div>

            <!-- Col 4: Offer -->
            <div class="col-12 col-sm-6 col-md-3">
              <div class="kanban-col q-pa-sm bg-green-1 rounded-borders">
                <div class="row items-center justify-between q-px-xs q-mb-sm">
                  <span class="text-caption text-weight-bold text-positive"
                    >OFFER RECEIVED 🎉</span
                  >
                  <q-badge
                    color="green-2"
                    text-color="green-9"
                    class="text-bold"
                    >1</q-badge
                  >
                </div>
                <div class="q-gutter-y-sm">
                  <q-card flat class="q-pa-sm bg-white border-light">
                    <q-badge
                      color="purple-1"
                      text-color="purple"
                      class="text-bold"
                      >IFS World</q-badge
                    >
                    <div class="text-caption text-weight-bold text-navy q-mt-xs"
                      >AI Research Intern</div
                    >
                    <div
                      class="text-caption text-positive text-weight-bolder q-mt-xs"
                    >
                      LKR 85,000 / mo • Accepted
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </section>

    <!-- ================= HOW IT WORKS ================= -->
    <section id="how-it-works" class="q-py-xl bg-white border-y-light">
      <div class="max-width-container q-px-md">
        <div
          class="text-center q-mb-xl"
          style="max-width: 600px; margin-left: auto; margin-right: auto"
        >
          <q-badge
            color="blue-1"
            text-color="primary"
            class="q-py-xs q-px-sm text-weight-bold"
          >
            SIMPLE 4-STEP WORKFLOW
          </q-badge>
          <h2
            class="text-h4 text-weight-bolder text-navy font-display q-mt-xs q-mb-xs tracking-tight"
          >
            How InternSphere Works
          </h2>
          <div class="text-caption text-grey-7"
            >From profile registration to receiving your signed offer
            letter.</div
          >
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="step in stepsList"
            :key="step.number"
            class="col-12 col-sm-6 col-md-3 text-center"
          >
            <div
              class="step-badge q-mx-auto q-mb-md text-h6 font-display text-weight-bolder"
              :class="step.color"
            >
              {{ step.number }}
            </div>
            <div
              class="text-subtitle1 text-weight-bold text-navy font-display"
              >{{ step.title }}</div
            >
            <p
              class="text-caption text-grey-6 q-mt-xs q-mx-auto"
              style="max-width: 220px"
            >
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= TESTIMONIALS ================= -->
    <section class="q-py-xl bg-grey-1">
      <div class="max-width-container q-px-md">
        <div class="text-center q-mb-xl">
          <q-badge
            color="green-1"
            text-color="positive"
            class="q-py-xs q-px-sm text-weight-bold"
          >
            STUDENT SUCCESS
          </q-badge>
          <h2
            class="text-h4 text-weight-bolder text-navy font-display q-mt-xs q-mb-xs tracking-tight"
          >
            Hear From Undergraduates Who Landed Roles
          </h2>
        </div>

        <div class="row q-col-gutter-md">
          <div
            v-for="story in storiesList"
            :key="story.name"
            class="col-12 col-md-4"
          >
            <q-card
              flat
              class="q-pa-lg bg-white border-light rounded-borders column justify-between"
              style="min-height: 240px"
            >
              <div>
                <div class="row q-gutter-x-xs q-mb-sm text-amber">
                  <q-icon name="star" size="18px" v-for="i in 5" :key="i" />
                </div>
                <p class="text-body2 text-grey-8 leading-normal">
                  "{{ story.quote }}"
                </p>
              </div>
              <div
                class="row items-center q-gutter-x-sm q-pt-md border-top-light"
              >
                <q-avatar
                  :color="story.avatarBg"
                  text-color="white"
                  size="36px"
                  class="text-weight-bold text-caption"
                >
                  {{ story.avatar }}
                </q-avatar>
                <div>
                  <div class="text-caption text-weight-bold text-navy">{{
                    story.name
                  }}</div>
                  <div
                    class="text-caption text-grey-6"
                    style="font-size: 11px"
                    >{{ story.role }}</div
                  >
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= EMPLOYER CTA BANNER ================= -->
    <section id="post-job" class="q-py-xl bg-navy text-white">
      <div class="max-width-container q-px-md">
        <div
          class="cta-banner q-pa-lg q-pa-md-xl rounded-borders row items-center justify-between"
        >
          <div class="col-12 col-md-8">
            <q-badge
              color="blue-9"
              text-color="white"
              class="q-py-xs q-px-sm text-weight-bold q-mb-sm"
            >
              FOR TECH COMPANIES & RECRUITERS
            </q-badge>
            <h2
              class="text-h4 text-weight-bolder text-white font-display q-mt-xs q-mb-xs tracking-tight"
            >
              Hire Top 5% University Interns & Graduates
            </h2>
            <p class="text-body2 text-grey-4 q-mt-sm" style="max-width: 600px">
              Post your internship openings in less than 5 minutes. Tap into
              pre-screened talent pools from top engineering, business, and
              design faculties.
            </p>
            <div class="row q-gutter-x-md text-caption text-grey-4 q-mt-md">
              <span class="flex items-center"
                ><q-icon
                  name="check_circle"
                  color="positive"
                  size="16px"
                  class="q-mr-xs"
                />
                Zero Posting Fee for First 3 Roles</span
              >
              <span class="flex items-center"
                ><q-icon
                  name="check_circle"
                  color="positive"
                  size="16px"
                  class="q-mr-xs"
                />
                Verified University Credentials</span
              >
            </div>
          </div>
          <div
            class="col-12 col-md-4 text-center text-md-right q-mt-lg q-mt-md-none"
          >
            <q-btn
              unelevated
              color="primary"
              no-caps
              label="Post An Internship Role"
              class="text-weight-bold q-px-lg q-py-sm rounded-borders shadow-2"
              @click="openEmployerPost"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= JOB DETAIL & QUICK APPLY MODAL ================= -->
    <q-dialog v-model="showJobModal">
      <q-card
        style="min-width: 360px; max-width: 600px"
        class="rounded-borders"
        v-if="selectedJob"
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="row items-center q-gutter-x-sm">
            <q-avatar
              :color="selectedJob.logoBg"
              text-color="white"
              size="40px"
              rounded
              class="text-weight-bold"
            >
              {{ selectedJob.logoText }}
            </q-avatar>
            <div>
              <div
                class="text-subtitle1 text-weight-bold text-navy leading-tight"
                >{{ selectedJob.title }}</div
              >
              <div class="text-caption text-grey-6"
                >{{ selectedJob.company }} • {{ selectedJob.location }}</div
              >
            </div>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <!-- Summary Strip -->
          <div
            class="row text-center q-py-sm bg-grey-2 rounded-borders border-light q-mb-md"
          >
            <div class="col-4">
              <div class="text-caption text-grey-6" style="font-size: 11px"
                >STIPEND</div
              >
              <div class="text-caption text-weight-bolder text-positive">{{
                selectedJob.stipend
              }}</div>
            </div>
            <div class="col-4 border-x-light">
              <div class="text-caption text-grey-6" style="font-size: 11px"
                >DURATION</div
              >
              <div class="text-caption text-weight-bold text-navy">{{
                selectedJob.duration
              }}</div>
            </div>
            <div class="col-4">
              <div class="text-caption text-grey-6" style="font-size: 11px"
                >WORK MODE</div
              >
              <div class="text-caption text-weight-bold text-primary">{{
                selectedJob.mode
              }}</div>
            </div>
          </div>

          <div class="text-subtitle2 text-weight-bold text-navy q-mb-xs"
            >Role Overview</div
          >
          <p class="text-caption text-grey-7 leading-normal">{{
            selectedJob.description
          }}</p>

          <div class="text-subtitle2 text-weight-bold text-navy q-mt-md q-mb-xs"
            >Prerequisites & Skills</div
          >
          <ul class="text-caption text-grey-7 q-pl-md q-my-none">
            <li
              v-for="req in selectedJob.requirements"
              :key="req"
              class="q-mb-xs"
              >{{ req }}</li
            >
          </ul>

          <!-- Quick 1-Click Apply Form -->
          <div class="bg-blue-1 q-pa-md rounded-borders border-light q-mt-md">
            <div
              class="text-subtitle2 text-weight-bold text-primary flex items-center q-mb-sm"
            >
              <q-icon name="send" size="16px" class="q-mr-xs" /> Quick
              Application Form
            </div>
            <div class="q-gutter-y-sm">
              <q-input
                v-model="applyName"
                dense
                outlined
                bg-color="white"
                label="Full Name"
                placeholder="Sithmi Vihangana"
              />
              <q-input
                v-model="applyEmail"
                dense
                outlined
                bg-color="white"
                label="University Email"
                placeholder="name@students.lk"
              />
              <q-input
                v-model="applyCv"
                dense
                outlined
                bg-color="white"
                label="CV / LinkedIn URL"
                placeholder="https://linkedin.com/in/..."
              />
              <q-btn
                unelevated
                color="primary"
                no-caps
                label="Submit Internship Application"
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Search filters
const searchKeyword = ref('')
const selectedCategory = ref('all')
const selectedLocation = ref('all')
const activeTab = ref('all')

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Software & Engineering', value: 'software' },
  { label: 'AI & Data Science', value: 'data' },
  { label: 'UI/UX Design', value: 'design' },
  { label: 'Business Analysis', value: 'business' }
]

const locationOptions = [
  { label: 'All Locations / Modes', value: 'all' },
  { label: 'Colombo, Sri Lanka', value: 'colombo' },
  { label: 'Hybrid Mode', value: 'hybrid' },
  { label: '100% Remote', value: 'remote' }
]

const filterTabs = [
  { label: 'All Roles (6)', value: 'all' },
  { label: 'Software & Cloud (3)', value: 'software' },
  { label: 'Data & AI (1)', value: 'data' },
  { label: 'UI/UX Design (1)', value: 'design' },
  { label: 'Business (1)', value: 'business' }
]

const categoriesList = [
  {
    id: 1,
    title: 'Software & Cloud',
    filterKey: 'software',
    count: '480+ Roles',
    desc: 'Full-stack, Java, React, Microservices, Node & Cloud Infra.',
    icon: 'code',
    bg: 'blue-1',
    color: 'primary'
  },
  {
    id: 2,
    title: 'AI & Data Science',
    filterKey: 'data',
    count: '195+ Roles',
    desc: 'Machine Learning, PyTorch, Data Analysis & Big Data.',
    icon: 'psychology',
    bg: 'green-1',
    color: 'positive'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    filterKey: 'design',
    count: '140+ Roles',
    desc: 'Figma prototypes, User Research, and Design Systems.',
    icon: 'palette',
    bg: 'purple-1',
    color: 'purple'
  },
  {
    id: 4,
    title: 'Business & Finance',
    filterKey: 'business',
    count: '220+ Roles',
    desc: 'Business Analysis, Agile Sprint Stories, & Strategy.',
    icon: 'trending_up',
    bg: 'amber-1',
    color: 'warning'
  },
  {
    id: 5,
    title: 'DevOps & Systems',
    filterKey: 'software',
    count: '95+ Roles',
    desc: 'CI/CD, Kubernetes, Docker, and AWS/Azure Infra.',
    icon: 'cloud_sync',
    bg: 'cyan-1',
    color: 'cyan-9'
  },
  {
    id: 6,
    title: 'QA & Cybersecurity',
    filterKey: 'software',
    count: '110+ Roles',
    desc: 'Test automation, Selenium, InfoSec, and Pen-testing.',
    icon: 'security',
    bg: 'red-1',
    color: 'negative'
  },
  {
    id: 7,
    title: 'Fintech & Banking',
    filterKey: 'business',
    count: '85+ Roles',
    desc: 'Capital markets, risk analysis, and treasury systems.',
    icon: 'account_balance',
    bg: 'teal-1',
    color: 'teal-9'
  },
  {
    id: 8,
    title: 'Product & Growth',
    filterKey: 'business',
    count: '165+ Roles',
    desc: 'Digital marketing, user acquisition, and branding.',
    icon: 'campaign',
    bg: 'indigo-1',
    color: 'indigo-9'
  }
]

const jobsList = ref([
  {
    id: 'wso2-se',
    company: 'WSO2 LLC',
    logoText: 'W',
    logoBg: 'deep-orange',
    title: 'Associate Software Engineer Intern',
    location: 'Colombo 03 • Hybrid',
    category: 'software',
    stipend: 'LKR 80,000 / mo',
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 4 days',
    isBookmarked: false,
    skills: ['Java', 'React', 'Docker', 'Ballerina'],
    description:
      'Join the API Management platform team. Work on distributed microservices, Ballerina runtime, and high-performance cloud endpoints.',
    requirements: [
      'Undergraduate in Computer Science, Software Engineering, or IT.',
      'Strong foundations in Java, OOP, and data structures.',
      'Experience with REST APIs and containerization (Docker).',
      'Eager to contribute to open-source software projects.'
    ]
  },
  {
    id: 'ifs-ai',
    company: 'IFS World',
    logoText: 'IFS',
    logoBg: 'purple',
    title: 'AI & Machine Learning Intern',
    location: 'Colombo 01 • On-Site',
    category: 'data',
    stipend: 'LKR 85,000 / mo',
    duration: '6 Months',
    mode: 'On-Site',
    deadline: 'Closes in 6 days',
    isBookmarked: false,
    skills: ['Python', 'PyTorch', 'FastAPI', 'Pandas'],
    description:
      'Collaborate with the industrial AI research group to implement predictive maintenance models and generative search pipelines.',
    requirements: [
      'Undergraduate in AI, Data Science, or Mathematics.',
      'Proficiency in Python and deep learning libraries (PyTorch).',
      'Knowledge of LLMs, vector search, or statistical modeling.',
      'Solid analytical reasoning and presentation skills.'
    ]
  },
  {
    id: 'sysco-ux',
    company: 'Sysco LABS',
    logoText: 'SL',
    logoBg: 'green-8',
    title: 'UI/UX Product Design Intern',
    location: 'Colombo 03 • Hybrid',
    category: 'design',
    stipend: 'LKR 75,000 / mo',
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 8 days',
    isBookmarked: false,
    skills: ['Figma', 'Wireframing', 'Design Systems', 'Testing'],
    description:
      'Design intuitive enterprise supply chain workflows. Create prototypes in Figma, conduct user tests, and refine design system components.',
    requirements: [
      'Degree in Design, HCI, Multimedia, or related computing field.',
      'Strong Figma proficiency including interactive prototyping.',
      'Portfolio showcasing wireframes and user journey maps.',
      'Familiarity with design tokens and accessibility guidelines.'
    ]
  },
  {
    id: 'virtusa-devops',
    company: 'Virtusa',
    logoText: 'V',
    logoBg: 'blue-9',
    title: 'DevOps & Cloud Engineering Intern',
    location: 'Colombo 07 • Hybrid',
    category: 'software',
    stipend: 'LKR 75,000 / mo',
    duration: '6 Months',
    mode: 'Hybrid',
    deadline: 'Closes in 5 days',
    isBookmarked: false,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
    description:
      'Support CI/CD pipelines, Kubernetes clusters, and automated infrastructure deployments on AWS and Azure.',
    requirements: [
      'Undergraduate in Computer Science, Systems, or Networking.',
      'Understanding of Linux OS and shell scripting.',
      'Basic hands-on experience with Docker and GitHub Actions.',
      'Curiosity for cloud architectures and automation.'
    ]
  },
  {
    id: 'lseg-ba',
    company: 'London Stock Exchange Group',
    logoText: 'LSEG',
    logoBg: 'blue-10',
    title: 'Trainee Business Analyst',
    location: 'Colombo 02 • Hybrid',
    category: 'business',
    stipend: 'LKR 90,000 / mo',
    duration: '1 Year Trainee',
    mode: 'Hybrid',
    deadline: 'Closes in 7 days',
    isBookmarked: false,
    skills: ['Agile', 'JIRA', 'SQL', 'UML'],
    description:
      'Gather business requirements, write Agile user stories, and evaluate high-volume capital market trading systems.',
    requirements: [
      'Final year student or graduate in Business IT, CS, or Finance.',
      'Exceptional written documentation and stakeholder communication.',
      'Knowledge of SDLC and Agile scrum workflows.',
      'Experience with SQL queries and BPMN diagrams.'
    ]
  },
  {
    id: 'nova-fe',
    company: 'Nova Global Labs',
    logoText: 'N',
    logoBg: 'teal-8',
    title: 'Frontend React & Next.js Intern',
    location: 'Remote • Global Team',
    category: 'software',
    stipend: '$350 USD / mo',
    duration: '6 Months',
    mode: '100% Remote',
    deadline: 'Closes in 3 days',
    isBookmarked: false,
    skills: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    description:
      'Build fast, responsive user interfaces using Next.js 14, Tailwind CSS, TypeScript, and state management libraries.',
    requirements: [
      'Strong JavaScript (ES6+), TypeScript, and modern CSS.',
      'Experience building interactive SPAs with React.js.',
      'Familiarity with Git and remote asynchronous team setups.',
      'Passionate about UI performance and clean component design.'
    ]
  }
])

// Filtered Jobs Computed
const filteredJobs = computed(() => {
  return jobsList.value.filter(job => {
    const matchesKeyword =
      !searchKeyword.value ||
      job.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      job.skills.some(s =>
        s.toLowerCase().includes(searchKeyword.value.toLowerCase())
      )

    const matchesCategory =
      selectedCategory.value === 'all' ||
      job.category === selectedCategory.value

    const matchesLocation =
      selectedLocation.value === 'all' ||
      (selectedLocation.value === 'colombo' &&
        job.location.toLowerCase().includes('colombo')) ||
      (selectedLocation.value === 'hybrid' &&
        job.mode.toLowerCase().includes('hybrid')) ||
      (selectedLocation.value === 'remote' &&
        job.mode.toLowerCase().includes('remote'))

    const matchesTab =
      activeTab.value === 'all' || job.category === activeTab.value

    return matchesKeyword && matchesCategory && matchesLocation && matchesTab
  })
})

// Quick tag buttons
function setTagFilter(tag) {
  if (tag === 'Paid') {
    searchKeyword.value = ''
    selectedCategory.value = 'all'
    activeTab.value = 'all'
    $q.notify({
      type: 'info',
      message: 'Showing all roles with guaranteed stipends.',
      icon: 'payments'
    })
  } else {
    searchKeyword.value = tag
    $q.notify({
      type: 'info',
      message: `Filtered by: "${tag}"`,
      icon: 'filter_alt'
    })
  }
}

function filterByField(fieldKey) {
  activeTab.value = fieldKey
  const target = document.getElementById('featured-roles')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleSearch() {
  const target = document.getElementById('featured-roles')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

function resetFilters() {
  searchKeyword.value = ''
  selectedCategory.value = 'all'
  selectedLocation.value = 'all'
  activeTab.value = 'all'
}

function toggleBookmark(job) {
  job.isBookmarked = !job.isBookmarked
  $q.notify({
    type: job.isBookmarked ? 'positive' : 'info',
    message: job.isBookmarked
      ? `"${job.title}" saved to your profile! 📌`
      : 'Role removed from saved list.',
    icon: job.isBookmarked ? 'bookmark' : 'bookmark_border'
  })
}

// Modal logic
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
    message:
      '🎉 Application submitted successfully! Added to your live Kanban pipeline.',
    icon: 'check_circle',
    timeout: 3500
  })
}

function openEmployerPost() {
  $q.notify({
    type: 'info',
    message: 'Opening Employer Portal...',
    icon: 'business'
  })
}

// Steps & Stories Data
const stepsList = [
  {
    number: '01',
    title: 'Create Profile',
    desc: 'Upload your CV and link GitHub / portfolio in under 3 minutes.',
    color: 'bg-blue-1 text-primary'
  },
  {
    number: '02',
    title: 'Smart Match',
    desc: 'Algorithm matches your skills with vetted enterprise openings.',
    color: 'bg-blue-1 text-primary'
  },
  {
    number: '03',
    title: '1-Click Apply',
    desc: 'Submit applications directly to verified tech leads and HR managers.',
    color: 'bg-blue-1 text-primary'
  },
  {
    number: '04',
    title: 'Interview & Offer',
    desc: 'Track interview stages and accept your verified corporate offer.',
    color: 'bg-green-1 text-positive'
  }
]

const storiesList = [
  {
    name: 'Dulaksha Perera',
    role: 'SE Intern at WSO2 • Moratuwa Uni',
    avatar: 'DP',
    avatarBg: 'primary',
    quote:
      'I applied to 3 companies through InternSphere, and within 48 hours I had an interview invitation from WSO2. The Kanban application tracker kept me totally calm and organized!'
  },
  {
    name: 'Amasha Madurasinghe',
    role: 'UI/UX Intern at Sysco LABS • SLIIT',
    avatar: 'AM',
    avatarBg: 'purple',
    quote:
      'Finding paid design internships in Sri Lanka used to be painful. InternSphere made it easy to filter by stipend and see exactly what each tech team looks for.'
  },
  {
    name: 'Kavindu Nimsara',
    role: 'Data Science Trainee at IFS • UCSC',
    avatar: 'KN',
    avatarBg: 'positive',
    quote:
      'As an undergraduate, having verified credentials directly from our university department allowed my resume to get prioritized by top enterprise recruiters.'
  }
]
</script>

<style scoped lang="scss">
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.hero-section {
  padding-top: 48px;
  padding-bottom: 72px;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(239, 246, 255, 0.4) 50%,
    #f8fafc 100%
  );
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 1.8s infinite;
  display: inline-block;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.text-gradient {
  background: linear-gradient(90deg, #2563eb, #1d4ed8, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-card {
  background: #ffffff;
  border-radius: 16px;
}

.stat-box {
  background: #ffffff;
  border-radius: 12px;
}

.border-light {
  border: 1px solid #e2e8f0;
}

.border-y-light {
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.border-top-light {
  border-top: 1px solid #f1f5f9;
}

.border-bottom-light {
  border-bottom: 1px solid #f1f5f9;
}

.border-x-light {
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
}

.partner-row {
  opacity: 0.85;
  filter: grayscale(20%);
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    filter: grayscale(0%);
  }
}

.category-card {
  border-radius: 16px;
  background: #ffffff;
}

.job-card {
  border-radius: 16px;
  background: #ffffff;
}

.skill-tag {
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 6px;
}

.quick-chip {
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 11px;
  color: #475569;
  padding: 2px 8px;

  &:hover {
    background: #e0e7ff;
    color: #2563eb;
  }
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.step-badge {
  width: 56px;
  height: 56px;
  line-height: 56px;
  border-radius: 16px;
}

.cta-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.apply-btn {
  transition: all 0.2s;

  &:hover {
    background-color: #2563eb !important;
  }
}
</style>
