<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
            :key="tweet.id"
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
                <q-btn
                  @click="toggleLiked(tweet)"
                  flat
                  round
                  :color="tweet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                />
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
import db from "src/boot/firebase";
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      newTweetContent: "",
      tweetData: [],
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
    async addNewTweet() {
      let newTweet = {
        content: this.newTweetContent,
        date: Date.now(),
        liked: false,
      };
      // this.tweetData.unshift(newTweet);
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "tweets"), newTweet);
      console.log("Document written with ID: ", docRef.id);
      this.newTweetContent = "";
    },
    async deleteTweet(tweet) {
      await deleteDoc(doc(db, "tweets", tweet.id));
    },
    async toggleLiked(tweet) {
      const tweetRef = doc(db, "tweets", tweet.id);

      // Toggle the "liked" field of the tweet_id
      await updateDoc(tweetRef, {
        liked: !tweet.liked,
      });
    },
  },
  mounted() {
    //code below taken from: https://firebase.google.com/docs/firestore/query-data/listen?authuser=1#web-version-9-modular
    const q = query(collection(db, "tweets"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let tweetChange = change.doc.data();
        tweetChange.id = change.doc.id;
        if (change.type === "added") {
          console.log("New tweet: ", tweetChange);
          this.tweetData.unshift(tweetChange);
        }
        if (change.type === "modified") {
          console.log("Modified tweet: ", tweetChange);
          let indexOfTweet = this.tweetData.findIndex(
            (tweet) => tweet.id === tweetChange.id
          );
          Object.assign(this.tweetData[indexOfTweet], tweetChange);
        }
        if (change.type === "removed") {
          console.log("Removed tweet: ", tweetChange);
          let indexOfTweet = this.tweetData.findIndex(
            (tweet) => tweet.id === tweetChange.id
          );
          this.tweetData.splice(indexOfTweet, 1);
        }
      });
    });
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
