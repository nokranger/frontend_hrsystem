<template>
  <div>
    <!-- <nav>
      <router-link to="/dashboard" style="font-size: 20px;">Import & Export</router-link> ||
      <router-link to="/Attached" style="font-size: 20px;">Attached</router-link> ||
      <router-link to="/payroll" style="font-size: 20px;">Payroll</router-link>
    </nav> -->
    <b-container>
      <b-row>
        <div style="font-weight: bold;font-size: 20px;margin: 5px;">
          กรุณากรอกหมายเลข TRIP
        </div>
        <b-input v-on:keyup.enter="findtrip" placeholder="Enter TRIP" v-model="findtrips"></b-input>
        <div>
          <br>
          <br>
          <p style="text-align: center;">
            <tr style="border: 1px solid;">
              <td style="border: 1px solid;">NO.</td>
              <td style="border: 1px solid;">DEPARTURE_DATETIME</td>
              <td style="border: 1px solid;">Calling Sheet No</td>
              <td style="border: 1px solid;">Employee code</td>
              <td style="border: 1px solid;">NAME</td>
              <td style="border: 1px solid;">To Name</td>
              <td style="border: 1px solid;">TRIP_ALLOWANCE</td>
              <td style="border: 1px solid;">Payment Status</td>
              <td style="border: 1px solid;">Payment Date</td>
              <td style="border: 1px solid;">Standard OT</td>
              <td style="border: 1px solid;">Over OT</td>
              <td style="border: 1px solid;">Payment Status OT</td>
              <td style="border: 1px solid;">Payment Date OT</td>
              <td style="border: 1px solid;">create_time</td>
            </tr>
            <tr v-for="(item, index) in showdatafind" :key="index" style="border: 1px solid;">
              <td style="border: 1px solid;margin: 5px;">{{ index + 1 }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ (item.Working_date) }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.calling_sheet_no }}</td>
              <!-- <td style="border: 1px solid;margin: 5px;">{{ item.total_ot }}</td> -->
              <td style="border: 1px solid;margin: 5px;">{{ item.ttt_employee_code }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.tlep_driver_name }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.to_name }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.total_allowance.toLocaleString() }}</td>
              <td v-if="item.payment_status_3 === '1' || item.payment_status_3 === 1" style="border: 1px solid;margin: 5px;">จ่ายแล้ว</td>
              <td v-if="item.payment_status_3 === 0 || item.payment_status_3 === '0' || item.payment_status_3 === null || item.payment_status_3 === undefined" style="border: 1px solid;margin: 5px;">ยังไม่จ่าย</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.payment_date_st_2 }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.standard_ot }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.over_ot }}</td>
              <td v-if="item.payment_status_ot === '1' || item.payment_status_ot === 1" style="border: 1px solid;margin: 5px;">จ่ายแล้ว</td>
              <td v-if="item.payment_status_ot === 0 || item.payment_status_ot === '0' || item.payment_status_ot === null || item.payment_status_ot === undefined" style="border: 1px solid;margin: 5px;">ยังไม่จ่าย</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.payment_date_st_ot }}</td>
              <td style="border: 1px solid;margin: 5px;">{{ item.create_time }}</td>
            </tr>
          </p>
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
      excelarray: [],
      excelarraywelfare: [],
      excelarrayinstructor: [],
      excelarrayHoliday: [],
      findtrips: '',
      showdatafind: []

    }
  },
  mounted() {
    let data = '123'
    console.log('leng', data.length)
  },
  methods: {
    async findtrip() {
      await axios.get('http://localhost:4000/searchtrip1')
        .then(response => {
          // console.log('resdatatnos', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel)
          console.log('res1', this.excelarray)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.get('http://localhost:4000/searchtrip2')
        .then(response => {
          // console.log('resdatainstructor', response.data.result);
          let dataexcel = response.data.result
          this.excelarraywelfare = Object.values(dataexcel)
          console.log('res2', this.excelarraywelfare)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.get('http://localhost:4000/searchtrip3')
        .then(response => {
          // console.log('resdatainstructor', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayinstructor = Object.values(dataexcel)
          console.log('res3', this.excelarrayinstructor)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.get('http://localhost:4000/searchtrip4')
        .then(response => {
          // console.log('resdatawelfare', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayHoliday = Object.values(dataexcel);
          console.log('res4', this.excelarrayHoliday);
          const combinedArray = []
          for (let i = 0; i < this.excelarray.length; i++) {
            const combinedObject = {
              Working_date: this.excelarray[i].Working_date,
              job_code: this.excelarray[i].job_code,
              shift: this.excelarray[i].shift,
              trip_no: this.excelarray[i].trip_no,
              ttt_employee_code: this.excelarray[i].ttt_employee_code,
              tlep_driver_code: this.excelarray[i].tlep_driver_code,
              tlep_driver_name: this.excelarray[i].tlep_driver_name,
              company_code: this.excelarray[i].ompany_code,
              company_name: this.excelarray[i].company_name,
              trailer_code: this.excelarray[i].trailer_code,
              trailer_type_code: this.excelarray[i].trailer_type_code,
              trailer_type: this.excelarray[i].trailer_type,
              ttt_payment_status: this.excelarray[i].ttt_payment_status,
              calling_sheet_no: this.excelarray[i].calling_sheet_no,
              trip_type: this.excelarray[i].trip_type,
              recieve_job_dateandtime: this.excelarray[i].recieve_job_dateandtime,
              from_code: this.excelarray[i].from_code,
              from_name: this.excelarray[i].from_name,
              yard_out_dateandtime: this.excelarray[i].yard_out_dateandtime,
              to_code: this.excelarray[i].to_code,
              to_name: this.excelarray[i].to_name,
              to_in_dateandtime: this.excelarray[i].to_in_dateandtime,
              reture_code: this.excelarray[i].reture_code,
              return_name: this.excelarray[i].return_name,
              return_in_dateandtime: this.excelarray[i].return_in_dateandtime,
              loading_units: this.excelarray[i].loading_units,
              loading_count: this.excelarray[i].loading_count,
              unloading_count: this.excelarray[i].unloading_count,
              number_of_driver: this.excelarray[i].number_of_driver,
              nd2_employee_code: this.excelarray[i].nd2_employee_code,
              nd2_tlep_driver_code: this.excelarray[i].nd2_tlep_driver_code,
              nd2_tlep_driver_name: this.excelarray[i].nd2_tlep_driver_name,
              mileage: this.excelarray[i].mileage,
              allowance: parseFloat(this.excelarray[i].allowance),
              allowance2: parseFloat(this.excelarray[i].allowance2),
              allowance3: parseFloat(this.excelarray[i].allowance3),
              allowance4: parseFloat(this.excelarray[i].allowance4),
              total_allowance: parseFloat(this.excelarray[i].total_allowance),
              standard_ot: parseFloat(this.excelarray[i].standard_ot),
              over_ot: parseFloat(this.excelarray[i].over_ot),
              total_ot: parseFloat(this.excelarray[i].total_ot),
              payment_status: this.excelarray[i].payment_status,
              ot_payment_date: this.excelarray[i].ot_payment_date,
              allowance_payment_date: this.excelarray[i].allowance_payment_date,
              payment_status_2: this.excelarray[i].payment_status_2,
              payment_date_st: this.excelarray[i].payment_date_st,
              payment_status_3: this.excelarray[i].payment_status_3,
              payment_date_st_2: this.excelarray[i].payment_date_st_2,
              payment_status_ot: this.excelarray[i].payment_status_ot,
              payment_date_st_ot: this.excelarray[i].payment_date_st_ot,
              TAX_FLAG: this.excelarray[i].TAX_FLAG,
              create_time: this.excelarray[i].create_time
            };

            combinedArray.push(combinedObject);

          }
          for (let j = 0; j < this.excelarrayinstructor.length; j++) {
            const combinedObject = {
              // AA: this.excelarraywelfare[j].DEALER1,
              to_name: this.excelarrayinstructor[j].DEALER1,
              tlep_driver_name: this.excelarrayinstructor[j].NAME,
              TAX_FLAG: this.excelarrayinstructor[j].TAX_FLAG,
              Working_date: this.excelarrayinstructor[j].DEPARTURE_DATETIME,
              yard_out_dateandtime: this.excelarrayinstructor[j].YARDOUTDATE,
              total_allowance: parseFloat(this.excelarrayinstructor[j].TOTAL_ALLOWANCE),
              ttt_employee_code: this.excelarrayinstructor[j].DRIVER1,
              calling_sheet_no: this.excelarrayinstructor[j].TRIP_NO,
              payment_status_2: this.excelarrayinstructor[j].payment_status_2,
              payment_date_st: this.excelarrayinstructor[j].payment_date_st,
              payment_status_3: this.excelarrayinstructor[j].payment_status_3,
              payment_date_st_2: this.excelarrayinstructor[j].payment_date_st_2,
              payment_status_ot: this.excelarrayinstructor[j].payment_status_ot,
              payment_date_st_ot: this.excelarrayinstructor[j].payment_date_st_ot,
              create_time: this.excelarrayinstructor[j].create_time

              // BB: object1[i].BB,
              // CC: object2[i].AC || object1[i].CC
            };
            combinedArray.push(combinedObject);
          }
          for (let j = 0; j < this.excelarraywelfare.length; j++) {
            const combinedObject = {
              // AA: this.excelarraywelfare[j].DEALER1,
              to_name: this.excelarraywelfare[j].DEALER1,
              tlep_driver_name: this.excelarraywelfare[j].NAME,
              TAX_FLAG: this.excelarraywelfare[j].TAX_FLAG,
              Working_date: this.excelarraywelfare[j].DEPARTURE_DATETIME,
              yard_out_dateandtime: this.excelarraywelfare[j].YARDOUTDATE,
              total_allowance: parseFloat(this.excelarraywelfare[j].TOTAL_ALLOWANCE),
              total_ot: this.excelarraywelfare[j].OT_HOURS,
              ttt_employee_code: this.excelarraywelfare[j].DRIVER1,
              calling_sheet_no: this.excelarraywelfare[j].TRIP_NO,
              payment_status_2: this.excelarraywelfare[j].payment_status_2,
              payment_date_st: this.excelarraywelfare[j].payment_date_st,
              payment_status_3: this.excelarraywelfare[j].payment_status_3,
              payment_date_st_2: this.excelarraywelfare[j].payment_date_st_2,
              payment_status_ot: this.excelarraywelfare[j].payment_status_ot,
              payment_date_st_ot: this.excelarraywelfare[j].payment_date_st_ot,
              create_time: this.excelarraywelfare[j].create_time
            };
            combinedArray.push(combinedObject);
          }
          for (let j = 0; j < this.excelarrayHoliday.length; j++) {
            const combinedObject = {
              // AA: this.excelarrayHoliday[j].DEALER1,
              to_name: this.excelarrayHoliday[j].DEALER1,
              tlep_driver_name: this.excelarrayHoliday[j].NAME,
              TAX_FLAG: this.excelarrayHoliday[j].TAX_FLAG,
              Working_date: this.excelarrayHoliday[j].DEPARTURE_DATETIME,
              yard_out_dateandtime: this.excelarrayHoliday[j].YARDOUTDATE,
              total_allowance: parseFloat(this.excelarrayHoliday[j].TOTAL_ALLOWANCE),
              total_ot: this.excelarrayHoliday[j].OT_HOURS,
              ttt_employee_code: this.excelarrayHoliday[j].DRIVER1,
              calling_sheet_no: this.excelarrayHoliday[j].TRIP_NO,
              payment_status_2: this.excelarrayHoliday[j].payment_status_2,
              payment_date_st: this.excelarrayHoliday[j].payment_date_st,
              payment_status_3: this.excelarrayHoliday[j].payment_status_3,
              payment_date_st_2: this.excelarrayHoliday[j].payment_date_st_2,
              payment_status_ot: this.excelarrayHoliday[j].payment_status_ot,
              payment_date_st_ot: this.excelarrayHoliday[j].payment_date_st_ot,
              create_time: this.excelarrayHoliday[j].create_time
            };
            combinedArray.push(combinedObject);
          }
          this.showdatafind = combinedArray
          this.showdatafind = this.showdatafind.filter((i) => {
            return i.calling_sheet_no === this.findtrips.toUpperCase()
          })
          console.log('combinedObject', this.showdatafind)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
  }
}
</script>