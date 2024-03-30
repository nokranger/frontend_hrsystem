<template>
  <div>
    <b-container>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none" class="alert-link">Export
          Payment Success</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none" class="alert-link">Export
          Payment Fail</a></b-alert>
      <b-alert v-if="alertStatus2 === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none" class="alert-link">Update
          Payment Success</a></b-alert>
      <b-alert v-if="alertStatus2 === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none" class="alert-link">Update
          Payment Fail</a></b-alert>
      <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Export Payment</h1>
      <br>
      <br>
      <div style="border: 2px solid gray;border-radius: 10px;height: 250px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <!-- <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerpaymentfrom" v-model="datepaymentfrom"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerpaymentto" v-model="datepaymentto"
              class="mb-2"></b-form-datepicker>
          </b-col> -->
          <b-col></b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerpaymentselect" v-model="datepaymentselect"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col></b-col>
          <b-col>
            <div>
              <b-button v-on:click="exportPayment" variant="outline-primary">Export payment</b-button>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="1" unchecked-value="0">
              <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
            </b-form-checkbox>
          </b-col>
          <b-col>
            <b-button v-on:click="updatePayment" variant="outline-primary">Update payment</b-button>
          </b-col>
        </b-row>
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
      datepaymentfrom: '',
      datepaymentto: '',
      datepaymentselect: '',
      dateotfrom: '',
      dateotto: '',
      dateallowancefrom: '',
      dateallowanceto: '',
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      status: 0,
      alertStatus: 0,
      alertStatus2: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  mounted() {
    let sumValue = 55190375
    let sumI = 1
    let formattedSumValues = ('000000' + sumI).slice(-6);
    let formattedSumValue = ('0000000000000' + sumValue).slice(-13);
    console.log('formattedSumValue', formattedSumValue);
    console.log('formattedSumValueI', formattedSumValues);
  },
  methods: {
    async exportPayment() {
      let from_to = {
        from: this.datepaymentfrom,
        to: this.datepaymentto,
        payment_status: this.status,
        payment_date: this.datepaymentselect
      }
      await axios.post('http://localhost:4000/getdatapayment2', from_to)
        .then(response => {
          this.data2 = response.data.result
          this.data2 = Object.values(this.data2)
          console.log('updatepayment2', response.data.result);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/getdatapayment21', from_to)
        .then(response => {
          this.data3 = response.data.result
          this.data3 = Object.values(this.data3)
          console.log('updatepayment3', response.data.result);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/getdatapayment3', from_to)
        .then(response => {
          this.data4 = response.data.result
          this.data4 = Object.values(this.data4)
          console.log('updatepayment4', response.data.result);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/getdatapayment31', from_to)
        .then(response => {
          this.data5 = response.data.result
          this.data5 = Object.values(this.data5)
          console.log('updatepayment', response.data.result);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/getdatapayment', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
          this.data = response.data.result
          this.data = Object.values(this.data);
          const combinedArray = []
          for (let i = 0; i < this.data.length; i++) {
            const combinedObject = {
              bank_account_number: this.data[i].bank_account_number,
              emp_code: this.data[i].emp_code,
              name: this.data[i].name,
              total_allowance: parseFloat(this.data[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.data2.length; i++) {
            const combinedObject = {
              bank_account_number: this.data2[i].bank_account_number,
              emp_code: this.data2[i].emp_code,
              name: this.data2[i].name,
              total_allowance: parseFloat(this.data2[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.data3.length; i++) {
            const combinedObject = {
              bank_account_number: this.data3[i].bank_account_number,
              emp_code: this.data3[i].emp_code,
              name: this.data3[i].name,
              total_allowance: parseFloat(this.data3[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.data4.length; i++) {
            const combinedObject = {
              bank_account_number: this.data4[i].bank_account_number,
              emp_code: this.data4[i].emp_code,
              name: this.data4[i].name,
              total_allowance: parseFloat(this.data4[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          for (let i = 0; i < this.data5.length; i++) {
            const combinedObject = {
              bank_account_number: this.data5[i].bank_account_number,
              emp_code: this.data5[i].emp_code,
              name: this.data5[i].name,
              total_allowance: parseFloat(this.data5[i].total_allowance),
            }
            combinedArray.push(combinedObject);
          }
          console.log('sumvalu1', combinedArray)
          this.data = combinedArray
          let date = new Date(this.datepaymentselect);
          let formattedDate = ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear().toString().substr(-2);
          let sumValue = this.data.reduce((acc, obj) => acc + parseFloat(obj.total_allowance), 0);
          console.log('sumvalue', sumValue)
          sumValue = sumValue * 100
          // sumValue = sumValue.replace('.', '').padStart(10, '')
          // sumValue = sumValue.replace(',', '')
          console.log('sumvalue', sumValue)
          let header = `H0000010023863014746TOYOTA TRANSPORT (THAILAN${formattedDate}00000000000000000000000000000000000000000000000000000000000000000000000000000\n`
          console.log('HEADER', header.length)
          let count = 0
          let headerString = 128
          let contentString = 128
          let footerString = 128
          for (let i = 0; i < this.data.length; i++) {
            let sumValue2 = this.data[i].total_allowance
            sumValue2 = sumValue2 * 100
            // sumValue2 = sumValue2.replace(',', '')
            let bank_account_number_split = this.data[i].bank_account_number.replace(/-/g, '')
            let concatstring = 'D' + `${('000000' + (i + 2)).slice(-6)}` + '200' + (bank_account_number_split) + `${('0000000000' + sumValue2).slice(-10)}` + '0029' + '                                ' + '00000000000000' + '' + '             ' + this.data[i].name.padEnd(35, ' ') + '\n'
            this.excelarray += concatstring
            console.log('CONTENT', concatstring.length)
            count++
          }
          this.excelarray = header + this.excelarray
          let footer = `T${('000000' + (this.data.length + 2)).slice(-6)}002386301474600000000000000000000${('0000000' + this.data.length).slice(-7)}${('0000000000000' + sumValue).slice(-13)}00000000000000000000000000000000000000000000000000000000000000000000`
          console.log('HEADER', footer.length)
          this.excelarray += footer
          let blob = new Blob([this.excelarray], { type: 'text/plain' });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'output.dat';
          link.click();
          this.excelarray = ''
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.datepaymentfrom = ''
          this.datepaymentto = ''
          this.datepaymentselect = ''
          this.status = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
    },
    async updatePayment() {
      let from_to = {
        from: this.datepaymentfrom,
        to: this.datepaymentto,
        payment_status: this.status,
        payment_date: this.datepaymentselect
      }
      console.log('updatepayment', from_to)
      await axios.post('http://localhost:4000/addpaymentstatus22', from_to)
        .then(response => {
          // console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/addpaymentstatus32', from_to)
        .then(response => {
          // console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
      await axios.post('http://localhost:4000/addpaymentstatus42', from_to)
        .then(response => {
          // console.log('updatepayment', response.data.result);
          // console.log('status', from_to)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.status = 0
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
}
</script>