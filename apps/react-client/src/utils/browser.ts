export const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (/safari/).test(ua) && !(/chrome|crios|crmo|android|fxios/).test(ua);
};

export const getBrowserName = () => {
  const ua = navigator.userAgent;
  if ((/chrome|crios|crmo/i).test(ua)) {
    return 'chrome';
  }
  if ((/firefox|fxios/i).test(ua)) {
    return 'firefox';
  }
  if ((/safari/i).test(ua) && !(/chrome|crios|crmo|android/i).test(ua)) {
    return 'safari';
  }
  if ((/edg/i).test(ua)) {
    return 'edge';
  }
  return 'other';
};
