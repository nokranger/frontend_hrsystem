<template>
  <div>
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
          <br>
          <br>
          <div>
            Welfare Data
          </div>
          <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
          <!-- <button @click="exportToExcelWelfare">Export to Excel</button> -->
          <br><br>
          <!-- <button @click="WelfareSendData">Welfare Data</button> -->
        </div>
      </div>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;margin: 20px;">Export Master Data</h1>
      </div>
      <div style="border: 2px solid gray;border-radius: 10px;height: 400px;box-shadow: 5px 5px 5px #888888;margin-top: 20px;">
        <div>
      <!-- <div>
        Master Data
      </div> -->
      <!-- <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
      <button @click="exportToExcelWelfare">Export to Excel</button> -->
      <!-- <br><br>{{ excelarray.length }} -->
      <br>
      <br>
      <b-row  style="margin: 10px;">
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickertnos" v-model="datetnosfrom" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickertnos2" v-model="datetnosto" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <div style="text-align: left;">
            <b-button @click="MasterSendData" variant="outline-primary">TNOS</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row  style="margin: 10px;">
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickerwelfare" v-model="datewelfarefrom" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickerwelfare2" v-model="datewelfareto" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <div style="text-align: left;">
            <b-button @click="instructorGetData()" variant="outline-success">INSTUCTOR</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row  style="margin: 10px;">
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickerinstuctor" v-model="dateinstuctorfrom" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker style="width: 100%;" id="example-datepickerinstuctor2" v-model="dateinstuctorto" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <div style="text-align: left;">
            <b-button @click="welfareGetdata" variant="outline-danger">WELFARE</b-button>
          </div>
        </b-col>
      </b-row>
      <!-- <b-button @click="MasterSendData" variant="outline-primary">TNOS</b-button> -->
      <!-- <br>
      <br> -->
      <!-- <br>{{ excelarrayinstructor.length }} -->
      <!-- <b-button @click="instructorGetData()" variant="outline-success">INSTUCTOR</b-button> -->
      <!-- <br>
      <br> -->
      <!-- <br>{{ excelarraywelfare.length }} -->
      <!-- <b-button @click="welfareGetdata" variant="outline-danger">WELFARE</b-button> -->
      <!-- <br>
      <br> -->
      <!-- <div>
        <div>SUM LENGTH = {{ excelarray.length + excelarrayinstructor.length + excelarraywelfare.length}}</div>
      </div> -->
    </div>
    <br>
    <br>
    <!-- <div>
      <div>
        Generate PDF
      </div> -->
      <!-- <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
      <button @click="exportToExcelWelfare">Export to Excel</button> -->
      <!-- <br><br>
      <button @click="generatePDF">Generate PDF</button>
    </div> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
const { getJsDateFromExcel } = require("excel-date-to-js");
// import fs from 'fs'

// import { PDFDocument } from 'pdf-lib'
// import NotoSerifThai from '../views/NotoSerifThai.ttf'
// import fontkit from 'fontkit';
// import aa from '../'
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
  mounted () {
    // let th = this
    //     // Load the Noto Sans Thai font (replace the URL with the actual font file URL)
    //     const fontUrl = 'https://cdn.jsdelivr.net/gh/lazywasabi/thai-web-fonts@7/fonts/NotoSansThai/NotoSansThai-Regular.woff2';
    // fetch(fontUrl)
    //   .then((response) => response.arrayBuffer())
    //   .then((fontData) => {
    //     th.notoSansThaiFont = fontkit.create(new Uint8Array(fontData));
    //   })
    //   .catch((error) => {
    //     console.error('Error loading font:', error);
    //   });
  },
  methods: {
    generatePDF() {
      let data = [
      { name: 'ดฟหดฟหดฟหดฟหดฟหด', age: 30 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดฟหดฟหด', age: 30 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดฟหดฟหด', age: 30 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      { name: 'ดฟหดฟหดฟหดหฟดหฟ', age: 25 },
      
      // Add more data as needed
    ]
    const header = { text: 'List of People', style: 'header' };
    const content = []
    data.forEach((item) => {
      content.push(
        header,
        { text: `Name: ${item.name}, Age: ${item.age}`, font: 'AngsanaNew', margin: [0, 0, 0, 10]},
      )
    })
    content.pop();
    const documentDefinition = {
      content: content,
      pageBreak: 'auto'
      // styles: {
      //   header: {
      //     fontSize: 18,
      //     margin: [0, 0, 0, 10]
      //   }
      // }
    };

    pdfMake.createPdf(documentDefinition).open();
  },
    // async generatePDF(data) {
    //   const jsonData = [
    //     { title: 'Product 1', name: 'Document1', price: '$19.99' },
    //     { title: 'Product 2', name: 'Document2', price: '$29.99' },
    //     { title: 'Product 3', name: 'Document3', price: '$39.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     { title: 'Product 4', name: 'Document4', price: '$49.99' },
    //     // Add more data as needed
    //   ];
    //   // const fontkit = require('@pdf-lib/fontkit')
    //   // const fontUrl = 'https://cdn.jsdelivr.net/gh/lazywasabi/thai-web-fonts@7/fonts/NotoSansThai/NotoSansThai-Regular.woff2';
    //   // const response = await fetch(fontUrl);
    //   // const fontData = await response.arrayBuffer();
    //   // const notoSansThaiFont = fontkit.create(new Uint8Array(fontData));
    //   const pdfDoc = await PDFDocument.create();
    //   let page = pdfDoc.addPage();
    //   // Customize the PDF content based on your requirements
    //   let xPosition = 50; // Initial x-position for text
    //   // const yPosition = 700; // Fixed y-position for horizontal alignment
    //   let yStart = 700; // Fixed y-position for horizontal titles
    //   let { width, height } = page.getSize();
    //   const margin = 50;
    //   height = 700
    //   let yPosition = height - margin;
    //   // Embed the custom font

    //   // const fontBytes = await this.loadFont(NotoSerifThai);
    //   // const customFont = await pdfDoc.embedFont(fontBytes);
    //   const fontSize = 12; //

    //   page.drawText(`Titleฟฟฟฟฟฟ`, { x: 50, y: 720 , size: fontSize, font: this.notoSansThaiFont});
    //   page.drawText(`Name`, { x: 200, y: 720 , size: fontSize});
    //   page.drawText(`Price`, { x: 350, y: 720 , size: fontSize});
    //   let count = 0
    //   let countPage = 1
    //   page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
    //   for (const data of jsonData) {
    //     console.log('count', jsonData.length)
    //     // const titleHeight = 20; // Adjust as needed
    //     const descriptionHeight = 30; // Adjust as needed

    //     // Check if there is enough space on the current page
    //     if (yPosition - descriptionHeight < margin) {
    //       countPage++;
    //       // Create a new page if the content doesn't fit
    //       page = pdfDoc.addPage();
    //       page.drawText(`Title`, { x: 50, y: 720 , size: fontSize});
    //       page.drawText(`Name`, { x: 200, y: 720 , size: fontSize});
    //       page.drawText(`Price`, { x: 350, y: 720 , size: fontSize});
    //       page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
    //       yPosition = height - margin;
    //     }
    //     page.drawText(`${data.title}`, { x: 50, y: yPosition, fontSize});
    //     // const yNameStart = yStart + 20;
    //     page.drawText(`${data.name}`, { x: 200, y: yPosition, fontSize});
    //     // const yPriceStart = yNameStart + 20;
    //     page.drawText(`${data.price}`, { x: 350, y: yPosition, fontSize});
    //     yPosition -= descriptionHeight; // Adjust x-position for the next entry
    //     count++
    //     if (count > jsonData.length - 1) {
    //       console.log('countPDF ', count);
    //       page.drawText(`Total`, { x: 350, y: yPosition - 20 , size: fontSize});
    //     }
    //   }

    //   // page.drawText(`${jsonData.title}`, { x: 50, y: 700 });
    //   // page.drawText(`${jsonData.name}`, { x: 200, y: 700 });
    //   // page.drawText(`${jsonData.price}`, { x: 350, y: 700 });
    //   // page.drawText(`${jsonData.title}`, { x: 50, y: 720 });
    //   // page.drawText(`${jsonData.name}`, { x: 200, y: 720 });
    //   // page.drawText(`${jsonData.price}`, { x: 350, y: 720 });

    //   // Save the PDF to a file or display it in a new tab
    //   const pdfBytes = await pdfDoc.save();
    //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //   const url = URL.createObjectURL(blob);
    //   window.open(url, '_blank');
    // },
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
    MasterSendData () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
          from: this.datetnosfrom,
          to: this.datetnosto
        }
      axios.post('http://localhost:4000/masterdata', from_to)
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
        // let jsonMaps = dataexcel.map((data, i) => {
        //       return {
        //         "Emp. Code": data.emp_code,
        //         "Name - Surname": data.name,
        //         "Bank account number": data.bank_account_number
        //       }
        //     })
            // console.log('resdataExcel', jsonMaps);
            this.excelarray = Object.values(dataexcel)
            console.log('JSONTYPEOF2Aftermap23', this.excelarray)

            // //export to excell
            // const workbook = XLSX.utils.book_new();
            
            // // Convert the JSON data to a worksheet
            // const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

            // // Add the worksheet to the workbook
            // XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

            // // Save the workbook to a file
            // XLSX.writeFile(workbook, 'exported_data.xlsx');
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
    instructorGetData () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
          from: this.dateinstuctorfrom,
          to: this.dateinstuctorto
        }
      axios.post('http://localhost:4000/instructorgetdata', from_to)
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
        // let jsonMaps = dataexcel.map((data, i) => {
        //       return {
        //         "Emp. Code": data.emp_code,
        //         "Name - Surname": data.name,
        //         "Bank account number": data.bank_account_number
        //       }
        //     })
            // console.log('resdataExcel', jsonMaps);
            this.excelarrayinstructor = Object.values(dataexcel)
            console.log('JSONTYPEOF2Aftermap23', this.excelarrayinstructor)

            // //export to excell
            // const workbook = XLSX.utils.book_new();
            
            // // Convert the JSON data to a worksheet
            // const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

            // // Add the worksheet to the workbook
            // XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

            // // Save the workbook to a file
            // XLSX.writeFile(workbook, 'exported_data.xlsx');
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
    welfareGetdata () {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
          from: this.datewelfarefrom,
          to: this.datewelfareto
        }
      axios.post('http://localhost:4000/welfaregetdata', from_to)
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
        // let jsonMaps = dataexcel.map((data, i) => {
        //       return {
        //         "Emp. Code": data.emp_code,
        //         "Name - Surname": data.name,
        //         "Bank account number": data.bank_account_number
        //       }
        //     })
            // console.log('resdataExcel', jsonMaps);
            this.excelarraywelfare = Object.values(dataexcel);
            // this.excelarraywelfare = dataexcel
            console.log('JSONTYPEOFwelfare', this.excelarray.length)
            // console.log('combinedata1', this.excelarray[0].tlep_driver_name)
            // console.log('combineArrayExport', combineArray)
            const combinedArray = []
            for (let i = 0; i < this.excelarray.length; i++) {
              const combinedObject = {
                Working_date: this.excelarray[i].Working_date || '',
                job_code: this.excelarray[i].job_code || '',
                shift: this.excelarray[i].shift || '',
                trip_no: this.excelarray[i].trip_no || '',
                ttt_employee_code: this.excelarray[i].ttt_employee_code || '',
                tlep_driver_code: this.excelarray[i].tlep_driver_code || '',
                tlep_driver_name: this.excelarray[i].tlep_driver_name || '',
                company_code: this.excelarray[i].ompany_code || '',
                company_name: this.excelarray[i].company_name || '',
                trailer_code: this.excelarray[i].trailer_code || '',
                trailer_type_code: this.excelarray[i].trailer_type_code || '',
                trailer_type: this.excelarray[i].trailer_type || '',
                ttt_payment_status: this.excelarray[i].ttt_payment_status || '',
                calling_sheet_no: this.excelarray[i].calling_sheet_no || '',
                trip_type: this.excelarray[i].trip_type || '',
                recieve_job_dateandtime: this.excelarray[i].recieve_job_dateandtime || '',
                from_code: this.excelarray[i].from_code || '',
                from_name: this.excelarray[i].from_name || '',
                yard_out_dateandtime: this.excelarray[i].yard_out_dateandtime || '',
                to_code: this.excelarray[i].to_code || '',
                to_name: this.excelarray[i].to_name || '',
                to_in_dateandtime: this.excelarray[i].to_in_dateandtime || '',
                reture_code: this.excelarray[i].reture_code || '',
                return_name: this.excelarray[i].return_name || '',
                return_in_dateandtime: this.excelarray[i].return_in_dateandtime || '',
                loading_units: this.excelarray[i].loading_units || '',
                loading_count: this.excelarray[i].loading_count || '',
                unloading_count: this.excelarray[i].unloading_count || '',
                number_of_driver: this.excelarray[i].number_of_driver || '',
                nd2_employee_code: this.excelarray[i].nd2_employee_code || '',
                nd2_tlep_driver_code: this.excelarray[i].nd2_tlep_driver_code || '',
                nd2_tlep_driver_name: this.excelarray[i].nd2_tlep_driver_name || '',
                mileage: this.excelarray[i].mileage || '',
                allowance: this.excelarray[i].allowance || '',
                allowance2: this.excelarray[i].allowance2 || '',
                allowance3: this.excelarray[i].allowance3 || '',
                allowance4: this.excelarray[i].allowance4 || '',
                total_allowance: this.excelarray[i].total_allowance || '',
                standard_ot: this.excelarray[i].standard_ot || '',
                over_ot: this.excelarray[i].over_ot || '',
                total_ot: this.excelarray[i].total_ot || '',
                payment_status: this.excelarray[i].payment_status || '',
                ot_payment_date: this.excelarray[i].ot_payment_date || '',
                allowance_payment_date: this.excelarray[i].allowance_payment_date || '',
                TAX_FLAG: this.excelarray[i].TAX_FLAG || ''
              };

              combinedArray.push(combinedObject);
              
            }
            for (let j = 0; j < this.excelarrayinstructor.length; j++) {
                const combinedObject = {
                // AA: this.excelarraywelfare[j].DEALER1 || '',
                to_name: this.excelarrayinstructor[j].DEALER1,
                tlep_driver_name: this.excelarrayinstructor[j].NAME || '',
                TAX_FLAG: this.excelarrayinstructor[j].TAX_FLAG || '',
                yard_out_dateandtime: this.excelarrayinstructor[j].DEPARTURE_DATETIME || '',
                total_allowance: this.excelarrayinstructor[j].TRIP_ALLOWANCE || '',
                total_ot: this.excelarrayinstructor[j].OT_HOURS || '',
                tlep_driver_code: this.excelarrayinstructor[j].DRIVER1 || '',
                trip_no: this.excelarrayinstructor[j].TRIP_NO || ''

                // BB: object1[i].BB || '',
                // CC: object2[i].AC || object1[i].CC || ''
              };
              combinedArray.push(combinedObject);
            }
            for (let j = 0; j < this.excelarraywelfare.length; j++) {
                const combinedObject = {
                // AA: this.excelarraywelfare[j].DEALER1 || '',
                to_name: this.excelarraywelfare[j].DEALER1,
                tlep_driver_name: this.excelarraywelfare[j].NAME || '',
                TAX_FLAG: this.excelarraywelfare[j].TAX_FLAG || '',
                yard_out_dateandtime: this.excelarraywelfare[j].YARDOUTDATE || '',
                total_allowance: this.excelarraywelfare[j].TRIP_ALLOWANCE || '',
                total_ot: this.excelarraywelfare[j].OT_HOURS || '',
                tlep_driver_code: this.excelarraywelfare[j].DRIVER1 || '',
                trip_no: this.excelarraywelfare[j].TRIP_NO || ''

                // BB: object1[i].BB || '',
                // CC: object2[i].AC || object1[i].CC || ''
              };
              combinedArray.push(combinedObject);
            }
            console.log('combinedObject', combinedArray)
            //export to excell
            const workbook = XLSX.utils.book_new();
            
            // Convert the JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(combinedArray);

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
        console.log('JSONTYPEOF: ',  typeof(this.jsonDataTnos))
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
        console.log('JSONLenght: ',  this.jsonDataInstructor)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        console.log('JSONTYPEOF: ',  typeof(this.jsonDataInstructor))
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
        console.log('JSONTYPEOF2Aftermap: ',  typeof(jsonobjectInstructor))
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
