import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastListWitchClick from '../components/podcastsListClick'
import PodcastPlayer from '../components/PodcastPlayer'
import Error from './_error'
export default class Channel extends Component {
  constructor (props) {
    super(props)
    this.state = { openPodcast: null }
    this.openPodcast = this.openPodcast.bind(this)
    this.closePodcast = this.closePodcast.bind(this)
  }
  static async getInitialProps ({ query, res }) {
    let idChannel = query.id
    try {
      let [ reqChannel, reqAudioClip, reqSeries ] = await Promise.all([
        await fetch(`https://api.audioboom.com/channels/${idChannel}`),
        await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
        await fetch(`https://api.audioboom.com/channels?id=${idChannel}/child_channels`)
      ])
      if (reqChannel.status >= 404) {
        res.statusCode = reqChannel.status
        return {channel: null, audioClips: null, series: null, statusCode: reqChannel.status}
      }
      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel

      let dataAudios = await reqAudioClip.json()
      let audioClips = dataAudios.body.audio_clips

      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels

      return { channel, audioClips, series, statusCode: 200 }
    } catch (e) {
      res.statusCode = 503
      return {channel: null, audioClips: null, series: null, statusCode: 503}
    }
  }
  openPodcast (event, podcast) {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }
  closePodcast (event) {
    event.preventDefault()
    this.setState({openPodcast: null})
  }
  render () {
    const { channel, audioClips, series, statusCode } = this.props
    const openPodcast = this.state.openPodcast
    if (statusCode !== 200) { return (<Error statusCode={statusCode} />) }
    return (
      <Layout title={channel.title}>
        <div className='banner' style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        { openPodcast && <div className='modal'><PodcastPlayer clip={openPodcast} onClose={this.closePodcast} /></div>}
        <h1>{ channel.title }</h1>
        <div>
          <h2>Series</h2>
          <ChannelGrid channels={series} />
        </div>
        <h2>Ultimos Podcasts</h2>
        <PodcastListWitchClick podcasts={audioClips} onClickPodcast={this.openPodcast} />
        <style jsx>{`
          h1{
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            font-weight: 600;
            padding: 15px;
          }
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
        `}
        </style>
      </Layout>
    )
  }
}
