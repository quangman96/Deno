<template>
  <div class="p-3 flex justify-center">
    <div class="w-1/2 py-10 flex flex-wrap justify-center border rounded mt-10">
      <h1 class="text-4xl w-full text-center text-red-900">LOGIN PAGE</h1>
      
      <form class="flex flex-wrap justify-center p-2 m-8" @submit.prevent="submit">
          <span v-if="errors.message" class=" flex text-xs text-red-600">{{
        errors.message
      }}</span>
        <div class="py-2 w-full mb-3">
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter Your Email"
            class="p-2 w-full rounded border shadow"
          />
        </div>
        <span v-if="errors[0]" class="text-xs text-red-600">{{
        errors[0].email
      }}</span>
        <div class="py-2 w-full mb-3">
          <input
            type="password"
            v-model="form.password"
            placeholder="Password"
            class="p-2 w-full rounded border shadow"
          />
        </div>
        <span v-if="errors[1]" class="text-xs text-red-600">{{
        errors[1].password
      }}</span>

        <div class="py-2 w-full mb-5">
          <input
            type="submit"
            value="Login"
            class="px-3 py-2 bg-blue-700 rounded shadow border text-white w-full"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    submit() {
      this.errors = {}
      axios.post("/login", this.form)
      .then(res => {
        this.$cookies.set('token',res.data)
        window.location = '/'
      })
      .catch((e) => this.errors = e.response.data.errors);
    },
  },
};
</script>
