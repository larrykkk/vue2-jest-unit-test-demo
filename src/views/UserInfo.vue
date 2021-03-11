<template>
  <div v-if="user.name" class="home">
    <h1>{{ user.name }}</h1>
    <div>email: {{ user.email }} user</div>
    <div>phone: {{ user.phone }} user</div>
    <div>website: {{ user.website }} user</div>
    <button @click="like">{{ isLiked ? "dislike" : "like" }}</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserInfo",
  data() {
    return {
      user: {},
      isLiked: false,
    };
  },
  methods: {
    like() {
      axios
        .post(`https://jsonplaceholder.typicode.com/posts`, {
          isLiked: this.isLiked,
        })
        .then((res) => {
        //   console.log(res);
          res.data.isLiked = !this.isLiked;
          this.isLiked = res.data.isLiked;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`
      )
      .then((res) => {
        // console.log(res);
        this.user = res.data;
      })
      .catch((err) => {
        throw Error("API Error occurred." + err);
      });
  },
};
</script>
