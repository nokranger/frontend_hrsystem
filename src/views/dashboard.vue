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
      <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
      <button @click="exportToExcelWelfare">Export to Excel</button>
      <br><br>
      <button @click="WelfareSendData">Welfare Data</button>
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
      jsonDataWelfare: null,
      jsondata2Welfare: null,
      jsonArrayWelfare: [],
      jsonArrayWelfare2: [],
      excelarrayWelfare: [],
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
      console.log('UnWelfare')
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
    WelfareSendData () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      axios.get('http://localhost:4000/personals')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcelWelfare = response.data.result
        let jsonMapsWelfare = dataexcelWelfare.map((data, i) => {
              return {
                "Emp. Code": data.emp_code,
                "Name - Surname": data.name,
                "Bank account number": data.bank_account_number
              }
            })
            console.log('resdataExcel', jsonMapsWelfare);
            this.excelarray = Object.values(jsonMapsWelfare);
            console.log('JSONTYPEOF2Aftermap23', this.excelarrayWelfare)

            //export to excell
            const workbook = XLSX.utils.book_new();
            
            // Convert the JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(this.excelarrayWelfare);

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
    handleFileChangeWelfare(event) {
      console.log('Welfare')
      const file = event.target.files[0];

      if (file) {
        this.readExcelWelfare(file);
      }
    },
    readExcelWelfare(file) {
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
        this.jsonDataWelfare = JSON.stringify(jsonData, null, 2);
        this.jsonDataWelfare = JSON.parse(this.jsonDataWelfare)
        this.jsonDataWelfare.shift()
        // console.log('mapdata1: ', this.jsonData)
        console.log('JSONLenght: ',  this.jsonDataWelfare)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ',  typeof(this.jsonDataWelfare))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectWelfare = {}
        let jsonobject2Welfare = this.jsonDataWelfare
        jsonobjectWelfare = jsonobject2Welfare.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMapWelfare = jsonobjectWelfare.map((data, i) => {
              return {
                TRIP_NO: data.item1,
                TRIP_ALLOWANCE: data.item2,
                TOTAL_ALLOWANCE: data.item3,
                OT_HOURS: data.item4,
                DEPARTURE_POINT: data.item5,
                DEPARTURE_DATETIME: data.item6,
                YARDOUTDATE: data.item7,
                DRIVER1: data.item8,
                NAME: data.item9,
                DRIVER2: data.item10,
                NULLS: data.item11,

              }
            })
            let jsonMapWelfare2 = jsonobjectWelfare.map((data, i) => {
              return {
                TRIP_NO: data.item1,
                DEALER1: data.item12,
                DEALER2: data.item13,
                DEALER3: data.item14,
                DEALER4: data.item15,
                DEALER5: data.item16,
                UNITS1: data.item17,
                UNITS2: data.item18,
                UNITS3: data.item19,
                UNITS4: data.item20,
                UNITS5: data.item21,
                TAX_FLAG: data.item22,
              }
            })
        console.log('Aftermap', jsonobjectWelfare)
        console.log('Aftermap2', jsonMapWelfare)
        console.log('Aftermap22', jsonMapWelfare2)
        console.log('JSONTYPEOF2Aftermap: ',  typeof(jsonobjectWelfare))
        this.jsondata2Welfare = jsonMapWelfare
        this.jsondata2Welfare2 = jsonMapWelfare2
        axios.post('http://localhost:4000/welfare', this.jsondata2Welfare)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        axios.post('http://localhost:4000/welfare2', this.jsondata2Welfare2)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      };

      reader.readAsBinaryString(file);
    },
    exportToExcelWelfare() {
      console.log('JSONTYPEOF2Aftermap2', this.jsondata2Welfare[1])
      this.jsonArrayWelfare = Object.values(this.jsondata2Welfare);
      console.log('JSONTYPEOF2Aftermap23', this.jsonArrayWelfare)

      //export to excell
      const workbook = XLSX.utils.book_new();
      
      // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.jsonArrayWelfare);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Save the workbook to a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');
    },
  },
};
</script>