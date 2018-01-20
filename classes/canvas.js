const Canvas = require('canvas')

class CanvasObj {
  constructor () {
  }
  get ctx () {
    return new Canvas().getContext('2d')
  }
  drawProfile () {
    let ctx = this.ctx
    
  }
}

module.exports = new CanvasObj()