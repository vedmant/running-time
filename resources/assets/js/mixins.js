import Vue from 'vue';

Vue.mixin({
  methods: {
    range: function(begin, end) {
      var offset = begin > end ? end : begin;
      var delta = Math.abs(end - begin);
      var result = [];
      for (var i = 0; i <= delta; i++) {
        result.push(i + offset);
      }

      return result;
    }
  }
});