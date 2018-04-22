const SensorFunctions = {
  //EDIT
  edit: function(sensor) { 
    var nameInput = document.createElement("INPUT");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", 'nameInput');
    nameInput.setAttribute("value", sensor.name);

    var groupInput = document.createElement("INPUT");
    groupInput.setAttribute("type", "text");
    groupInput.setAttribute("id", 'groupInput');
    groupInput.setAttribute("value", sensor.group);

    var locationInput = document.createElement("INPUT");
    locationInput.setAttribute("type", "text");
    locationInput.setAttribute("id", 'locationInput');
    locationInput.setAttribute("value", sensor.location);

    var addressInput = document.createElement("INPUT");
    addressInput.setAttribute("type", "text");
    addressInput.setAttribute("id", 'addressInput');
    addressInput.setAttribute("value", sensor.address);

    var floorInput = document.createElement("INPUT");
    floorInput.setAttribute("type", "text");
    floorInput.setAttribute("id", 'floorInput');
    floorInput.setAttribute("value", sensor.floor);

    var roomInput = document.createElement("INPUT");
    roomInput.setAttribute("type", "text");
    roomInput.setAttribute("id", 'roomInput');
    roomInput.setAttribute("value", sensor.room);

    var longInput = document.createElement("INPUT");
    longInput.setAttribute("type", "number");
    longInput.setAttribute("id", 'longInput');
    longInput.setAttribute("value", sensor.long);

    var latInput = document.createElement("INPUT");
    latInput.setAttribute("type", "number");
    latInput.setAttribute("id", 'latInput');
    latInput.setAttribute("value", sensor.lat);

    document.getElementById('name').innerHTML = 'Sensor Name: ';
    document.getElementById('name').appendChild(nameInput);
    document.getElementById('group').innerHTML = 'Sensor Group: ';
    document.getElementById('group').appendChild(groupInput);
    document.getElementById('location').innerHTML = 'Sensor Location: ';
    document.getElementById('location').appendChild(locationInput);
    document.getElementById('address').innerHTML = 'Sensor Address: ';
    document.getElementById('address').appendChild(addressInput);
    document.getElementById('floor').innerHTML = 'Sensor Floor: ';
    document.getElementById('floor').appendChild(floorInput);
    document.getElementById('room').innerHTML = 'Sensor Room: ';
    document.getElementById('room').appendChild(roomInput);
    document.getElementById('long').innerHTML = 'Sensor Longitude: ';
    document.getElementById('long').appendChild(longInput);
    document.getElementById('lat').innerHTML = 'Sensor Latitude: ';
    document.getElementById('lat').appendChild(latInput);

    document.getElementById('editButton').style.display ='none';
    document.getElementById('removeButton').style.display ='none';
    document.getElementById('cancelButton').style.display ='block';
    document.getElementById('saveButton').style.display ='block';
    
    return ('sensor now editable')
  },
  //CANCEL-EDIT
  cancelEdit: function(sensor) {
    document.getElementById('name').innerHTML = 'Sensor Name: ' + sensor.name;
    document.getElementById('group').innerHTML = 'Sensor Group: ' + sensor.group;
    document.getElementById('location').innerHTML = 'Sensor Location: ' + sensor.location;
    document.getElementById('address').innerHTML = 'Sensor Address: ' + sensor.address;
    document.getElementById('floor').innerHTML = 'Sensor Floor: ' + sensor.floor;
    document.getElementById('room').innerHTML = 'Sensor Room: ' + sensor.room;
    document.getElementById('long').innerHTML = 'Sensor Longitude: ' + sensor.long;
    document.getElementById('lat').innerHTML = 'Sensor Latitude: ' + sensor.lat;

    document.getElementById('editButton').style.display ='block';
    document.getElementById('removeButton').style.display ='block';
    document.getElementById('cancelButton').style.display ='none';
    document.getElementById('saveButton').style.display ='none';

    return ('editing cancelled')
  },
  //SAVE
  save: function(sensor) {
    sensor.name = document.getElementById('nameInput').value;
    sensor.group = document.getElementById('groupInput').value;
    sensor.location = document.getElementById('locationInput').value;
    sensor.address = document.getElementById('addressInput').value;
    sensor.floor = document.getElementById('floorInput').value;
    sensor.room = document.getElementById('roomInput').value;
    sensor.long = document.getElementById('longInput').value;
    sensor.lat = document.getElementById('latInput').value;

    document.getElementById('name').innerHTML = 'Sensor Name: ' + sensor.name;
    document.getElementById('group').innerHTML = 'Sensor Group: ' + sensor.group;
    document.getElementById('location').innerHTML = 'Sensor Location: ' + sensor.location;
    document.getElementById('address').innerHTML = 'Sensor Address: ' + sensor.address;
    document.getElementById('floor').innerHTML = 'Sensor Floor: ' + sensor.floor;
    document.getElementById('room').innerHTML = 'Sensor Room: ' + sensor.room;
    document.getElementById('long').innerHTML = 'Sensor Longitude: ' + sensor.long;
    document.getElementById('lat').innerHTML = 'Sensor Latitude: ' + sensor.lat;

    document.getElementById('editButton').style.display ='block';
    document.getElementById('removeButton').style.display ='block';
    document.getElementById('saveButton').style.display ='none';
    document.getElementById('cancelButton').style.display ='none';

    var postData = JSON.stringify(sensor);
    var validJSON = true;
    try {
      JSON.parse(postData);
    } catch (e) {
      validJSON = false;
      return('JSON error: ' + e)
    }
    if (validJSON) {
      var url = String(window.location.href);
      url = url.replace(sensor.id, '');
      url = url.replace(/sensors/g, 'api/sensors');
      url = url.replace(/3000/g, '5000');
      console.log(url);

      var method = "POST";
      var shouldBeAsync = true;
      var request = new XMLHttpRequest();

      request.onload = function() {
          var status = request.status;
          var data = request.responseText;
          if (status === 200) {
              console.log('success: ' + data);
          } else {
              console.log('error: ' + data);
          }
      }
      request.open(method, url, shouldBeAsync);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(postData);
    }

    return ('saved ' + sensor.id)
  },
  //SENSOR TYPE SELECT CHANGE
  typeOnChange: function() {
    var sensorType = document.getElementById('sensorTypeSelect').value
    
    if(sensorType === 'airQuality'){
      console.log('Sensor type is air quality')
      document.getElementById('newSensorInputs').innerHTML = 'Adding new air quality sensor';

      var idHolder = document.createElement("h4");
      //replace with list of new sensors
      idHolder.setAttribute("id", 'id');
      idHolder.innerHTML = 'Sensor ID: ';
      var idInput = document.createElement("INPUT");
      idInput.setAttribute("type", "text");
      idInput.setAttribute("id", 'idInput');
      idHolder.appendChild(idInput);
      document.getElementById('newSensorInputs').appendChild(idHolder);

      var nameHolder = document.createElement("h4");
      nameHolder.setAttribute("id", 'name');
      nameHolder.innerHTML = 'Sensor Name: ';
      var nameInput = document.createElement("INPUT");
      nameInput.setAttribute("type", "text");
      nameInput.setAttribute("id", 'nameInput');
      nameHolder.appendChild(nameInput);
      document.getElementById('newSensorInputs').appendChild(nameHolder);

      var groupHolder = document.createElement("h4");
      groupHolder.setAttribute("id", 'group');
      groupHolder.innerHTML = 'Sensor Group: ';
      var groupInput = document.createElement("INPUT");
      groupInput.setAttribute("type", "text");
      groupInput.setAttribute("id", 'groupInput');
      groupHolder.appendChild(groupInput);
      document.getElementById('newSensorInputs').appendChild(groupHolder);

      var locationHolder = document.createElement("h4");
      locationHolder.setAttribute("id", 'location');
      locationHolder.innerHTML = 'Sensor Location: ';
      var locationInput = document.createElement("INPUT");
      locationInput.setAttribute("type", "text");
      locationInput.setAttribute("id", 'locationInput');
      locationHolder.appendChild(locationInput);
      document.getElementById('newSensorInputs').appendChild(locationHolder);

      var addressHolder = document.createElement("h4");
      addressHolder.setAttribute("id", 'address');
      addressHolder.innerHTML = 'Sensor Address: ';
      var addressInput = document.createElement("INPUT");
      addressInput.setAttribute("type", "text");
      addressInput.setAttribute("id", 'addressInput');
      addressHolder.appendChild(addressInput);
      document.getElementById('newSensorInputs').appendChild(addressHolder);

      var floorHolder = document.createElement("h4");
      floorHolder.setAttribute("id", 'floor');
      floorHolder.innerHTML = 'Sensor Floor: ';
      var floorInput = document.createElement("INPUT");
      floorInput.setAttribute("type", "text");
      floorInput.setAttribute("id", 'floorInput');
      floorHolder.appendChild(floorInput);
      document.getElementById('newSensorInputs').appendChild(floorHolder);

      var roomHolder = document.createElement("h4");
      roomHolder.setAttribute("id", 'room');
      roomHolder.innerHTML = 'Sensor Room: ';
      var roomInput = document.createElement("INPUT");
      roomInput.setAttribute("type", "text");
      roomInput.setAttribute("id", 'roomInput');
      roomHolder.appendChild(roomInput);
      document.getElementById('newSensorInputs').appendChild(roomHolder);

      var longHolder = document.createElement("h4");
      longHolder.setAttribute("id", 'long');
      longHolder.innerHTML = 'Sensor Longitude: ';
      var longInput = document.createElement("INPUT");
      longInput.setAttribute("type", "number");
      longInput.setAttribute("id", 'longInput');
      longHolder.appendChild(longInput);
      document.getElementById('newSensorInputs').appendChild(longHolder);

      var latHolder = document.createElement("h4");
      latHolder.setAttribute("id", 'lat');
      latHolder.innerHTML = 'Sensor Latitude: ';
      var latInput = document.createElement("INPUT");
      latInput.setAttribute("type", "number");
      latInput.setAttribute("id", 'latInput');
      latHolder.appendChild(latInput);
      document.getElementById('newSensorInputs').appendChild(latHolder);

      var coordinateLookupHolder = document.createElement("h4");
      coordinateLookupHolder.setAttribute("id", 'lookupCoordinates');
      var coordinateLookup = document.createElement("INPUT");
      coordinateLookup.innerHTML = 'Lookup coordinates from address';
      coordinateLookup.setAttribute("type", "checkbox");
      coordinateLookup.setAttribute("id", 'coordinateLookup');
      coordinateLookupHolder.appendChild(coordinateLookup);
      coordinateLookupHolder.innerHTML += ('Lookup coordinates from address');
      document.getElementById('newSensorInputs').appendChild(coordinateLookupHolder);

      var addressLookupHolder = document.createElement("h4");
      addressLookupHolder.setAttribute("id", 'lookupAddress');
      var addressLookup = document.createElement("INPUT");
      addressLookup.innerHTML = 'Lookup address from coordinates';
      addressLookup.setAttribute("type", "checkbox");
      addressLookup.setAttribute("id", 'addressLookup');
      addressLookupHolder.appendChild(addressLookup);
      addressLookupHolder.innerHTML += ('Lookup address from coordinates');
      document.getElementById('newSensorInputs').appendChild(addressLookupHolder);

      document.getElementById('addButton').style.display ='block';
      document.getElementById('cancelButton').style.display ='block';

    } else if(sensorType === 'smokeDetector') {
      console.log('Sensor type is smoke detector')
      document.getElementById('newSensorInputs').innerHTML = 'Adding new smoke detector';
    } else if(sensorType === 'xRay') {
      console.log('Sensor type is x-ray')
      document.getElementById('newSensorInputs').innerHTML = 'Adding new x-ray sensor';
    } else {
      console.log('Sensor type is unknown')
      document.getElementById('newSensorInputs').innerHTML = 'Unknown sensor selected';
    }
  },
  //ADD VERIFY
  addVerify: function() {
    //check if exists 
    //add list of detected but not set up sensors
    var sensor = {};

    sensor.type = 'Air Quality';
    sensor.id = document.getElementById('idInput').value;
    sensor.name = document.getElementById('nameInput').value;
    sensor.group = document.getElementById('groupInput').value;
    sensor.location = document.getElementById('locationInput').value;
    sensor.floor = document.getElementById('floorInput').value;
    sensor.room = document.getElementById('roomInput').value;

    if(document.getElementById('coordinateLookup').checked && document.getElementById('addressLookup').checked){
      console.log('Error: cannot lookup both address and coordinates')
    } else {

      if(document.getElementById('coordinateLookup').checked){
        console.log('Looking up coordinates for ' + sensor.address);
        console.log(this.coordinateLookup(sensor.address));
      } else {
        sensor.long = document.getElementById('longInput').value;
        sensor.lat = document.getElementById('latInput').value;
      }

      if(document.getElementById('addressLookup').checked){
        console.log('Looking up address for ' + sensor.address);
        console.log(this.addressLookup(sensor.lat, sensor.long));
      } else {
        sensor.address = document.getElementById('addressInput').value;
      }
      console.log(sensor);

      document.getElementById('idVerify').innerHTML = 'Sensor ID:' + sensor.id;
      document.getElementById('typeVerify').innerHTML = 'Type: ' + sensor.type;
      document.getElementById('nameVerify').innerHTML = 'Name: ' +sensor.name;
      document.getElementById('groupVerify').innerHTML = 'Group: ' + sensor.group;
      document.getElementById('locationVerify').innerHTML = 'Location: ' + sensor.location;
      document.getElementById('addressVerify').innerHTML = 'Address: ' + sensor.address;
      document.getElementById('floorVerify').innerHTML = 'Floor: ' + sensor.floor;
      document.getElementById('roomVerify').innerHTML = 'Room: ' + sensor.room;

      document.getElementById('addVerifyPopup').style.display ='block';
      document.getElementById('addVerifyPopupBody').style.display ='block';
      
      return ('are you sure you want to add ' + sensor.id + '?')
    }
  },
  //COORDINATE LOOKUP
  coordinateLookup: function(address) {
    var key = 'AIzaSyAiOePUc6yazb7uJr8pNfNEqxkTnjJGXCY';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    this.httpGet(url, function(responseData) {
      var validJSON = true;
      try {
        JSON.parse(responseData);
      } catch (e) {
        validJSON = false;
        console.log('JSON error: ' + e)
        return('JSON error: ' + e)
      }
      if (validJSON){
        responseData = JSON.parse(responseData)
        if(responseData.status === 'OK'){
          responseData = responseData.results[0].geometry.location
          console.log(responseData)
          document.getElementById('longInput').value = responseData.lng
          document.getElementById('latInput').value = responseData.lat
          document.getElementById('coordinatesVerify').innerHTML = 'Coordinates: '
          document.getElementById('coordinatesVerify').innerHTML += (responseData.lng + ', ' + responseData.lat)
          return responseData
        } else {
          console.log('lookup failed with status: ' + responseData.status)
          return ('coordinate lookup failed')
        }
      }
    }); 
  },
  //ADDRESS LOOKUP
  addressLookup: function(lat, lng) {
    var key = 'AIzaSyAiOePUc6yazb7uJr8pNfNEqxkTnjJGXCY';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + key;
    this.httpGet(url, function(responseData) {
      var validJSON = true;
      try {
        JSON.parse(responseData);
      } catch (e) {
        validJSON = false;
        console.log('JSON error: ' + e)
        return('JSON error: ' + e)
      }
      if (validJSON){
        responseData = JSON.parse(responseData)
        if(responseData.status === 'OK'){
          responseData = responseData.results[0].formatted_address
          console.log(responseData)
          document.getElementById('addressInput').value = responseData
          document.getElementById('addressVerify').innerHTML = 'Address: '
          document.getElementById('addressVerify').innerHTML += responseData
          return responseData
        } else {
          console.log('lookup failed with status: ' + responseData.status)
          return ('address lookup failed')
        }
      }
    });
  },
  //LOAD MAP FOR VERIFICATION
  verifyMapPosition: function(lng, lat) {
    //deck gl stuff here to put map in div id 'verifyMap'
  },
  //ADD
  add: function() {
    document.getElementById('addLoader').style.display ='block';
    document.getElementById('addVerifyPopupBody').style.display ='none';
    return ('adding sensor ' + 'sensor.id')
  },
  //CANCEL ADD
  cancelAdd: function() {
    //go back to sensor page
    return ('returning to sensor page')
  },
  //ADD CANCEL
  addCancel: function() {
    document.getElementById('addLoader').style.display ='none';
    document.getElementById('addVerifyPopup').style.display ='none';
    return ('sensor not added')
  },
  //REMOVE-VERIFY
  removeVerify: function() {
    document.getElementById('removePopup').style.display ='block';
    return ('please verify')
  },
  //REMOVE-CANCEL
  removeCancel: function() {
    document.getElementById('removePopup').style.display ='none';
    return ('action cancelled')
  },
  //REMOVE
  remove: function(sensor) {
    document.getElementById('removePopupBody').style.display ='none';
    document.getElementById('removeLoader').style.display ='block';

    var newLocation = window.location.href.replace(sensor.id, '');
    newLocation = newLocation.slice(0, -1);
    console.log(newLocation);
    return ('removed ' + sensor.id)
  },
  //HTTP GET REQUEST
  httpGet: function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
  }
}

export default SensorFunctions
