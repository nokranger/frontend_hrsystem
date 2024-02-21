<template>
  <div>
    <b-container>
      <div id="content" style="border: 2px solid gray;border-radius: 10px;height: 29.7cm;width: 21cm;box-shadow: 5px 5px 5px #888888;">
        <div style="margin-top: 10px;">TESTPDF</div>
      </div>
    </b-container>
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
    }
  },
}
</script>