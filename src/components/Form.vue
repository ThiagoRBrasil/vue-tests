<template>
  <div>
    <h1>Form</h1>
    <h2 v-show="isFormCompleted" class="form_h2_welcome_message">Welcome {{ fullname }}</h2>
    <div>
      <label>Name:</label>
      <input v-model="name" class="form_input_name" type="text" name="formName" />
    </div>
    <div>
      <label>Last Name:</label>
      <input v-model="lastName" class="form_input_lastname" type="text" name="formLastName" />
    </div>
    <h1 v-show="isFormCompleted" class="form_h1_address">Address</h1>
    <button @click="goToHome" class="form_button_go_home">Home</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    lastName: '',
  }),
  computed: {
    fullname() {
      return `${this.name} ${this.lastName}`;
    },
    isFormCompleted() {
      // eslint-disable-next-line object-curly-newline
      const { isValidString, hasOnlyLetters, name, lastName } = this;
      return (
        // eslint-disable-next-line operator-linebreak
        isValidString(name) &&
        // eslint-disable-next-line operator-linebreak
        isValidString(lastName) &&
        // eslint-disable-next-line operator-linebreak
        hasOnlyLetters(name) &&
        // eslint-disable-next-line operator-linebreak
        hasOnlyLetters(lastName)
      );
    },
    isValidName() {
      return this.name.length > 1;
    },
    isValidLastName() {
      return this.name.lastName > 1;
    },
  },
  methods: {
    isValidString(string) {
      return string.length > 1;
    },
    hasOnlyLetters(string) {
      const lettersRegex = /^[A-Za-z]+$/;
      return !!string.match(lettersRegex);
    },
    goToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style></style>
