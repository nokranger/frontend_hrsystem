<template>
  <div>
    <b-container>
      <div>
        <h1 style="text-shadow: 2px 2px 5px black;">Attached</h1>
      </div>
      <div style="border: 2px solid gray;border-radius: 10px;height: 120px;">
        <span  style="display: inline;">
          <b-button variant="outline-primary" @click="getAttach7all" style="margin: 40px;">Attached 7</b-button>
          <b-button variant="outline-success" @click="getAttach8" style="margin: 40px;">Attached 8</b-button>
          <b-button variant="outline-danger" @click="getAttach9all" style="margin: 40px;">Attached 9</b-button>
          <b-button variant="outline-warning" @click="getAttach10" style="margin: 40px;">Attached 10</b-button>
        </span>
      </div>
    </b-container>
    <!-- <span style="display: inline;">
      <b-button @click="getAttach7" style="margin: 10px;">Attached 7</b-button>
      <b-button @click="getAttach7all" style="margin: 10px;">Attached 7 All</b-button>
      <br>
      <br>
    </span>
    <div>
      <span  style="display: inline;">
        <b-button @click="getAttach8" style="margin: 10px;">Attached 8</b-button>
        <b-button @click="getAttach8" style="margin: 10px;">Attached 8</b-button>
      </span> -->
      <!-- <div>EMPCODE: 641610</div> -->
    <!-- </div>
    <br>
    <br>
    <div>
      <span style="display: inline;">
        <b-button @click="getAttach9" style="margin: 10px;">Attached 9</b-button>
        <b-button @click="getAttach9all" style="margin: 10px;">Attached 9 All</b-button>
      </span>
    </div>
    <br>
    <br>
    <div>
      <span style="display: inline;">
        <b-button @click="getAttach10" style="margin: 10px;">Attached 10</b-button>
        <b-button @click="getAttach10" style="margin: 10px;">Attached 10</b-button>
      </span> -->
      <!-- <div>EMPCODE: 043331</div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
export default {
  data () {
    return {
      excelarray: [],
      excelarrayattach7: [],
      excelarrayattach72: [],
      excelarrayattach73: [],
      excelarrayattach9: [],
      excelarrayattach92: [],
      excelarrayattach93: []
    }
  },
  methods: {
    getAttach7 () {
      axios.get('http://localhost:4000/getdataattach7')
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
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached7');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached7.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    async getAttach7all () {
      await axios.get('http://localhost:4000/getdataattach7')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach7 = Object.values(dataexcel);
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
      await axios.get('http://localhost:4000/getdataattach72')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach72 = Object.values(dataexcel);
            console.log('JSONTYPEOFwelfare', this.excelarray.length)
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
      await axios.get('http://localhost:4000/getdataattach73')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach73 = Object.values(dataexcel);
            // this.excelarraywelfare = dataexcel
            // console.log('JSONTYPEOFwelfare', this.excelarray.length)
            const combinedArray = []
            for (let i = 0; i < this.excelarrayattach7.length; i++) {
              const combinedObject = {
                bank_account_number: this.excelarrayattach7[i].bank_account_number || '',
                emp_code: this.excelarrayattach7[i].emp_code || '',
                name: this.excelarrayattach7[i].name || '',
                total_allowance: this.excelarrayattach7[i].total_allowance || '',
              }
              combinedArray.push(combinedObject);
            }
            for (let i = 0; i < this.excelarrayattach72.length; i++) {
              const combinedObject = {
                bank_account_number: this.excelarrayattach72[i].bank_account_number || '',
                emp_code: this.excelarrayattach72[i].emp_code || '',
                name: this.excelarrayattach72[i].name || '',
                total_allowance: this.excelarrayattach72[i].total_allowance || '',
              }
              combinedArray.push(combinedObject);
            }
            for (let i = 0; i < this.excelarrayattach73.length; i++) {
              const combinedObject = {
                bank_account_number: this.excelarrayattach73[i].bank_account_number || '',
                emp_code: this.excelarrayattach73[i].emp_code || '',
                name: this.excelarrayattach73[i].name || '',
                total_allowance: this.excelarrayattach73[i].total_allowance || '',
              }
              combinedArray.push(combinedObject);
            }
            //export to excell
            const workbook = XLSX.utils.book_new();
            
            // Convert the JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(combinedArray);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached7');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached7.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    getAttach8 () {
      axios.get('http://localhost:4000/getdataattach8')
      .then(response => {
        // console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarray = Object.values(dataexcel);
            // this.excelarraywelfare = dataexcel
            console.log('JSONTYPEOFattach8', this.excelarray.length)
            // //export to excell
            // const workbook = XLSX.utils.book_new();
            
            // // Convert the JSON data to a worksheet
            // const worksheet = XLSX.utils.json_to_sheet(this.excelarray);

            // // Add the worksheet to the workbook
            // XLSX.utils.book_append_sheet(workbook, worksheet, 'attached8-641610');

            // // Save the workbook to a file
            // XLSX.writeFile(workbook, 'attached8-641610.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    getAttach9 () {
      axios.get('http://localhost:4000/getdataattach9')
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
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached9');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached9.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    async getAttach9all () {
      await axios.get('http://localhost:4000/getdataattach9')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach9 = Object.values(dataexcel);
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
      await axios.get('http://localhost:4000/getdataattach92')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach92 = Object.values(dataexcel);
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
      await axios.get('http://localhost:4000/getdataattach93')
      .then(response => {
        console.log('resdata', response.data.result);
        let dataexcel = response.data.result
            this.excelarrayattach93 = Object.values(dataexcel);

            const combinedArray = []
            for (let i = 0; i < this.excelarrayattach9.length; i++) {
              const combinedObject = {
                emp_code: this.excelarrayattach9[i].ttt_employee_code || '',
                driver_name: this.excelarrayattach9[i].tlep_driver_name || '',
                total_ot: this.excelarrayattach9[i].total_ot || '',
              }
              combinedArray.push(combinedObject);
            }
            for (let i = 0; i < this.excelarrayattach92.length; i++) {
              const combinedObject = {
                emp_code: this.excelarrayattach92[i].DRIVER1 || '',
                driver_name: this.excelarrayattach92[i].NAME || '',
                total_ot: this.excelarrayattach92[i].OT_HOURS || '',
              }
              combinedArray.push(combinedObject);
            }
            for (let i = 0; i < this.excelarrayattach93.length; i++) {
              const combinedObject = {
                emp_code: this.excelarrayattach93[i].DRIVER1 || '',
                driver_name: this.excelarrayattach93[i].NAME || '',
                total_ot: this.excelarrayattach93[i].OT_HOURS || '',
              }
              combinedArray.push(combinedObject);
            }
            //export to excell
            const workbook = XLSX.utils.book_new();
            
            // Convert the JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(combinedArray);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached9');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached9.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    
    getAttach10 () {
      axios.get('http://localhost:4000/getdataattach10')
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
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached10-043331');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached10-043331.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    },
    getot () {
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
    getallowance () {
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