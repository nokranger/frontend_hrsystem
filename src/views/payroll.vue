<template>
  <div>
    <!-- <nav>
      <router-link to="/dashboard" style="font-size: 20px;">Import & Export</router-link> ||
      <router-link to="/Attached" style="font-size: 20px;">Attached</router-link> ||
      <router-link to="/payroll" style="font-size: 20px;">Payroll</router-link>
    </nav> -->
    <b-container>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;font-size: 25px;">Payroll</h1>
      </div>
      <div style="border: 2px solid gray;border-radius: 10px;height: 200px;box-shadow: 5px 5px 5px #888888;">
        <span style="display: inline;">
          <b-row style="margin: 10px;">
            <b-col>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
              <b-form-datepicker style="width: 100%;" id="example-datepickerpaymentselect1" v-model="dateotselect"
                class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col>
              <!-- <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
              <b-form-datepicker style="width: 100%;" id="example-datepicker2" v-model="dateotto"
                class="mb-2"></b-form-datepicker> -->
            </b-col>
            <b-col>
              <div style="text-align: left;">
                <b-button style="box-shadow: 5px 5px 5px #888888;margin-top: 30px;" variant="outline-primary" @click="getot">Payroll
                  OT <b-icon-file-earmark-excel-fill variant="success"></b-icon-file-earmark-excel-fill></b-button>
              </div>
            </b-col>
          </b-row>
          <b-row style="margin: 10px;">
            <b-col>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
              <b-form-datepicker style="width: 100%;" id="example-datepickerpaymentselect2" v-model="dateallowanceselect"
                class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col>
              <!-- <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
              <b-form-datepicker style="width: 100%;" id="example-datepicker4" v-model="dateallowanceto"
                class="mb-2"></b-form-datepicker> -->
            </b-col>
            <b-col>
              <div style="text-align: left;">
                <b-button style="box-shadow: 5px 5px 5px #888888;margin-top: 30px;" variant="outline-success"
                  @click="getallowance">Payroll Allowance <b-icon-file-earmark-excel-fill variant="success"></b-icon-file-earmark-excel-fill></b-button>
              </div>
              <!-- {{ dateotfrom}}{{dateotto}}{{dateallowancefrom}}{{dateallowanceto }} -->
            </b-col>
          </b-row>
          <!-- <b-button style="box-shadow: 5px 5px 5px #888888;" variant="outline-success" @click="getallowance">Payroll Allowance</b-button> -->
        </span>
      </div>
    </b-container>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
export default {
  data() {
    return {
      excelarray: [],
      excelarrayot: [],
      excelarrayot2: [],
      excelarrayot3: [],
      excelarrayallowance: [],
      excelarrayallowance2: [],
      excelarrayallowance3: [],
      dateotfrom: '',
      dateotto: '',
      dateallowancefrom: '',
      dateallowanceto: '',
      dateotselect: '',
      dateallowanceselect: ''
    }
  },
  methods: {
    async getot() {
      let from_to = {
        from: this.dateotfrom,
        to: this.dateotto,
        payment_date: this.dateotselect
      }
      await axios.post('http://localhost:4000/getdatapayrollot', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayot = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdatapayrollot2', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayot2 = Object.values(dataexcel);
          const combinedArray = []
          for (let i = 0; i < this.excelarrayot.length; i++) {
            const combinedObject = {
              EMP_CODE: this.excelarrayot[i].EMP_CODE,
              OT: this.excelarrayot[i].OT,
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayot2.length; i++) {
            const combinedObject = {
              EMP_CODE: this.excelarrayot2[i].EMP_CODE,
              OT: this.excelarrayot2[i].OT,
            }
            combinedArray.push(combinedObject);
          }
          // for (let i = 0; i < this.excelarrayot3.length; i++) {
          //   const combinedObject = {
          //     EMP_CODE: this.excelarrayot3[i].EMP_CODE,
          //     OT: this.excelarrayot3[i].OT,
          //   }
          //   combinedArray.push(combinedObject);
          // }
          console.log('dateTime', combinedArray)
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(combinedArray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'payrollOT');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'payrollOT.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async getallowance() {
      let from_to = {
        from: this.dateallowancefrom,
        to: this.dateallowanceto,
        payment_date: this.dateallowanceselect
      }
      await axios.post('http://localhost:4000/getdatapayrollallowance', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayallowance = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdatapayrollallowance2', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayallowance2 = Object.values(dataexcel);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/getdatapayrollallowance3', from_to)
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayallowance3 = Object.values(dataexcel);

          const combinedArray = []
          for (let i = 0; i < this.excelarrayallowance.length; i++) {
            const combinedObject = {
              EMP_CODE: this.excelarrayallowance[i].EMP_CODE,
              ALLOWANCE: this.excelarrayallowance[i].ALLOWANCE,
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayallowance2.length; i++) {
            const combinedObject = {
              EMP_CODE: this.excelarrayallowance2[i].EMP_CODE,
              ALLOWANCE: this.excelarrayallowance2[i].ALLOWANCE,
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.excelarrayallowance3.length; i++) {
            const combinedObject = {
              EMP_CODE: this.excelarrayallowance3[i].EMP_CODE,
              ALLOWANCE: this.excelarrayallowance3[i].ALLOWANCE,
            }
            combinedArray.push(combinedObject);
          }
          this.data = combinedArray
          this.data = this.data.reduce((acc, { ALLOWANCE, EMP_CODE }) => {
            if (!acc[EMP_CODE]) {
              acc[EMP_CODE] = { EMP_CODE, ALLOWANCE: 0 };
            }
            acc[EMP_CODE].ALLOWANCE += ALLOWANCE;
            return acc;
          }, {});
          this.data = Object.values(this.data);
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.data);

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