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
      console.log('count', datas)
      console.log('count', datas.length)
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
      page.drawText(`${datas.tlep_driver_name}`, { x: 250, y: 760, size: 20, font: thaiFont });
      page.drawText(`รหัส ${datas.ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
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
      // let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      let empCheck = ''
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const data of datas) {
        console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed
        empCheck = data.ttt_employee_code
        console.log('empCheck !== data.ttt_employee_code', data.ttt_employee_code)
        // Check if there is enough space on the current page
        if (empCheck !== data.ttt_employee_code) {
          countPage++;
          console.log('empCheck !== data.ttt_employee_code', data.ttt_employee_code)
          // Create a new page if the content doesn't fit
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')}`, { x: 50, y: 760, size: 20, font: thaiFont });
          page.drawText(`${data.ttt_employee_code}`, { x: 250, y: 760, size: 20, font: thaiFont });
          page.drawText(`รหัส ${data.ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
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
        } else {
          page = pdfDoc.addPage();
          page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
          page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')}`, { x: 50, y: 760, size: 20, font: thaiFont });
          page.drawText(`${data.ttt_employee_code}`, { x: 250, y: 760, size: 20, font: thaiFont });
          page.drawText(`รหัส ${data.ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
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
  }
}
</script>