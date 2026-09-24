const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'internships', component: () => import('@/pages/FindInternshipsPage.vue') },
      { path: 'specializations', component: () => import('@/pages/SpecializationsPage.vue') },
      { path: 'how-it-works', component: () => import('@/pages/HowItWorksPage.vue') },
      { path: 'tracker', component: () => import('@/pages/ApplicationTrackerPage.vue') },
      { path: 'employers', component: () => import('@/pages/EmployersPage.vue') },
      { path: 'second', component: () => import('@/pages/SecondPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
