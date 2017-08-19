
<style lang="scss">
  $width: 350px;
  .toast {
    position: fixed;
    width: $width;
    z-index: 10000;
  }
  .toast-message {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 15px;
    width: 100%;
    color: #fff;
    transition: 400ms cubic-bezier(0.17, 0.67, 0.17, 0.98);
    transition-property: opacity, transform;
  }
  .toast-button {
    position: absolute;
    top: 0;
    right: 5px;
    padding: 2px;
    background-color: transparent;
    border-width: 0;
    font-size: 1.5em;
    color: inherit;
    cursor: pointer;
  }
  .toast-button::before {
    content: '\d7';
  }
  /**
   * Transition
   */
  .toast-enter-active,
  .toast-leave {
    opacity: 1;
  }
  .toast-enter,
  .toast-leave-active {
    opacity: 0;
  }
  .toast-leave-active {
    position: absolute;
  }
  /**
   * Position
   */
  .toast-position-n {
    top: 10px;
    left: 50%;
    margin-left: -$width / 2;
  }
  .toast-position-s {
    bottom: 10px;
    left: 50%;
    margin-left: -$width / 2;
  }
  .toast-position-ne {
    top: 10px;
    right: 10px;
  }
  .toast-position-nw {
    top: 10px;
    left: 10px;
  }
  .toast-position-se {
    bottom: 10px;
    right: 10px;
  }
  .toast-position-sw {
    bottom: 10px;
    left: 10px;
  }
  /**
   * Transition with position
   */
  .toast-position-n,
  .toast-position-ne,
  .toast-position-nw {
    .toast-enter,
    .toast-leave-active {
      transform: translateY(-20px);
    }
  }
  .toast-position-s,
  .toast-position-se,
  .toast-position-sw {
    .toast-enter {
      transform: translateY(20px);
    }
    .toast-leave-active {
      transform: translateY(-100%) translateY(20px);
    }
  }
  /**
   * Types
   */
  .toast-type-info {
    background-color: #43b4ec;
  }
  .toast-type-success {
    background-color: #3add93;
  }
  .toast-type-warning {
    background-color: #efd700;
  }
  .toast-type-danger {
    background-color: #f3755e;
  }
</style>

<template>
  <div class="toast" :class="positionClass">
    <toast-transition>
      <div class="toast-message" :class="messageTypeClass(m)" v-for="m in messages" :key="m.id" role="note">
        <div class="toast-message-text">{{ m.text }}</div>
        <button class="toast-button" aria-label="Close" type="button" @click="close(m.id)"></button>
      </div>
    </toast-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  props: {
    position: {
      validator(value) {
        return /^(:?n|s|nw|ne|sw|se)$/.test(value)
      },
      default: 'ne',
    }
  },

  computed: {
    ...mapGetters({
      messages: 'toastMessages'
    }),
    positionClass() {
      return `toast-position-${this.position}`
    }
  },

  methods: {
    ...mapActions({
      close: 'removeToastMessage'
    }),
    messageTypeClass(message) {
      return `toast-type-${message.type}`
    }
  },

  components: {
    ToastTransition: {
      functional: true,
      render(h, { children }) {
        const data = {
          attrs: { tag: 'div', name: 'toast', type: 'transition' }
        };
        return h('transition-group', data, children)
      }
    }
  }
}
</script>
