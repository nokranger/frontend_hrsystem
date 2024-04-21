<template>
  <div>
    <b-container>
      <div style="border: 2px solid gray;border-radius: 10px;height: 400px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
            <b-form-datepicker style="width: 100%;" id="datepickerattach9" v-model="dateattach9from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
            <b-form-datepicker style="width: 100%;" id="datepickerattach92" v-model="dateattach9to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">วันที่จ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="datepickerattach93" v-model="dateattach9select"
              class="mb-2"></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">กรุณากรอกหัวข้อรายงาน</div>
              <b-input placeholder="Enter your Title Report" v-model="titleattach9"></b-input>
            </div>
          </b-col>
          <b-col>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach9all"
                style="box-shadow: 5px 5px 5px #888888;">Preview <b-icon-file-earmark-pdf-fill
                  variant="danger"></b-icon-file-earmark-pdf-fill></b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach9excel"
                style="box-shadow: 5px 5px 5px #888888;">Excel <b-icon-file-earmark-excel-fill
                  variant="success"></b-icon-file-earmark-excel-fill></b-button>
            </div>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
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
      selectedattach9: null,
      optionsattach9: [
        { value: null, text: 'ดูทั้งหมด' },
        { value: 1, text: 'จ่ายแล้ว' },
        { value: 2, text: 'ยังไม่จ่าย' }
      ],
      sumValue: 0,
      status: '0'
    }
  },
  methods: {
    async getAttach9all() {
      let from_to = {
        from: this.dateattach9from,
        to: this.dateattach9to,
        payment_date: this.dateattach9select
      }
      await axios.post('http://localhost:4000/pgetdataattachholiday', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach9 = Object.values(dataexcel);
          // this.pdfdata = this.excelarrayattach9
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/pgetdataattachholiday12', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach92 = Object.values(dataexcel);
          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach9.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach9[i].emp_code,
              driver_name: this.excelarrayattach9[i].NAME,
              total_ot: this.excelarrayattach9[i].total_ot,
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach92.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach92[i].emp_code,
              driver_name: this.excelarrayattach92[i].NAME,
              total_ot: this.excelarrayattach92[i].total_ot,
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
          this.pdfdata = this.pdfdata.filter((i) => {
            return i.total_ot !== '0' && i.total_ot !== ''
          })
          // this.updatepayment9()
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF9(this.pdfdata)
    },
    async getAttach9excel() {
      let from_to = {
        from: this.dateattach9from,
        to: this.dateattach9to,
        payment_date: this.dateattach9select
      }
      await axios.post('http://localhost:4000/pgetdataattachholiday', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach9 = Object.values(dataexcel);
          // console.log('filterEX', this.excelarrayattach9)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/pgetdataattachholiday12', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach92 = Object.values(dataexcel);
          // console.log('filterEX', this.excelarrayattach92)
          const combinedArray = []
          for (let i = 0; i < this.excelarrayattach9.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach9[i].emp_code,
              driver_name: this.excelarrayattach9[i].NAME,
              total_ot: this.excelarrayattach9[i].total_ot,
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayattach92.length; i++) {
            const combinedObject = {
              emp_code: this.excelarrayattach92[i].emp_code,
              driver_name: this.excelarrayattach92[i].NAME,
              total_ot: this.excelarrayattach92[i].total_ot,
            }
            combinedArray.push(combinedObject);
          }
          this.pdfdata = combinedArray
          // this.pdfdata = combinedArray
          this.pdfdata = this.pdfdata.filter((i) => {
            return i.total_ot !== '0' && i.total_ot !== null
          })
          this.pdfdata.sort((a, b) => parseInt(a.emp_code) - parseInt(b.emp_code));
          // this.updatepayment9()
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
      XLSX.writeFile(workbook, 'attached9.xlsx');
    },
    async generatePDF9(datas) {
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
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
      const textWidth = thaiFont.widthOfTextAtSize(this.titleattach9, fontSize);
      const textHeight = thaiFont.heightAtSize(fontSize);
      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      // page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`${this.titleattach9}`, { x: page.getWidth() / 2.2 - textWidth / 2.2, y: 780, size: 20, font: thaiFont });
      page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach9select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      page.drawText(`ลำดับ`, { x: 50, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`รหัส`, { x: 100, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`ชื่อ - นามสกุล`, { x: 220, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`จำนวนชั่วโมงเกินเวลา`, { x: 400, y: 720, size: fontSize, font: thaiFont });
      page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      let count = 0
      let countPage = 1
      let sumValue = datas.reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
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
          // page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`${this.titleattach9}`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach9select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
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
        page.drawText(`${formatter.format(data.total_ot)}`, { x: 450, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${formatter.format(sumValue)}`, { x: 400, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async generatePDF91(datas) {
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
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
      const textWidth = thaiFont.widthOfTextAtSize(this.titleattach10, fontSize);
      const textHeight = thaiFont.heightAtSize(fontSize);
      page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      // page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
      page.drawText(`${this.titleattach9}`, { x: page.getWidth() / 2.2 - textWidth / 2.2, y: 780, size: 20, font: thaiFont });
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
          // page.drawText(`สรุปยอดชม.ล่วงเวลาของพนักงานประจำเดือนเมษายนจ่ายเดือนพฤษภาคม`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`${this.titleattach9}`, { x: 140, y: 780, size: 20, font: thaiFont });
          page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach9select).format('L')}`, { x: 190, y: 760, size: 20, font: thaiFont });
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
        page.drawText(`${formatter.format(parseFloat(data.total_ot))}`, { x: 450, y: yPosition, size: fontSize, font: thaiFont });
        yPosition -= descriptionHeight; // Adjust x-position for the next entry
        count++
        if (count > datas.length - 1) {
          console.log('countPDF ', count);
          page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
          page.drawText(`รวม ${formatter.format(sumValue)}`, { x: 400, y: yPosition - 20, size: 20, font: thaiFont });
        }
      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async updatepayment9() {
      let from_to = {
        from: this.dateattach9from,
        to: this.dateattach9to,
        payment_date: this.dateattach9select
      }
      await axios.post('http://localhost:4000/updatepaymentstatusholiday', from_to)
        .then(response => {
          // console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
  }
}
</script>