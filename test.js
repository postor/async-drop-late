const dropLate = require('./index')

//first async, delay 2second, will resolve after second async and get dropped!
dropLate(delay(1500,'first'))
.then((v)=>console.log(`wrong!`,v))
.catch((e)=>console.log(`first async get dropped!`,e))

dropLate(delay(1000,'second'))
.then((v)=>console.log(`second async done`,v))
.catch((e)=>console.log(`wrong!`,e))

dropLate(delay(2000,'third'))
.then((v)=>console.log(`third async done`,v))
.catch((e)=>console.log(`wrong!`,e))


//different key won't mess up
dropLate(delay(500,'fuorth'),'testkey')
.then((v)=>console.log(`fuorth async with another key done`,v))
.catch((e)=>console.log(`wrong!`,e))


function delay(miliseconds,name){
  return new Promise((resolve)=>{
    setTimeout(()=>resolve(name),miliseconds)
  })
}