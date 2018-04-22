const SensorAPI = {
  sensors: [
    { "id": "B8:27:EB:DA:8F:F5", "type":"Air Quality", "name": "Sensor 1", "location": "Orlando", "group": "Test Group 1", "long": "-81.4076", "lat": "28.2920", "address":"", "floor":"", "room": "", "description": "", "status": "ok" },
    { "id": "B8:27:EB:CE:93:69", "type":"Air Quality", "name": "Sensor 2", "location": "Melbourne", "group": "Test Group 2", "long": "-80.620812", "lat": "28.072359", "address":"2415 S Babcock St, Melbourne, FL 32901", "floor":"1", "room": "Suite E", "description": "CCC-USA test sensor", "status": "danger" },
    { "id": "B8:27:EB:97:19:1E", "type":"Air Quality", "name": "Sensor 3", "location": "Orlando", "group": "Test Group 1", "long": "-81.4125", "lat": "28.2834", "address":"", "floor":"", "room": "", "description": "", "status": "ok" }
  ],
  all: function() { return this.sensors},
  get: function(id) {
    const isSensor = s => s.id === id
    return this.sensors.find(isSensor)
  }
}

export default SensorAPI
