import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default class Error extends React.Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    return (
      <Layout title='oh no :('>
        { statusCode === 404 ? 
          <div className='message' ><h1>Esta pagina no existe :(</h1><p><Link href='/'><a>volver a la Home</a></Link></p></div> : <div className='message' ><h1>Ha ocurrido un error, intenta nuevamente en unos segundos :(</h1></div>}
        <style jsx>
          {`
            .message {
              padding: 100px 30px;
              text-align: center;
            }
            a{
              color: #8756ca;
            }
          `}
        </style>
      </Layout>
    )
  }
}
