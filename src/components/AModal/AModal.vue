<template>
  <div
    v-if="dialog1"
    class="ant-modal-root"
  >
    <div class="ant-modal-mask" />
    <div
      tabindex="-1"
      class="ant-modal-wrap preview-modal"
      role="dialog"
      style=""
    >
      <div
        class="ant-modal"
        style="width: 60%;"
      >
        <div class="ant-modal-content">
          <button
            type="button"
            aria-label="Close"
            class="ant-modal-close"
            @click="close"
          >
            <span class="ant-modal-close-x"><i
              aria-label="icon: close"
              class="anticon anticon-close ant-modal-close-icon"
            ><svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
              data-icon="close"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              data-spm-anchor-id="0.0.0.i19.2f244490cRFIgm"
            ><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg></i></span>
          </button>
          <div
            class="ant-modal-body"
            data-spm-anchor-id="0.0.0.i22.2f244490cRFIgm"
          >
            <div
              class="preview-modal-content"
            >
              <slot>内容</slot>
            </div>
          </div>
        </div>
        <div
          tabindex="0"
          aria-hidden="true"
          style="width: 0px; height: 0px; overflow: hidden;"
        />
      </div>
    </div>
  </div>
</template>
<script>
import './style.css'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog1: false
    }
  },
  watch: {
    dialog (val) {
      this.dialog1 = val
    }
  },
  methods: {
    close () {
      this.dialog1 = false
      this.$emit('update:dialog', false)
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-modal-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0,0,0,.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color .3s;
}
.ant-modal-close-x {
  display: block;
  width: 56px;
  height: 56px;
  font-size: 16px;
  font-style: normal;
  line-height: 56px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
}
</style>
