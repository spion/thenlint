# thenlint

A lint for promises that checks for possible `Promise.then` usage errors.

# usage

From the command-line:

    thenlint <file.js> [<other.js> ...]
    
As a library:

    report = require('thenlint')(fileContent, filename)
      .map(function(item) { return item.toString(); }).join('\n');
    
### example errors    

Suggests ending the promise chain with `.done()`

```js
// no return or var/assignment
promise.then(function(val) {
  console.log(val);
}); // no errback
// no catch and no .done()
```

Missing return statement in the middle of a return chain:

```js
promise.then(function(val) {
  // not returning from then
  console.log(val);
  
// but trying to chain another
// call to then/spread
}).then(function(other) {
  // anything
});
```

### non-errors

Adding catch instead of done is okay.

Not returning from within `.then` is okay as long as we're not trying
to chain another `.then` or `.spread`

```js
// no return or assignment
promise.then(function(val) {
  // no return...
  console.log(val);
// but has an error handler
// and is not trying to chain a .then/.spread
}).catch(function(err) {
  // anything
}); 
```


## license

MIT

