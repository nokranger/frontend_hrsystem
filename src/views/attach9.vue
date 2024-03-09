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
              <b-button variant="outline-primary" @click="getAttach7all"
                style="box-shadow: 5px 5px 5px #888888;">Attached
                7 PDF</b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach7excel"
                style="box-shadow: 5px 5px 5px #888888;">Attached
                7 Excel</b-button>
            </div>
          </b-col>
          <b-col>
            <div>
              <b-form-select id="selectattach7" v-model="selectedattach7" :options="optionsattach7"></b-form-select>
            </div>
          </b-col>
          <b-col>
            <div>
              <b-input placeholder="Enter your title Report" v-model="titleattach7"></b-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <b-button @click="updatepayment7">Update payment status</b-button>
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
              <b-button variant="outline-danger" @click="getAttach9all"
                style="box-shadow: 5px 5px 5px #888888;">Attached
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
      pdfdata: '',
      titleattach7: '',
      titleattach8: '',
      titleattach9: '',
      titleattach10: '',
      selectedattach7: null,
      optionsattach7: [
        { value: null, text: 'Please select an option' },
        { value: 1, text: 'ดูทั้งหมด' },
        { value: 2, text: 'จ่ายแล้ว' },
        { value: 3, text: 'ยังไม่จ่าย' }
      ],
      sumValue: 0
    }
  },
  methods: {
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
  }
}
</script>