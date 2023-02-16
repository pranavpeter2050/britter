<template>
  <q-page class="">
    <div class="q-py-lg q-px-md">
      <q-input
        class="new-tweet"
        bottom-slots
        v-model="newTweetContent"
        placeholder="What's happening?"
        counter
        maxlength="280"
        :dense="dense"
        autogrow
      >
        <template v-slot:before>
          <q-avatar size="lg">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>

        <template v-slot:after>
          <q-btn
            :disabled="!newTweetContent"
            unelevated
            rounded
            no-caps
            color="primary"
            label="Tweet"
          />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      newTweetContent: "",
    };
  },
});
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
</style>
