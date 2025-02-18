// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  oidc: {
    defaultProvider: "keycloak",
    enabled: true,
    providers: {
      keycloak: {
        exposeAccessToken: true,
        
        audience: 'account',
        baseUrl: '',
        clientId: '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/auth/keycloak/callback',
      },
    },
    session: {
      expirationCheck: true,
      automaticRefresh: true,
      expirationThreshold: 3600,
    },
    middleware: {
      globalMiddlewareEnabled: true,
      customLoginPage: true,
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "dark",
  },
  modules: [
    // '@nuxtjs/tailwindcss',
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "nuxt-oidc-auth",
  ],
});
