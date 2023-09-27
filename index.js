#!/usr/bin/env node

import { execSync } from 'child_process'
import { createServer } from 'http'
import { createApp, createRouter } from 'h3'

const getVolume = () => parseInt(execSync("amixer -c MobilePre sget Speaker | egrep -o -m 1 '[0-9]{1,3}%'").slice(0,-1))
const setVolume = (volume) => parseInt(execSync(`amixer -c MobilePre sset Speaker ${volume}% | egrep -o -m 1 '[0-9]{1,3}%'`).slice(0,-1))

let lastSetVolume = getVolume()

const changeVolume = (difference) => {
  const previousVolume = getVolume()
  let newVolume
  try {
    newVolume = setVolume(previousVolume + difference)
    lastSetVolume = newVolume
  } catch (error) {
    console.error(error)
  }
  return {
    previousVolume,
    newVolume,
  }
}

const toggleMute = () => {
  const previousVolume = getVolume()
  let newVolume
  if (previousVolume === 0) {
    newVolume = lastSetVolume
  } else {
    newVolume = 0
  }
  try {
    newVolume = setVolume(newVolume)
  } catch (error) {
    console.error(error)
  }
  return {
    previousVolume,
    newVolume,
  }
}

const app = createApp()

const router = createRouter()
 .get('/', () => 'up and running')
 .get('/volume-up', () => changeVolume(10))
 .get('/volume-down', () => changeVolume(-10))
 .get('/volume-toggle-mute', () => toggleMute())

app.use(router)

createServer(app).listen(process.env.PORT || 3000)
