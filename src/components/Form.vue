<template>
  <div>
    <h1>Form</h1>
    <h2 v-if="isFormCompleted" class="form_h2_welcome_message">Welcome {{ fullname }}</h2>
    <div>
      <label>Name:</label>
      <input v-model="name" class="form_label_name" type="text" name="formName" />
    </div>
    <div>
      <label>Last Name:</label>
      <input v-model="lastName" class="form_label_lastname" type="text" name="formLastName" />
    </div>
    <h1 v-if="isFormCompleted" class="form_h1_address">Address</h1>
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
      const { isValidString, hasOnlyLetters, name, lastName } = this;
      return (
        isValidString(name) &&
        isValidString(lastName) &&
        hasOnlyLetters(name) &&
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
  },
};
</script>

<style></style>
