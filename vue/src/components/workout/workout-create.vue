<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showCreatePlan" :class="{ 'show animated bounceIn': showBackgroundModal && showCreatePlan }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center mb-4 text-success">Workout Information</h2>

          <form>
            <div class="form-group">
              <label for="name-workout">Workout Day Name</label>

              <input type="text" id="name-workout" class="form-control" v-model="workoutName" />
            </div>

            <div class="form-group">
              <label for="workout-day">Pick a Workout Day</label>

              <select id="workout-day" class="form-control" v-model="workoutDay">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <p v-show="message" class="text-danger">{{ message }}</p>

            <div class="form-group text-center mb-0">
              <button class="btn btn-md btn-success" @click.prevent="workoutCreate">
                Submit
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>

              <button class="btn btn-md btn-secondary" @click.prevent="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'workout-create',

    components: { FontAwesomeIcon },

    data () {
      return {
        workoutName: '',
        workoutDay: '',
        message: '',
        loading: false
      }
    },

    methods: {
      closeModal () {
        this.$store.dispatch('setShowBackgroundModal', false)
      },

      workoutCreate () {
        if (!this.workoutName) {
          this.message = 'The workout name cannot be blank.'

          return
        }

        if (!this.workoutDay) {
          this.message = 'The workout day cannot be blank.'

          return
        }

        const params = {
          name: this.workoutName,
          week_day: this.workoutDay,
          plan_id: this.$route.params.id
        }

        this.loading = true

        axios
          .post(config.domainAddress + config.api.workout, params)
          .then(function (response) {
            const dataItem = {
              created_by: response.data.created_by,
              name: response.data.name,
              week_day: response.data.week_day
            }

            this.loading = false
            this.workoutName = ''
            this.workoutDay = ''

            this.$store.dispatch('setShowBackgroundModal', false)
            this.$store.dispatch('setCreateWorkout', dataItem)

            this.$toasted.success('Create Successfully!!!')
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.message = error.response.data.message
            } else {
              this.$toasted.error('Error happened!!!')
            }

            this.loading = false
          }.bind(this))
      }
    },

    computed: {
      showBackgroundModal () {
        return this.$store.getters.showBackgroundModal
      },

      showCreatePlan () {
        return this.$store.getters.showCreateModal
      }
    }
  }
</script>

<style lang="scss"></style>
