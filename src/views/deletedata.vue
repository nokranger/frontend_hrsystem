<template>
  <div>
    <nav>
      <router-link to="/dashboard" style="font-size: 20px;">Import & Export</router-link> ||
      <router-link to="/Attached" style="font-size: 20px;">Attached</router-link> ||
      <router-link to="/payroll" style="font-size: 20px;">Payroll</router-link>
    </nav>
    <b-container>
      <div>Show format bank account</div>
      <div  v-for="(item, index) in excelarray" :key="index">{{item.d}}</div>
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
      excelarrayot: [],
      excelarrayot2: [],
      excelarrayot3: [],
      excelarrayallowance: [],
      excelarrayallowance2: [],
      excelarrayallowance3: [],
      dateotfrom: '',
      dateotto: '',
      dateallowancefrom: '',
      dateallowanceto: '',
      data: [
        {
          account_num: '3864410844',
          total_allowance: '3460.00',
          name: 'นายกฤษฎา ปัตตัง'
        }
      ]
    }
  },
  mounted () {
    let data = [
        {
          account_num: '3864410844',
          total_allowance: '3460.00',
          name: 'นายกฤษฎา ปัตตัง'
        }
      ]
    let result = data.map((item, index) => {
      return {
        d: `D0000${index+1}200${item.account_num}C0000${(item.total_allowance).replace('.', '').padStart(10, '0')}0029                                00000000000000             ${item.name.padEnd(30, ' ')}    `
      }
    })
    console.log('data', data)
    console.log(result)
    this.excelarray = result
  },
  methods: {
  }
}
</script>