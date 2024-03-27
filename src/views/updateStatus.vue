<template>
  <div>
    <b-container>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลสำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลล้มเหลว</a></b-alert>
      <b-row>
        <b-col>
          <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
          <b-form-datepicker style="width: 100%;" id="example-datepickerupdatefrom" v-model="dateupdatefrom"
            class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
          <b-form-datepicker style="width: 100%;" id="example-datepickerupdateto" v-model="dateupdateto"
            class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
          <b-form-datepicker style="width: 100%;" id="example-datepickerupdateselect" v-model="dateupdateselect"
            class="mb-2"></b-form-datepicker>
        </b-col>
        <div>
          <b-button variant="outline-primary" @click="updatepayment">Update payment status</b-button>
        </div>
        <div>
          <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="1" unchecked-value="0">
            <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
          </b-form-checkbox>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
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
      status: 0
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
      await axios.post('http://localhost:4000/addpaymentstatus', from_to)
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  }
}
</script>