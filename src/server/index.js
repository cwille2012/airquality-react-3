import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get('/api/sensors/:id', (req, res) => {
  var id = req.params.id

  console.log(id)

  var sensors = []
  if (id =='all'){
    sensors = [
      { "id": "B8:27:EB:DA:8F:F5", "type":"Air Quality", "name": "Sensor 1", "location": "Orlando", "group": "Test Group 1", "long": "-81.4076", "lat": "28.2920", "address":"", "floor":"", "room": "", "description": "", "status": "ok" },
      { "id": "B8:27:EB:CE:93:69", "type":"Air Quality", "name": "Sensor 2", "location": "Melbourne", "group": "Test Group 2", "long": "-80.620812", "lat": "28.072359", "address":"2415 S Babcock St, Melbourne, FL 32901", "floor":"1", "room": "Suite E", "description": "CCC-USA test sensor", "status": "danger" },
      { "id": "B8:27:EB:97:19:1E", "type":"Air Quality", "name": "Sensor 3", "location": "Orlando", "group": "Test Group 1", "long": "-81.4125", "lat": "28.2834", "address":"", "floor":"", "room": "", "description": "", "status": "ok" }
    ]
  } else if (id=='B8:27:EB:DA:8F:F5') {
    sensors = [
      { "id": "B8:27:EB:DA:8F:F5", "type":"Air Quality", "name": "Sensor 1", "location": "Orlando", "group": "Test Group 1", "long": "-81.4076", "lat": "28.2920", "address":"", "floor":"", "room": "", "description": "", "status": "ok" }
    ]
  } else if (id=='B8:27:EB:CE:93:69') {
    sensors = [
      { "id": "B8:27:EB:CE:93:69", "type":"Air Quality", "name": "Sensor 2", "location": "Melbourne", "group": "Test Group 2", "long": "-80.620812", "lat": "28.072359", "address":"2415 S Babcock St, Melbourne, FL 32901", "floor":"1", "room": "Suite E", "description": "CCC-USA test sensor", "status": "danger" }
    ]
  } else if (id=='B8:27:EB:97:19:1E') {
    sensors = [
      { "id": "B8:27:EB:97:19:1E", "type":"Air Quality", "name": "Sensor 3", "location": "Orlando", "group": "Test Group 1", "long": "-81.4125", "lat": "28.2834", "address":"", "floor":"", "room": "", "description": "", "status": "ok" }
    ]
  } 
  res.end(JSON.stringify(sensors))
});

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Data Dashboard (SSR)</title>
          <!--<link rel="stylesheet" href="../app.css">-->
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})