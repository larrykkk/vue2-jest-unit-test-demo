<template>
  <div class="home">
    <h1>Users</h1>
    <span>{{ list.length }} user</span>
    <ul>
      <li v-for="user in list" :key="user.id">
        <router-link :to="{ name: 'User', params: { id: user.id } }">{{
          user.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        console.log(res);
        this.list = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>
