import React from 'react'
import AboutHero from './aboutHero/AboutHero'
import Story from './story/Story'
import MissionVision from './mission/MissionVision'

const About = () => {
  return (
    <div className='pt-16 lg:pt-20'>
      <AboutHero/>
      <Story/>
      <MissionVision/>
    </div>
  )
}

export default About
