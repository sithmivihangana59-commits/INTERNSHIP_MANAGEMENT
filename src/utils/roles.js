export const DASHBOARD_PATHS = {
  admin: '/admin/dashboard',
  student: '/employee/dashboard',
  employer: '/employer/dashboard'
}

export function getDashboardPath(role) {
  return DASHBOARD_PATHS[role] || '/login'
}
