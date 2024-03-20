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
        </b-row>
        <b-row style="margin: 20px;">
          <b-col>
            <div>
              <b-input placeholder="Enter your Title Report" v-model="titleattach8"></b-input>
            </div>
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
        <!-- <b-row style="margin: 20px;">
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
        </b-row> -->
        <!-- <b-row style="margin: 20px;">
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
        </b-row> -->
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
import attached7 from '../views/attach7.vue'
import attached9 from '../views/attach9.vue';
export default {
  components: {
    attached7,
    attached9
  },
  data() {
    return {
      excelarray: [],
      excelarrayattach7: [],
      excelarrayattach72: [],
      excelarrayattach73: [],
      dateattach8from: '',
      dateattach8to: '',
      dateattach8select: '',
      dataattach8one: '',
      pdfdata: '',
      titleattach8: '',
      selectOption: null,
      optionss: [
        { value: null, text: 'เลือก' },
        { value: 7, text: 'สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน' },
        { value: 8, text: 'สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับของพนักงาน' },
        { value: 9, text: 'สรุปยอดชม.ล่วงเวลาของพนักงานประจําเดือน' },
        { value: 10, text: 'สรุปยอดเงินเบี้ยเลี้ยงของพนักงานขับรถ' },
      ],
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
    async getAttach8() {
      let from_to = {
        from: this.dateattach8from,
        to: this.dateattach8to
      }
      await axios.post('http://localhost:4000/getdataattach8', from_to)
        .then(response => {
          // console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel);
          this.pdfdata = this.excelarray
          // // this.excelarraywelfare = dataexcel
          // console.log('JSONTYPEOFattach8', this.excelarray.length)
          // // //export to excell
          // const workbook = XLSX.utils.book_new();

          // // // Convert the JSON data to a worksheet
          // const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // // // Add the worksheet to the workbook
          // XLSX.utils.book_append_sheet(workbook, worksheet, 'attached8-641610');

          // // // Save the workbook to a file
          // XLSX.writeFile(workbook, 'attached8-641610.xlsx');
          const aa = [
            { emp_code: '123', aa: 'AA' },
            { emp_code: '123', aa: 'AA' },
            { emp_code: '234', aa: 'AA' }
          ];

          this.pdfdata = this.pdfdata.reduce((acc, obj) => {
            // If the key doesn't exist, create an array for it
            if (!acc[obj.ttt_employee_code]) {
              acc[obj.ttt_employee_code] = [];
            }
            // Push the current object into the array for this emp_code
            acc[obj.ttt_employee_code].push(obj);
            return acc;
          }, {});

          // console.log(result['010645'][0]);
          // for (let key in result) {
          //   for (let i = 0; i < result[key].length; i++) {
          //     console.log(`Key: ${key}`);
          //     console.log('Show 1 resule', result[key][i])
          //   }
          //   // console.log(`Key: ${key}`);
          //   // console.log(`Value: `, result[key]);
          // }
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await this.generatePDF8(this.pdfdata)
      // await this.exporttoexcel(this.pdfdata)
    },
    async generatePDF8(result) {
      // console.log('count', result)
      // const result = await datas.reduce((acc, obj) => {
      //   // If the key doesn't exist, create an array for it
      //   if (!acc[obj.ttt_employee_code]) {
      //     acc[obj.ttt_employee_code] = [];
      //   }
      //   // Push the current object into the array for this ttt_employee_code
      //   acc[obj.ttt_employee_code].push(obj);
      //   return acc;
      // }, {});
      // let aa = result.forEach({})
      // console.log('count', datas)
      // console.log('count', datas.length)
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
      // // page.drawText(`${this.titleattach7}`, { x: 140, y: 780, size: 20, font: thaiFont });
      // // page.drawText(`เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')}`, { x: 50, y: 760, size: 20, font: thaiFont });
      // // page.drawText(`${datas.tlep_driver_name}`, { x: 250, y: 760, size: 20, font: thaiFont });
      // // page.drawText(`รหัส ${datas.ttt_employee_code}`, { x: 370, y: 760, size: 20, font: thaiFont });
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
      // page.drawText(`วันที่`, { x: 35, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`เลขอ้างอิง`, { x: 150, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`เบี้ยเลี้ยง`, { x: 240, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`รายละเอียด`, { x: 300, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`ค่าตอบแทน (ชม.)`, { x: 400, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`เพิ่ม/ลด`, { x: 500, y: 720, size: fontSize, font: thaiFont });
      // page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
      // page.drawText(`เพิ่ม/ลด${result}`, { x: 20, y: 720, size: fontSize, font: thaiFont });
      let count = 0
      let countPage = 1
      // let sumValue = datas.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
      let lastEmpCode = null;
      let keycount = ''
      // page.drawText(`Page${countPage}`, { x: 450, y: 720 , size: fontSize});
      for (const key in result) {
        // console.log(`Key: ${key}`);
        // console.log('Show 1 resule', result[key])
        // console.log('count', datas.length)
        // const sumValue = data.reduce((acc, obj) => acc + parseInt(obj.total_allowance), 0);
        // const titleHeight = 20; // Adjust as needed
        const descriptionHeight = 30; // Adjust as needed
        // empCheck = data.ttt_employee_code
        // console.log('Show 1 result', result[key])
        for (let i = 0; i < result[key].length; i++) {
          // console.log(`Key: ${key}`);
          // console.log('Show 1 result', result[key][i])
          // page.drawText(`${ result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
          // let keycount = result[key][i]
          // keycount = result[key][i].ttt_employee_code
          let sumOT = 0;
          let sumAllowance = 0;
          let sumOverOT = 0;
          // let count = 0
          if (result[key][i].ttt_employee_code === keycount) {
            // console.log('same key', result[key][i].ttt_employee_code)
            // let sum = 0;
            page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_allowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].to_name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_ot}`, { x: 420, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].over_ot}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
            // page.drawText(`${result[key][i].ttt_employee_code}`, { x: 200, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            keycount = result[key][i].ttt_employee_code
            count++
            console.log('countinPage1', count)
            console.log('countinPage2', result[key].length)
            // page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumAllowance = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_allowance), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              page.drawText(`${sumAllowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOT}`, { x: 420, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOverOT}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`** หมายเหตุ: ช่องเบี้ยเลี้ยง ประกอบไปด้วย 1.เบี้ยเลี้ยงต่อเที่ยว 2.เงินจูงใจ เบี้ยเลี้ยง หมายถึง สวัสดิการที่เป็นเงินจูงใจในการทํางาน`, { x: 10, y: yPosition - 30, size: 16, font: thaiFont });
            }
          } else {
            count = 0;
            count++
            // page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
            page = pdfDoc.addPage();
            yPosition = height - margin;
            // page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            // page.drawText(`${result[key][i].ttt_employee_code}`, { x: 200, y: yPosition, size: fontSize, font: thaiFont });
            // yPosition -= descriptionHeight; // Adjust x-position for the next entry
            // keycount = result[key][i].ttt_employee_code
            page.drawText(`บริษัท โตโยต้า ทรานสปอร์ต (ประเทศไทย) จํากัด`, { x: 170, y: 800, size: 20, font: thaiFont });
            // page.drawText(`สรุปยอดเงินเบี้ยเลี้ยง/ค่าขับและสวัสดิการของพนักงาน`, { x: 140, y: 780, size: 20, font: thaiFont });
            page.drawText(`${this.titleattach8}`, { x: 140, y: 780, size: 20, font: thaiFont });
            page.drawText(`ตั้งแต่วันที่ ${moment(this.dateattach8from).format('L')} To ${moment(this.dateattach8to).format('L')} เข้าบัญชีพนักงานวันที่ ${moment(this.dateattach8select).format('L')} ชื่อ ${result[key][i].tlep_driver_name} รหัส ${result[key][i].ttt_employee_code}`, { x: 50, y: 760, size: 16, font: thaiFont });
            // page.drawText(`${datas.tlep_driver_name}`, { x: 250, y: 760, size: 20, font: thaiFont });
            // page.drawText(`รหัส ${result[key][i].ttt_employee_code}`, { x: 100, y: 740, size: 16, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 750, size: 20, font: thaiFont });
            page.drawText(`วันที่`, { x: 35, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`เลขอ้างอิง`, { x: 150, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`เบี้ยเลี้ยง`, { x: 240, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`รายละเอียด`, { x: 300, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`ค่าตอบแทน (ชม.)`, { x: 400, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`เพิ่ม/ลด`, { x: 500, y: 720, size: fontSize, font: thaiFont });
            page.drawText(`__________________________________________________________________________________`, { x: 10, y: 710, size: 20, font: thaiFont });
            page.drawText(`${result[key][i].recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_allowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].to_name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].total_ot}`, { x: 420, y: yPosition, size: fontSize, font: thaiFont });
            page.drawText(`${result[key][i].over_ot}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
            // page.drawText(`${result[key][i].ttt_employee_code}`, { x: 200, y: yPosition, size: fontSize, font: thaiFont });
            yPosition -= descriptionHeight; // Adjust x-position for the next entry
            keycount = result[key][i].ttt_employee_code
            // count++
            if (count > result[key].length - 1) {
              sumOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_ot), 0);
              sumAllowance = result[key].reduce((acc, obj) => acc + parseFloat(obj.total_allowance), 0);
              sumOverOT = result[key].reduce((acc, obj) => acc + parseFloat(obj.over_ot), 0);
              // page.drawText(`${sum}`, { x: 530, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
              page.drawText(`${sumAllowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOT}`, { x: 420, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`${sumOverOT}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
              page.drawText(`** หมายเหตุ: ช่องเบี้ยเลี้ยง ประกอบไปด้วย 1.เบี้ยเลี้ยงต่อเที่ยว 2.เงินจูงใจ เบี้ยเลี้ยง หมายถึง สวัสดิการที่เป็นเงินจูงใจในการทํางาน`, { x: 10, y: yPosition -30 , size: 16, font: thaiFont });
            }
          }
          //   // console.log('Not same key', result[key][i].ttt_employee_code)
          //   page = pdfDoc.addPage();
          // }
          // if (yPosition - descriptionHeight < margin) {
          //   yPosition -= descriptionHeight; // Adjust x-position for the next entry
          // }
        }
        //show data
        // page.drawText(`${data.recieve_job_dateandtime}`, { x: 25, y: yPosition, size: fontSize, font: thaiFont });
        // page.drawText(`${data.calling_sheet_no}`, { x: 150, y: yPosition, size: fontSize, font: thaiFont });
        // // const yNameStart = yStart + 20;
        // page.drawText(`${data.total_allowance}`, { x: 240, y: yPosition, size: fontSize, font: thaiFont });
        // // const yPriceStart = yNameStart + 20;
        // page.drawText(`${data.to_name}`, { x: 300, y: yPosition, size: fontSize, font: thaiFont });
        // page.drawText(`${data.total_ot}`, { x: 420, y: yPosition, size: fontSize, font: thaiFont });
        // page.drawText(`${data.over_ot}`, { x: 500, y: yPosition, size: fontSize, font: thaiFont });
        // yPosition -= descriptionHeight; // Adjust x-position for the next entry
        // count++
        // if (count > datas.length - 1) {
        //   console.log('countPDF ', count);
        //   page.drawText(`__________________________________________________________________________________`, { x: 10, y: yPosition + 20, size: 20, font: thaiFont });
        //   // page.drawText(`รวม ${sumValue}`, { x: 470, y: yPosition - 20 , size: 20, font: thaiFont});
        // }

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