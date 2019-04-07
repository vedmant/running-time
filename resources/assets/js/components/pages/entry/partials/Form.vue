<template>
  <form id="entry_form" class="form-horizontal" role="form" @submit.prevent="onSubmit">

    <div class="form-group" :class="{ 'has-error': errors.date }">
      <label class="col-md-4 control-label">Date</label>
      <div class="col-md-6">
        <input id="date" v-model="form.date" type="date" class="form-control">
        <div v-if="errors.date" class="help-block">
          <div v-for="(error, index) in errors.date" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.distance }">
      <label class="col-md-4 control-label">Distance</label>
      <div class="col-md-6">
        <div class="input-group">
          <input id="distance" v-model="form.distance" type="number" class="form-control">
          <span class="input-group-addon">km</span>
        </div>
        <div v-if="errors.distance" class="help-block">
          <div v-for="(error, index) in errors.distance" :key="index"><strong>{{ error }}</strong></div>
        </div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.time }">
      <label class="col-md-4 control-label">Time</label>
      <div class="col-md-6">
        <div class="input-group">
          <input id="time_hours" v-model="form.time_hours" type="text" maxlength="2" class="form-control date-filter" placeholder="Hours">
          <span class="input-group-addon">:</span>
          <input id="time_minutes" v-model="form.time_minutes" type="text" maxlength="2" class="form-control date-filter" placeholder="Minutes">
          <span class="input-group-addon">:</span>
          <input id="time_seconds" v-model="form.time_seconds" type="text" maxlength="2" class="form-control date-filter" placeholder="Seconds">
        </div>
        <div v-if="errors.time" class="help-block">
          <div v-for="(error, index) in errors.time" :key="index"><strong>{{ error }}</strong></div>
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
  import padStart from 'lodash-es/padStart'

  export default {

    props: {
      form: {
        type: Object,
        required: true,
      },
      errors: {
        type: Object,
        default: () => ({}),
      }
    },

    methods: {

      onSubmit () {
        this.$emit('onSubmit', {
          date: this.form.date,
          distance: this.form.distance,
          time: padStart(this.form.time_hours, 2, '0') +
          ':' + padStart(this.form.time_minutes, 2, '0') +
          ':' + padStart(this.form.time_seconds, 2, '0'),
        })
      }

    },

  }
</script>
