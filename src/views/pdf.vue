<template>
  <div>
    <b-container>
      <div id="content" style="border: 2px solid gray;border-radius: 10px;width: 21cm;box-shadow: 5px 5px 5px #888888;">
        <div style="margin-top: 10px;">TESTPDF</div>
      </div>
    </b-container>
    <input type="file" ref="fileInput" @change="handleFileChangeInstructor" />
    <button @click="testpdf()">Test</button>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    testpdf () {
      console.log("testpdf")
    },
    handleFileChangeInstructor (event) {
      const file = event.target.files[0];
      let reader = new FileReader()
      reader.readAsText(file,'CP1251')
      reader.onload = readerEvent => {
      let content = readerEvent.target.result;
      let data = content.substring(1, 131)
      console.log('readFormFile', content)
      console.log('readFormFileLeng', data)
   }
    }
  },
}
</script>