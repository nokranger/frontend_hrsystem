<template>
  <div>
    <div>
      <div>
        Personal Data
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="exportToExcel">Export to Excel</button>
      <br><br>
      <button @click="PersonalSendData">PersonalSendData</button>
    </div>
    <br>
    <br>
    <div>
      <div>
        Instructor Data
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="exportToExcel">Export to Excel</button>
      <br><br>
      <button @click="PersonalSendData">Instructor Data</button>
    </div>
    <br>
    <br>
    <div>
      <div>
        T-nos Data
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="exportToExcel">Export to Excel</button>
      <br><br>
      <button @click="PersonalSendData">T-nos Data</button>
    </div>
    <br>
    <br>
    <div>
      <div>
        Welfare Data
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="exportToExcel">Export to Excel</button>
      <br><br>
      <button @click="PersonalSendData">Welfare Data</button>
    </div>
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
      excelarray: [],
      testdata: ''
    };
  },
  methods: {
    PersonalSendData () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      axios.get('http://localhost:4000/personals')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
        let jsonMaps = dataexcel.map((data, i) => {
              return {
                "Emp. Code": data.emp_code,
                "Name - Surname": data.name,
                "Bank account number": data.bank_account_number
              }
            })
            console.log('resdataExcel', jsonMaps);
            this.excelarray = Object.values(jsonMaps);
            console.log('JSONTYPEOF2Aftermap23', this.excelarray)

            //export to excell
            const workbook = XLSX.utils.book_new();
            
            // Convert the JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'exported_data.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
      // console.log(this.testdata)
      // axios.post('http://localhost:4000/personal', this.testdata)
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(error => {
      //   console.error('Error fetching data:', error.message);
      // });
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

      //export to excell
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