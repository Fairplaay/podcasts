import React from 'react'

const About = () => {
  return (
    <div>
      <h2>title</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quisquam veritatis ducimus ad nemo at, esse expedita reprehenderit, inventore cumque tempora amet incidunt quasi molestiae. Praesentium exercitationem neque veritatis ea!</p>
      <img src='/static/me.jpg' alt='me' />
      <style jsx>
        {`
        img{
          max-width: 20%;
          display: block;
          margin: 0 auto;
        }
        `}
      </style>
      <style jsx global>
        {`
          body{
            background: red;
          }
        `}
      </style>

    </div>
  )
}

export default About