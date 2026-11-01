<template>
  <q-page class="profile-page">

    <div class="profile-container">

      <!-- ========================= -->
      <!-- PAGE HEADER -->
      <!-- ========================= -->

      <div class="row items-center justify-between q-mb-lg">

        <div>
          <div class="text-h4 text-weight-bolder text-navy">
            My Profile
          </div>

          <div class="text-grey-6 q-mt-xs">
            Manage your InternSphere profile information
          </div>
        </div>

        <q-btn
          unelevated
          color="primary"
          no-caps
          icon="edit"
          label="Edit Profile"
          @click="startEditing"
        />

      </div>


      <!-- ========================= -->
      <!-- LOADING -->
      <!-- ========================= -->

      <div
        v-if="loading"
        class="flex flex-center q-pa-xl"
      >
        <div class="text-center">

          <q-spinner
            color="primary"
            size="50px"
          />

          <div class="text-grey-6 q-mt-md">
            Loading your profile...
          </div>

        </div>
      </div>


      <!-- ========================= -->
      <!-- PROFILE -->
      <!-- ========================= -->

      <div v-else-if="user">

        <div class="row q-col-gutter-lg">

          <!-- ========================= -->
          <!-- LEFT PROFILE CARD -->
          <!-- ========================= -->

          <div class="col-12 col-md-4">

            <q-card
              flat
              bordered
              class="profile-card"
            >

              <q-card-section class="text-center">

                <!-- Avatar -->

                <q-avatar
                  size="110px"
                  color="blue-1"
                  text-color="primary"
                  class="q-mb-md"
                >

                  <img
                    v-if="user.profileImage"
                    :src="user.profileImage"
                    alt="Profile"
                  />

                  <q-icon
                    v-else
                    name="person"
                    size="55px"
                  />

                </q-avatar>


                <!-- Name -->

                <div class="text-h5 text-weight-bold text-navy">

                  {{ user.firstName }}
                  {{ user.lastName }}

                </div>


                <!-- Role -->

                <q-badge
                  color="blue-1"
                  text-color="primary"
                  class="q-mt-sm q-px-md q-py-xs"
                >

                  {{ user.role }}

                </q-badge>


                <!-- Verification -->

                <div class="q-mt-md">

                  <q-chip
                    v-if="user.isVerified"
                    color="green-1"
                    text-color="positive"
                    icon="verified"
                    label="Verified Account"
                  />

                  <q-chip
                    v-else
                    color="orange-1"
                    text-color="orange-9"
                    icon="info"
                    label="Not Verified"
                  />

                </div>

              </q-card-section>


              <q-separator />


              <!-- Email -->

              <q-card-section>

                <div class="row items-center q-mb-md">

                  <q-icon
                    name="email"
                    color="primary"
                    size="22px"
                    class="q-mr-sm"
                  />

                  <div>

                    <div class="text-caption text-grey-6">
                      Email
                    </div>

                    <div class="text-body2">
                      {{ user.email }}
                    </div>

                  </div>

                </div>


                <!-- Phone -->

                <div
                  v-if="user.phone"
                  class="row items-center q-mb-md"
                >

                  <q-icon
                    name="phone"
                    color="primary"
                    size="22px"
                    class="q-mr-sm"
                  />

                  <div>

                    <div class="text-caption text-grey-6">
                      Phone
                    </div>

                    <div class="text-body2">
                      {{ user.phone }}
                    </div>

                  </div>

                </div>


                <!-- University -->

                <div
                  v-if="user.university"
                  class="row items-center"
                >

                  <q-icon
                    name="school"
                    color="primary"
                    size="22px"
                    class="q-mr-sm"
                  />

                  <div>

                    <div class="text-caption text-grey-6">
                      University
                    </div>

                    <div class="text-body2">
                      {{ user.university }}
                    </div>

                  </div>

                </div>

              </q-card-section>

            </q-card>

            <q-card
              v-if="user.role === 'student'"
              flat
              bordered
              class="profile-card q-mt-lg"
            >
              <q-card-section>
                <div class="text-h6 text-weight-bold text-navy">
                  CV / Resume
                </div>
                <div class="text-caption text-grey-6">
                  Upload a PDF CV for applications and employer candidate discovery.
                  CV files remain private to authenticated employers.
                </div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div
                  v-if="user.resumeUrl"
                  class="row items-center text-positive q-mb-md"
                >
                  <q-icon name="check_circle" class="q-mr-sm" />
                  A CV is saved to your profile and will be used for new
                  applications unless you upload another one.
                </div>

                <q-file
                  v-model="resumeFile"
                  outlined
                  dense
                  accept=".pdf,application/pdf"
                  :max-file-size="5242880"
                  label="Choose a PDF CV (max 5 MB)"
                  clearable
                >
                  <template #prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <div class="row justify-end q-mt-md">
                  <q-btn
                    unelevated
                    no-caps
                    color="primary"
                    icon="upload_file"
                    label="Upload CV"
                    :loading="uploadingResume"
                    :disable="!resumeFile || uploadingResume"
                    @click="uploadProfileResume"
                  />
                </div>
              </q-card-section>
            </q-card>

          </div>


          <!-- ========================= -->
          <!-- RIGHT PROFILE INFORMATION -->
          <!-- ========================= -->

          <div class="col-12 col-md-8">

            <q-card
              flat
              bordered
              class="profile-card"
            >

              <q-card-section>

                <div class="text-h6 text-weight-bold text-navy">
                  Personal Information
                </div>

                <div class="text-caption text-grey-6">
                  Your basic account information
                </div>

              </q-card-section>


              <q-separator />


              <!-- VIEW MODE -->

              <q-card-section v-if="!editing">

                <div class="row q-col-gutter-lg">

                  <!-- First Name -->

                  <div class="col-12 col-sm-6">

                    <div class="info-label">
                      First Name
                    </div>

                    <div class="info-value">
                      {{ user.firstName || 'Not provided' }}
                    </div>

                  </div>


                  <!-- Last Name -->

                  <div class="col-12 col-sm-6">

                    <div class="info-label">
                      Last Name
                    </div>

                    <div class="info-value">
                      {{ user.lastName || 'Not provided' }}
                    </div>

                  </div>


                  <!-- Email -->

                  <div class="col-12 col-sm-6">

                    <div class="info-label">
                      Email
                    </div>

                    <div class="info-value">
                      {{ user.email || 'Not provided' }}
                    </div>

                  </div>


                  <!-- Phone -->

                  <div class="col-12 col-sm-6">

                    <div class="info-label">
                      Phone
                    </div>

                    <div class="info-value">
                      {{ user.phone || 'Not provided' }}
                    </div>

                  </div>


                  <!-- University -->

                  <div class="col-12">

                    <div class="info-label">
                      University
                    </div>

                    <div class="info-value">
                      {{ user.university || 'Not provided' }}
                    </div>

                  </div>
                  <template v-if="user.role === 'student'">
                    <div class="col-12 col-sm-6">
                      <div class="info-label">Education / Qualification</div>
                      <div class="info-value">
                        {{ user.education || 'Not provided' }}
                      </div>
                    </div>

                    <div class="col-12 col-sm-6">
                      <div class="info-label">Location</div>
                      <div class="info-value">
                        {{ user.location || 'Not provided' }}
                      </div>
                    </div>

                    <div class="col-12" v-if="user.experience">
                      <div class="info-label">Experience</div>
                      <div class="info-value">{{ user.experience }}</div>
                    </div>

                    <div
                      class="col-12"
                      v-if="user.preferredCategories?.length"
                    >
                      <div class="info-label">Preferred job categories</div>
                      <div class="row q-gutter-xs q-mt-xs">
                        <q-chip
                          v-for="category in user.preferredCategories"
                          :key="category"
                          color="blue-1"
                          text-color="primary"
                        >
                          {{ category }}
                        </q-chip>
                      </div>
                    </div>
                  </template>

                  <!-- Bio -->

                  <div class="col-12">

                    <div class="info-label">
                      Bio
                    </div>

                    <div class="info-value">
                      {{ user.bio || 'No bio added yet.' }}
                    </div>

                  </div>

                </div>

              </q-card-section>


              <!-- ========================= -->
              <!-- EDIT MODE -->
              <!-- ========================= -->

              <q-card-section v-else>

                <div class="row q-col-gutter-md">

                  <!-- First Name -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.firstName"
                      outlined
                      label="First Name"
                    />

                  </div>


                  <!-- Last Name -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.lastName"
                      outlined
                      label="Last Name"
                    />

                  </div>


                  <!-- Phone -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.phone"
                      outlined
                      label="Phone"
                    />

                  </div>


                  <!-- University -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.university"
                      outlined
                      label="University"
                    />

                  </div>
                  <template v-if="user.role === 'student'">
                    <div class="col-12 col-sm-6">
                      <q-input
                        v-model="editForm.education"
                        outlined
                        label="Education / Qualification"
                      />
                    </div>

                    <div class="col-12 col-sm-6">
                      <q-input
                        v-model="editForm.location"
                        outlined
                        label="Location"
                      />
                    </div>

                    <div class="col-12">
                      <q-input
                        v-model="editForm.experience"
                        outlined
                        type="textarea"
                        rows="3"
                        label="Experience"
                        hint="Describe relevant work, volunteering, or project experience."
                      />
                    </div>

                    <div class="col-12">
                      <q-input
                        v-model="editForm.preferredCategories"
                        outlined
                        label="Preferred job categories"
                        hint="Separate categories with commas."
                      />
                    </div>
                  </template>

                  <!-- Bio -->

                  <div class="col-12">

                    <q-input
                      v-model="editForm.bio"
                      outlined
                      type="textarea"
                      label="Bio"
                      rows="4"
                    />

                  </div>


                  <!-- LinkedIn -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.linkedinUrl"
                      outlined
                      label="LinkedIn URL"
                    />

                  </div>


                  <!-- GitHub -->

                  <div class="col-12 col-sm-6">

                    <q-input
                      v-model="editForm.githubUrl"
                      outlined
                      label="GitHub URL"
                    />

                  </div>

                </div>


                <!-- Buttons -->

                <div class="row justify-end q-gutter-sm q-mt-lg">

                  <q-btn
                    flat
                    no-caps
                    label="Cancel"
                    color="grey-7"
                    @click="cancelEditing"
                  />

                  <q-btn
                    unelevated
                    no-caps
                    label="Save Changes"
                    color="primary"
                    :loading="saving"
                    @click="saveProfile"
                  />

                </div>

              </q-card-section>

            </q-card>


            <!-- ========================= -->
            <!-- SKILLS -->
            <!-- ========================= -->

            <q-card
              flat
              bordered
              class="profile-card q-mt-lg"
            >

              <q-card-section>

                <div class="text-h6 text-weight-bold text-navy">
                  Skills
                </div>

                <div class="text-caption text-grey-6">
                  Skills saved in your profile
                </div>

              </q-card-section>


              <q-separator />


              <q-card-section>

                <div
                  v-if="user.skills && user.skills.length"
                  class="row q-gutter-sm"
                >

                  <q-chip
                    v-for="skill in user.skills"
                    :key="skill"
                    color="blue-1"
                    text-color="primary"
                    icon="check_circle"
                  >
                    {{ skill }}
                  </q-chip>

                </div>


                <div
                  v-else
                  class="text-grey-6"
                >

                  No skills added yet.

                </div>

              </q-card-section>

            </q-card>

          </div>

        </div>

      </div>


      <!-- ========================= -->
      <!-- ERROR -->
      <!-- ========================= -->

      <div
        v-else
        class="text-center q-pa-xl"
      >

        <q-icon
          name="error_outline"
          size="60px"
          color="negative"
        />

        <div class="text-h6 q-mt-md">
          Unable to load your profile
        </div>

        <q-btn
          unelevated
          color="primary"
          no-caps
          label="Try Again"
          class="q-mt-md"
          @click="loadProfile"
        />

      </div>

    </div>

  </q-page>
</template>


<script setup>
import {
  clearAuthSession,
  getAuthToken as readAuthToken,
  saveAuthUser
} from '../utils/auth.js'

import {
  ref,
  onMounted
} from 'vue'

import {
  useQuasar
} from 'quasar'

import {
  useRouter
} from 'vue-router'


/* ========================= */
/* QUASAR + ROUTER */
/* ========================= */

const $q = useQuasar()

const router = useRouter()


/* ========================= */
/* STATE */
/* ========================= */

const loading = ref(true)

const saving = ref(false)

const editing = ref(false)

const user = ref(null)

const resumeFile = ref(null)

const uploadingResume = ref(false)


/* ========================= */
/* EDIT FORM */
/* ========================= */

const editForm = ref({

  firstName: '',

  lastName: '',

  phone: '',

  bio: '',

  university: '',

  education: '',

  experience: '',

  location: '',

  preferredCategories: '',

  linkedinUrl: '',

  githubUrl: ''

})


/* ========================= */
/* LOAD PROFILE */
/* ========================= */

async function loadProfile() {

  loading.value = true


  try {

    const token = readAuthToken()


    /* No token */

    if (!token) {

      $q.notify({

        type: 'warning',

        message:
          'Please login to view your profile.',

        icon: 'lock'

      })

      router.replace('/login')

      return

    }


    /* Get current user */

    const response = await fetch(
      'http://localhost:5000/api/auth/me',
      {
        method: 'GET',

        headers: {

          'Authorization':
            `Bearer ${token}`,

          'Content-Type':
            'application/json'

        }

      }
    )


    const data =
      await response.json()


    /* Token expired / unauthorized */

    if (
      response.status === 401 ||
      response.status === 403
    ) {

      clearAuthSession()

      $q.notify({

        type: 'warning',

        message:
          'Your session has expired. Please login again.',

        icon: 'lock'

      })

      router.replace('/login')

      return

    }


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.error ||
        data.message ||
        'Could not load profile.'
      )

    }


    /* Save actual MongoDB user */

    user.value =
      data.user


    saveAuthUser(data.user)


  } catch (error) {

    console.error(
      'Profile loading error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.message ||
        'Failed to load profile.',

      icon: 'error'

    })


  } finally {

    loading.value = false

  }

}

async function uploadProfileResume() {
  if (!resumeFile.value) {
    return
  }

  const token = readAuthToken()
  if (!token) {
    $q.notify({
      type: 'warning',
      message: 'Please login again to upload your CV.',
      icon: 'lock'
    })
    return
  }

  uploadingResume.value = true
  try {
    const formData = new FormData()
    formData.append('resume', resumeFile.value)
    const response = await fetch('http://localhost:5000/api/users/me/resume', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Unable to upload CV.')
    }

    user.value = { ...user.value, resumeUrl: result.data.resumeUrl }
    saveAuthUser(user.value)
    resumeFile.value = null
    $q.notify({
      type: 'positive',
      message: 'Your CV was uploaded to your profile.',
      icon: 'check_circle'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Unable to upload CV.',
      icon: 'error'
    })
  } finally {
    uploadingResume.value = false
  }
}


/* ========================= */
/* START EDITING */
/* ========================= */

function startEditing() {

  if (!user.value) {
    return
  }


  editForm.value = {

    firstName:
      user.value.firstName || '',

    lastName:
      user.value.lastName || '',

    phone:
      user.value.phone || '',

    bio:
      user.value.bio || '',

    university:
      user.value.university || '',

    education:
      user.value.education || '',

    experience:
      user.value.experience || '',

    location:
      user.value.location || '',

    preferredCategories:
      (user.value.preferredCategories || []).join(', '),

    linkedinUrl:
      user.value.linkedinUrl || '',

    githubUrl:
      user.value.githubUrl || ''

  }


  editing.value = true

}


/* ========================= */
/* CANCEL EDITING */
/* ========================= */

function cancelEditing() {

  editing.value = false

}


/* ========================= */
/* SAVE PROFILE */
/* ========================= */

async function saveProfile() {

  saving.value = true


  try {

    const token = readAuthToken()


    if (!token) {

      throw new Error(
        'Please login again.'
      )

    }


    const response = await fetch(
      'http://localhost:5000/api/auth/profile',
      {
        method: 'PUT',

        headers: {

          'Content-Type':
            'application/json',

          'Authorization':
            `Bearer ${token}`

        },

        body: JSON.stringify({
          ...editForm.value,
          preferredCategories: editForm.value.preferredCategories
            .split(',')
            .map(category => category.trim())
            .filter(Boolean)
        })

      }
    )


    const data =
      await response.json()


    if (
      response.status === 401 ||
      response.status === 403
    ) {

      clearAuthSession()
      router.replace('/login')

      throw new Error(
        'Your session has expired.'
      )

    }


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.error ||
        data.message ||
        'Could not update profile.'
      )

    }


    /* Update screen */

    user.value =
      data.user


    saveAuthUser(data.user)


    /* Exit edit mode */

    editing.value = false


    $q.notify({

      type: 'positive',

      message:
        'Profile updated successfully!',

      icon: 'check_circle',

      position: 'top'

    })


  } catch (error) {

    console.error(
      'Profile update error:',
      error
    )


    $q.notify({

      type: 'negative',

      message:
        error.message ||
        'Failed to update profile.',

      icon: 'error'

    })

  } finally {

    saving.value = false

  }

}


/* ========================= */
/* LOAD WHEN PAGE OPENS */
/* ========================= */

onMounted(() => {

  loadProfile()

})

</script>


<style scoped>

.profile-page {

  background:
    #f8fafc;

  min-height:
    calc(100vh - 80px);

}


.profile-container {

  max-width:
    1200px;

  margin:
    0 auto;

  padding:
    40px 20px 60px;

}


.profile-card {

  border-radius:
    16px;

  background:
    white;

}


.text-navy {

  color:
    #0f172a;

}


.info-label {

  color:
    #64748b;

  font-size:
    13px;

  font-weight:
    600;

  margin-bottom:
    5px;

}


.info-value {

  color:
    #0f172a;

  font-size:
    16px;

  font-weight:
    500;

  word-break:
    break-word;

}


@media (max-width: 600px) {

  .profile-container {

    padding:
      25px 14px 40px;

  }

}

</style>