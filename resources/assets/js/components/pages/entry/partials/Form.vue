<template>
  <form class="form-horizontal" id="entry_form" role="form" @submit.prevent="onSubmit">

    <div class="form-group" :class="{ 'has-error': errors.date }">
      <label class="col-md-4 control-label">Date</label>
      <div class="col-md-6">
        <input type="date" class="form-control" id="date" v-model="form.date">
        <div class="help-block" v-if="errors.date">
          <div v-for="error in errors.date"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.distance }">
      <label class="col-md-4 control-label">Distance</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="number" class="form-control" id="distance" v-model="form.distance">
          <span class="input-group-addon">km</span>
        </div>
        <div class="help-block" v-if="errors.distance">
          <div v-for="error in errors.distance"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.time }">
      <label class="col-md-4 control-label">Time</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="text" maxlength="2" class="form-control date-filter" id="time_hours" v-model="form.time_hours" placeholder="Hours">
          <span class="input-group-addon">:</span>
          <input type="text" maxlength="2" class="form-control date-filter" id="time_minutes" v-model="form.time_minutes" placeholder="Minutes">
          <span class="input-group-addon">:</span>
          <input type="text" maxlength="2" class="form-control date-filter" id="time_seconds" v-model="form.time_seconds" placeholder="Seconds">
        </div>
        <div class="help-block" v-if="errors.time">
          <div v-for="error in errors.time"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-md-8 col-md-offset-4">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {

    props: {
      form: {
        type: Object,
        required: true,
      },
      errors: {
        type: Object,
      }
    },

    methods: {

      onSubmit() {
        this.$emit('onSubmit', {
          date: this.form.date,
          distance: this.form.distance,
          time: this.form.time_hours + ':' + this.form.time_minutes + ':' + this.form.time_seconds,
        })
      }

    }

  }
</script>
