<template>
    <div>
      <div>
        <div>Payroll OT</div>
        <button @click="getot">Payroll OT</button>
      </div>
      <div>
        <div>Payroll ALLOWANCE</div>
        <button @click="getallowance">Payroll Allowance</button>
      </div>
    </div>
  </template>
  
  <script>
  import * as XLSX from 'xlsx';
  import axios from 'axios';
  export default {
    data () {
      return {
        excelarray: [],
        excelarrayot: [],
        excelarrayot2: [],
        excelarrayot3: [],
        excelarrayallowance: [],
        excelarrayallowance2: [],
        excelarrayallowance3: []
      }
    },
    methods: {
      async getot () {
        await axios.get('http://localhost:4000/getdatapayrollot')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayot = Object.values(dataexcel);
              })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        await axios.get('http://localhost:4000/getdatapayrollot')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayot2 = Object.values(dataexcel);
              })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        await axios.get('http://localhost:4000/getdatapayrollot')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayot3 = Object.values(dataexcel);

              const combinedArray = []
              for (let i = 0; i < this.excelarrayot.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayot[i].EMP_CODE || '',
                  OT: this.excelarrayot[i].OT || '',
                }
                combinedArray.push(combinedObject);
              }
              for (let i = 0; i < this.excelarrayot2.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayot2[i].EMP_CODE || '',
                  OT: this.excelarrayot2[i].OT || '',
                }
                combinedArray.push(combinedObject);
              }
              for (let i = 0; i < this.excelarrayot3.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayot3[i].EMP_CODE || '',
                  OT: this.excelarrayot3[i].OT || '',
                }
                combinedArray.push(combinedObject);
              }
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
      async getallowance () {
        await axios.get('http://localhost:4000/getdatapayrollallowance')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayallowance = Object.values(dataexcel);
              })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        await axios.get('http://localhost:4000/getdatapayrollallowance2')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayallowance2 = Object.values(dataexcel);
              })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
        await axios.get('http://localhost:4000/getdatapayrollallowance3')
        .then(response => {
          console.log('resdata', response.data.result);
          let dataexcel = response.data.result
              this.excelarrayallowance3 = Object.values(dataexcel);

              const combinedArray = []
              for (let i = 0; i < this.excelarrayallowance.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayallowance[i].EMP_CODE || '',
                  ALLOWANCE: this.excelarrayallowance[i].ALLOWANCE || '',
                }
                combinedArray.push(combinedObject);
              }
              for (let i = 0; i < this.excelarrayallowance2.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayallowance2[i].EMP_CODE || '',
                  ALLOWANCE: this.excelarrayallowance2[i].ALLOWANCE || '',
                }
                combinedArray.push(combinedObject);
              }
              for (let i = 0; i < this.excelarrayallowance3.length; i++) {
                const combinedObject = {
                  EMP_CODE: this.excelarrayallowance3[i].EMP_CODE || '',
                  ALLOWANCE: this.excelarrayallowance3[i].ALLOWANCE || '',
                }
                combinedArray.push(combinedObject);
              }
              //export to excell
              const workbook = XLSX.utils.book_new();
              
              // Convert the JSON data to a worksheet
              const worksheet = XLSX.utils.json_to_sheet(combinedArray);
  
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