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
      <div style="border: 2px solid gray;border-radius: 10px;height: 470px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach10" v-model="dateattach10from"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach102" v-model="dateattach10to"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">วันที่จ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerattach103" v-model="dateattach10select"
              class="mb-2"></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <!-- <b-col>
            <b-input v-on:keyup.enter="getOneAttach10" placeholder="Enter Employee Code"
              v-model="dataattach10one"></b-input>
          </b-col> -->
          <b-col>
            <div>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">กรุณากรอกหัวข้อรายงาน</div>
              <b-input placeholder="Enter your Title Report" v-model="titleattach10"></b-input>
            </div>
          </b-col>
          <b-col></b-col>
          <b-col></b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">หมายเหตุ</div>
            <b-textarea name="" id="" v-model="titlefooter" placeholder="หมายเหตุ"></b-textarea>
          </b-col>
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach10"
                style="box-shadow: 5px 5px 5px #888888;">Preview<b-icon-file-earmark-pdf-fill
                  variant="danger"></b-icon-file-earmark-pdf-fill></b-button>
            </div>
          </b-col>
          <b-col>
            <div style="text-align: center;">
              <b-button variant="outline-primary" @click="getAttach10Excel"
                style="box-shadow: 5px 5px 5px #888888;">Export<b-icon-file-earmark-excel-fill
                  variant="success"></b-icon-file-earmark-excel-fill></b-button>
            </div>
          </b-col>
          <b-col></b-col>
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
      sumValue: 0,
      titlefooter: '',
    }
  },
  methods: {
    async getAttach10() {
      let from_to = {
        from: this.dateattach10from,
        to: this.dateattach10to,
        emp_code: this.dataattach10one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach10', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach8 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach8
          this.pdfdata = this.pdfdata.reduce((acc, obj) => {
            // If the key doesn't exist, create an array for it
            if (!acc[obj.ttt_employee_code]) {
              acc[obj.ttt_employee_code] = [];
            }
            // Push the current object into the array for this emp_code
            acc[obj.ttt_employee_code].push(obj);
            return acc;
          }, {});
          // Sort the keys
          let sortedKeys = Object.keys(this.pdfdata).sort();

          // Map the sorted keys back to the grouped objects
          let sortedData = sortedKeys.map(key => this.pdfdata[key]);
          this.pdfdata = Object.values(sortedData);
          this.updatepayment10()
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF10(this.pdfdata)
      // await this.exporttoexcel(this.pdfdata)
    },
    async getAttach10Excel() {
      let from_to = {
        from: this.dateattach10from,
        to: this.dateattach10to,
        emp_code: this.dataattach10one
      }
      console.log('resdataFromTo', from_to);
      await axios.post('http://localhost:4000/getdataattach10', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayattach8 = Object.values(dataexcel);
          this.pdfdata = this.excelarrayattach8
          console.log('resdatareduce', this.pdfdata);
          this.updatepayment10()
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      // await this.generatePDF10(this.pdfdata)
      await this.exporttoexcel(this.pdfdata)
    },
    async generatePDF10(result) {
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
      let urls2 = 'http://themes.googleusercontent.com/static/fonts/notoserif/v1/eCpfeMZI7q4jLksXVRWPQy3USBnSvpkopQaUR-2r7iU.ttf'
      let thaiFontBytes2 = await fetch(urls2).then(res => res.arrayBuffer());
      let thaiFont2 = await pdfDoc.embedFont(thaiFontBytes2)
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
      let count = 0
      let countPage = 1
      // let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      let lastEmpCode = null;
      let keycount = ''
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const key in result) {
        console.log('count', result[key])
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed
        result[key].sort((a, b) => new Date(a.recieve_job_dateandtime) - new Date(b.recieve_job_dateandtime));
        for (let i = 0; i < result[key].length; i++) {
          // Check if there is enough space on the current page
          let sumOT = 0;
          let sumStadardOt = 0;
          let sumOverOT = 0;
          // let count = 0
          if (result[key][i].ttt_employee_code === keycount) {
            // console.log('SameKeyCount', keycount)
            // page.drawText(`${result[key][i].ttt_employee_code}`, { x: 500, y: 800, size: 20, font: thaiFont });
            page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
            // const yNameStart = yStart + 20;
            page.drawText(`${result[key][i].to_name}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
            // const yPriceStart = yNameStart + 20;
            page.drawText(`${formatter.format(result[key][i].standard_ot)}`, { x: 390, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${formatter.format(result[key][i].over_ot)}`, { x: 480, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${formatter.format(result[key][i].total_ot)}`, { x: 540, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            keycount = result[key][i].ttt_employee_code
            count++
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumStadardOt = result[key].reduce((acc, obj) => acc + parseFloat(obj.standard_ot), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              let text1 = `${formatter.format(sumStadardOt)}`;
              let text2 = `${formatter.format(sumOverOT)}`;
              let text3 = `${formatter.format(sumOT)}`;
              let options1 = { x: 390, y: yPosition, size: 12, font: thaiFont2 };
              let options2 = { x: 480, y: yPosition, size: 12, font: thaiFont2 };
              let options3 = { x: 540, y: yPosition, size: 12, font: thaiFont2 };
              // Draw the text
              page.drawText(text1, options1);

              // Calculate the width of the text
              let textWidth1 = thaiFont2.widthOfTextAtSize(text1, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options1.x, y: options1.y - 2 },
                end: { x: options1.x + textWidth1, y: options1.y - 2 },
                thickness: 1
              });
              // Draw the text
              page.drawText(text2, options2);

              // Calculate the width of the text
              let textWidth2 = thaiFont2.widthOfTextAtSize(text2, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options2.x, y: options2.y - 2 },
                end: { x: options2.x + textWidth2, y: options2.y - 2 },
                thickness: 1
              });
              // Draw the text
              page.drawText(text3, options3);

              // Calculate the width of the text
              let textWidth3 = thaiFont2.widthOfTextAtSize(text3, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options3.x, y: options3.y - 2 },
                end: { x: options3.x + textWidth3, y: options3.y - 2 },
                thickness: 1
              });
              // page.drawText(`${formatter.format(sumStadardOt)}`, { x: 390, y: yPosition, size: fontSize, font: thaiFont });
              // page.drawText(`${formatter.format(sumOverOT)}`, { x: 480, y: yPosition, size: fontSize, font: thaiFont });
              // page.drawText(`${formatter.format(sumOT)}`, { x: 540, y: yPosition, size: fontSize, font: thaiFont });
              // page.drawText(`หมายเหตุ: โปรดตรวจสอบข้อมูลตัวเลขในเอกสารนี้ให้ละเอียด หากไม่ถูกต้องหรือสงสัยให้แจ้งฝ่ายบุคคลทันทีหรือในเวลาทํางานปกติ`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
              // page.drawText(`หากพ้นกําหนด 15 วัน นับจากวันที่จ่ายให้ในนงวดนั้น ๆ แล้ว บริษัทถือว่าท่านยอมรับและไม่ติดใจเรียกร้องสิทธิประโยชน์ใด ๆ ทุกประการ`, { x: 10, y: yPosition - 50, size: 16, font: thaiFont });
              if (this.titlefooter.length > 0) {
                page.drawText(`** หมายเหตุ: ${this.titlefooter}`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
              } else {
                page.drawText(`หมายเหตุ: โปรดตรวจสอบข้อมูลตัวเลขในเอกสารนี้ให้ละเอียด หากไม่ถูกต้องหรือสงสัยให้แจ้งฝ่ายบุคคลทันทีหรือในเวลาทํางานปกติ`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
                page.drawText(`หากพ้นกําหนด 15 วัน นับจากวันที่จ่ายให้ในนงวดนั้น ๆ แล้ว บริษัทถือว่าท่านยอมรับและไม่ติดใจเรียกร้องสิทธิประโยชน์ใด ๆ ทุกประการ`, { x: 10, y: yPosition - 50, size: 16, font: thaiFont });
              }
            }
          } else {
            // console.log('NotSameKeyCount', keycount)
            count = 0
            count++;
            page = pdfDoc.addPage();
            yPosition = height - margin;
            // Create a new page if the content doesn't fit
            // page = pdfDoc.addPage();
            // page.drawText(`${result[key][i].ttt_employee_code}`, { x: 500, y: 800, size: 20, font: thaiFont });
            page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
            // page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
            page.drawText(`${this.titleattach10}`, { x: page.getWidth() / 2.2 - textWidth / 2.2, y: 780, size: 20, font: thaiFont });
            page.drawText(`รายละเอียดชั่วโมงทำงานเกินเวลาตั้งแต่วันที่ ${moment(this.dateattach10from).format('L')} To ${moment(this.dateattach10to).format('L')} เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 50, y: 760, size: 15, font: thaiFont });
            // page.drawText(`To`, { x: 250, y: 760, size: 15, font: thaiFont });
            page.drawText(`ชื่อ ${result[key][i].tlep_driver_name} รหัส ${result[key][i].ttt_employee_code}`, { x: 200, y: 740, size: 15, font: thaiFont });
            // page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 350, y: 760, size: 15, font: thaiFont });
            // page.drawText(`${result[key][i]s[0].tlep_driver_name}`, { x: 400, y: 760, size: 15, font: thaiFont });
            // page.drawText(`รหัส ${result[key][i]s[0].ttt_employee_code}`, { x: 450, y: 760, size: 15, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 720, size: 20, font: thaiFont });
            page.drawText(`วันที่เดินทาง`, { x: 35, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`เลขที่ใบส่งสินค้า`, { x: 150, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`ตัวแทนจำหน่าย`, { x: 240, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`ชั่วโมงเกินเวลา`, { x: 370, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`เพิ่ม/ลด`, { x: 470, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`รวม`, { x: 540, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 700, size: 20, font: thaiFont });
            // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
            yPosition = height - margin;
            page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
            // const yNameStart = yStart + 20;
            page.drawText(`${result[key][i].to_name}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
            // const yPriceStart = yNameStart + 20;
            page.drawText(`${formatter.format(result[key][i].standard_ot)}`, { x: 390, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${formatter.format(result[key][i].over_ot)}`, { x: 480, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${formatter.format(result[key][i].total_ot)}`, { x: 540, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            // count++
            keycount = result[key][i].ttt_employee_code
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumStadardOt = result[key].reduce((acc, obj) => acc + parseFloat(obj.standard_ot), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              let text1 = `${formatter.format(sumStadardOt)}`;
              let text2 = `${formatter.format(sumOverOT)}`;
              let text3 = `${formatter.format(sumOT)}`;
              let options1 = { x: 390, y: yPosition, size: 12, font: thaiFont2 };
              let options2 = { x: 480, y: yPosition, size: 12, font: thaiFont2 };
              let options3 = { x: 540, y: yPosition, size: 12, font: thaiFont2 };
              // Draw the text
              page.drawText(text1, options1);

              // Calculate the width of the text
              let textWidth1 = thaiFont2.widthOfTextAtSize(text1, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options1.x, y: options1.y - 2  },
                end: { x: options1.x + textWidth1, y: options1.y - 2  },
                thickness: 1
              });
              // Draw the text
              page.drawText(text2, options2);

              // Calculate the width of the text
              let textWidth2 = thaiFont2.widthOfTextAtSize(text2, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options2.x, y: options2.y - 2  },
                end: { x: options2.x + textWidth2, y: options2.y - 2  },
                thickness: 1
              });
              // Draw the text
              page.drawText(text3, options3);

              // Calculate the width of the text
              let textWidth3 = thaiFont2.widthOfTextAtSize(text3, 12);
              // Draw a line under the text
              page.drawLine({
                start: { x: options3.x, y: options3.y - 2  },
                end: { x: options3.x + textWidth3, y: options3.y - 2  },
                thickness: 1
              });
              // page.drawText(`${formatter.format(sumStadardOt)}`, { x: 390, y: yPosition, size: fontSize, font: thaiFont });
              // page.drawText(`${formatter.format(sumOverOT)}`, { x: 480, y: yPosition, size: fontSize, font: thaiFont });
              // page.drawText(`${formatter.format(sumOT)}`, { x: 540, y: yPosition, size: fontSize, font: thaiFont });
              if (this.titlefooter.length > 0) {
                page.drawText(`** หมายเหตุ: ${this.titlefooter}`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
              } else {
                page.drawText(`หมายเหตุ: โปรดตรวจสอบข้อมูลตัวเลขในเอกสารนี้ให้ละเอียด หากไม่ถูกต้องหรือสงสัยให้แจ้งฝ่ายบุคคลทันทีหรือในเวลาทํางานปกติ`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
                page.drawText(`หากพ้นกําหนด 15 วัน นับจากวันที่จ่ายให้ในนงวดนั้น ๆ แล้ว บริษัทถือว่าท่านยอมรับและไม่ติดใจเรียกร้องสิทธิประโยชน์ใด ๆ ทุกประการ`, { x: 10, y: yPosition - 50, size: 16, font: thaiFont });
              }
            }
          }
        }

      }

      // Save the PDF to a file or display it in a new tab
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    async exporttoexcel(data) {
      const workbook = XLSX.utils.book_new();

      // // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');

      // // Save the workbook to a file
      XLSX.writeFile(workbook, 'attached10.xlsx');
    },
    async updatepayment10() {
      let from_to = {
        from: this.dateattach10from,
        to: this.dateattach10to,
        payment_date: this.dateattach10select
      }
      await axios.post('http://localhost:4000/updatepaymentstatus3ot', from_to)
        .then(response => {
          // console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/updatepaymentstatus4ot', from_to)
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