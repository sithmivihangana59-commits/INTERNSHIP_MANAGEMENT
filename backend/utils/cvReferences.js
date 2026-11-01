import path from 'node:path';

export function isCvReference(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  const reference = value.trim();
  if (reference.startsWith('/uploads/')) {
    return path.extname(reference).toLowerCase() === '.pdf';
  }

  try {
    const url = new URL(reference);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'linkedin.com' || host.endsWith('.linkedin.com')) return false;
    return (
      path.extname(url.pathname).toLowerCase() === '.pdf' ||
      ['drive.google.com', 'docs.google.com', '1drv.ms', 'onedrive.live.com'].includes(host)
    );
  } catch {
    return false;
  }
}

export function getApplicationCvReference(application) {
  if (isCvReference(application.resumeUrl)) return application.resumeUrl;
  if (isCvReference(application.applicant?.resumeUrl)) {
    return application.applicant.resumeUrl;
  }
  return '';
}

export function withResolvedCvReference(application) {
  const resumeUrl = getApplicationCvReference(application);
  const applicant =
    application.applicant && typeof application.applicant === 'object' &&
    application.applicant.firstName !== undefined
      ? { ...application.applicant, resumeUrl }
      : application.applicant;

  return { ...application, applicant, resumeUrl };
}
