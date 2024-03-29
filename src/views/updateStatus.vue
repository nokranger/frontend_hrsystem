<template>
  <div>
    <b-container>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลสำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพเดตข้อมูลล้มเหลว</a></b-alert>
      <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Update Allowance</h1>
      <br>
      <br>
      <div style="border: 2px solid gray;border-radius: 10px;height: 250px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <b-col></b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerupdateselect" v-model="dateupdateselect"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col></b-col>
          <br>
          <br>
          <div>
            <br>
            <b-button variant="outline-primary" @click="updatepayment">Update payment status</b-button>
          </div>
          <div>
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="1" unchecked-value="0">
              <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
            </b-form-checkbox>
          </div>
        </b-row>
      </div>
      <br>
      <br>
      <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Update OT Status</h1>
      <br>
      <br>
      <div style="border: 2px solid gray;border-radius: 10px;height: 250px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <!-- <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerupdatefromot" v-model="dateupdatefromot"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerupdatetoot" v-model="dateupdatetoot"
              class="mb-2"></b-form-datepicker>
          </b-col> -->
          <b-col></b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="example-datepickerupdateselectpt" v-model="dateupdateselectot"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col></b-col>
          <div>
            <br>
            <b-button variant="outline-primary" @click="updatepaymentOT">Update OT status</b-button>
          </div>
          <div>
            <b-form-checkbox id="checkbox-12" v-model="statusOT" name="checkbox-1" value="1" unchecked-value="0">
              <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
            </b-form-checkbox>
          </div>
        </b-row>
      </div>
      <br>
      <br>
      <h1 style="text-shadow: 2px 2px 5px black;display: inline;font-size: 25px;">Update OT Holiday</h1>
      <br>
      <br>
      <div style="border: 2px solid gray;border-radius: 10px;height: 250px;box-shadow: 5px 5px 5px #888888;">
        <b-row style="margin: 20px;">
          <!-- <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
            <b-form-datepicker style="width: 100%;" id="otexample-datepickerupdatefrom" v-model="otdateupdatefrom"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
            <b-form-datepicker style="width: 100%;" id="otexample-datepickerupdateto" v-model="otdateupdateto"
              class="mb-2"></b-form-datepicker>
          </b-col> -->
          <b-col></b-col>
          <b-col>
            <div style="font-size: 20px;text-align: left;margin-left: 10px;">เลือกวันจ่ายเงิน</div>
            <b-form-datepicker style="width: 100%;" id="otexample-datepickerupdateselect" v-model="otdateupdateselect"
              class="mb-2"></b-form-datepicker>
          </b-col>
          <b-col></b-col>
          <div>
            <br>
            <b-button variant="outline-primary" @click="updatepaymentHoliday">Update OT Holiday</b-button>
          </div>
          <div>
            <b-form-checkbox id="checkbox-13" v-model="otstatus" name="checkbox-1" value="1" unchecked-value="0">
              <div style="margin: 10px;font-size: 20px;">ยืนยันการจ่ายเงิน</div>
            </b-form-checkbox>
          </div>
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
      compareDataforupdate: []
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