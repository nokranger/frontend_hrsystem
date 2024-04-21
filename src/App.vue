<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/dashboard">Import & Export</router-link> || 
      <router-link to="/Attached">Attached</router-link> ||
      <router-link to="/payroll">Payroll</router-link>
    </nav> -->
    <nav>
      <router-link to="/dashboard" style="font-size: 20px;">Import & Export</router-link> ||
      <router-link to="/Attached" style="font-size: 20px;">Report</router-link> ||
      <router-link to="/pattached" style="font-size: 20px;">Previous Report</router-link> ||
      <router-link to="/payroll" style="font-size: 20px;">Payroll</router-link> ||
      <router-link to="/searchtrip" style="font-size: 20px;">Search Trip</router-link> ||
      <router-link to="/updatepayment" style="font-size: 20px;">Update Status Allowance & OT</router-link> ||
      <router-link to="/exportpayment" style="font-size: 20px;">Export Payment</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Serif');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dbdbdb;
  height: 1500px;
  font-family: 'Noto Serif', sans-serif;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
