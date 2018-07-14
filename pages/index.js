import React, { Component } from 'react'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import fetch from 'isomorphic-fetch'
import Error from './_error'
export default class extends Component {
  static async getInitialProps ({ res }) {
    try {
      let request = await fetch('https://api.audioboom.com/channels/recommended')
      let { body: channels } = await request.json()
      return { channels, statusCode: 200 }
    } catch (e) {
      res.statusCode = 503
      return { channels: null, statusCode: 503 }
    }
  }
  render () {
    const channels = this.props.channels
    const statusCode = this.props.statusCode
    if (statusCode !== 200) { return (<Error statusCode={statusCode} />) }
    return (
      <Layout title='Podcasts' >
        <ChannelGrid channels={channels} />
      </Layout>
    )
  }
}
