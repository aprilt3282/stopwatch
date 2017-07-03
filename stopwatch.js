//button controls 
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const lap = document.querySelector('button.lap')
const reset = document.querySelector('button.reset')

//DOM elements that needs to be updated
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

//constant that shouldn't ever change
const laps = []
const intervalRate = 10 // update the stopwatch every 10 milliseconds

//values that will change pretty often 
let intervalId = null //as stopwatch runs it will be an interval. this is where it is stored
let rawTime = 0 //The milliseconds that will run
let stopwatchRunning = false

//turns the time into a human readable format
function formatTime (raw) {
  function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds
  
return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}
  
// start the stopwatch by creating a new interval
// store the intervalId to manipulate the interval later
function stopwatchStart(event){
    event.preventDefault()
    console.log('started!')

    if (stopwatchRunning == false){
      stopwatchRunning = true
      // every 10 milliseconds, update the stopwatch
      intervalId = setInterval(stopwatchUpdate, intervalRate)
    }
} 
// adds the interval to the stopwatch time since the last "tick"
// updates the DOM with the new time
function stopwatchUpdate(){
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// pauses the stopwatch and clears the interval
function stopwatchStop(event){
  event.preventDefault()
  console.log('stopped!')

  stopwatchRunning = false
  clearInterval(intervalId)
}

// Records the current stopwatch time into an array which is a all lap times in a list
function stopwatchLap(){
    event.preventDefault()
    console.log('lap!')

    // console.log(stopwatchTime.innerHTML)
    // if the lap is clicked before starting the stopwatch or when the stopwatch
    // is reset do not display the laplist
    if (stopwatchTime.innerHTML == formatTime(0)){
      lapList.innerHTML = ""
    }
    else {
    laps.push(stopwatchTime.innerHTML) // adds the lap time to an array

    // displays the laps recorded in the lap array
    lapList.innerHTML = "" // clears the lap list to begin with
    for (i=0; i<laps.length; i++){
      var liLap = document.createElement("li")
      liLap.innerHTML = laps[i]
      lapList.appendChild(liLap)
    }
  }
}

// resets the stopwatch to beginning
function stopwatchReset(){
    event.preventDefault()
    console.log('reset!')

    stopwatchRunning = false
    clearInterval(intervalId) 
    stopwatchTime.innerHTML = formatTime(0)

    // deletes the lapList array items
    laps.length = 0
    
    // clears the lap list
    lapList.innerHTML = ""
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function (){
  console.log('ready!')
  stopwatchTime.innerHTML = formatTime(0) // initially display the stopwatch as _0:00.00_
  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", stopwatchLap)
  reset.addEventListener("click", stopwatchReset)
})
                         