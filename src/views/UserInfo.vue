<template>
  <div class="home">
    <h1>{{ user.name }}</h1>
    <div>email: {{ user.email }} user</div>
    <div>phone: {{ user.phone }} user</div>
    <div>website: {{ user.website }} user</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserInfo",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`
      )
      .then((res) => {
        console.log(res);
        this.user = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>
