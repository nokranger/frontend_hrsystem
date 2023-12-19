<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <!-- <pre v-if="jsonData">{{ jsonData }}</pre> -->
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      jsonData: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        this.readExcel(file);
      }
    },
    readExcel(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonData = JSON.stringify(jsonData, null, 2);
        // console.log('mapdata1: ', this.jsonData)
        console.log('JSONLenght: ',  JSON.parse(this.jsonData))
        console.log('JSONTYPEOF: ',  typeof(this.jsonData))
        console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobject = {}
        let jsonobject2 = JSON.parse(this.jsonData)
        jsonobject = jsonobject2.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMap = jsonobject.map((data, i) => {
              return {
                empCode: data.item1,
                name: data.item2,
                bankaccount: data.item3
              }
            })
        console.log('Aftermap', jsonobject)
        console.log('Aftermap2', jsonMap)
        console.log('JSONTYPEOF2Aftermap: ',  typeof(jsonobject))
      };

      reader.readAsBinaryString(file);
    },
  },
};
</script>