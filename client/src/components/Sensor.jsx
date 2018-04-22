import React from 'react'
import SensorAPI from '../api-sensors'
import { Link } from 'react-router-dom'
import SensorFunctions from '../sensor-functions'

const Sensor = (props) => {
  console.log(props.match.params.id)

  const sensor = SensorAPI.get(String(props.match.params.id))

  if (!sensor && props.match.params.id !== 'new') {
    return <div>Sorry, but the sensor was not found</div>
  } else if (props.match.params.id === 'new') {
    return (
      <div className='main'>
        <h4>New sensor</h4>
        <select id='sensorTypeSelect' onChange={() => {SensorFunctions.typeOnChange()}}>
          <option style={{display: 'none'}}>Sensor Type</option>
          <option value="airQuality">Air Quality</option>
          <option value="smokeDetector">Smoke Detector</option>
          <option value="xRay">X-Ray</option>
        </select>
        <div id='newSensorInputs'>
        </div>
        <button id='cancelButton' style={{display: 'none' }} onClick={() => {console.log(SensorFunctions.cancelAdd())}}>Cancel</button>
        <button id='addButton' style={{display: 'none' }} onClick={() => {console.log(SensorFunctions.addVerify())}}>Add Sensor</button>

        <div id='addVerifyPopup' className='background'>
            <div id='addLoader' className = 'loader' onClick={() => {console.log(SensorFunctions.addCancel())}}></div>
            <div id='addVerifyPopupBody'className='popup warning'>
              <div className='popup-header'>
                <span className="close" onClick={() => {console.log(SensorFunctions.addCancel())}}>&times;</span>
                <div className='popup-header text'>Verify Sensor Information</div>
              </div>
              <div className='popup-body-fixed'>
                <p>Please verify the following information is correct before submitting.</p>
                <div className='verifyText'>
                  <p id='idVerify' >Sensor ID: </p>
                  <p id='typeVerify' >Type: </p>
                  <p id='nameVerify' >Name: </p>
                  <p id='groupVerify' >Group: </p>
                  <p id='locationVerify' >Location: </p>
                  <p id='addressVerify' >Address: </p>
                  <p id='floorVerify' >Floor: </p>
                  <p id='roomVerify' >Room: </p>
                  <p id='coordinatesVerify' >Coordinates: </p>
                </div>
                <div className='verifyMap'>
                  <div id='verifyMap'></div>
                </div>
              </div>
              <div className='popup-footer'>
                <button id='addButton' onClick={() => {console.log(SensorFunctions.add())}}>Add Sensor</button>
                <button id='addCancelButton' onClick={() => {console.log(SensorFunctions.addCancel())}}>Edit Information</button>
              </div>
            </div>
          </div>
      </div>
    )
  } else {
      if (sensor.type === 'Air Quality') {
      return (
        <div className='main'>
          <h1>{sensor.id}</h1>
          <h4 id='type'>Sensor Type: {sensor.type}</h4>
          <h4 id='name'>Sensor Name: {sensor.name}</h4>
          <h4 id='group'>Sensor Group: {sensor.group}</h4>
          <h4 id='location'>Sensor Location: {sensor.location}</h4>
          <h4 id='address'>Sensor Address: {sensor.address}</h4>
          <h4 id='floor'>Sensor Floor: {sensor.floor}</h4>
          <h4 id='room'>Sensor Room: {sensor.room}</h4>
          <h4 id='long'>Sensor Longitude: {sensor.long}</h4>
          <h4 id='lat'>Sensor Latitude: {sensor.lat}</h4>
          <h4>Sensor Status: {sensor.status}</h4>
          <h4>Sensor ID: {sensor.id}</h4>

          <button id='editButton' onClick={() => {console.log(SensorFunctions.edit(sensor))}}>Edit Sensor</button>
          <button id='removeButton' onClick={() => {console.log(SensorFunctions.removeVerify())}}>Remove Sensor</button>
          <button id='cancelButton' style={{display: 'none' }} onClick={() => {console.log(SensorFunctions.cancelEdit(sensor))}}>Cancel</button>
          <button id='saveButton' style={{display: 'none' }} onClick={() => {console.log(SensorFunctions.save(sensor))}}>Save Sensor</button>

          <br/>
          <br/>

          <div id='removePopup' className='background'>
            <div id='removeLoader' className = 'loader' onClick={() => {console.log(SensorFunctions.removeCancel())}}></div>
            <div id='removePopupBody'className='popup warning'>
              <div className='popup-header'>
                <span className="close" onClick={() => {console.log(SensorFunctions.removeCancel())}}>&times;</span>
                <div className='popup-header text'>Remove Sensor</div>
              </div>
              <div className='popup-body'>
                <p>Are you sure you want to remove the following sensor? This action cannot be undone.</p>
                <p>Name: {sensor.name}</p>
                <p>Group: {sensor.group}</p>
                <p>Location: {sensor.location}</p>
                <p>Sensor ID: {sensor.id}</p>
              </div>
              <div className='popup-footer'>
                <button id='popupRemoveButton' onClick={() => {console.log(SensorFunctions.remove(sensor))}}>Remove</button>
                <button id='popupCancelButton' onClick={() => {console.log(SensorFunctions.removeCancel())}}>Cancel</button>
              </div>
            </div>
          </div>

          <Link to='/sensors'>Back</Link>
        </div>
      )
    } else if (sensor.type === 'Smoke Detector') {
      return (
        <div className='main'>
          This dashboard is not configured for smoke detectors yet.
          <Link to='/sensors'>Back</Link>
        </div>
      )
    } else if (sensor.type === 'X-Ray') {
      return (
        <div className='main'>
          This dashboard is not configured for X-Ray sensors yet.
          <Link to='/sensors'>Back</Link>  
        </div>
      )
    } else {
      return (
      <div className='main'>
        Sorry, but this sensor type was not found. {sensor.type}
        <Link to='/sensors'>Back</Link>
      </div>)
    }
  }
}

export default Sensor
