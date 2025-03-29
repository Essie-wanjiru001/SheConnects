export const CookieManager = {
  essentialCookies: {
    enabled: true, // Always enabled
    cookies: ['authToken', 'XSRF-TOKEN']
  },

  analyticalCookies: {
    enabled: false,
    cookies: ['_ga', '_gid', '_gat']
  },

  functionalCookies: {
    enabled: false,
    cookies: ['language', 'theme', 'user_preferences']
  },

  setPreferences: (preferences) => {
    const { analytical, functional } = preferences;
    
    CookieManager.analyticalCookies.enabled = analytical;
    CookieManager.functionalCookies.enabled = functional;

    // Clear rejected cookie types
    if (!analytical) {
      CookieManager.analyticalCookies.cookies.forEach(cookie => {
        StorageUtils.removeCookie(cookie);
      });
    }

    if (!functional) {
      CookieManager.functionalCookies.cookies.forEach(cookie => {
        StorageUtils.removeCookie(cookie);
      });
    }
  }
};