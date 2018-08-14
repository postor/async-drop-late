let keys = {}, maxs = {}

module.exports = (promise, k = '') => {
  keys[k] = keys[k] || 0
  keys[k]++

  const thisSeq = keys[k]
  return promise.then((v) => {
    if (thisSeq < maxs[k] || 0) {
      return Promise.reject({
        message: 'this promise resolve too late',
        value: v,
        key: k,
      })
    }
    maxs[k] = thisSeq
    return v
  })
}