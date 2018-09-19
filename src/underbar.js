(function(global) {
  'use strict';

  global._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = (val) => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) =>  n === undefined ? array[0] : array.slice(0, n)

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => n === undefined ? array[array.length - 1] : n === 0 ? [] : array.slice(-n)

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
      }
    } else {
      for (let prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = (collection, test) => {
    let filterredArr = [];

    _.each(collection, (value, element) => {
      if (test(value)) filterredArr.push(value);
    });

    return filterredArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => (_.filter(collection, x => !test(x)))
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

  // Produce a duplicate-free version of the array.
  _.uniq = (array) => {
    let uniqueArr = [];
    array = array.sort();

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== array[i+1]) uniqueArr.push(array[i]);
    }

    return uniqueArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let mappedArr = [];

    _.each(collection, (value) => mappedArr.push(iterator(value)));

    return mappedArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => _.map(collection, (item) => item[key])
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = (collection, iterator, accumulator) => {
    if (accumulator === undefined) {
      accumulator = collection[0];
      for (let i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      for (let value of collection) {
        accumulator = iterator(accumulator, value);
      }
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    collection = Object.values(collection);
    return _.reduce(collection, (wasFound, item) => {
      return (wasFound) ? true :  item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator) =>
    // TIP: Try re-using reduce() here.
    _.reduce(collection, (isEvery, item) => {
      iterator = iterator || _.identity;
      return (!iterator(item)) ? false : isEvery;
    }, true)


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator) =>
    // TIP: There's a very clever way to re-use every() here.
    _.reduce(collection, (isSome, item) => {
      iterator = iterator || _.identity;
      return (iterator(item)) ? true : isSome;
    }, false)

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    let extendedObj = arguments[0];

    for (let i = 1; i < arguments.length; i++) {
      for (let prop in arguments[i]) {
        extendedObj[prop] = arguments[i][prop];
      }
    }

    return extendedObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    let defaultObj = arguments[0];

    for (let i = 1; i < arguments.length; i++) {
      for (let prop in arguments[i]) {
        if (defaultObj[prop] === undefined) defaultObj[prop] = arguments[i][prop];
      }
    }

    return defaultObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = (func) => {
    let cache = {};

    return function() {
      var args = Object.values(arguments);

      if (!cache.hasOwnProperty(JSON.stringify(args))) {
        cache[JSON.stringify(args)] = func.apply(null, args);
      }
      return cache[JSON.stringify(args)]
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = (...args) => {
    setTimeout.apply(null, args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let shuffledArr = [];
    let randomIndex = Math.round(Math.random() * (array.length) + 1);

    for (var i = 0; i < array.length; i++) {
      shuffledArr.splice(randomIndex, 0, array[i]);
    }

    return shuffledArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = (collection, functionOrKey, args) => {
    if (typeof functionOrKey === 'function') {
      return _.map(collection, (element) => functionOrKey.call(element))
    } else if (typeof collection[0] === 'string') {
      return _.map(collection, (element) => String.prototype[functionOrKey].call(element))
    }
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  _.sortBy = function(collection, iterator) {
    let temp;

    if (typeof iterator !== 'function') {
      if (typeof String.prototype[iterator] === 'function') {
        iterator = String.prototype[iterator].call(x);
      } else {
        iterator = (x) => x.length;
      }
    }

    for (let i = 0; i < collection.length; i++) {
      for (let j = i + 1; j < collection.length; j++) {
        if (String(iterator(collection[i])) > String(iterator(collection[j]))) {
          temp = collection[i];
          collection[i] = collection[j]
          collection[j] = temp
        }
      }
    }
    return collection
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var temp = [];
    for (var i = 0; i < arguments.length; i++) {
      temp.push(arguments[i].length);
    }
    const maxLength = Math.max.apply(null, temp);

    let zippedArr = [];
    for (var i = 0; i < maxLength; i++) {
      var innerArr = [];
      for (var j = 0; j < arguments.length; j++) {
        innerArr.push(arguments[j][i]);
      }
      zippedArr.push(innerArr);
    }

    return zippedArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray, result) => {
    result = result || [];

    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        _.flatten(nestedArray[i], result);
      } else {
        result.push(nestedArray[i])
      }
    }

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let interArr = [];
    let firstArg = arguments[0];

    for (var i = 0; i < firstArg.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (_.contains(arguments[j], firstArg[i])) {
          interArr.push(firstArg[i]);
        }
      }
    }

    return interArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let diffArr = [];
    let firstArg = arguments[0];

    for (var i = 0; i < firstArg.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (_.contains(arguments[j], firstArg[i])) {
          firstArg.splice(i, 1, undefined);
        }
      }
    }
    return _.filter(firstArg, (value) => {
      if (value !== undefined) return value
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var alreadyCalled = true;

    return function() {
      if (alreadyCalled) {
        var t0 = performance.now();
        func.apply(this, arguments);
        var t1 = performance.now();

        if ((t1 - t0) * 1000 >= wait) {
          func.apply(this, arguments);
          alreadyCalled = false;
        }
        alreadyCalled = false;
      }
    }
  };

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = global._;
  }
}( typeof window !== "undefined" ? window : global ));
