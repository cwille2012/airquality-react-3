import React, { Component } from 'react'

class List extends Component {
  constructor(props) {
    super(props)

    let sensors
    if (__isBrowser__) {
      sensors = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      sensors = this.props.staticContext.data
    }

    this.state = {
      sensors,
      loading: sensors ? false : true,
    }

    this.fetchSensors = this.fetchSensors.bind(this)
  }
  componentDidMount () {
    if (!this.state.sensors) {
      this.fetchSensors(this.props.match.params.id)
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchSensors(this.props.match.params.id)
    }
  }
  fetchSensors (lang) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang)
      .then((sensors) => this.setState(() => ({
        sensors,
        loading: false,
      })))
  }
  render() {
    const { loading, sensors } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {sensors.map(({ id, type, name, location, group, status }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={'/sensors/'+id}>{name}</a></li>
              <li>{id}</li>
              <li>{location}</li>
              <li>{group}</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

export default List