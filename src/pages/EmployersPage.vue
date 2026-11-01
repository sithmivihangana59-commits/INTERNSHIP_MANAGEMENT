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
      <q-card
        v-if="isEmployerReviewer"
        flat
        class="q-pa-lg bg-white border-light rounded-borders shadow-1 q-mb-lg"
      >
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-h6 font-display text-weight-bold text-navy">
              Existing Internship Posts
            </div>
            <div class="text-caption text-grey-6">
              Manage the internships posted by your account.
            </div>
          </div>
          <q-btn
            flat
            dense
            no-caps
            color="primary"
            icon="refresh"
            label="Refresh"
            :loading="loadingInternships"
            @click="loadEmployerInternships"
          />
        </div>

        <div v-if="loadingInternships" class="text-center q-py-lg">
          <q-spinner color="primary" size="36px" />
          <div class="text-caption text-grey-6 q-mt-sm">
            Loading your internship posts...
          </div>
        </div>
        <q-banner
          v-else-if="internshipLoadError"
          class="bg-red-1 text-negative rounded-borders"
        >
          {{ internshipLoadError }}
          <template #action>
            <q-btn flat label="Retry" @click="loadEmployerInternships" />
          </template>
        </q-banner>
        <div
          v-else-if="internships.length === 0"
          class="text-center text-grey-6 q-py-lg"
        >
          You have not posted any internships yet.
        </div>
        <div v-else class="q-gutter-y-md">
          <q-card
            v-for="internship in internships"
            :key="internship._id"
            flat
            bordered
            class="rounded-borders cursor-pointer"
            role="button"
            tabindex="0"
            @click="openInternshipDetails(internship)"
            @keydown.enter="openInternshipDetails(internship)"
            @keydown.space.prevent="openInternshipDetails(internship)"
          >
            <q-card-section>
              <div class="row items-start justify-between q-col-gutter-md">
                <div class="col">
                  <div class="text-subtitle1 text-weight-bold text-navy">
                    {{ internship.title }}
                  </div>
                  <div class="text-body2 text-grey-7">
                    {{ internship.company?.name || 'Company unavailable' }}
                    <span class="q-mx-xs">·</span>
                    {{
                      internship.category?.name || 'Specialization unavailable'
                    }}
                  </div>
                  <div
                    class="row q-gutter-x-md q-gutter-y-xs q-mt-xs text-caption text-grey-7"
                  >
                    <span>{{
                      internship.location || 'Location not specified'
                    }}</span>
                    <span>{{
                      internship.workMode || 'Work mode not specified'
                    }}</span>
                    <span>{{
                      internship.duration || 'Duration not specified'
                    }}</span>
                    <span>
                      {{
                        internship.salary?.amount != null
                          ? `${internship.salary.currency || 'LKR'} ${Number(internship.salary.amount).toLocaleString()} / ${internship.salary.period || 'month'}`
                          : 'Stipend not specified'
                      }}
                    </span>
                  </div>
                </div>
                <div class="col-auto column items-end q-gutter-y-sm">
                  <q-badge
                    :color="internship.isActive ? 'green-1' : 'grey-3'"
                    :text-color="internship.isActive ? 'green-9' : 'grey-8'"
                    :label="internship.isActive ? 'Active' : 'Inactive'"
                  />
                  <div class="row q-gutter-x-sm">
                    <q-btn
                      outline
                      dense
                      no-caps
                      color="primary"
                      icon="edit"
                      label="Edit"
                      :disable="
                        loadingPostOptions || Boolean(deletingInternshipId)
                      "
                      @click.stop="editInternship(internship)"
                    />
                    <q-btn
                      outline
                      dense
                      no-caps
                      color="negative"
                      icon="delete"
                      label="Delete"
                      :loading="deletingInternshipId === internship._id"
                      :disable="Boolean(deletingInternshipId)"
                      @click.stop="requestDeleteInternship(internship)"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card>

      <div class="row q-col-gutter-lg">
        <!-- ================================================= -->
        <!-- LEFT : POST INTERNSHIP -->
        <!-- ================================================= -->

        <div class="col-12 col-md-8">
          <q-card
            id="internship-form"
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
                  {{
                    editingInternshipId
                      ? 'Edit Internship'
                      : 'Create an internship'
                  }}
                </div>

                <div class="text-caption text-grey-6">
                  {{
                    editingInternshipId
                      ? 'Update the details for this internship post.'
                      : 'Add a few details to publish your opening.'
                  }}
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
                  <q-select
                    v-model="form.company"
                    dense
                    outlined
                    :options="companyOptions"
                    option-label="name"
                    option-value="_id"
                    emit-value
                    map-options
                    :loading="loadingPostOptions"
                    :disable="loadingPostOptions || companyOptions.length === 0"
                    label="Company Name"
                    placeholder="Select a registered company"
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
                  :label="
                    editingInternshipId
                      ? 'Update Internship'
                      : 'Publish Internship Opening'
                  "
                  :icon-right="editingInternshipId ? 'save' : 'rocket_launch'"
                  class="full-width text-weight-bold q-py-sm rounded-borders shadow-1"
                  :loading="postingJob"
                />
                <q-btn
                  v-if="editingInternshipId"
                  flat
                  no-caps
                  label="Cancel edit"
                  class="full-width q-mt-sm"
                  :disable="postingJob"
                  @click="cancelEdit"
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
                        :disable="!hasApplicantCv(application)"
                        @click="openResume(application)"
                      />
                      <q-btn
                        v-for="option in availableStatusOptions(application)"
                        :key="option.value"
                        dense
                        no-caps
                        :outline="option.value !== 'rejected'"
                        :color="
                          option.value === 'rejected' ? 'negative' : 'primary'
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
                {{
                  selectedApplication?.applicant?.email || 'Email not available'
                }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          v-if="selectedApplication?.applicant"
          class="q-gutter-y-sm"
        >
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

    <q-dialog v-model="showInternshipDetails">
      <q-card v-if="selectedInternship" style="width: 600px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6 text-weight-bold text-navy">
            {{ selectedInternship.title }}
          </div>
          <div class="text-body2 text-grey-7 q-mt-xs">
            {{ selectedInternship.company?.name || 'Company unavailable' }}
            <span class="q-mx-xs">·</span>
            {{
              selectedInternship.category?.name || 'Specialization unavailable'
            }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-y-sm">
          <div>
            <strong>Location:</strong>
            {{ selectedInternship.location || 'Not specified' }}
          </div>
          <div>
            <strong>Work mode:</strong>
            {{ selectedInternship.workMode || 'Not specified' }}
          </div>
          <div>
            <strong>Duration:</strong>
            {{ selectedInternship.duration || 'Not specified' }}
          </div>
          <div>
            <strong>Salary/Stipend:</strong>
            {{
              selectedInternship.salary?.amount != null
                ? `${selectedInternship.salary.currency || 'LKR'} ${Number(selectedInternship.salary.amount).toLocaleString()} / ${selectedInternship.salary.period || 'month'}`
                : 'Not specified'
            }}
          </div>
          <div>
            <strong>Skills:</strong>
            {{
              selectedInternship.skills?.length
                ? selectedInternship.skills.join(', ')
                : 'Not specified'
            }}
          </div>
          <div v-if="selectedInternship.requirements?.length">
            <strong>Requirements:</strong>
            <ul class="q-mt-xs q-mb-none">
              <li
                v-for="(requirement, index) in selectedInternship.requirements"
                :key="`${index}-${requirement}`"
              >
                {{ requirement }}
              </li>
            </ul>
          </div>
          <div v-if="selectedInternship.responsibilities?.length">
            <strong>Responsibilities:</strong>
            <ul class="q-mt-xs q-mb-none">
              <li
                v-for="(
                  responsibility, index
                ) in selectedInternship.responsibilities"
                :key="`${index}-${responsibility}`"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
          <div v-if="selectedInternship.applicationDeadline">
            <strong>Application deadline:</strong>
            {{ formatDate(selectedInternship.applicationDeadline) }}
          </div>
          <div>
            <strong>Description:</strong>
            <div class="q-mt-xs">
              {{ selectedInternship.description || 'Not specified' }}
            </div>
          </div>
          <div>
            <strong>Status:</strong>
            {{ selectedInternship.isActive ? 'Active' : 'Inactive' }}
          </div>
          <div>
            <strong>Posted date:</strong>
            {{ formatDate(selectedInternship.createdAt) }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            no-caps
            label="Close"
            @click="showInternshipDetails = false"
          />
          <q-btn
            outline
            no-caps
            color="primary"
            icon="edit"
            label="Edit"
            :disable="loadingPostOptions || Boolean(deletingInternshipId)"
            @click="editSelectedInternship"
          />
          <q-btn
            unelevated
            no-caps
            color="negative"
            icon="delete"
            label="Delete"
            :disable="Boolean(deletingInternshipId)"
            @click="deleteSelectedInternshipFromDetails"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete internship</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Are you sure you want to delete
          <strong>{{ internshipToDelete?.title }}</strong
          >?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            label="Cancel"
            :disable="Boolean(deletingInternshipId)"
            @click="showDeleteDialog = false"
          />
          <q-btn
            unelevated
            no-caps
            color="negative"
            label="Delete"
            :loading="Boolean(deletingInternshipId)"
            @click="deleteSelectedInternship"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { getAuthToken as readAuthToken, getAuthUser } from '../utils/auth.js'
import { hasApplicantCv, openApplicantCv } from '../utils/openApplicantCv.js'

import { ref, onMounted } from 'vue'

import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

// =====================================================
// QUASAR
// =====================================================

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

// =====================================================
// API
// =====================================================

const API_BASE_URL = 'http://localhost:5000/api'
const isEmployerReviewer = getAuthUser()?.role === 'employer'

// =====================================================
// CATEGORY OPTIONS
// =====================================================

const companyOptions = ref([])
const categoryOptions = ref([])
const employerCategoryLabels = [
  { name: 'Software & Cloud', label: 'Software & Cloud Engineering' },
  { name: 'AI & Data Science', label: 'AI & Data Science' },
  { name: 'UI/UX Design', label: 'UI/UX Product Design' },
  { name: 'Business & Finance', label: 'Business & Finance' }
]
const internships = ref([])
const selectedInternship = ref(null)
const showInternshipDetails = ref(false)
const loadingPostOptions = ref(false)
const loadingInternships = ref(true)
const internshipLoadError = ref('')
const editingInternshipId = ref('')
const deletingInternshipId = ref('')
const internshipToDelete = ref(null)
const showDeleteDialog = ref(false)

// =====================================================
// POST JOB FORM
// =====================================================

const form = ref({
  company: '',

  email: '',

  title: '',

  category: '',

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
// INTERNSHIP POSTS
// =====================================================

async function loadPostOptions() {
  loadingPostOptions.value = true
  try {
    const [companiesResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/companies?limit=100`),
      fetch(`${API_BASE_URL}/categories`)
    ])
    const [companiesResult, categoriesResult] = await Promise.all([
      companiesResponse.json(),
      categoriesResponse.json()
    ])

    if (!companiesResponse.ok || !companiesResult.success) {
      throw new Error(companiesResult.message || 'Unable to load companies.')
    }
    if (!categoriesResponse.ok || !categoriesResult.success) {
      throw new Error(categoriesResult.message || 'Unable to load categories.')
    }

    if (!Array.isArray(companiesResult.data)) {
      throw new Error('The companies response has an invalid format.')
    }

    const remainingCompanyPages = await Promise.all(
      Array.from(
        { length: Math.max(0, Number(companiesResult.pages) - 1) },
        async (_, index) => {
          const response = await fetch(
            `${API_BASE_URL}/companies?page=${index + 2}&limit=100`
          )
          const result = await response.json()
          if (!response.ok || !result.success || !Array.isArray(result.data)) {
            throw new Error(result.message || 'Unable to load companies.')
          }
          return result.data
        }
      )
    )
    companyOptions.value = [
      ...companiesResult.data,
      ...remainingCompanyPages.flat()
    ]
    categoryOptions.value = employerCategoryLabels.flatMap(
      ({ name, label }) => {
        const category = categoriesResult.data.find(item => item.name === name)
        return category ? [{ label, value: category._id }] : []
      }
    )

    if (!companyOptions.value.length || !categoryOptions.value.length) {
      throw new Error(
        'Companies and categories must be available before publishing an internship.'
      )
    }

    if (
      !categoryOptions.value.some(
        option => option.value === form.value.category
      )
    ) {
      form.value.category = categoryOptions.value[0]?.value || ''
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to load internship form options.',
      position: 'top',
      timeout: 5000
    })
  } finally {
    loadingPostOptions.value = false
  }
}

async function submitJobPost() {
  postingJob.value = true
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Please sign in to manage internships.')
    }

    if (
      !companyOptions.value.some(company => company._id === form.value.company)
    ) {
      throw new Error('Choose a company that is registered in the system.')
    }

    const stipendAmount = Number(
      String(form.value.stipend).replace(/[^\d.-]/g, '')
    )
    if (!Number.isFinite(stipendAmount) || stipendAmount < 0) {
      throw new Error('Enter a valid monthly stipend.')
    }

    const payload = {
      title: form.value.title.trim(),
      company: form.value.company,
      category: form.value.category,
      description: form.value.description.trim(),
      skills: form.value.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean),
      salary: {
        amount: stipendAmount,
        currency: 'LKR',
        period: 'month'
      },
      duration: form.value.duration,
      workMode: form.value.mode === '100% Remote' ? 'Remote' : form.value.mode,
      location: form.value.location.trim()
    }

    const isEditing = Boolean(editingInternshipId.value)
    const response = await fetch(
      isEditing
        ? `${API_BASE_URL}/internships/${editingInternshipId.value}`
        : `${API_BASE_URL}/internships`,
      {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
    const result = await response.json()

    if (!response.ok || !result.success || !result.data?._id) {
      throw new Error(
        result.message ||
          `Unable to ${isEditing ? 'update' : 'publish'} this internship.`
      )
    }

    await loadEmployerInternships()
    resetInternshipForm()
    $q.notify({
      type: 'positive',
      message: isEditing
        ? `Internship "${result.data.title}" updated successfully!`
        : `Internship for "${result.data.title}" published successfully!`,
      icon: 'check_circle',
      timeout: 3500
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to save this internship.',
      position: 'top',
      timeout: 5000
    })
  } finally {
    postingJob.value = false
  }
}

async function loadEmployerInternships() {
  loadingInternships.value = true
  internshipLoadError.value = ''
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Please sign in to view your internship posts.')
    }

    const response = await fetch(`${API_BASE_URL}/internships/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to load your internship posts.')
    }
    internships.value = result.data
  } catch (error) {
    internshipLoadError.value =
      error.message || 'Unable to load your internship posts.'
  } finally {
    loadingInternships.value = false
  }
}

function editInternship(internship) {
  editingInternshipId.value = internship._id
  form.value = {
    company: internship.company?._id || internship.company || '',
    email: getAuthUser()?.email || '',
    title: internship.title || '',
    category: internship.category?._id || internship.category || '',
    mode:
      internship.workMode === 'Remote'
        ? '100% Remote'
        : internship.workMode || 'Hybrid',
    location: internship.location || '',
    duration: internship.duration || '',
    stipend: String(internship.salary?.amount ?? ''),
    skills: Array.isArray(internship.skills)
      ? internship.skills.join(', ')
      : '',
    description: internship.description || ''
  }
  document.getElementById('internship-form')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function openInternshipDetails(internship) {
  selectedInternship.value = internship
  showInternshipDetails.value = true
}

function editSelectedInternship() {
  if (!selectedInternship.value) {
    return
  }

  const internship = selectedInternship.value
  showInternshipDetails.value = false
  editInternship(internship)
}

function deleteSelectedInternshipFromDetails() {
  if (!selectedInternship.value) {
    return
  }

  const internship = selectedInternship.value
  showInternshipDetails.value = false
  requestDeleteInternship(internship)
}

async function handleDashboardInternshipAction() {
  const action = route.query.internshipAction
  const internshipId = route.query.internshipId
  if (
    !['edit', 'delete'].includes(action) ||
    typeof internshipId !== 'string'
  ) {
    return
  }

  const internship = internships.value.find(item => item._id === internshipId)
  if (internship) {
    if (action === 'edit') {
      editInternship(internship)
    } else {
      requestDeleteInternship(internship)
    }
  } else {
    $q.notify({
      type: 'negative',
      message: internshipLoadError.value || 'Internship post not found.',
      position: 'top'
    })
  }

  const query = { ...route.query }
  delete query.internshipAction
  delete query.internshipId
  await router.replace({ path: route.path, query, hash: route.hash })
}

function resetInternshipForm() {
  editingInternshipId.value = ''
  form.value = {
    company: '',
    email: '',
    title: '',
    category: categoryOptions.value[0]?.value || '',
    mode: 'Hybrid',
    location: 'Colombo, Sri Lanka',
    duration: '6 Months',
    stipend: 'LKR 80,000 / mo',
    skills: 'React, Node.js, SQL',
    description: ''
  }
}

function cancelEdit() {
  if (!postingJob.value) {
    resetInternshipForm()
  }
}

function requestDeleteInternship(internship) {
  internshipToDelete.value = internship
  showDeleteDialog.value = true
}

async function deleteSelectedInternship() {
  if (!internshipToDelete.value) {
    return
  }

  const internshipId = internshipToDelete.value._id
  deletingInternshipId.value = internshipId
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('Please sign in to delete this internship.')
    }

    const response = await fetch(
      `${API_BASE_URL}/internships/${internshipId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to delete this internship.')
    }

    showDeleteDialog.value = false
    internshipToDelete.value = null
    if (editingInternshipId.value === internshipId) {
      resetInternshipForm()
    }
    await loadEmployerInternships()
    $q.notify({
      type: 'positive',
      message: 'Internship deleted successfully.',
      icon: 'check_circle'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to delete this internship.',
      position: 'top',
      timeout: 5000
    })
  } finally {
    deletingInternshipId.value = ''
  }
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
  status = availableStatusOptions(application)[0]?.value || application.status
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

onMounted(async () => {
  loadEmployerApplications()
  if (isEmployerReviewer) {
    await loadEmployerInternships()
  }
  loadPostOptions()
  if (isEmployerReviewer) {
    await handleDashboardInternshipAction()
  }
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
