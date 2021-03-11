<template>
  <div class="home">
    <h1>Users</h1>
    <span>{{ list.length }} user</span>
    <ul>
      <span v-if="!list.length">找不到資料</span>
      <li v-else v-for="user in list" :key="user.id">
        <router-link
          :to="{ name: 'User', params: { id: user.id } }"
          :class="{ red: user.name.length > 17 }"
          >{{ user.name }}</router-link
        >
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
    this.getData({ data: "foo" });
  },
  methods: {
    async getData(data) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users`, data)
        .then((res) => {
          // console.log(res);
          this.list = res.data;
        })
        .catch((err) => {
          this.error(err);
        });
    },
    error(err) {
      throw new Error(err);
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
