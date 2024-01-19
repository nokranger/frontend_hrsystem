<template>
  <div>
    <button @click="getAttach7">Attached 7</button>
    <br>
    <br>
    <div>
      <div>EMPCODE: 641610</div>
      <button @click="getAttach8">Attached 8</button>
    </div>
    <br>
    <br>
    <button @click="getAttach9">Attached 9</button>
    <br>
    <br>
    <div>
      <div>EMPCODE: 043331</div>
      <button @click="getAttach10">Attached 10</button>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
export default {
  data () {
    return {
      excelarray: []
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
    getAttach8 () {
      axios.get('http://localhost:4000/getdataattach8')
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
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached8');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached8.xlsx');
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
            XLSX.utils.book_append_sheet(workbook, worksheet, 'attached10');

            // Save the workbook to a file
            XLSX.writeFile(workbook, 'attached10.xlsx');
            })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    }
  }
}
</script>