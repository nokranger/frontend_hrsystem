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
      reader.readAsText(file,'UTF-8')
      reader.onload = readerEvent => {
      let content = 'H0000010023863014746TOYOTA TRANSPORT (THAILAN15032400000000000000000000000000000000000000000000000000000000000000000000000000000\r';
      let concc = readerEvent.target.result
      let content2 = 'D0000020022400609240C0000200900029                                00000000000000             น.ส.ณทิตา  นิลาโพธิ์\r'
      let content3 = `D0000020022400609240C0000200900029\t\t\t\t00000000000000\tน.ส.ณทิตา  นิลาโพธิ์               \r`
      let data = content.substring(1, 128)
      console.log('readFormFile', data)
      console.log('readFormFileLeng', content.length)
      console.log('readFormFileLeng', concc.length)
      console.log('readFormFileLeng', content2.length)
      console.log('readFormFileLeng', content3.length)
      console.log('readFormFileLeng3', content3)
      console.log('readFormFileLeng2', content2)
   }
    }
  },
}
</script>