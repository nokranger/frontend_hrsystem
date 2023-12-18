<template>
  <div>
    HR Systems for test import data from excel
    <br>
    <br>
    <div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="uploadData">Upload Data</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadData() {
      const formData = new FormData();
      formData.append('file', this.file);

      // Use axios or another HTTP library to send the file to the server
      // Example using axios:
      // axios.post('http://your-server/upload', formData)
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>