<template>
  <div>
    <nav>
      <router-link to="/dashboard">Import & Export</router-link> ||
      <router-link to="/Attached">Attached</router-link> ||
      <router-link to="/payroll">Payroll</router-link>
    </nav>
    <b-container>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;">Attached</h1>
      </div>
      <div style="border: 2px solid gray;border-radius: 10px;height: 400px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach7" v-model="dateattach7from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach72" v-model="dateattach7to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach73" v-model="dateattach7select"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-input v-on:keyup.enter="getOneAttach7" placeholder="Enter Employee Code"
              v-model="dataattach7one"></b-input>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7all" style="box-shadow: 5px 5px 5px #888888;">Attached
                7 PDF</b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7excel" style="box-shadow: 5px 5px 5px #888888;">Attached
                7 Excel</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach8" v-model="dateattach8from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach82" v-model="dateattach8to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach83" v-model="dateattach8select"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-input v-on:keyup.enter="getOneAttach8" placeholder="Enter Employee Code"
              v-model="dataattach8one"></b-input>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-success" @click="getAttach8" style="box-shadow: 5px 5px 5px #888888;">Attached
                8</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach9" v-model="dateattach9from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach92" v-model="dateattach9to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach93" v-model="dateattach9select"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-input v-on:keyup.enter="getOneAttach9" placeholder="Enter Employee Code"
              v-model="dataattach9one"></b-input>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-danger" @click="getAttach9all" style="box-shadow: 5px 5px 5px #888888;">Attached
                9</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach10" v-model="dateattach10from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach102" v-model="dateattach10to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach103" v-model="dateattach10select"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <b-input v-on:keyup.enter="getOneAttach10" placeholder="Enter Employee Code"
              v-model="dataattach10one"></b-input>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-warning" @click="getAttach10" style="box-shadow: 5px 5px 5px #888888;">Attached
                10</b-button>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import moment from 'moment';
export default {
  data() {
    return {
      excelarray: [],
      excelarrayattach7: [],
      excelarrayattach72: [],
      excelarrayattach73: [],
      excelarrayattach9: [],
      excelarrayattach92: [],
      excelarrayattach93: [],
      dateattach7from: '',
      dateattach7to: '',
      dateattach7select: '',
      dataattach7one: '',
      dateattach8from: '',
      dateattach8to: '',
      dateattach8select: '',
      dataattach8one: '',
      dateattach9from: '',
      dateattach9to: '',
      dateattach9select: '',
      dataattach9one: '',
      dateattach10from: '',
      dateattach10to: '',
      dateattach10select: '',
      dataattach10one: '',
      pdfdata: ''
    }
  },
  methods: {
    async getOneAttach7() {
      let from_to = {
        from: this.dateattach7from,
        to: this.dateattach7to,
        emp_code: this.dataattach7one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach7one', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach7 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach7
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF(this.pdfdata)
    },
    getAttach7() {
      axios.get('http://localhost:4000/getdataattach7')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          console.log('JSONTYPEOFwelfare', this.excelarray.length)
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'attached7');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'attached7.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async getAttach7all() {
      let from_to = {
        from: this.dateattach7from,
        to: this.dateattach7to
      }
      await axios.post('http://localhost:4000/getdataattach7', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach7 = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach72', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach72 = Object.values(dataexcel);
          console.log('JSONTYPEOFwelfare', this.excelarray.length)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach73', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach73 = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          // console.log('JSONTYPEOFwelfare', this.excelarray.length)
          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach7.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach7[i].bank_account_number || '',
              emp_code: this.excelarrayattach7[i].emp_code || '',
              name: this.excelarrayattach7[i].name || '',
              total_allowance: this.excelarrayattach7[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number || '',
              emp_code: this.excelarrayattach72[i].emp_code || '',
              name: this.excelarrayattach72[i].name || '',
              total_allowance: this.excelarrayattach72[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number || '',
              emp_code: this.excelarrayattach73[i].emp_code || '',
              name: this.excelarrayattach73[i].name || '',
              total_allowance: this.excelarrayattach73[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
            this.pdfdata = combinedArray
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF(this.pdfdata)
    },
    async getAttach7excel() {
      let from_to = {
        from: this.dateattach7from,
        to: this.dateattach7to
      }
      await axios.post('http://localhost:4000/getdataattach7', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach7 = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach72', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach72 = Object.values(dataexcel);
          console.log('JSONTYPEOFwelfare', this.excelarray.length)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach73', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach73 = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          // console.log('JSONTYPEOFwelfare', this.excelarray.length)
          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach7.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach7[i].bank_account_number || '',
              emp_code: this.excelarrayattach7[i].emp_code || '',
              name: this.excelarrayattach7[i].name || '',
              total_allowance: this.excelarrayattach7[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number || '',
              emp_code: this.excelarrayattach72[i].emp_code || '',
              name: this.excelarrayattach72[i].name || '',
              total_allowance: this.excelarrayattach72[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number || '',
              emp_code: this.excelarrayattach73[i].emp_code || '',
              name: this.excelarrayattach73[i].name || '',
              total_allowance: this.excelarrayattach73[i].total_allowance || '',
            }
            combinedArray.push(combinedObject);
            this.pdfdata = combinedArray
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.exporttoexcel(this.pdfdata)
    },
    async exporttoexcel(data) {
      // console.log('resdata', response.data.result);
      // let dataexcel = response.data.result
      // this.excelarray = Object.values(dataexcel);
      // this.excelarraywelfare = dataexcel
      // console.log('JSONTYPEOFattach8', this.excelarray.length)
      // //export to excell
      const workbook = XLSX.utils.book_new();

      // // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

      // // Save the workbook to a file
      XLSX.writeFile(workbook, 'attached.xlsx');
    },
    async generatePDF(datas) {

      const pdfDoc = await PDFDocument.create()
      pdfDoc.registerFontkit(fontkit)
      let urls = 'https://script-app.github.io/font/THSarabunNew.ttf'
      let thaiFontBytes = await fetch(urls).then(res => res.arrayBuffer());
      let thaiFont = await pdfDoc.embedFont(thaiFontBytes)
      let page = pdfDoc.addPage();
      // Customize the PDF content based on your requirements
      let xPosition = 50; // Initial x-position for text
      // const yPosition = 700; // Fixed y-position for horizontal alignment
      let yStart = 700; // Fixed y-position for horizontal titles
      let { width, height } = page.getSize();
      const margin = 50;
      height = 730
      let yPosition = height - margin;

      const fontSize = 17; //

      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach7select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`เลขที่บันชี`, { x: 100, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รหัส`, { x: 220, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ชื่อ - นามสกุล`, { x: 300, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`จำนวนเงิน`, { x: 500, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach7select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
          page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`เลขที่บันชี`, { x: 100, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`รหัส`, { x: 220, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`ชื่อ - นามสกุล`, { x: 300, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`จำนวนเงิน`, { x: 500, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
          // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
          yPosition = height - margin;
        }
        page.drawText(`${count + 1}`, { x: 50, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.bank_account_number}`, { x: 90, y: yPosition, size: fontSize, font: thaiFont });
        // const yNameStart = yStart + 20;
        page.drawText(`${data.emp_code}`, { x: 220, y: yPosition, size: fontSize, font: thaiFont });
        // const yPriceStart = yNameStart + 20;
        page.drawText(`${data.name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.total_allowance}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${sumValue}`, { x: 470, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async getOneAttach8() {
      let from_to = {
        from: this.dateattach8from,
        to: this.dateattach8to,
        emp_code: this.dataattach8one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach8one', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach8 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach8
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF8(this.pdfdata)
    },
    getAttach8() {
      let from_to = {
        from: this.dateattach8from,
        to: this.dateattach8to
      }
      axios.post('http://localhost:4000/getdataattach8', from_to)
        .then(response => {
          // console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          console.log('JSONTYPEOFattach8', this.excelarray.length)
          // //export to excell
          const workbook = XLSX.utils.book_new();

          // // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'attached8-641610');

          // // Save the workbook to a file
          XLSX.writeFile(workbook, 'attached8-641610.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async generatePDF8(datas) {
      const pdfDoc = await PDFDocument.create()
      pdfDoc.registerFontkit(fontkit)
      let urls = 'https://script-app.github.io/font/THSarabunNew.ttf'
      let thaiFontBytes = await fetch(urls).then(res => res.arrayBuffer());
      let thaiFont = await pdfDoc.embedFont(thaiFontBytes)
      let page = pdfDoc.addPage();
      // Customize the PDF content based on your requirements
      let xPosition = 50; // Initial x-position for text
      // const yPosition = 700; // Fixed y-position for horizontal alignment
      let yStart = 700; // Fixed y-position for horizontal titles
      let { width, height } = page.getSize();
      const margin = 50;
      height = 730
      let yPosition = height - margin;

      const fontSize = 17; //

      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')}`, { x: 50, y: 760, size: 20, font: thaiFont });
      page.drawText(`${datas[0].tlep_driver_name}`, { x: 250, y: 760, size: 20, font: thaiFont });
      page.drawText(`รหัส ${datas[0].ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`วันที่`, { x: 20, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`เลขอ้างอิง`, { x: 150, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`เบี้ยเลี้ยง`, { x: 240, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รายละเอียด`, { x: 300, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ค่าตอบแทน (ชม.)`, { x: 400, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`เพิ่ม/ลด`, { x: 500, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')}`, { x: 50, y: 760, size: 20, font: thaiFont });
          page.drawText(`${datas[0].tlep_driver_name}`, { x: 250, y: 760, size: 20, font: thaiFont });
          page.drawText(`รหัส ${datas[0].ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
          page.drawText(`วันที่`, { x: 35, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`เลขอ้างอิง`, { x: 150, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`เบี้ยเลี้ยง`, { x: 240, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`รายละเอียด`, { x: 300, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`ค่าตอบแทน (ชม.)`, { x: 400, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`เพิ่ม/ลด`, { x: 500, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
          // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
          yPosition = height - margin;
        }
        page.drawText(`${data.recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
        // const yNameStart = yStart + 20;
        page.drawText(`${data.total_allowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
        // const yPriceStart = yNameStart + 20;
        page.drawText(`${data.to_name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.total_ot}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.over_ot}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          // page.drawText(`รวม ${sumValue}`, { x: 470, y: yPosition - 20 , size: 20, font: thaiFont});
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async getOneAttach9() {
      let from_to = {
        from: this.dateattach9from,
        to: this.dateattach9to,
        emp_code: this.dataattach9one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach9one', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach9 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach9
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF91(this.pdfdata)
    },
    async getAttach9all() {
      let from_to = {
        from: this.dateattach9from,
        to: this.dateattach9to
      }
      await axios.post('http://localhost:4000/getdataattach9', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach9 = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach92', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach92 = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach93', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach93 = Object.values(dataexcel);

          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach9.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach9[i].ttt_employee_code || '',
              driver_name: this.excelarrayattach9[i].tlep_driver_name || '',
              total_ot: this.excelarrayattach9[i].total_ot || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach92.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach92[i].DRIVER1 || '',
              driver_name: this.excelarrayattach92[i].NAME || '',
              total_ot: this.excelarrayattach92[i].OT_HOURS || '',
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach93.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach93[i].DRIVER1 || '',
              driver_name: this.excelarrayattach93[i].NAME || '',
              total_ot: this.excelarrayattach93[i].OT_HOURS || '',
            }
            combinedArray.push(combinedObject);
            this.pdfdata = combinedArray
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF9(this.pdfdata)
    },
    async generatePDF9(datas) {
      const pdfDoc = await PDFDocument.create()
      pdfDoc.registerFontkit(fontkit)
      let urls = 'https://script-app.github.io/font/THSarabunNew.ttf'
      let thaiFontBytes = await fetch(urls).then(res => res.arrayBuffer());
      let thaiFont = await pdfDoc.embedFont(thaiFontBytes)
      let page = pdfDoc.addPage();
      // Customize the PDF content based on your requirements
      let xPosition = 50; // Initial x-position for text
      // const yPosition = 700; // Fixed y-position for horizontal alignment
      let yStart = 700; // Fixed y-position for horizontal titles
      let { width, height } = page.getSize();
      const margin = 50;
      height = 730
      let yPosition = height - margin;

      const fontSize = 17; //

      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach9select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รหัส`, { x: 100, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ชื่อ - นามสกุล`, { x: 220, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`จำนวนชั่วโมงเกินเวลา`, { x: 400, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_ot), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach7select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
          page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`รหัส`, { x: 100, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`ชื่อ - นามสกุล`, { x: 220, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`จำนวนชั่วโมงเกินเวลา`, { x: 400, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
          // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
          yPosition = height - margin;
        }
        page.drawText(`${count + 1}`, { x: 50, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.emp_code}`, { x: 90, y: yPosition, size: fontSize, font: thaiFont });
        // const yNameStart = yStart + 20;
        page.drawText(`${data.driver_name}`, { x: 220, y: yPosition, size: fontSize, font: thaiFont });
        // const yPriceStart = yNameStart + 20;
        // page.drawText(`${data.name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont});
        page.drawText(`${data.total_ot}`, { x: 450, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${sumValue}`, { x: 400, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async generatePDF91(datas) {
      const pdfDoc = await PDFDocument.create()
      pdfDoc.registerFontkit(fontkit)
      let urls = 'https://script-app.github.io/font/THSarabunNew.ttf'
      let thaiFontBytes = await fetch(urls).then(res => res.arrayBuffer());
      let thaiFont = await pdfDoc.embedFont(thaiFontBytes)
      let page = pdfDoc.addPage();
      // Customize the PDF content based on your requirements
      let xPosition = 50; // Initial x-position for text
      // const yPosition = 700; // Fixed y-position for horizontal alignment
      let yStart = 700; // Fixed y-position for horizontal titles
      let { width, height } = page.getSize();
      const margin = 50;
      height = 730
      let yPosition = height - margin;

      const fontSize = 17; //

      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach9select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รหัส`, { x: 100, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ชื่อ - นามสกุล`, { x: 220, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`จำนวนชั่วโมงเกินเวลา`, { x: 400, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_ot), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach7select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
          page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`รหัส`, { x: 100, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`ชื่อ - นามสกุล`, { x: 220, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`จำนวนชั่วโมงเกินเวลา`, { x: 400, y: 720, size: fontSize, font: thaiFont });
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
          // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
          yPosition = height - margin;
        }
        page.drawText(`${count + 1}`, { x: 50, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.ttt_employee_code}`, { x: 90, y: yPosition, size: fontSize, font: thaiFont });
        // const yNameStart = yStart + 20;
        page.drawText(`${data.tlep_driver_name}`, { x: 220, y: yPosition, size: fontSize, font: thaiFont });
        // const yPriceStart = yNameStart + 20;
        // page.drawText(`${data.name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont});
        page.drawText(`${data.total_ot}`, { x: 450, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${sumValue}`, { x: 400, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },

    async getOneAttach10() {
      let from_to = {
        from: this.dateattach10from,
        to: this.dateattach10to,
        emp_code: this.dataattach10one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach10one', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach10 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach10
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF10(this.pdfdata)
    },
    async getAttach10() {
      let from_to = {
        from: this.dateattach8from,
        to: this.dateattach8to,
        emp_code: this.dataattach8one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach8one', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach8 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach8
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF10(this.pdfdata)
    },
    async generatePDF10(datas) {
      const pdfDoc = await PDFDocument.create()
      pdfDoc.registerFontkit(fontkit)
      let urls = 'https://script-app.github.io/font/THSarabunNew.ttf'
      let thaiFontBytes = await fetch(urls).then(res => res.arrayBuffer());
      let thaiFont = await pdfDoc.embedFont(thaiFontBytes)
      let page = pdfDoc.addPage();
      // Customize the PDF content based on your requirements
      let xPosition = 50; // Initial x-position for text
      // const yPosition = 700; // Fixed y-position for horizontal alignment
      let yStart = 700; // Fixed y-position for horizontal titles
      let { width, height } = page.getSize();
      const margin = 50;
      height = 730
      let yPosition = height - margin;

      const fontSize = 17; //

      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`รายละเอียดชั่วโมงทำงานเกินเวลาตั้งแต่วันที่ ${moment(this.dateattach10from).format('L')} To ${moment(this.dateattach10to).format('L')} เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 70, y: 760, size: 15, font: thaiFont });
      page.drawText(`${datas[0].tlep_driver_name}  รหัส ${datas[0].ttt_employee_code}`, { x: 220, y: 740, size: 15, font: thaiFont });
      // page.drawText(`${moment(this.dateattach10to).format('L')}`, { x: 300, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 370, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`${datas[0].tlep_driver_name}`, { x: 450, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`รหัส ${datas[0].ttt_employee_code}`, { x: 500, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750 , size: 20, font: thaiFont});
      page.drawText(`วันที่เดินทาง`, { x: 20, y: 700, size: fontSize, font: thaiFont });
      page.drawText(`เลขที่ใบส่งสินค้า`, { x: 150, y: 700, size: fontSize, font: thaiFont });
      page.drawText(`ตัวแทนจำหน่าย`, { x: 240, y: 700, size: fontSize, font: thaiFont });
      page.drawText(`ชั่วโมงเกินเวลา`, { x: 370, y: 700, size: fontSize, font: thaiFont });
      page.drawText(`เพิ่ม/ลด`, { x: 460, y: 700, size: fontSize, font: thaiFont });
      page.drawText(`รวม`, { x: 540, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710 , size: 20, font: thaiFont});
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`รายละเอียดชั่วโมงทำงานเกินเวลาตั้งแต่วันที่ ${moment(this.dateattach10from).format('L')}`, { x: 50, y: 760, size: 15, font: thaiFont });
          page.drawText(`To`, { x: 250, y: 760, size: 15, font: thaiFont });
          page.drawText(`${moment(this.dateattach10to).format('L')}`, { x: 300, y: 760, size: 15, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 350, y: 760, size: 15, font: thaiFont });
          page.drawText(`${datas[0].tlep_driver_name}`, { x: 400, y: 760, size: 15, font: thaiFont });
          page.drawText(`รหัส ${datas[0].ttt_employee_code}`, { x: 450, y: 760, size: 15, font: thaiFont });
          // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750 , size: 20, font: thaiFont});
          page.drawText(`วันที่`, { x: 35, y: 700, size: fontSize, font: thaiFont });
          page.drawText(`เลขอ้างอิง`, { x: 150, y: 700, size: fontSize, font: thaiFont });
          page.drawText(`เบี้ยเลี้ยง`, { x: 240, y: 700, size: fontSize, font: thaiFont });
          page.drawText(`รายละเอียด`, { x: 370, y: 700, size: fontSize, font: thaiFont });
          page.drawText(`ค่าตอบแทน (ชม.)`, { x: 460, y: 700, size: fontSize, font: thaiFont });
          page.drawText(`เพิ่ม/ลด`, { x: 540, y: 700, size: fontSize, font: thaiFont });
          // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710 , size: 20, font: thaiFont});
          // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
          yPosition = height - margin;
        }
        page.drawText(`${data.recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
        // const yNameStart = yStart + 20;
        page.drawText(`${data.to_name}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
        // const yPriceStart = yNameStart + 20;
        page.drawText(`${data.standard_ot}`, { x: 370, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.over_ot}`, { x: 460, y: yPosition, size: fontSize, font: thaiFont });
        page.drawText(`${data.total_ot}`, { x: 550, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          // page.drawText(`รวม ${sumValue}`, { x: 470, y: yPosition - 20 , size: 20, font: thaiFont});
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    getot() {
      axios.get('http://localhost:4000/getdatapayrollot')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          console.log('JSONTYPEOFwelfare', this.excelarray.length)
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'payrollOT');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'payrollOT.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    getallowance() {
      axios.get('http://localhost:4000/getdatapayrollallowance')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          console.log('JSONTYPEOFwelfare', this.excelarray.length)
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'payrollAllowance');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'payrollAllowance.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    }
  }
}
</script>