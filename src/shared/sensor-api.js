import fetch from 'isomorphic-fetch'

export function fetchSensorInfo (id = 'all') {
  //const encodedURI = encodeURI(`https://localhost:3000/api/sensors?q=id:${id}&sort=name&order=desc`)
  console.log(id)
  let encodedURI
  if (id == 'all'){
    encodedURI = encodeURI(`http://localhost:3000/api/sensors/all`)
  } else {
    encodedURI = encodeURI(`http://localhost:3000/api/sensors/${id}`)
  }

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((sensors) => sensors)
    .catch((error) => {
      console.warn(error)
      return null
    });
}