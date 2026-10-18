<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-1">
    <!-- ==================== HEADER ==================== -->
    <q-header elevated class="bg-white text-grey-9 header-border">
      <!-- Top Announcement -->
      <div class="top-announcement-bar text-white q-py-xs q-px-md">
        <div class="row items-center justify-between max-width-container">
          <div class="row items-center q-gutter-x-sm text-caption">
            <q-badge
              color="positive"
              rounded
              class="q-py-none text-weight-bold"
            >
              <q-icon
                name="fiber_manual_record"
                size="10px"
                class="q-mr-xs text-white"
              />
              LIVE
            </q-badge>

            <span class="gt-xs text-grey-4">
              2026 Undergraduate & Graduate Internship Intake is now open across
              top companies!
            </span>

            <span class="lt-sm text-grey-4"> 2026 Internships are Live! </span>
          </div>

          <div class="row items-center q-gutter-x-md text-caption text-grey-3">
            <router-link
              :to="
                loggedUser?.role === 'employer'
                  ? '/employer/candidates'
                  : '/internships'
              "
              class="text-white text-weight-medium flex items-center hover-underline"
            >
              {{ loggedUser?.role === 'employer' ? 'Find Candidates' : 'Explore Roles' }}
              <q-icon name="arrow_forward" size="14px" class="q-ml-xs" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Toolbar -->
      <q-toolbar class="max-width-container q-py-sm">
        <!-- Logo -->
        <div
          class="row items-center cursor-pointer q-mr-lg"
          @click="$router.push('/')"
        >
          <q-avatar
            size="42px"
            class="bg-primary text-white shadow-2 q-mr-sm"
            rounded
          >
            <q-icon name="school" size="24px" />
          </q-avatar>

          <div>
            <div class="row items-center">
              <span
                class="text-h6 text-weight-bolder text-navy font-display tracking-tight"
              >
                Intern<span class="text-primary">Sphere</span>
              </span>

              <q-badge
                color="blue-1"
                text-color="primary"
                class="q-ml-xs text-bold"
                label="PRO"
              />
            </div>

            <div
              class="text-caption text-grey-6 text-weight-medium"
              style="font-size: 11px; margin-top: -3px"
            >
              Career & Internship Gateway
            </div>
          </div>
        </div>

        <q-space />

        <!-- Desktop Navigation -->
        <div class="gt-sm row items-center q-gutter-x-xs">
          <q-btn
            flat
            no-caps
            :label="loggedUser ? 'Dashboard' : 'Home'"
            :to="dashboardPath"
            exact
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />

          <q-btn
            v-if="
              loggedUser?.role === 'student' ||
              loggedUser?.role === 'admin'
            "
            flat
            no-caps
            label="Find Internships"
            to="/internships"
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />

          <q-btn
            v-if="loggedUser?.role === 'employer'"
            flat
            no-caps
            label="Find Candidates"
            to="/employer/candidates"
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />

          <q-btn
            v-if="
              loggedUser?.role === 'student' || loggedUser?.role === 'admin'
            "
            flat
            no-caps
            label="Specializations"
            to="/specializations"
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />

          <q-btn
            v-if="loggedUser?.role === 'student'"
            flat
            no-caps
            label="Live Pipeline"
            to="/tracker"
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />

          <q-btn
            v-if="loggedUser?.role !== 'admin'"
            flat
            no-caps
            label="How It Works"
            to="/how-it-works"
            class="nav-btn text-weight-bold"
            active-class="active-nav-btn"
          />
        </div>

        <q-space />

        <!-- ==================== HEADER ACTIONS ==================== -->
        <div class="gt-xs row items-center q-gutter-x-sm">
          <!-- Employer Button -->
          <q-btn
            v-if="
              loggedUser?.role === 'employer' || loggedUser?.role === 'admin'
            "
            outline
            color="grey-8"
            no-caps
            :label="
              loggedUser?.role === 'employer'
                ? 'My Company & Vacancies'
                : 'For Employers'
            "
            to="/employers"
            class="text-weight-bold rounded-borders q-px-md text-caption"
          />

          <!-- SIGN IN - Only when logged out -->
          <q-btn
            v-if="!isLoggedIn"
            flat
            color="primary"
            no-caps
            label="Sign In"
            @click="$router.push('/login')"
            class="text-weight-bold text-caption"
          />

          <!-- LOGGED USER -->
          <q-btn v-else flat no-caps class="user-profile-btn">
            <q-avatar
              size="32px"
              color="blue-1"
              text-color="primary"
              class="q-mr-sm"
            >
              <q-icon name="person" />
            </q-avatar>

            <span class="text-weight-bold text-primary">
              {{ loggedUser?.firstName }}
            </span>

            <q-icon name="keyboard_arrow_down" size="18px" class="q-ml-xs" />

            <!-- User Menu -->
            <q-menu>
              <q-list style="min-width: 250px">
                <!-- User Information -->
                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="blue-1" text-color="primary">
                      <q-icon name="person" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      {{ loggedUser?.firstName }}
                      {{ loggedUser?.lastName }}
                    </q-item-label>

                    <q-item-label caption>
                      {{ loggedUser?.email }}
                    </q-item-label>

                    <q-item-label caption class="text-primary">
                      {{ loggedUser?.role }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />

                <!-- Profile -->
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="account_circle" color="primary" />
                  </q-item-section>

                  <q-item-section> My Profile </q-item-section>
                </q-item>

                <!-- Logout -->
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" color="negative" />
                  </q-item-section>

                  <q-item-section class="text-negative text-weight-bold">
                    Logout
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- Get Started - Only when logged out -->
          <q-btn
            v-if="!isLoggedIn"
            unelevated
            color="primary"
            no-caps
            label="Get Started"
            icon-right="arrow_forward"
            @click="$router.push('/register')"
            class="text-weight-bolder rounded-borders q-px-md text-caption shadow-1"
          />
        </div>

        <!-- Mobile Menu -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="lt-md q-ml-sm text-grey-8"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <!-- ==================== MOBILE DRAWER ==================== -->

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      overlay
      class="bg-white"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md row items-center justify-between border-bottom">
          <div class="row items-center">
            <q-avatar
              size="36px"
              color="primary"
              text-color="white"
              rounded
              class="q-mr-sm"
            >
              <q-icon name="school" size="20px" />
            </q-avatar>

            <span class="text-subtitle1 text-weight-bolder text-navy">
              Intern<span class="text-primary">Sphere</span>
            </span>
          </div>

          <q-btn
            flat
            round
            dense
            icon="close"
            @click="leftDrawerOpen = false"
          />
        </div>

        <q-list padding class="text-grey-8">
          <!-- Home -->
          <q-item
            clickable
            v-ripple
            :to="dashboardPath"
            exact
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="home" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              {{ loggedUser ? 'Dashboard' : 'Home' }}
            </q-item-section>
          </q-item>

          <!-- Internships -->
          <q-item
            v-if="
              loggedUser?.role === 'student' ||
              loggedUser?.role === 'admin'
            "
            clickable
            v-ripple
            to="/internships"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="work" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              Find Internships / Find Jobs
            </q-item-section>
          </q-item>

          <q-item
            v-if="loggedUser?.role === 'employer'"
            clickable
            v-ripple
            to="/employer/candidates"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="person_search" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              Find Candidates
            </q-item-section>
          </q-item>

          <!-- Specializations -->
          <q-item
            v-if="
              loggedUser?.role === 'student' || loggedUser?.role === 'admin'
            "
            clickable
            v-ripple
            to="/specializations"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="category" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              Specializations
            </q-item-section>
          </q-item>

          <!-- Tracker -->
          <q-item
            v-if="loggedUser?.role === 'student'"
            clickable
            v-ripple
            to="/tracker"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="view_kanban" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              Live Pipeline
            </q-item-section>
          </q-item>

          <!-- How It Works -->
          <q-item
            v-if="loggedUser?.role !== 'admin'"
            clickable
            v-ripple
            to="/how-it-works"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar>
              <q-icon name="help_outline" color="primary" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              How It Works
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <div class="q-px-md q-gutter-y-sm">
            <!-- Employers -->
            <q-btn
              v-if="
                loggedUser?.role === 'employer' || loggedUser?.role === 'admin'
              "
              outline
              color="grey-8"
              no-caps
              :label="
                loggedUser?.role === 'employer'
                  ? 'My Company & Vacancies'
                  : 'For Employers'
              "
              to="/employers"
              class="full-width"
              @click="leftDrawerOpen = false"
            />

            <!-- Create Profile -->
            <q-btn
              v-if="!isLoggedIn"
              unelevated
              color="primary"
              no-caps
              label="Create Student Profile"
              class="full-width"
              to="/register"
            />

            <!-- Logged User Mobile -->
            <q-btn
              v-else
              unelevated
              color="primary"
              no-caps
              :label="`Hello, ${loggedUser?.firstName}`"
              class="full-width"
              @click="leftDrawerOpen = false"
            />

            <q-btn
              v-if="isLoggedIn"
              flat
              no-caps
              icon="logout"
              label="Log out"
              class="full-width text-negative"
              @click="logout"
            />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- ==================== PAGE CONTENT ==================== -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ==================== FOOTER ==================== -->

    <footer class="bg-navy text-grey-4 q-pt-xl q-pb-lg border-top-navy">
      <div class="max-width-container q-px-md">
        <div class="row q-col-gutter-xl q-pb-xl border-bottom-navy">
          <!-- Footer Column 1 -->
          <div class="col-12 col-md-5">
            <div class="row items-center q-mb-md">
              <q-avatar
                size="36px"
                color="primary"
                text-color="white"
                rounded
                class="q-mr-sm"
              >
                <q-icon name="school" size="20px" />
              </q-avatar>

              <span class="text-h6 text-weight-bolder text-white font-display">
                Intern<span class="text-primary">Sphere</span>
              </span>
            </div>

            <p
              class="text-caption text-grey-4 leading-normal"
              style="max-width: 380px"
            >
              Sri Lanka's leading digital platform connecting high-caliber
              university undergraduates and fresh graduates with verified
              enterprise internships and graduate trainee programs.
            </p>

            <div class="row items-center q-gutter-x-sm q-mt-md">
              <q-btn
                round
                dense
                flat
                color="grey-4"
                icon="public"
                class="bg-grey-9"
              />

              <q-btn
                round
                dense
                flat
                color="grey-4"
                icon="email"
                class="bg-grey-9"
              />

              <q-btn
                round
                dense
                flat
                color="grey-4"
                icon="share"
                class="bg-grey-9"
              />
            </div>
          </div>

          <!-- Footer Candidates -->
          <div class="col-6 col-sm-3 col-md-2">
            <div class="text-subtitle2 text-weight-bold text-white q-mb-md">
              For Candidates
            </div>

            <div class="column q-gutter-y-sm text-caption">
              <router-link to="/internships" class="footer-link">
                Browse Roles
              </router-link>

              <router-link to="/specializations" class="footer-link">
                Career Tracks
              </router-link>

              <router-link to="/tracker" class="footer-link">
                Kanban Tracker
              </router-link>

              <router-link to="/how-it-works" class="footer-link">
                How It Works
              </router-link>

              <router-link to="/specializations" class="footer-link">
                Stipend Index
              </router-link>
            </div>
          </div>

          <!-- Footer Employers -->
          <div class="col-6 col-sm-3 col-md-2">
            <div class="text-subtitle2 text-weight-bold text-white q-mb-md">
              For Employers
            </div>

            <div class="column q-gutter-y-sm text-caption">
              <router-link to="/employers" class="footer-link">
                Post an Internship
              </router-link>

              <router-link to="/how-it-works" class="footer-link">
                Campus Recruiting
              </router-link>

              <router-link to="/employers" class="footer-link">
                Vetted Talent Pool
              </router-link>

              <router-link to="/employers" class="footer-link">
                Enterprise Plans
              </router-link>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-subtitle2 text-weight-bold text-white q-mb-md">
              Weekly Job Digest
            </div>

            <p class="text-caption text-grey-4">
              Receive newly posted internships directly in your inbox.
            </p>

            <q-input
              v-model="newsletterEmail"
              dense
              dark
              outlined
              placeholder="student@university.lk"
              class="q-mb-sm text-caption"
            >
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  icon="send"
                  color="primary"
                  @click="subscribeNewsletter"
                />
              </template>
            </q-input>

            <span class="text-caption text-grey-5" style="font-size: 11px">
              Zero spam. Unsubscribe anytime.
            </span>
          </div>
        </div>

        <!-- Copyright -->
        <div
          class="row items-center justify-between q-pt-lg text-caption text-grey-5"
        >
          <div>
            &copy; 2026 InternSphere Inc. All rights reserved. Professional
            Internship Management.
          </div>

          <div class="row q-gutter-x-md text-caption">
            <a href="#" class="footer-link"> Privacy Policy </a>

            <a href="#" class="footer-link"> Terms of Service </a>

            <a href="#" class="footer-link"> Security Guidelines </a>
          </div>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

import { useQuasar } from 'quasar'

import { useRouter } from 'vue-router'
import { clearAuthSession, getAuthToken, getAuthUser } from '../utils/auth.js'
import { getDashboardPath } from '../utils/roles.js'

/* ==================== QUASAR ==================== */

const $q = useQuasar()
const router = useRouter()

/* ==================== UI STATE ==================== */

const leftDrawerOpen = ref(false)

/* ==================== USER STATE ==================== */

const isLoggedIn = ref(Boolean(getAuthToken()))

const loggedUser = ref(getAuthUser())
const dashboardPath = getDashboardPath(loggedUser.value?.role)

/* ==================== NEWSLETTER ==================== */

const newsletterEmail = ref('')

/* ==================== LOGOUT ==================== */

function logout() {
  clearAuthSession()
  loggedUser.value = null
  isLoggedIn.value = false
  leftDrawerOpen.value = false

  /* Notification */

  $q.notify({
    type: 'positive',

    message: 'You have been logged out.',

    icon: 'logout',

    position: 'top'
  })

  router.replace('/login')
}

/* ==================== NEWSLETTER ==================== */

function subscribeNewsletter() {
  if (!newsletterEmail.value) {
    $q.notify({
      type: 'warning',

      message: 'Please enter your email address.',

      icon: 'warning'
    })

    return
  }

  newsletterEmail.value = ''

  $q.notify({
    type: 'positive',

    message: 'Subscribed! You will receive weekly internship digests.',

    icon: 'mail'
  })
}
</script>

<style scoped lang="scss">
/* ==================== CONTAINER ==================== */

.max-width-container {
  max-width: 1200px;

  margin: 0 auto;

  width: 100%;
}

/* ==================== TOP BAR ==================== */

.top-announcement-bar {
  background: linear-gradient(90deg, #080d1a 0%, #0f172a 50%, #080d1a 100%);

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* ==================== HEADER ==================== */

.header-border {
  border-bottom: 1px solid #e2e8f0;
}

/* ==================== NAV BUTTONS ==================== */

.nav-btn {
  font-size: 13px;

  padding: 6px 12px;

  border-radius: 8px;

  transition: all 0.2s ease;

  &:hover {
    color: #2563eb !important;

    background: rgba(37, 99, 235, 0.05);
  }
}

/* ==================== ACTIVE NAV ==================== */

.active-nav-btn {
  color: #2563eb !important;

  background: rgba(37, 99, 235, 0.08);
}

/* ==================== NAVY ==================== */

.bg-navy {
  background-color: #080d1a;
}

/* ==================== FOOTER BORDERS ==================== */

.border-top-navy {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.border-bottom-navy {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* ==================== FOOTER LINKS ==================== */

.footer-link {
  color: #94a3b8;

  text-decoration: none;

  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
}

/* ==================== ANNOUNCEMENT LINK ==================== */

.hover-underline:hover {
  text-decoration: underline;
}

/* ==================== USER PROFILE BUTTON ==================== */

.user-profile-btn {
  border-radius: 10px;

  padding: 4px 8px;

  transition: all 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
  }
}
</style>
