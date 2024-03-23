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
          console.log('resdatareduce', this.pdfdata);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF10(this.pdfdata)
    },
    async generatePDF10(result) {
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

      // page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
      // page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
      // page.drawText(`รายละเอียดชั่วโมงทำงานเกินเวลาตั้งแต่วันที่ ${moment(this.dateattach10from).format('L')} To ${moment(this.dateattach10to).format('L')} เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 70, y: 760, size: 15, font: thaiFont });
      // page.drawText(`${datas[0].tlep_driver_name}  รหัส ${datas[0].ttt_employee_code}`, { x: 220, y: 740, size: 15, font: thaiFont });
      // page.drawText(`${moment(this.dateattach10to).format('L')}`, { x: 300, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 370, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`${datas[0].tlep_driver_name}`, { x: 450, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`รหัส ${datas[0].ttt_employee_code}`, { x: 500, y: 760 , size: 15, font: thaiFont});
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750 , size: 20, font: thaiFont});
      // page.drawText(`วันที่เดินทาง`, { x: 20, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`เลขที่ใบส่งสินค้า`, { x: 150, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`ตัวแทนจำหน่าย`, { x: 240, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`ชั่วโมงเกินเวลา`, { x: 370, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`เพิ่ม/ลด`, { x: 460, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`รวม`, { x: 540, y: 700, size: fontSize, font: thaiFont });
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710 , size: 20, font: thaiFont});
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
            page.drawText(`${result[key][i].standard_ot}`, { x: 370, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].over_ot}`, { x: 460, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_ot}`, { x: 550, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            keycount = result[key][i].ttt_employee_code
            count++
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumStadardOt = result[key].reduce((acc, obj) => acc + parseFloat(obj.standard_ot), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              page.drawText(`${sumStadardOt}`, { x: 370, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOverOT}`, { x: 460, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOT}`, { x: 550, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`หมายเหตุ: โปรดตรวจสอบข้อมูลตัวเลขในเอกสารนี้ให้ละเอียด หากไม่ถูกต้องหรือสงสัยให้แจ้งฝ่ายบุคคลทันทีหรือในเวลาทํางานปกติ`, { x: 10, y: yPosition -30, size: 16, font: thaiFont });
              page.drawText(`หากพ้นกําหนด 15 วัน นับจากวันที่จ่ายให้ในนงวดนั้น ๆ แล้ว บริษัทถือว่าท่านยอมรับและไม่ติดใจเรียกร้องสิทธิประโยชน์ใด ๆ ทุกประการ`, { x: 10, y: yPosition -50, size: 16, font: thaiFont });
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
            page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
            page.drawText(`รายละเอียดชั่วโมงทำงานเกินเวลาตั้งแต่วันที่ ${moment(this.dateattach10from).format('L')} To ${moment(this.dateattach10to).format('L')} เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 50, y: 760, size: 15, font: thaiFont });
            // page.drawText(`To`, { x: 250, y: 760, size: 15, font: thaiFont });
            page.drawText(`ชื่อ ${result[key][i].tlep_driver_name} รหัส ${result[key][i].ttt_employee_code}`, { x: 200, y: 740, size: 15, font: thaiFont });
            // page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach10select).format('L')}`, { x: 350, y: 760, size: 15, font: thaiFont });
            // page.drawText(`${result[key][i]s[0].tlep_driver_name}`, { x: 400, y: 760, size: 15, font: thaiFont });
            // page.drawText(`รหัส ${result[key][i]s[0].ttt_employee_code}`, { x: 450, y: 760, size: 15, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 720 , size: 20, font: thaiFont});
            page.drawText(`วันที่เดินทาง`, { x: 35, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`เลขที่ใบส่งสินค้า`, { x: 150, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`ตัวแทนจำหน่าย`, { x: 240, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`ชั่วโมงเกินเวลา`, { x: 370, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`เพิ่ม/ลด`, { x: 460, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`รวม`, { x: 540, y: 700, size: fontSize, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 700 , size: 20, font: thaiFont});
            // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
            yPosition = height - margin;
            page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
            // const yNameStart = yStart + 20;
            page.drawText(`${result[key][i].to_name}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
            // const yPriceStart = yNameStart + 20;
            page.drawText(`${result[key][i].standard_ot}`, { x: 370, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].over_ot}`, { x: 460, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_ot}`, { x: 550, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            // count++
            keycount = result[key][i].ttt_employee_code
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumStadardOt = result[key].reduce((acc, obj) => acc + parseFloat(obj.standard_ot), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              page.drawText(`${sumStadardOt}`, { x: 370, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOverOT}`, { x: 460, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOT}`, { x: 550, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`หมายเหตุ: โปรดตรวจสอบข้อมูลตัวเลขในเอกสารนี้ให้ละเอียด หากไม่ถูกต้องหรือสงสัยให้แจ้งฝ่ายบุคคลทันทีหรือในเวลาทํางานปกติ`, { x: 10, y: yPosition -30, size: 16, font: thaiFont });
              page.drawText(`หากพ้นกําหนด 15 วัน นับจากวันที่จ่ายให้ในนงวดนั้น ๆ แล้ว บริษัทถือว่าท่านยอมรับและไม่ติดใจเรียกร้องสิทธิประโยชน์ใด ๆ ทุกประการ`, { x: 10, y: yPosition -50, size: 16, font: thaiFont });
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