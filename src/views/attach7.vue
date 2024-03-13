<template>
  <div>
    <!-- <nav>
      <router-link to="/dashboard">Import & Export</router-link> ||
      <router-link to="/Attached">Attached</router-link> ||
      <router-link to="/payroll">Payroll</router-link>
    </nav> -->
    <b-container>
      <!-- <div>
        <h1 style="text-shadow: 2px 2px 5px black;">Attached</h1>
      </div> -->
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
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div>
              <b-input placeholder="Enter your Title Report" v-model="titleattach7"></b-input>
            </div>
          </b-col>
          <b-col>
            <b-input v-on:keyup.enter="getOneAttach7" placeholder="Enter Employee Code"
              v-model="dataattach7one"></b-input>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7all"
                style="box-shadow: 5px 5px 5px #888888;">Attached
                7 PDF <b-icon-file-earmark-pdf-fill variant="danger"></b-icon-file-earmark-pdf-fill></b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7excel"
                style="box-shadow: 5px 5px 5px #888888;">Attached
                7 Excel <b-icon-file-earmark-excel-fill variant="success"></b-icon-file-earmark-excel-fill></b-button>
            </div>
          </b-col>
          <b-col>
            <div>
              <b-button variant="outline-primary" @click="updatepayment7">Update payment status</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div>
              <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                value="1"
                unchecked-value="not_accepted"
              >
                <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>
        <div>
          <h1 style="text-shadow: 2px 2px 5px black;">Preview</h1>
        </div>
        <b-row style="margin: 20px;">
          <b-col>
            <div>
              <b-form-select style="width: 100%;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;" id="selectattach7" v-model="selectedattach7" :options="optionsattach7"></b-form-select>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7allPdf"
                style="box-shadow: 5px 5px 5px #888888;">Preview PDF <b-icon-file-earmark-pdf-fill variant="danger"></b-icon-file-earmark-pdf-fill></b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7excelP"
                style="box-shadow: 5px 5px 5px #888888;">Preview Excel <b-icon-file-earmark-excel-fill variant="success"></b-icon-file-earmark-excel-fill></b-button>
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
      pdfdata: '',
      titleattach7: '',
      titleattach8: '',
      titleattach9: '',
      titleattach10: '',
      selectedattach7: null,
      optionsattach7: [
        { value: null, text: 'ดูทั้งหมด' },
        { value: 1, text: 'จ่ายแล้ว' },
        { value: 2, text: 'ยังไม่จ่าย' }
      ],
      sumValue: 0,
      status: '0'
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
              bank_account_number: this.excelarrayattach7[i].bank_account_number,
              emp_code: this.excelarrayattach7[i].emp_code,
              name: this.excelarrayattach7[i].name,
              total_allowance: parseFloat(this.excelarrayattach7[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number,
              emp_code: this.excelarrayattach72[i].emp_code,
              name: this.excelarrayattach72[i].name,
              total_allowance: parseFloat(this.excelarrayattach72[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number,
              emp_code: this.excelarrayattach73[i].emp_code,
              name: this.excelarrayattach73[i].name,
              total_allowance: parseFloat(this.excelarrayattach73[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
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
              bank_account_number: this.excelarrayattach7[i].bank_account_number,
              emp_code: this.excelarrayattach7[i].emp_code,
              name: this.excelarrayattach7[i].name,
              total_allowance: parseFloat(this.excelarrayattach7[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number,
              emp_code: this.excelarrayattach72[i].emp_code,
              name: this.excelarrayattach72[i].name,
              total_allowance: parseFloat(this.excelarrayattach72[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number,
              emp_code: this.excelarrayattach73[i].emp_code,
              name: this.excelarrayattach73[i].name,
              total_allowance: parseFloat(this.excelarrayattach73[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.exporttoexcel(this.pdfdata)
    },
    async exporttoexcel(data) {
      const workbook = XLSX.utils.book_new();

      // // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

      // // Save the workbook to a file
      XLSX.writeFile(workbook, 'attached7.xlsx');
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
      // page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`${this.titleattach7}`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach7select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`เลขที่บันชี`, { x: 100, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รหัส`, { x: 220, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ชื่อ - นามสกุล`, { x: 300, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`จำนวนเงิน`, { x: 500, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let count2 = 0
      let count3 = 0
      let countPage = 1
      // let sumValue = 0
      // var sumValue = datas.reduce(function(_this, val) {
      //     return _this + parseInt(val.total_allowance)
      // }, 0);
      // let sumValue = datas.reduce((acc, obj) => acc += parseInt(obj.total_allowance), 0);
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        // console.log('count', data.length)
        // if (count === datas.length) {
        //   sumValue = data.reduce((acc, obj) => acc += parseInt(obj.total_allowance), 0);
        // }
        // console.log('countValue', count2)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed

        // Check if there is enough space on the current page
        if (yPosition - descriptionHeight < margin) {
          countPage++;
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          // page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`${this.titleattach7}`, { x: 140, y: 780, size: 20, font: thaiFont });
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
        page.drawText(`${(data.total_allowance.toFixed(2)).toLocaleString()}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('CountSumBefore', this.sumValue)
          if (count === datas.length) {
            // console.log('CountSum', this.sumValue)
            this.sumValue = await datas.reduce(function (_this, val) {
              return _this + parseFloat(val.total_allowance)
            }, 0);
            // console.log('CountSum', this.sumValue)
            // console.log('CountSum', await datas.reduce((acc, obj) => acc += parseInt(obj.total_allowance), 0))
          }
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${(this.sumValue.toFixed(2)).toLocaleString()}`, { x: 470, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async getAttach7allPdf() {
      let e = document.getElementById("selectattach7")
      let from_to = {
        from: this.dateattach7from,
        to: this.dateattach7to,
      }
      await axios.post('http://localhost:4000/getdataattach7P', from_to)
        .then(response => {
          // console.log('resdata', response.data.result);
          // console.log('resdata22', dataexcel);
          let dataexcel = response.data.result
          console.log('resdata22', dataexcel);
          this.excelarrayattach7 = Object.values(dataexcel);
          this.excelarrayattach7 = this.excelarrayattach7.filter((i)=> {
            if (e.value === null || e.value === '' ) {
              return i.payment_status_2
            } else {
              return i.payment_status_2 === e.value
            }
          })
          console.log('filterEX', this.excelarrayattach7)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach72P', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach72 = Object.values(dataexcel);
          this.excelarrayattach72 = this.excelarrayattach72.filter((i)=> {
            if (e.value === null || e.value === '' ) {
              return i.payment_status_2
            } else {
              return i.payment_status_2 === e.value
            }
          })
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdataattach73P', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach73 = Object.values(dataexcel);
          this.excelarrayattach73 = this.excelarrayattach73.filter((i)=> {
            if (e.value === null || e.value === '' ) {
              return i.payment_status_2
            } else {
              return i.payment_status_2 === e.value
            }
          })
          // this.excelarraywelfare = dataexcel
          // console.log('JSONTYPEOFwelfare', this.excelarray.length)
          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach7.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach7[i].bank_account_number,
              emp_code: this.excelarrayattach7[i].emp_code,
              name: this.excelarrayattach7[i].name,
              total_allowance: (this.excelarrayattach7[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number,
              emp_code: this.excelarrayattach72[i].emp_code,
              name: this.excelarrayattach72[i].name,
              total_allowance: parseFloat(this.excelarrayattach72[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number,
              emp_code: this.excelarrayattach73[i].emp_code,
              name: this.excelarrayattach73[i].name,
              total_allowance: parseFloat(this.excelarrayattach73[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF(this.pdfdata)
    },
    async getAttach7excelP() {
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
              bank_account_number: this.excelarrayattach7[i].bank_account_number,
              emp_code: this.excelarrayattach7[i].emp_code,
              name: this.excelarrayattach7[i].name,
              total_allowance: parseFloat(this.excelarrayattach7[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach72.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach72[i].bank_account_number,
              emp_code: this.excelarrayattach72[i].emp_code,
              name: this.excelarrayattach72[i].name,
              total_allowance: parseFloat(this.excelarrayattach72[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach73.length; i++) {
            const combinedObject = {
              bank_account_number: this.excelarrayattach73[i].bank_account_number,
              emp_code: this.excelarrayattach73[i].emp_code,
              name: this.excelarrayattach73[i].name,
              total_allowance: parseFloat(this.excelarrayattach73[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.exporttoexcel(this.pdfdata)
    },
    async updatepayment7() {
      let e = document.getElementById("selectattach7")
      let updatepayment = [
        {
          payment_status: '0',
          emp_code: '641610'
        },
        {
          payment_status: '1',
          emp_code: '651604'
        }
      ]
      // let sendData = this.pdfdata
      let sendData = await this.pdfdata.map(obj => {
        return { ...obj, payment_status: this.status, payment_date: this.dateattach7select };
      });
      console.log('paymenyupdate', sendData)
      await axios.post('http://localhost:4000/addpaymentstatusattach7', sendData)
      .then(response => {
        console.log('resdataUpdate', response)
      })
      .catch(error => {
          console.error('Error fetching data:', error.message);
      });
      await axios.post('http://localhost:4000/addpaymentstatusattach72', sendData)
      .then(response => {
        console.log('resdataUpdate', response)
      })
      .catch(error => {
          console.error('Error fetching data:', error.message);
      });
      await axios.post('http://localhost:4000/addpaymentstatusattach73', sendData)
      .then(response => {
        console.log('resdataUpdate', response)
      })
      .catch(error => {
          console.error('Error fetching data:', error.message);
      });
    },
  }
}
</script>