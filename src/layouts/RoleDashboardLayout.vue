<template>
  <q-layout view="lHh Lpr lff" class="dashboard-layout">
    <q-header class="dashboard-header bg-white text-dark">
      <q-toolbar class="dashboard-toolbar">
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="lt-md q-mr-sm"
          aria-label="Toggle navigation"
          @click="drawerOpen = !drawerOpen"
        />
        <div class="dashboard-brand">
          <q-avatar size="36px" color="primary" text-color="white" rounded>
            <q-icon name="school" />
          </q-avatar>
          <span>Intern<span class="text-primary">Sphere</span></span>
        </div>
        <q-space />
        <div class="gt-xs text-right q-mr-md">
          <div class="text-weight-bold"
            >{{ user?.firstName }} {{ user?.lastName }}</div
          >
          <div class="text-caption text-grey-6">{{ roleLabel }}</div>
        </div>
        <q-btn
          flat
          round
          icon="account_circle"
          color="primary"
          aria-label="Account menu"
        >
          <q-menu>
            <q-list style="min-width: 190px">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold">
                    {{ user?.firstName }} {{ user?.lastName }}
                  </q-item-label>
                  <q-item-label caption>{{ user?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/profile">
                <q-item-section avatar
                  ><q-icon name="person_outline"
                /></q-item-section>
                <q-item-section>My profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar
                  ><q-icon name="logout" color="negative"
                /></q-item-section>
                <q-item-section class="text-negative">Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      :width="252"
      bordered
      class="dashboard-drawer"
    >
      <div class="drawer-intro">
        <div class="text-caption text-uppercase text-grey-6">Workspace</div>
        <div class="text-subtitle1 text-weight-bold"
          >{{ roleLabel }} portal</div
        >
      </div>
      <q-list padding>
        <q-item
          v-for="item in navigation"
          :key="item.label"
          clickable
          :to="item.to"
          exact
          active-class="dashboard-nav-active"
          class="dashboard-nav-item"
          @click="drawerOpen = false"
        >
          <q-item-section avatar><q-icon :name="item.icon" /></q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
      <div class="drawer-bottom">
        <div class="text-caption text-grey-6">Signed in as</div>
        <div class="text-weight-bold ellipsis">{{ user?.email }}</div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { clearAuthSession, getAuthUser } from '../utils/auth.js'
import { getDashboardPath } from '../utils/roles.js'

const router = useRouter()
const $q = useQuasar()
const user = ref(getAuthUser())
const drawerOpen = ref(false)
const role = computed(() => user.value?.role)
const roleLabel = computed(() => {
  if (role.value === 'admin') return 'Admin'
  if (role.value === 'employer') return 'Employer'
  return 'Student'
})

const navigation = computed(() => {
  if (role.value === 'admin') {
    return [
      { label: 'Dashboard', icon: 'dashboard', to: '/admin/dashboard' },
      {
        label: 'User registrations',
        icon: 'group',
        to: '/admin/dashboard#users'
      },
      {
        label: 'Company verification',
        icon: 'business',
        to: '/admin/dashboard#companies'
      },
      {
        label: 'Job & internship posts',
        icon: 'work_outline',
        to: '/admin/dashboard#opportunities'
      },
      {
        label: 'Application analytics',
        icon: 'analytics',
        to: '/admin/dashboard#applications'
      },
      {
        label: 'Application oversight',
        icon: 'fact_check',
        to: '/employers#applications'
      },
      { label: 'Specializations', icon: 'category', to: '/specializations' }
    ]
  }

  if (role.value === 'employer') {
    return [
      { label: 'Dashboard', icon: 'dashboard', to: '/employer/dashboard' },
      { label: 'My company & vacancies', icon: 'business', to: '/employers' },
      {
        label: 'Applicants & interviews',
        icon: 'groups',
        to: '/employer/dashboard#applicants'
      },
      {
        label: 'Find candidates',
        icon: 'person_search',
        to: '/employer/candidates'
      },
      {
        label: 'Analytics',
        icon: 'analytics',
        to: '/employer/dashboard#analytics'
      }
    ]
  }

  return [
    { label: 'Dashboard', icon: 'dashboard', to: '/employee/dashboard' },
    { label: 'Find Internships / Find Jobs', icon: 'search', to: '/internships' },
    {
      label: 'Recommended opportunities',
      icon: 'auto_awesome',
      to: '/employee/dashboard#opportunities'
    },
    {
      label: 'Saved jobs',
      icon: 'bookmark_border',
      to: '/employee/dashboard#saved'
    },
    { label: 'My applications', icon: 'description', to: '/tracker' },
    { label: 'My profile', icon: 'person_outline', to: '/profile' }
  ]
})

function logout() {
  clearAuthSession()
  user.value = null
  router.replace('/login')
  $q.notify({
    type: 'positive',
    message: 'You have been logged out.',
    position: 'top'
  })
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f5f7fb;
}

.dashboard-header {
  border-bottom: 1px solid #e8edf3;
}

.dashboard-toolbar {
  min-height: 66px;
  padding: 0 24px;
}

.dashboard-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #14243a;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 800;
}

.dashboard-drawer {
  background: #fff;
}

.drawer-intro {
  padding: 28px 22px 16px;
}

.dashboard-nav-item {
  min-height: 44px;
  margin: 3px 12px;
  border-radius: 9px;
  color: #5b6b7e;
  font-size: 13px;
  font-weight: 600;
}

.dashboard-nav-active {
  background: #eaf3ff;
  color: #1766bd;
}

.drawer-bottom {
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;
  padding-top: 14px;
  border-top: 1px solid #edf0f4;
  font-size: 12px;
}

@media (max-width: 599px) {
  .dashboard-toolbar {
    padding: 0 12px;
  }
}
</style>
