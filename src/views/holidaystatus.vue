<template>
  <div>
    <b-container>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลสำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลล้มเหลว</a></b-alert>
      <div style="border: 2px solid gray;border-radius: 10px;height: 250px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <b-col></b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="otexample-datepickerupdateselect" v-model="otdateupdateselect"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col></b-col>
          <div>
            <b-form-checkbox id="checkbox-13" v-model="otstatus" name="checkbox-1" value="1" unchecked-value="0">
              <div style="margin: 10px;font-size: 20px;">ยืนยันการอัพเดท</div>
            </b-form-checkbox>
          </div>
          <div>
            <br>
            <b-button v-if="otstatus == 1" variant="outline-primary" @click="updatepaymentHoliday">Update OT Holiday</b-button>
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
import attached7 from '../views/attach7.vue'
import attached8 from '../views/attach8.vue';
import attached9 from '../views/attach9.vue';
export default {
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
        { value: 2, text: 'OTStatus' },
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