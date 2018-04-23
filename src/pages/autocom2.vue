
<script>
export default {
  name: "auto-addr",
  data(){
      return {
      componentForm: {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name',
        autocomplete: null
      }
      }
  },
  methods: {  initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
       var autocomplete = new google.maps.places.Autocomplete(
            /* @type {!HTMLInputElement}*/(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      },
       fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in this.componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = place.address_components[i][this.componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      },
      geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          })
        }
      },
  }
}
</script>

<template>
<div id="auto-addr">
  <div id="locationField">
      <input id="autocomplete" placeholder="Enter your address"
            @input="geolocate" type="text"></input>
    </div>
    <table id="address">
      <tr>
        <td class="label">Street address</td>
        <td class="slimField"><input class="field" id="street_number"
              disabled="true"></input></td>
        <td class="wideField" colspan="2"><input class="field" id="route"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">City</td>
        <!-- Note: Selection of address components in this example is typical.
             You may need to adjust it for the locations relevant to your app. See
             https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
        -->
        <td class="wideField" colspan="3"><input class="field" id="locality"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">State</td>
        <td class="slimField"><input class="field"
              id="administrative_area_level_1" disabled="true"></input></td>
        <td class="label">Zip code</td>
        <td class="wideField"><input class="field" id="postal_code"
              disabled="true"></input></td>
      </tr>
      <tr>
        <td class="label">Country</td>
        <td class="wideField" colspan="3"><input class="field"
              id="country" disabled="true"></input></td>
      </tr>
    </table>
    </div>
</template>

<style scoped>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
#locationField, #controls {
  position: relative;
  width: 480px;
}
#autocomplete {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 99%;
}
.label {
  text-align: right;
  font-weight: bold;
  width: 100px;
  color: #303030;
}
#address {
  border: 1px solid #000090;
  background-color: #f0f0ff;
  width: 480px;
  padding-right: 2px;
}
#address td {
  font-size: 10pt;
}
.field {
  width: 99%;
}
.slimField {
  width: 80px;
}
.wideField {
  width: 200px;
}
#locationField {
  height: 20px;
  margin-bottom: 2px;
}

</style>
