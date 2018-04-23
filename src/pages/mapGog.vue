  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0bk9qBqy_F0bglhoQR1FTI7Ka5LjU_4s&callback=initMap"
  type="text/javascript"></script>


<script>
export default {
  name: 'google-map',
  props: ['name','latitude','longitude'],
  data: function() {
    return {
      mapName: this.name + "-map",
    }
  },
  methods:{
    now1(){
      const element = document.getElementById(this.mapName)
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(this.latitude, this.longitude)
    }
    const map = new google.maps.Map(element, options);
    }
  },
  watch:{ latitude: function() {
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 16,
      center: new google.maps.LatLng(this.latitude, this.longitude)
    }
    const map = new google.maps.Map(element, options);
    var marker = new google.maps.Marker({
      position: { lat:this.latitude, lng: this.longitude},
      map: map
    })
  }
  }
  }
</script>
  <template> 
  <div class="google-map">
  <div class="google-maps" :id="mapName"></div>
  <!--<button @click="now1">Hello</button>-->
  </div>
  </template>

  <style scoped>
.google-maps {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>