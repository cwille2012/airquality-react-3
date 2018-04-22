import React from 'react'
import DevFunctions from '../dev-functions'

const Development = () => (
  <div className='main'>
    <h3 style={{marginBottom: '0'}}>Development Options</h3>
    <h5 style={{marginTop: '0'}}>WARNING: For development use only.</h5>

    <button id='testButton' onClick={() => {console.log(DevFunctions.test('test'))}}>Test</button>
    <button id='testPostButton' onClick={() => {console.log(DevFunctions.postTest())}}>Test Post</button>
    <br/>
    <br/>
    Name: <input id='nameInput' type='text'></input><br/><br/>
    Email: <input id='emailInput' type='email'></input><br/><br/>
    Username: <input id='userInput' type='text'></input><br/><br/>
    Password: <input id='passInput' type='password'></input><br/><br/>
    Country: <input id='countryInput' type='text'></input><br/><br/>
    <button id='postNewUser' onClick={() => {console.log(DevFunctions.postNewUser())}}>Add User</button>
    <br/>
    <br/>
    Email: <input id='emailWhitelistInput' type='email'></input><br/><br/>
    <select id='accessSelect'>
      <option style={{display: 'none'}}>Access</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
    </select>
    <button id='postWhitelist' onClick={() => {console.log(DevFunctions.postWhitelist())}}>Add to Whitelist</button>
    <br/>
    <br/>
    <textarea id='postTextArea' rows="4" cols="50"></textarea>
    <br/>
    <select id='destinationSelect'>
      <option style={{display: 'none'}}>Destination</option>
      <option value="sensors">sensors</option>
      <option value="users">users</option>
      <option value="whitelist">whitelist</option>
    </select>
    <br/>
    <button id='postTextButton' onClick={() => {console.log(DevFunctions.postTextArea())}}>Post Text Area</button>
    <br/>
    <br/>
    <button id='getSensorsButton' onClick={() => {console.log(DevFunctions.getSensors())}}>Get Sensors</button>
    <button id='getUsersButton' onClick={() => {console.log(DevFunctions.getUsers())}}>Get Users</button>
    <button id='getWhitelistButton' onClick={() => {console.log(DevFunctions.getWhitelist())}}>Get Whitelist</button>
    <div id='sensorResultDiv' style={{maxWidth: '400px', fontSize: '12px'}}></div>
  </div>
)

export default Development
