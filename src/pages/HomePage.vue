<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
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
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewTweet"
            class="q-mb-lg"
            :disabled="!newTweetContent"
            unelevated
            rounded
            no-caps
            color="primary"
            label="Tweet"
          />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-item
            v-for="tweet in tweetData"
            :key="tweet.date"
            class="tweet q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="lg">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Annie</strong>
                <span class="text-grey-7">
                  @annie_og <br class="lt-md" />&bull;
                  {{ formattedDate(tweet.date) }}</span
                ></q-item-label
              >
              <q-item-label class="tweet-content text-body1">
                {{ tweet.content }}
              </q-item-label>

              <div class="tweet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />
                <q-btn flat round color="grey" size="sm" icon="far fa-heart" />
                <q-btn
                  @click="deleteTweet(tweet)"
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      newTweetContent: "",
      tweetData: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: 1676546321163,
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          date: 1676546398474,
        },
      ],
    };
  },
  filters: {
    // "filters" is deprecated, so written different function in "methods"
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
  methods: {
    formattedDate(tweet_date) {
      return formatDistance(tweet_date, new Date());
    },
    addNewTweet() {
      let newTweet = {
        content: this.newTweetContent,
        date: Date.now(),
      };
      this.tweetData.unshift(newTweet);
      this.newTweetContent = "";
    },
    deleteTweet(tweet) {
      let dateToDelete = tweet.date;
      let index = this.tweetData.findIndex(
        (tweet) => tweet.date === dateToDelete
      );
      // console.log("index of tweet: " + index);
      this.tweetData.splice(index, 1);
    },
  },
});
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.tweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)

.tweet-content
  white-space: pre-line

.tweet-icons
  margin-left: -5px
</style>
