
<script>
import Vue from 'vue';
import json from '../a.json'
import VueGoodTable from 'vue-good-table';
// import the styles 
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTable);

export default {
 name: 'my-component',
  data(){
    return {
      myJson: json,
      columns: [
        json.column1,
        json.column2
      ],
      rows: [
        json.row1,
        json.row2,
        json.row3,
        json.row4,
        json.row5,
        json.row6,
      ],
    };
  },
  methods:{
      myfuck(){
          var kung = JSON.stringify(this.myJson)
          console.log(JSON.parse(kung))
      }
  }
}
</script>

<template>
<div>
    <div v-bind="myJson">{{myJson}}</div>
    <button @click="myfuck()">Hello</button>
  <div>
  </div>
  </div>
</template>