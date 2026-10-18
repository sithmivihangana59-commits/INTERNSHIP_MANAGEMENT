<template>
  <main class="auth-screen">
    <div class="auth-background" aria-hidden="true"></div>
    <div class="auth-overlay" aria-hidden="true"></div>

    <div class="auth-shell">
      <section class="auth-intro">
        <router-link to="/" class="brand-lockup" aria-label="InternSphere home">
          <q-avatar size="44px" color="primary" text-color="white" rounded>
            <q-icon name="school" size="25px" />
          </q-avatar>
          <span class="brand-name">Intern<span>Sphere</span></span>
          <q-badge color="blue-1" text-color="primary" label="PRO" />
        </router-link>

        <div class="intro-copy">
          <div class="eyebrow">
            <q-icon name="auto_awesome" size="16px" />
            Your next chapter starts here
          </div>
          <h1>Make your ambition <span>work for you.</span></h1>
          <p>
            Find opportunities that move your career forward. Connect with
            leading teams, build experience, and take your next step with
            confidence.
          </p>
        </div>

        <div class="intro-footer">
          <q-icon name="verified" size="19px" />
          A better way to find your fit.
        </div>
      </section>

      <section class="form-panel" aria-labelledby="form-heading">
        <div class="form-heading">
          <div class="mobile-brand">
            <q-avatar size="38px" color="primary" text-color="white" rounded>
              <q-icon name="school" size="22px" />
            </q-avatar>
            <span class="brand-name">Intern<span>Sphere</span></span>
          </div>

          <p class="form-kicker">{{
            isRegistering ? 'GET STARTED' : 'WELCOME BACK'
          }}</p>
          <h2 id="form-heading">
            {{ isRegistering ? 'Create your account' : 'Welcome Back' }}
          </h2>
          <p class="form-subtitle">
            {{
              isRegistering
                ? 'Build your future, one opportunity at a time.'
                : 'Find your next internship or career opportunity.'
            }}
          </p>
        </div>

        <form class="auth-form" @submit.prevent="submitAuth">
          <div v-if="isRegistering" class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model.trim="firstName"
                outlined
                dense
                label="First name"
                autocomplete="given-name"
                :rules="[value => !!value || 'Enter your first name']"
              >
                <template #prepend><q-icon name="person_outline" /></template>
              </q-input>
            </div>
            <div class="col-6">
              <q-input
                v-model.trim="lastName"
                outlined
                dense
                label="Last name"
                autocomplete="family-name"
                :rules="[value => !!value || 'Enter your last name']"
              >
                <template #prepend><q-icon name="person_outline" /></template>
              </q-input>
            </div>
          </div>

          <q-input
            v-model.trim="email"
            outlined
            dense
            type="email"
            label="Email address"
            placeholder="you@example.com"
            autocomplete="email"
            :rules="[value => !!value || 'Enter your email address']"
          >
            <template #prepend><q-icon name="mail_outline" /></template>
          </q-input>

          <q-input
            v-model="password"
            outlined
            dense
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            autocomplete="current-password"
            :rules="[value => !!value || 'Enter your password']"
          >
            <template #prepend><q-icon name="lock_outline" /></template>
            <template #append>
              <q-btn
                flat
                round
                dense
                :icon="showPassword ? 'visibility_off' : 'visibility'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div v-if="!isRegistering" class="form-options">
            <q-checkbox v-model="rememberMe" label="Remember me" dense />
            <a
              class="forgot-link"
              href="#password-reset"
              @click.prevent="notifyPasswordResetUnavailable"
            >
              Forgot password?
            </a>
          </div>

          <q-btn
            type="submit"
            unelevated
            no-caps
            color="primary"
            class="submit-button full-width"
            :label="
              isRegistering ? 'Create account' : 'Sign in to your account'
            "
            :loading="isSubmitting"
            :disable="isSubmitting"
          >
            <template #append><q-icon name="arrow_forward" /></template>
          </q-btn>
        </form>

        <div class="account-prompt">
          {{
            isRegistering ? 'Already have an account?' : 'New to InternSphere?'
          }}
          <router-link :to="isRegistering ? '/login' : '/register'">
            {{ isRegistering ? 'Sign in' : 'Create an account' }}
          </router-link>
        </div>

        <p class="terms-copy">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </div>
    <div class="copyright">© 2026 InternSphere. Your future, in motion.</div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { saveAuthSession } from '../utils/auth.js'
import { getDashboardPath } from '../utils/roles.js'

const API_URL = 'http://localhost:5000/api/auth'
const route = useRoute()
const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const showPassword = ref(false)
const rememberMe = ref(true)
const isSubmitting = ref(false)
const isRegistering = computed(() => route.path === '/register')

function notifyPasswordResetUnavailable() {
  $q.notify({
    type: 'info',
    message:
      'Password reset is not available yet. Please contact your platform administrator.',
    position: 'top'
  })
}

async function submitAuth() {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'warning',
      message: 'Please enter your email address and password.',
      position: 'top'
    })
    return
  }

  if (isRegistering.value && (!firstName.value || !lastName.value)) {
    $q.notify({
      type: 'warning',
      message: 'Please enter your first and last name.',
      position: 'top'
    })
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch(
      `${API_URL}/${isRegistering.value ? 'register' : 'login'}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isRegistering.value
            ? {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
              }
            : { email: email.value, password: password.value }
        )
      }
    )
    const data = await response.json()

    if (!response.ok || !data.success || !data.token || !data.user) {
      throw new Error(
        data.error || data.message || 'Authentication failed. Please try again.'
      )
    }

    saveAuthSession(data.token, data.user, rememberMe.value)
    const requestedDestination = route.query.redirect
    const defaultDestination = getDashboardPath(data.user.role)
    await router.replace(
      typeof requestedDestination === 'string' &&
        requestedDestination.startsWith('/') &&
        !requestedDestination.startsWith('//')
        ? requestedDestination
        : defaultDestination
    )
    $q.notify({
      type: 'positive',
      message: `Welcome${data.user.firstName ? `, ${data.user.firstName}` : ''}!`,
      icon: 'check_circle',
      position: 'top'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to connect to the server.',
      icon: 'error',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.auth-screen {
  position: relative;
  display: flex;
  min-height: 100vh;
  min-height: 100svh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 48px 28px 64px;
  background: #0b1725;
  isolation: isolate;
}

.auth-background,
.auth-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
}

.auth-background {
  background-image: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=85');
  background-position: center;
  background-size: cover;
  transform: scale(1.02);
}

.auth-overlay {
  background:
    linear-gradient(
      90deg,
      rgba(6, 17, 31, 0.83) 0%,
      rgba(6, 17, 31, 0.69) 48%,
      rgba(6, 17, 31, 0.55) 100%
    ),
    linear-gradient(0deg, rgba(6, 17, 31, 0.28), rgba(6, 17, 31, 0.1));
}

.auth-shell {
  display: grid;
  width: min(100%, 1080px);
  grid-template-columns: minmax(0, 1fr) minmax(360px, 440px);
  align-items: center;
  gap: clamp(48px, 9vw, 112px);
}

.auth-intro {
  display: flex;
  min-height: 520px;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}

.brand-lockup,
.mobile-brand {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.brand-name {
  color: #13253b;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.brand-lockup .brand-name {
  color: #fff;
  font-size: 23px;
}

.brand-name span {
  color: #48a0ff;
}

.intro-copy {
  max-width: 560px;
  padding: 54px 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #dbeafe;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.intro-copy h1 {
  margin: 25px 0 18px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(42px, 5.3vw, 66px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.08;
}

.intro-copy h1 span {
  color: #69afff;
}

.intro-copy p {
  max-width: 480px;
  margin: 0;
  color: rgba(240, 246, 255, 0.82);
  font-size: 16px;
  line-height: 1.8;
}

.intro-footer {
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgba(240, 246, 255, 0.8);
  font-size: 13px;
}

.intro-footer .q-icon {
  color: #80d3b0;
}

.form-panel {
  padding: 39px 38px 29px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 28px 80px rgba(1, 12, 26, 0.28);
}

.form-heading {
  margin-bottom: 26px;
}

.mobile-brand {
  display: none;
}

.form-kicker {
  margin: 0 0 7px;
  color: #2771ca;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.form-heading h2 {
  margin: 0;
  color: #13253b;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 29px;
  font-weight: 800;
  letter-spacing: -1px;
}

.form-subtitle {
  margin: 8px 0 0;
  color: #68788c;
  font-size: 13px;
  line-height: 1.6;
}

.auth-form {
  display: grid;
  gap: 4px;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -2px 0 14px;
}

.forgot-link,
.account-prompt a,
.terms-copy a {
  color: #216cc2;
  font-weight: 700;
  text-decoration: none;
}

.forgot-link {
  font-size: 12px;
}

.submit-button {
  min-height: 48px;
  margin-top: 5px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1px;
  box-shadow: 0 8px 18px rgba(37, 111, 202, 0.2);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 11px 22px rgba(37, 111, 202, 0.28);
}

.account-prompt {
  margin-top: 23px;
  color: #6b7a8e;
  font-size: 13px;
  text-align: center;
}

.account-prompt a {
  margin-left: 4px;
}

.terms-copy {
  margin: 25px 0 0;
  color: #8793a2;
  font-size: 10px;
  line-height: 1.7;
  text-align: center;
}

.terms-copy a {
  color: #62758c;
  text-decoration: underline;
}

.copyright {
  position: absolute;
  right: 24px;
  bottom: 18px;
  left: 24px;
  color: rgba(240, 246, 255, 0.62);
  font-size: 11px;
  text-align: center;
}

@media (max-width: 800px) {
  .auth-screen {
    padding: 30px 20px 58px;
  }

  .auth-shell {
    width: min(100%, 440px);
    display: block;
  }

  .auth-intro {
    display: none;
  }

  .mobile-brand {
    display: flex;
    margin-bottom: 30px;
  }

  .form-panel {
    padding: 31px 28px 25px;
  }
}

@media (max-width: 420px) {
  .auth-screen {
    padding-right: 14px;
    padding-left: 14px;
  }

  .form-panel {
    padding: 27px 20px 22px;
    border-radius: 16px;
  }

  .form-heading h2 {
    font-size: 26px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
