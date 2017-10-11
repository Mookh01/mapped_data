

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.750, lng:  -97.0333},
    zoom: 5,
    // mapTypeId: 'terrain'  //changes the look of the map
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  script.src = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
  document.getElementsByTagName('head')[0].appendChild(script);
  map.data.loadGeoJson('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')


  map.data.setStyle( function(feature){
    var numb = parseInt(feature.f.mass)
    var mass = numb / 1000;

    return {
      icon: getCircle(mass)
    }; //return
  }); //setStyle


 function getCircle(mass) {
    var size;
    var color;
    //determine features of circle
        if(mass < 10){
          size = 8;
          color = "#7914A3";
        }
        else if (mass < 50){
          size = 12;
          color = "#2D34C3";
        }
        else if(mass < 100){
          size = 16;
          color = "#FFCC33";
        }
        else if(mass < 200){
          size = 20;
          color = "#FF7833";
        }
        else{
          size = 24;
          color = "#F72519";
        }

          return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: .8,
            scale: size,
            strokeColor: 'white',
            strokeWeight: .5,

          };
    } //getCircle

var infowindow = new google.maps.InfoWindow();

map.data.addListener('click', function(event){
  var loca = event.feature.f;
  var date = loca.year;
  date = date.slice(0,4);
infowindow.setContent("<div id='window' style='width:120px;'><h2>"+loca.name+"</h2><p> Year:  " + date +"</p><p> Meteorite Mass: "+loca.mass +" </p><p>Lat:  "+loca.reclat + "</p><p> Long: " +loca.reclong +"</p></div>");
infowindow.setPosition(event.feature.getGeometry().get());
infowindow.open(map);
})

} //initMap
