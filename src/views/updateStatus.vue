<template>
  <div>
    <b-container>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลสำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลล้มเหลว</a></b-alert>
      <!-- <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Update Allowance</h1>
      <br>
      <br> -->
      <div style="display: inline;">
        <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Update</h1>
        <b-form-select
          style="display: inline; margin: 10px;width: 300px;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;"
          id="selectoption" v-model="selectOption" :options="optionss"></b-form-select>
      </div>
      <div>
        <div v-if="selectOption == 1">
          <allowanceStatusComponent></allowanceStatusComponent>
        </div>
        <div v-if="selectOption == 2">
          <otStatusComponent></otStatusComponent>
        </div>
        <div v-if="selectOption == 3">
          <holidayStatusComponent></holidayStatusComponent>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
import otStatusComponent from '../views/otstatus.vue'
import allowanceStatusComponent from '../views/allowancestatus.vue';
import holidayStatusComponent from '../views/holidaystatus.vue';
export default {
  components: {
    otStatusComponent,
    allowanceStatusComponent,
    holidayStatusComponent
  },
  data() {
    return {
      alertStatus: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      dateupdatefrom: '',
      dateupdateto: '',
      dateupdateselect: '',
      dateupdatefromot: '',
      dateupdatetoot: '',
      dateupdateselectot: '',
      otdateupdatefrom: '',
      otdateupdateto: '',
      otdateupdateselect: '',
      status: 0,
      statusOT: 0,
      otstatus: 0,
      compareDataforupdate: [],
      selectOption: null,
      optionss: [
        { value: null, text: 'กรุณาเลือก' },
        { value: 1, text: 'Allowance Status' },
        { value: 2, text: 'OT Status' },
        { value: 3, text: 'OT Holiday Status' },
      ],
    };
  },
  methods: {
    async updatepayment() {
      let from_to = {
        from: this.dateupdatefrom,
        to: this.dateupdateto,
        payment_status: this.status,
        payment_date: this.dateupdateselect
      }
      await axios.post('http://localhost:4000/addpaymentstatus2', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
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
      await axios.post('http://localhost:4000/addpaymentstatus3', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
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
      await axios.post('http://localhost:4000/addpaymentstatus4', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
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
    async updatepaymentOT() {
      let from_to = {
        from: this.dateupdatefromot,
        to: this.dateupdatetoot,
        payment_status: this.statusOT,
        payment_date: this.dateupdateselectot
      }
      await axios.post('http://localhost:4000/updatepaymentstatusot2', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        });
      await axios.post('http://localhost:4000/updatepaymentstatusot3', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        });
      await axios.post('http://localhost:4000/updatepaymentstatusot4', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        });
    },
    async updatepaymentHoliday() {
      let from_to = {
        from: this.otdateupdatefrom,
        to: this.otdateupdateto,
        payment_status: this.otstatus,
        payment_date: this.otdateupdateselect
      }
      await axios.post('http://localhost:4000/updatepaymentstatusot', from_to)
        .then(response => {
          console.log('updatepayment', response.data.result);
          console.log('status', from_to)
          this.alertStatus = 1
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus = 3
          this.dismissCountDown = this.dismissSecs
          this.dateupdatefrom = ''
          this.dateupdateto = ''
          this.dateupdateselect = ''
          this.statusOT = 0
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
}
</script>