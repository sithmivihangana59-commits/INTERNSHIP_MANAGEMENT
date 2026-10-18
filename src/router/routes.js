const routes = [
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/admin',
    component: () => import('@/layouts/RoleDashboardLayout.vue'),
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/AdminDashboard.vue')
      }
    ]
  },
  {
    path: '/employee',
    component: () => import('@/layouts/RoleDashboardLayout.vue'),
    redirect: '/employee/dashboard',
    meta: { requiresAuth: true, roles: ['student'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/EmployeeDashboard.vue')
      }
    ]
  },
  {
    path: '/employer',
    component: () => import('@/layouts/RoleDashboardLayout.vue'),
    redirect: '/employer/dashboard',
    meta: { requiresAuth: true, roles: ['employer'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/EmployerDashboard.vue')
      },
      {
        path: 'candidates',
        component: () => import('@/pages/FindCandidatesPage.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },

    children: [
      // Home
      {
        path: '',
        component: () => import('@/pages/IndexPage.vue')
      },

      // Internships
      {
        path: 'internships',
        component: () => import('@/pages/FindInternshipsPage.vue'),
        meta: { roles: ['student', 'admin'] }
      },

      // Specializations
      {
        path: 'specializations',
        component: () => import('@/pages/SpecializationsPage.vue'),
        meta: { roles: ['student', 'admin'] }
      },

      // How It Works
      {
        path: 'how-it-works',
        component: () => import('@/pages/HowItWorksPage.vue'),
        meta: { roles: ['student', 'employer', 'admin'] }
      },

      // Application Tracker
      {
        path: 'tracker',
        component: () => import('@/pages/ApplicationTrackerPage.vue'),
        meta: { roles: ['student'] }
      },

      // Employers
      {
        path: 'employers',
        component: () => import('@/pages/EmployersPage.vue'),
        meta: { roles: ['employer', 'admin'] }
      },

      // Second Page
      {
        path: 'second',
        component: () => import('@/pages/SecondPage.vue'),
        meta: { roles: ['student', 'employer', 'admin'] }
      },

      // ============================
      // MY PROFILE
      // ============================
      {
        path: 'profile',
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { roles: ['student', 'employer', 'admin'] }
      }
    ]
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
