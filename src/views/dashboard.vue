<template>
  <div>
    <!-- <nav>
      <router-link to="/dashboard" style="font-size: 20px;">Import & Export</router-link> ||
      <router-link to="/Attached" style="font-size: 20px;">Attached</router-link> ||
      <router-link to="/payroll" style="font-size: 20px;">Payroll</router-link>
    </nav> -->
    <b-container>
      <b-modal id="modal-welfare" size="xl" title="ข้อมูล Welfare ที่ซ้ำ" hide-footer>
        <tr style="border: 1px solid;">
          <td style="border: 1px solid;">NO.</td>
          <td style="border: 1px solid;">TRIP_NO</td>
          <td style="border: 1px solid;">TRIP_ALLOWANCE</td>
          <td style="border: 1px solid;">DEPARTURE_DATETIME</td>
          <td style="border: 1px solid;">DRIVER1</td>
          <td style="border: 1px solid;">NAME</td>
          <td style="border: 1px solid;">DEALER1</td>
          <td style="border: 1px solid;">create_time</td>
        </tr>
        <tr v-for="(item, index) in showWelfareDup" :key="index" style="border: 1px solid;">
          <td style="border: 1px solid;">{{ index + 1 }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_NO }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_ALLOWANCE.toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ new Date((item.DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new
          Date(1900, 0, 0).getTime()).toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ item.DRIVER1 }}</td>
          <td style="border: 1px solid;">{{ item.NAME }}</td>
          <td style="border: 1px solid;">{{ item.DEALER1 }}</td>
          <td style="border: 1px solid;">{{ item.create_time }}</td>
        </tr>
      </b-modal>
      <b-modal id="modal-Holiday" size="xl" title="ข้อมูล Holiday ที่ซ้ำ" hide-footer>
        <tr style="border: 1px solid;">
          <td style="border: 1px solid;">NO.</td>
          <td style="border: 1px solid;">TRIP_NO</td>
          <td style="border: 1px solid;">TRIP_ALLOWANCE</td>
          <td style="border: 1px solid;">DEPARTURE_DATETIME</td>
          <td style="border: 1px solid;">DRIVER1</td>
          <td style="border: 1px solid;">NAME</td>
          <td style="border: 1px solid;">DEALER1</td>
          <td style="border: 1px solid;">create_time</td>
        </tr>
        <tr v-for="(item, index) in showHoliday" :key="index" style="border: 1px solid;">
          <td style="border: 1px solid;">{{ index + 1 }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_NO }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_ALLOWANCE.toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ new Date((item.DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new
          Date(1900, 0, 0).getTime()).toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ item.DRIVER1 }}</td>
          <td style="border: 1px solid;">{{ item.NAME }}</td>
          <td style="border: 1px solid;">{{ item.DEALER1 }}</td>
          <td style="border: 1px solid;">{{ item.create_time }}</td>
        </tr>
      </b-modal>
      <b-modal id="modal-instructor" size="xl" title="ข้อมูล Instructor ที่ซ้ำ" hide-footer>
        <tr style="border: 1px solid;">
          <td style="border: 1px solid;">NO.</td>
          <td style="border: 1px solid;">TRIP_NO</td>
          <td style="border: 1px solid;">TRIP_ALLOWANCE</td>
          <td style="border: 1px solid;">DEPARTURE_DATETIME</td>
          <td style="border: 1px solid;">DRIVER1</td>
          <td style="border: 1px solid;">NAME</td>
          <td style="border: 1px solid;">DEALER1</td>
          <td style="border: 1px solid;">create_time</td>
        </tr>
        <tr v-for="(item, index) in showInstructorDup" :key="index" style="border: 1px solid;">
          <td style="border: 1px solid;">{{ index + 1 }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_NO }}</td>
          <td style="border: 1px solid;">{{ item.TRIP_ALLOWANCE.toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ new Date((item.DEPARTURE_DATETIME - 1) * 24 * 60 * 60 * 1000 + new
          Date(1900, 0, 0).getTime()).toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ item.DRIVER1 }}</td>
          <td style="border: 1px solid;">{{ item.NAME }}</td>
          <td style="border: 1px solid;">{{ item.DEALER1 }}</td>
          <td style="border: 1px solid;">{{ item.create_time }}</td>
        </tr>
      </b-modal>
      <b-modal id="modal-tnos" size="xl" title="ข้อมูล TNOS ที่ซ้ำ" hide-footer>
        <tr style="border: 1px solid;">
          <td style="border: 1px solid;">NO.</td>
          <td style="border: 1px solid;">Calling Sheet No</td>
          <td style="border: 1px solid;">TRIP_ALLOWANCE</td>
          <td style="border: 1px solid;">DEPARTURE_DATETIME</td>
          <td style="border: 1px solid;">Employee code</td>
          <td style="border: 1px solid;">NAME</td>
          <td style="border: 1px solid;">To Name</td>
          <td style="border: 1px solid;">create_time</td>
        </tr>
        <tr v-for="(item, index) in showtnosDup" :key="index" style="border: 1px solid;">
          <td style="border: 1px solid;">{{ index + 1 }}</td>
          <td style="border: 1px solid;">{{ item.calling_sheet_no }}</td>
          <td style="border: 1px solid;">{{ item.total_allowance.toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ new Date((item.recieve_job_dateandtime - 1) * 24 * 60 * 60 * 1000 + new
          Date(1900, 0, 0).getTime()).toLocaleString() }}</td>
          <td style="border: 1px solid;">{{ item.ttt_employee_code }}</td>
          <td style="border: 1px solid;">{{ item.tlep_driver_name }}</td>
          <td style="border: 1px solid;">{{ item.to_name }}</td>
          <td style="border: 1px solid;">{{ item.create_time }}</td>
        </tr>
      </b-modal>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;margin: 20px;font-size: 25px;">Import Data</h1>
      </div>
      <b-alert v-if="alertStatus === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพโหลดข้อมูล{{ showStatus }}สำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus === 2" show variant="warning" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none" class="alert-link">ไม่มีข้อมูล{{
          showStatus }}เปลี่ยนแปลง</a></b-alert>
      <b-alert v-if="alertStatus === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">อัพโหลดข้อมูล{{ showStatus }}ล้มเหลว</a></b-alert>
      <b-alert v-if="alertStatus2 === 1" show variant="success" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">ลบข้อมูลสำเร็จ</a></b-alert>
      <b-alert v-if="alertStatus2 === 3" show variant="danger" :show="dismissCountDown" fade
        @dismiss-count-down="countDownChanged"><a href="#" style="text-decoration:none"
          class="alert-link">ลบข้อมูลล้มเหลว</a></b-alert>
      <div style="border: 2px solid gray;border-radius: 10px;height: 650px;box-shadow: 5px 5px 5px #888888;">
        <b-row>
          <b-col>
            <div>
              <br>
              <div style="font-weight: bold;font-size: 20px;margin: 10px;">
                Personal Data
              </div>
              <input type="file" ref="fileInput" @change="handleFileChangetest" />
            </div>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
            <div>
              <div style="font-weight: bold;font-size: 20px;margin: 10px;">
                Instructor Data
              </div>
              <input type="file" ref="fileInput" @change="handleFileChangeInstructor" />
            </div>
          </b-col>
          <b-col>
            <div style="font-weight: bold;font-size: 20px;margin: 5px;">
              เลือกช่วงเวลาสำหรับลบข้อมูล Instructor
            </div>
            <b-form-select
              style="display: inline;width: 300px;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;"
              id="selectoption1" v-model="selectOptionInstructor" :options="deleteInstrutor"></b-form-select>
            <b-button style="margin: 10px;" v-on:click="Instructordelete()"
              variant="outline-danger">ยืนยันการลบ</b-button>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
            <div>
              <div style="font-weight: bold;font-size: 20px;margin: 10px;">
                T-nos Data
              </div>
              <input type="file" ref="fileInput" @change="handleFileChangeTnos" />
            </div>
          </b-col>
          <b-col>
            <div style="font-weight: bold;font-size: 20px;margin: 5px;">
              เลือกช่วงเวลาสำหรับลบข้อมูล T-nos
            </div>
            <b-form-select
              style="display: inline;width: 300px;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;"
              id="selectoption2" v-model="selectOption" :options="deleteTnos"></b-form-select>
            <b-button style="margin: 10px;" v-on:click="tnosdelete()" variant="outline-danger">ยืนยันการลบ</b-button>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
            <div>
              <div style="font-weight: bold;font-size: 20px;margin: 10px;">
                Welfare Data
              </div>
              <input type="file" ref="fileInput" @change="handleFileChangeWelfare" />
            </div>
          </b-col>
          <b-col>
            <div style="font-weight: bold;font-size: 20px;margin: 5px;">
              เลือกช่วงเวลาสำหรับลบข้อมูล Welfare
            </div>
            <b-form-select
              style="display: inline;width: 300px;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;"
              id="selectoption3" v-model="selectOptionwelfare" :options="deleteWelfare"></b-form-select>
            <b-button style="margin: 10px;" v-on:click="Welfaredelete()" variant="outline-danger">ยืนยันการลบ</b-button>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
            <div>
              <div style="font-weight: bold;font-size: 20px;margin: 10px;">
                Holiday Data
              </div>
              <input type="file" ref="fileInput" @change="handleFileChangeHoliday" />
            </div>
          </b-col>
          <b-col>
            <div style="font-weight: bold;font-size: 20px;margin: 5px;">
              เลือกช่วงเวลาสำหรับลบข้อมูล Holiday
            </div>
            <b-form-select
              style="display: inline;width: 300px;height: 40px;font-family: 'Noto Serif', sans-serif;font-weight: bold;font-size: 20px;border-radius:10px;border:1px solid #cccccc;"
              id="selectoption4" v-model="selectOptionHoliday" :options="deleteHoliday"></b-form-select>
            <b-button style="margin: 10px;" v-on:click="Holidaydelete()" variant="outline-danger">ยืนยันการลบ</b-button>
          </b-col>
        </b-row>
      </div>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;margin: 20px;font-size: 25px;">Export Master Data</h1>
      </div>
      <div
        style="border: 2px solid gray;border-radius: 10px;height: 400px;box-shadow: 5px 5px 5px #888888;margin-top: 20px;">
        <div>
          <br>
          <br>
          <b-row style="margin: 10px;">
            <b-col>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">ตั้งแต่วันที่</div>
              <b-form-datepicker style="width: 100%;" id="example-datepickerinstuctor" v-model="datewelfarefrom"
                class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col>
              <div style="font-size: 20px;text-align: left;margin-left: 10px;">ถึงวันที่</div>
              <b-form-datepicker style="width: 100%;" id="example-datepickerinstuctor2" v-model="datewelfareto"
                class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col>
              <div style="text-align: left;margin-top: 30px;">
                <b-button @click="welfareGetdata" variant="outline-primary">Master Data</b-button>
              </div>
            </b-col>
          </b-row>
        </div>
        <br>
        <br>
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
      jsonData: null,
      jsondata2: null,
      jsonArray: [],
      excelarray: [],
      jsonDataWelfare: null,
      jsondata2Welfare: null,
      jsonArrayWelfare: [],
      jsonArrayWelfare2: [],
      excelarraywelfare: [],
      excelarrayinstructor: [],
      jsondataTnos: null,
      jsondataTnos2: null,
      jsondataTnos3: null,
      jsondataTnos4: null,
      jsondataTnos5: null,
      jsonArrayTnos: [],
      excelarrayTnos: [],
      jsonDataInstructor: null,
      jsonDataInstructor2: null,
      jsondataHoliday: null,
      jsonArrayHoliday: [],
      excelarrayHoliday: [],
      testdata: '',
      notoSansThaiFont: null,
      exportexcelarraywelfare: [],
      datetnosfrom: '',
      datetnosto: '',
      datewelfarefrom: '',
      datewelfareto: '',
      dateinstuctorfrom: '',
      dateinstuctorto: '',
      alertStatus: 0,
      alertStatus2: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      showStatus: '',
      showWelfareDup: '',
      showHoliday: '',
      showInstructorDup: '',
      showtnosDup: '',
      deleteWelfare: [],
      deleteInstrutor: [],
      deleteTnos: [],
      deleteHoliday: [],
      itemWelfaredup: '',
      selectOption: null,
      selectOptionwelfare: null,
      selectOptionInstructor: null,
      selectOptionHoliday: null
    };
  },
  async mounted() {
    // axios.get('http://localhost:4000//selectdeletetnos').then({

    // })
    await axios.get('http://localhost:4000/selectdeletetnos')
      .then(response => {
        this.deleteTnos = Object.values(response.data.result)
        // console.log('dadas', this.deleteTnos)
        this.deleteTnos = this.deleteTnos.map((data, i) => {
          return {
            value: data.create_time,
            text: data.create_time
          }
        })
        let nulls = {
          value: null,
          text: 'กรุณาเลือกช่วงเวลา'
        }
        this.deleteTnos.push(nulls)
        // console.log('dadas22', this.deleteTnos)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    await axios.get('http://localhost:4000/selectdeletewelfare')
      .then(response => {
        this.deleteWelfare = Object.values(response.data.result)
        // console.log('dadas', this.deleteWelfare)
        this.deleteWelfare = this.deleteWelfare.map((data, i) => {
          return {
            value: data.create_time,
            text: data.create_time
          }
        })
        let nulls = {
          value: null,
          text: 'กรุณาเลือกช่วงเวลา'
        }
        this.deleteWelfare.push(nulls)
        // console.log('dadas22', this.deleteWelfare)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    await axios.get('http://localhost:4000/selectdeleteinstructor')
      .then(response => {
        this.deleteInstrutor = Object.values(response.data.result)
        // console.log('dadas', this.deleteInstrutor)
        this.deleteInstrutor = this.deleteInstrutor.map((data, i) => {
          return {
            value: data.create_time,
            text: data.create_time
          }
        })
        let nulls = {
          value: null,
          text: 'กรุณาเลือกช่วงเวลา'
        }
        this.deleteInstrutor.push(nulls)
        // console.log('dadas22', this.deleteInstrutor)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    await axios.get('http://localhost:4000/selectdeleteholiday')
      .then(response => {
        this.deleteHoliday = Object.values(response.data.result)
        // console.log('dadas', this.deleteHoliday)
        this.deleteHoliday = this.deleteHoliday.map((data, i) => {
          return {
            value: data.create_time,
            text: data.create_time
          }
        })
        let nulls = {
          value: null,
          text: 'กรุณาเลือกช่วงเวลา'
        }
        this.deleteHoliday.push(nulls)
        // console.log('dadas22', this.deleteInstrutor)
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  },
  methods: {
    tnosdelete() {
      // console.log('testSelecyt', this.selectOption)
      let select = {
        create_time: this.selectOption,
      }
      axios.post('http://localhost:4000/deletetnos', select)
        .then(response => {
          // console.log('delete done', response)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
        });
    },
    Instructordelete() {
      // console.log('testSelecyt', this.selectOptionInstructor)
      let select = {
        create_time: this.selectOptionInstructor,
      }
      axios.post('http://localhost:4000/deleteinstructor', select)
        .then(response => {
          // console.log('delete done', response)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
        });
    },
    Welfaredelete() {
      // console.log('testSelecyt', this.selectOptionwelfare)
      let select = {
        create_time: this.selectOptionwelfare,
      }
      axios.post('http://localhost:4000/deletewelfare', select)
        .then(response => {
          // console.log('delete done', response)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
        });
    },
    Holidaydelete() {
      // console.log('testSelecyt', this.selectOptionwelfare)
      let select = {
        create_time: this.selectOptionHoliday,
      }
      axios.post('http://localhost:4000/deleteholiday', select)
        .then(response => {
          // console.log('delete done', response)
          this.alertStatus2 = 1
          this.dismissCountDown = this.dismissSecs
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          this.alertStatus2 = 3
          this.dismissCountDown = this.dismissSecs
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    handleFileChangetest(event) {
      console.log('personal')
      const file = event.target.files[0];

      if (file) {
        this.readExceltest(file);
      }
    },
    async readExceltest(file) {
      // console.log('KUY')
      const reader = new FileReader();

      reader.onload = (e) => {
        // console.log('KUY2')
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonData = JSON.stringify(jsonData, null, 2);
        this.jsonData = JSON.parse(this.jsonData)
        this.jsonData.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ', this.jsonData)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        // console.log('JSONTYPEOF: ', typeof (this.jsonData))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobject = {}
        let jsonobject2 = this.jsonData
        jsonobject = jsonobject2.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMap = jsonobject.map((data, i) => {
          return {
            empCode: data.item1,
            name: data.item2,
            bankaccount: data.item3
          }
        })
        this.jsondata2 = jsonMap
        // console.log('resdataExcel', this.jsondata2);
        // console.log('Aftermap', this.jsondata2)
        axios.get('http://localhost:4000/personals')
          .then(response => {
            // console.log('resdata', response.data.result);
            let dataexcel = response.data.result
            let jsonMaps = dataexcel.map((data, i) => {
              return {
                empCode: data.emp_code,
                name: data.name,
                bankaccount: data.bank_account_number
              }
            })
            // console.log('resdataaxios', jsonMaps);
            this.excelarray = Object.values(jsonMaps);
            const comparedataPersonal = this.jsondata2.filter(obj1 =>
              !this.excelarray.some(obj2 => obj1.empCode === obj2.empCode)
            );
            // console.log('comparedata1', this.excelarray);
            // console.log('comparedata2', this.jsondata2);
            // let comparedataPersonal = Array.from(uniqueData.values());
            // const mergedArray = [...this.jsondata2, ...this.excelarray];
            // comparedataPersonal = Array.from(uniqueData.values());
            // console.log('comparedataPersonal', comparedataPersonal);
            if (comparedataPersonal.length === 0) {
              // console.log('comparedataNull', comparedataPersonal);
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
              this.showStatus = ' Personal Data '
              // axios.post('http://localhost:4000/personal', this.jsondata2)
              //   .then(response => {
              //     console.log(response.data);
              //   })
              //   .catch(error => {
              //     console.error('Error fetching data:', error.message);
              //   });
            } else if (comparedataPersonal.length !== 0) {
              // console.log('comparedataNotNull');
              axios.post('http://localhost:4000/personal', comparedataPersonal)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Personal Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Personal Data '
                });
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      };
      // var data1 = [{ data: '1', data2: '1' }, { data: '2', data2: '3' }, { data: '3', data2: '4' }];
      // var data2 = [{ data: '1', data2: '1' }, { data: '2', data2: '3' }, { data: '3', data2: '3' }, { data: '4', data2: '5' }];

      reader.readAsBinaryString(file);
      // var uniqueData = new Map();
      // function addUnique(dataArray) {
      //   dataArray.forEach(obj => {
      //     var key = `${obj.data}-${obj.data2}`;
      //     if (!uniqueData.has(key)) {
      //       uniqueData.set(key, obj);
      //     }
      //   });

      // }

    },
    async addUnique(dataArray) {
      var uniqueData = new Map();
      await dataArray.forEach(obj => {
        var key = `${obj.data}-${obj.data2}`;
        if (!uniqueData.has(key)) {
          uniqueData.set(key, obj);
        }
      });

    },
    testPDF() {

      var data1 = [{ data: '1', data2: '1' }, { data: '2', data2: '3' }, { data: '3', data2: '4' }];
      var data2 = [{ data: '1', data2: '1' }, { data: '2', data2: '3' }, { data: '3', data2: '3' }, { data: '4', data2: '5' }];

      // Create a new map to store unique objects
      var uniqueData = new Map();

      // Function to add objects to the map if they don't exist
      function addUnique(dataArray) {
        dataArray.forEach(obj => {
          var key = `${obj.data}-${obj.data2}`;
          if (!uniqueData.has(key)) {
            uniqueData.set(key, obj);
          }
        });
      }

      // Add objects from data1 and data2 to the map
      addUnique(data1);
      addUnique(data2);

      // Convert the map values back to an array
      data1 = Array.from(uniqueData.values());

      console.log(data1);
    },
    PersonalSendData() {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      axios.get('http://localhost:4000/personals')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          let jsonMaps = dataexcel.map((data, i) => {
            return {
              "Emp. Code": data.emp_code,
              "Name - Surname": data.name,
              "Bank account number": data.bank_account_number
            }
          })
          // console.log('resdataExcel', jsonMaps);
          this.excelarray = Object.values(jsonMaps);
          // console.log('JSONTYPEOF2Aftermap23', this.excelarray)

          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'exported_data.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async MasterSendData() {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
        from: this.datetnosfrom,
        to: this.datetnosto
      }
      await axios.post('http://localhost:4000/masterdata', from_to)
        .then(response => {
          // console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel)
          // console.log('JSONTYPEOF2Aftermap23', this.excelarray)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async instructorGetData() {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
        from: this.dateinstuctorfrom,
        to: this.dateinstuctorto
      }
      await axios.post('http://localhost:4000/instructorgetdata', from_to)
        .then(response => {
          // console.log('resdata', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayinstructor = Object.values(dataexcel)
          // console.log('JSONTYPEOF2Aftermap23', this.excelarrayinstructor)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    async welfareGetdata() {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      let from_to = {
        from: this.datewelfarefrom,
        to: this.datewelfareto
      }
      console.log('resdata', from_to);
      await axios.post('http://localhost:4000/masterdata', from_to)
        .then(response => {
          // console.log('resdatatnos', response.data.result);
          let dataexcel = response.data.result
          this.excelarray = Object.values(dataexcel)
          // console.log('JSONTYPEOF2Aftermap23', this.excelarray)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/holidaygetdata', from_to)
        .then(response => {
          // console.log('resdatainstructor', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayHoliday = Object.values(dataexcel)
          console.log('JOT', this.excelarrayHoliday)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/instructorgetdata', from_to)
        .then(response => {
          // console.log('resdatainstructor', response.data.result);
          let dataexcel = response.data.result
          this.excelarrayinstructor = Object.values(dataexcel)
          // console.log('JSONTYPEOF2Aftermap23', this.excelarrayinstructor)
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
      await axios.post('http://localhost:4000/welfaregetdata', from_to)
        .then(response => {
          // console.log('resdatawelfare', response.data.result);
          let dataexcel = response.data.result
          this.excelarraywelfare = Object.values(dataexcel);
          // this.excelarraywelfare = dataexcel
          // console.log('JSONTYPEOFwelfare', this.excelarray.length)
          // console.log('combinedata1', this.excelarray[0].tlep_driver_name)
          // console.log('combineArrayExport', combineArray)
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
              // BB: object1[i].BB || '',
              // CC: object2[i].AC || object1[i].CC || ''
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
              // BB: object1[i].BB || '',
              // CC: object2[i].AC || object1[i].CC || ''
            };
            combinedArray.push(combinedObject);
          }
          // console.log('combinedObject', combinedArray)
          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(combinedArray);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'exported_Master_data.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    handleFileChange(event) {
      console.log('UnWelfare')
      const file = event.target.files[0];

      if (file) {
        this.readExcel(file);
      }
    },
    readExcel(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonData = JSON.stringify(jsonData, null, 2);
        this.jsonData = JSON.parse(this.jsonData)
        this.jsonData.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ', this.jsonData)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        // console.log('JSONTYPEOF: ', typeof (this.jsonData))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobject = {}
        let jsonobject2 = this.jsonData
        jsonobject = jsonobject2.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMap = jsonobject.map((data, i) => {
          return {
            empCode: data.item1,
            name: data.item2,
            bankaccount: data.item3
          }
        })
        // console.log('Aftermap', jsonobject)
        // console.log('Aftermap2', jsonMap)
        // console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobject))
        this.jsondata2 = jsonMap
        axios.post('http://localhost:4000/personal', this.jsondata2)
          .then(response => {
            // console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      };

      reader.readAsBinaryString(file);
    },
    exportToExcel() {
      // console.log('JSONTYPEOF2Aftermap2', this.jsondata2[1])
      this.jsonArray = Object.values(this.jsondata2);
      // console.log('JSONTYPEOF2Aftermap23', this.jsonArray)

      //export to excell
      const workbook = XLSX.utils.book_new();

      // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.jsonArray);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Save the workbook to a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');
    },
    WelfareSendData() {
      this.testdata = {
        emp_code: '12345',
        name: 'NAMAMAMAM',
        bank_account_number: '12344566'
      }
      axios.get('http://localhost:4000/personals')
        .then(response => {
          // console.log('resdata', response.data.result);
          let dataexcelWelfare = response.data.result
          let jsonMapsWelfare = dataexcelWelfare.map((data, i) => {
            return {
              "Emp. Code": data.emp_code,
              "Name - Surname": data.name,
              "Bank account number": data.bank_account_number
            }
          })
          // console.log('resdataExcel', jsonMapsWelfare);
          this.excelarray = Object.values(jsonMapsWelfare);
          // console.log('JSONTYPEOF2Aftermap23', this.excelarrayWelfare)

          //export to excell
          const workbook = XLSX.utils.book_new();

          // Convert the JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(this.excelarrayWelfare);

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'MasterData');

          // Save the workbook to a file
          XLSX.writeFile(workbook, 'exported_data.xlsx');
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    },
    handleFileChangeWelfare(event) {
      console.log('Welfare')
      const file = event.target.files[0];

      if (file) {
        this.readExcelWelfare(file);
      }
    },
    readExcelWelfare(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonDataWelfare = JSON.stringify(jsonData, null, 2);
        this.jsonDataWelfare = JSON.parse(this.jsonDataWelfare)
        this.jsonDataWelfare.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ', this.jsonDataWelfare)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        // console.log('JSONTYPEOF: ', typeof (this.jsonDataWelfare))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectWelfare = {}
        let jsonobject2Welfare = this.jsonDataWelfare
        jsonobjectWelfare = jsonobject2Welfare.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let jsonMapWelfare = jsonobjectWelfare.map((data, i) => {
          return {
            TRIP_NO: data.item1,
            TRIP_ALLOWANCE: data.item2,
            TOTAL_ALLOWANCE: data.item3,
            OT_HOURS: data.item4,
            DEPARTURE_POINT: data.item5,
            DEPARTURE_DATETIME: data.item6,
            YARDOUTDATE: data.item7,
            DRIVER1: data.item8,
            NAME: data.item9,
            DRIVER2: data.item10,
            NULLS: data.item11,
            DEALER1: data.item12,
            DEALER2: data.item13,
            DEALER3: data.item14,
            DEALER4: data.item15,
            DEALER5: data.item16,
            UNITS1: data.item17,
            UNITS2: data.item18,
            UNITS3: data.item19,
            UNITS4: data.item20,
            UNITS5: data.item21,
            TAX_FLAG: data.item22,
            create_time: new Date().toLocaleString()

          }
        })
        jsonMapWelfare = jsonMapWelfare.filter((i) => {
          return i.TRIP_NO !== 'SUM' && i.TRIP_NO !== undefined
        })
        this.jsondata2Welfare = jsonMapWelfare
        // console.log('jsonobjectWelfare', this.jsondata2Welfare)
        axios.get('http://localhost:4000/getcomparedata1',).then(response => {
          let compare = response.data.result
          this.excelarray = Object.values(compare)
          // console.log('JSONTYPEOF2Aftermap23', this.jsondata2Welfare[1].TRIP_NO)
          // console.log('LENG1', this.excelarray.length)
          let dup = this.jsondata2Welfare.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
          console.log('IsDuplicate', dup)
          if (dup.length > 0) {
            this.showWelfareDup = dup
            this.$root.$emit("bv::show::modal", "modal-welfare");
          }
          if (this.excelarray.length > this.jsondata2Welfare.length) {
            const Notdup = this.jsondata2Welfare.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateIF', Notdup)

            if (Notdup.length > 0) {
              // console.log('InsertNotduplIF', Notdup)
              // console.log('InsertNotduplIFWelfare', this.jsondata2Welfare)
              this.jsondata2Welfare = Notdup
              axios.post('http://localhost:4000/welfare', this.jsondata2Welfare)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Welfare Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Welfare Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          } else {
            // let Notdup = this.jsondata2Welfare.filter(a => !this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            // let dup = this.jsondata2Welfare.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            const Notdup = this.jsondata2Welfare.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateelse', Notdup)
            if (Notdup.length > 0) {
              // console.log('InsertNotduplElse', Notdup)
              // console.log('InsertNotduplElseWelfare', this.jsondata2Welfare)
              // console.log('InsertNotdupl', Notdup)
              this.jsondata2Welfare = Notdup
              axios.post('http://localhost:4000/welfare', this.jsondata2Welfare)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Welfare Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Welfare Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          }
        }).catch(error => {
          console.error('Error fetching data:', error.message)
        })
        // this.jsondata2Welfare2 = jsonMapWelfare2
        // axios.post('http://localhost:4000/welfare', this.jsondata2Welfare)
        //   .then(response => {
        //     console.log(response.data);
        //     this.alertStatus = 1
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Welfare Data '
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //     this.alertStatus = 3
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Welfare Data '
        //   });
        // axios.post('http://localhost:4000/welfare2', this.jsondata2Welfare2)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //   });
      };

      reader.readAsBinaryString(file);
    },
    handleFileChangeHoliday(event) {
      console.log('Holiday')
      const file = event.target.files[0];

      if (file) {
        this.readExcelHoliday(file);
      }
    },
    readExcelHoliday(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsondataHoliday = JSON.stringify(jsonData, null, 2);
        this.jsondataHoliday = JSON.parse(this.jsondataHoliday)
        this.jsondataHoliday.shift()
        let jsonobjectHoliday = {}
        let jsonobject2Holiday = this.jsondataHoliday
        jsonobjectHoliday = jsonobject2Holiday.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        console.log('item', jsonobjectHoliday)
        let jsonMapHoliday = jsonobjectHoliday.map((data, i) => {
          return {
            TRIP_NO: data.item1,
            TRIP_ALLOWANCE: data.item2,
            TOTAL_ALLOWANCE: data.item3,
            OT_HOURS: data.item4,
            DEPARTURE_POINT: data.item5,
            DEPARTURE_DATETIME: data.item6,
            YARDOUTDATE: data.item7,
            DRIVER1: data.item8,
            NAME: null,
            DRIVER2: null,
            NULLS: data.item11,
            DEALER1: data.item10,
            DEALER2: data.item13,
            DEALER3: data.item14,
            DEALER4: data.item15,
            DEALER5: data.item16,
            UNITS1: data.item17,
            UNITS2: data.item18,
            UNITS3: data.item19,
            UNITS4: null,
            UNITS5: data.item21,
            TAX_FLAG: data.item20,
            create_time: new Date().toLocaleString()

          }
        })
        // console.log('item', jsonMapHoliday)
        jsonMapHoliday = jsonMapHoliday.filter((i) => {
          return i.TRIP_NO !== 'SUM' && i.TRIP_NO !== undefined
        })
        this.jsondata2Holiday = jsonMapHoliday
        // console.log('jsonobjectHoliday', this.jsondata2Holiday)
        axios.get('http://localhost:4000/getcomparedata4',).then(response => {
          let compare = response.data.result
          this.excelarray = Object.values(compare)
          // console.log('JSONTYPEOF2Aftermap23', this.jsondata2Holiday[1].TRIP_NO)
          // console.log('LENG1', this.excelarray.length)
          let dup = this.jsondata2Holiday.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
          console.log('IsDuplicate', dup)
          if (dup.length > 0) {
            this.showHoliday = dup
            this.$root.$emit("bv::show::modal", "modal-Holiday");
          }
          if (this.excelarray.length > this.jsondata2Holiday.length) {
            const Notdup = this.jsondata2Holiday.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateIF', Notdup)

            if (Notdup.length > 0) {
              // console.log('InsertNotduplIF', Notdup)
              console.log('InsertNotduplIFHoliday', Notdup)
              this.jsondata2Holiday = Notdup
              axios.post('http://localhost:4000/holiday', this.jsondata2Holiday)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Holiday Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Holiday Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          } else {
            // let Notdup = this.jsondata2Holiday.filter(a => !this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            // let dup = this.jsondata2Holiday.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            const Notdup = this.jsondata2Holiday.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateelse', Notdup)
            if (Notdup.length > 0) {
              // console.log('InsertNotduplElse', Notdup)
              // console.log('InsertNotduplElseHoliday', this.jsondata2Holiday)
              console.log('InsertNotdupl', Notdup)
              this.jsondata2Holiday = Notdup
              axios.post('http://localhost:4000/holiday', this.jsondata2Holiday)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Holiday Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Holiday Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          }
        }).catch(error => {
          console.error('Error fetching data:', error.message)
        })
        // this.jsondata2Welfare2 = jsonMapWelfare2
        // axios.post('http://localhost:4000/welfare', this.jsondata2Welfare)
        //   .then(response => {
        //     console.log(response.data);
        //     this.alertStatus = 1
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Welfare Data '
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //     this.alertStatus = 3
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Welfare Data '
        //   });
        // axios.post('http://localhost:4000/welfare2', this.jsondata2Welfare2)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //   });
      };

      reader.readAsBinaryString(file);
    },
    exportToExcelWelfare() {
      // console.log('JSONTYPEOF2Aftermap2', this.jsondata2Welfare[1])
      this.jsonArrayWelfare = Object.values(this.jsondata2Welfare);
      // console.log('JSONTYPEOF2Aftermap23', this.jsonArrayWelfare)

      //export to excell
      const workbook = XLSX.utils.book_new();

      // Convert the JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.jsonArrayWelfare);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Save the workbook to a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');
    },
    handleFileChangeTnos(event) {
      console.log('tnos')
      const file = event.target.files[0];

      if (file) {
        this.readExcelTnos(file);
      }
    },
    async readExcelTnos(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonDataTnos = JSON.stringify(jsonData, null, 2);
        this.jsonDataTnos = JSON.parse(this.jsonDataTnos)
        this.jsonDataTnos.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ',  this.jsonDataTnos)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        // console.log('JSONTYPEOF: ', typeof (this.jsonDataTnos))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectTnos = {}
        let jsonobject2Tnos = this.jsonDataTnos
        jsonobjectTnos = jsonobject2Tnos.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        jsonobjectTnos = jsonobjectTnos.filter((i) => {
          return i.item1 !== null && i.item1 !== undefined
        })
        console.log('JSONTYPEOF2: ',  jsonobjectTnos)
        const convertDate = (date) => {
          console.log('splitdata', data)
          let parts = date.split("/");
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        let jsonMapTnos5 = jsonobjectTnos.map((data, i) => {
          return {
            Working_date: convertDate(data.item1),
            job_code: data.item2,
            shift: data.item3,
            trip_no: data.item4,
            ttt_employee_code: data.item5,
            tlep_driver_code: data.item6,
            tlep_driver_name: data.item7,
            company_code: data.item8,
            company_name: data.item9,
            trailer_code: data.item10,
            trailer_type_code: data.item11,
            trailer_type: data.item12,
            ttt_payment_status: data.item13,
            calling_sheet_no: data.item14,
            trip_type: data.item15,
            recieve_job_dateandtime: data.item16,
            from_code: data.item17,
            from_name: data.item18,
            yard_out_dateandtime: data.item19,
            to_code: data.item20,
            to_name: data.item21,
            to_in_dateandtime: data.item22,
            reture_code: data.item23,
            return_name: data.item24,
            return_in_dateandtime: data.item25,
            loading_units: data.item26,
            loading_count: data.item27,
            unloading_count: data.item28,
            number_of_driver: data.item29,
            nd2_employee_code: data.item30,
            nd2_tlep_driver_code: data.item31,
            nd2_tlep_driver_name: data.item32,
            mileage: data.item33,
            allowance: data.item34,
            allowance2: data.item35,
            allowance3: data.item36,
            allowance4: data.item37,
            total_allowance: data.item38,
            standard_ot: data.item39,
            over_ot: data.item40,
            total_ot: data.item41,
            payment_status: data.item42,
            ot_payment_date: data.item43,
            allowance_payment_date: data.item44,
            create_time: new Date().toLocaleString()
          }
        })
        // console.log('jsonobjectTnos', jsonobjectTnos)
        // console.log('Aftermap25', jsonMapTnos5)        
        // console.log('AftermapjsonMapTnos5', jsonMapTnos5)
        this.jsondata2Tnos5 = jsonMapTnos5
        axios.get('http://localhost:4000/getcomparedata2',).then(response => {
          let compare = response.data.result
          this.excelarray = Object.values(compare)

          // console.log('JSONTYPEOF2Aftermap23', this.jsondata2Welfare[1].TRIP_NO)
          // console.log('LENG1', this.excelarray)
          // console.log('LENG2',this.jsondata2Tnos5)
          let dup = this.jsondata2Tnos5.filter(({ ttt_employee_code: ids1, calling_sheet_no: id1 }) => this.excelarray.some(({ ttt_employee_code: ids2, calling_sheet_no: id2 }) => {
            // console.log('ID1', id2, id1)
            // console.log('IDS2', ids2, ids1)
            return id2 === id1 && ids2 === ids1
          }))
          // this.jsondata2Tnos5.filter(({ calling_sheet_no: id1, ttt_employee_code: ids1 }) => this.excelarray.some(({ calling_sheet_no: id2, ttt_employee_code: ids2 }) => id2 === id1 && ids2 === ids1))
          console.log('IsDuplicate', dup)
          if (dup.length > 0) {
            this.showtnosDup = dup
            this.$root.$emit("bv::show::modal", "modal-tnos");
          }
          if (this.excelarray.length > this.jsondata2Tnos5.length) {
            const Notdup = this.jsondata2Tnos5.filter(({ ttt_employee_code: ids1, calling_sheet_no: id1 }) => !this.excelarray.some(({ ttt_employee_code: ids2, calling_sheet_no: id2 }) => id2 === id1 && ids2 === ids1));
            console.log('NotduplicateIF', Notdup)

            if (Notdup.length > 0) {
              console.log('NotduplicateIF', Notdup)
              // console.log('InsertNotduplIF', Notdup)
              // console.log('InsertNotduplIFWelfare', this.jsondata2Tnos5)
              this.jsondata2Tnos5 = Notdup
              axios.post('http://localhost:4000/tnos5', this.jsondata2Tnos5)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Tnos Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Tnos Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          } else {
            // let Notdup = this.jsondata2Tnos5.filter(a => !this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            // let dup = this.jsondata2Tnos5.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            const Notdup = this.jsondata2Tnos5.filter(({ ttt_employee_code: ids1, calling_sheet_no: id1 }) => !this.excelarray.some(({ ttt_employee_code: ids2, calling_sheet_no: id2 }) => id2 === id1 && ids2 === ids1));
            console.log('Notduplicateelse', Notdup)
            if (Notdup.length > 0) {
              // console.log('InsertNotduplElse', Notdup)
              // console.log('InsertNotduplElseTnos', this.jsondata2Tnos5)
              // console.log('InsertNotdupl', Notdup)
              // console.log('NotduplicateElse', Notdup)
              this.jsondata2Tnos5 = Notdup
              axios.post('http://localhost:4000/tnos5', this.jsondata2Tnos5)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Tnos Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' Tnos Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          }
        }).catch(error => {
          console.error('Error fetching data:', error.message)
        })
        // axios.post('http://localhost:4000/tnos5', this.jsondata2Tnos5)
        //   .then(response => {
        //     console.log(response.data);
        //     this.alertStatus = 1
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' TNOS Data '
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //     this.alertStatus = 3
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' TNOS Data '
        //   });
      };

      reader.readAsBinaryString(file);
    },
    handleFileChangeInstructor(event) {
      console.log('Instructor')
      const file = event.target.files[0];

      if (file) {
        this.readExcelInstructor(file);
      }
    },
    readExcelInstructor(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assume the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Set the JSON data to be displayed in the component
        this.jsonDataInstructor = JSON.stringify(jsonData, null, 2);
        this.jsonDataInstructor = JSON.parse(this.jsonDataInstructor)
        this.jsonDataInstructor.shift()
        // console.log('mapdata1: ', this.jsonData)
        // console.log('JSONLenght: ', this.jsonDataInstructor)
        // console.log('JSONLenghtSHIFT: ',  JSON.parse(this.jsonData).shift())
        // console.log('JSONTYPEOF: ', typeof (this.jsonDataInstructor))
        // console.log('JSONTYPEOF2: ',  typeof(JSON.parse(this.jsonData)))
        let jsonobjectInstructor = {}
        let jsonobject2Instructor = this.jsonDataInstructor
        jsonobjectInstructor = jsonobject2Instructor.map(innerarray => {
          return innerarray.reduce((acc, item, index) => {
            acc[`item${index + 1}`] = item;
            return acc
          }, {})
        })
        let days = 45344;
        let epoch = new Date('1900-01-01');
        epoch.setDate(epoch.getDate() + days);
        let formattedDate = epoch.toISOString().slice(0, 10);
        console.log(formattedDate);
        let jsonMapInstructor = jsonobjectInstructor.map((data, i) => {
          return {
            number: data.item1,
            TRIP_NO: data.item2,
            TRIP_ALLOWANCE: data.item3,
            TOTAL_ALLOWANCE: data.item4,
            NULL1: data.item5,
            NULL2: data.item6,
            DEPARTURE_DATETIME: data.item7,
            YARDOUTDATE: data.item8,
            DRIVER1: data.item9,
            NAME: data.item10,
            NULL3: data.item11,
            NULL4: data.item12,
            DEALER1: data.item13,
            DEALER2: data.item14,
            DEALER3: data.item15,
            DEALER4: data.item16,
            DEALER5: data.item17,
            UNITS1: data.item18,
            UNITS2: data.item19,
            UNITS3: data.item20,
            UNITS4: data.item21,
            UNITS5: data.item22,
            TAX_FLAG: data.item23,
            create_time: new Date().toLocaleString()
          }
        })
        jsonMapInstructor = jsonMapInstructor.filter((i) => {
          return i.number !== null && i.number !== undefined
        })
        console.log('jsonobjectInstructor', jsonMapInstructor)
        // console.log('Aftermap2jsonMapInstructor', jsonMapInstructor)
        // console.log('Aftermap22', jsonMapInstructor2)
        // console.log('JSONTYPEOF2Aftermap: ', typeof (jsonobjectInstructor))
        this.jsondata2Instructor = jsonMapInstructor
        axios.get('http://localhost:4000/getcomparedata3',).then(response => {
          let compare = response.data.result
          this.excelarray = Object.values(compare)
          // console.log('JSONTYPEOF2Aftermap23', this.jsondata2Welfare[1].TRIP_NO)
          console.log('LENG1', this.excelarray)
          // console.log('LENG2', this.jsondata2Instructor)
          let dup = this.jsondata2Instructor.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
          // console.log('IsDuplicate', dup)
          if (dup.length > 0) {
            this.showInstructorDup = dup
            this.$root.$emit("bv::show::modal", "modal-instructor");
          }
          if (this.excelarray.length > this.jsondata2Instructor.length) {
            const Notdup = this.jsondata2Instructor.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateIF', Notdup)

            if (Notdup.length > 0) {
              // console.log('InsertNotduplIF', Notdup)
              // console.log('InsertNotduplIFWelfare', this.jsondata2Instructor)
              this.jsondata2Instructor = Notdup
              axios.post('http://localhost:4000/instructor', this.jsondata2Instructor)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' instructor Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' instructor Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          } else {
            // let Notdup = this.jsondata2Instructor.filter(a => !this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            // let dup = this.jsondata2Instructor.filter(a => this.excelarray.some(b => a.TRIP_NO === b.TRIP_NO))
            const Notdup = this.jsondata2Instructor.filter(({ TRIP_NO: id1 }) => !this.excelarray.some(({ TRIP_NO: id2 }) => id2 === id1));
            // console.log('duplicateelse', Notdup)
            if (Notdup.length > 0) {
              // console.log('InsertNotduplElse', Notdup)
              // console.log('InsertNotduplElseinstructor', this.jsondata2Instructor)
              console.log('InsertNotdupl', Notdup)
              this.jsondata2Instructor = Notdup
              axios.post('http://localhost:4000/instructor', this.jsondata2Instructor)
                .then(response => {
                  console.log(response.data);
                  this.alertStatus = 1
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' instructor Data '
                })
                .catch(error => {
                  console.error('Error fetching data:', error.message);
                  this.alertStatus = 3
                  this.dismissCountDown = this.dismissSecs
                  this.showStatus = ' instructor Data '
                });
            } else {
              this.alertStatus = 2
              this.dismissCountDown = this.dismissSecs
            }
          }
        }).catch(error => {
          console.error('Error fetching data:', error.message)
        })
        // this.jsondata2Instructor2 = jsonMapInstructor2
        // axios.post('http://localhost:4000/instructor', this.jsondata2Instructor)
        //   .then(response => {
        //     console.log(response.data);
        //     this.alertStatus = 1
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Instructor Data '
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //     this.alertStatus = 3
        //     this.dismissCountDown = this.dismissSecs
        //     this.showStatus = ' Instructor Data '
        //   });
        // axios.post('http://localhost:4000/instructor2', this.jsondata2Instructor2)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error.message);
        //   });
      };

      reader.readAsBinaryString(file);
    },

  },
};
</script>
