<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <button @click="exportToExcel">Export to Excel</button>
    <br><br>
    <button @click="testSendData">testSendData</button>
    <!-- <pre v-if="jsonData">{{ jsonData }}</pre> -->
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';

export default {
  data() {
    return {
      jsonData: null,
      jsondata2: null,
      jsonArray: [],
      testdata: ''
    };
  },
  methods: {
    testSendData () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      // axios.get('http://localhost:4000/product')
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(error => {
      //   console.error('Error fetching data:', error.message);
      // });
      console.log(this.testdata)
      axios.post('http://localhost:4000/personal', this.testdata)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
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
        this.jsonData = JSON.parse(this.jsonData)
        this.jsonData.shift()
        // console.log('mapdata1: ', this.jsonData)
        console.log('JSONLenght: ',  this.jsonData)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ',  typeof(this.jsonData))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobject = {}
        let jsonobject2 = this.jsonData
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
        this.jsondata2 = jsonMap
        axios.post('http://localhost:4000/personal', this.jsondata2)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      };

      reader.readAsBinaryString(file);
    },
    exportToExcel() {
      console.log('JSONTYPEOF2Aftermap2', this.jsondata2[1])
      this.jsonArray = Object.values(this.jsondata2);
      console.log('JSONTYPEOF2Aftermap23', this.jsonArray)
      // const valuearray = Object.values(this.jsondata2)
      // jsonarray = Array.from({ length: valuearray.length });
      // console.log('jsonarray', jsonarray);
      // Create a new workbook
      // if (!Array.isArray(this.jsonData2) || this.jsonData2.length === 0) {
      //   console.error('Invalid JSON data.');
      //   return;
      // }
      const workbook = XLSX.utils.book_new();
      
      // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.jsonArray);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Save the workbook to a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');
    },
  },
};
</script>