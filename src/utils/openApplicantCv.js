const API_BASE_URL = 'http://localhost:5000/api'

export function hasApplicantCv(application) {
  return [application?.resumeUrl, application?.applicant?.resumeUrl].some(
    value => {
      if (typeof value !== 'string' || !value.trim()) return false

      try {
        const url = new URL(value, window.location.origin)
        if (url.pathname.startsWith('/uploads/')) {
          return url.pathname.toLowerCase().endsWith('.pdf')
        }
        if (!['http:', 'https:'].includes(url.protocol)) return false
        const host = url.hostname.toLowerCase().replace(/^www\./, '')
        if (host === 'linkedin.com' || host.endsWith('.linkedin.com'))
          return false
        return (
          url.pathname.toLowerCase().endsWith('.pdf') ||
          [
            'drive.google.com',
            'docs.google.com',
            '1drv.ms',
            'onedrive.live.com'
          ].includes(host)
        )
      } catch {
        return false
      }
    }
  )
}

async function openCv(endpoint, token) {
  const tab = window.open('', '_blank')
  if (!tab) {
    throw new Error('Allow pop-ups to open the applicant CV in a new tab.')
  }

  tab.opener = null

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const contentType = response.headers.get('content-type') || ''

    if (!response.ok) {
      let message = `Unable to load the applicant CV (${response.status}).`
      try {
        const result = await response.json()
        message = result.message || message
      } catch {
        // Keep the status-based error when the backend does not return JSON.
      }
      throw new Error(message)
    }

    if (contentType.includes('application/pdf')) {
      const pdfUrl = URL.createObjectURL(await response.blob())
      tab.location.replace(pdfUrl)
      return
    }

    if (contentType.includes('application/json')) {
      const result = await response.json()
      const reference = result.data?.url
      if (typeof reference !== 'string') {
        throw new Error('The applicant CV URL is missing.')
      }
      const url = new URL(reference)
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('The applicant CV URL is invalid.')
      }
      tab.location.replace(url.href)
      return
    }

    throw new Error('The applicant CV is not a viewable PDF.')
  } catch (error) {
    tab.close()
    throw error
  }
}

export function openApplicantCv(applicationId, token) {
  return openCv(
    `/applications/${encodeURIComponent(applicationId)}/cv`,
    token
  )
}

export function openCandidateCv(candidateId, token) {
  return openCv(`/users/candidates/${encodeURIComponent(candidateId)}/cv`, token)
}
