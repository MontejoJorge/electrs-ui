<template>
  <div
    class="h-screen flex flex-col items-center justify-center min-h-full p-2"
  >
    <img alt="Electrs" src="@/assets/icon.svg" class="mb-16 rounded-3xl logo" />

    <div class="w-1/2 mb-2">
      <progress-bar :percentage="progress" class="h-1"></progress-bar>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/Utility/ProgressBar";

export default {
  data() {
    return {};
  },
  props: { progress: Number },
  created() {},
  methods: {},
  components: {
    ProgressBar,
  },
};
</script>

<style lang="scss">
.logo {
  height: 20vh;
  max-height: 200px;
  width: auto;
}
.loading-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .loading-footer-logo {
    height: 30px;
  }
}
</style>
