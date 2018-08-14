# async-drop-late

有同学在多次ajax的时候遇到了较早的请求后到导致数据不一致的问题，最好的方案当然是数据包含版本，但这个实现就不依赖后端也能确保数据不会被迟到的ajax结果覆盖

sometimes former ajax result may come late and over write the right data with outdated data, this package keeps the secquence, and reject when the former ajax comes late

## usage

```
const dropLate = require('async-drop-late')

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
```