let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.mapPolyfill) {
  Array.prototype.mapPolyfill = function (callbackFn, thisArg) {
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.mapPolyfill called on null or undefined');
    }
  
    if (typeof callbackFn !== 'function')
    {
      throw TypeError(`${callbackFn} is not a function`);
    }

    let mappedArray = []
  
    for (let i = 0; i < this.length; i++) 
    {
        mappedArray.push(callbackFn.call(thisArg, this[i], i, this))
    }

    return mappedArray
  };
}

let result1 = arr1.mapPolyfill(function func1(item, index){
  console.log(this)                      // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
  return item+1
})                                       // thisArg in line 12 will be undefined, since it is optional parameter for .call(), .call() will set global object as the context
console.log(result1)                     // (6) [70, 1021, 866, 421, 33, 4]

let result2 = arr1.mapPolyfill(function func1(item, index){
  console.log(this)                     // (6) [69, 1020, 865, 420, 32, 3] for each item
  return item+1
},arr1)                                 // thisArg in line 12 will be arr1 and that will be the execution context of callback (this)
console.log(result2)                    // (6) [70, 1021, 866, 421, 33, 4]

// let result3 = arr1.map(function func2(item, index){
//   console.log(this)
//   return item+1
// })
// console.log(result3)