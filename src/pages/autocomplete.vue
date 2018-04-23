
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  /*props: {
      addrObj1: Function
    },*/
  components: { VueGoogleAutocomplete },
  name: "auto-addr",
  data(){
      return {
        //checking: false,
        check:'',
        address: {
          street_number: '',
          route: '',
          locality: '',
          administrative_area_level_1: '',
          country: '',
          postal_code: '',
          latitude: '',
          longitude: ''
        }
      }
      },
  methods: {  
    getAddressData: function (addressData, placeResultData, id) {
                for (var key in this.address)
                this.address[key] = "unspecified"
                for (var key in addressData) {
                  this.address[key]=addressData[key];
                  console.log(this.address)
                }
                next: for (var key in this.address){
                  if (document.getElementById(key))
                  document.getElementById(key).value = this.address[key]
                  else 
                   continue next
                }
                var address1 = JSON.stringify(this.address)
                this.$emit('checking', [false, this.address])
                //this.addrObj1(this.address)
                //this.checking = true;
              
               /* for (var i = 0; i < this.address.length; i++) {
          var addressType = this.address[i].types[0];
          if (address[addressType]) {
            var val = this.address[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }*/
      },
      handleError(error) {
        alert(error)
      }
      

}
}
</script>

<template>
<div id="auto-addr">
<section class="hero">
    <div class="hero-body">
        <div class="container" id="app">
            <h2 class="title is-4">Type your address
            </h2>
            <p class="control">
                <vue-google-autocomplete
            id="map"
            classname="input"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            v-on:error="handleError"
            @input="getAddressData"
>
</vue-google-autocomplete>
            </p>
<table id="address">
      <tr>
        <td style="font-weight:600">Street address</td>
        <td class="slimField"><input class="field" id="street_number"
              disabled="true"></input></td>
        <td class="wideField" colspan="2"><input class="field" id="route"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td style="font-weight:600">City</td>
        <td class="wideField" colspan="3"><input class="field" id="locality"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td style="font-weight:600">State</td>
        <td class="slimField"><input class="field" id="administrative_area_level_1" disabled="true"></input></td>
        </tr>
        <tr>
        <td style="font-weight:600">Zip code</td>
        <td class="wideField"><input class="field" id="postal_code"
              disabled="true"></input></td>
              </tr>
      <tr>
        <td style="font-weight:600">Country</td>
        <td class="wideField" colspan="3"><input class="field"
              id="country" disabled="true"></input></td>
      </tr>
    </table>
            <!--<div class="message is-success" v-show="address.country !== ''">
                <div class="message-body">{{ address }}</div>
            </div>-->
        </div>
    </div>
</section>
    </div>
</template>

<style src="../assets/css/bulma.min.css" scoped>
</style>
