<template>
  <div class="row">
    <div class="col-12 col-lg-10 offset-lg-1">
      <table class="table table-bordered list-plans text-center mb-5">
        <thead class="bg-success">
          <tr>
            <th>name</th>
            <th>type</th>
            <th>frequency</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="plan in getListPlans" :key="plan._id">
            <td>
              <router-link :to="'workout/' + plan._id" class="text-success text-capitalize">{{ plan.name }}</router-link>
            </td>

            <td>{{ plan.type }}</td>

            <td v-if="plan.frequency > 1">{{ plan.frequency }} days/week</td>

            <td v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</td>

            <td>
              <a href="" class="btn btn-sm btn-secondary mr-1" @click.prevent="updatePlan(plan)">Edit</a>

              <a href="" class="btn btn-sm btn-danger" @click.prevent="deletePlan(plan._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <plan-update :data-plan-origin="dataPlanOrigin"></plan-update>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'

  import planUpdate from './plan-update.vue'

  export default {
    name: 'list-plans',

    components: { planUpdate },

    data () {
      return {
        errContent: '',
        dataPlanOrigin: ''
      }
    },

    computed: {
      getListPlans () {
        return this.$store.getters.listPlans
      }
    },

    methods: {
      updatePlan (plan) {
        this.$store.dispatch('setShowBackgroundModal', true)
        this.$store.dispatch('setShowUpdateModal', true)
        this.dataPlanOrigin = plan
      },

      deletePlan (id) {
        this.$store.dispatch('setDeletePlan', id)

        axios
          .delete(config.domainAddress + config.api.plans + id)
          .then(function () {
            this.$toasted.success('Delete Successfully!!!')
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.errContent = error.response.data.message
            } else {
              this.errContent = 'Error happened.'
            }

            this.$toasted.error('Error happened!!!')
          }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .list-plans {
    thead {
      tr {
        th {
          border-bottom-width: 1px;
          color: $table-plan-text-color;
          text-align: center;
        }
      }
    }
  }
</style>
