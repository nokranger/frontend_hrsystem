<template>
  <div>
    <nav>
      <router-link to="/dashboard">Import & Export</router-link> ||
      <router-link to="/Attached">Attached</router-link> ||
      <router-link to="/payroll">Payroll</router-link>
    </nav>
    <b-container>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;margin: 20px;">Import Data</h1>
      </div>
      <div style="border: 2px solid gray;border-radius: 10px;height: 600px;box-shadow: 5px 5px 5px #888888;">
        <div>
          <br>
          <div>
            Personal Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" />
          <!-- <button @click="exportToExcel">Export to Excel</button> -->
          <br><br>
          <!-- <button @click="PersonalSendData">PersonalSendData</button> -->
        </div>
        <br>
        <br>
        <div>
          <div>
            Instructor Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChangeInstructor" />
          <!-- <button @click="exportToExcel">Export to Excel</button>
          <br><br>
          <button @click="PersonalSendData">Instructor Data</button> -->
        </div>
        <br>
        <br>
        <div>
          <div>
            T-nos Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChangeTnos" />
          <!-- <button @click="exportToExcelTnos">Export to Excel</button>
          <br><br>
          <button @click="TnosSendData">T-nos Data</button> -->
        </div>
        <br>
        <br>
        <div>
          <div>
            Welfare Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
          <!-- <button @click="exportToExcelWelfare">Export to Excel</button> -->
          <br><br>
          <!-- <button @click="WelfareSendData">Welfare Data</button> -->
        </div>
        <br>
        <br>
        <div>
          <div>
            Holiday Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChangeHoliday" />
          <!-- <button @click="exportToExcelWelfare">Export to Excel</button> -->
          <br><br>
          <!-- <button @click="WelfareSendData">Welfare Data</button> -->
        </div>
      </div>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;margin: 20px;">Export Master Data</h1>
      </div>
    </b-container>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
const { getJsDateFromExcel } = require("excel-date-to-js");
// import fs from 'fs'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
// import * as fontkit from 'pdf-lib';
// const fontKit = require ('@pdf-lib/fontkit')
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
      excelarraywelfare: [],
      excelarrayinstructor: [],
      jsondataTnos: null,
      jsondataTnos2: null,
      jsondataTnos3: null,
      jsondataTnos4: null,
      jsondataTnos5: null,
      jsonArrayTnos: [],
      excelarrayTnos: [],
      jsonDataInstructor: null,
      jsonDataInstructor2: null,
      jsondataHoliday: null,
      jsonArrayHoliday: [],
      excelarrayHoliday: [],
      testdata: '',
      notoSansThaiFont: null,
      exportexcelarraywelfare: [],
      datetnosfrom: '',
      datetnosto: '',
      datewelfarefrom: '',
      datewelfareto: '',
      dateinstuctorfrom: '',
      dateinstuctorto: '',
    };
  },
  mounted() {
  },
  methods: {
    PersonalSendData() {
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
        console.log('JSONLenght: ', this.jsonData)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ', typeof (this.jsonData))
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
        console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobject))
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
    WelfareSendData() {
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
        console.log('JSONLenght: ', this.jsonDataWelfare)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ', typeof (this.jsonDataWelfare))
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
        console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobjectWelfare))
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
    handleFileChangeHoliday(event) {
      console.log('Holiday')
      const file = event.target.files[0];

      if (file) {
        this.readExcelholiday(file);
      }
    },
    readExcelholiday(file) {
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
        this.jsondataHoliday = JSON.stringify(jsonData, null, 2);
        this.jsondataHoliday = JSON.parse(this.jsondataHoliday)
        this.jsondataHoliday.shift()
        // console.log('mapdata1: ', this.jsonData)
        console.log('JSONLenght: ', this.jsonDataHoliday)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ', typeof (this.jsonDataHoliday))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectHoliday = {}
        let jsonobject2Holiday = this.jsonDataHoliday
        jsonobjectHoliday = jsonobject2Holiday.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMapHoliday = jsonobjectHoliday.map((data, i) => {
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
            TAX_FLAG: data.item22

          }
        })
        console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobjectHoliday))
        this.jsondataHoliday = jsonMapHoliday
        axios.post('http://localhost:4000/holiday', this.jsondataHoliday)
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
    handleFileChangeTnos(event) {
      console.log('Welfare')
      const file = event.target.files[0];

      if (file) {
        this.readExcelTnos(file);
      }
    },
    readExcelTnos(file) {
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
        this.jsonDataTnos = JSON.stringify(jsonData, null, 2);
        this.jsonDataTnos = JSON.parse(this.jsonDataTnos)
        this.jsonDataTnos.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ',  this.jsonDataTnos)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ', typeof (this.jsonDataTnos))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectTnos = {}
        let jsonobject2Tnos = this.jsonDataTnos
        jsonobjectTnos = jsonobject2Tnos.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMapTnos5 = jsonobjectTnos.map((data, i) => {
          return {
            Working_date: data.item1,
            job_code: data.item2,
            shift: data.item3,
            trip_no: data.item4,
            ttt_employee_code: data.item5,
            tlep_driver_code: data.item6,
            tlep_driver_name: data.item7,
            company_code: data.item8,
            company_name: data.item9,
            trailer_code: data.item10,
            trailer_type_code: data.item11,
            trailer_type: data.item12,
            ttt_payment_status: data.item13,
            calling_sheet_no: data.item14,
            trip_type: data.item15,
            recieve_job_dateandtime: data.item16,
            from_code: data.item17,
            from_name: data.item18,
            yard_out_dateandtime: data.item19,
            to_code: data.item20,
            to_name: data.item21,
            to_in_dateandtime: data.item22,
            reture_code: data.item23,
            return_name: data.item24,
            return_in_dateandtime: data.item25,
            loading_units: data.item26,
            loading_count: data.item27,
            unloading_count: data.item28,
            number_of_driver: data.item29,
            nd2_employee_code: data.item30,
            nd2_tlep_driver_code: data.item31,
            nd2_tlep_driver_name: data.item32,
            mileage: data.item33,
            allowance: data.item34,
            allowance2: data.item35,
            allowance3: data.item36,
            allowance4: data.item37,
            total_allowance: data.item38,
            standard_ot: data.item39,
            over_ot: data.item40,
            total_ot: data.item41,
            payment_status: data.item42,
            ot_payment_date: data.item43,
            allowance_payment_date: data.item44,
          }
        })
        console.log('Aftermap', jsonobjectTnos)
        console.log('Aftermap25', jsonMapTnos5)

        this.jsondata2Tnos5 = jsonMapTnos5
      };

      reader.readAsBinaryString(file);
    },
    handleFileChangeInstructor(event) {
      console.log('Instructor')
      const file = event.target.files[0];

      if (file) {
        this.readExcelInstructor(file);
      }
    },
    readExcelInstructor(file) {
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
        this.jsonDataInstructor = JSON.stringify(jsonData, null, 2);
        this.jsonDataInstructor = JSON.parse(this.jsonDataInstructor)
        this.jsonDataInstructor.shift()
        // console.log('mapdata1: ', this.jsonData)
        console.log('JSONLenght: ', this.jsonDataInstructor)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ', typeof (this.jsonDataInstructor))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectInstructor = {}
        let jsonobject2Instructor = this.jsonDataInstructor
        jsonobjectInstructor = jsonobject2Instructor.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMapInstructor = jsonobjectInstructor.map((data, i) => {
          return {
            number: data.item1,
            TRIP_NO: data.item2,
            TRIP_ALLOWANCE: data.item3,
            TOTAL_ALLOWANCE: data.item4,
            NULL1: data.item5,
            NULL2: data.item6,
            DEPARTURE_DATETIME: data.item7,
            DEPARTURE_DATETIME2: data.item8,
            DRIVER1: data.item9,
            NAME: data.item10,
            NULL3: data.item11,
            NULL4: data.item12,

          }
        })
        let jsonMapInstructor2 = jsonobjectInstructor.map((data, i) => {
          return {
            TRIP_NO: data.item2,
            DEALER1: data.item13,
            DEALER2: data.item14,
            DEALER3: data.item15,
            DEALER4: data.item16,
            DEALER5: data.item17,
            UNITS1: data.item18,
            UNITS2: data.item19,
            UNITS3: data.item20,
            UNITS4: data.item21,
            UNITS5: data.item22,
            TAX_FLAG: data.item23,
          }
        })
        console.log('Aftermap', jsonobjectInstructor)
        console.log('Aftermap2', jsonMapInstructor)
        console.log('Aftermap22', jsonMapInstructor2)
        console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobjectInstructor))
        this.jsondata2Instructor = jsonMapInstructor
        this.jsondata2Instructor2 = jsonMapInstructor2
        axios.post('http://localhost:4000/instructor', this.jsondata2Instructor)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
        axios.post('http://localhost:4000/instructor2', this.jsondata2Instructor2)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      };

      reader.readAsBinaryString(file);
    },
  },
};
</script>