<template>
  <form class="form-horizontal" role="form" @submit.prevent="$emit('onSubmit', form)">

    <div class="form-group" :class="{ 'has-error': errors.date }">
      <label class="col-md-4 control-label">Date</label>
      <div class="col-md-6">
        <input type="date" class="form-control" v-model="form.date">
        <div class="help-block" v-if="errors.date"><div v-for="error in errors.date"><strong>{{ error }}</strong></div></div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.distance }">
      <label class="col-md-4 control-label">Distance</label>
      <div class="col-md-6">
        <div class="input-group">
          <input type="number" class="form-control" v-model="form.distance">
          <span class="input-group-addon">km</span>
        </div>
        <div class="help-block" v-if="errors.distance"><div v-for="error in errors.distance"><strong>{{ error }}</strong></div></div>
      </div>
    </div>

    <div class="form-group" :class="{ 'has-error': errors.time_minutes || errors.time_seconds }">
      <label class="col-md-4 control-label">Time</label>
      <div class="col-md-6">
        <div class="row no-gutter">
          <div class="col-sm-5">
            <input type="number" maxlength="2" class="form-control" v-model="form.time_minutes" placeholder="Minutes">
          </div>
          <div class="col-sm-2 text-center margintop5">:</div>
          <div class="col-sm-5">
            <input type="number" maxlength="2" class="form-control" v-model="form.time_seconds" placeholder="Seconds">
          </div>
        </div>
        <div class="help-block" v-if="errors.time_minutes"><div v-for="error in errors.time_minutes"><strong>{{ error }}</strong></div></div>
        <div class="help-block" v-if="errors.time_seconds"><div v-for="error in errors.time_seconds"><strong>{{ error }}</strong></div></div>
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
import { mapState, mapActions } from 'vuex';

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

}
</script>
