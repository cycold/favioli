(function () {
  'use strict';
  
  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  
  function unwrapExports (x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }
  
  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  
  var root = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  // CommonJS / Node have global context exposed as "global" variable.
  // We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
  // the global "global" var for now.
  var __window = typeof window !== 'undefined' && window;
  var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope && self;
  var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
  var _root = __window || __global || __self;
  exports.root = _root;
  // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
  // This is needed when used with angular/tsickle which inserts a goog.module statement.
  // Wrap in IIFE
  (function () {
      if (!_root) {
          throw new Error('RxJS could not find any global context (window, self, global)');
      }
  })();
  
  });
  
  unwrapExports(root);
  var root_1 = root.root;
  
  var isFunction_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isFunction(x) {
      return typeof x === 'function';
  }
  exports.isFunction = isFunction;
  
  });
  
  unwrapExports(isFunction_1);
  var isFunction_2 = isFunction_1.isFunction;
  
  var Observer = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.empty = {
      closed: true,
      next: function (value) { },
      error: function (err) { throw err; },
      complete: function () { }
  };
  
  });
  
  unwrapExports(Observer);
  var Observer_1 = Observer.empty;
  
  var isArray = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
  
  });
  
  unwrapExports(isArray);
  var isArray_1 = isArray.isArray;
  
  var isObject_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isObject(x) {
      return x != null && typeof x === 'object';
  }
  exports.isObject = isObject;
  
  });
  
  unwrapExports(isObject_1);
  var isObject_2 = isObject_1.isObject;
  
  var errorObject = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  // typeof any so that it we don't have to cast when comparing a result to the error object
  exports.errorObject = { e: {} };
  
  });
  
  unwrapExports(errorObject);
  var errorObject_1 = errorObject.errorObject;
  
  var tryCatch_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var tryCatchTarget;
  function tryCatcher() {
      try {
          return tryCatchTarget.apply(this, arguments);
      }
      catch (e) {
          errorObject.errorObject.e = e;
          return errorObject.errorObject;
      }
  }
  function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
  }
  exports.tryCatch = tryCatch;
  
  });
  
  unwrapExports(tryCatch_1);
  var tryCatch_2 = tryCatch_1.tryCatch;
  
  var UnsubscriptionError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An error thrown when one or more errors have occurred during the
   * `unsubscribe` of a {@link Subscription}.
   */
  var UnsubscriptionError = /** @class */ (function (_super) {
      __extends(UnsubscriptionError, _super);
      function UnsubscriptionError(errors) {
          var _this = _super.call(this, errors ?
              errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '') || this;
          _this.errors = errors;
          _this.name = 'UnsubscriptionError';
          Object.setPrototypeOf(_this, UnsubscriptionError.prototype);
          return _this;
      }
      return UnsubscriptionError;
  }(Error));
  exports.UnsubscriptionError = UnsubscriptionError;
  
  });
  
  unwrapExports(UnsubscriptionError_1);
  var UnsubscriptionError_2 = UnsubscriptionError_1.UnsubscriptionError;
  
  var Subscription_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  /**
   * Represents a disposable resource, such as the execution of an Observable. A
   * Subscription has one important method, `unsubscribe`, that takes no argument
   * and just disposes the resource held by the subscription.
   *
   * Additionally, subscriptions may be grouped together through the `add()`
   * method, which will attach a child Subscription to the current Subscription.
   * When a Subscription is unsubscribed, all its children (and its grandchildren)
   * will be unsubscribed as well.
   *
   * @class Subscription
   */
  var Subscription = /** @class */ (function () {
      /**
       * @param {function(): void} [unsubscribe] A function describing how to
       * perform the disposal of resources when the `unsubscribe` method is called.
       */
      function Subscription(unsubscribe) {
          /**
           * A flag to indicate whether this Subscription has already been unsubscribed.
           * @type {boolean}
           */
          this.closed = false;
          this._parent = null;
          this._parents = null;
          this._subscriptions = null;
          if (unsubscribe) {
              this._unsubscribe = unsubscribe;
          }
      }
      /**
       * Disposes the resources held by the subscription. May, for instance, cancel
       * an ongoing Observable execution or cancel any other type of work that
       * started when the Subscription was created.
       * @return {void}
       */
      Subscription.prototype.unsubscribe = function () {
          var hasErrors = false;
          var errors;
          if (this.closed) {
              return;
          }
          var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parent = null;
          this._parents = null;
          // null out _subscriptions first so any child subscriptions that attempt
          // to remove themselves from this subscription will noop
          this._subscriptions = null;
          var index = -1;
          var len = _parents ? _parents.length : 0;
          // if this._parent is null, then so is this._parents, and we
          // don't have to remove ourselves from any parent subscriptions.
          while (_parent) {
              _parent.remove(this);
              // if this._parents is null or index >= len,
              // then _parent is set to null, and the loop exits
              _parent = ++index < len && _parents[index] || null;
          }
          if (isFunction_1.isFunction(_unsubscribe)) {
              var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
              if (trial === errorObject.errorObject) {
                  hasErrors = true;
                  errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                      flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
              }
          }
          if (isArray.isArray(_subscriptions)) {
              index = -1;
              len = _subscriptions.length;
              while (++index < len) {
                  var sub = _subscriptions[index];
                  if (isObject_1.isObject(sub)) {
                      var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                      if (trial === errorObject.errorObject) {
                          hasErrors = true;
                          errors = errors || [];
                          var err = errorObject.errorObject.e;
                          if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                              errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                          }
                          else {
                              errors.push(err);
                          }
                      }
                  }
              }
          }
          if (hasErrors) {
              throw new UnsubscriptionError_1.UnsubscriptionError(errors);
          }
      };
      /**
       * Adds a tear down to be called during the unsubscribe() of this
       * Subscription.
       *
       * If the tear down being added is a subscription that is already
       * unsubscribed, is the same reference `add` is being called on, or is
       * `Subscription.EMPTY`, it will not be added.
       *
       * If this subscription is already in an `closed` state, the passed
       * tear down logic will be executed immediately.
       *
       * @param {TeardownLogic} teardown The additional logic to execute on
       * teardown.
       * @return {Subscription} Returns the Subscription used or created to be
       * added to the inner subscriptions list. This Subscription can be used with
       * `remove()` to remove the passed teardown logic from the inner subscriptions
       * list.
       */
      Subscription.prototype.add = function (teardown) {
          if (!teardown || (teardown === Subscription.EMPTY)) {
              return Subscription.EMPTY;
          }
          if (teardown === this) {
              return this;
          }
          var subscription = teardown;
          switch (typeof teardown) {
              case 'function':
                  subscription = new Subscription(teardown);
              case 'object':
                  if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                      return subscription;
                  }
                  else if (this.closed) {
                      subscription.unsubscribe();
                      return subscription;
                  }
                  else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                      var tmp = subscription;
                      subscription = new Subscription();
                      subscription._subscriptions = [tmp];
                  }
                  break;
              default:
                  throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
          }
          var subscriptions = this._subscriptions || (this._subscriptions = []);
          subscriptions.push(subscription);
          subscription._addParent(this);
          return subscription;
      };
      /**
       * Removes a Subscription from the internal list of subscriptions that will
       * unsubscribe during the unsubscribe process of this Subscription.
       * @param {Subscription} subscription The subscription to remove.
       * @return {void}
       */
      Subscription.prototype.remove = function (subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
              var subscriptionIndex = subscriptions.indexOf(subscription);
              if (subscriptionIndex !== -1) {
                  subscriptions.splice(subscriptionIndex, 1);
              }
          }
      };
      Subscription.prototype._addParent = function (parent) {
          var _a = this, _parent = _a._parent, _parents = _a._parents;
          if (!_parent || _parent === parent) {
              // If we don't have a parent, or the new parent is the same as the
              // current parent, then set this._parent to the new parent.
              this._parent = parent;
          }
          else if (!_parents) {
              // If there's already one parent, but not multiple, allocate an Array to
              // store the rest of the parent Subscriptions.
              this._parents = [parent];
          }
          else if (_parents.indexOf(parent) === -1) {
              // Only add the new parent to the _parents list if it's not already there.
              _parents.push(parent);
          }
      };
      Subscription.EMPTY = (function (empty) {
          empty.closed = true;
          return empty;
      }(new Subscription()));
      return Subscription;
  }());
  exports.Subscription = Subscription;
  function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
  }
  
  });
  
  unwrapExports(Subscription_1);
  var Subscription_2 = Subscription_1.Subscription;
  
  var rxSubscriber = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var Symbol = root.root.Symbol;
  exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
      Symbol.for('rxSubscriber') : '@@rxSubscriber';
  /**
   * @deprecated use rxSubscriber instead
   */
  exports.$$rxSubscriber = exports.rxSubscriber;
  
  });
  
  unwrapExports(rxSubscriber);
  var rxSubscriber_1 = rxSubscriber.rxSubscriber;
  var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;
  
  var Subscriber_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Implements the {@link Observer} interface and extends the
   * {@link Subscription} class. While the {@link Observer} is the public API for
   * consuming the values of an {@link Observable}, all Observers get converted to
   * a Subscriber, in order to provide Subscription-like capabilities such as
   * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
   * implementing operators, but it is rarely used as a public API.
   *
   * @class Subscriber<T>
   */
  var Subscriber = /** @class */ (function (_super) {
      __extends(Subscriber, _super);
      /**
       * @param {Observer|function(value: T): void} [destinationOrNext] A partially
       * defined Observer or a `next` callback function.
       * @param {function(e: ?any): void} [error] The `error` callback of an
       * Observer.
       * @param {function(): void} [complete] The `complete` callback of an
       * Observer.
       */
      function Subscriber(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this.isStopped = false;
          switch (arguments.length) {
              case 0:
                  _this.destination = Observer.empty;
                  break;
              case 1:
                  if (!destinationOrNext) {
                      _this.destination = Observer.empty;
                      break;
                  }
                  if (typeof destinationOrNext === 'object') {
                      if (destinationOrNext instanceof Subscriber) {
                          _this.destination = destinationOrNext;
                          _this.destination.add(_this);
                      }
                      else {
                          _this.destination = new SafeSubscriber(destinationOrNext);
                      }
                      break;
                  }
              default:
                  _this.destination = new SafeSubscriber(destinationOrNext, error, complete);
                  break;
          }
          return _this;
      }
      Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
      /**
       * A static factory for a Subscriber, given a (potentially partial) definition
       * of an Observer.
       * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
       * @param {function(e: ?any): void} [error] The `error` callback of an
       * Observer.
       * @param {function(): void} [complete] The `complete` callback of an
       * Observer.
       * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
       * Observer represented by the given arguments.
       */
      Subscriber.create = function (next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          return subscriber;
      };
      /**
       * The {@link Observer} callback to receive notifications of type `next` from
       * the Observable, with a value. The Observable may call this method 0 or more
       * times.
       * @param {T} [value] The `next` value.
       * @return {void}
       */
      Subscriber.prototype.next = function (value) {
          if (!this.isStopped) {
              this._next(value);
          }
      };
      /**
       * The {@link Observer} callback to receive notifications of type `error` from
       * the Observable, with an attached {@link Error}. Notifies the Observer that
       * the Observable has experienced an error condition.
       * @param {any} [err] The `error` exception.
       * @return {void}
       */
      Subscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              this.isStopped = true;
              this._error(err);
          }
      };
      /**
       * The {@link Observer} callback to receive a valueless notification of type
       * `complete` from the Observable. Notifies the Observer that the Observable
       * has finished sending push-based notifications.
       * @return {void}
       */
      Subscriber.prototype.complete = function () {
          if (!this.isStopped) {
              this.isStopped = true;
              this._complete();
          }
      };
      Subscriber.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function (value) {
          this.destination.next(value);
      };
      Subscriber.prototype._error = function (err) {
          this.destination.error(err);
          this.unsubscribe();
      };
      Subscriber.prototype._complete = function () {
          this.destination.complete();
          this.unsubscribe();
      };
      Subscriber.prototype._unsubscribeAndRecycle = function () {
          var _a = this, _parent = _a._parent, _parents = _a._parents;
          this._parent = null;
          this._parents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parent = _parent;
          this._parents = _parents;
          return this;
      };
      return Subscriber;
  }(Subscription_1.Subscription));
  exports.Subscriber = Subscriber;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SafeSubscriber = /** @class */ (function (_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          var next;
          var context = _this;
          if (isFunction_1.isFunction(observerOrNext)) {
              next = observerOrNext;
          }
          else if (observerOrNext) {
              next = observerOrNext.next;
              error = observerOrNext.error;
              complete = observerOrNext.complete;
              if (observerOrNext !== Observer.empty) {
                  context = Object.create(observerOrNext);
                  if (isFunction_1.isFunction(context.unsubscribe)) {
                      _this.add(context.unsubscribe.bind(context));
                  }
                  context.unsubscribe = _this.unsubscribe.bind(_this);
              }
          }
          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
      }
      SafeSubscriber.prototype.next = function (value) {
          if (!this.isStopped && this._next) {
              try {
                  this._next.call(this._context, value);
              }
              catch (err) {
                  this._hostReportError(err);
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              if (this._error) {
                  try {
                      this._error.call(this._context, err);
                  }
                  catch (err) {
                      this._hostReportError(err);
                  }
              }
              else {
                  this._hostReportError(err);
              }
              this.unsubscribe();
          }
      };
      SafeSubscriber.prototype.complete = function () {
          if (!this.isStopped) {
              if (this._complete) {
                  try {
                      this._complete.call(this._context);
                  }
                  catch (err) {
                      this._hostReportError(err);
                  }
              }
              this.unsubscribe();
          }
      };
      SafeSubscriber.prototype._unsubscribe = function () {
          this._context = null;
      };
      SafeSubscriber.prototype._hostReportError = function (err) {
          setTimeout(function () { throw err; });
      };
      return SafeSubscriber;
  }(Subscriber));
  
  });
  
  unwrapExports(Subscriber_1);
  var Subscriber_2 = Subscriber_1.Subscriber;
  
  var toSubscriber_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber_1.Subscriber) {
              return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber.rxSubscriber]) {
              return nextOrObserver[rxSubscriber.rxSubscriber]();
          }
      }
      if (!nextOrObserver && !error && !complete) {
          return new Subscriber_1.Subscriber(Observer.empty);
      }
      return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
  
  });
  
  unwrapExports(toSubscriber_1);
  var toSubscriber_2 = toSubscriber_1.toSubscriber;
  
  var observable = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function getSymbolObservable(context) {
      var $$observable;
      var Symbol = context.Symbol;
      if (typeof Symbol === 'function') {
          if (Symbol.observable) {
              $$observable = Symbol.observable;
          }
          else {
              $$observable = Symbol('observable');
              Symbol.observable = $$observable;
          }
      }
      else {
          $$observable = '@@observable';
      }
      return $$observable;
  }
  exports.getSymbolObservable = getSymbolObservable;
  exports.observable = getSymbolObservable(root.root);
  /**
   * @deprecated use observable instead
   */
  exports.$$observable = exports.observable;
  
  });
  
  unwrapExports(observable);
  var observable_1 = observable.getSymbolObservable;
  var observable_2 = observable.observable;
  var observable_3 = observable.$$observable;
  
  var noop_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /* tslint:disable:no-empty */
  function noop() { }
  exports.noop = noop;
  
  });
  
  unwrapExports(noop_1);
  var noop_2 = noop_1.noop;
  
  var pipe_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
  }
  exports.pipe = pipe;
  /* @internal */
  function pipeFromArray(fns) {
      if (!fns) {
          return noop_1.noop;
      }
      if (fns.length === 1) {
          return fns[0];
      }
      return function piped(input) {
          return fns.reduce(function (prev, fn) { return fn(prev); }, input);
      };
  }
  exports.pipeFromArray = pipeFromArray;
  
  });
  
  unwrapExports(pipe_1);
  var pipe_2 = pipe_1.pipe;
  var pipe_3 = pipe_1.pipeFromArray;
  
  var Observable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * A representation of any set of values over any amount of time. This is the most basic building block
   * of RxJS.
   *
   * @class Observable<T>
   */
  var Observable = /** @class */ (function () {
      /**
       * @constructor
       * @param {Function} subscribe the function that is called when the Observable is
       * initially subscribed to. This function is given a Subscriber, to which new values
       * can be `next`ed, or an `error` method can be called to raise an error, or
       * `complete` can be called to notify of a successful completion.
       */
      function Observable(subscribe) {
          this._isScalar = false;
          if (subscribe) {
              this._subscribe = subscribe;
          }
      }
      /**
       * Creates a new Observable, with this Observable as the source, and the passed
       * operator defined as the new observable's operator.
       * @method lift
       * @param {Operator} operator the operator defining the operation to take on the observable
       * @return {Observable} a new observable with the Operator applied
       */
      Observable.prototype.lift = function (operator) {
          var observable$$1 = new Observable();
          observable$$1.source = this;
          observable$$1.operator = operator;
          return observable$$1;
      };
      /**
       * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
       *
       * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
       *
       * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
       * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
       * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
       * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
       * thought.
       *
       * Apart from starting the execution of an Observable, this method allows you to listen for values
       * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
       * following ways.
       *
       * The first way is creating an object that implements {@link Observer} interface. It should have methods
       * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
       * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
       * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
       * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
       * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
       * be left uncaught.
       *
       * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
       * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
       * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
       * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
       * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
       * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
       *
       * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
       * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
       * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
       * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
       *
       * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
       * It is an Observable itself that decides when these functions will be called. For example {@link of}
       * by default emits all its values synchronously. Always check documentation for how given Observable
       * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
       *
       * @example <caption>Subscribe with an Observer</caption>
       * const sumObserver = {
       *   sum: 0,
       *   next(value) {
       *     console.log('Adding: ' + value);
       *     this.sum = this.sum + value;
       *   },
       *   error() { // We actually could just remove this method,
       *   },        // since we do not really care about errors right now.
       *   complete() {
       *     console.log('Sum equals: ' + this.sum);
       *   }
       * };
       *
       * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
       * .subscribe(sumObserver);
       *
       * // Logs:
       * // "Adding: 1"
       * // "Adding: 2"
       * // "Adding: 3"
       * // "Sum equals: 6"
       *
       *
       * @example <caption>Subscribe with functions</caption>
       * let sum = 0;
       *
       * Rx.Observable.of(1, 2, 3)
       * .subscribe(
       *   function(value) {
       *     console.log('Adding: ' + value);
       *     sum = sum + value;
       *   },
       *   undefined,
       *   function() {
       *     console.log('Sum equals: ' + sum);
       *   }
       * );
       *
       * // Logs:
       * // "Adding: 1"
       * // "Adding: 2"
       * // "Adding: 3"
       * // "Sum equals: 6"
       *
       *
       * @example <caption>Cancel a subscription</caption>
       * const subscription = Rx.Observable.interval(1000).subscribe(
       *   num => console.log(num),
       *   undefined,
       *   () => console.log('completed!') // Will not be called, even
       * );                                // when cancelling subscription
       *
       *
       * setTimeout(() => {
       *   subscription.unsubscribe();
       *   console.log('unsubscribed!');
       * }, 2500);
       *
       * // Logs:
       * // 0 after 1s
       * // 1 after 2s
       * // "unsubscribed!" after 2.5s
       *
       *
       * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
       *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
       *  Observable.
       * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
       *  the error will be thrown as unhandled.
       * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
       * @return {ISubscription} a subscription reference to the registered handlers
       * @method subscribe
       */
      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
          var operator = this.operator;
          var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
          if (operator) {
              operator.call(sink, this.source);
          }
          else {
              sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
          }
          return sink;
      };
      Observable.prototype._trySubscribe = function (sink) {
          try {
              return this._subscribe(sink);
          }
          catch (err) {
              sink.error(err);
          }
      };
      /**
       * @method forEach
       * @param {Function} next a handler for each value emitted by the observable
       * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
       * @return {Promise} a promise that either resolves on observable completion or
       *  rejects with the handled error
       */
      Observable.prototype.forEach = function (next, PromiseCtor) {
          var _this = this;
          if (!PromiseCtor) {
              if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                  PromiseCtor = root.root.Rx.config.Promise;
              }
              else if (root.root.Promise) {
                  PromiseCtor = root.root.Promise;
              }
          }
          if (!PromiseCtor) {
              throw new Error('no Promise impl found');
          }
          return new PromiseCtor(function (resolve, reject) {
              // Must be declared in a separate statement to avoid a RefernceError when
              // accessing subscription below in the closure due to Temporal Dead Zone.
              var subscription;
              subscription = _this.subscribe(function (value) {
                  try {
                      next(value);
                  }
                  catch (err) {
                      reject(err);
                      if (subscription) {
                          subscription.unsubscribe();
                      }
                  }
              }, reject, resolve);
          });
      };
      Observable.prototype._subscribe = function (subscriber) {
          return this.source.subscribe(subscriber);
      };
      /**
       * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
       * @method Symbol.observable
       * @return {Observable} this instance of the observable
       */
      Observable.prototype[observable.observable] = function () {
          return this;
      };
      /* tslint:enable:max-line-length */
      /**
       * Used to stitch together functional operators into a chain.
       * @method pipe
       * @return {Observable} the Observable result of all of the operators having
       * been called in the order they were passed in.
       *
       * @example
       *
       * import { map, filter, scan } from 'rxjs/internal/operators';
       *
       * Rx.Observable.interval(1000)
       *   .pipe(
       *     filter(x => x % 2 === 0),
       *     map(x => x + x),
       *     scan((acc, x) => acc + x)
       *   )
       *   .subscribe(x => console.log(x))
       */
      Observable.prototype.pipe = function () {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
          }
          if (operations.length === 0) {
              return this;
          }
          return pipe_1.pipeFromArray(operations)(this);
      };
      /* tslint:enable:max-line-length */
      Observable.prototype.toPromise = function (PromiseCtor) {
          var _this = this;
          if (!PromiseCtor) {
              if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                  PromiseCtor = root.root.Rx.config.Promise;
              }
              else if (root.root.Promise) {
                  PromiseCtor = root.root.Promise;
              }
          }
          if (!PromiseCtor) {
              throw new Error('no Promise impl found');
          }
          return new PromiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
          });
      };
      // HACK: Since TypeScript inherits static properties too, we have to
      // fight against TypeScript here so Subject can have a different static create signature
      /**
       * Creates a new cold Observable by calling the Observable constructor
       * @static true
       * @owner Observable
       * @method create
       * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
       * @return {Observable} a new cold observable
       */
      Observable.create = function (subscribe) {
          return new Observable(subscribe);
      };
      return Observable;
  }());
  exports.Observable = Observable;
  
  });
  
  unwrapExports(Observable_1);
  var Observable_2 = Observable_1.Observable;
  
  var ObjectUnsubscribedError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An error thrown when an action is invalid because the object has been
   * unsubscribed.
   *
   * @see {@link Subject}
   * @see {@link BehaviorSubject}
   *
   * @class ObjectUnsubscribedError
   */
  var ObjectUnsubscribedError = /** @class */ (function (_super) {
      __extends(ObjectUnsubscribedError, _super);
      function ObjectUnsubscribedError() {
          var _this = _super.call(this, 'object unsubscribed') || this;
          _this.name = 'ObjectUnsubscribedError';
          Object.setPrototypeOf(_this, ObjectUnsubscribedError.prototype);
          return _this;
      }
      return ObjectUnsubscribedError;
  }(Error));
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
  
  });
  
  unwrapExports(ObjectUnsubscribedError_1);
  var ObjectUnsubscribedError_2 = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
  
  var SubjectSubscription_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SubjectSubscription = /** @class */ (function (_super) {
      __extends(SubjectSubscription, _super);
      function SubjectSubscription(subject, subscriber) {
          var _this = _super.call(this) || this;
          _this.subject = subject;
          _this.subscriber = subscriber;
          _this.closed = false;
          return _this;
      }
      SubjectSubscription.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.closed = true;
          var subject = this.subject;
          var observers = subject.observers;
          this.subject = null;
          if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
              return;
          }
          var subscriberIndex = observers.indexOf(this.subscriber);
          if (subscriberIndex !== -1) {
              observers.splice(subscriberIndex, 1);
          }
      };
      return SubjectSubscription;
  }(Subscription_1.Subscription));
  exports.SubjectSubscription = SubjectSubscription;
  
  });
  
  unwrapExports(SubjectSubscription_1);
  var SubjectSubscription_2 = SubjectSubscription_1.SubjectSubscription;
  
  var Subject_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  /**
   * @class SubjectSubscriber<T>
   */
  var SubjectSubscriber = /** @class */ (function (_super) {
      __extends(SubjectSubscriber, _super);
      function SubjectSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          return _this;
      }
      return SubjectSubscriber;
  }(Subscriber_1.Subscriber));
  exports.SubjectSubscriber = SubjectSubscriber;
  /**
   * @class Subject<T>
   */
  var Subject = /** @class */ (function (_super) {
      __extends(Subject, _super);
      function Subject() {
          var _this = _super.call(this) || this;
          _this.observers = [];
          _this.closed = false;
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
      }
      Subject.prototype[rxSubscriber.rxSubscriber] = function () {
          return new SubjectSubscriber(this);
      };
      Subject.prototype.lift = function (operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
      };
      Subject.prototype.next = function (value) {
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          if (!this.isStopped) {
              var observers = this.observers;
              var len = observers.length;
              var copy = observers.slice();
              for (var i = 0; i < len; i++) {
                  copy[i].next(value);
              }
          }
      };
      Subject.prototype.error = function (err) {
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.hasError = true;
          this.thrownError = err;
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].error(err);
          }
          this.observers.length = 0;
      };
      Subject.prototype.complete = function () {
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].complete();
          }
          this.observers.length = 0;
      };
      Subject.prototype.unsubscribe = function () {
          this.isStopped = true;
          this.closed = true;
          this.observers = null;
      };
      Subject.prototype._trySubscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          else {
              return _super.prototype._trySubscribe.call(this, subscriber);
          }
      };
      Subject.prototype._subscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          else if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription_1.Subscription.EMPTY;
          }
          else if (this.isStopped) {
              subscriber.complete();
              return Subscription_1.Subscription.EMPTY;
          }
          else {
              this.observers.push(subscriber);
              return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
          }
      };
      Subject.prototype.asObservable = function () {
          var observable = new Observable_1.Observable();
          observable.source = this;
          return observable;
      };
      Subject.create = function (destination, source) {
          return new AnonymousSubject(destination, source);
      };
      return Subject;
  }(Observable_1.Observable));
  exports.Subject = Subject;
  /**
   * @class AnonymousSubject<T>
   */
  var AnonymousSubject = /** @class */ (function (_super) {
      __extends(AnonymousSubject, _super);
      function AnonymousSubject(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
      }
      AnonymousSubject.prototype.next = function (value) {
          var destination = this.destination;
          if (destination && destination.next) {
              destination.next(value);
          }
      };
      AnonymousSubject.prototype.error = function (err) {
          var destination = this.destination;
          if (destination && destination.error) {
              this.destination.error(err);
          }
      };
      AnonymousSubject.prototype.complete = function () {
          var destination = this.destination;
          if (destination && destination.complete) {
              this.destination.complete();
          }
      };
      AnonymousSubject.prototype._subscribe = function (subscriber) {
          var source = this.source;
          if (source) {
              return this.source.subscribe(subscriber);
          }
          else {
              return Subscription_1.Subscription.EMPTY;
          }
      };
      return AnonymousSubject;
  }(Subject));
  exports.AnonymousSubject = AnonymousSubject;
  
  });
  
  unwrapExports(Subject_1);
  var Subject_2 = Subject_1.SubjectSubscriber;
  var Subject_3 = Subject_1.Subject;
  var Subject_4 = Subject_1.AnonymousSubject;
  
  var AsyncSubject_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * @class AsyncSubject<T>
   */
  var AsyncSubject = /** @class */ (function (_super) {
      __extends(AsyncSubject, _super);
      function AsyncSubject() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.value = null;
          _this.hasNext = false;
          _this.hasCompleted = false;
          return _this;
      }
      AsyncSubject.prototype._subscribe = function (subscriber) {
          if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription_1.Subscription.EMPTY;
          }
          else if (this.hasCompleted && this.hasNext) {
              subscriber.next(this.value);
              subscriber.complete();
              return Subscription_1.Subscription.EMPTY;
          }
          return _super.prototype._subscribe.call(this, subscriber);
      };
      AsyncSubject.prototype.next = function (value) {
          if (!this.hasCompleted) {
              this.value = value;
              this.hasNext = true;
          }
      };
      AsyncSubject.prototype.error = function (error) {
          if (!this.hasCompleted) {
              _super.prototype.error.call(this, error);
          }
      };
      AsyncSubject.prototype.complete = function () {
          this.hasCompleted = true;
          if (this.hasNext) {
              _super.prototype.next.call(this, this.value);
          }
          _super.prototype.complete.call(this);
      };
      return AsyncSubject;
  }(Subject_1.Subject));
  exports.AsyncSubject = AsyncSubject;
  
  });
  
  unwrapExports(AsyncSubject_1);
  var AsyncSubject_2 = AsyncSubject_1.AsyncSubject;
  
  var BoundCallbackObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var BoundCallbackObservable = /** @class */ (function (_super) {
      __extends(BoundCallbackObservable, _super);
      function BoundCallbackObservable(callbackFunc, selector, args, context, scheduler) {
          var _this = _super.call(this) || this;
          _this.callbackFunc = callbackFunc;
          _this.selector = selector;
          _this.args = args;
          _this.context = context;
          _this.scheduler = scheduler;
          return _this;
      }
      /* tslint:enable:max-line-length */
      /**
       * Converts a callback API to a function that returns an Observable.
       *
       * <span class="informal">Give it a function `f` of type `f(x, callback)` and
       * it will return a function `g` that when called as `g(x)` will output an
       * Observable.</span>
       *
       * `bindCallback` is not an operator because its input and output are not
       * Observables. The input is a function `func` with some parameters, the
       * last parameter must be a callback function that `func` calls when it is
       * done.
       *
       * The output of `bindCallback` is a function that takes the same parameters
       * as `func`, except the last one (the callback). When the output function
       * is called with arguments it will return an Observable. If function `func`
       * calls its callback with one argument the Observable will emit that value.
       * If on the other hand the callback is called with multiple values the resulting
       * Observable will emit an array with said values as arguments.
       *
       * It is very important to remember that input function `func` is not called
       * when the output function is, but rather when the Observable returned by the output
       * function is subscribed. This means if `func` makes an AJAX request, that request
       * will be made every time someone subscribes to the resulting Observable, but not before.
       *
       * Optionally, a selector function can be passed to `bindObservable`. The selector function
       * takes the same arguments as the callback and returns the value that will be emitted by the Observable.
       * Even though by default multiple arguments passed to callback appear in the stream as an array
       * the selector function will be called with arguments directly, just as the callback would.
       * This means you can imagine the default selector (when one is not provided explicitly)
       * as a function that aggregates all its arguments into an array, or simply returns first argument
       * if there is only one.
       *
       * The last optional parameter - {@link Scheduler} - can be used to control when the call
       * to `func` happens after someone subscribes to Observable, as well as when results
       * passed to callback will be emitted. By default, the subscription to  an Observable calls `func`
       * synchronously, but using `Scheduler.async` as the last parameter will defer the call to `func`,
       * just like wrapping the call in `setTimeout` with a timeout of `0` would. If you use the async Scheduler
       * and call `subscribe` on the output Observable all function calls that are currently executing
       * will end before `func` is invoked.
       *
       * By default results passed to the callback are emitted immediately after `func` invokes the callback.
       * In particular, if the callback is called synchronously the subscription of the resulting Observable
       * will call the `next` function synchronously as well.  If you want to defer that call,
       * you may use `Scheduler.async` just as before.  This means that by using `Scheduler.async` you can
       * ensure that `func` always calls its callback asynchronously, thus avoiding terrifying Zalgo.
       *
       * Note that the Observable created by the output function will always emit a single value
       * and then complete immediately. If `func` calls the callback multiple times, values from subsequent
       * calls will not appear in the stream. If you need to listen for multiple calls,
       *  you probably want to use {@link fromEvent} or {@link fromEventPattern} instead.
       *
       * If `func` depends on some context (`this` property) and is not already bound the context of `func`
       * will be the context that the output function has at call time. In particular, if `func`
       * is called as a method of some objec and if `func` is not already bound, in order to preserve the context
       * it is recommended that the context of the output function is set to that object as well.
       *
       * If the input function calls its callback in the "node style" (i.e. first argument to callback is
       * optional error parameter signaling whether the call failed or not), {@link bindNodeCallback}
       * provides convenient error handling and probably is a better choice.
       * `bindCallback` will treat such functions the same as any other and error parameters
       * (whether passed or not) will always be interpreted as regular callback argument.
       *
       *
       * @example <caption>Convert jQuery's getJSON to an Observable API</caption>
       * // Suppose we have jQuery.getJSON('/my/url', callback)
       * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
       * var result = getJSONAsObservable('/my/url');
       * result.subscribe(x => console.log(x), e => console.error(e));
       *
       *
       * @example <caption>Receive an array of arguments passed to a callback</caption>
       * someFunction((a, b, c) => {
       *   console.log(a); // 5
       *   console.log(b); // 'some string'
       *   console.log(c); // {someProperty: 'someValue'}
       * });
       *
       * const boundSomeFunction = Rx.Observable.bindCallback(someFunction);
       * boundSomeFunction().subscribe(values => {
       *   console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
       * });
       *
       *
       * @example <caption>Use bindCallback with a selector function</caption>
       * someFunction((a, b, c) => {
       *   console.log(a); // 'a'
       *   console.log(b); // 'b'
       *   console.log(c); // 'c'
       * });
       *
       * const boundSomeFunction = Rx.Observable.bindCallback(someFunction, (a, b, c) => a + b + c);
       * boundSomeFunction().subscribe(value => {
       *   console.log(value) // 'abc'
       * });
       *
       *
       * @example <caption>Compare behaviour with and without async Scheduler</caption>
       * function iCallMyCallbackSynchronously(cb) {
       *   cb();
       * }
       *
       * const boundSyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously);
       * const boundAsyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously, null, Rx.Scheduler.async);
       *
       * boundSyncFn().subscribe(() => console.log('I was sync!'));
       * boundAsyncFn().subscribe(() => console.log('I was async!'));
       * console.log('This happened...');
       *
       * // Logs:
       * // I was sync!
       * // This happened...
       * // I was async!
       *
       *
       * @example <caption>Use bindCallback on an object method</caption>
       * const boundMethod = Rx.Observable.bindCallback(someObject.methodWithCallback);
       * boundMethod.call(someObject) // make sure methodWithCallback has access to someObject
       * .subscribe(subscriber);
       *
       *
       * @see {@link bindNodeCallback}
       * @see {@link from}
       * @see {@link fromPromise}
       *
       * @param {function} func A function with a callback as the last parameter.
       * @param {function} [selector] A function which takes the arguments from the
       * callback and maps them to a value that is emitted on the output Observable.
       * @param {Scheduler} [scheduler] The scheduler on which to schedule the
       * callbacks.
       * @return {function(...params: *): Observable} A function which returns the
       * Observable that delivers the same values the callback would deliver.
       * @static true
       * @name bindCallback
       * @owner Observable
       */
      BoundCallbackObservable.create = function (func, selector, scheduler) {
          if (selector === void 0) { selector = undefined; }
          return function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new BoundCallbackObservable(func, selector, args, this, scheduler);
          };
      };
      BoundCallbackObservable.prototype._subscribe = function (subscriber) {
          var callbackFunc = this.callbackFunc;
          var args = this.args;
          var scheduler = this.scheduler;
          var subject = this.subject;
          if (!scheduler) {
              if (!subject) {
                  subject = this.subject = new AsyncSubject_1.AsyncSubject();
                  var handler = function handlerFn() {
                      var innerArgs = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                          innerArgs[_i] = arguments[_i];
                      }
                      var source = handlerFn.source;
                      var selector = source.selector, subject = source.subject;
                      if (selector) {
                          var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                          if (result_1 === errorObject.errorObject) {
                              subject.error(errorObject.errorObject.e);
                          }
                          else {
                              subject.next(result_1);
                              subject.complete();
                          }
                      }
                      else {
                          subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                          subject.complete();
                      }
                  };
                  // use named function instance to avoid closure.
                  handler.source = this;
                  var result = tryCatch_1.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
                  if (result === errorObject.errorObject) {
                      subject.error(errorObject.errorObject.e);
                  }
              }
              return subject.subscribe(subscriber);
          }
          else {
              return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
          }
      };
      BoundCallbackObservable.dispatch = function (state) {
          var self = this;
          var source = state.source, subscriber = state.subscriber, context = state.context;
          var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
          var subject = source.subject;
          if (!subject) {
              subject = source.subject = new AsyncSubject_1.AsyncSubject();
              var handler = function handlerFn() {
                  var innerArgs = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                      innerArgs[_i] = arguments[_i];
                  }
                  var source = handlerFn.source;
                  var selector = source.selector, subject = source.subject;
                  if (selector) {
                      var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                      if (result_2 === errorObject.errorObject) {
                          self.add(scheduler.schedule(dispatchError, 0, { err: errorObject.errorObject.e, subject: subject }));
                      }
                      else {
                          self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                      }
                  }
                  else {
                      var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                      self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                  }
              };
              // use named function to pass values in without closure
              handler.source = source;
              var result = tryCatch_1.tryCatch(callbackFunc).apply(context, args.concat(handler));
              if (result === errorObject.errorObject) {
                  subject.error(errorObject.errorObject.e);
              }
          }
          self.add(subject.subscribe(subscriber));
      };
      return BoundCallbackObservable;
  }(Observable_1.Observable));
  exports.BoundCallbackObservable = BoundCallbackObservable;
  function dispatchNext(arg) {
      var value = arg.value, subject = arg.subject;
      subject.next(value);
      subject.complete();
  }
  function dispatchError(arg) {
      var err = arg.err, subject = arg.subject;
      subject.error(err);
  }
  
  });
  
  unwrapExports(BoundCallbackObservable_1);
  var BoundCallbackObservable_2 = BoundCallbackObservable_1.BoundCallbackObservable;
  
  var bindCallback = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.bindCallback = BoundCallbackObservable_1.BoundCallbackObservable.create;
  
  });
  
  unwrapExports(bindCallback);
  var bindCallback_1 = bindCallback.bindCallback;
  
  var bindCallback$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.bindCallback = bindCallback.bindCallback;
  
  });
  
  unwrapExports(bindCallback$2);
  
  var BoundNodeCallbackObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var BoundNodeCallbackObservable = /** @class */ (function (_super) {
      __extends(BoundNodeCallbackObservable, _super);
      function BoundNodeCallbackObservable(callbackFunc, selector, args, context, scheduler) {
          var _this = _super.call(this) || this;
          _this.callbackFunc = callbackFunc;
          _this.selector = selector;
          _this.args = args;
          _this.context = context;
          _this.scheduler = scheduler;
          return _this;
      }
      /* tslint:enable:max-line-length */
      /**
       * Converts a Node.js-style callback API to a function that returns an
       * Observable.
       *
       * <span class="informal">It's just like {@link bindCallback}, but the
       * callback is expected to be of type `callback(error, result)`.</span>
       *
       * `bindNodeCallback` is not an operator because its input and output are not
       * Observables. The input is a function `func` with some parameters, but the
       * last parameter must be a callback function that `func` calls when it is
       * done. The callback function is expected to follow Node.js conventions,
       * where the first argument to the callback is an error object, signaling
       * whether call was successful. If that object is passed to callback, it means
       * something went wrong.
       *
       * The output of `bindNodeCallback` is a function that takes the same
       * parameters as `func`, except the last one (the callback). When the output
       * function is called with arguments, it will return an Observable.
       * If `func` calls its callback with error parameter present, Observable will
       * error with that value as well. If error parameter is not passed, Observable will emit
       * second parameter. If there are more parameters (third and so on),
       * Observable will emit an array with all arguments, except first error argument.
       *
       * Optionally `bindNodeCallback` accepts selector function, which allows you to
       * make resulting Observable emit value computed by selector, instead of regular
       * callback arguments. It works similarly to {@link bindCallback} selector, but
       * Node.js-style error argument will never be passed to that function.
       *
       * Note that `func` will not be called at the same time output function is,
       * but rather whenever resulting Observable is subscribed. By default call to
       * `func` will happen synchronously after subscription, but that can be changed
       * with proper {@link Scheduler} provided as optional third parameter. Scheduler
       * can also control when values from callback will be emitted by Observable.
       * To find out more, check out documentation for {@link bindCallback}, where
       * Scheduler works exactly the same.
       *
       * As in {@link bindCallback}, context (`this` property) of input function will be set to context
       * of returned function, when it is called.
       *
       * After Observable emits value, it will complete immediately. This means
       * even if `func` calls callback again, values from second and consecutive
       * calls will never appear on the stream. If you need to handle functions
       * that call callbacks multiple times, check out {@link fromEvent} or
       * {@link fromEventPattern} instead.
       *
       * Note that `bindNodeCallback` can be used in non-Node.js environments as well.
       * "Node.js-style" callbacks are just a convention, so if you write for
       * browsers or any other environment and API you use implements that callback style,
       * `bindNodeCallback` can be safely used on that API functions as well.
       *
       * Remember that Error object passed to callback does not have to be an instance
       * of JavaScript built-in `Error` object. In fact, it does not even have to an object.
       * Error parameter of callback function is interpreted as "present", when value
       * of that parameter is truthy. It could be, for example, non-zero number, non-empty
       * string or boolean `true`. In all of these cases resulting Observable would error
       * with that value. This means usually regular style callbacks will fail very often when
       * `bindNodeCallback` is used. If your Observable errors much more often then you
       * would expect, check if callback really is called in Node.js-style and, if not,
       * switch to {@link bindCallback} instead.
       *
       * Note that even if error parameter is technically present in callback, but its value
       * is falsy, it still won't appear in array emitted by Observable or in selector function.
       *
       *
       * @example <caption>Read a file from the filesystem and get the data as an Observable</caption>
       * import * as fs from 'fs';
       * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
       * var result = readFileAsObservable('./roadNames.txt', 'utf8');
       * result.subscribe(x => console.log(x), e => console.error(e));
       *
       *
       * @example <caption>Use on function calling callback with multiple arguments</caption>
       * someFunction((err, a, b) => {
       *   console.log(err); // null
       *   console.log(a); // 5
       *   console.log(b); // "some string"
       * });
       * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
       * boundSomeFunction()
       * .subscribe(value => {
       *   console.log(value); // [5, "some string"]
       * });
       *
       *
       * @example <caption>Use with selector function</caption>
       * someFunction((err, a, b) => {
       *   console.log(err); // undefined
       *   console.log(a); // "abc"
       *   console.log(b); // "DEF"
       * });
       * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction, (a, b) => a + b);
       * boundSomeFunction()
       * .subscribe(value => {
       *   console.log(value); // "abcDEF"
       * });
       *
       *
       * @example <caption>Use on function calling callback in regular style</caption>
       * someFunction(a => {
       *   console.log(a); // 5
       * });
       * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
       * boundSomeFunction()
       * .subscribe(
       *   value => {}             // never gets called
       *   err => console.log(err) // 5
       *);
       *
       *
       * @see {@link bindCallback}
       * @see {@link from}
       * @see {@link fromPromise}
       *
       * @param {function} func Function with a Node.js-style callback as the last parameter.
       * @param {function} [selector] A function which takes the arguments from the
       * callback and maps those to a value to emit on the output Observable.
       * @param {Scheduler} [scheduler] The scheduler on which to schedule the
       * callbacks.
       * @return {function(...params: *): Observable} A function which returns the
       * Observable that delivers the same values the Node.js callback would
       * deliver.
       * @static true
       * @name bindNodeCallback
       * @owner Observable
       */
      BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
          if (selector === void 0) { selector = undefined; }
          return function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new BoundNodeCallbackObservable(func, selector, args, this, scheduler);
          };
      };
      BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
          var callbackFunc = this.callbackFunc;
          var args = this.args;
          var scheduler = this.scheduler;
          var subject = this.subject;
          if (!scheduler) {
              if (!subject) {
                  subject = this.subject = new AsyncSubject_1.AsyncSubject();
                  var handler = function handlerFn() {
                      var innerArgs = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                          innerArgs[_i] = arguments[_i];
                      }
                      var source = handlerFn.source;
                      var selector = source.selector, subject = source.subject;
                      var err = innerArgs.shift();
                      if (err) {
                          subject.error(err);
                      }
                      else if (selector) {
                          var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                          if (result_1 === errorObject.errorObject) {
                              subject.error(errorObject.errorObject.e);
                          }
                          else {
                              subject.next(result_1);
                              subject.complete();
                          }
                      }
                      else {
                          subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                          subject.complete();
                      }
                  };
                  // use named function instance to avoid closure.
                  handler.source = this;
                  var result = tryCatch_1.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
                  if (result === errorObject.errorObject) {
                      subject.error(errorObject.errorObject.e);
                  }
              }
              return subject.subscribe(subscriber);
          }
          else {
              return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
          }
      };
      return BoundNodeCallbackObservable;
  }(Observable_1.Observable));
  exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
  function dispatch(state) {
      var self = this;
      var source = state.source, subscriber = state.subscriber, context = state.context;
      // XXX: cast to `any` to access to the private field in `source`.
      var _a = source, callbackFunc = _a.callbackFunc, args = _a.args, scheduler = _a.scheduler;
      var subject = source.subject;
      if (!subject) {
          subject = source.subject = new AsyncSubject_1.AsyncSubject();
          var handler = function handlerFn() {
              var innerArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  innerArgs[_i] = arguments[_i];
              }
              var source = handlerFn.source;
              var selector = source.selector, subject = source.subject;
              var err = innerArgs.shift();
              if (err) {
                  self.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
              }
              else if (selector) {
                  var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                  if (result_2 === errorObject.errorObject) {
                      self.add(scheduler.schedule(dispatchError, 0, { err: errorObject.errorObject.e, subject: subject }));
                  }
                  else {
                      self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
                  }
              }
              else {
                  var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                  self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
              }
          };
          // use named function to pass values in without closure
          handler.source = source;
          var result = tryCatch_1.tryCatch(callbackFunc).apply(context, args.concat(handler));
          if (result === errorObject.errorObject) {
              self.add(scheduler.schedule(dispatchError, 0, { err: errorObject.errorObject.e, subject: subject }));
          }
      }
      self.add(subject.subscribe(subscriber));
  }
  function dispatchNext(arg) {
      var value = arg.value, subject = arg.subject;
      subject.next(value);
      subject.complete();
  }
  function dispatchError(arg) {
      var err = arg.err, subject = arg.subject;
      subject.error(err);
  }
  
  });
  
  unwrapExports(BoundNodeCallbackObservable_1);
  var BoundNodeCallbackObservable_2 = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable;
  
  var bindNodeCallback = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.bindNodeCallback = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;
  
  });
  
  unwrapExports(bindNodeCallback);
  var bindNodeCallback_1 = bindNodeCallback.bindNodeCallback;
  
  var bindNodeCallback$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.bindNodeCallback = bindNodeCallback.bindNodeCallback;
  
  });
  
  unwrapExports(bindNodeCallback$2);
  
  var isScheduler_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isScheduler(value) {
      return value && typeof value.schedule === 'function';
  }
  exports.isScheduler = isScheduler;
  
  });
  
  unwrapExports(isScheduler_1);
  var isScheduler_2 = isScheduler_1.isScheduler;
  
  var OuterSubscriber_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var OuterSubscriber = /** @class */ (function (_super) {
      __extends(OuterSubscriber, _super);
      function OuterSubscriber() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.destination.next(innerValue);
      };
      OuterSubscriber.prototype.notifyError = function (error, innerSub) {
          this.destination.error(error);
      };
      OuterSubscriber.prototype.notifyComplete = function (innerSub) {
          this.destination.complete();
      };
      return OuterSubscriber;
  }(Subscriber_1.Subscriber));
  exports.OuterSubscriber = OuterSubscriber;
  
  });
  
  unwrapExports(OuterSubscriber_1);
  var OuterSubscriber_2 = OuterSubscriber_1.OuterSubscriber;
  
  var InnerSubscriber_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @internal
   * @ignore
   * @extends {Ignored}
   */
  var InnerSubscriber = /** @class */ (function (_super) {
      __extends(InnerSubscriber, _super);
      function InnerSubscriber(parent, outerValue, outerIndex) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.outerValue = outerValue;
          _this.outerIndex = outerIndex;
          _this.index = 0;
          return _this;
      }
      InnerSubscriber.prototype._next = function (value) {
          this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      };
      InnerSubscriber.prototype._error = function (error) {
          this.parent.notifyError(error, this);
          this.unsubscribe();
      };
      InnerSubscriber.prototype._complete = function () {
          this.parent.notifyComplete(this);
          this.unsubscribe();
      };
      return InnerSubscriber;
  }(Subscriber_1.Subscriber));
  exports.InnerSubscriber = InnerSubscriber;
  
  });
  
  unwrapExports(InnerSubscriber_1);
  var InnerSubscriber_2 = InnerSubscriber_1.InnerSubscriber;
  
  var subscribeToArray = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Subscribes to an ArrayLike with a subscriber
   * @param array The array or array-like to subscribe to
   * @param subscriber The subscriber to subscribe with.
   */
  exports.subscribeToArray = function (array) { return function (subscriber) {
      for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
          subscriber.next(array[i]);
      }
      if (!subscriber.closed) {
          subscriber.complete();
      }
  }; };
  
  });
  
  unwrapExports(subscribeToArray);
  var subscribeToArray_1 = subscribeToArray.subscribeToArray;
  
  var subscribeToPromise = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.subscribeToPromise = function (promise) { return function (subscriber) {
      promise.then(function (value) {
          if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
          }
      }, function (err) { return subscriber.error(err); })
          .then(null, function (err) {
          // Escaping the Promise trap: globally throw unhandled errors
          root.root.setTimeout(function () { throw err; });
      });
      return subscriber;
  }; };
  
  });
  
  unwrapExports(subscribeToPromise);
  var subscribeToPromise_1 = subscribeToPromise.subscribeToPromise;
  
  var iterator = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function symbolIteratorPonyfill(root$$1) {
      var Symbol = root$$1.Symbol;
      if (typeof Symbol === 'function') {
          if (!Symbol.iterator) {
              Symbol.iterator = Symbol('iterator polyfill');
          }
          return Symbol.iterator;
      }
      else {
          // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
          var Set_1 = root$$1.Set;
          if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
              return '@@iterator';
          }
          var Map_1 = root$$1.Map;
          // required for compatability with es6-shim
          if (Map_1) {
              var keys = Object.getOwnPropertyNames(Map_1.prototype);
              for (var i = 0; i < keys.length; ++i) {
                  var key = keys[i];
                  // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                  if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                      return key;
                  }
              }
          }
          return '@@iterator';
      }
  }
  exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
  exports.iterator = symbolIteratorPonyfill(root.root);
  /**
   * @deprecated use iterator instead
   */
  exports.$$iterator = exports.iterator;
  
  });
  
  unwrapExports(iterator);
  var iterator_1 = iterator.symbolIteratorPonyfill;
  var iterator_2 = iterator.iterator;
  var iterator_3 = iterator.$$iterator;
  
  var subscribeToIterable = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.subscribeToIterable = function (iterable) { return function (subscriber) {
      var iterator$$1 = iterable[iterator.iterator]();
      do {
          var item = iterator$$1.next();
          if (item.done) {
              subscriber.complete();
              break;
          }
          subscriber.next(item.value);
          if (subscriber.closed) {
              break;
          }
      } while (true);
      // Finalize the iterator if it happens to be a Generator
      if (typeof iterator$$1.return === 'function') {
          subscriber.add(function () {
              if (iterator$$1.return) {
                  iterator$$1.return();
              }
          });
      }
      return subscriber;
  }; };
  
  });
  
  unwrapExports(subscribeToIterable);
  var subscribeToIterable_1 = subscribeToIterable.subscribeToIterable;
  
  var subscribeToObservable = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Subscribes to an object that implements Symbol.observable with the given
   * Subscriber.
   * @param obj An object that implements Symbol.observable
   * @param subscriber The Subscriber to use to subscribe to the observable
   */
  exports.subscribeToObservable = function (obj) { return function (subscriber) {
      var obs = obj[observable.observable]();
      if (typeof obs.subscribe !== 'function') {
          // Should be caught by observable subscribe function error handling.
          throw new TypeError('Provided object does not correctly implement Symbol.observable');
      }
      else {
          return obs.subscribe(subscriber);
      }
  }; };
  
  });
  
  unwrapExports(subscribeToObservable);
  var subscribeToObservable_1 = subscribeToObservable.subscribeToObservable;
  
  var isArrayLike = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
  
  });
  
  unwrapExports(isArrayLike);
  var isArrayLike_1 = isArrayLike.isArrayLike;
  
  var isPromise_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isPromise(value) {
      return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }
  exports.isPromise = isPromise;
  
  });
  
  unwrapExports(isPromise_1);
  var isPromise_2 = isPromise_1.isPromise;
  
  var subscribeTo = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  
  
  
  
  exports.subscribeTo = function (result) {
      if (result instanceof Observable_1.Observable) {
          return function (subscriber) {
              if (result._isScalar) {
                  subscriber.next(result.value);
                  subscriber.complete();
                  return undefined;
              }
              else {
                  return result.subscribe(subscriber);
              }
          };
      }
      else if (isArrayLike.isArrayLike(result)) {
          return subscribeToArray.subscribeToArray(result);
      }
      else if (isPromise_1.isPromise(result)) {
          return subscribeToPromise.subscribeToPromise(result);
      }
      else if (result && typeof result[iterator.iterator] === 'function') {
          return subscribeToIterable.subscribeToIterable(result);
      }
      else if (result && typeof result[observable.observable] === 'function') {
          return subscribeToObservable.subscribeToObservable(result);
      }
      else {
          var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
          var msg = "You provided " + value + " where a stream was expected."
              + ' You can provide an Observable, Promise, Array, or Iterable.';
          throw new TypeError(msg);
      }
  };
  
  });
  
  unwrapExports(subscribeTo);
  var subscribeTo_1 = subscribeTo.subscribeTo;
  
  var subscribeToResult_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
      var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
      return subscribeTo.subscribeTo(result)(destination);
  }
  exports.subscribeToResult = subscribeToResult;
  
  });
  
  unwrapExports(subscribeToResult_1);
  var subscribeToResult_2 = subscribeToResult_1.subscribeToResult;
  
  var fromArray_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  function fromArray(input, scheduler) {
      if (!scheduler) {
          return new Observable_1.Observable(subscribeToArray.subscribeToArray(input));
      }
      else {
          return new Observable_1.Observable(function (subscriber) {
              var sub = new Subscription_1.Subscription();
              var i = 0;
              sub.add(scheduler.schedule(function () {
                  if (i === input.length) {
                      subscriber.complete();
                      return;
                  }
                  subscriber.next(input[i++]);
                  if (!subscriber.closed) {
                      sub.add(this.schedule());
                  }
              }));
              return sub;
          });
      }
  }
  exports.fromArray = fromArray;
  
  });
  
  unwrapExports(fromArray_1);
  var fromArray_2 = fromArray_1.fromArray;
  
  var combineLatest_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  var NONE = {};
  /* tslint:enable:max-line-length */
  /**
   * Combines multiple Observables to create an Observable whose values are
   * calculated from the latest values of each of its input Observables.
   *
   * <span class="informal">Whenever any input Observable emits a value, it
   * computes a formula using the latest values from all the inputs, then emits
   * the output of that formula.</span>
   *
   * <img src="./img/combineLatest.png" width="100%">
   *
   * `combineLatest` combines the values from all the Observables passed as
   * arguments. This is done by subscribing to each Observable in order and,
   * whenever any Observable emits, collecting an array of the most recent
   * values from each Observable. So if you pass `n` Observables to operator,
   * returned Observable will always emit an array of `n` values, in order
   * corresponding to order of passed Observables (value from the first Observable
   * on the first place and so on).
   *
   * Static version of `combineLatest` accepts either an array of Observables
   * or each Observable can be put directly as an argument. Note that array of
   * Observables is good choice, if you don't know beforehand how many Observables
   * you will combine. Passing empty array will result in Observable that
   * completes immediately.
   *
   * To ensure output array has always the same length, `combineLatest` will
   * actually wait for all input Observables to emit at least once,
   * before it starts emitting results. This means if some Observable emits
   * values before other Observables started emitting, all that values but last
   * will be lost. On the other hand, is some Observable does not emit value but
   * completes, resulting Observable will complete at the same moment without
   * emitting anything, since it will be now impossible to include value from
   * completed Observable in resulting array. Also, if some input Observable does
   * not emit any value and never completes, `combineLatest` will also never emit
   * and never complete, since, again, it will wait for all streams to emit some
   * value.
   *
   * If at least one Observable was passed to `combineLatest` and all passed Observables
   * emitted something, resulting Observable will complete when all combined
   * streams complete. So even if some Observable completes, result of
   * `combineLatest` will still emit values when other Observables do. In case
   * of completed Observable, its value from now on will always be the last
   * emitted value. On the other hand, if any Observable errors, `combineLatest`
   * will error immediately as well, and all other Observables will be unsubscribed.
   *
   * `combineLatest` accepts as optional parameter `project` function, which takes
   * as arguments all values that would normally be emitted by resulting Observable.
   * `project` can return any kind of value, which will be then emitted by Observable
   * instead of default array. Note that `project` does not take as argument that array
   * of values, but values themselves. That means default `project` can be imagined
   * as function that takes all its arguments and puts them into an array.
   *
   *
   * @example <caption>Combine two timer Observables</caption>
   * const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
   * const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
   * const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
   * combinedTimers.subscribe(value => console.log(value));
   * // Logs
   * // [0, 0] after 0.5s
   * // [1, 0] after 1s
   * // [1, 1] after 1.5s
   * // [2, 1] after 2s
   *
   *
   * @example <caption>Combine an array of Observables</caption>
   * const observables = [1, 5, 10].map(
   *   n => Rx.Observable.of(n).delay(n * 1000).startWith(0) // emit 0 and then emit n after n seconds
   * );
   * const combined = Rx.Observable.combineLatest(observables);
   * combined.subscribe(value => console.log(value));
   * // Logs
   * // [0, 0, 0] immediately
   * // [1, 0, 0] after 1s
   * // [1, 5, 0] after 5s
   * // [1, 5, 10] after 10s
   *
   *
   * @example <caption>Use project function to dynamically calculate the Body-Mass Index</caption>
   * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
   * var height = Rx.Observable.of(1.76, 1.77, 1.78);
   * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
   * bmi.subscribe(x => console.log('BMI is ' + x));
   *
   * // With output to console:
   * // BMI is 24.212293388429753
   * // BMI is 23.93948099205209
   * // BMI is 23.671253629592222
   *
   *
   * @see {@link combineAll}
   * @see {@link merge}
   * @see {@link withLatestFrom}
   *
   * @param {ObservableInput} observable1 An input Observable to combine with other Observables.
   * @param {ObservableInput} observable2 An input Observable to combine with other Observables.
   * More than one input Observables may be given as arguments
   * or an array of Observables may be given as the first argument.
   * @param {function} [project] An optional function to project the values from
   * the combined latest values into a new value on the output Observable.
   * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
   * each input Observable.
   * @return {Observable} An Observable of projected values from the most recent
   * values from each input Observable, or an array of the most recent values from
   * each input Observable.
   * @static true
   * @name combineLatest
   * @owner Observable
   */
  function combineLatest() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      var project = null;
      var scheduler = null;
      if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
          scheduler = observables.pop();
      }
      if (typeof observables[observables.length - 1] === 'function') {
          project = observables.pop();
      }
      // if the first and only other argument besides the resultSelector is an array
      // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
      if (observables.length === 1 && isArray.isArray(observables[0])) {
          observables = observables[0];
      }
      return fromArray_1.fromArray(observables, scheduler).lift(new CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  var CombineLatestOperator = /** @class */ (function () {
      function CombineLatestOperator(project) {
          this.project = project;
      }
      CombineLatestOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
      };
      return CombineLatestOperator;
  }());
  exports.CombineLatestOperator = CombineLatestOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var CombineLatestSubscriber = /** @class */ (function (_super) {
      __extends(CombineLatestSubscriber, _super);
      function CombineLatestSubscriber(destination, project) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.active = 0;
          _this.values = [];
          _this.observables = [];
          return _this;
      }
      CombineLatestSubscriber.prototype._next = function (observable) {
          this.values.push(NONE);
          this.observables.push(observable);
      };
      CombineLatestSubscriber.prototype._complete = function () {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
              this.destination.complete();
          }
          else {
              this.active = len;
              this.toRespond = len;
              for (var i = 0; i < len; i++) {
                  var observable = observables[i];
                  this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
              }
          }
      };
      CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
          if ((this.active -= 1) === 0) {
              this.destination.complete();
          }
      };
      CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var values = this.values;
          var oldVal = values[outerIndex];
          var toRespond = !this.toRespond
              ? 0
              : oldVal === NONE ? --this.toRespond : this.toRespond;
          values[outerIndex] = innerValue;
          if (toRespond === 0) {
              if (this.project) {
                  this._tryProject(values);
              }
              else {
                  this.destination.next(values.slice());
              }
          }
      };
      CombineLatestSubscriber.prototype._tryProject = function (values) {
          var result;
          try {
              result = this.project.apply(this, values);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return CombineLatestSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.CombineLatestSubscriber = CombineLatestSubscriber;
  
  });
  
  unwrapExports(combineLatest_1);
  var combineLatest_2 = combineLatest_1.combineLatest;
  var combineLatest_3 = combineLatest_1.CombineLatestOperator;
  var combineLatest_4 = combineLatest_1.CombineLatestSubscriber;
  
  var combineLatest$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.combineLatest = combineLatest_1.combineLatest;
  
  });
  
  unwrapExports(combineLatest$1);
  
  var empty_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * The same Observable instance returned by any call to {@link empty} without a
   * {@link Scheduler}. It is preferrable to use this over `empty()`.
   */
  exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
  /**
   * Creates an Observable that emits no items to the Observer and immediately
   * emits a complete notification.
   *
   * <span class="informal">Just emits 'complete', and nothing else.
   * </span>
   *
   * <img src="./img/empty.png" width="100%">
   *
   * This static operator is useful for creating a simple Observable that only
   * emits the complete notification. It can be used for composing with other
   * Observables, such as in a {@link mergeMap}.
   *
   * @example <caption>Emit the number 7, then complete.</caption>
   * var result = Rx.Observable.empty().startWith(7);
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
   * var interval = Rx.Observable.interval(1000);
   * var result = interval.mergeMap(x =>
   *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
   * );
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following to the console:
   * // x is equal to the count on the interval eg(0,1,2,3,...)
   * // x will occur every 1000ms
   * // if x % 2 is equal to 1 print abc
   * // if x % 2 is not equal to 1 nothing will be output
   *
   * @see {@link create}
   * @see {@link never}
   * @see {@link of}
   * @see {@link throw}
   *
   * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
   * the emission of the complete notification.
   * @return {Observable} An "empty" Observable: emits only the complete
   * notification.
   * @static true
   * @name empty
   * @owner Observable
   */
  function empty(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
  }
  exports.empty = empty;
  function emptyScheduled(scheduler) {
      return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
  }
  exports.emptyScheduled = emptyScheduled;
  
  });
  
  unwrapExports(empty_1);
  var empty_2 = empty_1.EMPTY;
  var empty_3 = empty_1.empty;
  var empty_4 = empty_1.emptyScheduled;
  
  var scalar_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function scalar(value) {
      var result = new Observable_1.Observable(function (subscriber) {
          subscriber.next(value);
          subscriber.complete();
      });
      result._isScalar = true;
      result.value = value;
      return result;
  }
  exports.scalar = scalar;
  
  });
  
  unwrapExports(scalar_1);
  var scalar_2 = scalar_1.scalar;
  
  var of_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var scheduler = args[args.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
          args.pop();
      }
      else {
          scheduler = undefined;
      }
      switch (args.length) {
          case 0:
              return empty_1.empty(scheduler);
          case 1:
              return scheduler ? fromArray_1.fromArray(args, scheduler) : scalar_1.scalar(args[0]);
          default:
              return fromArray_1.fromArray(args, scheduler);
      }
  }
  exports.of = of;
  
  });
  
  unwrapExports(of_1);
  var of_2 = of_1.of;
  
  var isObservable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /** Identifies an input as being Observable (but not necessary an Rx Observable) */
  function isObservable(input) {
      return input && typeof input[observable.observable] === 'function';
  }
  exports.isObservable = isObservable;
  
  });
  
  unwrapExports(isObservable_1);
  var isObservable_2 = isObservable_1.isObservable;
  
  var fromPromise_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  function fromPromise(input, scheduler) {
      if (!scheduler) {
          return new Observable_1.Observable(subscribeToPromise.subscribeToPromise(input));
      }
      else {
          return new Observable_1.Observable(function (subscriber) {
              var sub = new Subscription_1.Subscription();
              sub.add(scheduler.schedule(function () { return input.then(function (value) {
                  sub.add(scheduler.schedule(function () {
                      subscriber.next(value);
                      sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                  }));
              }, function (err) {
                  sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
              }); }));
              return sub;
          });
      }
  }
  exports.fromPromise = fromPromise;
  
  });
  
  unwrapExports(fromPromise_1);
  var fromPromise_2 = fromPromise_1.fromPromise;
  
  var fromIterable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  function fromIterable(input, scheduler) {
      if (!input) {
          throw new Error('Iterable cannot be null');
      }
      if (!scheduler) {
          return new Observable_1.Observable(subscribeToIterable.subscribeToIterable(input));
      }
      else {
          return new Observable_1.Observable(function (subscriber) {
              var sub = new Subscription_1.Subscription();
              var iterator$$1;
              sub.add(function () {
                  // Finalize generators
                  if (iterator$$1 && typeof iterator$$1.return === 'function') {
                      iterator$$1.return();
                  }
              });
              sub.add(scheduler.schedule(function () {
                  iterator$$1 = input[iterator.iterator]();
                  sub.add(scheduler.schedule(function () {
                      if (subscriber.closed) {
                          return;
                      }
                      var value;
                      var done;
                      try {
                          var result = iterator$$1.next();
                          value = result.value;
                          done = result.done;
                      }
                      catch (err) {
                          subscriber.error(err);
                          return;
                      }
                      if (done) {
                          subscriber.complete();
                      }
                      else {
                          subscriber.next(value);
                          this.schedule();
                      }
                  }));
              }));
              return sub;
          });
      }
  }
  exports.fromIterable = fromIterable;
  
  });
  
  unwrapExports(fromIterable_1);
  var fromIterable_2 = fromIterable_1.fromIterable;
  
  var fromObservable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  // tslint:disable-next-line:no-any TS is unable to type [Symbol.observable]
  function fromObservable(input, scheduler) {
      if (!scheduler) {
          return new Observable_1.Observable(subscribeToObservable.subscribeToObservable(input));
      }
      else {
          return new Observable_1.Observable(function (subscriber) {
              var sub = new Subscription_1.Subscription();
              sub.add(scheduler.schedule(function () {
                  var observable$$1 = input[observable.observable]();
                  sub.add(observable$$1.subscribe({
                      next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                      error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                      complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                  }));
              }));
              return sub;
          });
      }
  }
  exports.fromObservable = fromObservable;
  
  });
  
  unwrapExports(fromObservable_1);
  var fromObservable_2 = fromObservable_1.fromObservable;
  
  var from_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  
  
  
  
  function from(input, scheduler) {
      if (!scheduler) {
          if (input instanceof Observable_1.Observable) {
              return input;
          }
          return new Observable_1.Observable(subscribeTo.subscribeTo(input));
      }
      if (input != null) {
          if (isObservable_1.isObservable(input)) {
              return fromObservable_1.fromObservable(input, scheduler);
          }
          else if (isPromise_1.isPromise(input)) {
              return fromPromise_1.fromPromise(input, scheduler);
          }
          else if (isArrayLike.isArrayLike(input)) {
              return fromArray_1.fromArray(input, scheduler);
          }
          else if (typeof input[iterator.iterator] === 'function' || typeof input === 'string') {
              return fromIterable_1.fromIterable(input, scheduler);
          }
      }
      throw new TypeError((input !== null && typeof input || input) + ' is not observable');
  }
  exports.from = from;
  
  });
  
  unwrapExports(from_1);
  var from_2 = from_1.from;
  
  var mergeMap_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link mergeAll}.</span>
   *
   * <img src="./img/mergeMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an Observable, and then merging those resulting Observables and
   * emitting the results of this merger.
   *
   * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
   * var letters = Rx.Observable.of('a', 'b', 'c');
   * var result = letters.mergeMap(x =>
   *   Rx.Observable.interval(1000).map(i => x+i)
   * );
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // a0
   * // b0
   * // c0
   * // a1
   * // b1
   * // c1
   * // continues to list a,b,c with respective ascending integers
   *
   * @see {@link concatMap}
   * @see {@link exhaustMap}
   * @see {@link merge}
   * @see {@link mergeAll}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and merging the results of the Observables obtained
   * from this transformation.
   * @method mergeMap
   * @owner Observable
   */
  function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return function mergeMapOperatorFunction(source) {
          if (typeof resultSelector === 'number') {
              concurrent = resultSelector;
              resultSelector = null;
          }
          return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
      };
  }
  exports.mergeMap = mergeMap;
  var MergeMapOperator = /** @class */ (function () {
      function MergeMapOperator(project, resultSelector, concurrent) {
          if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
          this.project = project;
          this.resultSelector = resultSelector;
          this.concurrent = concurrent;
      }
      MergeMapOperator.prototype.call = function (observer, source) {
          return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
      };
      return MergeMapOperator;
  }());
  exports.MergeMapOperator = MergeMapOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MergeMapSubscriber = /** @class */ (function (_super) {
      __extends(MergeMapSubscriber, _super);
      function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
          if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.resultSelector = resultSelector;
          _this.concurrent = concurrent;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
      }
      MergeMapSubscriber.prototype._next = function (value) {
          if (this.active < this.concurrent) {
              this._tryNext(value);
          }
          else {
              this.buffer.push(value);
          }
      };
      MergeMapSubscriber.prototype._tryNext = function (value) {
          var result;
          var index = this.index++;
          try {
              result = this.project(value, index);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.active++;
          this._innerSub(result, value, index);
      };
      MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
          this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
      };
      MergeMapSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
              this.destination.complete();
          }
      };
      MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (this.resultSelector) {
              this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          else {
              this.destination.next(innerValue);
          }
      };
      MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
          var result;
          try {
              result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer.length > 0) {
              this._next(buffer.shift());
          }
          else if (this.active === 0 && this.hasCompleted) {
              this.destination.complete();
          }
      };
      return MergeMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeMapSubscriber = MergeMapSubscriber;
  
  });
  
  unwrapExports(mergeMap_1);
  var mergeMap_2 = mergeMap_1.mergeMap;
  var mergeMap_3 = mergeMap_1.MergeMapOperator;
  var mergeMap_4 = mergeMap_1.MergeMapSubscriber;
  
  var identity_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function identity(x) {
      return x;
  }
  exports.identity = identity;
  
  });
  
  unwrapExports(identity_1);
  var identity_2 = identity_1.identity;
  
  var mergeAll_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Converts a higher-order Observable into a first-order Observable which
   * concurrently delivers all values that are emitted on the inner Observables.
   *
   * <span class="informal">Flattens an Observable-of-Observables.</span>
   *
   * <img src="./img/mergeAll.png" width="100%">
   *
   * `mergeAll` subscribes to an Observable that emits Observables, also known as
   * a higher-order Observable. Each time it observes one of these emitted inner
   * Observables, it subscribes to that and delivers all the values from the
   * inner Observable on the output Observable. The output Observable only
   * completes once all inner Observables have completed. Any error delivered by
   * a inner Observable will be immediately emitted on the output Observable.
   *
   * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
   * var firstOrder = higherOrder.mergeAll();
   * firstOrder.subscribe(x => console.log(x));
   *
   * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
   * var firstOrder = higherOrder.mergeAll(2);
   * firstOrder.subscribe(x => console.log(x));
   *
   * @see {@link combineAll}
   * @see {@link concatAll}
   * @see {@link exhaust}
   * @see {@link merge}
   * @see {@link mergeMap}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   * @see {@link switch}
   * @see {@link zipAll}
   *
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits values coming from all the
   * inner Observables emitted by the source Observable.
   * @method mergeAll
   * @owner Observable
   */
  function mergeAll(concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
  }
  exports.mergeAll = mergeAll;
  
  });
  
  unwrapExports(mergeAll_1);
  var mergeAll_2 = mergeAll_1.mergeAll;
  
  var concatAll_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts a higher-order Observable into a first-order Observable by
   * concatenating the inner Observables in order.
   *
   * <span class="informal">Flattens an Observable-of-Observables by putting one
   * inner Observable after the other.</span>
   *
   * <img src="./img/concatAll.png" width="100%">
   *
   * Joins every Observable emitted by the source (a higher-order Observable), in
   * a serial fashion. It subscribes to each inner Observable only after the
   * previous inner Observable has completed, and merges all of their values into
   * the returned observable.
   *
   * __Warning:__ If the source Observable emits Observables quickly and
   * endlessly, and the inner Observables it emits generally complete slower than
   * the source emits, you can run into memory issues as the incoming Observables
   * collect in an unbounded buffer.
   *
   * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
   * to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
   * var firstOrder = higherOrder.concatAll();
   * firstOrder.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link combineAll}
   * @see {@link concat}
   * @see {@link concatMap}
   * @see {@link concatMapTo}
   * @see {@link exhaust}
   * @see {@link mergeAll}
   * @see {@link switch}
   * @see {@link zipAll}
   *
   * @return {Observable} An Observable emitting values from all the inner
   * Observables concatenated.
   * @method concatAll
   * @owner Observable
   */
  function concatAll() {
      return mergeAll_1.mergeAll(1);
  }
  exports.concatAll = concatAll;
  
  });
  
  unwrapExports(concatAll_1);
  var concatAll_2 = concatAll_1.concatAll;
  
  var concat_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Creates an output Observable which sequentially emits all values from given
   * Observable and then moves on to the next.
   *
   * <span class="informal">Concatenates multiple Observables together by
   * sequentially emitting their values, one Observable after the other.</span>
   *
   * <img src="./img/concat.png" width="100%">
   *
   * `concat` joins multiple Observables together, by subscribing to them one at a time and
   * merging their results into the output Observable. You can pass either an array of
   * Observables, or put them directly as arguments. Passing an empty array will result
   * in Observable that completes immediately.
   *
   * `concat` will subscribe to first input Observable and emit all its values, without
   * changing or affecting them in any way. When that Observable completes, it will
   * subscribe to then next Observable passed and, again, emit its values. This will be
   * repeated, until the operator runs out of Observables. When last input Observable completes,
   * `concat` will complete as well. At any given moment only one Observable passed to operator
   * emits values. If you would like to emit values from passed Observables concurrently, check out
   * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
   * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
   *
   * Note that if some input Observable never completes, `concat` will also never complete
   * and Observables following the one that did not complete will never be subscribed. On the other
   * hand, if some Observable simply completes immediately after it is subscribed, it will be
   * invisible for `concat`, which will just move on to the next Observable.
   *
   * If any Observable in chain errors, instead of passing control to the next Observable,
   * `concat` will error immediately as well. Observables that would be subscribed after
   * the one that emitted error, never will.
   *
   * If you pass to `concat` the same Observable many times, its stream of values
   * will be "replayed" on every subscription, which means you can repeat given Observable
   * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
   * you can always use {@link repeat}.
   *
   * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
   * var timer = Rx.Observable.interval(1000).take(4);
   * var sequence = Rx.Observable.range(1, 10);
   * var result = Rx.Observable.concat(timer, sequence);
   * result.subscribe(x => console.log(x));
   *
   * // results in:
   * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
   *
   *
   * @example <caption>Concatenate an array of 3 Observables</caption>
   * var timer1 = Rx.Observable.interval(1000).take(10);
   * var timer2 = Rx.Observable.interval(2000).take(6);
   * var timer3 = Rx.Observable.interval(500).take(10);
   * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
   * result.subscribe(x => console.log(x));
   *
   * // results in the following:
   * // (Prints to console sequentially)
   * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
   * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
   * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
   *
   *
   * @example <caption>Concatenate the same Observable to repeat it</caption>
   * const timer = Rx.Observable.interval(1000).take(2);
   *
   * Rx.Observable.concat(timer, timer) // concating the same Observable!
   * .subscribe(
   *   value => console.log(value),
   *   err => {},
   *   () => console.log('...and it is done!')
   * );
   *
   * // Logs:
   * // 0 after 1s
   * // 1 after 2s
   * // 0 after 3s
   * // 1 after 4s
   * // "...and it is done!" also after 4s
   *
   * @see {@link concatAll}
   * @see {@link concatMap}
   * @see {@link concatMapTo}
   *
   * @param {ObservableInput} input1 An input Observable to concatenate with others.
   * @param {ObservableInput} input2 An input Observable to concatenate with others.
   * More than one input Observables may be given as argument.
   * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
   * Observable subscription on.
   * @return {Observable} All values of each passed Observable merged into a
   * single Observable, in order, in serial fashion.
   * @static true
   * @name concat
   * @owner Observable
   */
  function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      if (observables.length === 1 || (observables.length === 2 && isScheduler_1.isScheduler(observables[1]))) {
          return from_1.from(observables[0]);
      }
      return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
  }
  exports.concat = concat;
  
  });
  
  unwrapExports(concat_1);
  var concat_2 = concat_1.concat;
  
  var concat$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.concat = concat_1.concat;
  
  });
  
  unwrapExports(concat$1);
  
  var defer_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
   // lol
  
  /**
   * Creates an Observable that, on subscribe, calls an Observable factory to
   * make an Observable for each new Observer.
   *
   * <span class="informal">Creates the Observable lazily, that is, only when it
   * is subscribed.
   * </span>
   *
   * <img src="./img/defer.png" width="100%">
   *
   * `defer` allows you to create the Observable only when the Observer
   * subscribes, and create a fresh Observable for each Observer. It waits until
   * an Observer subscribes to it, and then it generates an Observable,
   * typically with an Observable factory function. It does this afresh for each
   * subscriber, so although each subscriber may think it is subscribing to the
   * same Observable, in fact each subscriber gets its own individual
   * Observable.
   *
   * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
   * var clicksOrInterval = Rx.Observable.defer(function () {
   *   if (Math.random() > 0.5) {
   *     return Rx.Observable.fromEvent(document, 'click');
   *   } else {
   *     return Rx.Observable.interval(1000);
   *   }
   * });
   * clicksOrInterval.subscribe(x => console.log(x));
   *
   * // Results in the following behavior:
   * // If the result of Math.random() is greater than 0.5 it will listen
   * // for clicks anywhere on the "document"; when document is clicked it
   * // will log a MouseEvent object to the console. If the result is less
   * // than 0.5 it will emit ascending numbers, one every second(1000ms).
   *
   * @see {@link create}
   *
   * @param {function(): SubscribableOrPromise} observableFactory The Observable
   * factory function to invoke for each Observer that subscribes to the output
   * Observable. May also return a Promise, which will be converted on the fly
   * to an Observable.
   * @return {Observable} An Observable whose Observers' subscriptions trigger
   * an invocation of the given Observable factory function.
   * @static true
   * @name defer
   * @owner Observable
   */
  function defer(observableFactory) {
      return new Observable_1.Observable(function (subscriber) {
          var input;
          try {
              input = observableFactory();
          }
          catch (err) {
              subscriber.error(err);
              return undefined;
          }
          var source = input ? from_1.from(input) : empty_1.empty();
          return source.subscribe(subscriber);
      });
  }
  exports.defer = defer;
  
  });
  
  unwrapExports(defer_1);
  var defer_2 = defer_1.defer;
  
  var defer$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.defer = defer_1.defer;
  
  });
  
  unwrapExports(defer$1);
  
  var empty$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.empty = empty_1.empty;
  
  });
  
  unwrapExports(empty$1);
  
  var forkJoin_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Joins last values emitted by passed Observables.
   *
   * <span class="informal">Wait for Observables to complete and then combine last values they emitted.</span>
   *
   * <img src="./img/forkJoin.png" width="100%">
   *
   * `forkJoin` is an operator that takes any number of Observables which can be passed either as an array
   * or directly as arguments. If no input Observables are provided, resulting stream will complete
   * immediately.
   *
   * `forkJoin` will wait for all passed Observables to complete and then it will emit an array with last
   * values from corresponding Observables. So if you pass `n` Observables to the operator, resulting
   * array will have `n` values, where first value is the last thing emitted by the first Observable,
   * second value is the last thing emitted by the second Observable and so on. That means `forkJoin` will
   * not emit more than once and it will complete after that. If you need to emit combined values not only
   * at the end of lifecycle of passed Observables, but also throughout it, try out {@link combineLatest}
   * or {@link zip} instead.
   *
   * In order for resulting array to have the same length as the number of input Observables, whenever any of
   * that Observables completes without emitting any value, `forkJoin` will complete at that moment as well
   * and it will not emit anything either, even if it already has some last values from other Observables.
   * Conversely, if there is an Observable that never completes, `forkJoin` will never complete as well,
   * unless at any point some other Observable completes without emitting value, which brings us back to
   * the previous case. Overall, in order for `forkJoin` to emit a value, all Observables passed as arguments
   * have to emit something at least once and complete.
   *
   * If any input Observable errors at some point, `forkJoin` will error as well and all other Observables
   * will be immediately unsubscribed.
   *
   * Optionally `forkJoin` accepts project function, that will be called with values which normally
   * would land in emitted array. Whatever is returned by project function, will appear in output
   * Observable instead. This means that default project can be thought of as a function that takes
   * all its arguments and puts them into an array. Note that project function will be called only
   * when output Observable is supposed to emit a result.
   *
   * @example <caption>Use forkJoin with operator emitting immediately</caption>
   * import { forkJoin, of } from 'rxjs/create';
   *
   * const observable = forkJoin(
   *   of(1, 2, 3, 4),
   *   of(5, 6, 7, 8)
   * );
   * observable.subscribe(
   *   value => console.log(value),
   *   err => {},
   *   () => console.log('This is how it ends!')
   * );
   *
   * // Logs:
   * // [4, 8]
   * // "This is how it ends!"
   *
   *
   * @example <caption>Use forkJoin with operator emitting after some time</caption>
   * import { forkJoin, interval } from 'rxjs/create';
   * import { take } from 'rxjs/operators';
   *
   * const observable = forkJoin(
   *   interval(1000).pipe(take(3)), // emit 0, 1, 2 every second and complete
   *   interval(500).pipe(take(4)) // emit 0, 1, 2, 3 every half a second and complete
   * );
   * observable.subscribe(
   *   value => console.log(value),
   *   err => {},
   *   () => console.log('This is how it ends!')
   * );
   *
   * // Logs:
   * // [2, 3] after 3 seconds
   * // "This is how it ends!" immediately after
   *
   *
   * @example <caption>Use forkJoin with project function</caption>
   * import { jorkJoin, interval } from 'rxjs/create';
   * import { take } from 'rxjs/operators';
   *
   * const observable = forkJoin(
   *   interval(1000).pipe(take(3)), // emit 0, 1, 2 every second and complete
   *   interval(500).pipe(take(4)), // emit 0, 1, 2, 3 every half a second and complete
   *   (n, m) => n + m
   * );
   * observable.subscribe(
   *   value => console.log(value),
   *   err => {},
   *   () => console.log('This is how it ends!')
   * );
   *
   * // Logs:
   * // 5 after 3 seconds
   * // "This is how it ends!" immediately after
   *
   * @see {@link combineLatest}
   * @see {@link zip}
   *
   * @param {...ObservableInput} sources Any number of Observables provided either as an array or as an arguments
   * passed directly to the operator.
   * @param {function} [project] Function that takes values emitted by input Observables and returns value
   * that will appear in resulting Observable instead of default array.
   * @return {Observable} Observable emitting either an array of last values emitted by passed Observables
   * or value from project function.
   * @static true
   * @name forkJoin
   * @owner Observable
   */
  function forkJoin() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
      }
      if (sources === null || arguments.length === 0) {
          return empty_1.EMPTY;
      }
      var resultSelector = null;
      if (typeof sources[sources.length - 1] === 'function') {
          resultSelector = sources.pop();
      }
      // if the first and only other argument besides the resultSelector is an array
      // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
      if (sources.length === 1 && isArray.isArray(sources[0])) {
          sources = sources[0];
      }
      if (sources.length === 0) {
          return empty_1.EMPTY;
      }
      return new Observable_1.Observable(function (subscriber) {
          return new ForkJoinSubscriber(subscriber, sources, resultSelector);
      });
  }
  exports.forkJoin = forkJoin;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ForkJoinSubscriber = /** @class */ (function (_super) {
      __extends(ForkJoinSubscriber, _super);
      function ForkJoinSubscriber(destination, sources, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.sources = sources;
          _this.resultSelector = resultSelector;
          _this.completed = 0;
          _this.haveValues = 0;
          var len = sources.length;
          _this.values = new Array(len);
          for (var i = 0; i < len; i++) {
              var source = sources[i];
              var innerSubscription = subscribeToResult_1.subscribeToResult(_this, source, null, i);
              if (innerSubscription) {
                  _this.add(innerSubscription);
              }
          }
          return _this;
      }
      ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.values[outerIndex] = innerValue;
          if (!innerSub._hasValue) {
              innerSub._hasValue = true;
              this.haveValues++;
          }
      };
      ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
          var _a = this, destination = _a.destination, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
          var len = values.length;
          if (!innerSub._hasValue) {
              destination.complete();
              return;
          }
          this.completed++;
          if (this.completed !== len) {
              return;
          }
          if (haveValues === len) {
              var result = void 0;
              try {
                  result = resultSelector ? resultSelector.apply(void 0, values) : values;
              }
              catch (err) {
                  destination.error(err);
                  return;
              }
              destination.next(result);
          }
          destination.complete();
      };
      return ForkJoinSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(forkJoin_1);
  var forkJoin_2 = forkJoin_1.forkJoin;
  
  var forkJoin$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
  
  });
  
  unwrapExports(forkJoin$1);
  
  var from$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.from = from_1.from;
  
  });
  
  unwrapExports(from$1);
  
  var FromEventObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  var toString = Object.prototype.toString;
  function isNodeStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
  }
  function isJQueryStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
  }
  function isNodeList(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
  }
  function isHTMLCollection(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
  }
  function isEventTarget(sourceObj) {
      return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
  }
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var FromEventObservable = /** @class */ (function (_super) {
      __extends(FromEventObservable, _super);
      function FromEventObservable(sourceObj, eventName, selector, options) {
          var _this = _super.call(this) || this;
          _this.sourceObj = sourceObj;
          _this.eventName = eventName;
          _this.selector = selector;
          _this.options = options;
          return _this;
      }
      /* tslint:enable:max-line-length */
      /**
       * Creates an Observable that emits events of a specific type coming from the
       * given event target.
       *
       * <span class="informal">Creates an Observable from DOM events, or Node.js
       * EventEmitter events or others.</span>
       *
       * <img src="./img/fromEvent.png" width="100%">
       *
       * `fromEvent` accepts as a first argument event target, which is an object with methods
       * for registering event handler functions. As a second argument it takes string that indicates
       * type of event we want to listen for. `fromEvent` supports selected types of event targets,
       * which are described in detail below. If your event target does not match any of the ones listed,
       * you should use {@link fromEventPattern}, which can be used on arbitrary APIs.
       * When it comes to APIs supported by `fromEvent`, their methods for adding and removing event
       * handler functions have different names, but they all accept a string describing event type
       * and function itself, which will be called whenever said event happens.
       *
       * Every time resulting Observable is subscribed, event handler function will be registered
       * to event target on given event type. When that event fires, value
       * passed as a first argument to registered function will be emitted by output Observable.
       * When Observable is unsubscribed, function will be unregistered from event target.
       *
       * Note that if event target calls registered function with more than one argument, second
       * and following arguments will not appear in resulting stream. In order to get access to them,
       * you can pass to `fromEvent` optional project function, which will be called with all arguments
       * passed to event handler. Output Observable will then emit value returned by project function,
       * instead of the usual value.
       *
       * Remember that event targets listed below are checked via duck typing. It means that
       * no matter what kind of object you have and no matter what environment you work in,
       * you can safely use `fromEvent` on that object if it exposes described methods (provided
       * of course they behave as was described above). So for example if Node.js library exposes
       * event target which has the same method names as DOM EventTarget, `fromEvent` is still
       * a good choice.
       *
       * If the API you use is more callback then event handler oriented (subscribed
       * callback function fires only once and thus there is no need to manually
       * unregister it), you should use {@link bindCallback} or {@link bindNodeCallback}
       * instead.
       *
       * `fromEvent` supports following types of event targets:
       *
       * **DOM EventTarget**
       *
       * This is an object with `addEventListener` and `removeEventListener` methods.
       *
       * In the browser, `addEventListener` accepts - apart from event type string and event
       * handler function arguments - optional third parameter, which is either an object or boolean,
       * both used for additional configuration how and when passed function will be called. When
       * `fromEvent` is used with event target of that type, you can provide this values
       * as third parameter as well.
       *
       * **Node.js EventEmitter**
       *
       * An object with `addListener` and `removeListener` methods.
       *
       * **JQuery-style event target**
       *
       * An object with `on` and `off` methods
       *
       * **DOM NodeList**
       *
       * List of DOM Nodes, returned for example by `document.querySelectorAll` or `Node.childNodes`.
       *
       * Although this collection is not event target in itself, `fromEvent` will iterate over all Nodes
       * it contains and install event handler function in every of them. When returned Observable
       * is unsubscribed, function will be removed from all Nodes.
       *
       * **DOM HtmlCollection**
       *
       * Just as in case of NodeList it is a collection of DOM nodes. Here as well event handler function is
       * installed and removed in each of elements.
       *
       *
       * @example <caption>Emits clicks happening on the DOM document</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * clicks.subscribe(x => console.log(x));
       *
       * // Results in:
       * // MouseEvent object logged to console every time a click
       * // occurs on the document.
       *
       *
       * @example <caption>Use addEventListener with capture option</caption>
       * var clicksInDocument = Rx.Observable.fromEvent(document, 'click', true); // note optional configuration parameter
       *                                                                          // which will be passed to addEventListener
       * var clicksInDiv = Rx.Observable.fromEvent(someDivInDocument, 'click');
       *
       * clicksInDocument.subscribe(() => console.log('document'));
       * clicksInDiv.subscribe(() => console.log('div'));
       *
       * // By default events bubble UP in DOM tree, so normally
       * // when we would click on div in document
       * // "div" would be logged first and then "document".
       * // Since we specified optional `capture` option, document
       * // will catch event when it goes DOWN DOM tree, so console
       * // will log "document" and then "div".
       *
       * @see {@link bindCallback}
       * @see {@link bindNodeCallback}
       * @see {@link fromEventPattern}
       *
       * @param {EventTargetLike} target The DOM EventTarget, Node.js
       * EventEmitter, JQuery-like event target, NodeList or HTMLCollection to attach the event handler to.
       * @param {string} eventName The event name of interest, being emitted by the
       * `target`.
       * @param {EventListenerOptions} [options] Options to pass through to addEventListener
       * @param {SelectorMethodSignature<T>} [selector] An optional function to
       * post-process results. It takes the arguments from the event handler and
       * should return a single value.
       * @return {Observable<T>}
       * @static true
       * @name fromEvent
       * @owner Observable
       */
      FromEventObservable.create = function (target, eventName, options, selector) {
          if (isFunction_1.isFunction(options)) {
              selector = options;
              options = undefined;
          }
          return new FromEventObservable(target, eventName, selector, options);
      };
      FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
          var unsubscribe;
          if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
              for (var i = 0, len = sourceObj.length; i < len; i++) {
                  FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
              }
          }
          else if (isEventTarget(sourceObj)) {
              var source_1 = sourceObj;
              sourceObj.addEventListener(eventName, handler, options);
              unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
          }
          else if (isJQueryStyleEventEmitter(sourceObj)) {
              var source_2 = sourceObj;
              sourceObj.on(eventName, handler);
              unsubscribe = function () { return source_2.off(eventName, handler); };
          }
          else if (isNodeStyleEventEmitter(sourceObj)) {
              var source_3 = sourceObj;
              sourceObj.addListener(eventName, handler);
              unsubscribe = function () { return source_3.removeListener(eventName, handler); };
          }
          else {
              throw new TypeError('Invalid event target');
          }
          subscriber.add(new Subscription_1.Subscription(unsubscribe));
      };
      FromEventObservable.prototype._subscribe = function (subscriber) {
          var sourceObj = this.sourceObj;
          var eventName = this.eventName;
          var options = this.options;
          var selector = this.selector;
          var handler = selector ? function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
              if (result === errorObject.errorObject) {
                  subscriber.error(errorObject.errorObject.e);
              }
              else {
                  subscriber.next(result);
              }
          } : function (e) { return subscriber.next(e); };
          FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
      };
      return FromEventObservable;
  }(Observable_1.Observable));
  exports.FromEventObservable = FromEventObservable;
  
  });
  
  unwrapExports(FromEventObservable_1);
  var FromEventObservable_2 = FromEventObservable_1.FromEventObservable;
  
  var fromEvent = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
  
  });
  
  unwrapExports(fromEvent);
  var fromEvent_1 = fromEvent.fromEvent;
  
  var fromEvent$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.fromEvent = fromEvent.fromEvent;
  
  });
  
  unwrapExports(fromEvent$2);
  
  var FromEventPatternObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var FromEventPatternObservable = /** @class */ (function (_super) {
      __extends(FromEventPatternObservable, _super);
      function FromEventPatternObservable(addHandler, removeHandler, selector) {
          var _this = _super.call(this) || this;
          _this.addHandler = addHandler;
          _this.removeHandler = removeHandler;
          _this.selector = selector;
          return _this;
      }
      /**
       * Creates an Observable from an API based on addHandler/removeHandler
       * functions.
       *
       * <span class="informal">Converts any addHandler/removeHandler API to an
       * Observable.</span>
       *
       * <img src="./img/fromEventPattern.png" width="100%">
       *
       * Creates an Observable by using the `addHandler` and `removeHandler`
       * functions to add and remove the handlers, with an optional selector
       * function to project the event arguments to a result. The `addHandler` is
       * called when the output Observable is subscribed, and `removeHandler` is
       * called when the Subscription is unsubscribed.
       *
       * @example <caption>Emits clicks happening on the DOM document</caption>
       * function addClickHandler(handler) {
       *   document.addEventListener('click', handler);
       * }
       *
       * function removeClickHandler(handler) {
       *   document.removeEventListener('click', handler);
       * }
       *
       * var clicks = Rx.Observable.fromEventPattern(
       *   addClickHandler,
       *   removeClickHandler
       * );
       * clicks.subscribe(x => console.log(x));
       *
       * @see {@link from}
       * @see {@link fromEvent}
       *
       * @param {function(handler: Function): any} addHandler A function that takes
       * a `handler` function as argument and attaches it somehow to the actual
       * source of events.
       * @param {function(handler: Function, signal?: any): void} [removeHandler] An optional function that
       * takes a `handler` function as argument and removes it in case it was
       * previously attached using `addHandler`. if addHandler returns signal to teardown when remove,
       * removeHandler function will forward it.
       * @param {function(...args: any): T} [selector] An optional function to
       * post-process results. It takes the arguments from the event handler and
       * should return a single value.
       * @return {Observable<T>}
       * @static true
       * @name fromEventPattern
       * @owner Observable
       */
      FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
          return new FromEventPatternObservable(addHandler, removeHandler, selector);
      };
      FromEventPatternObservable.prototype._subscribe = function (subscriber) {
          var _this = this;
          var removeHandler = this.removeHandler;
          var handler = !!this.selector ? function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              _this._callSelector(subscriber, args);
          } : function (e) { subscriber.next(e); };
          var retValue = this._callAddHandler(handler, subscriber);
          if (!isFunction_1.isFunction(removeHandler)) {
              return;
          }
          subscriber.add(new Subscription_1.Subscription(function () {
              //TODO: determine whether or not to forward to error handler
              removeHandler(handler, retValue);
          }));
      };
      FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
          try {
              var result = this.selector.apply(this, args);
              subscriber.next(result);
          }
          catch (e) {
              subscriber.error(e);
          }
      };
      FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
          try {
              return this.addHandler(handler) || null;
          }
          catch (e) {
              errorSubscriber.error(e);
          }
      };
      return FromEventPatternObservable;
  }(Observable_1.Observable));
  exports.FromEventPatternObservable = FromEventPatternObservable;
  
  });
  
  unwrapExports(FromEventPatternObservable_1);
  var FromEventPatternObservable_2 = FromEventPatternObservable_1.FromEventPatternObservable;
  
  var fromEventPattern = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.fromEventPattern = FromEventPatternObservable_1.FromEventPatternObservable.create;
  
  });
  
  unwrapExports(fromEventPattern);
  var fromEventPattern_1 = fromEventPattern.fromEventPattern;
  
  var fromEventPattern$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.fromEventPattern = fromEventPattern.fromEventPattern;
  
  });
  
  unwrapExports(fromEventPattern$2);
  
  var fromPromise$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
  
  });
  
  unwrapExports(fromPromise$1);
  
  var GenerateObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  var selfSelector = function (value) { return value; };
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var GenerateObservable = /** @class */ (function (_super) {
      __extends(GenerateObservable, _super);
      function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
          var _this = _super.call(this) || this;
          _this.initialState = initialState;
          _this.condition = condition;
          _this.iterate = iterate;
          _this.resultSelector = resultSelector;
          _this.scheduler = scheduler;
          return _this;
      }
      GenerateObservable.create = function (initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
          if (arguments.length == 1) {
              return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
          }
          if (resultSelectorOrObservable === undefined || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
              return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
          }
          return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
      };
      GenerateObservable.prototype._subscribe = function (subscriber) {
          var state = this.initialState;
          if (this.scheduler) {
              return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                  subscriber: subscriber,
                  iterate: this.iterate,
                  condition: this.condition,
                  resultSelector: this.resultSelector,
                  state: state
              });
          }
          var _a = this, condition = _a.condition, resultSelector = _a.resultSelector, iterate = _a.iterate;
          do {
              if (condition) {
                  var conditionResult = void 0;
                  try {
                      conditionResult = condition(state);
                  }
                  catch (err) {
                      subscriber.error(err);
                      return;
                  }
                  if (!conditionResult) {
                      subscriber.complete();
                      break;
                  }
              }
              var value = void 0;
              try {
                  value = resultSelector(state);
              }
              catch (err) {
                  subscriber.error(err);
                  return;
              }
              subscriber.next(value);
              if (subscriber.closed) {
                  break;
              }
              try {
                  state = iterate(state);
              }
              catch (err) {
                  subscriber.error(err);
                  return;
              }
          } while (true);
      };
      GenerateObservable.dispatch = function (state) {
          var subscriber = state.subscriber, condition = state.condition;
          if (subscriber.closed) {
              return;
          }
          if (state.needIterate) {
              try {
                  state.state = state.iterate(state.state);
              }
              catch (err) {
                  subscriber.error(err);
                  return;
              }
          }
          else {
              state.needIterate = true;
          }
          if (condition) {
              var conditionResult = void 0;
              try {
                  conditionResult = condition(state.state);
              }
              catch (err) {
                  subscriber.error(err);
                  return;
              }
              if (!conditionResult) {
                  subscriber.complete();
                  return;
              }
              if (subscriber.closed) {
                  return;
              }
          }
          var value;
          try {
              value = state.resultSelector(state.state);
          }
          catch (err) {
              subscriber.error(err);
              return;
          }
          if (subscriber.closed) {
              return;
          }
          subscriber.next(value);
          if (subscriber.closed) {
              return;
          }
          return this.schedule(state);
      };
      return GenerateObservable;
  }(Observable_1.Observable));
  exports.GenerateObservable = GenerateObservable;
  
  });
  
  unwrapExports(GenerateObservable_1);
  var GenerateObservable_2 = GenerateObservable_1.GenerateObservable;
  
  var generate = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.generate = GenerateObservable_1.GenerateObservable.create;
  
  });
  
  unwrapExports(generate);
  var generate_1 = generate.generate;
  
  var generate$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.generate = generate.generate;
  
  });
  
  unwrapExports(generate$2);
  
  var IfObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var IfObservable = /** @class */ (function (_super) {
      __extends(IfObservable, _super);
      function IfObservable(condition, thenSource, elseSource) {
          var _this = _super.call(this) || this;
          _this.condition = condition;
          _this.thenSource = thenSource;
          _this.elseSource = elseSource;
          return _this;
      }
      /**
       * Decides at subscription time which Observable will actually be subscribed.
       *
       * <span class="informal">`If` statement for Observables.</span>
       *
       * `if` accepts a condition function and two Observables. When
       * an Observable returned by the operator is subscribed, condition function will be called.
       * Based on what boolean it returns at that moment, consumer will subscribe either to
       * the first Observable (if condition was true) or to the second (if condition was false). Condition
       * function may also not return anything - in that case condition will be evaluated as false and
       * second Observable will be subscribed.
       *
       * Note that Observables for both cases (true and false) are optional. If condition points to an Observable that
       * was left undefined, resulting stream will simply complete immediately. That allows you to, rather
       * then controlling which Observable will be subscribed, decide at runtime if consumer should have access
       * to given Observable or not.
       *
       * If you have more complex logic that requires decision between more than two Observables, {@link defer}
       * will probably be a better choice. Actually `if` can be easily implemented with {@link defer}
       * and exists only for convenience and readability reasons.
       *
       *
       * @example <caption>Change at runtime which Observable will be subscribed</caption>
       * let subscribeToFirst;
       * const firstOrSecond = Rx.Observable.if(
       *   () => subscribeToFirst,
       *   Rx.Observable.of('first'),
       *   Rx.Observable.of('second')
       * );
       *
       * subscribeToFirst = true;
       * firstOrSecond.subscribe(value => console.log(value));
       *
       * // Logs:
       * // "first"
       *
       * subscribeToFirst = false;
       * firstOrSecond.subscribe(value => console.log(value));
       *
       * // Logs:
       * // "second"
       *
       *
       * @example <caption>Control an access to an Observable</caption>
       * let accessGranted;
       * const observableIfYouHaveAccess = Rx.Observable.if(
       *   () => accessGranted,
       *   Rx.Observable.of('It seems you have an access...') // Note that only one Observable is passed to the operator.
       * );
       *
       * accessGranted = true;
       * observableIfYouHaveAccess.subscribe(
       *   value => console.log(value),
       *   err => {},
       *   () => console.log('The end')
       * );
       *
       * // Logs:
       * // "It seems you have an access..."
       * // "The end"
       *
       * accessGranted = false;
       * observableIfYouHaveAccess.subscribe(
       *   value => console.log(value),
       *   err => {},
       *   () => console.log('The end')
       * );
       *
       * // Logs:
       * // "The end"
       *
       * @see {@link defer}
       *
       * @param {function(): boolean} condition Condition which Observable should be chosen.
       * @param {Observable} [trueObservable] An Observable that will be subscribed if condition is true.
       * @param {Observable} [falseObservable] An Observable that will be subscribed if condition is false.
       * @return {Observable} Either first or second Observable, depending on condition.
       * @static true
       * @name if
       * @owner Observable
       */
      IfObservable.create = function (condition, thenSource, elseSource) {
          return new IfObservable(condition, thenSource, elseSource);
      };
      IfObservable.prototype._subscribe = function (subscriber) {
          var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
          return new IfSubscriber(subscriber, condition, thenSource, elseSource);
      };
      return IfObservable;
  }(Observable_1.Observable));
  exports.IfObservable = IfObservable;
  var IfSubscriber = /** @class */ (function (_super) {
      __extends(IfSubscriber, _super);
      function IfSubscriber(destination, condition, thenSource, elseSource) {
          var _this = _super.call(this, destination) || this;
          _this.condition = condition;
          _this.thenSource = thenSource;
          _this.elseSource = elseSource;
          _this.tryIf();
          return _this;
      }
      IfSubscriber.prototype.tryIf = function () {
          var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
          var result;
          try {
              result = condition();
              var source = result ? thenSource : elseSource;
              if (source) {
                  this.add(subscribeToResult_1.subscribeToResult(this, source));
              }
              else {
                  this._complete();
              }
          }
          catch (err) {
              this._error(err);
          }
      };
      return IfSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(IfObservable_1);
  var IfObservable_2 = IfObservable_1.IfObservable;
  
  var _if = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports._if = IfObservable_1.IfObservable.create;
  
  });
  
  unwrapExports(_if);
  var _if_1 = _if._if;
  
  var _if$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.if = _if._if;
  
  });
  
  unwrapExports(_if$2);
  
  var Action_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * A unit of work to be executed in a {@link Scheduler}. An action is typically
   * created from within a Scheduler and an RxJS user does not need to concern
   * themselves about creating and manipulating an Action.
   *
   * ```ts
   * class Action<T> extends Subscription {
   *   new (scheduler: Scheduler, work: (state?: T) => void);
   *   schedule(state?: T, delay: number = 0): Subscription;
   * }
   * ```
   *
   * @class Action<T>
   */
  var Action = /** @class */ (function (_super) {
      __extends(Action, _super);
      function Action(scheduler, work) {
          return _super.call(this) || this;
      }
      /**
       * Schedules this action on its parent Scheduler for execution. May be passed
       * some context object, `state`. May happen at some point in the future,
       * according to the `delay` parameter, if specified.
       * @param {T} [state] Some contextual data that the `work` function uses when
       * called by the Scheduler.
       * @param {number} [delay] Time to wait before executing the work, where the
       * time unit is implicit and defined by the Scheduler.
       * @return {void}
       */
      Action.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          return this;
      };
      return Action;
  }(Subscription_1.Subscription));
  exports.Action = Action;
  
  });
  
  unwrapExports(Action_1);
  var Action_2 = Action_1.Action;
  
  var AsyncAction_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var AsyncAction = /** @class */ (function (_super) {
      __extends(AsyncAction, _super);
      function AsyncAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
      }
      AsyncAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (this.closed) {
              return this;
          }
          // Always replace the current state with the new state.
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          //
          // Important implementation note:
          //
          // Actions only execute once by default, unless rescheduled from within the
          // scheduled callback. This allows us to implement single and repeat
          // actions via the same code path, without adding API surface area, as well
          // as mimic traditional recursion but across asynchronous boundaries.
          //
          // However, JS runtimes and timers distinguish between intervals achieved by
          // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
          // serial `setTimeout` calls can be individually delayed, which delays
          // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
          // guarantee the interval callback will be invoked more precisely to the
          // interval period, regardless of load.
          //
          // Therefore, we use `setInterval` to schedule single and repeat actions.
          // If the action reschedules itself with the same delay, the interval is not
          // canceled. If the action doesn't reschedule, or reschedules with a
          // different delay, the interval will be canceled after scheduled callback
          // execution.
          //
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          // Set the pending flag indicating that this action has been scheduled, or
          // has recursively rescheduled itself.
          this.pending = true;
          this.delay = delay;
          // If this action has already an async Id, don't request a new one.
          this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
          return this;
      };
      AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          return root.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If this action is rescheduled with the same delay time, don't clear the interval id.
          if (delay !== null && this.delay === delay && this.pending === false) {
              return id;
          }
          // Otherwise, if the action's delay time is different from the current delay,
          // or the action has been rescheduled before it's executed, clear the interval id
          return root.root.clearInterval(id) && undefined || undefined;
      };
      /**
       * Immediately executes this action and the `work` it contains.
       * @return {any}
       */
      AsyncAction.prototype.execute = function (state, delay) {
          if (this.closed) {
              return new Error('executing a cancelled action');
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
              return error;
          }
          else if (this.pending === false && this.id != null) {
              // Dequeue if the action didn't reschedule itself. Don't call
              // unsubscribe(), because the action could reschedule later.
              // For example:
              // ```
              // scheduler.schedule(function doWork(counter) {
              //   /* ... I'm a busy worker bee ... */
              //   var originalAction = this;
              //   /* wait 100ms before rescheduling the action */
              //   setTimeout(function () {
              //     originalAction.schedule(counter + 1);
              //   }, 100);
              // }, 1000);
              // ```
              this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
      };
      AsyncAction.prototype._execute = function (state, delay) {
          var errored = false;
          var errorValue = undefined;
          try {
              this.work(state);
          }
          catch (e) {
              errored = true;
              errorValue = !!e && e || new Error(e);
          }
          if (errored) {
              this.unsubscribe();
              return errorValue;
          }
      };
      AsyncAction.prototype._unsubscribe = function () {
          var id = this.id;
          var scheduler = this.scheduler;
          var actions = scheduler.actions;
          var index = actions.indexOf(this);
          this.work = null;
          this.state = null;
          this.pending = false;
          this.scheduler = null;
          if (index !== -1) {
              actions.splice(index, 1);
          }
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
      };
      return AsyncAction;
  }(Action_1.Action));
  exports.AsyncAction = AsyncAction;
  
  });
  
  unwrapExports(AsyncAction_1);
  var AsyncAction_2 = AsyncAction_1.AsyncAction;
  
  var Scheduler_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An execution context and a data structure to order tasks and schedule their
   * execution. Provides a notion of (potentially virtual) time, through the
   * `now()` getter method.
   *
   * Each unit of work in a Scheduler is called an {@link Action}.
   *
   * ```ts
   * class Scheduler {
   *   now(): number;
   *   schedule(work, delay?, state?): Subscription;
   * }
   * ```
   *
   * @class Scheduler
   */
  var Scheduler = /** @class */ (function () {
      function Scheduler(SchedulerAction, now) {
          if (now === void 0) { now = Scheduler.now; }
          this.SchedulerAction = SchedulerAction;
          this.now = now;
      }
      /**
       * Schedules a function, `work`, for execution. May happen at some point in
       * the future, according to the `delay` parameter, if specified. May be passed
       * some context object, `state`, which will be passed to the `work` function.
       *
       * The given arguments will be processed an stored as an Action object in a
       * queue of actions.
       *
       * @param {function(state: ?T): ?Subscription} work A function representing a
       * task, or some unit of work to be executed by the Scheduler.
       * @param {number} [delay] Time to wait before executing the work, where the
       * time unit is implicit and defined by the Scheduler itself.
       * @param {T} [state] Some contextual data that the `work` function uses when
       * called by the Scheduler.
       * @return {Subscription} A subscription in order to be able to unsubscribe
       * the scheduled work.
       */
      Scheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) { delay = 0; }
          return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
      return Scheduler;
  }());
  exports.Scheduler = Scheduler;
  
  });
  
  unwrapExports(Scheduler_1);
  var Scheduler_2 = Scheduler_1.Scheduler;
  
  var AsyncScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var AsyncScheduler = /** @class */ (function (_super) {
      __extends(AsyncScheduler, _super);
      function AsyncScheduler() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.actions = [];
          /**
           * A flag to indicate whether the Scheduler is currently executing a batch of
           * queued actions.
           * @type {boolean}
           */
          _this.active = false;
          /**
           * An internal ID used to track the latest asynchronous task such as those
           * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
           * others.
           * @type {any}
           */
          _this.scheduled = undefined;
          return _this;
      }
      AsyncScheduler.prototype.flush = function (action) {
          var actions = this.actions;
          if (this.active) {
              actions.push(action);
              return;
          }
          var error;
          this.active = true;
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (action = actions.shift()); // exhaust the scheduler queue
          this.active = false;
          if (error) {
              while (action = actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsyncScheduler;
  }(Scheduler_1.Scheduler));
  exports.AsyncScheduler = AsyncScheduler;
  
  });
  
  unwrapExports(AsyncScheduler_1);
  var AsyncScheduler_2 = AsyncScheduler_1.AsyncScheduler;
  
  var async = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Async Scheduler
   *
   * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
   *
   * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
   * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
   * in intervals.
   *
   * If you just want to "defer" task, that is to perform it right after currently
   * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
   * better choice will be the {@link asap} scheduler.
   *
   * @example <caption>Use async scheduler to delay task</caption>
   * const task = () => console.log('it works!');
   *
   * Rx.Scheduler.async.schedule(task, 2000);
   *
   * // After 2 seconds logs:
   * // "it works!"
   *
   *
   * @example <caption>Use async scheduler to repeat task in intervals</caption>
   * function task(state) {
   *   console.log(state);
   *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
   *                                   // which we reschedule with new state and delay
   * }
   *
   * Rx.Scheduler.async.schedule(task, 3000, 0);
   *
   * // Logs:
   * // 0 after 3s
   * // 1 after 4s
   * // 2 after 5s
   * // 3 after 6s
   *
   * @static true
   * @name async
   * @owner Scheduler
   */
  exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
  
  });
  
  unwrapExports(async);
  var async_1 = async.async;
  
  var isNumeric_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function isNumeric(val) {
      // parseFloat NaNs numeric-cast false positives (null|true|false|"")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      // adding 1 corrects loss of precision from parseFloat (#15100)
      return !isArray.isArray(val) && (val - parseFloat(val) + 1) >= 0;
  }
  exports.isNumeric = isNumeric;
  
  });
  
  unwrapExports(isNumeric_1);
  var isNumeric_2 = isNumeric_1.isNumeric;
  
  var interval_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Creates an Observable that emits sequential numbers every specified
   * interval of time, on a specified IScheduler.
   *
   * <span class="informal">Emits incremental numbers periodically in time.
   * </span>
   *
   * <img src="./img/interval.png" width="100%">
   *
   * `interval` returns an Observable that emits an infinite sequence of
   * ascending integers, with a constant interval of time of your choosing
   * between those emissions. The first emission is not sent immediately, but
   * only after the first period has passed. By default, this operator uses the
   * `async` IScheduler to provide a notion of time, but you may pass any
   * IScheduler to it.
   *
   * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
   * var numbers = Rx.Observable.interval(1000);
   * numbers.subscribe(x => console.log(x));
   *
   * @see {@link timer}
   * @see {@link delay}
   *
   * @param {number} [period=0] The interval size in milliseconds (by default)
   * or the time unit determined by the scheduler's clock.
   * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
   * the emission of values, and providing a notion of "time".
   * @return {Observable} An Observable that emits a sequential number each time
   * interval.
   * @static true
   * @name interval
   * @owner Observable
   */
  function interval(period, scheduler) {
      if (period === void 0) { period = 0; }
      if (scheduler === void 0) { scheduler = async.async; }
      if (!isNumeric_1.isNumeric(period) || period < 0) {
          period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== 'function') {
          scheduler = async.async;
      }
      return new Observable_1.Observable(function (subscriber) {
          subscriber.add(scheduler.schedule(dispatch, period, { subscriber: subscriber, counter: 0, period: period }));
          return subscriber;
      });
  }
  exports.interval = interval;
  function dispatch(state) {
      var subscriber = state.subscriber, counter = state.counter, period = state.period;
      subscriber.next(counter);
      this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
  }
  
  });
  
  unwrapExports(interval_1);
  var interval_2 = interval_1.interval;
  
  var interval$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.interval = interval_1.interval;
  
  });
  
  unwrapExports(interval$1);
  
  var merge_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Creates an output Observable which concurrently emits all values from every
   * given input Observable.
   *
   * <span class="informal">Flattens multiple Observables together by blending
   * their values into one Observable.</span>
   *
   * <img src="./img/merge.png" width="100%">
   *
   * `merge` subscribes to each given input Observable (as arguments), and simply
   * forwards (without doing any transformation) all the values from all the input
   * Observables to the output Observable. The output Observable only completes
   * once all input Observables have completed. Any error delivered by an input
   * Observable will be immediately emitted on the output Observable.
   *
   * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var timer = Rx.Observable.interval(1000);
   * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
   * clicksOrTimer.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // timer will emit ascending values, one every second(1000ms) to console
   * // clicks logs MouseEvents to console everytime the "document" is clicked
   * // Since the two streams are merged you see these happening
   * // as they occur.
   *
   * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
   * var timer1 = Rx.Observable.interval(1000).take(10);
   * var timer2 = Rx.Observable.interval(2000).take(6);
   * var timer3 = Rx.Observable.interval(500).take(10);
   * var concurrent = 2; // the argument
   * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
   * merged.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // - First timer1 and timer2 will run concurrently
   * // - timer1 will emit a value every 1000ms for 10 iterations
   * // - timer2 will emit a value every 2000ms for 6 iterations
   * // - after timer1 hits it's max iteration, timer2 will
   * //   continue, and timer3 will start to run concurrently with timer2
   * // - when timer2 hits it's max iteration it terminates, and
   * //   timer3 will continue to emit a value every 500ms until it is complete
   *
   * @see {@link mergeAll}
   * @see {@link mergeMap}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   *
   * @param {...ObservableInput} observables Input Observables to merge together.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
   * concurrency of input Observables.
   * @return {Observable} an Observable that emits items that are the result of
   * every input Observable.
   * @static true
   * @name merge
   * @owner Observable
   */
  function merge() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      var concurrent = Number.POSITIVE_INFINITY;
      var scheduler = null;
      var last = observables[observables.length - 1];
      if (isScheduler_1.isScheduler(last)) {
          scheduler = observables.pop();
          if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
              concurrent = observables.pop();
          }
      }
      else if (typeof last === 'number') {
          concurrent = observables.pop();
      }
      if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
          return observables[0];
      }
      return mergeAll_1.mergeAll(concurrent)(fromArray_1.fromArray(observables, scheduler));
  }
  exports.merge = merge;
  
  });
  
  unwrapExports(merge_1);
  var merge_2 = merge_1.merge;
  
  var merge$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.merge = merge_1.merge;
  
  });
  
  unwrapExports(merge$1);
  
  var race_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      // if the only argument is an array, it was most likely called with
      // `race([obs1, obs2, ...])`
      if (observables.length === 1) {
          if (isArray.isArray(observables[0])) {
              observables = observables[0];
          }
          else {
              return observables[0];
          }
      }
      return fromArray_1.fromArray(observables, undefined).lift(new RaceOperator());
  }
  exports.race = race;
  var RaceOperator = /** @class */ (function () {
      function RaceOperator() {
      }
      RaceOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new RaceSubscriber(subscriber));
      };
      return RaceOperator;
  }());
  exports.RaceOperator = RaceOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var RaceSubscriber = /** @class */ (function (_super) {
      __extends(RaceSubscriber, _super);
      function RaceSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasFirst = false;
          _this.observables = [];
          _this.subscriptions = [];
          return _this;
      }
      RaceSubscriber.prototype._next = function (observable) {
          this.observables.push(observable);
      };
      RaceSubscriber.prototype._complete = function () {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
              this.destination.complete();
          }
          else {
              for (var i = 0; i < len && !this.hasFirst; i++) {
                  var observable = observables[i];
                  var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                  if (this.subscriptions) {
                      this.subscriptions.push(subscription);
                  }
                  this.add(subscription);
              }
              this.observables = null;
          }
      };
      RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (!this.hasFirst) {
              this.hasFirst = true;
              for (var i = 0; i < this.subscriptions.length; i++) {
                  if (i !== outerIndex) {
                      var subscription = this.subscriptions[i];
                      subscription.unsubscribe();
                      this.remove(subscription);
                  }
              }
              this.subscriptions = null;
          }
          this.destination.next(innerValue);
      };
      return RaceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.RaceSubscriber = RaceSubscriber;
  
  });
  
  unwrapExports(race_1);
  var race_2 = race_1.race;
  var race_3 = race_1.RaceOperator;
  var race_4 = race_1.RaceSubscriber;
  
  var race$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.race = race_1.race;
  
  });
  
  unwrapExports(race$1);
  
  var never_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /** @internal */
  exports.NEVER = new Observable_1.Observable(noop_1.noop);
  /**
   * Creates an Observable that emits no items to the Observer.
   *
   * <span class="informal">An Observable that never emits anything.</span>
   *
   * <img src="./img/never.png" width="100%">
   *
   * This static operator is useful for creating a simple Observable that emits
   * neither values nor errors nor the completion notification. It can be used
   * for testing purposes or for composing with other Observables. Please note
   * that by never emitting a complete notification, this Observable keeps the
   * subscription from being disposed automatically. Subscriptions need to be
   * manually disposed.
   *
   * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
   * function info() {
   *   console.log('Will not be called');
   * }
   * var result = Rx.Observable.never().startWith(7);
   * result.subscribe(x => console.log(x), info, info);
   *
   * @see {@link create}
   * @see {@link empty}
   * @see {@link of}
   * @see {@link throw}
   *
   * @return {Observable} A "never" Observable: never emits anything.
   * @static true
   * @name never
   * @owner Observable
   */
  function never() {
      return exports.NEVER;
  }
  exports.never = never;
  
  });
  
  unwrapExports(never_1);
  var never_2 = never_1.NEVER;
  var never_3 = never_1.never;
  
  var never$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.never = never_1.never;
  
  });
  
  unwrapExports(never$1);
  
  var of$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.of = of_1.of;
  
  });
  
  unwrapExports(of$1);
  
  var onErrorResumeNext_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
   * that was passed.
   *
   * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
   *
   * <img src="./img/onErrorResumeNext.png" width="100%">
   *
   * `onErrorResumeNext` Will subscribe to each observable source it is provided, in order.
   * If the source it's subscribed to emits an error or completes, it will move to the next source
   * without error.
   *
   * If `onErrorResumeNext` is provided no arguments, or a single, empty array, it will return {@link EMPTY}.
   *
   * `onErrorResumeNext` is basically {@link concat}, only it will continue, even if one of its
   * sources emits an error.
   *
   * Note that there is no way to handle any errors thrown by sources via the resuult of
   * `onErrorResumeNext`. If you want to handle errors thrown in any given source, you can
   * always use the {@link catchError} operator on them before passing them into `onErrorResumeNext`.
   *
   * @example <caption>Subscribe to the next Observable after map fails</caption>
   * import { onErrorResumeNext, of } from 'rxjs/create';
   * import { map } from 'rxjs/operators';
   *
   * onErrorResumeNext(
   *  of(1, 2, 3, 0).pipe(
   *    map(x => {
   *      if (x === 0) throw Error();
   *      return 10 / x;
   *    })
   *  ),
   *  of(1, 2, 3),
   * )
   * .subscribe(
   *   val => console.log(val),
   *   err => console.log(err),          // Will never be called.
   *   () => console.log('done')
   * );
   *
   * // Logs:
   * // 10
   * // 5
   * // 3.3333333333333335
   * // 1
   * // 2
   * // 3
   * // "done"
   *
   * @see {@link concat}
   * @see {@link catch}
   *
   * @param {...ObservableInput} sources Observables (or anything that *is* observable) passed either directly or as an array.
   * @return {Observable} An Observable that concatenates all sources, one after the other,
   * ignoring all errors, such that any error causes it to move on to the next source.
   */
  function onErrorResumeNext() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
      }
      if (sources.length === 0) {
          return empty_1.EMPTY;
      }
      var first = sources[0], remainder = sources.slice(1);
      if (sources.length === 1 && isArray.isArray(first)) {
          return onErrorResumeNext.apply(void 0, first);
      }
      return new Observable_1.Observable(function (subscriber) {
          var subNext = function () { return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber)); };
          return from_1.from(first).subscribe({
              next: function (value) { subscriber.next(value); },
              error: subNext,
              complete: subNext,
          });
      });
  }
  exports.onErrorResumeNext = onErrorResumeNext;
  
  });
  
  unwrapExports(onErrorResumeNext_1);
  var onErrorResumeNext_2 = onErrorResumeNext_1.onErrorResumeNext;
  
  var onErrorResumeNext$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
  
  });
  
  unwrapExports(onErrorResumeNext$1);
  
  var pairs_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Convert an object into an observable sequence of [key, value] pairs
   * using an optional IScheduler to enumerate the object.
   *
   * @example <caption>Converts a javascript object to an Observable</caption>
   * var obj = {
   *   foo: 42,
   *   bar: 56,
   *   baz: 78
   * };
   *
   * var source = Rx.Observable.pairs(obj);
   *
   * var subscription = source.subscribe(
   *   function (x) {
   *     console.log('Next: %s', x);
   *   },
   *   function (err) {
   *     console.log('Error: %s', err);
   *   },
   *   function () {
   *     console.log('Completed');
   *   });
   *
   * @param {Object} obj The object to inspect and turn into an
   * Observable sequence.
   * @param {Scheduler} [scheduler] An optional IScheduler to run the
   * enumeration of the input sequence on.
   * @returns {(Observable<[string, T]>)} An observable sequence of
   * [key, value] pairs from the object.
   */
  function pairs(obj, scheduler) {
      if (!scheduler) {
          return new Observable_1.Observable(function (subscriber) {
              var keys = Object.keys(obj);
              for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                  var key = keys[i];
                  if (obj.hasOwnProperty(key)) {
                      subscriber.next([key, obj[key]]);
                  }
              }
              subscriber.complete();
          });
      }
      else {
          return new Observable_1.Observable(function (subscriber) {
              var keys = Object.keys(obj);
              var subscription = new Subscription_1.Subscription();
              subscription.add(scheduler.schedule(dispatch, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
              return subscription;
          });
      }
  }
  exports.pairs = pairs;
  /** @internal */
  function dispatch(state) {
      var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
      if (!subscriber.closed) {
          if (index < keys.length) {
              var key = keys[index];
              subscriber.next([key, obj[key]]);
              subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
          }
          else {
              subscriber.complete();
          }
      }
  }
  exports.dispatch = dispatch;
  
  });
  
  unwrapExports(pairs_1);
  var pairs_2 = pairs_1.pairs;
  var pairs_3 = pairs_1.dispatch;
  
  var pairs$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.pairs = pairs_1.pairs;
  
  });
  
  unwrapExports(pairs$1);
  
  var range_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Creates an Observable that emits a sequence of numbers within a specified
   * range.
   *
   * <span class="informal">Emits a sequence of numbers in a range.</span>
   *
   * <img src="./img/range.png" width="100%">
   *
   * `range` operator emits a range of sequential integers, in order, where you
   * select the `start` of the range and its `length`. By default, uses no
   * IScheduler and just delivers the notifications synchronously, but may use
   * an optional IScheduler to regulate those deliveries.
   *
   * @example <caption>Emits the numbers 1 to 10</caption>
   * var numbers = Rx.Observable.range(1, 10);
   * numbers.subscribe(x => console.log(x));
   *
   * @see {@link timer}
   * @see {@link interval}
   *
   * @param {number} [start=0] The value of the first integer in the sequence.
   * @param {number} [count=0] The number of sequential integers to generate.
   * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
   * the emissions of the notifications.
   * @return {Observable} An Observable of numbers that emits a finite range of
   * sequential integers.
   * @static true
   * @name range
   * @owner Observable
   */
  function range(start, count, scheduler) {
      if (start === void 0) { start = 0; }
      if (count === void 0) { count = 0; }
      return new Observable_1.Observable(function (subscriber) {
          var index = 0;
          if (scheduler) {
              return scheduler.schedule(dispatch, 0, {
                  index: index, count: count, start: start, subscriber: subscriber
              });
          }
          else {
              do {
                  if (index++ >= count) {
                      subscriber.complete();
                      break;
                  }
                  subscriber.next(start++);
                  if (subscriber.closed) {
                      break;
                  }
              } while (true);
          }
          return undefined;
      });
  }
  exports.range = range;
  /** @internal */
  function dispatch(state) {
      var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
      if (index >= count) {
          subscriber.complete();
          return;
      }
      subscriber.next(start);
      if (subscriber.closed) {
          return;
      }
      state.index = index + 1;
      state.start = start + 1;
      this.schedule(state);
  }
  exports.dispatch = dispatch;
  
  });
  
  unwrapExports(range_1);
  var range_2 = range_1.range;
  var range_3 = range_1.dispatch;
  
  var range$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.range = range_1.range;
  
  });
  
  unwrapExports(range$1);
  
  var UsingObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var UsingObservable = /** @class */ (function (_super) {
      __extends(UsingObservable, _super);
      function UsingObservable(resourceFactory, observableFactory) {
          var _this = _super.call(this) || this;
          _this.resourceFactory = resourceFactory;
          _this.observableFactory = observableFactory;
          return _this;
      }
      /**
       * Creates an Observable that uses a resource which will be disposed at the same time as the Observable.
       *
       * <span class="informal">Use it when you catch yourself cleaning up after an Observable.</span>
       *
       * `using` is a factory operator, which accepts two functions. First function returns a disposable resource.
       * It can be an arbitrary object that implements `unsubscribe` method. Second function will be injected with
       * that object and should return an Observable. That Observable can use resource object during its execution.
       * Both functions passed to `using` will be called every time someone subscribes - neither an Observable nor
       * resource object will be shared in any way between subscriptions.
       *
       * When Observable returned by `using` is subscribed, Observable returned from the second function will be subscribed
       * as well. All its notifications (nexted values, completion and error events) will be emitted unchanged by the output
       * Observable. If however someone unsubscribes from the Observable or source Observable completes or errors by itself,
       * the `unsubscribe` method on resource object will be called. This can be used to do any necessary clean up, which
       * otherwise would have to be handled by hand. Note that complete or error notifications are not emitted when someone
       * cancels subscription to an Observable via `unsubscribe`, so `using` can be used as a hook, allowing you to make
       * sure that all resources which need to exist during an Observable execution will be disposed at appropriate time.
       *
       * @see {@link defer}
       *
       * @param {function(): ISubscription} resourceFactory A function which creates any resource object
       * that implements `unsubscribe` method.
       * @param {function(resource: ISubscription): Observable<T>} observableFactory A function which
       * creates an Observable, that can use injected resource object.
       * @return {Observable<T>} An Observable that behaves the same as Observable returned by `observableFactory`, but
       * which - when completed, errored or unsubscribed - will also call `unsubscribe` on created resource object.
       * @static true
       * @name using
       * @owner Observable
       */
      UsingObservable.create = function (resourceFactory, observableFactory) {
          return new UsingObservable(resourceFactory, observableFactory);
      };
      UsingObservable.prototype._subscribe = function (subscriber) {
          var _a = this, resourceFactory = _a.resourceFactory, observableFactory = _a.observableFactory;
          var resource;
          try {
              resource = resourceFactory();
              return new UsingSubscriber(subscriber, resource, observableFactory);
          }
          catch (err) {
              subscriber.error(err);
          }
      };
      return UsingObservable;
  }(Observable_1.Observable));
  exports.UsingObservable = UsingObservable;
  var UsingSubscriber = /** @class */ (function (_super) {
      __extends(UsingSubscriber, _super);
      function UsingSubscriber(destination, resource, observableFactory) {
          var _this = _super.call(this, destination) || this;
          _this.resource = resource;
          _this.observableFactory = observableFactory;
          destination.add(resource);
          _this.tryUse();
          return _this;
      }
      UsingSubscriber.prototype.tryUse = function () {
          try {
              var source = this.observableFactory.call(this, this.resource);
              if (source) {
                  this.add(subscribeToResult_1.subscribeToResult(this, source));
              }
          }
          catch (err) {
              this._error(err);
          }
      };
      return UsingSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(UsingObservable_1);
  var UsingObservable_2 = UsingObservable_1.UsingObservable;
  
  var using = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.using = UsingObservable_1.UsingObservable.create;
  
  });
  
  unwrapExports(using);
  var using_1 = using.using;
  
  var using$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.using = using.using;
  
  });
  
  unwrapExports(using$2);
  
  var throwError_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Creates an Observable that emits no items to the Observer and immediately
   * emits an error notification.
   *
   * <span class="informal">Just emits 'error', and nothing else.
   * </span>
   *
   * <img src="./img/throw.png" width="100%">
   *
   * This static operator is useful for creating a simple Observable that only
   * emits the error notification. It can be used for composing with other
   * Observables, such as in a {@link mergeMap}.
   *
   * @example <caption>Emit the number 7, then emit an error.</caption>
   * import { throwError, concat, of } from 'rxjs/create';
   *
   * const result = concat(of(7), throwError(new Error('oops!')));
   * result.subscribe(x => console.log(x), e => console.error(e));
   *
   * @example <caption>Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
   * import { throwError, interval, of } from 'rxjs/create';
   * import { mergeMap } from 'rxjs/operators';
   *
   * interval(1000).pipe(
   *   mergeMap(x => x === 13 ?
   *     throwError('Thirteens are bad') :
   *     of('a', 'b', 'c')
   *   )
   * ).subscribe(x => console.log(x), e => console.error(e));
   *
   * @see {@link create}
   * @see {@link empty}
   * @see {@link never}
   * @see {@link of}
   *
   * @param {any} error The particular Error to pass to the error notification.
   * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
   * the emission of the error notification.
   * @return {Observable} An error Observable: emits only the error notification
   * using the given error argument.
   * @static true
   * @name throw
   * @owner Observable
   */
  function throwError(error, scheduler) {
      if (!scheduler) {
          return new Observable_1.Observable(function (subscriber) { return subscriber.error(error); });
      }
      else {
          return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber }); });
      }
  }
  exports.throwError = throwError;
  function dispatch(_a) {
      var error = _a.error, subscriber = _a.subscriber;
      subscriber.error(error);
  }
  
  });
  
  unwrapExports(throwError_1);
  var throwError_2 = throwError_1.throwError;
  
  var _throw = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.throw = throwError_1.throwError;
  
  });
  
  unwrapExports(_throw);
  
  var timer_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Creates an Observable that starts emitting after an `initialDelay` and
   * emits ever increasing numbers after each `period` of time thereafter.
   *
   * <span class="informal">Its like {@link interval}, but you can specify when
   * should the emissions start.</span>
   *
   * <img src="./img/timer.png" width="100%">
   *
   * `timer` returns an Observable that emits an infinite sequence of ascending
   * integers, with a constant interval of time, `period` of your choosing
   * between those emissions. The first emission happens after the specified
   * `initialDelay`. The initial delay may be a {@link Date}. By default, this
   * operator uses the `async` IScheduler to provide a notion of time, but you
   * may pass any IScheduler to it. If `period` is not specified, the output
   * Observable emits only one value, `0`. Otherwise, it emits an infinite
   * sequence.
   *
   * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
   * var numbers = Rx.Observable.timer(3000, 1000);
   * numbers.subscribe(x => console.log(x));
   *
   * @example <caption>Emits one number after five seconds</caption>
   * var numbers = Rx.Observable.timer(5000);
   * numbers.subscribe(x => console.log(x));
   *
   * @see {@link interval}
   * @see {@link delay}
   *
   * @param {number|Date} [dueTime] The initial delay time to wait before
   * emitting the first value of `0`.
   * @param {number|IScheduler} [periodOrScheduler] The period of time between emissions of the
   * subsequent numbers.
   * @param {IScheduler} [scheduler=async] The IScheduler to use for scheduling
   * the emission of values, and providing a notion of "time".
   * @return {Observable} An Observable that emits a `0` after the
   * `initialDelay` and ever increasing numbers after each `period` of time
   * thereafter.
   * @static true
   * @name timer
   * @owner Observable
   */
  function timer(dueTime, periodOrScheduler, scheduler) {
      if (dueTime === void 0) { dueTime = 0; }
      var period = -1;
      if (isNumeric_1.isNumeric(periodOrScheduler)) {
          period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
      }
      else if (isScheduler_1.isScheduler(periodOrScheduler)) {
          scheduler = periodOrScheduler;
      }
      if (!isScheduler_1.isScheduler(scheduler)) {
          scheduler = async.async;
      }
      return new Observable_1.Observable(function (subscriber) {
          var due = isNumeric_1.isNumeric(dueTime)
              ? dueTime
              : (+dueTime - scheduler.now());
          return scheduler.schedule(dispatch, due, {
              index: 0, period: period, subscriber: subscriber
          });
      });
  }
  exports.timer = timer;
  function dispatch(state) {
      var index = state.index, period = state.period, subscriber = state.subscriber;
      subscriber.next(index);
      if (subscriber.closed) {
          return;
      }
      else if (period === -1) {
          return subscriber.complete();
      }
      state.index = index + 1;
      this.schedule(state, period);
  }
  
  });
  
  unwrapExports(timer_1);
  var timer_2 = timer_1.timer;
  
  var timer$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.timer = timer_1.timer;
  
  });
  
  unwrapExports(timer$1);
  
  var zip_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each
   * of its input Observables.
   *
   * If the latest parameter is a function, this function is used to compute the created value from the input values.
   * Otherwise, an array of the input values is returned.
   *
   * @example <caption>Combine age and name from different sources</caption>
   *
   * let age$ = Observable.of<number>(27, 25, 29);
   * let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
   * let isDev$ = Observable.of<boolean>(true, true, false);
   *
   * Observable
   *     .zip(age$,
   *          name$,
   *          isDev$,
   *          (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
   *     .subscribe(x => console.log(x));
   *
   * // outputs
   * // { age: 27, name: 'Foo', isDev: true }
   * // { age: 25, name: 'Bar', isDev: true }
   * // { age: 29, name: 'Beer', isDev: false }
   *
   * @param observables
   * @return {Observable<R>}
   * @static true
   * @name zip
   * @owner Observable
   */
  function zip() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      var project = observables[observables.length - 1];
      if (typeof project === 'function') {
          observables.pop();
      }
      return fromArray_1.fromArray(observables, undefined).lift(new ZipOperator(project));
  }
  exports.zip = zip;
  var ZipOperator = /** @class */ (function () {
      function ZipOperator(project) {
          this.project = project;
      }
      ZipOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ZipSubscriber(subscriber, this.project));
      };
      return ZipOperator;
  }());
  exports.ZipOperator = ZipOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ZipSubscriber = /** @class */ (function (_super) {
      __extends(ZipSubscriber, _super);
      function ZipSubscriber(destination, project, values) {
          if (values === void 0) { values = Object.create(null); }
          var _this = _super.call(this, destination) || this;
          _this.iterators = [];
          _this.active = 0;
          _this.project = (typeof project === 'function') ? project : null;
          _this.values = values;
          return _this;
      }
      ZipSubscriber.prototype._next = function (value) {
          var iterators = this.iterators;
          if (isArray.isArray(value)) {
              iterators.push(new StaticArrayIterator(value));
          }
          else if (typeof value[iterator.iterator] === 'function') {
              iterators.push(new StaticIterator(value[iterator.iterator]()));
          }
          else {
              iterators.push(new ZipBufferIterator(this.destination, this, value));
          }
      };
      ZipSubscriber.prototype._complete = function () {
          var iterators = this.iterators;
          var len = iterators.length;
          if (len === 0) {
              this.destination.complete();
              return;
          }
          this.active = len;
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              if (iterator$$1.stillUnsubscribed) {
                  this.add(iterator$$1.subscribe(iterator$$1, i));
              }
              else {
                  this.active--; // not an observable
              }
          }
      };
      ZipSubscriber.prototype.notifyInactive = function () {
          this.active--;
          if (this.active === 0) {
              this.destination.complete();
          }
      };
      ZipSubscriber.prototype.checkIterators = function () {
          var iterators = this.iterators;
          var len = iterators.length;
          var destination = this.destination;
          // abort if not all of them have values
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
                  return;
              }
          }
          var shouldComplete = false;
          var args = [];
          for (var i = 0; i < len; i++) {
              var iterator$$1 = iterators[i];
              var result = iterator$$1.next();
              // check to see if it's completed now that you've gotten
              // the next value.
              if (iterator$$1.hasCompleted()) {
                  shouldComplete = true;
              }
              if (result.done) {
                  destination.complete();
                  return;
              }
              args.push(result.value);
          }
          if (this.project) {
              this._tryProject(args);
          }
          else {
              destination.next(args);
          }
          if (shouldComplete) {
              destination.complete();
          }
      };
      ZipSubscriber.prototype._tryProject = function (args) {
          var result;
          try {
              result = this.project.apply(this, args);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return ZipSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ZipSubscriber = ZipSubscriber;
  var StaticIterator = /** @class */ (function () {
      function StaticIterator(iterator$$1) {
          this.iterator = iterator$$1;
          this.nextResult = iterator$$1.next();
      }
      StaticIterator.prototype.hasValue = function () {
          return true;
      };
      StaticIterator.prototype.next = function () {
          var result = this.nextResult;
          this.nextResult = this.iterator.next();
          return result;
      };
      StaticIterator.prototype.hasCompleted = function () {
          var nextResult = this.nextResult;
          return nextResult && nextResult.done;
      };
      return StaticIterator;
  }());
  var StaticArrayIterator = /** @class */ (function () {
      function StaticArrayIterator(array) {
          this.array = array;
          this.index = 0;
          this.length = 0;
          this.length = array.length;
      }
      StaticArrayIterator.prototype[iterator.iterator] = function () {
          return this;
      };
      StaticArrayIterator.prototype.next = function (value) {
          var i = this.index++;
          var array = this.array;
          return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
      };
      StaticArrayIterator.prototype.hasValue = function () {
          return this.array.length > this.index;
      };
      StaticArrayIterator.prototype.hasCompleted = function () {
          return this.array.length === this.index;
      };
      return StaticArrayIterator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ZipBufferIterator = /** @class */ (function (_super) {
      __extends(ZipBufferIterator, _super);
      function ZipBufferIterator(destination, parent, observable) {
          var _this = _super.call(this, destination) || this;
          _this.parent = parent;
          _this.observable = observable;
          _this.stillUnsubscribed = true;
          _this.buffer = [];
          _this.isComplete = false;
          return _this;
      }
      ZipBufferIterator.prototype[iterator.iterator] = function () {
          return this;
      };
      // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
      //    this is legit because `next()` will never be called by a subscription in this case.
      ZipBufferIterator.prototype.next = function () {
          var buffer = this.buffer;
          if (buffer.length === 0 && this.isComplete) {
              return { value: null, done: true };
          }
          else {
              return { value: buffer.shift(), done: false };
          }
      };
      ZipBufferIterator.prototype.hasValue = function () {
          return this.buffer.length > 0;
      };
      ZipBufferIterator.prototype.hasCompleted = function () {
          return this.buffer.length === 0 && this.isComplete;
      };
      ZipBufferIterator.prototype.notifyComplete = function () {
          if (this.buffer.length > 0) {
              this.isComplete = true;
              this.parent.notifyInactive();
          }
          else {
              this.destination.complete();
          }
      };
      ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.buffer.push(innerValue);
          this.parent.checkIterators();
      };
      ZipBufferIterator.prototype.subscribe = function (value, index) {
          return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
      };
      return ZipBufferIterator;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(zip_1);
  var zip_2 = zip_1.zip;
  var zip_3 = zip_1.ZipOperator;
  var zip_4 = zip_1.ZipSubscriber;
  
  var zip$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.zip = zip_1.zip;
  
  });
  
  unwrapExports(zip$1);
  
  var map_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Applies a given `project` function to each value emitted by the source
   * Observable, and emits the resulting values as an Observable.
   *
   * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
   * it passes each source value through a transformation function to get
   * corresponding output values.</span>
   *
   * <img src="./img/map.png" width="100%">
   *
   * Similar to the well known `Array.prototype.map` function, this operator
   * applies a projection to each value and emits that projection in the output
   * Observable.
   *
   * @example <caption>Map every click to the clientX position of that click</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var positions = clicks.map(ev => ev.clientX);
   * positions.subscribe(x => console.log(x));
   *
   * @see {@link mapTo}
   * @see {@link pluck}
   *
   * @param {function(value: T, index: number): R} project The function to apply
   * to each `value` emitted by the source Observable. The `index` parameter is
   * the number `i` for the i-th emission that has happened since the
   * subscription, starting from the number `0`.
   * @param {any} [thisArg] An optional argument to define what `this` is in the
   * `project` function.
   * @return {Observable<R>} An Observable that emits the values from the source
   * Observable transformed by the given `project` function.
   * @method map
   * @owner Observable
   */
  function map(project, thisArg) {
      return function mapOperation(source) {
          if (typeof project !== 'function') {
              throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
          }
          return source.lift(new MapOperator(project, thisArg));
      };
  }
  exports.map = map;
  var MapOperator = /** @class */ (function () {
      function MapOperator(project, thisArg) {
          this.project = project;
          this.thisArg = thisArg;
      }
      MapOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      };
      return MapOperator;
  }());
  exports.MapOperator = MapOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MapSubscriber = /** @class */ (function (_super) {
      __extends(MapSubscriber, _super);
      function MapSubscriber(destination, project, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.count = 0;
          _this.thisArg = thisArg || _this;
          return _this;
      }
      // NOTE: This looks unoptimized, but it's actually purposefully NOT
      // using try/catch optimizations.
      MapSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.project.call(this.thisArg, value, this.count++);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return MapSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(map_1);
  var map_2 = map_1.map;
  var map_3 = map_1.MapOperator;
  
  var AjaxObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  function getCORSRequest() {
      if (root.root.XMLHttpRequest) {
          return new root.root.XMLHttpRequest();
      }
      else if (!!root.root.XDomainRequest) {
          return new root.root.XDomainRequest();
      }
      else {
          throw new Error('CORS is not supported by your browser');
      }
  }
  function getXMLHttpRequest() {
      if (root.root.XMLHttpRequest) {
          return new root.root.XMLHttpRequest();
      }
      else {
          var progId = void 0;
          try {
              var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
              for (var i = 0; i < 3; i++) {
                  try {
                      progId = progIds[i];
                      if (new root.root.ActiveXObject(progId)) {
                          break;
                      }
                  }
                  catch (e) {
                      //suppress exceptions
                  }
              }
              return new root.root.ActiveXObject(progId);
          }
          catch (e) {
              throw new Error('XMLHttpRequest is not supported by your browser');
          }
      }
  }
  function ajaxGet(url, headers) {
      if (headers === void 0) { headers = null; }
      return new AjaxObservable({ method: 'GET', url: url, headers: headers });
  }
  exports.ajaxGet = ajaxGet;
  function ajaxPost(url, body, headers) {
      return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
  }
  exports.ajaxPost = ajaxPost;
  function ajaxDelete(url, headers) {
      return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
  }
  exports.ajaxDelete = ajaxDelete;
  function ajaxPut(url, body, headers) {
      return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
  }
  exports.ajaxPut = ajaxPut;
  function ajaxPatch(url, body, headers) {
      return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
  }
  exports.ajaxPatch = ajaxPatch;
  var mapResponse = map_1.map(function (x, index) { return x.response; });
  function ajaxGetJSON(url, headers) {
      return mapResponse(new AjaxObservable({
          method: 'GET',
          url: url,
          responseType: 'json',
          headers: headers
      }));
  }
  exports.ajaxGetJSON = ajaxGetJSON;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var AjaxObservable = /** @class */ (function (_super) {
      __extends(AjaxObservable, _super);
      function AjaxObservable(urlOrRequest) {
          var _this = _super.call(this) || this;
          var request = {
              async: true,
              createXHR: function () {
                  return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
              },
              crossDomain: false,
              withCredentials: false,
              headers: {},
              method: 'GET',
              responseType: 'json',
              timeout: 0
          };
          if (typeof urlOrRequest === 'string') {
              request.url = urlOrRequest;
          }
          else {
              for (var prop in urlOrRequest) {
                  if (urlOrRequest.hasOwnProperty(prop)) {
                      request[prop] = urlOrRequest[prop];
                  }
              }
          }
          _this.request = request;
          return _this;
      }
      AjaxObservable.prototype._subscribe = function (subscriber) {
          return new AjaxSubscriber(subscriber, this.request);
      };
      /**
       * Creates an observable for an Ajax request with either a request object with
       * url, headers, etc or a string for a URL.
       *
       * @example
       * source = Rx.Observable.ajax('/products');
       * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
       *
       * @param {string|Object} request Can be one of the following:
       *   A string of the URL to make the Ajax call.
       *   An object with the following properties
       *   - url: URL of the request
       *   - body: The body of the request
       *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
       *   - async: Whether the request is async
       *   - headers: Optional headers
       *   - crossDomain: true if a cross domain request, else false
       *   - createXHR: a function to override if you need to use an alternate
       *   XMLHttpRequest implementation.
       *   - resultSelector: a function to use to alter the output value type of
       *   the Observable. Gets {@link AjaxResponse} as an argument.
       * @return {Observable} An observable sequence containing the XMLHttpRequest.
       * @static true
       * @name ajax
       * @owner Observable
      */
      AjaxObservable.create = (function () {
          var create = function (urlOrRequest) {
              return new AjaxObservable(urlOrRequest);
          };
          create.get = ajaxGet;
          create.post = ajaxPost;
          create.delete = ajaxDelete;
          create.put = ajaxPut;
          create.patch = ajaxPatch;
          create.getJSON = ajaxGetJSON;
          return create;
      })();
      return AjaxObservable;
  }(Observable_1.Observable));
  exports.AjaxObservable = AjaxObservable;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var AjaxSubscriber = /** @class */ (function (_super) {
      __extends(AjaxSubscriber, _super);
      function AjaxSubscriber(destination, request) {
          var _this = _super.call(this, destination) || this;
          _this.request = request;
          _this.done = false;
          var headers = request.headers = request.headers || {};
          // force CORS if requested
          if (!request.crossDomain && !headers['X-Requested-With']) {
              headers['X-Requested-With'] = 'XMLHttpRequest';
          }
          // ensure content type is set
          if (!('Content-Type' in headers) && !(root.root.FormData && request.body instanceof root.root.FormData) && typeof request.body !== 'undefined') {
              headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
          }
          // properly serialize body
          request.body = _this.serializeBody(request.body, request.headers['Content-Type']);
          _this.send();
          return _this;
      }
      AjaxSubscriber.prototype.next = function (e) {
          this.done = true;
          var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
          var response = new AjaxResponse(e, xhr, request);
          destination.next(response);
      };
      AjaxSubscriber.prototype.send = function () {
          var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
          var createXHR = request.createXHR;
          var xhr = tryCatch_1.tryCatch(createXHR).call(request);
          if (xhr === errorObject.errorObject) {
              this.error(errorObject.errorObject.e);
          }
          else {
              this.xhr = xhr;
              // set up the events before open XHR
              // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
              // You need to add the event listeners before calling open() on the request.
              // Otherwise the progress events will not fire.
              this.setupEvents(xhr, request);
              // open XHR
              var result = void 0;
              if (user) {
                  result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
              }
              else {
                  result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
              }
              if (result === errorObject.errorObject) {
                  this.error(errorObject.errorObject.e);
                  return null;
              }
              // timeout, responseType and withCredentials can be set once the XHR is open
              if (async) {
                  xhr.timeout = request.timeout;
                  xhr.responseType = request.responseType;
              }
              if ('withCredentials' in xhr) {
                  xhr.withCredentials = !!request.withCredentials;
              }
              // set headers
              this.setHeaders(xhr, headers);
              // finally send the request
              result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
              if (result === errorObject.errorObject) {
                  this.error(errorObject.errorObject.e);
                  return null;
              }
          }
          return xhr;
      };
      AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
          if (!body || typeof body === 'string') {
              return body;
          }
          else if (root.root.FormData && body instanceof root.root.FormData) {
              return body;
          }
          if (contentType) {
              var splitIndex = contentType.indexOf(';');
              if (splitIndex !== -1) {
                  contentType = contentType.substring(0, splitIndex);
              }
          }
          switch (contentType) {
              case 'application/x-www-form-urlencoded':
                  return Object.keys(body).map(function (key) { return encodeURI(key) + "=" + encodeURI(body[key]); }).join('&');
              case 'application/json':
                  return JSON.stringify(body);
              default:
                  return body;
          }
      };
      AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
          for (var key in headers) {
              if (headers.hasOwnProperty(key)) {
                  xhr.setRequestHeader(key, headers[key]);
              }
          }
      };
      AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
          var progressSubscriber = request.progressSubscriber;
          function xhrTimeout(e) {
              var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
              if (progressSubscriber) {
                  progressSubscriber.error(e);
              }
              subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
          }
          xhr.ontimeout = xhrTimeout;
          xhrTimeout.request = request;
          xhrTimeout.subscriber = this;
          xhrTimeout.progressSubscriber = progressSubscriber;
          if (xhr.upload && 'withCredentials' in xhr) {
              if (progressSubscriber) {
                  var xhrProgress_1;
                  xhrProgress_1 = function (e) {
                      var progressSubscriber = xhrProgress_1.progressSubscriber;
                      progressSubscriber.next(e);
                  };
                  if (root.root.XDomainRequest) {
                      xhr.onprogress = xhrProgress_1;
                  }
                  else {
                      xhr.upload.onprogress = xhrProgress_1;
                  }
                  xhrProgress_1.progressSubscriber = progressSubscriber;
              }
              var xhrError_1;
              xhrError_1 = function (e) {
                  var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                  if (progressSubscriber) {
                      progressSubscriber.error(e);
                  }
                  subscriber.error(new AjaxError('ajax error', this, request));
              };
              xhr.onerror = xhrError_1;
              xhrError_1.request = request;
              xhrError_1.subscriber = this;
              xhrError_1.progressSubscriber = progressSubscriber;
          }
          function xhrReadyStateChange(e) {
              var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
              if (this.readyState === 4) {
                  // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                  var status_1 = this.status === 1223 ? 204 : this.status;
                  var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                  // fix status code when it is 0 (0 status is undocumented).
                  // Occurs when accessing file resources or on Android 4.1 stock browser
                  // while retrieving files from application cache.
                  if (status_1 === 0) {
                      status_1 = response ? 200 : 0;
                  }
                  if (200 <= status_1 && status_1 < 300) {
                      if (progressSubscriber) {
                          progressSubscriber.complete();
                      }
                      subscriber.next(e);
                      subscriber.complete();
                  }
                  else {
                      if (progressSubscriber) {
                          progressSubscriber.error(e);
                      }
                      subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                  }
              }
          }
          xhr.onreadystatechange = xhrReadyStateChange;
          xhrReadyStateChange.subscriber = this;
          xhrReadyStateChange.progressSubscriber = progressSubscriber;
          xhrReadyStateChange.request = request;
      };
      AjaxSubscriber.prototype.unsubscribe = function () {
          var _a = this, done = _a.done, xhr = _a.xhr;
          if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
              xhr.abort();
          }
          _super.prototype.unsubscribe.call(this);
      };
      return AjaxSubscriber;
  }(Subscriber_1.Subscriber));
  exports.AjaxSubscriber = AjaxSubscriber;
  /**
   * A normalized AJAX response.
   *
   * @see {@link ajax}
   *
   * @class AjaxResponse
   */
  var AjaxResponse = /** @class */ (function () {
      function AjaxResponse(originalEvent, xhr, request) {
          this.originalEvent = originalEvent;
          this.xhr = xhr;
          this.request = request;
          this.status = xhr.status;
          this.responseType = xhr.responseType || request.responseType;
          this.response = parseXhrResponse(this.responseType, xhr);
      }
      return AjaxResponse;
  }());
  exports.AjaxResponse = AjaxResponse;
  /**
   * A normalized AJAX error.
   *
   * @see {@link ajax}
   *
   * @class AjaxError
   */
  var AjaxError = /** @class */ (function (_super) {
      __extends(AjaxError, _super);
      function AjaxError(message, xhr, request) {
          var _this = _super.call(this, message) || this;
          _this.message = message;
          _this.xhr = xhr;
          _this.request = request;
          _this.status = xhr.status;
          _this.responseType = xhr.responseType || request.responseType;
          _this.response = parseXhrResponse(_this.responseType, xhr);
          _this.name = 'AjaxError';
          Object.setPrototypeOf(_this, AjaxError.prototype);
          return _this;
      }
      return AjaxError;
  }(Error));
  exports.AjaxError = AjaxError;
  function parseXhrResponse(responseType, xhr) {
      switch (responseType) {
          case 'json':
              if ('response' in xhr) {
                  //IE does not support json as responseType, parse it internally
                  return xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
              }
              else {
                  // HACK(benlesh): TypeScript shennanigans
                  // tslint:disable-next-line:no-any latest TS seems to think xhr is "never" here.
                  return JSON.parse(xhr.responseText || 'null');
              }
          case 'xml':
              return xhr.responseXML;
          case 'text':
          default:
              // HACK(benlesh): TypeScript shennanigans
              // tslint:disable-next-line:no-any latest TS seems to think xhr is "never" here.
              return ('response' in xhr) ? xhr.response : xhr.responseText;
      }
  }
  /**
   * @see {@link ajax}
   *
   * @class AjaxTimeoutError
   */
  var AjaxTimeoutError = /** @class */ (function (_super) {
      __extends(AjaxTimeoutError, _super);
      function AjaxTimeoutError(xhr, request) {
          var _this = _super.call(this, 'ajax timeout', xhr, request) || this;
          Object.setPrototypeOf(_this, AjaxTimeoutError.prototype);
          return _this;
      }
      return AjaxTimeoutError;
  }(AjaxError));
  exports.AjaxTimeoutError = AjaxTimeoutError;
  
  });
  
  unwrapExports(AjaxObservable_1);
  var AjaxObservable_2 = AjaxObservable_1.ajaxGet;
  var AjaxObservable_3 = AjaxObservable_1.ajaxPost;
  var AjaxObservable_4 = AjaxObservable_1.ajaxDelete;
  var AjaxObservable_5 = AjaxObservable_1.ajaxPut;
  var AjaxObservable_6 = AjaxObservable_1.ajaxPatch;
  var AjaxObservable_7 = AjaxObservable_1.ajaxGetJSON;
  var AjaxObservable_8 = AjaxObservable_1.AjaxObservable;
  var AjaxObservable_9 = AjaxObservable_1.AjaxSubscriber;
  var AjaxObservable_10 = AjaxObservable_1.AjaxResponse;
  var AjaxObservable_11 = AjaxObservable_1.AjaxError;
  var AjaxObservable_12 = AjaxObservable_1.AjaxTimeoutError;
  
  var ajax = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.ajax = AjaxObservable_1.AjaxObservable.create;
  
  });
  
  unwrapExports(ajax);
  var ajax_1 = ajax.ajax;
  
  var ajax$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.ajax = ajax.ajax;
  
  });
  
  unwrapExports(ajax$2);
  
  var QueueAction_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var QueueAction = /** @class */ (function (_super) {
      __extends(QueueAction, _super);
      function QueueAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      QueueAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (delay > 0) {
              return _super.prototype.schedule.call(this, state, delay);
          }
          this.delay = delay;
          this.state = state;
          this.scheduler.flush(this);
          return this;
      };
      QueueAction.prototype.execute = function (state, delay) {
          return (delay > 0 || this.closed) ?
              _super.prototype.execute.call(this, state, delay) :
              this._execute(state, delay);
      };
      QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If delay exists and is greater than 0, or if the delay is null (the
          // action wasn't rescheduled) but was originally scheduled as an async
          // action, then recycle as an async action.
          if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          // Otherwise flush the scheduler starting with this action.
          return scheduler.flush(this);
      };
      return QueueAction;
  }(AsyncAction_1.AsyncAction));
  exports.QueueAction = QueueAction;
  
  });
  
  unwrapExports(QueueAction_1);
  var QueueAction_2 = QueueAction_1.QueueAction;
  
  var QueueScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var QueueScheduler = /** @class */ (function (_super) {
      __extends(QueueScheduler, _super);
      function QueueScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.QueueScheduler = QueueScheduler;
  
  });
  
  unwrapExports(QueueScheduler_1);
  var QueueScheduler_2 = QueueScheduler_1.QueueScheduler;
  
  var queue = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Queue Scheduler
   *
   * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
   *
   * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
   *
   * When used without delay, it schedules given task synchronously - executes it right when
   * it is scheduled. However when called recursively, that is when inside the scheduled task,
   * another task is scheduled with queue scheduler, instead of executing immediately as well,
   * that task will be put on a queue and wait for current one to finish.
   *
   * This means that when you execute task with `queue` scheduler, you are sure it will end
   * before any other task scheduled with that scheduler will start.
   *
   * @examples <caption>Schedule recursively first, then do something</caption>
   *
   * Rx.Scheduler.queue.schedule(() => {
   *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
   *
   *   console.log('first');
   * });
   *
   * // Logs:
   * // "first"
   * // "second"
   *
   *
   * @example <caption>Reschedule itself recursively</caption>
   *
   * Rx.Scheduler.queue.schedule(function(state) {
   *   if (state !== 0) {
   *     console.log('before', state);
   *     this.schedule(state - 1); // `this` references currently executing Action,
   *                               // which we reschedule with new state
   *     console.log('after', state);
   *   }
   * }, 0, 3);
   *
   * // In scheduler that runs recursively, you would expect:
   * // "before", 3
   * // "before", 2
   * // "before", 1
   * // "after", 1
   * // "after", 2
   * // "after", 3
   *
   * // But with queue it logs:
   * // "before", 3
   * // "after", 3
   * // "before", 2
   * // "after", 2
   * // "before", 1
   * // "after", 1
   *
   *
   * @static true
   * @name queue
   * @owner Scheduler
   */
  exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
  
  });
  
  unwrapExports(queue);
  var queue_1 = queue.queue;
  
  var Notification_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Represents a push-based event or value that an {@link Observable} can emit.
   * This class is particularly useful for operators that manage notifications,
   * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
   * others. Besides wrapping the actual delivered value, it also annotates it
   * with metadata of, for instance, what type of push message it is (`next`,
   * `error`, or `complete`).
   *
   * @see {@link materialize}
   * @see {@link dematerialize}
   * @see {@link observeOn}
   *
   * @class Notification<T>
   */
  var Notification = /** @class */ (function () {
      function Notification(kind, value, error) {
          this.kind = kind;
          this.value = value;
          this.error = error;
          this.hasValue = kind === 'N';
      }
      /**
       * Delivers to the given `observer` the value wrapped by this Notification.
       * @param {Observer} observer
       * @return
       */
      Notification.prototype.observe = function (observer) {
          switch (this.kind) {
              case 'N':
                  return observer.next && observer.next(this.value);
              case 'E':
                  return observer.error && observer.error(this.error);
              case 'C':
                  return observer.complete && observer.complete();
          }
      };
      /**
       * Given some {@link Observer} callbacks, deliver the value represented by the
       * current Notification to the correctly corresponding callback.
       * @param {function(value: T): void} next An Observer `next` callback.
       * @param {function(err: any): void} [error] An Observer `error` callback.
       * @param {function(): void} [complete] An Observer `complete` callback.
       * @return {any}
       */
      Notification.prototype.do = function (next, error, complete) {
          var kind = this.kind;
          switch (kind) {
              case 'N':
                  return next && next(this.value);
              case 'E':
                  return error && error(this.error);
              case 'C':
                  return complete && complete();
          }
      };
      /**
       * Takes an Observer or its individual callback functions, and calls `observe`
       * or `do` methods accordingly.
       * @param {Observer|function(value: T): void} nextOrObserver An Observer or
       * the `next` callback.
       * @param {function(err: any): void} [error] An Observer `error` callback.
       * @param {function(): void} [complete] An Observer `complete` callback.
       * @return {any}
       */
      Notification.prototype.accept = function (nextOrObserver, error, complete) {
          if (nextOrObserver && typeof nextOrObserver.next === 'function') {
              return this.observe(nextOrObserver);
          }
          else {
              return this.do(nextOrObserver, error, complete);
          }
      };
      /**
       * Returns a simple Observable that just delivers the notification represented
       * by this Notification instance.
       * @return {any}
       */
      Notification.prototype.toObservable = function () {
          var kind = this.kind;
          switch (kind) {
              case 'N':
                  return of_1.of(this.value);
              case 'E':
                  return throwError_1.throwError(this.error);
              case 'C':
                  return empty_1.empty();
          }
          throw new Error('unexpected notification kind value');
      };
      /**
       * A shortcut to create a Notification instance of the type `next` from a
       * given value.
       * @param {T} value The `next` value.
       * @return {Notification<T>} The "next" Notification representing the
       * argument.
       */
      Notification.createNext = function (value) {
          if (typeof value !== 'undefined') {
              return new Notification('N', value);
          }
          return Notification.undefinedValueNotification;
      };
      /**
       * A shortcut to create a Notification instance of the type `error` from a
       * given error.
       * @param {any} [err] The `error` error.
       * @return {Notification<T>} The "error" Notification representing the
       * argument.
       */
      Notification.createError = function (err) {
          return new Notification('E', undefined, err);
      };
      /**
       * A shortcut to create a Notification instance of the type `complete`.
       * @return {Notification<any>} The valueless "complete" Notification.
       */
      Notification.createComplete = function () {
          return Notification.completeNotification;
      };
      Notification.completeNotification = new Notification('C');
      Notification.undefinedValueNotification = new Notification('N', undefined);
      return Notification;
  }());
  exports.Notification = Notification;
  
  });
  
  unwrapExports(Notification_1);
  var Notification_2 = Notification_1.Notification;
  
  var observeOn_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Re-emits all notifications from source Observable with specified scheduler.
   *
   * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
   *
   * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
   * notifications emitted by the source Observable. It might be useful, if you do not have control over
   * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
   *
   * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
   * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
   * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
   * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
   * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
   * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
   * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
   * little bit more, to ensure that they are emitted at expected moments.
   *
   * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
   * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
   * will delay all notifications - including error notifications - while `delay` will pass through error
   * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
   * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
   * for notification emissions in general.
   *
   * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
   * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
   *                                               // with async scheduler by default...
   *
   * intervals
   * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
   * .subscribe(val => {                           // scheduler to ensure smooth animation.
   *   someDiv.style.height = val + 'px';
   * });
   *
   * @see {@link delay}
   *
   * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
   * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
   * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
   * but with provided scheduler.
   *
   * @method observeOn
   * @owner Observable
   */
  function observeOn(scheduler, delay) {
      if (delay === void 0) { delay = 0; }
      return function observeOnOperatorFunction(source) {
          return source.lift(new ObserveOnOperator(scheduler, delay));
      };
  }
  exports.observeOn = observeOn;
  var ObserveOnOperator = /** @class */ (function () {
      function ObserveOnOperator(scheduler, delay) {
          if (delay === void 0) { delay = 0; }
          this.scheduler = scheduler;
          this.delay = delay;
      }
      ObserveOnOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
      };
      return ObserveOnOperator;
  }());
  exports.ObserveOnOperator = ObserveOnOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ObserveOnSubscriber = /** @class */ (function (_super) {
      __extends(ObserveOnSubscriber, _super);
      function ObserveOnSubscriber(destination, scheduler, delay) {
          if (delay === void 0) { delay = 0; }
          var _this = _super.call(this, destination) || this;
          _this.scheduler = scheduler;
          _this.delay = delay;
          return _this;
      }
      ObserveOnSubscriber.dispatch = function (arg) {
          var notification = arg.notification, destination = arg.destination;
          notification.observe(destination);
          this.unsubscribe();
      };
      ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
          this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
      };
      ObserveOnSubscriber.prototype._next = function (value) {
          this.scheduleMessage(Notification_1.Notification.createNext(value));
      };
      ObserveOnSubscriber.prototype._error = function (err) {
          this.scheduleMessage(Notification_1.Notification.createError(err));
      };
      ObserveOnSubscriber.prototype._complete = function () {
          this.scheduleMessage(Notification_1.Notification.createComplete());
      };
      return ObserveOnSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ObserveOnSubscriber = ObserveOnSubscriber;
  var ObserveOnMessage = /** @class */ (function () {
      function ObserveOnMessage(notification, destination) {
          this.notification = notification;
          this.destination = destination;
      }
      return ObserveOnMessage;
  }());
  exports.ObserveOnMessage = ObserveOnMessage;
  
  });
  
  unwrapExports(observeOn_1);
  var observeOn_2 = observeOn_1.observeOn;
  var observeOn_3 = observeOn_1.ObserveOnOperator;
  var observeOn_4 = observeOn_1.ObserveOnSubscriber;
  var observeOn_5 = observeOn_1.ObserveOnMessage;
  
  var ReplaySubject_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  /**
   * @class ReplaySubject<T>
   */
  var ReplaySubject = /** @class */ (function (_super) {
      __extends(ReplaySubject, _super);
      function ReplaySubject(bufferSize, windowTime, scheduler) {
          if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
          if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
          var _this = _super.call(this) || this;
          _this.scheduler = scheduler;
          _this._events = [];
          _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
          _this._windowTime = windowTime < 1 ? 1 : windowTime;
          return _this;
      }
      ReplaySubject.prototype.next = function (value) {
          var now = this._getNow();
          this._events.push(new ReplayEvent(now, value));
          this._trimBufferThenGetEvents();
          _super.prototype.next.call(this, value);
      };
      ReplaySubject.prototype._subscribe = function (subscriber) {
          var _events = this._trimBufferThenGetEvents();
          var scheduler = this.scheduler;
          var subscription;
          if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          else if (this.hasError) {
              subscription = Subscription_1.Subscription.EMPTY;
          }
          else if (this.isStopped) {
              subscription = Subscription_1.Subscription.EMPTY;
          }
          else {
              this.observers.push(subscriber);
              subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
          }
          if (scheduler) {
              subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
          }
          var len = _events.length;
          for (var i = 0; i < len && !subscriber.closed; i++) {
              subscriber.next(_events[i].value);
          }
          if (this.hasError) {
              subscriber.error(this.thrownError);
          }
          else if (this.isStopped) {
              subscriber.complete();
          }
          return subscription;
      };
      ReplaySubject.prototype._getNow = function () {
          return (this.scheduler || queue.queue).now();
      };
      ReplaySubject.prototype._trimBufferThenGetEvents = function () {
          var now = this._getNow();
          var _bufferSize = this._bufferSize;
          var _windowTime = this._windowTime;
          var _events = this._events;
          var eventsCount = _events.length;
          var spliceCount = 0;
          // Trim events that fall out of the time window.
          // Start at the front of the list. Break early once
          // we encounter an event that falls within the window.
          while (spliceCount < eventsCount) {
              if ((now - _events[spliceCount].time) < _windowTime) {
                  break;
              }
              spliceCount++;
          }
          if (eventsCount > _bufferSize) {
              spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
          }
          if (spliceCount > 0) {
              _events.splice(0, spliceCount);
          }
          return _events;
      };
      return ReplaySubject;
  }(Subject_1.Subject));
  exports.ReplaySubject = ReplaySubject;
  var ReplayEvent = /** @class */ (function () {
      function ReplayEvent(time, value) {
          this.time = time;
          this.value = value;
      }
      return ReplayEvent;
  }());
  
  });
  
  unwrapExports(ReplaySubject_1);
  var ReplaySubject_2 = ReplaySubject_1.ReplaySubject;
  
  var assign = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function assignImpl(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          sources[_i - 1] = arguments[_i];
      }
      var len = sources.length;
      for (var i = 0; i < len; i++) {
          var source = sources[i];
          for (var k in source) {
              if (source.hasOwnProperty(k)) {
                  target[k] = source[k];
              }
          }
      }
      return target;
  }
  exports.assignImpl = assignImpl;
  function getAssign(root$$1) {
      return root$$1.Object.assign || assignImpl;
  }
  exports.getAssign = getAssign;
  exports.assign = getAssign(root.root);
  
  });
  
  unwrapExports(assign);
  var assign_1 = assign.assignImpl;
  var assign_2 = assign.getAssign;
  var assign_3 = assign.assign;
  
  var WebSocketSubject_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var WebSocketSubject = /** @class */ (function (_super) {
      __extends(WebSocketSubject, _super);
      function WebSocketSubject(urlConfigOrSource, destination) {
          var _this = this;
          if (urlConfigOrSource instanceof Observable_1.Observable) {
              _this = _super.call(this, destination, urlConfigOrSource) || this;
          }
          else {
              _this = _super.call(this) || this;
              _this.WebSocketCtor = root.root.WebSocket;
              _this._output = new Subject_1.Subject();
              if (typeof urlConfigOrSource === 'string') {
                  _this.url = urlConfigOrSource;
              }
              else {
                  // WARNING: config object could override important members here.
                  assign.assign(_this, urlConfigOrSource);
              }
              if (!_this.WebSocketCtor) {
                  throw new Error('no WebSocket constructor can be found');
              }
              _this.destination = new ReplaySubject_1.ReplaySubject();
          }
          return _this;
      }
      WebSocketSubject.prototype.resultSelector = function (e) {
          return JSON.parse(e.data);
      };
      /**
       * Wrapper around the w3c-compatible WebSocket object provided by the browser.
       *
       * @example <caption>Wraps browser WebSocket</caption>
       *
       * let socket$ = Observable.webSocket('ws://localhost:8081');
       *
       * socket$.subscribe(
       *    (msg) => console.log('message received: ' + msg),
       *    (err) => console.log(err),
       *    () => console.log('complete')
       *  );
       *
       * socket$.next(JSON.stringify({ op: 'hello' }));
       *
       * @example <caption>Wraps WebSocket from nodejs-websocket (using node.js)</caption>
       *
       * import { w3cwebsocket } from 'websocket';
       *
       * let socket$ = Observable.webSocket({
       *   url: 'ws://localhost:8081',
       *   WebSocketCtor: w3cwebsocket
       * });
       *
       * socket$.subscribe(
       *    (msg) => console.log('message received: ' + msg),
       *    (err) => console.log(err),
       *    () => console.log('complete')
       *  );
       *
       * socket$.next(JSON.stringify({ op: 'hello' }));
       *
       * @param {string | WebSocketSubjectConfig} urlConfigOrSource the source of the websocket as an url or a structure defining the websocket object
       * @return {WebSocketSubject}
       * @static true
       * @name webSocket
       * @owner Observable
       */
      WebSocketSubject.create = function (urlConfigOrSource) {
          return new WebSocketSubject(urlConfigOrSource);
      };
      WebSocketSubject.prototype.lift = function (operator) {
          var sock = new WebSocketSubject(this, this.destination);
          sock.operator = operator;
          return sock;
      };
      WebSocketSubject.prototype._resetState = function () {
          this.socket = null;
          if (!this.source) {
              this.destination = new ReplaySubject_1.ReplaySubject();
          }
          this._output = new Subject_1.Subject();
      };
      // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
      WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
          var self = this;
          return new Observable_1.Observable(function (observer) {
              var result = tryCatch_1.tryCatch(subMsg)();
              if (result === errorObject.errorObject) {
                  observer.error(errorObject.errorObject.e);
              }
              else {
                  self.next(result);
              }
              var subscription = self.subscribe(function (x) {
                  var result = tryCatch_1.tryCatch(messageFilter)(x);
                  if (result === errorObject.errorObject) {
                      observer.error(errorObject.errorObject.e);
                  }
                  else if (result) {
                      observer.next(x);
                  }
              }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
              return function () {
                  var result = tryCatch_1.tryCatch(unsubMsg)();
                  if (result === errorObject.errorObject) {
                      observer.error(errorObject.errorObject.e);
                  }
                  else {
                      self.next(result);
                  }
                  subscription.unsubscribe();
              };
          });
      };
      WebSocketSubject.prototype._connectSocket = function () {
          var _this = this;
          var WebSocketCtor = this.WebSocketCtor;
          var observer = this._output;
          var socket = null;
          try {
              socket = this.protocol ?
                  new WebSocketCtor(this.url, this.protocol) :
                  new WebSocketCtor(this.url);
              this.socket = socket;
              if (this.binaryType) {
                  this.socket.binaryType = this.binaryType;
              }
          }
          catch (e) {
              observer.error(e);
              return;
          }
          var subscription = new Subscription_1.Subscription(function () {
              _this.socket = null;
              if (socket && socket.readyState === 1) {
                  socket.close();
              }
          });
          socket.onopen = function (e) {
              var openObserver = _this.openObserver;
              if (openObserver) {
                  openObserver.next(e);
              }
              var queue = _this.destination;
              _this.destination = Subscriber_1.Subscriber.create(function (x) { return socket.readyState === 1 && socket.send(x); }, function (e) {
                  var closingObserver = _this.closingObserver;
                  if (closingObserver) {
                      closingObserver.next(undefined);
                  }
                  if (e && e.code) {
                      socket.close(e.code, e.reason);
                  }
                  else {
                      observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                          'and an optional reason: { code: number, reason: string }'));
                  }
                  _this._resetState();
              }, function () {
                  var closingObserver = _this.closingObserver;
                  if (closingObserver) {
                      closingObserver.next(undefined);
                  }
                  socket.close();
                  _this._resetState();
              });
              if (queue && queue instanceof ReplaySubject_1.ReplaySubject) {
                  subscription.add(queue.subscribe(_this.destination));
              }
          };
          socket.onerror = function (e) {
              _this._resetState();
              observer.error(e);
          };
          socket.onclose = function (e) {
              _this._resetState();
              var closeObserver = _this.closeObserver;
              if (closeObserver) {
                  closeObserver.next(e);
              }
              if (e.wasClean) {
                  observer.complete();
              }
              else {
                  observer.error(e);
              }
          };
          socket.onmessage = function (e) {
              var result = tryCatch_1.tryCatch(_this.resultSelector)(e);
              if (result === errorObject.errorObject) {
                  observer.error(errorObject.errorObject.e);
              }
              else {
                  observer.next(result);
              }
          };
      };
      WebSocketSubject.prototype._subscribe = function (subscriber) {
          var _this = this;
          var source = this.source;
          if (source) {
              return source.subscribe(subscriber);
          }
          if (!this.socket) {
              this._connectSocket();
          }
          var subscription = new Subscription_1.Subscription();
          subscription.add(this._output.subscribe(subscriber));
          subscription.add(function () {
              var socket = _this.socket;
              if (_this._output.observers.length === 0) {
                  if (socket && socket.readyState === 1) {
                      socket.close();
                  }
                  _this._resetState();
              }
          });
          return subscription;
      };
      WebSocketSubject.prototype.unsubscribe = function () {
          var _a = this, source = _a.source, socket = _a.socket;
          if (socket && socket.readyState === 1) {
              socket.close();
              this._resetState();
          }
          _super.prototype.unsubscribe.call(this);
          if (!source) {
              this.destination = new ReplaySubject_1.ReplaySubject();
          }
      };
      return WebSocketSubject;
  }(Subject_1.AnonymousSubject));
  exports.WebSocketSubject = WebSocketSubject;
  
  });
  
  unwrapExports(WebSocketSubject_1);
  var WebSocketSubject_2 = WebSocketSubject_1.WebSocketSubject;
  
  var webSocket = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.webSocket = WebSocketSubject_1.WebSocketSubject.create;
  
  });
  
  unwrapExports(webSocket);
  var webSocket_1 = webSocket.webSocket;
  
  var webSocket$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.webSocket = webSocket.webSocket;
  
  });
  
  unwrapExports(webSocket$2);
  
  var buffer_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Buffers the source Observable values until `closingNotifier` emits.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * that array only when another Observable emits.</span>
   *
   * <img src="./img/buffer.png" width="100%">
   *
   * Buffers the incoming Observable values until the given `closingNotifier`
   * Observable emits a value, at which point it emits the buffer on the output
   * Observable and starts a new buffer internally, awaiting the next time
   * `closingNotifier` emits.
   *
   * @example <caption>On every click, emit array of most recent interval events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var interval = Rx.Observable.interval(1000);
   * var buffered = interval.buffer(clicks);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link window}
   *
   * @param {Observable<any>} closingNotifier An Observable that signals the
   * buffer to be emitted on the output Observable.
   * @return {Observable<T[]>} An Observable of buffers, which are arrays of
   * values.
   * @method buffer
   * @owner Observable
   */
  function buffer(closingNotifier) {
      return function bufferOperatorFunction(source) {
          return source.lift(new BufferOperator(closingNotifier));
      };
  }
  exports.buffer = buffer;
  var BufferOperator = /** @class */ (function () {
      function BufferOperator(closingNotifier) {
          this.closingNotifier = closingNotifier;
      }
      BufferOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
      };
      return BufferOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferSubscriber = /** @class */ (function (_super) {
      __extends(BufferSubscriber, _super);
      function BufferSubscriber(destination, closingNotifier) {
          var _this = _super.call(this, destination) || this;
          _this.buffer = [];
          _this.add(subscribeToResult_1.subscribeToResult(_this, closingNotifier));
          return _this;
      }
      BufferSubscriber.prototype._next = function (value) {
          this.buffer.push(value);
      };
      BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var buffer = this.buffer;
          this.buffer = [];
          this.destination.next(buffer);
      };
      return BufferSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(buffer_1);
  var buffer_2 = buffer_1.buffer;
  
  var buffer_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Buffers the source Observable values until `closingNotifier` emits.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * that array only when another Observable emits.</span>
   *
   * <img src="./img/buffer.png" width="100%">
   *
   * Buffers the incoming Observable values until the given `closingNotifier`
   * Observable emits a value, at which point it emits the buffer on the output
   * Observable and starts a new buffer internally, awaiting the next time
   * `closingNotifier` emits.
   *
   * @example <caption>On every click, emit array of most recent interval events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var interval = Rx.Observable.interval(1000);
   * var buffered = interval.buffer(clicks);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link window}
   *
   * @param {Observable<any>} closingNotifier An Observable that signals the
   * buffer to be emitted on the output Observable.
   * @return {Observable<T[]>} An Observable of buffers, which are arrays of
   * values.
   * @method buffer
   * @owner Observable
   */
  function buffer(closingNotifier) {
      return buffer_1.buffer(closingNotifier)(this);
  }
  exports.buffer = buffer;
  
  });
  
  unwrapExports(buffer_2$1);
  var buffer_3 = buffer_2$1.buffer;
  
  var buffer$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.buffer = buffer_2$1.buffer;
  
  });
  
  unwrapExports(buffer$2);
  
  var bufferCount_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Buffers the source Observable values until the size hits the maximum
   * `bufferSize` given.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * that array only when its size reaches `bufferSize`.</span>
   *
   * <img src="./img/bufferCount.png" width="100%">
   *
   * Buffers a number of values from the source Observable by `bufferSize` then
   * emits the buffer and clears it, and starts a new buffer each
   * `startBufferEvery` values. If `startBufferEvery` is not provided or is
   * `null`, then new buffers are started immediately at the start of the source
   * and when each buffer closes and is emitted.
   *
   * @example <caption>Emit the last two click events as an array</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferCount(2);
   * buffered.subscribe(x => console.log(x));
   *
   * @example <caption>On every click, emit the last two click events as an array</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferCount(2, 1);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link pairwise}
   * @see {@link windowCount}
   *
   * @param {number} bufferSize The maximum size of the buffer emitted.
   * @param {number} [startBufferEvery] Interval at which to start a new buffer.
   * For example if `startBufferEvery` is `2`, then a new buffer will be started
   * on every other value from the source. A new buffer is started at the
   * beginning of the source by default.
   * @return {Observable<T[]>} An Observable of arrays of buffered values.
   * @method bufferCount
   * @owner Observable
   */
  function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) { startBufferEvery = null; }
      return function bufferCountOperatorFunction(source) {
          return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
      };
  }
  exports.bufferCount = bufferCount;
  var BufferCountOperator = /** @class */ (function () {
      function BufferCountOperator(bufferSize, startBufferEvery) {
          this.bufferSize = bufferSize;
          this.startBufferEvery = startBufferEvery;
          if (!startBufferEvery || bufferSize === startBufferEvery) {
              this.subscriberClass = BufferCountSubscriber;
          }
          else {
              this.subscriberClass = BufferSkipCountSubscriber;
          }
      }
      BufferCountOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
      };
      return BufferCountOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferCountSubscriber = /** @class */ (function (_super) {
      __extends(BufferCountSubscriber, _super);
      function BufferCountSubscriber(destination, bufferSize) {
          var _this = _super.call(this, destination) || this;
          _this.bufferSize = bufferSize;
          _this.buffer = [];
          return _this;
      }
      BufferCountSubscriber.prototype._next = function (value) {
          var buffer = this.buffer;
          buffer.push(value);
          if (buffer.length == this.bufferSize) {
              this.destination.next(buffer);
              this.buffer = [];
          }
      };
      BufferCountSubscriber.prototype._complete = function () {
          var buffer = this.buffer;
          if (buffer.length > 0) {
              this.destination.next(buffer);
          }
          _super.prototype._complete.call(this);
      };
      return BufferCountSubscriber;
  }(Subscriber_1.Subscriber));
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferSkipCountSubscriber = /** @class */ (function (_super) {
      __extends(BufferSkipCountSubscriber, _super);
      function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
          var _this = _super.call(this, destination) || this;
          _this.bufferSize = bufferSize;
          _this.startBufferEvery = startBufferEvery;
          _this.buffers = [];
          _this.count = 0;
          return _this;
      }
      BufferSkipCountSubscriber.prototype._next = function (value) {
          var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
          this.count++;
          if (count % startBufferEvery === 0) {
              buffers.push([]);
          }
          for (var i = buffers.length; i--;) {
              var buffer = buffers[i];
              buffer.push(value);
              if (buffer.length === bufferSize) {
                  buffers.splice(i, 1);
                  this.destination.next(buffer);
              }
          }
      };
      BufferSkipCountSubscriber.prototype._complete = function () {
          var _a = this, buffers = _a.buffers, destination = _a.destination;
          while (buffers.length > 0) {
              var buffer = buffers.shift();
              if (buffer.length > 0) {
                  destination.next(buffer);
              }
          }
          _super.prototype._complete.call(this);
      };
      return BufferSkipCountSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(bufferCount_1);
  var bufferCount_2 = bufferCount_1.bufferCount;
  
  var bufferCount_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Buffers the source Observable values until the size hits the maximum
   * `bufferSize` given.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * that array only when its size reaches `bufferSize`.</span>
   *
   * <img src="./img/bufferCount.png" width="100%">
   *
   * Buffers a number of values from the source Observable by `bufferSize` then
   * emits the buffer and clears it, and starts a new buffer each
   * `startBufferEvery` values. If `startBufferEvery` is not provided or is
   * `null`, then new buffers are started immediately at the start of the source
   * and when each buffer closes and is emitted.
   *
   * @example <caption>Emit the last two click events as an array</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferCount(2);
   * buffered.subscribe(x => console.log(x));
   *
   * @example <caption>On every click, emit the last two click events as an array</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferCount(2, 1);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link pairwise}
   * @see {@link windowCount}
   *
   * @param {number} bufferSize The maximum size of the buffer emitted.
   * @param {number} [startBufferEvery] Interval at which to start a new buffer.
   * For example if `startBufferEvery` is `2`, then a new buffer will be started
   * on every other value from the source. A new buffer is started at the
   * beginning of the source by default.
   * @return {Observable<T[]>} An Observable of arrays of buffered values.
   * @method bufferCount
   * @owner Observable
   */
  function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) { startBufferEvery = null; }
      return bufferCount_1.bufferCount(bufferSize, startBufferEvery)(this);
  }
  exports.bufferCount = bufferCount;
  
  });
  
  unwrapExports(bufferCount_2$1);
  var bufferCount_3 = bufferCount_2$1.bufferCount;
  
  var bufferCount$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.bufferCount = bufferCount_2$1.bufferCount;
  
  });
  
  unwrapExports(bufferCount$2);
  
  var bufferTime_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Buffers the source Observable values for a specific time period.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * those arrays periodically in time.</span>
   *
   * <img src="./img/bufferTime.png" width="100%">
   *
   * Buffers values from the source for a specific time duration `bufferTimeSpan`.
   * Unless the optional argument `bufferCreationInterval` is given, it emits and
   * resets the buffer every `bufferTimeSpan` milliseconds. If
   * `bufferCreationInterval` is given, this operator opens the buffer every
   * `bufferCreationInterval` milliseconds and closes (emits and resets) the
   * buffer every `bufferTimeSpan` milliseconds. When the optional argument
   * `maxBufferSize` is specified, the buffer will be closed either after
   * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
   *
   * @example <caption>Every second, emit an array of the recent click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferTime(1000);
   * buffered.subscribe(x => console.log(x));
   *
   * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferTime(2000, 5000);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link windowTime}
   *
   * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
   * @param {number} [bufferCreationInterval] The interval at which to start new
   * buffers.
   * @param {number} [maxBufferSize] The maximum buffer size.
   * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
   * intervals that determine buffer boundaries.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferTime
   * @owner Observable
   */
  function bufferTime(bufferTimeSpan) {
      var length = arguments.length;
      var scheduler = async.async;
      if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
          scheduler = arguments[arguments.length - 1];
          length--;
      }
      var bufferCreationInterval = null;
      if (length >= 2) {
          bufferCreationInterval = arguments[1];
      }
      var maxBufferSize = Number.POSITIVE_INFINITY;
      if (length >= 3) {
          maxBufferSize = arguments[2];
      }
      return function bufferTimeOperatorFunction(source) {
          return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
      };
  }
  exports.bufferTime = bufferTime;
  var BufferTimeOperator = /** @class */ (function () {
      function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
          this.bufferTimeSpan = bufferTimeSpan;
          this.bufferCreationInterval = bufferCreationInterval;
          this.maxBufferSize = maxBufferSize;
          this.scheduler = scheduler;
      }
      BufferTimeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
      };
      return BufferTimeOperator;
  }());
  var Context = /** @class */ (function () {
      function Context() {
          this.buffer = [];
      }
      return Context;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferTimeSubscriber = /** @class */ (function (_super) {
      __extends(BufferTimeSubscriber, _super);
      function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.bufferTimeSpan = bufferTimeSpan;
          _this.bufferCreationInterval = bufferCreationInterval;
          _this.maxBufferSize = maxBufferSize;
          _this.scheduler = scheduler;
          _this.contexts = [];
          var context = _this.openContext();
          _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
          if (_this.timespanOnly) {
              var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
              _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
          }
          else {
              var closeState = { subscriber: _this, context: context };
              var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
              _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
              _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
          }
          return _this;
      }
      BufferTimeSubscriber.prototype._next = function (value) {
          var contexts = this.contexts;
          var len = contexts.length;
          var filledBufferContext;
          for (var i = 0; i < len; i++) {
              var context_1 = contexts[i];
              var buffer = context_1.buffer;
              buffer.push(value);
              if (buffer.length == this.maxBufferSize) {
                  filledBufferContext = context_1;
              }
          }
          if (filledBufferContext) {
              this.onBufferFull(filledBufferContext);
          }
      };
      BufferTimeSubscriber.prototype._error = function (err) {
          this.contexts.length = 0;
          _super.prototype._error.call(this, err);
      };
      BufferTimeSubscriber.prototype._complete = function () {
          var _a = this, contexts = _a.contexts, destination = _a.destination;
          while (contexts.length > 0) {
              var context_2 = contexts.shift();
              destination.next(context_2.buffer);
          }
          _super.prototype._complete.call(this);
      };
      BufferTimeSubscriber.prototype._unsubscribe = function () {
          this.contexts = null;
      };
      BufferTimeSubscriber.prototype.onBufferFull = function (context) {
          this.closeContext(context);
          var closeAction = context.closeAction;
          closeAction.unsubscribe();
          this.remove(closeAction);
          if (!this.closed && this.timespanOnly) {
              context = this.openContext();
              var bufferTimeSpan = this.bufferTimeSpan;
              var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
              this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
          }
      };
      BufferTimeSubscriber.prototype.openContext = function () {
          var context = new Context();
          this.contexts.push(context);
          return context;
      };
      BufferTimeSubscriber.prototype.closeContext = function (context) {
          this.destination.next(context.buffer);
          var contexts = this.contexts;
          var spliceIndex = contexts ? contexts.indexOf(context) : -1;
          if (spliceIndex >= 0) {
              contexts.splice(contexts.indexOf(context), 1);
          }
      };
      return BufferTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchBufferTimeSpanOnly(state) {
      var subscriber = state.subscriber;
      var prevContext = state.context;
      if (prevContext) {
          subscriber.closeContext(prevContext);
      }
      if (!subscriber.closed) {
          state.context = subscriber.openContext();
          state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
      }
  }
  function dispatchBufferCreation(state) {
      var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
      var context = subscriber.openContext();
      var action = this;
      if (!subscriber.closed) {
          subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
          action.schedule(state, bufferCreationInterval);
      }
  }
  function dispatchBufferClose(arg) {
      var subscriber = arg.subscriber, context = arg.context;
      subscriber.closeContext(context);
  }
  
  });
  
  unwrapExports(bufferTime_1);
  var bufferTime_2 = bufferTime_1.bufferTime;
  
  var bufferTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Buffers the source Observable values for a specific time period.
   *
   * <span class="informal">Collects values from the past as an array, and emits
   * those arrays periodically in time.</span>
   *
   * <img src="./img/bufferTime.png" width="100%">
   *
   * Buffers values from the source for a specific time duration `bufferTimeSpan`.
   * Unless the optional argument `bufferCreationInterval` is given, it emits and
   * resets the buffer every `bufferTimeSpan` milliseconds. If
   * `bufferCreationInterval` is given, this operator opens the buffer every
   * `bufferCreationInterval` milliseconds and closes (emits and resets) the
   * buffer every `bufferTimeSpan` milliseconds. When the optional argument
   * `maxBufferSize` is specified, the buffer will be closed either after
   * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
   *
   * @example <caption>Every second, emit an array of the recent click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferTime(1000);
   * buffered.subscribe(x => console.log(x));
   *
   * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferTime(2000, 5000);
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferToggle}
   * @see {@link bufferWhen}
   * @see {@link windowTime}
   *
   * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
   * @param {number} [bufferCreationInterval] The interval at which to start new
   * buffers.
   * @param {number} [maxBufferSize] The maximum buffer size.
   * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
   * intervals that determine buffer boundaries.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferTime
   * @owner Observable
   */
  function bufferTime(bufferTimeSpan) {
      var length = arguments.length;
      var scheduler = async.async;
      if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
          scheduler = arguments[arguments.length - 1];
          length--;
      }
      var bufferCreationInterval = null;
      if (length >= 2) {
          bufferCreationInterval = arguments[1];
      }
      var maxBufferSize = Number.POSITIVE_INFINITY;
      if (length >= 3) {
          maxBufferSize = arguments[2];
      }
      return bufferTime_1.bufferTime(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler)(this);
  }
  exports.bufferTime = bufferTime;
  
  });
  
  unwrapExports(bufferTime_2$1);
  var bufferTime_3 = bufferTime_2$1.bufferTime;
  
  var bufferTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.bufferTime = bufferTime_2$1.bufferTime;
  
  });
  
  unwrapExports(bufferTime$2);
  
  var bufferToggle_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Buffers the source Observable values starting from an emission from
   * `openings` and ending when the output of `closingSelector` emits.
   *
   * <span class="informal">Collects values from the past as an array. Starts
   * collecting only when `opening` emits, and calls the `closingSelector`
   * function to get an Observable that tells when to close the buffer.</span>
   *
   * <img src="./img/bufferToggle.png" width="100%">
   *
   * Buffers values from the source by opening the buffer via signals from an
   * Observable provided to `openings`, and closing and sending the buffers when
   * a Subscribable or Promise returned by the `closingSelector` function emits.
   *
   * @example <caption>Every other second, emit the click events from the next 500ms</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var openings = Rx.Observable.interval(1000);
   * var buffered = clicks.bufferToggle(openings, i =>
   *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
   * );
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferWhen}
   * @see {@link windowToggle}
   *
   * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
   * buffers.
   * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
   * the value emitted by the `openings` observable and returns a Subscribable or Promise,
   * which, when it emits, signals that the associated buffer should be emitted
   * and cleared.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferToggle
   * @owner Observable
   */
  function bufferToggle(openings, closingSelector) {
      return function bufferToggleOperatorFunction(source) {
          return source.lift(new BufferToggleOperator(openings, closingSelector));
      };
  }
  exports.bufferToggle = bufferToggle;
  var BufferToggleOperator = /** @class */ (function () {
      function BufferToggleOperator(openings, closingSelector) {
          this.openings = openings;
          this.closingSelector = closingSelector;
      }
      BufferToggleOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
      };
      return BufferToggleOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferToggleSubscriber = /** @class */ (function (_super) {
      __extends(BufferToggleSubscriber, _super);
      function BufferToggleSubscriber(destination, openings, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.openings = openings;
          _this.closingSelector = closingSelector;
          _this.contexts = [];
          _this.add(subscribeToResult_1.subscribeToResult(_this, openings));
          return _this;
      }
      BufferToggleSubscriber.prototype._next = function (value) {
          var contexts = this.contexts;
          var len = contexts.length;
          for (var i = 0; i < len; i++) {
              contexts[i].buffer.push(value);
          }
      };
      BufferToggleSubscriber.prototype._error = function (err) {
          var contexts = this.contexts;
          while (contexts.length > 0) {
              var context_1 = contexts.shift();
              context_1.subscription.unsubscribe();
              context_1.buffer = null;
              context_1.subscription = null;
          }
          this.contexts = null;
          _super.prototype._error.call(this, err);
      };
      BufferToggleSubscriber.prototype._complete = function () {
          var contexts = this.contexts;
          while (contexts.length > 0) {
              var context_2 = contexts.shift();
              this.destination.next(context_2.buffer);
              context_2.subscription.unsubscribe();
              context_2.buffer = null;
              context_2.subscription = null;
          }
          this.contexts = null;
          _super.prototype._complete.call(this);
      };
      BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
      };
      BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
          this.closeBuffer(innerSub.context);
      };
      BufferToggleSubscriber.prototype.openBuffer = function (value) {
          try {
              var closingSelector = this.closingSelector;
              var closingNotifier = closingSelector.call(this, value);
              if (closingNotifier) {
                  this.trySubscribe(closingNotifier);
              }
          }
          catch (err) {
              this._error(err);
          }
      };
      BufferToggleSubscriber.prototype.closeBuffer = function (context) {
          var contexts = this.contexts;
          if (contexts && context) {
              var buffer = context.buffer, subscription = context.subscription;
              this.destination.next(buffer);
              contexts.splice(contexts.indexOf(context), 1);
              this.remove(subscription);
              subscription.unsubscribe();
          }
      };
      BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
          var contexts = this.contexts;
          var buffer = [];
          var subscription = new Subscription_1.Subscription();
          var context = { buffer: buffer, subscription: subscription };
          contexts.push(context);
          var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
          if (!innerSubscription || innerSubscription.closed) {
              this.closeBuffer(context);
          }
          else {
              innerSubscription.context = context;
              this.add(innerSubscription);
              subscription.add(innerSubscription);
          }
      };
      return BufferToggleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(bufferToggle_1);
  var bufferToggle_2 = bufferToggle_1.bufferToggle;
  
  var bufferToggle_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Buffers the source Observable values starting from an emission from
   * `openings` and ending when the output of `closingSelector` emits.
   *
   * <span class="informal">Collects values from the past as an array. Starts
   * collecting only when `opening` emits, and calls the `closingSelector`
   * function to get an Observable that tells when to close the buffer.</span>
   *
   * <img src="./img/bufferToggle.png" width="100%">
   *
   * Buffers values from the source by opening the buffer via signals from an
   * Observable provided to `openings`, and closing and sending the buffers when
   * a Subscribable or Promise returned by the `closingSelector` function emits.
   *
   * @example <caption>Every other second, emit the click events from the next 500ms</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var openings = Rx.Observable.interval(1000);
   * var buffered = clicks.bufferToggle(openings, i =>
   *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
   * );
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferWhen}
   * @see {@link windowToggle}
   *
   * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
   * buffers.
   * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
   * the value emitted by the `openings` observable and returns a Subscribable or Promise,
   * which, when it emits, signals that the associated buffer should be emitted
   * and cleared.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferToggle
   * @owner Observable
   */
  function bufferToggle(openings, closingSelector) {
      return bufferToggle_1.bufferToggle(openings, closingSelector)(this);
  }
  exports.bufferToggle = bufferToggle;
  
  });
  
  unwrapExports(bufferToggle_2$1);
  var bufferToggle_3 = bufferToggle_2$1.bufferToggle;
  
  var bufferToggle$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.bufferToggle = bufferToggle_2$1.bufferToggle;
  
  });
  
  unwrapExports(bufferToggle$2);
  
  var bufferWhen_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /**
   * Buffers the source Observable values, using a factory function of closing
   * Observables to determine when to close, emit, and reset the buffer.
   *
   * <span class="informal">Collects values from the past as an array. When it
   * starts collecting values, it calls a function that returns an Observable that
   * tells when to close the buffer and restart collecting.</span>
   *
   * <img src="./img/bufferWhen.png" width="100%">
   *
   * Opens a buffer immediately, then closes the buffer when the observable
   * returned by calling `closingSelector` function emits a value. When it closes
   * the buffer, it immediately opens a new buffer and repeats the process.
   *
   * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferWhen(() =>
   *   Rx.Observable.interval(1000 + Math.random() * 4000)
   * );
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link windowWhen}
   *
   * @param {function(): Observable} closingSelector A function that takes no
   * arguments and returns an Observable that signals buffer closure.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferWhen
   * @owner Observable
   */
  function bufferWhen(closingSelector) {
      return function (source) {
          return source.lift(new BufferWhenOperator(closingSelector));
      };
  }
  exports.bufferWhen = bufferWhen;
  var BufferWhenOperator = /** @class */ (function () {
      function BufferWhenOperator(closingSelector) {
          this.closingSelector = closingSelector;
      }
      BufferWhenOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
      };
      return BufferWhenOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var BufferWhenSubscriber = /** @class */ (function (_super) {
      __extends(BufferWhenSubscriber, _super);
      function BufferWhenSubscriber(destination, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.closingSelector = closingSelector;
          _this.subscribing = false;
          _this.openBuffer();
          return _this;
      }
      BufferWhenSubscriber.prototype._next = function (value) {
          this.buffer.push(value);
      };
      BufferWhenSubscriber.prototype._complete = function () {
          var buffer = this.buffer;
          if (buffer) {
              this.destination.next(buffer);
          }
          _super.prototype._complete.call(this);
      };
      BufferWhenSubscriber.prototype._unsubscribe = function () {
          this.buffer = null;
          this.subscribing = false;
      };
      BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.openBuffer();
      };
      BufferWhenSubscriber.prototype.notifyComplete = function () {
          if (this.subscribing) {
              this.complete();
          }
          else {
              this.openBuffer();
          }
      };
      BufferWhenSubscriber.prototype.openBuffer = function () {
          var closingSubscription = this.closingSubscription;
          if (closingSubscription) {
              this.remove(closingSubscription);
              closingSubscription.unsubscribe();
          }
          var buffer = this.buffer;
          if (this.buffer) {
              this.destination.next(buffer);
          }
          this.buffer = [];
          var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
          if (closingNotifier === errorObject.errorObject) {
              this.error(errorObject.errorObject.e);
          }
          else {
              closingSubscription = new Subscription_1.Subscription();
              this.closingSubscription = closingSubscription;
              this.add(closingSubscription);
              this.subscribing = true;
              closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
              this.subscribing = false;
          }
      };
      return BufferWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(bufferWhen_1);
  var bufferWhen_2 = bufferWhen_1.bufferWhen;
  
  var bufferWhen_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Buffers the source Observable values, using a factory function of closing
   * Observables to determine when to close, emit, and reset the buffer.
   *
   * <span class="informal">Collects values from the past as an array. When it
   * starts collecting values, it calls a function that returns an Observable that
   * tells when to close the buffer and restart collecting.</span>
   *
   * <img src="./img/bufferWhen.png" width="100%">
   *
   * Opens a buffer immediately, then closes the buffer when the observable
   * returned by calling `closingSelector` function emits a value. When it closes
   * the buffer, it immediately opens a new buffer and repeats the process.
   *
   * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var buffered = clicks.bufferWhen(() =>
   *   Rx.Observable.interval(1000 + Math.random() * 4000)
   * );
   * buffered.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   * @see {@link bufferTime}
   * @see {@link bufferToggle}
   * @see {@link windowWhen}
   *
   * @param {function(): Observable} closingSelector A function that takes no
   * arguments and returns an Observable that signals buffer closure.
   * @return {Observable<T[]>} An observable of arrays of buffered values.
   * @method bufferWhen
   * @owner Observable
   */
  function bufferWhen(closingSelector) {
      return bufferWhen_1.bufferWhen(closingSelector)(this);
  }
  exports.bufferWhen = bufferWhen;
  
  });
  
  unwrapExports(bufferWhen_2$1);
  var bufferWhen_3 = bufferWhen_2$1.bufferWhen;
  
  var bufferWhen$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.bufferWhen = bufferWhen_2$1.bufferWhen;
  
  });
  
  unwrapExports(bufferWhen$2);
  
  var catchError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Catches errors on the observable to be handled by returning a new observable or throwing an error.
   *
   * <img src="./img/catch.png" width="100%">
   *
   * @example <caption>Continues with a different Observable when there's an error</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   * 	   if (n == 4) {
   * 	     throw 'four!';
   *     }
   *	   return n;
   *   })
   *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
   *   .subscribe(x => console.log(x));
   *   // 1, 2, 3, I, II, III, IV, V
   *
   * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   * 	   if (n === 4) {
   * 	     throw 'four!';
   *     }
   * 	   return n;
   *   })
   *   .catch((err, caught) => caught)
   *   .take(30)
   *   .subscribe(x => console.log(x));
   *   // 1, 2, 3, 1, 2, 3, ...
   *
   * @example <caption>Throws a new error when the source Observable throws an error</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   *     if (n == 4) {
   *       throw 'four!';
   *     }
   *     return n;
   *   })
   *   .catch(err => {
   *     throw 'error in source. Details: ' + err;
   *   })
   *   .subscribe(
   *     x => console.log(x),
   *     err => console.log(err)
   *   );
   *   // 1, 2, 3, error in source. Details: four!
   *
   * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
   *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
   *  is returned by the `selector` will be used to continue the observable chain.
   * @return {Observable} An observable that originates from either the source or the observable returned by the
   *  catch `selector` function.
   * @name catchError
   */
  function catchError(selector) {
      return function catchErrorOperatorFunction(source) {
          var operator = new CatchOperator(selector);
          var caught = source.lift(operator);
          return (operator.caught = caught);
      };
  }
  exports.catchError = catchError;
  var CatchOperator = /** @class */ (function () {
      function CatchOperator(selector) {
          this.selector = selector;
      }
      CatchOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
      };
      return CatchOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var CatchSubscriber = /** @class */ (function (_super) {
      __extends(CatchSubscriber, _super);
      function CatchSubscriber(destination, selector, caught) {
          var _this = _super.call(this, destination) || this;
          _this.selector = selector;
          _this.caught = caught;
          return _this;
      }
      // NOTE: overriding `error` instead of `_error` because we don't want
      // to have this flag this subscriber as `isStopped`. We can mimic the
      // behavior of the RetrySubscriber (from the `retry` operator), where
      // we unsubscribe from our source chain, reset our Subscriber flags,
      // then subscribe to the selector result.
      CatchSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var result = void 0;
              try {
                  result = this.selector(err, this.caught);
              }
              catch (err2) {
                  _super.prototype.error.call(this, err2);
                  return;
              }
              this._unsubscribeAndRecycle();
              this.add(subscribeToResult_1.subscribeToResult(this, result));
          }
      };
      return CatchSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(catchError_1);
  var catchError_2 = catchError_1.catchError;
  
  var _catch_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Catches errors on the observable to be handled by returning a new observable or throwing an error.
   *
   * <img src="./img/catch.png" width="100%">
   *
   * @example <caption>Continues with a different Observable when there's an error</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   * 	   if (n == 4) {
   * 	     throw 'four!';
   *     }
   *	   return n;
   *   })
   *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
   *   .subscribe(x => console.log(x));
   *   // 1, 2, 3, I, II, III, IV, V
   *
   * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   * 	   if (n === 4) {
   * 	     throw 'four!';
   *     }
   * 	   return n;
   *   })
   *   .catch((err, caught) => caught)
   *   .take(30)
   *   .subscribe(x => console.log(x));
   *   // 1, 2, 3, 1, 2, 3, ...
   *
   * @example <caption>Throws a new error when the source Observable throws an error</caption>
   *
   * Observable.of(1, 2, 3, 4, 5)
   *   .map(n => {
   *     if (n == 4) {
   *       throw 'four!';
   *     }
   *     return n;
   *   })
   *   .catch(err => {
   *     throw 'error in source. Details: ' + err;
   *   })
   *   .subscribe(
   *     x => console.log(x),
   *     err => console.log(err)
   *   );
   *   // 1, 2, 3, error in source. Details: four!
   *
   * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
   *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
   *  is returned by the `selector` will be used to continue the observable chain.
   * @return {Observable} An observable that originates from either the source or the observable returned by the
   *  catch `selector` function.
   * @method catch
   * @name catch
   * @owner Observable
   */
  function _catch(selector) {
      return catchError_1.catchError(selector)(this);
  }
  exports._catch = _catch;
  
  });
  
  unwrapExports(_catch_1);
  var _catch_2 = _catch_1._catch;
  
  var _catch$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.catch = _catch_1._catch;
  Observable_1.Observable.prototype._catch = _catch_1._catch;
  
  });
  
  unwrapExports(_catch$1);
  
  var combineAll_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function combineAll(project) {
      return function (source) { return source.lift(new combineLatest_1.CombineLatestOperator(project)); };
  }
  exports.combineAll = combineAll;
  
  });
  
  unwrapExports(combineAll_1);
  var combineAll_2 = combineAll_1.combineAll;
  
  var combineAll_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts a higher-order Observable into a first-order Observable by waiting
   * for the outer Observable to complete, then applying {@link combineLatest}.
   *
   * <span class="informal">Flattens an Observable-of-Observables by applying
   * {@link combineLatest} when the Observable-of-Observables completes.</span>
   *
   * <img src="./img/combineAll.png" width="100%">
   *
   * Takes an Observable of Observables, and collects all Observables from it.
   * Once the outer Observable completes, it subscribes to all collected
   * Observables and combines their values using the {@link combineLatest}
   * strategy, such that:
   * - Every time an inner Observable emits, the output Observable emits.
   * - When the returned observable emits, it emits all of the latest values by:
   *   - If a `project` function is provided, it is called with each recent value
   *     from each inner Observable in whatever order they arrived, and the result
   *     of the `project` function is what is emitted by the output Observable.
   *   - If there is no `project` function, an array of all of the most recent
   *     values is emitted by the output Observable.
   *
   * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map(ev =>
   *   Rx.Observable.interval(Math.random()*2000).take(3)
   * ).take(2);
   * var result = higherOrder.combineAll();
   * result.subscribe(x => console.log(x));
   *
   * @see {@link combineLatest}
   * @see {@link mergeAll}
   *
   * @param {function} [project] An optional function to map the most recent
   * values from each inner Observable into a new result. Takes each of the most
   * recent values from each collected inner Observable as arguments, in order.
   * @return {Observable} An Observable of projected results or arrays of recent
   * values.
   * @method combineAll
   * @owner Observable
   */
  function combineAll(project) {
      return combineAll_1.combineAll(project)(this);
  }
  exports.combineAll = combineAll;
  
  });
  
  unwrapExports(combineAll_2$1);
  var combineAll_3 = combineAll_2$1.combineAll;
  
  var combineAll$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.combineAll = combineAll_2$1.combineAll;
  
  });
  
  unwrapExports(combineAll$2);
  
  var combineLatest_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Combines multiple Observables to create an Observable whose values are
   * calculated from the latest values of each of its input Observables.
   *
   * <span class="informal">Whenever any input Observable emits a value, it
   * computes a formula using the latest values from all the inputs, then emits
   * the output of that formula.</span>
   *
   * <img src="./img/combineLatest.png" width="100%">
   *
   * `combineLatest` combines the values from this Observable with values from
   * Observables passed as arguments. This is done by subscribing to each
   * Observable, in order, and collecting an array of each of the most recent
   * values any time any of the input Observables emits, then either taking that
   * array and passing it as arguments to an optional `project` function and
   * emitting the return value of that, or just emitting the array of recent
   * values directly if there is no `project` function.
   *
   * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
   * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
   * var height = Rx.Observable.of(1.76, 1.77, 1.78);
   * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
   * bmi.subscribe(x => console.log('BMI is ' + x));
   *
   * // With output to console:
   * // BMI is 24.212293388429753
   * // BMI is 23.93948099205209
   * // BMI is 23.671253629592222
   *
   * @see {@link combineAll}
   * @see {@link merge}
   * @see {@link withLatestFrom}
   *
   * @param {ObservableInput} other An input Observable to combine with the source
   * Observable. More than one input Observables may be given as argument.
   * @param {function} [project] An optional function to project the values from
   * the combined latest values into a new value on the output Observable.
   * @return {Observable} An Observable of projected values from the most recent
   * values from each input Observable, or an array of the most recent values from
   * each input Observable.
   * @method combineLatest
   * @owner Observable
   */
  function combineLatest() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      var project = null;
      if (typeof observables[observables.length - 1] === 'function') {
          project = observables.pop();
      }
      // if the first and only other argument besides the resultSelector is an array
      // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
      if (observables.length === 1 && isArray.isArray(observables[0])) {
          observables = observables[0].slice();
      }
      return this.lift.call(of_1.of.apply(void 0, [this].concat(observables)), new combineLatest_1.CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  
  });
  
  unwrapExports(combineLatest_2$1);
  var combineLatest_3$1 = combineLatest_2$1.combineLatest;
  
  var combineLatest$4 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.combineLatest = combineLatest_2$1.combineLatest;
  
  });
  
  unwrapExports(combineLatest$4);
  
  var concat_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Creates an output Observable which sequentially emits all values from every
   * given input Observable after the current Observable.
   *
   * <span class="informal">Concatenates multiple Observables together by
   * sequentially emitting their values, one Observable after the other.</span>
   *
   * <img src="./img/concat.png" width="100%">
   *
   * Joins this Observable with multiple other Observables by subscribing to them
   * one at a time, starting with the source, and merging their results into the
   * output Observable. Will wait for each Observable to complete before moving
   * on to the next.
   *
   * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
   * var timer = Rx.Observable.interval(1000).take(4);
   * var sequence = Rx.Observable.range(1, 10);
   * var result = timer.concat(sequence);
   * result.subscribe(x => console.log(x));
   *
   * // results in:
   * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
   *
   * @example <caption>Concatenate 3 Observables</caption>
   * var timer1 = Rx.Observable.interval(1000).take(10);
   * var timer2 = Rx.Observable.interval(2000).take(6);
   * var timer3 = Rx.Observable.interval(500).take(10);
   * var result = timer1.concat(timer2, timer3);
   * result.subscribe(x => console.log(x));
   *
   * // results in the following:
   * // (Prints to console sequentially)
   * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
   * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
   * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
   *
   * @see {@link concatAll}
   * @see {@link concatMap}
   * @see {@link concatMapTo}
   *
   * @param {ObservableInput} other An input Observable to concatenate after the source
   * Observable. More than one input Observables may be given as argument.
   * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
   * Observable subscription on.
   * @return {Observable} All values of each passed Observable merged into a
   * single Observable, in order, in serial fashion.
   * @method concat
   * @owner Observable
   */
  function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return this.lift.call(concat_1.concat.apply(void 0, [this].concat(observables)));
  }
  exports.concat = concat;
  
  });
  
  unwrapExports(concat_2$1);
  var concat_3 = concat_2$1.concat;
  
  var concat$4 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.concat = concat_2$1.concat;
  
  });
  
  unwrapExports(concat$4);
  
  var concatAll_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Converts a higher-order Observable into a first-order Observable by
   * concatenating the inner Observables in order.
   *
   * <span class="informal">Flattens an Observable-of-Observables by putting one
   * inner Observable after the other.</span>
   *
   * <img src="./img/concatAll.png" width="100%">
   *
   * Joins every Observable emitted by the source (a higher-order Observable), in
   * a serial fashion. It subscribes to each inner Observable only after the
   * previous inner Observable has completed, and merges all of their values into
   * the returned observable.
   *
   * __Warning:__ If the source Observable emits Observables quickly and
   * endlessly, and the inner Observables it emits generally complete slower than
   * the source emits, you can run into memory issues as the incoming Observables
   * collect in an unbounded buffer.
   *
   * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
   * to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
   * var firstOrder = higherOrder.concatAll();
   * firstOrder.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link combineAll}
   * @see {@link concat}
   * @see {@link concatMap}
   * @see {@link concatMapTo}
   * @see {@link exhaust}
   * @see {@link mergeAll}
   * @see {@link switch}
   * @see {@link zipAll}
   *
   * @return {Observable} An Observable emitting values from all the inner
   * Observables concatenated.
   * @method concatAll
   * @owner Observable
   */
  function concatAll() {
      return concatAll_1.concatAll()(this);
  }
  exports.concatAll = concatAll;
  
  });
  
  unwrapExports(concatAll_2$1);
  var concatAll_3 = concatAll_2$1.concatAll;
  
  var concatAll$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.concatAll = concatAll_2$1.concatAll;
  
  });
  
  unwrapExports(concatAll$2);
  
  var concatMap_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable, in a serialized fashion waiting for each one to complete before
   * merging the next.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link concatAll}.</span>
   *
   * <img src="./img/concatMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. Each new inner Observable is
   * concatenated with the previous inner Observable.
   *
   * __Warning:__ if source values arrive endlessly and faster than their
   * corresponding inner Observables can complete, it will result in memory issues
   * as inner Observables amass in an unbounded buffer waiting for their turn to
   * be subscribed to.
   *
   * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
   * to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link concat}
   * @see {@link concatAll}
   * @see {@link concatMapTo}
   * @see {@link exhaustMap}
   * @see {@link mergeMap}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and taking values from each projected inner
   * Observable sequentially.
   * @method concatMap
   * @owner Observable
   */
  function concatMap(project, resultSelector) {
      return mergeMap_1.mergeMap(project, resultSelector, 1);
  }
  exports.concatMap = concatMap;
  
  });
  
  unwrapExports(concatMap_1);
  var concatMap_2 = concatMap_1.concatMap;
  
  var concatMap_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable, in a serialized fashion waiting for each one to complete before
   * merging the next.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link concatAll}.</span>
   *
   * <img src="./img/concatMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. Each new inner Observable is
   * concatenated with the previous inner Observable.
   *
   * __Warning:__ if source values arrive endlessly and faster than their
   * corresponding inner Observables can complete, it will result in memory issues
   * as inner Observables amass in an unbounded buffer waiting for their turn to
   * be subscribed to.
   *
   * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
   * to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link concat}
   * @see {@link concatAll}
   * @see {@link concatMapTo}
   * @see {@link exhaustMap}
   * @see {@link mergeMap}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and taking values from each projected inner
   * Observable sequentially.
   * @method concatMap
   * @owner Observable
   */
  function concatMap(project, resultSelector) {
      return concatMap_1.concatMap(project, resultSelector)(this);
  }
  exports.concatMap = concatMap;
  
  });
  
  unwrapExports(concatMap_2$1);
  var concatMap_3 = concatMap_2$1.concatMap;
  
  var concatMap$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.concatMap = concatMap_2$1.concatMap;
  
  });
  
  unwrapExports(concatMap$2);
  
  var concatMapTo_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is merged multiple
   * times in a serialized fashion on the output Observable.
   *
   * <span class="informal">It's like {@link concatMap}, but maps each value
   * always to the same inner Observable.</span>
   *
   * <img src="./img/concatMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then flattens those resulting Observables into one
   * single Observable, which is the output Observable. Each new `innerObservable`
   * instance emitted on the output Observable is concatenated with the previous
   * `innerObservable` instance.
   *
   * __Warning:__ if source values arrive endlessly and faster than their
   * corresponding inner Observables can complete, it will result in memory issues
   * as inner Observables amass in an unbounded buffer waiting for their turn to
   * be subscribed to.
   *
   * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
   * set to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link concat}
   * @see {@link concatAll}
   * @see {@link concatMap}
   * @see {@link mergeMapTo}
   * @see {@link switchMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An observable of values merged together by joining the
   * passed observable with itself, one after the other, for each value emitted
   * from the source.
   * @method concatMapTo
   * @owner Observable
   */
  function concatMapTo(innerObservable, resultSelector) {
      return concatMap_1.concatMap(function () { return innerObservable; }, resultSelector);
  }
  exports.concatMapTo = concatMapTo;
  
  });
  
  unwrapExports(concatMapTo_1);
  var concatMapTo_2 = concatMapTo_1.concatMapTo;
  
  var concatMapTo_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is merged multiple
   * times in a serialized fashion on the output Observable.
   *
   * <span class="informal">It's like {@link concatMap}, but maps each value
   * always to the same inner Observable.</span>
   *
   * <img src="./img/concatMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then flattens those resulting Observables into one
   * single Observable, which is the output Observable. Each new `innerObservable`
   * instance emitted on the output Observable is concatenated with the previous
   * `innerObservable` instance.
   *
   * __Warning:__ if source values arrive endlessly and faster than their
   * corresponding inner Observables can complete, it will result in memory issues
   * as inner Observables amass in an unbounded buffer waiting for their turn to
   * be subscribed to.
   *
   * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
   * set to `1`.
   *
   * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // (results are not concurrent)
   * // For every click on the "document" it will emit values 0 to 3 spaced
   * // on a 1000ms interval
   * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
   *
   * @see {@link concat}
   * @see {@link concatAll}
   * @see {@link concatMap}
   * @see {@link mergeMapTo}
   * @see {@link switchMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An observable of values merged together by joining the
   * passed observable with itself, one after the other, for each value emitted
   * from the source.
   * @method concatMapTo
   * @owner Observable
   */
  function concatMapTo(innerObservable, resultSelector) {
      return concatMapTo_1.concatMapTo(innerObservable, resultSelector)(this);
  }
  exports.concatMapTo = concatMapTo;
  
  });
  
  unwrapExports(concatMapTo_2$1);
  var concatMapTo_3 = concatMapTo_2$1.concatMapTo;
  
  var concatMapTo$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.concatMapTo = concatMapTo_2$1.concatMapTo;
  
  });
  
  unwrapExports(concatMapTo$2);
  
  var count_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Counts the number of emissions on the source and emits that number when the
   * source completes.
   *
   * <span class="informal">Tells how many values were emitted, when the source
   * completes.</span>
   *
   * <img src="./img/count.png" width="100%">
   *
   * `count` transforms an Observable that emits values into an Observable that
   * emits a single value that represents the number of values emitted by the
   * source Observable. If the source Observable terminates with an error, `count`
   * will pass this error notification along without emitting a value first. If
   * the source Observable does not terminate at all, `count` will neither emit
   * a value nor terminate. This operator takes an optional `predicate` function
   * as argument, in which case the output emission will represent the number of
   * source values that matched `true` with the `predicate`.
   *
   * @example <caption>Counts how many seconds have passed before the first click happened</caption>
   * var seconds = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var secondsBeforeClick = seconds.takeUntil(clicks);
   * var result = secondsBeforeClick.count();
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
   * var numbers = Rx.Observable.range(1, 7);
   * var result = numbers.count(i => i % 2 === 1);
   * result.subscribe(x => console.log(x));
   *
   * // Results in:
   * // 4
   *
   * @see {@link max}
   * @see {@link min}
   * @see {@link reduce}
   *
   * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
   * boolean function to select what values are to be counted. It is provided with
   * arguments of:
   * - `value`: the value from the source Observable.
   * - `index`: the (zero-based) "index" of the value from the source Observable.
   * - `source`: the source Observable instance itself.
   * @return {Observable} An Observable of one number that represents the count as
   * described above.
   * @method count
   * @owner Observable
   */
  function count(predicate) {
      return function (source) { return source.lift(new CountOperator(predicate, source)); };
  }
  exports.count = count;
  var CountOperator = /** @class */ (function () {
      function CountOperator(predicate, source) {
          this.predicate = predicate;
          this.source = source;
      }
      CountOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
      };
      return CountOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var CountSubscriber = /** @class */ (function (_super) {
      __extends(CountSubscriber, _super);
      function CountSubscriber(destination, predicate, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.count = 0;
          _this.index = 0;
          return _this;
      }
      CountSubscriber.prototype._next = function (value) {
          if (this.predicate) {
              this._tryPredicate(value);
          }
          else {
              this.count++;
          }
      };
      CountSubscriber.prototype._tryPredicate = function (value) {
          var result;
          try {
              result = this.predicate(value, this.index++, this.source);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              this.count++;
          }
      };
      CountSubscriber.prototype._complete = function () {
          this.destination.next(this.count);
          this.destination.complete();
      };
      return CountSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(count_1);
  var count_2 = count_1.count;
  
  var count_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Counts the number of emissions on the source and emits that number when the
   * source completes.
   *
   * <span class="informal">Tells how many values were emitted, when the source
   * completes.</span>
   *
   * <img src="./img/count.png" width="100%">
   *
   * `count` transforms an Observable that emits values into an Observable that
   * emits a single value that represents the number of values emitted by the
   * source Observable. If the source Observable terminates with an error, `count`
   * will pass this error notification along without emitting a value first. If
   * the source Observable does not terminate at all, `count` will neither emit
   * a value nor terminate. This operator takes an optional `predicate` function
   * as argument, in which case the output emission will represent the number of
   * source values that matched `true` with the `predicate`.
   *
   * @example <caption>Counts how many seconds have passed before the first click happened</caption>
   * var seconds = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var secondsBeforeClick = seconds.takeUntil(clicks);
   * var result = secondsBeforeClick.count();
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
   * var numbers = Rx.Observable.range(1, 7);
   * var result = numbers.count(i => i % 2 === 1);
   * result.subscribe(x => console.log(x));
   *
   * // Results in:
   * // 4
   *
   * @see {@link max}
   * @see {@link min}
   * @see {@link reduce}
   *
   * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
   * boolean function to select what values are to be counted. It is provided with
   * arguments of:
   * - `value`: the value from the source Observable.
   * - `index`: the (zero-based) "index" of the value from the source Observable.
   * - `source`: the source Observable instance itself.
   * @return {Observable} An Observable of one number that represents the count as
   * described above.
   * @method count
   * @owner Observable
   */
  function count(predicate) {
      return count_1.count(predicate)(this);
  }
  exports.count = count;
  
  });
  
  unwrapExports(count_2$1);
  var count_3 = count_2$1.count;
  
  var count$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.count = count_2$1.count;
  
  });
  
  unwrapExports(count$2);
  
  var dematerialize_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts an Observable of {@link Notification} objects into the emissions
   * that they represent.
   *
   * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
   * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
   *
   * <img src="./img/dematerialize.png" width="100%">
   *
   * `dematerialize` is assumed to operate an Observable that only emits
   * {@link Notification} objects as `next` emissions, and does not emit any
   * `error`. Such Observable is the output of a `materialize` operation. Those
   * notifications are then unwrapped using the metadata they contain, and emitted
   * as `next`, `error`, and `complete` on the output Observable.
   *
   * Use this operator in conjunction with {@link materialize}.
   *
   * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
   * var notifA = new Rx.Notification('N', 'A');
   * var notifB = new Rx.Notification('N', 'B');
   * var notifE = new Rx.Notification('E', void 0,
   *   new TypeError('x.toUpperCase is not a function')
   * );
   * var materialized = Rx.Observable.of(notifA, notifB, notifE);
   * var upperCase = materialized.dematerialize();
   * upperCase.subscribe(x => console.log(x), e => console.error(e));
   *
   * // Results in:
   * // A
   * // B
   * // TypeError: x.toUpperCase is not a function
   *
   * @see {@link Notification}
   * @see {@link materialize}
   *
   * @return {Observable} An Observable that emits items and notifications
   * embedded in Notification objects emitted by the source Observable.
   * @method dematerialize
   * @owner Observable
   */
  function dematerialize() {
      return function dematerializeOperatorFunction(source) {
          return source.lift(new DeMaterializeOperator());
      };
  }
  exports.dematerialize = dematerialize;
  var DeMaterializeOperator = /** @class */ (function () {
      function DeMaterializeOperator() {
      }
      DeMaterializeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DeMaterializeSubscriber(subscriber));
      };
      return DeMaterializeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DeMaterializeSubscriber = /** @class */ (function (_super) {
      __extends(DeMaterializeSubscriber, _super);
      function DeMaterializeSubscriber(destination) {
          return _super.call(this, destination) || this;
      }
      DeMaterializeSubscriber.prototype._next = function (value) {
          value.observe(this.destination);
      };
      return DeMaterializeSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(dematerialize_1);
  var dematerialize_2 = dematerialize_1.dematerialize;
  
  var dematerialize_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts an Observable of {@link Notification} objects into the emissions
   * that they represent.
   *
   * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
   * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
   *
   * <img src="./img/dematerialize.png" width="100%">
   *
   * `dematerialize` is assumed to operate an Observable that only emits
   * {@link Notification} objects as `next` emissions, and does not emit any
   * `error`. Such Observable is the output of a `materialize` operation. Those
   * notifications are then unwrapped using the metadata they contain, and emitted
   * as `next`, `error`, and `complete` on the output Observable.
   *
   * Use this operator in conjunction with {@link materialize}.
   *
   * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
   * var notifA = new Rx.Notification('N', 'A');
   * var notifB = new Rx.Notification('N', 'B');
   * var notifE = new Rx.Notification('E', void 0,
   *   new TypeError('x.toUpperCase is not a function')
   * );
   * var materialized = Rx.Observable.of(notifA, notifB, notifE);
   * var upperCase = materialized.dematerialize();
   * upperCase.subscribe(x => console.log(x), e => console.error(e));
   *
   * // Results in:
   * // A
   * // B
   * // TypeError: x.toUpperCase is not a function
   *
   * @see {@link Notification}
   * @see {@link materialize}
   *
   * @return {Observable} An Observable that emits items and notifications
   * embedded in Notification objects emitted by the source Observable.
   * @method dematerialize
   * @owner Observable
   */
  function dematerialize() {
      return dematerialize_1.dematerialize()(this);
  }
  exports.dematerialize = dematerialize;
  
  });
  
  unwrapExports(dematerialize_2$1);
  var dematerialize_3 = dematerialize_2$1.dematerialize;
  
  var dematerialize$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.dematerialize = dematerialize_2$1.dematerialize;
  
  });
  
  unwrapExports(dematerialize$2);
  
  var debounce_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits a value from the source Observable only after a particular time span
   * determined by another Observable has passed without another source emission.
   *
   * <span class="informal">It's like {@link debounceTime}, but the time span of
   * emission silence is determined by a second Observable.</span>
   *
   * <img src="./img/debounce.png" width="100%">
   *
   * `debounce` delays values emitted by the source Observable, but drops previous
   * pending delayed emissions if a new value arrives on the source Observable.
   * This operator keeps track of the most recent value from the source
   * Observable, and spawns a duration Observable by calling the
   * `durationSelector` function. The value is emitted only when the duration
   * Observable emits a value or completes, and if no other value was emitted on
   * the source Observable since the duration Observable was spawned. If a new
   * value appears before the duration Observable emits, the previous value will
   * be dropped and will not be emitted on the output Observable.
   *
   * Like {@link debounceTime}, this is a rate-limiting operator, and also a
   * delay-like operator since output emissions do not necessarily occur at the
   * same time as they did on the source Observable.
   *
   * @example <caption>Emit the most recent click after a burst of clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.debounce(() => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounceTime}
   * @see {@link delayWhen}
   * @see {@link throttle}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the timeout
   * duration for each source value, returned as an Observable or a Promise.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified duration Observable returned by
   * `durationSelector`, and may drop some values if they occur too frequently.
   * @method debounce
   * @owner Observable
   */
  function debounce(durationSelector) {
      return function (source) { return source.lift(new DebounceOperator(durationSelector)); };
  }
  exports.debounce = debounce;
  var DebounceOperator = /** @class */ (function () {
      function DebounceOperator(durationSelector) {
          this.durationSelector = durationSelector;
      }
      DebounceOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
      };
      return DebounceOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DebounceSubscriber = /** @class */ (function (_super) {
      __extends(DebounceSubscriber, _super);
      function DebounceSubscriber(destination, durationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.durationSelector = durationSelector;
          _this.hasValue = false;
          _this.durationSubscription = null;
          return _this;
      }
      DebounceSubscriber.prototype._next = function (value) {
          try {
              var result = this.durationSelector.call(this, value);
              if (result) {
                  this._tryNext(value, result);
              }
          }
          catch (err) {
              this.destination.error(err);
          }
      };
      DebounceSubscriber.prototype._complete = function () {
          this.emitValue();
          this.destination.complete();
      };
      DebounceSubscriber.prototype._tryNext = function (value, duration) {
          var subscription = this.durationSubscription;
          this.value = value;
          this.hasValue = true;
          if (subscription) {
              subscription.unsubscribe();
              this.remove(subscription);
          }
          subscription = subscribeToResult_1.subscribeToResult(this, duration);
          if (subscription && !subscription.closed) {
              this.add(this.durationSubscription = subscription);
          }
      };
      DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.emitValue();
      };
      DebounceSubscriber.prototype.notifyComplete = function () {
          this.emitValue();
      };
      DebounceSubscriber.prototype.emitValue = function () {
          if (this.hasValue) {
              var value = this.value;
              var subscription = this.durationSubscription;
              if (subscription) {
                  this.durationSubscription = null;
                  subscription.unsubscribe();
                  this.remove(subscription);
              }
              // This must be done *before* passing the value
              // along to the destination because it's possible for
              // the value to synchronously re-enter this operator
              // recursively if the duration selector Observable
              // emits synchronously
              this.value = null;
              this.hasValue = false;
              _super.prototype._next.call(this, value);
          }
      };
      return DebounceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(debounce_1);
  var debounce_2 = debounce_1.debounce;
  
  var debounce_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits a value from the source Observable only after a particular time span
   * determined by another Observable has passed without another source emission.
   *
   * <span class="informal">It's like {@link debounceTime}, but the time span of
   * emission silence is determined by a second Observable.</span>
   *
   * <img src="./img/debounce.png" width="100%">
   *
   * `debounce` delays values emitted by the source Observable, but drops previous
   * pending delayed emissions if a new value arrives on the source Observable.
   * This operator keeps track of the most recent value from the source
   * Observable, and spawns a duration Observable by calling the
   * `durationSelector` function. The value is emitted only when the duration
   * Observable emits a value or completes, and if no other value was emitted on
   * the source Observable since the duration Observable was spawned. If a new
   * value appears before the duration Observable emits, the previous value will
   * be dropped and will not be emitted on the output Observable.
   *
   * Like {@link debounceTime}, this is a rate-limiting operator, and also a
   * delay-like operator since output emissions do not necessarily occur at the
   * same time as they did on the source Observable.
   *
   * @example <caption>Emit the most recent click after a burst of clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.debounce(() => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounceTime}
   * @see {@link delayWhen}
   * @see {@link throttle}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the timeout
   * duration for each source value, returned as an Observable or a Promise.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified duration Observable returned by
   * `durationSelector`, and may drop some values if they occur too frequently.
   * @method debounce
   * @owner Observable
   */
  function debounce(durationSelector) {
      return debounce_1.debounce(durationSelector)(this);
  }
  exports.debounce = debounce;
  
  });
  
  unwrapExports(debounce_2$1);
  var debounce_3 = debounce_2$1.debounce;
  
  var debounce$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.debounce = debounce_2$1.debounce;
  
  });
  
  unwrapExports(debounce$2);
  
  var debounceTime_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits a value from the source Observable only after a particular time span
   * has passed without another source emission.
   *
   * <span class="informal">It's like {@link delay}, but passes only the most
   * recent value from each burst of emissions.</span>
   *
   * <img src="./img/debounceTime.png" width="100%">
   *
   * `debounceTime` delays values emitted by the source Observable, but drops
   * previous pending delayed emissions if a new value arrives on the source
   * Observable. This operator keeps track of the most recent value from the
   * source Observable, and emits that only when `dueTime` enough time has passed
   * without any other value appearing on the source Observable. If a new value
   * appears before `dueTime` silence occurs, the previous value will be dropped
   * and will not be emitted on the output Observable.
   *
   * This is a rate-limiting operator, because it is impossible for more than one
   * value to be emitted in any time window of duration `dueTime`, but it is also
   * a delay-like operator since output emissions do not occur at the same time as
   * they did on the source Observable. Optionally takes a {@link IScheduler} for
   * managing timers.
   *
   * @example <caption>Emit the most recent click after a burst of clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.debounceTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounce}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttleTime}
   *
   * @param {number} dueTime The timeout duration in milliseconds (or the time
   * unit determined internally by the optional `scheduler`) for the window of
   * time required to wait for emission silence before emitting the most recent
   * source value.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the timeout for each value.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified `dueTime`, and may drop some values if they occur
   * too frequently.
   * @method debounceTime
   * @owner Observable
   */
  function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
  }
  exports.debounceTime = debounceTime;
  var DebounceTimeOperator = /** @class */ (function () {
      function DebounceTimeOperator(dueTime, scheduler) {
          this.dueTime = dueTime;
          this.scheduler = scheduler;
      }
      DebounceTimeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
      };
      return DebounceTimeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DebounceTimeSubscriber = /** @class */ (function (_super) {
      __extends(DebounceTimeSubscriber, _super);
      function DebounceTimeSubscriber(destination, dueTime, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.dueTime = dueTime;
          _this.scheduler = scheduler;
          _this.debouncedSubscription = null;
          _this.lastValue = null;
          _this.hasValue = false;
          return _this;
      }
      DebounceTimeSubscriber.prototype._next = function (value) {
          this.clearDebounce();
          this.lastValue = value;
          this.hasValue = true;
          this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
      };
      DebounceTimeSubscriber.prototype._complete = function () {
          this.debouncedNext();
          this.destination.complete();
      };
      DebounceTimeSubscriber.prototype.debouncedNext = function () {
          this.clearDebounce();
          if (this.hasValue) {
              var lastValue = this.lastValue;
              // This must be done *before* passing the value
              // along to the destination because it's possible for
              // the value to synchronously re-enter this operator
              // recursively when scheduled with things like
              // VirtualScheduler/TestScheduler.
              this.lastValue = null;
              this.hasValue = false;
              this.destination.next(lastValue);
          }
      };
      DebounceTimeSubscriber.prototype.clearDebounce = function () {
          var debouncedSubscription = this.debouncedSubscription;
          if (debouncedSubscription !== null) {
              this.remove(debouncedSubscription);
              debouncedSubscription.unsubscribe();
              this.debouncedSubscription = null;
          }
      };
      return DebounceTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(subscriber) {
      subscriber.debouncedNext();
  }
  
  });
  
  unwrapExports(debounceTime_1);
  var debounceTime_2 = debounceTime_1.debounceTime;
  
  var debounceTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits a value from the source Observable only after a particular time span
   * has passed without another source emission.
   *
   * <span class="informal">It's like {@link delay}, but passes only the most
   * recent value from each burst of emissions.</span>
   *
   * <img src="./img/debounceTime.png" width="100%">
   *
   * `debounceTime` delays values emitted by the source Observable, but drops
   * previous pending delayed emissions if a new value arrives on the source
   * Observable. This operator keeps track of the most recent value from the
   * source Observable, and emits that only when `dueTime` enough time has passed
   * without any other value appearing on the source Observable. If a new value
   * appears before `dueTime` silence occurs, the previous value will be dropped
   * and will not be emitted on the output Observable.
   *
   * This is a rate-limiting operator, because it is impossible for more than one
   * value to be emitted in any time window of duration `dueTime`, but it is also
   * a delay-like operator since output emissions do not occur at the same time as
   * they did on the source Observable. Optionally takes a {@link IScheduler} for
   * managing timers.
   *
   * @example <caption>Emit the most recent click after a burst of clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.debounceTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounce}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttleTime}
   *
   * @param {number} dueTime The timeout duration in milliseconds (or the time
   * unit determined internally by the optional `scheduler`) for the window of
   * time required to wait for emission silence before emitting the most recent
   * source value.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the timeout for each value.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified `dueTime`, and may drop some values if they occur
   * too frequently.
   * @method debounceTime
   * @owner Observable
   */
  function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return debounceTime_1.debounceTime(dueTime, scheduler)(this);
  }
  exports.debounceTime = debounceTime;
  
  });
  
  unwrapExports(debounceTime_2$1);
  var debounceTime_3 = debounceTime_2$1.debounceTime;
  
  var debounceTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.debounceTime = debounceTime_2$1.debounceTime;
  
  });
  
  unwrapExports(debounceTime$2);
  
  var defaultIfEmpty_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Emits a given value if the source Observable completes without emitting any
   * `next` value, otherwise mirrors the source Observable.
   *
   * <span class="informal">If the source Observable turns out to be empty, then
   * this operator will emit a default value.</span>
   *
   * <img src="./img/defaultIfEmpty.png" width="100%">
   *
   * `defaultIfEmpty` emits the values emitted by the source Observable or a
   * specified default value if the source Observable is empty (completes without
   * having emitted any `next` value).
   *
   * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
   * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link empty}
   * @see {@link last}
   *
   * @param {any} [defaultValue=null] The default value used if the source
   * Observable is empty.
   * @return {Observable} An Observable that emits either the specified
   * `defaultValue` if the source Observable emits no items, or the values emitted
   * by the source Observable.
   * @method defaultIfEmpty
   * @owner Observable
   */
  function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) { defaultValue = null; }
      return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
  }
  exports.defaultIfEmpty = defaultIfEmpty;
  var DefaultIfEmptyOperator = /** @class */ (function () {
      function DefaultIfEmptyOperator(defaultValue) {
          this.defaultValue = defaultValue;
      }
      DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
      };
      return DefaultIfEmptyOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DefaultIfEmptySubscriber = /** @class */ (function (_super) {
      __extends(DefaultIfEmptySubscriber, _super);
      function DefaultIfEmptySubscriber(destination, defaultValue) {
          var _this = _super.call(this, destination) || this;
          _this.defaultValue = defaultValue;
          _this.isEmpty = true;
          return _this;
      }
      DefaultIfEmptySubscriber.prototype._next = function (value) {
          this.isEmpty = false;
          this.destination.next(value);
      };
      DefaultIfEmptySubscriber.prototype._complete = function () {
          if (this.isEmpty) {
              this.destination.next(this.defaultValue);
          }
          this.destination.complete();
      };
      return DefaultIfEmptySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(defaultIfEmpty_1);
  var defaultIfEmpty_2 = defaultIfEmpty_1.defaultIfEmpty;
  
  var defaultIfEmpty_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Emits a given value if the source Observable completes without emitting any
   * `next` value, otherwise mirrors the source Observable.
   *
   * <span class="informal">If the source Observable turns out to be empty, then
   * this operator will emit a default value.</span>
   *
   * <img src="./img/defaultIfEmpty.png" width="100%">
   *
   * `defaultIfEmpty` emits the values emitted by the source Observable or a
   * specified default value if the source Observable is empty (completes without
   * having emitted any `next` value).
   *
   * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
   * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link empty}
   * @see {@link last}
   *
   * @param {any} [defaultValue=null] The default value used if the source
   * Observable is empty.
   * @return {Observable} An Observable that emits either the specified
   * `defaultValue` if the source Observable emits no items, or the values emitted
   * by the source Observable.
   * @method defaultIfEmpty
   * @owner Observable
   */
  function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) { defaultValue = null; }
      return defaultIfEmpty_1.defaultIfEmpty(defaultValue)(this);
  }
  exports.defaultIfEmpty = defaultIfEmpty;
  
  });
  
  unwrapExports(defaultIfEmpty_2$1);
  var defaultIfEmpty_3 = defaultIfEmpty_2$1.defaultIfEmpty;
  
  var defaultIfEmpty$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_2$1.defaultIfEmpty;
  
  });
  
  unwrapExports(defaultIfEmpty$2);
  
  var isDate_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function isDate(value) {
      return value instanceof Date && !isNaN(+value);
  }
  exports.isDate = isDate;
  
  });
  
  unwrapExports(isDate_1);
  var isDate_2 = isDate_1.isDate;
  
  var delay_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Delays the emission of items from the source Observable by a given timeout or
   * until a given Date.
   *
   * <span class="informal">Time shifts each item by some specified amount of
   * milliseconds.</span>
   *
   * <img src="./img/delay.png" width="100%">
   *
   * If the delay argument is a Number, this operator time shifts the source
   * Observable by that amount of time expressed in milliseconds. The relative
   * time intervals between the values are preserved.
   *
   * If the delay argument is a Date, this operator time shifts the start of the
   * Observable execution until the given date occurs.
   *
   * @example <caption>Delay each click by one second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @example <caption>Delay all clicks until a future date happens</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var date = new Date('March 15, 2050 12:00:00'); // in the future
   * var delayedClicks = clicks.delay(date); // click emitted only after that date
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @see {@link debounceTime}
   * @see {@link delayWhen}
   *
   * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
   * a `Date` until which the emission of the source items is delayed.
   * @param {Scheduler} [scheduler=async] The IScheduler to use for
   * managing the timers that handle the time-shift for each item.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified timeout or Date.
   * @method delay
   * @owner Observable
   */
  function delay(delay, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      var absoluteDelay = isDate_1.isDate(delay);
      var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
      return function (source) { return source.lift(new DelayOperator(delayFor, scheduler)); };
  }
  exports.delay = delay;
  var DelayOperator = /** @class */ (function () {
      function DelayOperator(delay, scheduler) {
          this.delay = delay;
          this.scheduler = scheduler;
      }
      DelayOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
      };
      return DelayOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DelaySubscriber = /** @class */ (function (_super) {
      __extends(DelaySubscriber, _super);
      function DelaySubscriber(destination, delay, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.delay = delay;
          _this.scheduler = scheduler;
          _this.queue = [];
          _this.active = false;
          _this.errored = false;
          return _this;
      }
      DelaySubscriber.dispatch = function (state) {
          var source = state.source;
          var queue = source.queue;
          var scheduler = state.scheduler;
          var destination = state.destination;
          while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
              queue.shift().notification.observe(destination);
          }
          if (queue.length > 0) {
              var delay_1 = Math.max(0, queue[0].time - scheduler.now());
              this.schedule(state, delay_1);
          }
          else {
              source.active = false;
          }
      };
      DelaySubscriber.prototype._schedule = function (scheduler) {
          this.active = true;
          this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
              source: this, destination: this.destination, scheduler: scheduler
          }));
      };
      DelaySubscriber.prototype.scheduleNotification = function (notification) {
          if (this.errored === true) {
              return;
          }
          var scheduler = this.scheduler;
          var message = new DelayMessage(scheduler.now() + this.delay, notification);
          this.queue.push(message);
          if (this.active === false) {
              this._schedule(scheduler);
          }
      };
      DelaySubscriber.prototype._next = function (value) {
          this.scheduleNotification(Notification_1.Notification.createNext(value));
      };
      DelaySubscriber.prototype._error = function (err) {
          this.errored = true;
          this.queue = [];
          this.destination.error(err);
      };
      DelaySubscriber.prototype._complete = function () {
          this.scheduleNotification(Notification_1.Notification.createComplete());
      };
      return DelaySubscriber;
  }(Subscriber_1.Subscriber));
  var DelayMessage = /** @class */ (function () {
      function DelayMessage(time, notification) {
          this.time = time;
          this.notification = notification;
      }
      return DelayMessage;
  }());
  
  });
  
  unwrapExports(delay_1);
  var delay_2 = delay_1.delay;
  
  var delay_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Delays the emission of items from the source Observable by a given timeout or
   * until a given Date.
   *
   * <span class="informal">Time shifts each item by some specified amount of
   * milliseconds.</span>
   *
   * <img src="./img/delay.png" width="100%">
   *
   * If the delay argument is a Number, this operator time shifts the source
   * Observable by that amount of time expressed in milliseconds. The relative
   * time intervals between the values are preserved.
   *
   * If the delay argument is a Date, this operator time shifts the start of the
   * Observable execution until the given date occurs.
   *
   * @example <caption>Delay each click by one second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @example <caption>Delay all clicks until a future date happens</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var date = new Date('March 15, 2050 12:00:00'); // in the future
   * var delayedClicks = clicks.delay(date); // click emitted only after that date
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @see {@link debounceTime}
   * @see {@link delayWhen}
   *
   * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
   * a `Date` until which the emission of the source items is delayed.
   * @param {Scheduler} [scheduler=async] The IScheduler to use for
   * managing the timers that handle the time-shift for each item.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by the specified timeout or Date.
   * @method delay
   * @owner Observable
   */
  function delay(delay, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return delay_1.delay(delay, scheduler)(this);
  }
  exports.delay = delay;
  
  });
  
  unwrapExports(delay_2$1);
  var delay_3 = delay_2$1.delay;
  
  var delay$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.delay = delay_2$1.delay;
  
  });
  
  unwrapExports(delay$2);
  
  var delayWhen_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Delays the emission of items from the source Observable by a given time span
   * determined by the emissions of another Observable.
   *
   * <span class="informal">It's like {@link delay}, but the time span of the
   * delay duration is determined by a second Observable.</span>
   *
   * <img src="./img/delayWhen.png" width="100%">
   *
   * `delayWhen` time shifts each emitted value from the source Observable by a
   * time span determined by another Observable. When the source emits a value,
   * the `delayDurationSelector` function is called with the source value as
   * argument, and should return an Observable, called the "duration" Observable.
   * The source value is emitted on the output Observable only when the duration
   * Observable emits a value or completes.
   *
   * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
   * is an Observable. When `subscriptionDelay` emits its first value or
   * completes, the source Observable is subscribed to and starts behaving like
   * described in the previous paragraph. If `subscriptionDelay` is not provided,
   * `delayWhen` will subscribe to the source Observable as soon as the output
   * Observable is subscribed.
   *
   * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var delayedClicks = clicks.delayWhen(event =>
   *   Rx.Observable.interval(Math.random() * 5000)
   * );
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @see {@link debounce}
   * @see {@link delay}
   *
   * @param {function(value: T): Observable} delayDurationSelector A function that
   * returns an Observable for each value emitted by the source Observable, which
   * is then used to delay the emission of that item on the output Observable
   * until the Observable returned from this function emits a value.
   * @param {Observable} subscriptionDelay An Observable that triggers the
   * subscription to the source Observable once it emits any value.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by an amount of time specified by the Observable returned by
   * `delayDurationSelector`.
   * @method delayWhen
   * @owner Observable
   */
  function delayWhen(delayDurationSelector, subscriptionDelay) {
      if (subscriptionDelay) {
          return function (source) {
              return new SubscriptionDelayObservable(source, subscriptionDelay)
                  .lift(new DelayWhenOperator(delayDurationSelector));
          };
      }
      return function (source) { return source.lift(new DelayWhenOperator(delayDurationSelector)); };
  }
  exports.delayWhen = delayWhen;
  var DelayWhenOperator = /** @class */ (function () {
      function DelayWhenOperator(delayDurationSelector) {
          this.delayDurationSelector = delayDurationSelector;
      }
      DelayWhenOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
      };
      return DelayWhenOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DelayWhenSubscriber = /** @class */ (function (_super) {
      __extends(DelayWhenSubscriber, _super);
      function DelayWhenSubscriber(destination, delayDurationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.delayDurationSelector = delayDurationSelector;
          _this.completed = false;
          _this.delayNotifierSubscriptions = [];
          _this.values = [];
          return _this;
      }
      DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.destination.next(outerValue);
          this.removeSubscription(innerSub);
          this.tryComplete();
      };
      DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
          this._error(error);
      };
      DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
          var value = this.removeSubscription(innerSub);
          if (value) {
              this.destination.next(value);
          }
          this.tryComplete();
      };
      DelayWhenSubscriber.prototype._next = function (value) {
          try {
              var delayNotifier = this.delayDurationSelector(value);
              if (delayNotifier) {
                  this.tryDelay(delayNotifier, value);
              }
          }
          catch (err) {
              this.destination.error(err);
          }
      };
      DelayWhenSubscriber.prototype._complete = function () {
          this.completed = true;
          this.tryComplete();
      };
      DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
          subscription.unsubscribe();
          var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
          var value = null;
          if (subscriptionIdx !== -1) {
              value = this.values[subscriptionIdx];
              this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
              this.values.splice(subscriptionIdx, 1);
          }
          return value;
      };
      DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
          var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
          if (notifierSubscription && !notifierSubscription.closed) {
              this.add(notifierSubscription);
              this.delayNotifierSubscriptions.push(notifierSubscription);
          }
          this.values.push(value);
      };
      DelayWhenSubscriber.prototype.tryComplete = function () {
          if (this.completed && this.delayNotifierSubscriptions.length === 0) {
              this.destination.complete();
          }
      };
      return DelayWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SubscriptionDelayObservable = /** @class */ (function (_super) {
      __extends(SubscriptionDelayObservable, _super);
      function SubscriptionDelayObservable(source, subscriptionDelay) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subscriptionDelay = subscriptionDelay;
          return _this;
      }
      SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
          this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
      };
      return SubscriptionDelayObservable;
  }(Observable_1.Observable));
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SubscriptionDelaySubscriber = /** @class */ (function (_super) {
      __extends(SubscriptionDelaySubscriber, _super);
      function SubscriptionDelaySubscriber(parent, source) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.source = source;
          _this.sourceSubscribed = false;
          return _this;
      }
      SubscriptionDelaySubscriber.prototype._next = function (unused) {
          this.subscribeToSource();
      };
      SubscriptionDelaySubscriber.prototype._error = function (err) {
          this.unsubscribe();
          this.parent.error(err);
      };
      SubscriptionDelaySubscriber.prototype._complete = function () {
          this.subscribeToSource();
      };
      SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
          if (!this.sourceSubscribed) {
              this.sourceSubscribed = true;
              this.unsubscribe();
              this.source.subscribe(this.parent);
          }
      };
      return SubscriptionDelaySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(delayWhen_1);
  var delayWhen_2 = delayWhen_1.delayWhen;
  
  var delayWhen_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Delays the emission of items from the source Observable by a given time span
   * determined by the emissions of another Observable.
   *
   * <span class="informal">It's like {@link delay}, but the time span of the
   * delay duration is determined by a second Observable.</span>
   *
   * <img src="./img/delayWhen.png" width="100%">
   *
   * `delayWhen` time shifts each emitted value from the source Observable by a
   * time span determined by another Observable. When the source emits a value,
   * the `delayDurationSelector` function is called with the source value as
   * argument, and should return an Observable, called the "duration" Observable.
   * The source value is emitted on the output Observable only when the duration
   * Observable emits a value or completes.
   *
   * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
   * is an Observable. When `subscriptionDelay` emits its first value or
   * completes, the source Observable is subscribed to and starts behaving like
   * described in the previous paragraph. If `subscriptionDelay` is not provided,
   * `delayWhen` will subscribe to the source Observable as soon as the output
   * Observable is subscribed.
   *
   * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var delayedClicks = clicks.delayWhen(event =>
   *   Rx.Observable.interval(Math.random() * 5000)
   * );
   * delayedClicks.subscribe(x => console.log(x));
   *
   * @see {@link debounce}
   * @see {@link delay}
   *
   * @param {function(value: T): Observable} delayDurationSelector A function that
   * returns an Observable for each value emitted by the source Observable, which
   * is then used to delay the emission of that item on the output Observable
   * until the Observable returned from this function emits a value.
   * @param {Observable} subscriptionDelay An Observable that triggers the
   * subscription to the source Observable once it emits any value.
   * @return {Observable} An Observable that delays the emissions of the source
   * Observable by an amount of time specified by the Observable returned by
   * `delayDurationSelector`.
   * @method delayWhen
   * @owner Observable
   */
  function delayWhen(delayDurationSelector, subscriptionDelay) {
      return delayWhen_1.delayWhen(delayDurationSelector, subscriptionDelay)(this);
  }
  exports.delayWhen = delayWhen;
  
  });
  
  unwrapExports(delayWhen_2$1);
  var delayWhen_3 = delayWhen_2$1.delayWhen;
  
  var delayWhen$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.delayWhen = delayWhen_2$1.delayWhen;
  
  });
  
  unwrapExports(delayWhen$2);
  
  var distinct_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  if (!Set) {
      throw new Error('Set is not present, please polyfill');
  }
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
   *
   * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
   * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
   * source observable directly with an equality check against previous values.
   *
   * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
   *
   * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
   * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
   * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
   * that the internal `Set` can be "flushed", basically clearing it of values.
   *
   * @example <caption>A simple example with numbers</caption>
   * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
   *   .distinct()
   *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
   *
   * @example <caption>An example using a keySelector function</caption>
   * interface Person {
   *    age: number,
   *    name: string
   * }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'})
   *     .distinct((p: Person) => p.name)
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   *
   * @see {@link distinctUntilChanged}
   * @see {@link distinctUntilKeyChanged}
   *
   * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
   * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values.
   * @method distinct
   * @owner Observable
   */
  function distinct(keySelector, flushes) {
      return function (source) { return source.lift(new DistinctOperator(keySelector, flushes)); };
  }
  exports.distinct = distinct;
  var DistinctOperator = /** @class */ (function () {
      function DistinctOperator(keySelector, flushes) {
          this.keySelector = keySelector;
          this.flushes = flushes;
      }
      DistinctOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
      };
      return DistinctOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DistinctSubscriber = /** @class */ (function (_super) {
      __extends(DistinctSubscriber, _super);
      function DistinctSubscriber(destination, keySelector, flushes) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.values = new Set();
          if (flushes) {
              _this.add(subscribeToResult_1.subscribeToResult(_this, flushes));
          }
          return _this;
      }
      DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.values.clear();
      };
      DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
          this._error(error);
      };
      DistinctSubscriber.prototype._next = function (value) {
          if (this.keySelector) {
              this._useKeySelector(value);
          }
          else {
              this._finalizeNext(value, value);
          }
      };
      DistinctSubscriber.prototype._useKeySelector = function (value) {
          var key;
          var destination = this.destination;
          try {
              key = this.keySelector(value);
          }
          catch (err) {
              destination.error(err);
              return;
          }
          this._finalizeNext(key, value);
      };
      DistinctSubscriber.prototype._finalizeNext = function (key, value) {
          var values = this.values;
          if (!values.has(key)) {
              values.add(key);
              this.destination.next(value);
          }
      };
      return DistinctSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.DistinctSubscriber = DistinctSubscriber;
  
  });
  
  unwrapExports(distinct_1);
  var distinct_2 = distinct_1.distinct;
  var distinct_3 = distinct_1.DistinctSubscriber;
  
  var distinct_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
   *
   * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
   * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
   * source observable directly with an equality check against previous values.
   *
   * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
   *
   * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
   * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
   * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
   * that the internal `Set` can be "flushed", basically clearing it of values.
   *
   * @example <caption>A simple example with numbers</caption>
   * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
   *   .distinct()
   *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
   *
   * @example <caption>An example using a keySelector function</caption>
   * interface Person {
   *    age: number,
   *    name: string
   * }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'})
   *     .distinct((p: Person) => p.name)
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   *
   * @see {@link distinctUntilChanged}
   * @see {@link distinctUntilKeyChanged}
   *
   * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
   * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values.
   * @method distinct
   * @owner Observable
   */
  function distinct(keySelector, flushes) {
      return distinct_1.distinct(keySelector, flushes)(this);
  }
  exports.distinct = distinct;
  
  });
  
  unwrapExports(distinct_2$1);
  var distinct_3$1 = distinct_2$1.distinct;
  
  var distinct$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.distinct = distinct_2$1.distinct;
  
  });
  
  unwrapExports(distinct$2);
  
  var distinctUntilChanged_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
   *
   * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
   *
   * If a comparator function is not provided, an equality check is used by default.
   *
   * @example <caption>A simple example with numbers</caption>
   * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
   *   .distinctUntilChanged()
   *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
   *
   * @example <caption>An example using a compare function</caption>
   * interface Person {
   *    age: number,
   *    name: string
   * }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'})
   *     { age: 6, name: 'Foo'})
   *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo' }
   *
   * @see {@link distinct}
   * @see {@link distinctUntilKeyChanged}
   *
   * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values.
   * @method distinctUntilChanged
   * @owner Observable
   */
  function distinctUntilChanged(compare, keySelector) {
      return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
  }
  exports.distinctUntilChanged = distinctUntilChanged;
  var DistinctUntilChangedOperator = /** @class */ (function () {
      function DistinctUntilChangedOperator(compare, keySelector) {
          this.compare = compare;
          this.keySelector = keySelector;
      }
      DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
      };
      return DistinctUntilChangedOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var DistinctUntilChangedSubscriber = /** @class */ (function (_super) {
      __extends(DistinctUntilChangedSubscriber, _super);
      function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.hasKey = false;
          if (typeof compare === 'function') {
              _this.compare = compare;
          }
          return _this;
      }
      DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
          return x === y;
      };
      DistinctUntilChangedSubscriber.prototype._next = function (value) {
          var keySelector = this.keySelector;
          var key = value;
          if (keySelector) {
              key = tryCatch_1.tryCatch(this.keySelector)(value);
              if (key === errorObject.errorObject) {
                  return this.destination.error(errorObject.errorObject.e);
              }
          }
          var result = false;
          if (this.hasKey) {
              result = tryCatch_1.tryCatch(this.compare)(this.key, key);
              if (result === errorObject.errorObject) {
                  return this.destination.error(errorObject.errorObject.e);
              }
          }
          else {
              this.hasKey = true;
          }
          if (Boolean(result) === false) {
              this.key = key;
              this.destination.next(value);
          }
      };
      return DistinctUntilChangedSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(distinctUntilChanged_1);
  var distinctUntilChanged_2 = distinctUntilChanged_1.distinctUntilChanged;
  
  var distinctUntilChanged_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
   *
   * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
   *
   * If a comparator function is not provided, an equality check is used by default.
   *
   * @example <caption>A simple example with numbers</caption>
   * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
   *   .distinctUntilChanged()
   *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
   *
   * @example <caption>An example using a compare function</caption>
   * interface Person {
   *    age: number,
   *    name: string
   * }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'})
   *     { age: 6, name: 'Foo'})
   *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo' }
   *
   * @see {@link distinct}
   * @see {@link distinctUntilKeyChanged}
   *
   * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values.
   * @method distinctUntilChanged
   * @owner Observable
   */
  function distinctUntilChanged(compare, keySelector) {
      return distinctUntilChanged_1.distinctUntilChanged(compare, keySelector)(this);
  }
  exports.distinctUntilChanged = distinctUntilChanged;
  
  });
  
  unwrapExports(distinctUntilChanged_2$1);
  var distinctUntilChanged_3 = distinctUntilChanged_2$1.distinctUntilChanged;
  
  var distinctUntilChanged$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_2$1.distinctUntilChanged;
  
  });
  
  unwrapExports(distinctUntilChanged$2);
  
  var distinctUntilKeyChanged_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
   * using a property accessed by using the key provided to check if the two items are distinct.
   *
   * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
   *
   * If a comparator function is not provided, an equality check is used by default.
   *
   * @example <caption>An example comparing the name of persons</caption>
   *
   *  interface Person {
   *     age: number,
   *     name: string
   *  }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'},
   *     { age: 6, name: 'Foo'})
   *     .distinctUntilKeyChanged('name')
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo' }
   *
   * @example <caption>An example comparing the first letters of the name</caption>
   *
   * interface Person {
   *     age: number,
   *     name: string
   *  }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo1'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo2'},
   *     { age: 6, name: 'Foo3'})
   *     .distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo1' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo2' }
   *
   * @see {@link distinct}
   * @see {@link distinctUntilChanged}
   *
   * @param {string} key String key for object property lookup on each item.
   * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
   * @method distinctUntilKeyChanged
   * @owner Observable
   */
  function distinctUntilKeyChanged(key, compare) {
      return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
  }
  exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
  
  });
  
  unwrapExports(distinctUntilKeyChanged_1);
  var distinctUntilKeyChanged_2 = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
  
  var distinctUntilKeyChanged_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
   * using a property accessed by using the key provided to check if the two items are distinct.
   *
   * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
   *
   * If a comparator function is not provided, an equality check is used by default.
   *
   * @example <caption>An example comparing the name of persons</caption>
   *
   *  interface Person {
   *     age: number,
   *     name: string
   *  }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo'},
   *     { age: 6, name: 'Foo'})
   *     .distinctUntilKeyChanged('name')
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo' }
   *
   * @example <caption>An example comparing the first letters of the name</caption>
   *
   * interface Person {
   *     age: number,
   *     name: string
   *  }
   *
   * Observable.of<Person>(
   *     { age: 4, name: 'Foo1'},
   *     { age: 7, name: 'Bar'},
   *     { age: 5, name: 'Foo2'},
   *     { age: 6, name: 'Foo3'})
   *     .distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
   *     .subscribe(x => console.log(x));
   *
   * // displays:
   * // { age: 4, name: 'Foo1' }
   * // { age: 7, name: 'Bar' }
   * // { age: 5, name: 'Foo2' }
   *
   * @see {@link distinct}
   * @see {@link distinctUntilChanged}
   *
   * @param {string} key String key for object property lookup on each item.
   * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
   * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
   * @method distinctUntilKeyChanged
   * @owner Observable
   */
  function distinctUntilKeyChanged(key, compare) {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged(key, compare)(this);
  }
  exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
  
  });
  
  unwrapExports(distinctUntilKeyChanged_2$1);
  var distinctUntilKeyChanged_3 = distinctUntilKeyChanged_2$1.distinctUntilKeyChanged;
  
  var distinctUntilKeyChanged$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged_2$1.distinctUntilKeyChanged;
  
  });
  
  unwrapExports(distinctUntilKeyChanged$2);
  
  var tap_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Perform a side effect for every emission on the source Observable, but return
   * an Observable that is identical to the source.
   *
   * <span class="informal">Intercepts each emission on the source and runs a
   * function, but returns an output which is identical to the source as long as errors don't occur.</span>
   *
   * <img src="./img/do.png" width="100%">
   *
   * Returns a mirrored Observable of the source Observable, but modified so that
   * the provided Observer is called to perform a side effect for every value,
   * error, and completion emitted by the source. Any errors that are thrown in
   * the aforementioned Observer or handlers are safely sent down the error path
   * of the output Observable.
   *
   * This operator is useful for debugging your Observables for the correct values
   * or performing other side effects.
   *
   * Note: this is different to a `subscribe` on the Observable. If the Observable
   * returned by `do` is not subscribed, the side effects specified by the
   * Observer will never happen. `do` therefore simply spies on existing
   * execution, it does not trigger an execution to happen like `subscribe` does.
   *
   * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var positions = clicks
   *   .do(ev => console.log(ev))
   *   .map(ev => ev.clientX);
   * positions.subscribe(x => console.log(x));
   *
   * @see {@link map}
   * @see {@link subscribe}
   *
   * @param {Observer|function} [nextOrObserver] A normal Observer object or a
   * callback for `next`.
   * @param {function} [error] Callback for errors in the source.
   * @param {function} [complete] Callback for the completion of the source.
   * @return {Observable} An Observable identical to the source, but runs the
   * specified Observer or callback(s) for each item.
   * @name tap
   */
  function tap(nextOrObserver, error, complete) {
      return function tapOperatorFunction(source) {
          return source.lift(new DoOperator(nextOrObserver, error, complete));
      };
  }
  exports.tap = tap;
  var DoOperator = /** @class */ (function () {
      function DoOperator(nextOrObserver, error, complete) {
          this.nextOrObserver = nextOrObserver;
          this.error = error;
          this.complete = complete;
      }
      DoOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
      };
      return DoOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TapSubscriber = /** @class */ (function (_super) {
      __extends(TapSubscriber, _super);
      function TapSubscriber(destination, observerOrNext, error, complete) {
          var _this = _super.call(this, destination) || this;
          _this._tapNext = noop_1.noop;
          _this._tapError = noop_1.noop;
          _this._tapComplete = noop_1.noop;
          _this._tapError = error || noop_1.noop;
          _this._tapComplete = complete || noop_1.noop;
          if (isFunction_1.isFunction(observerOrNext)) {
              _this._context = _this;
              _this._tapNext = observerOrNext;
          }
          else if (observerOrNext) {
              _this._context = observerOrNext;
              _this._tapNext = observerOrNext.next || noop_1.noop;
              _this._tapError = observerOrNext.error || noop_1.noop;
              _this._tapComplete = observerOrNext.complete || noop_1.noop;
          }
          return _this;
      }
      TapSubscriber.prototype._next = function (value) {
          try {
              this._tapNext.call(this._context, value);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(value);
      };
      TapSubscriber.prototype._error = function (err) {
          try {
              this._tapError.call(this._context, err);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.error(err);
      };
      TapSubscriber.prototype._complete = function () {
          try {
              this._tapComplete.call(this._context);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          return this.destination.complete();
      };
      return TapSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(tap_1);
  var tap_2 = tap_1.tap;
  
  var _do_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Perform a side effect for every emission on the source Observable, but return
   * an Observable that is identical to the source.
   *
   * <span class="informal">Intercepts each emission on the source and runs a
   * function, but returns an output which is identical to the source as long as errors don't occur.</span>
   *
   * <img src="./img/do.png" width="100%">
   *
   * Returns a mirrored Observable of the source Observable, but modified so that
   * the provided Observer is called to perform a side effect for every value,
   * error, and completion emitted by the source. Any errors that are thrown in
   * the aforementioned Observer or handlers are safely sent down the error path
   * of the output Observable.
   *
   * This operator is useful for debugging your Observables for the correct values
   * or performing other side effects.
   *
   * Note: this is different to a `subscribe` on the Observable. If the Observable
   * returned by `do` is not subscribed, the side effects specified by the
   * Observer will never happen. `do` therefore simply spies on existing
   * execution, it does not trigger an execution to happen like `subscribe` does.
   *
   * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var positions = clicks
   *   .do(ev => console.log(ev))
   *   .map(ev => ev.clientX);
   * positions.subscribe(x => console.log(x));
   *
   * @see {@link map}
   * @see {@link subscribe}
   *
   * @param {Observer|function} [nextOrObserver] A normal Observer object or a
   * callback for `next`.
   * @param {function} [error] Callback for errors in the source.
   * @param {function} [complete] Callback for the completion of the source.
   * @return {Observable} An Observable identical to the source, but runs the
   * specified Observer or callback(s) for each item.
   * @method do
   * @name do
   * @owner Observable
   */
  function _do(nextOrObserver, error, complete) {
      return tap_1.tap(nextOrObserver, error, complete)(this);
  }
  exports._do = _do;
  
  });
  
  unwrapExports(_do_1);
  var _do_2 = _do_1._do;
  
  var _do$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.do = _do_1._do;
  Observable_1.Observable.prototype._do = _do_1._do;
  
  });
  
  unwrapExports(_do$1);
  
  var exhaust_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Converts a higher-order Observable into a first-order Observable by dropping
   * inner Observables while the previous inner Observable has not yet completed.
   *
   * <span class="informal">Flattens an Observable-of-Observables by dropping the
   * next inner Observables while the current inner is still executing.</span>
   *
   * <img src="./img/exhaust.png" width="100%">
   *
   * `exhaust` subscribes to an Observable that emits Observables, also known as a
   * higher-order Observable. Each time it observes one of these emitted inner
   * Observables, the output Observable begins emitting the items emitted by that
   * inner Observable. So far, it behaves like {@link mergeAll}. However,
   * `exhaust` ignores every new inner Observable if the previous Observable has
   * not yet completed. Once that one completes, it will accept and flatten the
   * next inner Observable and repeat this process.
   *
   * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(5));
   * var result = higherOrder.exhaust();
   * result.subscribe(x => console.log(x));
   *
   * @see {@link combineAll}
   * @see {@link concatAll}
   * @see {@link switch}
   * @see {@link mergeAll}
   * @see {@link exhaustMap}
   * @see {@link zipAll}
   *
   * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
   * exclusively until it completes before subscribing to the next.
   * @method exhaust
   * @owner Observable
   */
  function exhaust() {
      return function (source) { return source.lift(new SwitchFirstOperator()); };
  }
  exports.exhaust = exhaust;
  var SwitchFirstOperator = /** @class */ (function () {
      function SwitchFirstOperator() {
      }
      SwitchFirstOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SwitchFirstSubscriber(subscriber));
      };
      return SwitchFirstOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SwitchFirstSubscriber = /** @class */ (function (_super) {
      __extends(SwitchFirstSubscriber, _super);
      function SwitchFirstSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasCompleted = false;
          _this.hasSubscription = false;
          return _this;
      }
      SwitchFirstSubscriber.prototype._next = function (value) {
          if (!this.hasSubscription) {
              this.hasSubscription = true;
              this.add(subscribeToResult_1.subscribeToResult(this, value));
          }
      };
      SwitchFirstSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (!this.hasSubscription) {
              this.destination.complete();
          }
      };
      SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
          this.remove(innerSub);
          this.hasSubscription = false;
          if (this.hasCompleted) {
              this.destination.complete();
          }
      };
      return SwitchFirstSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(exhaust_1);
  var exhaust_2 = exhaust_1.exhaust;
  
  var exhaust_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts a higher-order Observable into a first-order Observable by dropping
   * inner Observables while the previous inner Observable has not yet completed.
   *
   * <span class="informal">Flattens an Observable-of-Observables by dropping the
   * next inner Observables while the current inner is still executing.</span>
   *
   * <img src="./img/exhaust.png" width="100%">
   *
   * `exhaust` subscribes to an Observable that emits Observables, also known as a
   * higher-order Observable. Each time it observes one of these emitted inner
   * Observables, the output Observable begins emitting the items emitted by that
   * inner Observable. So far, it behaves like {@link mergeAll}. However,
   * `exhaust` ignores every new inner Observable if the previous Observable has
   * not yet completed. Once that one completes, it will accept and flatten the
   * next inner Observable and repeat this process.
   *
   * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(5));
   * var result = higherOrder.exhaust();
   * result.subscribe(x => console.log(x));
   *
   * @see {@link combineAll}
   * @see {@link concatAll}
   * @see {@link switch}
   * @see {@link mergeAll}
   * @see {@link exhaustMap}
   * @see {@link zipAll}
   *
   * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
   * exclusively until it completes before subscribing to the next.
   * @method exhaust
   * @owner Observable
   */
  function exhaust() {
      return exhaust_1.exhaust()(this);
  }
  exports.exhaust = exhaust;
  
  });
  
  unwrapExports(exhaust_2$1);
  var exhaust_3 = exhaust_2$1.exhaust;
  
  var exhaust$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.exhaust = exhaust_2$1.exhaust;
  
  });
  
  unwrapExports(exhaust$2);
  
  var exhaustMap_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable only if the previous projected Observable has completed.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link exhaust}.</span>
   *
   * <img src="./img/exhaustMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. When it projects a source value to
   * an Observable, the output Observable begins emitting the items emitted by
   * that projected Observable. However, `exhaustMap` ignores every new projected
   * Observable if the previous projected Observable has not yet completed. Once
   * that one completes, it will accept and flatten the next projected Observable
   * and repeat this process.
   *
   * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000).take(5));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMap}
   * @see {@link exhaust}
   * @see {@link mergeMap}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable containing projected Observables
   * of each item of the source, ignoring projected Observables that start before
   * their preceding Observable has completed.
   * @method exhaustMap
   * @owner Observable
   */
  function exhaustMap(project, resultSelector) {
      return function (source) { return source.lift(new SwitchFirstMapOperator(project, resultSelector)); };
  }
  exports.exhaustMap = exhaustMap;
  var SwitchFirstMapOperator = /** @class */ (function () {
      function SwitchFirstMapOperator(project, resultSelector) {
          this.project = project;
          this.resultSelector = resultSelector;
      }
      SwitchFirstMapOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
      };
      return SwitchFirstMapOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SwitchFirstMapSubscriber = /** @class */ (function (_super) {
      __extends(SwitchFirstMapSubscriber, _super);
      function SwitchFirstMapSubscriber(destination, project, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.resultSelector = resultSelector;
          _this.hasSubscription = false;
          _this.hasCompleted = false;
          _this.index = 0;
          return _this;
      }
      SwitchFirstMapSubscriber.prototype._next = function (value) {
          if (!this.hasSubscription) {
              this.tryNext(value);
          }
      };
      SwitchFirstMapSubscriber.prototype.tryNext = function (value) {
          var index = this.index++;
          var destination = this.destination;
          try {
              var result = this.project(value, index);
              this.hasSubscription = true;
              this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
          }
          catch (err) {
              destination.error(err);
          }
      };
      SwitchFirstMapSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (!this.hasSubscription) {
              this.destination.complete();
          }
      };
      SwitchFirstMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          if (resultSelector) {
              this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
          }
          else {
              destination.next(innerValue);
          }
      };
      SwitchFirstMapSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          try {
              var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
              destination.next(result);
          }
          catch (err) {
              destination.error(err);
          }
      };
      SwitchFirstMapSubscriber.prototype.notifyError = function (err) {
          this.destination.error(err);
      };
      SwitchFirstMapSubscriber.prototype.notifyComplete = function (innerSub) {
          this.remove(innerSub);
          this.hasSubscription = false;
          if (this.hasCompleted) {
              this.destination.complete();
          }
      };
      return SwitchFirstMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(exhaustMap_1);
  var exhaustMap_2 = exhaustMap_1.exhaustMap;
  
  var exhaustMap_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable only if the previous projected Observable has completed.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link exhaust}.</span>
   *
   * <img src="./img/exhaustMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. When it projects a source value to
   * an Observable, the output Observable begins emitting the items emitted by
   * that projected Observable. However, `exhaustMap` ignores every new projected
   * Observable if the previous projected Observable has not yet completed. Once
   * that one completes, it will accept and flatten the next projected Observable
   * and repeat this process.
   *
   * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000).take(5));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMap}
   * @see {@link exhaust}
   * @see {@link mergeMap}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable containing projected Observables
   * of each item of the source, ignoring projected Observables that start before
   * their preceding Observable has completed.
   * @method exhaustMap
   * @owner Observable
   */
  function exhaustMap(project, resultSelector) {
      return exhaustMap_1.exhaustMap(project, resultSelector)(this);
  }
  exports.exhaustMap = exhaustMap;
  
  });
  
  unwrapExports(exhaustMap_2$1);
  var exhaustMap_3 = exhaustMap_2$1.exhaustMap;
  
  var exhaustMap$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.exhaustMap = exhaustMap_2$1.exhaustMap;
  
  });
  
  unwrapExports(exhaustMap$2);
  
  var expand_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Recursively projects each source value to an Observable which is merged in
   * the output Observable.
   *
   * <span class="informal">It's similar to {@link mergeMap}, but applies the
   * projection function to every source value as well as every output value.
   * It's recursive.</span>
   *
   * <img src="./img/expand.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an Observable, and then merging those resulting Observables and
   * emitting the results of this merger. *Expand* will re-emit on the output
   * Observable every source value. Then, each output value is given to the
   * `project` function which returns an inner Observable to be merged on the
   * output Observable. Those output values resulting from the projection are also
   * given to the `project` function to produce new output values. This is how
   * *expand* behaves recursively.
   *
   * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var powersOfTwo = clicks
   *   .mapTo(1)
   *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
   *   .take(10);
   * powersOfTwo.subscribe(x => console.log(x));
   *
   * @see {@link mergeMap}
   * @see {@link mergeScan}
   *
   * @param {function(value: T, index: number) => Observable} project A function
   * that, when applied to an item emitted by the source or the output Observable,
   * returns an Observable.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
   * each projected inner Observable.
   * @return {Observable} An Observable that emits the source values and also
   * result of applying the projection function to each value emitted on the
   * output Observable and and merging the results of the Observables obtained
   * from this transformation.
   * @method expand
   * @owner Observable
   */
  function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      if (scheduler === void 0) { scheduler = undefined; }
      concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
      return function (source) { return source.lift(new ExpandOperator(project, concurrent, scheduler)); };
  }
  exports.expand = expand;
  var ExpandOperator = /** @class */ (function () {
      function ExpandOperator(project, concurrent, scheduler) {
          this.project = project;
          this.concurrent = concurrent;
          this.scheduler = scheduler;
      }
      ExpandOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
      };
      return ExpandOperator;
  }());
  exports.ExpandOperator = ExpandOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ExpandSubscriber = /** @class */ (function (_super) {
      __extends(ExpandSubscriber, _super);
      function ExpandSubscriber(destination, project, concurrent, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.concurrent = concurrent;
          _this.scheduler = scheduler;
          _this.index = 0;
          _this.active = 0;
          _this.hasCompleted = false;
          if (concurrent < Number.POSITIVE_INFINITY) {
              _this.buffer = [];
          }
          return _this;
      }
      ExpandSubscriber.dispatch = function (arg) {
          var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
          subscriber.subscribeToProjection(result, value, index);
      };
      ExpandSubscriber.prototype._next = function (value) {
          var destination = this.destination;
          if (destination.closed) {
              this._complete();
              return;
          }
          var index = this.index++;
          if (this.active < this.concurrent) {
              destination.next(value);
              var result = tryCatch_1.tryCatch(this.project)(value, index);
              if (result === errorObject.errorObject) {
                  destination.error(errorObject.errorObject.e);
              }
              else if (!this.scheduler) {
                  this.subscribeToProjection(result, value, index);
              }
              else {
                  var state = { subscriber: this, result: result, value: value, index: index };
                  this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
              }
          }
          else {
              this.buffer.push(value);
          }
      };
      ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
          this.active++;
          this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
      };
      ExpandSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.hasCompleted && this.active === 0) {
              this.destination.complete();
          }
      };
      ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this._next(innerValue);
      };
      ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer && buffer.length > 0) {
              this._next(buffer.shift());
          }
          if (this.hasCompleted && this.active === 0) {
              this.destination.complete();
          }
      };
      return ExpandSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.ExpandSubscriber = ExpandSubscriber;
  
  });
  
  unwrapExports(expand_1);
  var expand_2 = expand_1.expand;
  var expand_3 = expand_1.ExpandOperator;
  var expand_4 = expand_1.ExpandSubscriber;
  
  var expand_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Recursively projects each source value to an Observable which is merged in
   * the output Observable.
   *
   * <span class="informal">It's similar to {@link mergeMap}, but applies the
   * projection function to every source value as well as every output value.
   * It's recursive.</span>
   *
   * <img src="./img/expand.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an Observable, and then merging those resulting Observables and
   * emitting the results of this merger. *Expand* will re-emit on the output
   * Observable every source value. Then, each output value is given to the
   * `project` function which returns an inner Observable to be merged on the
   * output Observable. Those output values resulting from the projection are also
   * given to the `project` function to produce new output values. This is how
   * *expand* behaves recursively.
   *
   * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var powersOfTwo = clicks
   *   .mapTo(1)
   *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
   *   .take(10);
   * powersOfTwo.subscribe(x => console.log(x));
   *
   * @see {@link mergeMap}
   * @see {@link mergeScan}
   *
   * @param {function(value: T, index: number) => Observable} project A function
   * that, when applied to an item emitted by the source or the output Observable,
   * returns an Observable.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
   * each projected inner Observable.
   * @return {Observable} An Observable that emits the source values and also
   * result of applying the projection function to each value emitted on the
   * output Observable and and merging the results of the Observables obtained
   * from this transformation.
   * @method expand
   * @owner Observable
   */
  function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      if (scheduler === void 0) { scheduler = undefined; }
      concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
      return expand_1.expand(project, concurrent, scheduler)(this);
  }
  exports.expand = expand;
  
  });
  
  unwrapExports(expand_2$1);
  var expand_3$1 = expand_2$1.expand;
  
  var expand$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.expand = expand_2$1.expand;
  
  });
  
  unwrapExports(expand$2);
  
  var ArgumentOutOfRangeError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An error thrown when an element was queried at a certain index of an
   * Observable, but no such index or position exists in that sequence.
   *
   * @see {@link elementAt}
   * @see {@link take}
   * @see {@link takeLast}
   *
   * @class ArgumentOutOfRangeError
   */
  var ArgumentOutOfRangeError = /** @class */ (function (_super) {
      __extends(ArgumentOutOfRangeError, _super);
      function ArgumentOutOfRangeError() {
          var _this = _super.call(this, 'argument out of range') || this;
          _this.name = 'ArgumentOutOfRangeError';
          Object.setPrototypeOf(_this, ArgumentOutOfRangeError.prototype);
          return _this;
      }
      return ArgumentOutOfRangeError;
  }(Error));
  exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
  
  });
  
  unwrapExports(ArgumentOutOfRangeError_1);
  var ArgumentOutOfRangeError_2 = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
  
  var elementAt_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits the single value at the specified `index` in a sequence of emissions
   * from the source Observable.
   *
   * <span class="informal">Emits only the i-th value, then completes.</span>
   *
   * <img src="./img/elementAt.png" width="100%">
   *
   * `elementAt` returns an Observable that emits the item at the specified
   * `index` in the source Observable, or a default value if that `index` is out
   * of range and the `default` argument is provided. If the `default` argument is
   * not given and the `index` is out of range, the output Observable will emit an
   * `ArgumentOutOfRangeError` error.
   *
   * @example <caption>Emit only the third click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.elementAt(2);
   * result.subscribe(x => console.log(x));
   *
   * // Results in:
   * // click 1 = nothing
   * // click 2 = nothing
   * // click 3 = MouseEvent object logged to console
   *
   * @see {@link first}
   * @see {@link last}
   * @see {@link skip}
   * @see {@link single}
   * @see {@link take}
   *
   * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
   * Observable has completed before emitting the i-th `next` notification.
   *
   * @param {number} index Is the number `i` for the i-th source emission that has
   * happened since the subscription, starting from the number `0`.
   * @param {T} [defaultValue] The default value returned for missing indices.
   * @return {Observable} An Observable that emits a single item, if it is found.
   * Otherwise, will emit the default value if given. If not, then emits an error.
   * @method elementAt
   * @owner Observable
   */
  function elementAt(index, defaultValue) {
      return function (source) { return source.lift(new ElementAtOperator(index, defaultValue)); };
  }
  exports.elementAt = elementAt;
  var ElementAtOperator = /** @class */ (function () {
      function ElementAtOperator(index, defaultValue) {
          this.index = index;
          this.defaultValue = defaultValue;
          if (index < 0) {
              throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
          }
      }
      ElementAtOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
      };
      return ElementAtOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ElementAtSubscriber = /** @class */ (function (_super) {
      __extends(ElementAtSubscriber, _super);
      function ElementAtSubscriber(destination, index, defaultValue) {
          var _this = _super.call(this, destination) || this;
          _this.index = index;
          _this.defaultValue = defaultValue;
          return _this;
      }
      ElementAtSubscriber.prototype._next = function (x) {
          if (this.index-- === 0) {
              this.destination.next(x);
              this.destination.complete();
          }
      };
      ElementAtSubscriber.prototype._complete = function () {
          var destination = this.destination;
          if (this.index >= 0) {
              if (typeof this.defaultValue !== 'undefined') {
                  destination.next(this.defaultValue);
              }
              else {
                  destination.error(new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError);
              }
          }
          destination.complete();
      };
      return ElementAtSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(elementAt_1);
  var elementAt_2 = elementAt_1.elementAt;
  
  var elementAt_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits the single value at the specified `index` in a sequence of emissions
   * from the source Observable.
   *
   * <span class="informal">Emits only the i-th value, then completes.</span>
   *
   * <img src="./img/elementAt.png" width="100%">
   *
   * `elementAt` returns an Observable that emits the item at the specified
   * `index` in the source Observable, or a default value if that `index` is out
   * of range and the `default` argument is provided. If the `default` argument is
   * not given and the `index` is out of range, the output Observable will emit an
   * `ArgumentOutOfRangeError` error.
   *
   * @example <caption>Emit only the third click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.elementAt(2);
   * result.subscribe(x => console.log(x));
   *
   * // Results in:
   * // click 1 = nothing
   * // click 2 = nothing
   * // click 3 = MouseEvent object logged to console
   *
   * @see {@link first}
   * @see {@link last}
   * @see {@link skip}
   * @see {@link single}
   * @see {@link take}
   *
   * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
   * Observable has completed before emitting the i-th `next` notification.
   *
   * @param {number} index Is the number `i` for the i-th source emission that has
   * happened since the subscription, starting from the number `0`.
   * @param {T} [defaultValue] The default value returned for missing indices.
   * @return {Observable} An Observable that emits a single item, if it is found.
   * Otherwise, will emit the default value if given. If not, then emits an error.
   * @method elementAt
   * @owner Observable
   */
  function elementAt(index, defaultValue) {
      return elementAt_1.elementAt(index, defaultValue)(this);
  }
  exports.elementAt = elementAt;
  
  });
  
  unwrapExports(elementAt_2$1);
  var elementAt_3 = elementAt_2$1.elementAt;
  
  var elementAt$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.elementAt = elementAt_2$1.elementAt;
  
  });
  
  unwrapExports(elementAt$2);
  
  var filter_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Filter items emitted by the source Observable by only emitting those that
   * satisfy a specified predicate.
   *
   * <span class="informal">Like
   * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
   * it only emits a value from the source if it passes a criterion function.</span>
   *
   * <img src="./img/filter.png" width="100%">
   *
   * Similar to the well-known `Array.prototype.filter` method, this operator
   * takes values from the source Observable, passes them through a `predicate`
   * function and only emits those values that yielded `true`.
   *
   * @example <caption>Emit only click events whose target was a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
   * clicksOnDivs.subscribe(x => console.log(x));
   *
   * @see {@link distinct}
   * @see {@link distinctUntilChanged}
   * @see {@link distinctUntilKeyChanged}
   * @see {@link ignoreElements}
   * @see {@link partition}
   * @see {@link skip}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates each value emitted by the source Observable. If it returns `true`,
   * the value is emitted, if `false` the value is not passed to the output
   * Observable. The `index` parameter is the number `i` for the i-th source
   * emission that has happened since the subscription, starting from the number
   * `0`.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable} An Observable of values from the source that were
   * allowed by the `predicate` function.
   * @method filter
   * @owner Observable
   */
  function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
          return source.lift(new FilterOperator(predicate, thisArg));
      };
  }
  exports.filter = filter;
  var FilterOperator = /** @class */ (function () {
      function FilterOperator(predicate, thisArg) {
          this.predicate = predicate;
          this.thisArg = thisArg;
      }
      FilterOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
      };
      return FilterOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var FilterSubscriber = /** @class */ (function (_super) {
      __extends(FilterSubscriber, _super);
      function FilterSubscriber(destination, predicate, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.count = 0;
          return _this;
      }
      // the try catch block below is left specifically for
      // optimization and perf reasons. a tryCatcher is not necessary here.
      FilterSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.predicate.call(this.thisArg, value, this.count++);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              this.destination.next(value);
          }
      };
      return FilterSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(filter_1);
  var filter_2 = filter_1.filter;
  
  var filter_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Filter items emitted by the source Observable by only emitting those that
   * satisfy a specified predicate.
   *
   * <span class="informal">Like
   * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
   * it only emits a value from the source if it passes a criterion function.</span>
   *
   * <img src="./img/filter.png" width="100%">
   *
   * Similar to the well-known `Array.prototype.filter` method, this operator
   * takes values from the source Observable, passes them through a `predicate`
   * function and only emits those values that yielded `true`.
   *
   * @example <caption>Emit only click events whose target was a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
   * clicksOnDivs.subscribe(x => console.log(x));
   *
   * @see {@link distinct}
   * @see {@link distinctUntilChanged}
   * @see {@link distinctUntilKeyChanged}
   * @see {@link ignoreElements}
   * @see {@link partition}
   * @see {@link skip}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates each value emitted by the source Observable. If it returns `true`,
   * the value is emitted, if `false` the value is not passed to the output
   * Observable. The `index` parameter is the number `i` for the i-th source
   * emission that has happened since the subscription, starting from the number
   * `0`.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable} An Observable of values from the source that were
   * allowed by the `predicate` function.
   * @method filter
   * @owner Observable
   */
  function filter(predicate, thisArg) {
      return filter_1.filter(predicate, thisArg)(this);
  }
  exports.filter = filter;
  
  });
  
  unwrapExports(filter_2$1);
  var filter_3 = filter_2$1.filter;
  
  var filter$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.filter = filter_2$1.filter;
  
  });
  
  unwrapExports(filter$2);
  
  var finalize_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Returns an Observable that mirrors the source Observable, but will call a specified function when
   * the source terminates on complete or error.
   * @param {function} callback Function to be called when source terminates.
   * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
   * @method finally
   * @owner Observable
   */
  function finalize(callback) {
      return function (source) { return source.lift(new FinallyOperator(callback)); };
  }
  exports.finalize = finalize;
  var FinallyOperator = /** @class */ (function () {
      function FinallyOperator(callback) {
          this.callback = callback;
      }
      FinallyOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new FinallySubscriber(subscriber, this.callback));
      };
      return FinallyOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var FinallySubscriber = /** @class */ (function (_super) {
      __extends(FinallySubscriber, _super);
      function FinallySubscriber(destination, callback) {
          var _this = _super.call(this, destination) || this;
          _this.add(new Subscription_1.Subscription(callback));
          return _this;
      }
      return FinallySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(finalize_1);
  var finalize_2 = finalize_1.finalize;
  
  var _finally_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that mirrors the source Observable, but will call a specified function when
   * the source terminates on complete, error or unsubscribe.
   *
   * <span class="informal">Ensure a given function will be called when a stream ends, no matter why it ended.</span>
   *
   * `finally` method accepts as a single parameter a function. This function does not accept any parameters and
   * should not return anything. It will be called whenever source Observable completes, errors or is unsubscribed,
   * which makes it good candidate to perform any necessary clean up or side effects when Observable terminates,
   * no matter how or why it terminated.
   *
   * Observable returned by `finally` will simply mirror source Observable - each time it is subscribed, source
   * Observable will be subscribed underneath.
   *
   * Note that behavior of `finally` will be repeated per every subscription, so if resulting Observable has
   * many subscribers, function passed to `finally` might be potentially called multiple times.
   *
   * Remember also that `finally` differs quite a lot from passing complete or error handler to {@link subscribe}. It will
   * return an Observable which can be further chained, while `subscribe` returns Subscription, basically ending Observable
   * chain. Function passed to `finally` will be called also when consumer of resulting Observable unsubscribes from it,
   * while handlers passed to `subscribe` will not (even complete handler). But most importantly, `finally` does not start
   * an execution of source Observable, like `subscribe` does, allowing you to set up all necessary hooks before
   * passing Observable further, even without specific knowledge how or when it will be used.
   *
   *
   * @example <caption>Call finally after complete notification</caption>
   * Rx.Observable.of(1, 2, 3)
   * .finally(() => console.log('I was finalized!'))
   * .map(x => x * 2) // `finally` returns an Observable, so we still can chain operators.
   * .subscribe(
   *   val => console.log(val),
   *   err => {},
   *   () => console.log('I completed!')
   * );
   *
   * // Logs:
   * // 1
   * // 2
   * // 3
   * // "I completed!"
   * // "I was finalized!"
   *
   *
   *
   * @example <caption>Call finally after consumer unsubscribes</caption>
   * const o = Rx.Observable.interval(1000)
   * .finally(() => console.log('Timer stopped'));
   *
   * const subscription = o.subscribe(
   *   val => console.log(val),
   *   err => {},
   *   () => console.log('Complete!') // Will not be called, since complete handler
   * );                               // does not react to unsubscription, just to
   *                                  // complete notification sent by the Observable itself.
   *
   * setTimeout(() => subscription.unsubscribe(), 2500);
   *
   * // Logs:
   * // 0 after 1s
   * // 1 after 2s
   * // "Timer stopped" after 2.5s
   *
   * @see {@link using}
   *
   * @param {function} callback Function to be called when source terminates (completes, errors or is unsubscribed).
   * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
   * @method finally
   * @name finally
   * @owner Observable
   */
  function _finally(callback) {
      return finalize_1.finalize(callback)(this);
  }
  exports._finally = _finally;
  
  });
  
  unwrapExports(_finally_1);
  var _finally_2 = _finally_1._finally;
  
  var _finally$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.finally = _finally_1._finally;
  Observable_1.Observable.prototype._finally = _finally_1._finally;
  
  });
  
  unwrapExports(_finally$1);
  
  var find_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the first value emitted by the source Observable that meets some
   * condition.
   *
   * <span class="informal">Finds the first value that passes some test and emits
   * that.</span>
   *
   * <img src="./img/find.png" width="100%">
   *
   * `find` searches for the first item in the source Observable that matches the
   * specified condition embodied by the `predicate`, and returns the first
   * occurrence in the source. Unlike {@link first}, the `predicate` is required
   * in `find`, and does not emit an error if a valid value is not found.
   *
   * @example <caption>Find and emit the first click that happens on a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.find(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link first}
   * @see {@link findIndex}
   * @see {@link take}
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
   * A function called with each item to test for condition matching.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable<T>} An Observable of the first item that matches the
   * condition.
   * @method find
   * @owner Observable
   */
  function find(predicate, thisArg) {
      if (typeof predicate !== 'function') {
          throw new TypeError('predicate is not a function');
      }
      return function (source) { return source.lift(new FindValueOperator(predicate, source, false, thisArg)); };
  }
  exports.find = find;
  var FindValueOperator = /** @class */ (function () {
      function FindValueOperator(predicate, source, yieldIndex, thisArg) {
          this.predicate = predicate;
          this.source = source;
          this.yieldIndex = yieldIndex;
          this.thisArg = thisArg;
      }
      FindValueOperator.prototype.call = function (observer, source) {
          return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
      };
      return FindValueOperator;
  }());
  exports.FindValueOperator = FindValueOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var FindValueSubscriber = /** @class */ (function (_super) {
      __extends(FindValueSubscriber, _super);
      function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.yieldIndex = yieldIndex;
          _this.thisArg = thisArg;
          _this.index = 0;
          return _this;
      }
      FindValueSubscriber.prototype.notifyComplete = function (value) {
          var destination = this.destination;
          destination.next(value);
          destination.complete();
      };
      FindValueSubscriber.prototype._next = function (value) {
          var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
          var index = this.index++;
          try {
              var result = predicate.call(thisArg || this, value, index, this.source);
              if (result) {
                  this.notifyComplete(this.yieldIndex ? index : value);
              }
          }
          catch (err) {
              this.destination.error(err);
          }
      };
      FindValueSubscriber.prototype._complete = function () {
          this.notifyComplete(this.yieldIndex ? -1 : undefined);
      };
      return FindValueSubscriber;
  }(Subscriber_1.Subscriber));
  exports.FindValueSubscriber = FindValueSubscriber;
  
  });
  
  unwrapExports(find_1);
  var find_2 = find_1.find;
  var find_3 = find_1.FindValueOperator;
  var find_4 = find_1.FindValueSubscriber;
  
  var find_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Emits only the first value emitted by the source Observable that meets some
   * condition.
   *
   * <span class="informal">Finds the first value that passes some test and emits
   * that.</span>
   *
   * <img src="./img/find.png" width="100%">
   *
   * `find` searches for the first item in the source Observable that matches the
   * specified condition embodied by the `predicate`, and returns the first
   * occurrence in the source. Unlike {@link first}, the `predicate` is required
   * in `find`, and does not emit an error if a valid value is not found.
   *
   * @example <caption>Find and emit the first click that happens on a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.find(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link first}
   * @see {@link findIndex}
   * @see {@link take}
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
   * A function called with each item to test for condition matching.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable<T>} An Observable of the first item that matches the
   * condition.
   * @method find
   * @owner Observable
   */
  function find(predicate, thisArg) {
      return find_1.find(predicate, thisArg)(this);
  }
  exports.find = find;
  
  });
  
  unwrapExports(find_2$1);
  var find_3$1 = find_2$1.find;
  
  var find$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.find = find_2$1.find;
  
  });
  
  unwrapExports(find$2);
  
  var findIndex_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the index of the first value emitted by the source Observable that
   * meets some condition.
   *
   * <span class="informal">It's like {@link find}, but emits the index of the
   * found value, not the value itself.</span>
   *
   * <img src="./img/findIndex.png" width="100%">
   *
   * `findIndex` searches for the first item in the source Observable that matches
   * the specified condition embodied by the `predicate`, and returns the
   * (zero-based) index of the first occurrence in the source. Unlike
   * {@link first}, the `predicate` is required in `findIndex`, and does not emit
   * an error if a valid value is not found.
   *
   * @example <caption>Emit the index of first click that happens on a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link find}
   * @see {@link first}
   * @see {@link take}
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
   * A function called with each item to test for condition matching.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable} An Observable of the index of the first item that
   * matches the condition.
   * @method find
   * @owner Observable
   */
  function findIndex(predicate, thisArg) {
      return function (source) { return source.lift(new find_1.FindValueOperator(predicate, source, true, thisArg)); };
  }
  exports.findIndex = findIndex;
  
  });
  
  unwrapExports(findIndex_1);
  var findIndex_2 = findIndex_1.findIndex;
  
  var findIndex_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the index of the first value emitted by the source Observable that
   * meets some condition.
   *
   * <span class="informal">It's like {@link find}, but emits the index of the
   * found value, not the value itself.</span>
   *
   * <img src="./img/findIndex.png" width="100%">
   *
   * `findIndex` searches for the first item in the source Observable that matches
   * the specified condition embodied by the `predicate`, and returns the
   * (zero-based) index of the first occurrence in the source. Unlike
   * {@link first}, the `predicate` is required in `findIndex`, and does not emit
   * an error if a valid value is not found.
   *
   * @example <caption>Emit the index of first click that happens on a DIV element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link find}
   * @see {@link first}
   * @see {@link take}
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
   * A function called with each item to test for condition matching.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {Observable} An Observable of the index of the first item that
   * matches the condition.
   * @method find
   * @owner Observable
   */
  function findIndex(predicate, thisArg) {
      return findIndex_1.findIndex(predicate, thisArg)(this);
  }
  exports.findIndex = findIndex;
  
  });
  
  unwrapExports(findIndex_2$1);
  var findIndex_3 = findIndex_2$1.findIndex;
  
  var findIndex$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.findIndex = findIndex_2$1.findIndex;
  
  });
  
  unwrapExports(findIndex$2);
  
  var EmptyError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An error thrown when an Observable or a sequence was queried but has no
   * elements.
   *
   * @see {@link first}
   * @see {@link last}
   * @see {@link single}
   *
   * @class EmptyError
   */
  var EmptyError = /** @class */ (function (_super) {
      __extends(EmptyError, _super);
      function EmptyError() {
          var _this = _super.call(this, 'no elements in sequence') || this;
          _this.name = 'EmptyError';
          Object.setPrototypeOf(_this, EmptyError.prototype);
          return _this;
      }
      return EmptyError;
  }(Error));
  exports.EmptyError = EmptyError;
  
  });
  
  unwrapExports(EmptyError_1);
  var EmptyError_2 = EmptyError_1.EmptyError;
  
  var first_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits only the first value (or the first value that meets some condition)
   * emitted by the source Observable.
   *
   * <span class="informal">Emits only the first value. Or emits only the first
   * value that passes some test.</span>
   *
   * <img src="./img/first.png" width="100%">
   *
   * If called with no arguments, `first` emits the first value of the source
   * Observable, then completes. If called with a `predicate` function, `first`
   * emits the first value of the source that matches the specified condition. It
   * may also take a `resultSelector` function to produce the output value from
   * the input value, and a `defaultValue` to emit in case the source completes
   * before it is able to emit a valid value. Throws an error if `defaultValue`
   * was not provided and a matching element is not found.
   *
   * @example <caption>Emit only the first click that happens on the DOM</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.first();
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Emits the first click that happens on a DIV</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.first(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link find}
   * @see {@link take}
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
   * An optional function called with each item to test for condition matching.
   * @param {function(value: T, index: number): R} [resultSelector] A function to
   * produce the value on the output Observable based on the values
   * and the indices of the source Observable. The arguments passed to this
   * function are:
   * - `value`: the value that was emitted on the source.
   * - `index`: the "index" of the value from the source.
   * @param {R} [defaultValue] The default value emitted in case no valid value
   * was found on the source.
   * @return {Observable<T|R>} An Observable of the first item that matches the
   * condition.
   * @method first
   * @owner Observable
   */
  function first(predicate, resultSelector, defaultValue) {
      return function (source) { return source.lift(new FirstOperator(predicate, resultSelector, defaultValue, source)); };
  }
  exports.first = first;
  var FirstOperator = /** @class */ (function () {
      function FirstOperator(predicate, resultSelector, defaultValue, source) {
          this.predicate = predicate;
          this.resultSelector = resultSelector;
          this.defaultValue = defaultValue;
          this.source = source;
      }
      FirstOperator.prototype.call = function (observer, source) {
          return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
      };
      return FirstOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var FirstSubscriber = /** @class */ (function (_super) {
      __extends(FirstSubscriber, _super);
      function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.resultSelector = resultSelector;
          _this.defaultValue = defaultValue;
          _this.source = source;
          _this.index = 0;
          _this.hasCompleted = false;
          _this._emitted = false;
          return _this;
      }
      FirstSubscriber.prototype._next = function (value) {
          var index = this.index++;
          if (this.predicate) {
              this._tryPredicate(value, index);
          }
          else {
              this._emit(value, index);
          }
      };
      FirstSubscriber.prototype._tryPredicate = function (value, index) {
          var result;
          try {
              result = this.predicate(value, index, this.source);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              this._emit(value, index);
          }
      };
      FirstSubscriber.prototype._emit = function (value, index) {
          if (this.resultSelector) {
              this._tryResultSelector(value, index);
              return;
          }
          this._emitFinal(value);
      };
      FirstSubscriber.prototype._tryResultSelector = function (value, index) {
          var result;
          try {
              result = this.resultSelector(value, index);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this._emitFinal(result);
      };
      FirstSubscriber.prototype._emitFinal = function (value) {
          var destination = this.destination;
          if (!this._emitted) {
              this._emitted = true;
              destination.next(value);
              destination.complete();
              this.hasCompleted = true;
          }
      };
      FirstSubscriber.prototype._complete = function () {
          var destination = this.destination;
          if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
              destination.next(this.defaultValue);
              destination.complete();
          }
          else if (!this.hasCompleted) {
              destination.error(new EmptyError_1.EmptyError);
          }
      };
      return FirstSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(first_1);
  var first_2 = first_1.first;
  
  var first_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the first value (or the first value that meets some condition)
   * emitted by the source Observable.
   *
   * <span class="informal">Emits only the first value. Or emits only the first
   * value that passes some test.</span>
   *
   * <img src="./img/first.png" width="100%">
   *
   * If called with no arguments, `first` emits the first value of the source
   * Observable, then completes. If called with a `predicate` function, `first`
   * emits the first value of the source that matches the specified condition. It
   * may also take a `resultSelector` function to produce the output value from
   * the input value, and a `defaultValue` to emit in case the source completes
   * before it is able to emit a valid value. Throws an error if `defaultValue`
   * was not provided and a matching element is not found.
   *
   * @example <caption>Emit only the first click that happens on the DOM</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.first();
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Emits the first click that happens on a DIV</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.first(ev => ev.target.tagName === 'DIV');
   * result.subscribe(x => console.log(x));
   *
   * @see {@link filter}
   * @see {@link find}
   * @see {@link take}
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   *
   * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
   * An optional function called with each item to test for condition matching.
   * @param {function(value: T, index: number): R} [resultSelector] A function to
   * produce the value on the output Observable based on the values
   * and the indices of the source Observable. The arguments passed to this
   * function are:
   * - `value`: the value that was emitted on the source.
   * - `index`: the "index" of the value from the source.
   * @param {R} [defaultValue] The default value emitted in case no valid value
   * was found on the source.
   * @return {Observable<T|R>} An Observable of the first item that matches the
   * condition.
   * @method first
   * @owner Observable
   */
  function first(predicate, resultSelector, defaultValue) {
      return first_1.first(predicate, resultSelector, defaultValue)(this);
  }
  exports.first = first;
  
  });
  
  unwrapExports(first_2$1);
  var first_3 = first_2$1.first;
  
  var first$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.first = first_2$1.first;
  
  });
  
  unwrapExports(first$2);
  
  var groupBy_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /** Assert that map is present for this operator */
  if (!Map) {
      throw new Error('Map not found, please polyfill');
  }
  /* tslint:enable:max-line-length */
  /**
   * Groups the items emitted by an Observable according to a specified criterion,
   * and emits these grouped items as `GroupedObservables`, one
   * {@link GroupedObservable} per group.
   *
   * <img src="./img/groupBy.png" width="100%">
   *
   * @example <caption>Group objects by id and return as array</caption>
   * Observable.of<Obj>({id: 1, name: 'aze1'},
   *                    {id: 2, name: 'sf2'},
   *                    {id: 2, name: 'dg2'},
   *                    {id: 1, name: 'erg1'},
   *                    {id: 1, name: 'df1'},
   *                    {id: 2, name: 'sfqfb2'},
   *                    {id: 3, name: 'qfs3'},
   *                    {id: 2, name: 'qsgqsfg2'}
   *     )
   *     .groupBy(p => p.id)
   *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], []))
   *     .subscribe(p => console.log(p));
   *
   * // displays:
   * // [ { id: 1, name: 'aze1' },
   * //   { id: 1, name: 'erg1' },
   * //   { id: 1, name: 'df1' } ]
   * //
   * // [ { id: 2, name: 'sf2' },
   * //   { id: 2, name: 'dg2' },
   * //   { id: 2, name: 'sfqfb2' },
   * //   { id: 2, name: 'qsgqsfg2' } ]
   * //
   * // [ { id: 3, name: 'qfs3' } ]
   *
   * @example <caption>Pivot data on the id field</caption>
   * Observable.of<Obj>({id: 1, name: 'aze1'},
   *                    {id: 2, name: 'sf2'},
   *                    {id: 2, name: 'dg2'},
   *                    {id: 1, name: 'erg1'},
   *                    {id: 1, name: 'df1'},
   *                    {id: 2, name: 'sfqfb2'},
   *                    {id: 3, name: 'qfs1'},
   *                    {id: 2, name: 'qsgqsfg2'}
   *                   )
   *     .groupBy(p => p.id, p => p.name)
   *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
   *     .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}))
   *     .subscribe(p => console.log(p));
   *
   * // displays:
   * // { id: 1, values: [ 'aze1', 'erg1', 'df1' ] }
   * // { id: 2, values: [ 'sf2', 'dg2', 'sfqfb2', 'qsgqsfg2' ] }
   * // { id: 3, values: [ 'qfs1' ] }
   *
   * @param {function(value: T): K} keySelector A function that extracts the key
   * for each item.
   * @param {function(value: T): R} [elementSelector] A function that extracts the
   * return element for each item.
   * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
   * A function that returns an Observable to determine how long each group should
   * exist.
   * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
   * GroupedObservables, each of which corresponds to a unique key value and each
   * of which emits those items from the source Observable that share that key
   * value.
   * @method groupBy
   * @owner Observable
   */
  function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
      return function (source) {
          return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
      };
  }
  exports.groupBy = groupBy;
  var GroupByOperator = /** @class */ (function () {
      function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
          this.keySelector = keySelector;
          this.elementSelector = elementSelector;
          this.durationSelector = durationSelector;
          this.subjectSelector = subjectSelector;
      }
      GroupByOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
      };
      return GroupByOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var GroupBySubscriber = /** @class */ (function (_super) {
      __extends(GroupBySubscriber, _super);
      function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.elementSelector = elementSelector;
          _this.durationSelector = durationSelector;
          _this.subjectSelector = subjectSelector;
          _this.groups = null;
          _this.attemptedToUnsubscribe = false;
          _this.count = 0;
          return _this;
      }
      GroupBySubscriber.prototype._next = function (value) {
          var key;
          try {
              key = this.keySelector(value);
          }
          catch (err) {
              this.error(err);
              return;
          }
          this._group(value, key);
      };
      GroupBySubscriber.prototype._group = function (value, key) {
          var groups = this.groups;
          if (!groups) {
              groups = this.groups = new Map();
          }
          var group = groups.get(key);
          var element;
          if (this.elementSelector) {
              try {
                  element = this.elementSelector(value);
              }
              catch (err) {
                  this.error(err);
              }
          }
          else {
              element = value;
          }
          if (!group) {
              group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
              groups.set(key, group);
              var groupedObservable = new GroupedObservable(key, group, this);
              this.destination.next(groupedObservable);
              if (this.durationSelector) {
                  var duration = void 0;
                  try {
                      duration = this.durationSelector(new GroupedObservable(key, group));
                  }
                  catch (err) {
                      this.error(err);
                      return;
                  }
                  this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
              }
          }
          if (!group.closed) {
              group.next(element);
          }
      };
      GroupBySubscriber.prototype._error = function (err) {
          var groups = this.groups;
          if (groups) {
              groups.forEach(function (group, key) {
                  group.error(err);
              });
              groups.clear();
          }
          this.destination.error(err);
      };
      GroupBySubscriber.prototype._complete = function () {
          var groups = this.groups;
          if (groups) {
              groups.forEach(function (group, key) {
                  group.complete();
              });
              groups.clear();
          }
          this.destination.complete();
      };
      GroupBySubscriber.prototype.removeGroup = function (key) {
          this.groups.delete(key);
      };
      GroupBySubscriber.prototype.unsubscribe = function () {
          if (!this.closed) {
              this.attemptedToUnsubscribe = true;
              if (this.count === 0) {
                  _super.prototype.unsubscribe.call(this);
              }
          }
      };
      return GroupBySubscriber;
  }(Subscriber_1.Subscriber));
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var GroupDurationSubscriber = /** @class */ (function (_super) {
      __extends(GroupDurationSubscriber, _super);
      function GroupDurationSubscriber(key, group, parent) {
          var _this = _super.call(this, group) || this;
          _this.key = key;
          _this.group = group;
          _this.parent = parent;
          return _this;
      }
      GroupDurationSubscriber.prototype._next = function (value) {
          this.complete();
      };
      GroupDurationSubscriber.prototype._unsubscribe = function () {
          var _a = this, parent = _a.parent, key = _a.key;
          this.key = this.parent = null;
          if (parent) {
              parent.removeGroup(key);
          }
      };
      return GroupDurationSubscriber;
  }(Subscriber_1.Subscriber));
  /**
   * An Observable representing values belonging to the same group represented by
   * a common key. The values emitted by a GroupedObservable come from the source
   * Observable. The common key is available as the field `key` on a
   * GroupedObservable instance.
   *
   * @class GroupedObservable<K, T>
   */
  var GroupedObservable = /** @class */ (function (_super) {
      __extends(GroupedObservable, _super);
      function GroupedObservable(key, groupSubject, refCountSubscription) {
          var _this = _super.call(this) || this;
          _this.key = key;
          _this.groupSubject = groupSubject;
          _this.refCountSubscription = refCountSubscription;
          return _this;
      }
      GroupedObservable.prototype._subscribe = function (subscriber) {
          var subscription = new Subscription_1.Subscription();
          var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
          if (refCountSubscription && !refCountSubscription.closed) {
              subscription.add(new InnerRefCountSubscription(refCountSubscription));
          }
          subscription.add(groupSubject.subscribe(subscriber));
          return subscription;
      };
      return GroupedObservable;
  }(Observable_1.Observable));
  exports.GroupedObservable = GroupedObservable;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var InnerRefCountSubscription = /** @class */ (function (_super) {
      __extends(InnerRefCountSubscription, _super);
      function InnerRefCountSubscription(parent) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          parent.count++;
          return _this;
      }
      InnerRefCountSubscription.prototype.unsubscribe = function () {
          var parent = this.parent;
          if (!parent.closed && !this.closed) {
              _super.prototype.unsubscribe.call(this);
              parent.count -= 1;
              if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                  parent.unsubscribe();
              }
          }
      };
      return InnerRefCountSubscription;
  }(Subscription_1.Subscription));
  
  });
  
  unwrapExports(groupBy_1);
  var groupBy_2 = groupBy_1.groupBy;
  var groupBy_3 = groupBy_1.GroupedObservable;
  
  var groupBy_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.GroupedObservable = groupBy_1.GroupedObservable;
  /* tslint:enable:max-line-length */
  /**
   * Groups the items emitted by an Observable according to a specified criterion,
   * and emits these grouped items as `GroupedObservables`, one
   * {@link GroupedObservable} per group.
   *
   * <img src="./img/groupBy.png" width="100%">
   *
   * @example <caption>Group objects by id and return as array</caption>
   * Observable.of<Obj>({id: 1, name: 'aze1'},
   *                    {id: 2, name: 'sf2'},
   *                    {id: 2, name: 'dg2'},
   *                    {id: 1, name: 'erg1'},
   *                    {id: 1, name: 'df1'},
   *                    {id: 2, name: 'sfqfb2'},
   *                    {id: 3, name: 'qfs3'},
   *                    {id: 2, name: 'qsgqsfg2'}
   *     )
   *     .groupBy(p => p.id)
   *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], []))
   *     .subscribe(p => console.log(p));
   *
   * // displays:
   * // [ { id: 1, name: 'aze1' },
   * //   { id: 1, name: 'erg1' },
   * //   { id: 1, name: 'df1' } ]
   * //
   * // [ { id: 2, name: 'sf2' },
   * //   { id: 2, name: 'dg2' },
   * //   { id: 2, name: 'sfqfb2' },
   * //   { id: 2, name: 'qsgqsfg2' } ]
   * //
   * // [ { id: 3, name: 'qfs3' } ]
   *
   * @example <caption>Pivot data on the id field</caption>
   * Observable.of<Obj>({id: 1, name: 'aze1'},
   *                    {id: 2, name: 'sf2'},
   *                    {id: 2, name: 'dg2'},
   *                    {id: 1, name: 'erg1'},
   *                    {id: 1, name: 'df1'},
   *                    {id: 2, name: 'sfqfb2'},
   *                    {id: 3, name: 'qfs1'},
   *                    {id: 2, name: 'qsgqsfg2'}
   *                   )
   *     .groupBy(p => p.id, p => p.name)
   *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
   *     .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}))
   *     .subscribe(p => console.log(p));
   *
   * // displays:
   * // { id: 1, values: [ 'aze1', 'erg1', 'df1' ] }
   * // { id: 2, values: [ 'sf2', 'dg2', 'sfqfb2', 'qsgqsfg2' ] }
   * // { id: 3, values: [ 'qfs1' ] }
   *
   * @param {function(value: T): K} keySelector A function that extracts the key
   * for each item.
   * @param {function(value: T): R} [elementSelector] A function that extracts the
   * return element for each item.
   * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
   * A function that returns an Observable to determine how long each group should
   * exist.
   * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
   * GroupedObservables, each of which corresponds to a unique key value and each
   * of which emits those items from the source Observable that share that key
   * value.
   * @method groupBy
   * @owner Observable
   */
  function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
      return groupBy_1.groupBy(keySelector, elementSelector, durationSelector, subjectSelector)(this);
  }
  exports.groupBy = groupBy;
  
  });
  
  unwrapExports(groupBy_2$1);
  var groupBy_3$1 = groupBy_2$1.GroupedObservable;
  var groupBy_4 = groupBy_2$1.groupBy;
  
  var groupBy$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.groupBy = groupBy_2$1.groupBy;
  
  });
  
  unwrapExports(groupBy$2);
  
  var ignoreElements_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
   *
   * <img src="./img/ignoreElements.png" width="100%">
   *
   * @return {Observable} An empty Observable that only calls `complete`
   * or `error`, based on which one is called by the source Observable.
   * @method ignoreElements
   * @owner Observable
   */
  function ignoreElements() {
      return function ignoreElementsOperatorFunction(source) {
          return source.lift(new IgnoreElementsOperator());
      };
  }
  exports.ignoreElements = ignoreElements;
  var IgnoreElementsOperator = /** @class */ (function () {
      function IgnoreElementsOperator() {
      }
      IgnoreElementsOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new IgnoreElementsSubscriber(subscriber));
      };
      return IgnoreElementsOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var IgnoreElementsSubscriber = /** @class */ (function (_super) {
      __extends(IgnoreElementsSubscriber, _super);
      function IgnoreElementsSubscriber() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      IgnoreElementsSubscriber.prototype._next = function (unused) {
          // Do nothing
      };
      return IgnoreElementsSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(ignoreElements_1);
  var ignoreElements_2 = ignoreElements_1.ignoreElements;
  
  var ignoreElements_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
   *
   * <img src="./img/ignoreElements.png" width="100%">
   *
   * @return {Observable} An empty Observable that only calls `complete`
   * or `error`, based on which one is called by the source Observable.
   * @method ignoreElements
   * @owner Observable
   */
  function ignoreElements() {
      return ignoreElements_1.ignoreElements()(this);
  }
  exports.ignoreElements = ignoreElements;
  
  });
  
  unwrapExports(ignoreElements_2$1);
  var ignoreElements_3 = ignoreElements_2$1.ignoreElements;
  
  var ignoreElements$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.ignoreElements = ignoreElements_2$1.ignoreElements;
  
  });
  
  unwrapExports(ignoreElements$2);
  
  var isEmpty_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function isEmpty() {
      return function (source) { return source.lift(new IsEmptyOperator()); };
  }
  exports.isEmpty = isEmpty;
  var IsEmptyOperator = /** @class */ (function () {
      function IsEmptyOperator() {
      }
      IsEmptyOperator.prototype.call = function (observer, source) {
          return source.subscribe(new IsEmptySubscriber(observer));
      };
      return IsEmptyOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var IsEmptySubscriber = /** @class */ (function (_super) {
      __extends(IsEmptySubscriber, _super);
      function IsEmptySubscriber(destination) {
          return _super.call(this, destination) || this;
      }
      IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
          var destination = this.destination;
          destination.next(isEmpty);
          destination.complete();
      };
      IsEmptySubscriber.prototype._next = function (value) {
          this.notifyComplete(false);
      };
      IsEmptySubscriber.prototype._complete = function () {
          this.notifyComplete(true);
      };
      return IsEmptySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(isEmpty_1);
  var isEmpty_2 = isEmpty_1.isEmpty;
  
  var isEmpty_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
   *
   * <img src="./img/isEmpty.png" width="100%">
   *
   * @return {Observable} An Observable that emits a Boolean.
   * @method isEmpty
   * @owner Observable
   */
  function isEmpty() {
      return isEmpty_1.isEmpty()(this);
  }
  exports.isEmpty = isEmpty;
  
  });
  
  unwrapExports(isEmpty_2$1);
  var isEmpty_3 = isEmpty_2$1.isEmpty;
  
  var isEmpty$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.isEmpty = isEmpty_2$1.isEmpty;
  
  });
  
  unwrapExports(isEmpty$2);
  
  var audit_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Ignores source values for a duration determined by another Observable, then
   * emits the most recent value from the source Observable, then repeats this
   * process.
   *
   * <span class="informal">It's like {@link auditTime}, but the silencing
   * duration is determined by a second Observable.</span>
   *
   * <img src="./img/audit.png" width="100%">
   *
   * `audit` is similar to `throttle`, but emits the last value from the silenced
   * time window, instead of the first value. `audit` emits the most recent value
   * from the source Observable on the output Observable as soon as its internal
   * timer becomes disabled, and ignores source values while the timer is enabled.
   * Initially, the timer is disabled. As soon as the first source value arrives,
   * the timer is enabled by calling the `durationSelector` function with the
   * source value, which returns the "duration" Observable. When the duration
   * Observable emits a value or completes, the timer is disabled, then the most
   * recent source value is emitted on the output Observable, and this process
   * repeats for the next source value.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.audit(ev => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounce}
   * @see {@link delayWhen}
   * @see {@link sample}
   * @see {@link throttle}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the silencing
   * duration, returned as an Observable or a Promise.
   * @return {Observable<T>} An Observable that performs rate-limiting of
   * emissions from the source Observable.
   * @method audit
   * @owner Observable
   */
  function audit(durationSelector) {
      return function auditOperatorFunction(source) {
          return source.lift(new AuditOperator(durationSelector));
      };
  }
  exports.audit = audit;
  var AuditOperator = /** @class */ (function () {
      function AuditOperator(durationSelector) {
          this.durationSelector = durationSelector;
      }
      AuditOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
      };
      return AuditOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var AuditSubscriber = /** @class */ (function (_super) {
      __extends(AuditSubscriber, _super);
      function AuditSubscriber(destination, durationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.durationSelector = durationSelector;
          _this.hasValue = false;
          return _this;
      }
      AuditSubscriber.prototype._next = function (value) {
          this.value = value;
          this.hasValue = true;
          if (!this.throttled) {
              var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
              if (duration === errorObject.errorObject) {
                  this.destination.error(errorObject.errorObject.e);
              }
              else {
                  var innerSubscription = subscribeToResult_1.subscribeToResult(this, duration);
                  if (innerSubscription.closed) {
                      this.clearThrottle();
                  }
                  else {
                      this.add(this.throttled = innerSubscription);
                  }
              }
          }
      };
      AuditSubscriber.prototype.clearThrottle = function () {
          var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
          if (throttled) {
              this.remove(throttled);
              this.throttled = null;
              throttled.unsubscribe();
          }
          if (hasValue) {
              this.value = null;
              this.hasValue = false;
              this.destination.next(value);
          }
      };
      AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
          this.clearThrottle();
      };
      AuditSubscriber.prototype.notifyComplete = function () {
          this.clearThrottle();
      };
      return AuditSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(audit_1);
  var audit_2 = audit_1.audit;
  
  var audit_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Ignores source values for a duration determined by another Observable, then
   * emits the most recent value from the source Observable, then repeats this
   * process.
   *
   * <span class="informal">It's like {@link auditTime}, but the silencing
   * duration is determined by a second Observable.</span>
   *
   * <img src="./img/audit.png" width="100%">
   *
   * `audit` is similar to `throttle`, but emits the last value from the silenced
   * time window, instead of the first value. `audit` emits the most recent value
   * from the source Observable on the output Observable as soon as its internal
   * timer becomes disabled, and ignores source values while the timer is enabled.
   * Initially, the timer is disabled. As soon as the first source value arrives,
   * the timer is enabled by calling the `durationSelector` function with the
   * source value, which returns the "duration" Observable. When the duration
   * Observable emits a value or completes, the timer is disabled, then the most
   * recent source value is emitted on the output Observable, and this process
   * repeats for the next source value.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.audit(ev => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounce}
   * @see {@link delayWhen}
   * @see {@link sample}
   * @see {@link throttle}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the silencing
   * duration, returned as an Observable or a Promise.
   * @return {Observable<T>} An Observable that performs rate-limiting of
   * emissions from the source Observable.
   * @method audit
   * @owner Observable
   */
  function audit(durationSelector) {
      return audit_1.audit(durationSelector)(this);
  }
  exports.audit = audit;
  
  });
  
  unwrapExports(audit_2$1);
  var audit_3 = audit_2$1.audit;
  
  var audit$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.audit = audit_2$1.audit;
  
  });
  
  unwrapExports(audit$2);
  
  var auditTime_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Ignores source values for `duration` milliseconds, then emits the most recent
   * value from the source Observable, then repeats this process.
   *
   * <span class="informal">When it sees a source values, it ignores that plus
   * the next ones for `duration` milliseconds, and then it emits the most recent
   * value from the source.</span>
   *
   * <img src="./img/auditTime.png" width="100%">
   *
   * `auditTime` is similar to `throttleTime`, but emits the last value from the
   * silenced time window, instead of the first value. `auditTime` emits the most
   * recent value from the source Observable on the output Observable as soon as
   * its internal timer becomes disabled, and ignores source values while the
   * timer is enabled. Initially, the timer is disabled. As soon as the first
   * source value arrives, the timer is enabled. After `duration` milliseconds (or
   * the time unit determined internally by the optional `scheduler`) has passed,
   * the timer is disabled, then the most recent source value is emitted on the
   * output Observable, and this process repeats for the next source value.
   * Optionally takes a {@link IScheduler} for managing timers.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.auditTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttleTime}
   *
   * @param {number} duration Time to wait before emitting the most recent source
   * value, measured in milliseconds or the time unit determined internally
   * by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the rate-limiting behavior.
   * @return {Observable<T>} An Observable that performs rate-limiting of
   * emissions from the source Observable.
   * @method auditTime
   * @owner Observable
   */
  function auditTime(duration, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return audit_1.audit(function () { return timer_1.timer(duration, scheduler); });
  }
  exports.auditTime = auditTime;
  
  });
  
  unwrapExports(auditTime_1);
  var auditTime_2 = auditTime_1.auditTime;
  
  var auditTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Ignores source values for `duration` milliseconds, then emits the most recent
   * value from the source Observable, then repeats this process.
   *
   * <span class="informal">When it sees a source values, it ignores that plus
   * the next ones for `duration` milliseconds, and then it emits the most recent
   * value from the source.</span>
   *
   * <img src="./img/auditTime.png" width="100%">
   *
   * `auditTime` is similar to `throttleTime`, but emits the last value from the
   * silenced time window, instead of the first value. `auditTime` emits the most
   * recent value from the source Observable on the output Observable as soon as
   * its internal timer becomes disabled, and ignores source values while the
   * timer is enabled. Initially, the timer is disabled. As soon as the first
   * source value arrives, the timer is enabled. After `duration` milliseconds (or
   * the time unit determined internally by the optional `scheduler`) has passed,
   * the timer is disabled, then the most recent source value is emitted on the
   * output Observable, and this process repeats for the next source value.
   * Optionally takes a {@link IScheduler} for managing timers.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.auditTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttleTime}
   *
   * @param {number} duration Time to wait before emitting the most recent source
   * value, measured in milliseconds or the time unit determined internally
   * by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the rate-limiting behavior.
   * @return {Observable<T>} An Observable that performs rate-limiting of
   * emissions from the source Observable.
   * @method auditTime
   * @owner Observable
   */
  function auditTime(duration, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return auditTime_1.auditTime(duration, scheduler)(this);
  }
  exports.auditTime = auditTime;
  
  });
  
  unwrapExports(auditTime_2$1);
  var auditTime_3 = auditTime_2$1.auditTime;
  
  var auditTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.auditTime = auditTime_2$1.auditTime;
  
  });
  
  unwrapExports(auditTime$2);
  
  var last_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits only the last item emitted by the source Observable.
   * It optionally takes a predicate function as a parameter, in which case, rather than emitting
   * the last item from the source Observable, the resulting Observable will emit the last item
   * from the source Observable that satisfies the predicate.
   *
   * <img src="./img/last.png" width="100%">
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   * @param {function} predicate - The condition any source emitted item has to satisfy.
   * @return {Observable} An Observable that emits only the last item satisfying the given condition
   * from the source, or an NoSuchElementException if no such items are emitted.
   * @throws - Throws if no items that match the predicate are emitted by the source Observable.
   * @method last
   * @owner Observable
   */
  function last(predicate, resultSelector, defaultValue) {
      return function (source) { return source.lift(new LastOperator(predicate, resultSelector, defaultValue, source)); };
  }
  exports.last = last;
  var LastOperator = /** @class */ (function () {
      function LastOperator(predicate, resultSelector, defaultValue, source) {
          this.predicate = predicate;
          this.resultSelector = resultSelector;
          this.defaultValue = defaultValue;
          this.source = source;
      }
      LastOperator.prototype.call = function (observer, source) {
          return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
      };
      return LastOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var LastSubscriber = /** @class */ (function (_super) {
      __extends(LastSubscriber, _super);
      function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.resultSelector = resultSelector;
          _this.defaultValue = defaultValue;
          _this.source = source;
          _this.hasValue = false;
          _this.index = 0;
          if (typeof defaultValue !== 'undefined') {
              _this.lastValue = defaultValue;
              _this.hasValue = true;
          }
          return _this;
      }
      LastSubscriber.prototype._next = function (value) {
          var index = this.index++;
          if (this.predicate) {
              this._tryPredicate(value, index);
          }
          else {
              if (this.resultSelector) {
                  this._tryResultSelector(value, index);
                  return;
              }
              this.lastValue = value;
              this.hasValue = true;
          }
      };
      LastSubscriber.prototype._tryPredicate = function (value, index) {
          var result;
          try {
              result = this.predicate(value, index, this.source);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              if (this.resultSelector) {
                  this._tryResultSelector(value, index);
                  return;
              }
              this.lastValue = value;
              this.hasValue = true;
          }
      };
      LastSubscriber.prototype._tryResultSelector = function (value, index) {
          var result;
          try {
              result = this.resultSelector(value, index);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.lastValue = result;
          this.hasValue = true;
      };
      LastSubscriber.prototype._complete = function () {
          var destination = this.destination;
          if (this.hasValue) {
              destination.next(this.lastValue);
              destination.complete();
          }
          else {
              destination.error(new EmptyError_1.EmptyError);
          }
      };
      return LastSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(last_1);
  var last_2 = last_1.last;
  
  var last_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits only the last item emitted by the source Observable.
   * It optionally takes a predicate function as a parameter, in which case, rather than emitting
   * the last item from the source Observable, the resulting Observable will emit the last item
   * from the source Observable that satisfies the predicate.
   *
   * <img src="./img/last.png" width="100%">
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   * @param {function} predicate - The condition any source emitted item has to satisfy.
   * @return {Observable} An Observable that emits only the last item satisfying the given condition
   * from the source, or an NoSuchElementException if no such items are emitted.
   * @throws - Throws if no items that match the predicate are emitted by the source Observable.
   * @method last
   * @owner Observable
   */
  function last(predicate, resultSelector, defaultValue) {
      return last_1.last(predicate, resultSelector, defaultValue)(this);
  }
  exports.last = last;
  
  });
  
  unwrapExports(last_2$1);
  var last_3 = last_2$1.last;
  
  var last$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.last = last_2$1.last;
  
  });
  
  unwrapExports(last$2);
  
  var _let = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @param func
   * @return {Observable<R>}
   * @method let
   * @owner Observable
   */
  function letProto(func) {
      return func(this);
  }
  exports.letProto = letProto;
  
  });
  
  unwrapExports(_let);
  var _let_1 = _let.letProto;
  
  var _let$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.let = _let.letProto;
  Observable_1.Observable.prototype.letBind = _let.letProto;
  
  });
  
  unwrapExports(_let$2);
  
  var every_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
   *
   * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
   *  Observable.of(1, 2, 3, 4, 5, 6)
   *     .every(x => x < 5)
   *     .subscribe(x => console.log(x)); // -> false
   *
   * @param {function} predicate A function for determining if an item meets a specified condition.
   * @param {any} [thisArg] Optional object to use for `this` in the callback.
   * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
   * @method every
   * @owner Observable
   */
  function every(predicate, thisArg) {
      return function (source) { return source.lift(new EveryOperator(predicate, thisArg, source)); };
  }
  exports.every = every;
  var EveryOperator = /** @class */ (function () {
      function EveryOperator(predicate, thisArg, source) {
          this.predicate = predicate;
          this.thisArg = thisArg;
          this.source = source;
      }
      EveryOperator.prototype.call = function (observer, source) {
          return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
      };
      return EveryOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var EverySubscriber = /** @class */ (function (_super) {
      __extends(EverySubscriber, _super);
      function EverySubscriber(destination, predicate, thisArg, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.source = source;
          _this.index = 0;
          _this.thisArg = thisArg || _this;
          return _this;
      }
      EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
          this.destination.next(everyValueMatch);
          this.destination.complete();
      };
      EverySubscriber.prototype._next = function (value) {
          var result = false;
          try {
              result = this.predicate.call(this.thisArg, value, this.index++, this.source);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (!result) {
              this.notifyComplete(false);
          }
      };
      EverySubscriber.prototype._complete = function () {
          this.notifyComplete(true);
      };
      return EverySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(every_1);
  var every_2 = every_1.every;
  
  var every_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
   *
   * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
   *  Observable.of(1, 2, 3, 4, 5, 6)
   *     .every(x => x < 5)
   *     .subscribe(x => console.log(x)); // -> false
   *
   * @param {function} predicate A function for determining if an item meets a specified condition.
   * @param {any} [thisArg] Optional object to use for `this` in the callback.
   * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
   * @method every
   * @owner Observable
   */
  function every(predicate, thisArg) {
      return every_1.every(predicate, thisArg)(this);
  }
  exports.every = every;
  
  });
  
  unwrapExports(every_2$1);
  var every_3 = every_2$1.every;
  
  var every$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.every = every_2$1.every;
  
  });
  
  unwrapExports(every$2);
  
  var map_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Applies a given `project` function to each value emitted by the source
   * Observable, and emits the resulting values as an Observable.
   *
   * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
   * it passes each source value through a transformation function to get
   * corresponding output values.</span>
   *
   * <img src="./img/map.png" width="100%">
   *
   * Similar to the well known `Array.prototype.map` function, this operator
   * applies a projection to each value and emits that projection in the output
   * Observable.
   *
   * @example <caption>Map every click to the clientX position of that click</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var positions = clicks.map(ev => ev.clientX);
   * positions.subscribe(x => console.log(x));
   *
   * @see {@link mapTo}
   * @see {@link pluck}
   *
   * @param {function(value: T, index: number): R} project The function to apply
   * to each `value` emitted by the source Observable. The `index` parameter is
   * the number `i` for the i-th emission that has happened since the
   * subscription, starting from the number `0`.
   * @param {any} [thisArg] An optional argument to define what `this` is in the
   * `project` function.
   * @return {Observable<R>} An Observable that emits the values from the source
   * Observable transformed by the given `project` function.
   * @method map
   * @owner Observable
   */
  function map(project, thisArg) {
      return map_1.map(project, thisArg)(this);
  }
  exports.map = map;
  
  });
  
  unwrapExports(map_2$1);
  var map_3$1 = map_2$1.map;
  
  var map$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.map = map_2$1.map;
  
  });
  
  unwrapExports(map$2);
  
  var mapTo_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits the given constant value on the output Observable every time the source
   * Observable emits a value.
   *
   * <span class="informal">Like {@link map}, but it maps every source value to
   * the same output value every time.</span>
   *
   * <img src="./img/mapTo.png" width="100%">
   *
   * Takes a constant `value` as argument, and emits that whenever the source
   * Observable emits a value. In other words, ignores the actual source value,
   * and simply uses the emission moment to know when to emit the given `value`.
   *
   * @example <caption>Map every click to the string 'Hi'</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var greetings = clicks.mapTo('Hi');
   * greetings.subscribe(x => console.log(x));
   *
   * @see {@link map}
   *
   * @param {any} value The value to map each source value to.
   * @return {Observable} An Observable that emits the given `value` every time
   * the source Observable emits something.
   * @method mapTo
   * @owner Observable
   */
  function mapTo(value) {
      return function (source) { return source.lift(new MapToOperator(value)); };
  }
  exports.mapTo = mapTo;
  var MapToOperator = /** @class */ (function () {
      function MapToOperator(value) {
          this.value = value;
      }
      MapToOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new MapToSubscriber(subscriber, this.value));
      };
      return MapToOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MapToSubscriber = /** @class */ (function (_super) {
      __extends(MapToSubscriber, _super);
      function MapToSubscriber(destination, value) {
          var _this = _super.call(this, destination) || this;
          _this.value = value;
          return _this;
      }
      MapToSubscriber.prototype._next = function (x) {
          this.destination.next(this.value);
      };
      return MapToSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(mapTo_1);
  var mapTo_2 = mapTo_1.mapTo;
  
  var mapTo_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits the given constant value on the output Observable every time the source
   * Observable emits a value.
   *
   * <span class="informal">Like {@link map}, but it maps every source value to
   * the same output value every time.</span>
   *
   * <img src="./img/mapTo.png" width="100%">
   *
   * Takes a constant `value` as argument, and emits that whenever the source
   * Observable emits a value. In other words, ignores the actual source value,
   * and simply uses the emission moment to know when to emit the given `value`.
   *
   * @example <caption>Map every click to the string 'Hi'</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var greetings = clicks.mapTo('Hi');
   * greetings.subscribe(x => console.log(x));
   *
   * @see {@link map}
   *
   * @param {any} value The value to map each source value to.
   * @return {Observable} An Observable that emits the given `value` every time
   * the source Observable emits something.
   * @method mapTo
   * @owner Observable
   */
  function mapTo(value) {
      return mapTo_1.mapTo(value)(this);
  }
  exports.mapTo = mapTo;
  
  });
  
  unwrapExports(mapTo_2$1);
  var mapTo_3 = mapTo_2$1.mapTo;
  
  var mapTo$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.mapTo = mapTo_2$1.mapTo;
  
  });
  
  unwrapExports(mapTo$2);
  
  var materialize_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Represents all of the notifications from the source Observable as `next`
   * emissions marked with their original types within {@link Notification}
   * objects.
   *
   * <span class="informal">Wraps `next`, `error` and `complete` emissions in
   * {@link Notification} objects, emitted as `next` on the output Observable.
   * </span>
   *
   * <img src="./img/materialize.png" width="100%">
   *
   * `materialize` returns an Observable that emits a `next` notification for each
   * `next`, `error`, or `complete` emission of the source Observable. When the
   * source Observable emits `complete`, the output Observable will emit `next` as
   * a Notification of type "complete", and then it will emit `complete` as well.
   * When the source Observable emits `error`, the output will emit `next` as a
   * Notification of type "error", and then `complete`.
   *
   * This operator is useful for producing metadata of the source Observable, to
   * be consumed as `next` emissions. Use it in conjunction with
   * {@link dematerialize}.
   *
   * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
   * var letters = Rx.Observable.of('a', 'b', 13, 'd');
   * var upperCase = letters.map(x => x.toUpperCase());
   * var materialized = upperCase.materialize();
   * materialized.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
   * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
   * // - Notification {kind: "E", value: undefined, error: TypeError:
   * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
   * //   [as project] (http://1…, hasValue: false}
   *
   * @see {@link Notification}
   * @see {@link dematerialize}
   *
   * @return {Observable<Notification<T>>} An Observable that emits
   * {@link Notification} objects that wrap the original emissions from the source
   * Observable with metadata.
   * @method materialize
   * @owner Observable
   */
  function materialize() {
      return function materializeOperatorFunction(source) {
          return source.lift(new MaterializeOperator());
      };
  }
  exports.materialize = materialize;
  var MaterializeOperator = /** @class */ (function () {
      function MaterializeOperator() {
      }
      MaterializeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new MaterializeSubscriber(subscriber));
      };
      return MaterializeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MaterializeSubscriber = /** @class */ (function (_super) {
      __extends(MaterializeSubscriber, _super);
      function MaterializeSubscriber(destination) {
          return _super.call(this, destination) || this;
      }
      MaterializeSubscriber.prototype._next = function (value) {
          this.destination.next(Notification_1.Notification.createNext(value));
      };
      MaterializeSubscriber.prototype._error = function (err) {
          var destination = this.destination;
          destination.next(Notification_1.Notification.createError(err));
          destination.complete();
      };
      MaterializeSubscriber.prototype._complete = function () {
          var destination = this.destination;
          destination.next(Notification_1.Notification.createComplete());
          destination.complete();
      };
      return MaterializeSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(materialize_1);
  var materialize_2 = materialize_1.materialize;
  
  var materialize_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Represents all of the notifications from the source Observable as `next`
   * emissions marked with their original types within {@link Notification}
   * objects.
   *
   * <span class="informal">Wraps `next`, `error` and `complete` emissions in
   * {@link Notification} objects, emitted as `next` on the output Observable.
   * </span>
   *
   * <img src="./img/materialize.png" width="100%">
   *
   * `materialize` returns an Observable that emits a `next` notification for each
   * `next`, `error`, or `complete` emission of the source Observable. When the
   * source Observable emits `complete`, the output Observable will emit `next` as
   * a Notification of type "complete", and then it will emit `complete` as well.
   * When the source Observable emits `error`, the output will emit `next` as a
   * Notification of type "error", and then `complete`.
   *
   * This operator is useful for producing metadata of the source Observable, to
   * be consumed as `next` emissions. Use it in conjunction with
   * {@link dematerialize}.
   *
   * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
   * var letters = Rx.Observable.of('a', 'b', 13, 'd');
   * var upperCase = letters.map(x => x.toUpperCase());
   * var materialized = upperCase.materialize();
   * materialized.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
   * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
   * // - Notification {kind: "E", value: undefined, error: TypeError:
   * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
   * //   [as project] (http://1…, hasValue: false}
   *
   * @see {@link Notification}
   * @see {@link dematerialize}
   *
   * @return {Observable<Notification<T>>} An Observable that emits
   * {@link Notification} objects that wrap the original emissions from the source
   * Observable with metadata.
   * @method materialize
   * @owner Observable
   */
  function materialize() {
      return materialize_1.materialize()(this);
  }
  exports.materialize = materialize;
  
  });
  
  unwrapExports(materialize_2$1);
  var materialize_3 = materialize_2$1.materialize;
  
  var materialize$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.materialize = materialize_2$1.materialize;
  
  });
  
  unwrapExports(materialize$2);
  
  var scan_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Applies an accumulator function over the source Observable, and returns each
   * intermediate result, with an optional seed value.
   *
   * <span class="informal">It's like {@link reduce}, but emits the current
   * accumulation whenever the source emits a value.</span>
   *
   * <img src="./img/scan.png" width="100%">
   *
   * Combines together all values emitted on the source, using an accumulator
   * function that knows how to join a new source value into the accumulation from
   * the past. Is similar to {@link reduce}, but emits the intermediate
   * accumulations.
   *
   * Returns an Observable that applies a specified `accumulator` function to each
   * item emitted by the source Observable. If a `seed` value is specified, then
   * that value will be used as the initial value for the accumulator. If no seed
   * value is specified, the first item of the source is used as the seed.
   *
   * @example <caption>Count the number of click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var ones = clicks.mapTo(1);
   * var seed = 0;
   * var count = ones.scan((acc, one) => acc + one, seed);
   * count.subscribe(x => console.log(x));
   *
   * @see {@link expand}
   * @see {@link mergeScan}
   * @see {@link reduce}
   *
   * @param {function(acc: R, value: T, index: number): R} accumulator
   * The accumulator function called on each source value.
   * @param {T|R} [seed] The initial accumulation value.
   * @return {Observable<R>} An observable of the accumulated values.
   * @method scan
   * @owner Observable
   */
  function scan(accumulator, seed) {
      var hasSeed = false;
      // providing a seed of `undefined` *should* be valid and trigger
      // hasSeed! so don't use `seed !== undefined` checks!
      // For this reason, we have to check it here at the original call site
      // otherwise inside Operator/Subscriber we won't know if `undefined`
      // means they didn't provide anything or if they literally provided `undefined`
      if (arguments.length >= 2) {
          hasSeed = true;
      }
      return function scanOperatorFunction(source) {
          return source.lift(new ScanOperator(accumulator, seed, hasSeed));
      };
  }
  exports.scan = scan;
  var ScanOperator = /** @class */ (function () {
      function ScanOperator(accumulator, seed, hasSeed) {
          if (hasSeed === void 0) { hasSeed = false; }
          this.accumulator = accumulator;
          this.seed = seed;
          this.hasSeed = hasSeed;
      }
      ScanOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
      };
      return ScanOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ScanSubscriber = /** @class */ (function (_super) {
      __extends(ScanSubscriber, _super);
      function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
          var _this = _super.call(this, destination) || this;
          _this.accumulator = accumulator;
          _this._seed = _seed;
          _this.hasSeed = hasSeed;
          _this.index = 0;
          return _this;
      }
      Object.defineProperty(ScanSubscriber.prototype, "seed", {
          get: function () {
              return this._seed;
          },
          set: function (value) {
              this.hasSeed = true;
              this._seed = value;
          },
          enumerable: true,
          configurable: true
      });
      ScanSubscriber.prototype._next = function (value) {
          if (!this.hasSeed) {
              this.seed = value;
              this.destination.next(value);
          }
          else {
              return this._tryNext(value);
          }
      };
      ScanSubscriber.prototype._tryNext = function (value) {
          var index = this.index++;
          var result;
          try {
              result = this.accumulator(this.seed, value, index);
          }
          catch (err) {
              this.destination.error(err);
          }
          this.seed = result;
          this.destination.next(result);
      };
      return ScanSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(scan_1);
  var scan_2 = scan_1.scan;
  
  var takeLast_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Emits only the last `count` values emitted by the source Observable.
   *
   * <span class="informal">Remembers the latest `count` values, then emits those
   * only when the source completes.</span>
   *
   * <img src="./img/takeLast.png" width="100%">
   *
   * `takeLast` returns an Observable that emits at most the last `count` values
   * emitted by the source Observable. If the source emits fewer than `count`
   * values then all of its values are emitted. This operator must wait until the
   * `complete` notification emission from the source in order to emit the `next`
   * values on the output Observable, because otherwise it is impossible to know
   * whether or not more values will be emitted on the source. For this reason,
   * all values are emitted synchronously, followed by the complete notification.
   *
   * @example <caption>Take the last 3 values of an Observable with many values</caption>
   * var many = Rx.Observable.range(1, 100);
   * var lastThree = many.takeLast(3);
   * lastThree.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeUntil}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
   *
   * @param {number} count The maximum number of values to emit from the end of
   * the sequence of values emitted by the source Observable.
   * @return {Observable<T>} An Observable that emits at most the last count
   * values emitted by the source Observable.
   * @method takeLast
   * @owner Observable
   */
  function takeLast(count) {
      return function takeLastOperatorFunction(source) {
          if (count === 0) {
              return empty_1.empty();
          }
          else {
              return source.lift(new TakeLastOperator(count));
          }
      };
  }
  exports.takeLast = takeLast;
  var TakeLastOperator = /** @class */ (function () {
      function TakeLastOperator(total) {
          this.total = total;
          if (this.total < 0) {
              throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
          }
      }
      TakeLastOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
      };
      return TakeLastOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TakeLastSubscriber = /** @class */ (function (_super) {
      __extends(TakeLastSubscriber, _super);
      function TakeLastSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.ring = new Array();
          _this.count = 0;
          return _this;
      }
      TakeLastSubscriber.prototype._next = function (value) {
          var ring = this.ring;
          var total = this.total;
          var count = this.count++;
          if (ring.length < total) {
              ring.push(value);
          }
          else {
              var index = count % total;
              ring[index] = value;
          }
      };
      TakeLastSubscriber.prototype._complete = function () {
          var destination = this.destination;
          var count = this.count;
          if (count > 0) {
              var total = this.count >= this.total ? this.total : this.count;
              var ring = this.ring;
              for (var i = 0; i < total; i++) {
                  var idx = (count++) % total;
                  destination.next(ring[idx]);
              }
          }
          destination.complete();
      };
      return TakeLastSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(takeLast_1);
  var takeLast_2 = takeLast_1.takeLast;
  
  var reduce_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Applies an accumulator function over the source Observable, and returns the
   * accumulated result when the source completes, given an optional seed value.
   *
   * <span class="informal">Combines together all values emitted on the source,
   * using an accumulator function that knows how to join a new source value into
   * the accumulation from the past.</span>
   *
   * <img src="./img/reduce.png" width="100%">
   *
   * Like
   * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
   * `reduce` applies an `accumulator` function against an accumulation and each
   * value of the source Observable (from the past) to reduce it to a single
   * value, emitted on the output Observable. Note that `reduce` will only emit
   * one value, only when the source Observable completes. It is equivalent to
   * applying operator {@link scan} followed by operator {@link last}.
   *
   * Returns an Observable that applies a specified `accumulator` function to each
   * item emitted by the source Observable. If a `seed` value is specified, then
   * that value will be used as the initial value for the accumulator. If no seed
   * value is specified, the first item of the source is used as the seed.
   *
   * @example <caption>Count the number of click events that happened in 5 seconds</caption>
   * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
   *   .takeUntil(Rx.Observable.interval(5000));
   * var ones = clicksInFiveSeconds.mapTo(1);
   * var seed = 0;
   * var count = ones.reduce((acc, one) => acc + one, seed);
   * count.subscribe(x => console.log(x));
   *
   * @see {@link count}
   * @see {@link expand}
   * @see {@link mergeScan}
   * @see {@link scan}
   *
   * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
   * called on each source value.
   * @param {R} [seed] The initial accumulation value.
   * @return {Observable<R>} An Observable that emits a single value that is the
   * result of accumulating the values emitted by the source Observable.
   * @method reduce
   * @owner Observable
   */
  function reduce(accumulator, seed) {
      // providing a seed of `undefined` *should* be valid and trigger
      // hasSeed! so don't use `seed !== undefined` checks!
      // For this reason, we have to check it here at the original call site
      // otherwise inside Operator/Subscriber we won't know if `undefined`
      // means they didn't provide anything or if they literally provided `undefined`
      if (arguments.length >= 2) {
          return function reduceOperatorFunctionWithSeed(source) {
              return pipe_1.pipe(scan_1.scan(accumulator, seed), takeLast_1.takeLast(1), defaultIfEmpty_1.defaultIfEmpty(seed))(source);
          };
      }
      return function reduceOperatorFunction(source) {
          return pipe_1.pipe(scan_1.scan(function (acc, value, index) {
              return accumulator(acc, value, index + 1);
          }), takeLast_1.takeLast(1))(source);
      };
  }
  exports.reduce = reduce;
  
  });
  
  unwrapExports(reduce_1);
  var reduce_2 = reduce_1.reduce;
  
  var max_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
   * and when source Observable completes it emits a single item: the item with the largest value.
   *
   * <img src="./img/max.png" width="100%">
   *
   * @example <caption>Get the maximal value of a series of numbers</caption>
   * Rx.Observable.of(5, 4, 7, 2, 8)
   *   .max()
   *   .subscribe(x => console.log(x)); // -> 8
   *
   * @example <caption>Use a comparer function to get the maximal item</caption>
   * interface Person {
   *   age: number,
   *   name: string
   * }
   * Observable.of<Person>({age: 7, name: 'Foo'},
   *                       {age: 5, name: 'Bar'},
   *                       {age: 9, name: 'Beer'})
   *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
   *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
   * }
   *
   * @see {@link min}
   *
   * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
   * value of two items.
   * @return {Observable} An Observable that emits item with the largest value.
   * @method max
   * @owner Observable
   */
  function max(comparer) {
      var max = (typeof comparer === 'function')
          ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
          : function (x, y) { return x > y ? x : y; };
      return reduce_1.reduce(max);
  }
  exports.max = max;
  
  });
  
  unwrapExports(max_1);
  var max_2 = max_1.max;
  
  var max_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
   * and when source Observable completes it emits a single item: the item with the largest value.
   *
   * <img src="./img/max.png" width="100%">
   *
   * @example <caption>Get the maximal value of a series of numbers</caption>
   * Rx.Observable.of(5, 4, 7, 2, 8)
   *   .max()
   *   .subscribe(x => console.log(x)); // -> 8
   *
   * @example <caption>Use a comparer function to get the maximal item</caption>
   * interface Person {
   *   age: number,
   *   name: string
   * }
   * Observable.of<Person>({age: 7, name: 'Foo'},
   *                       {age: 5, name: 'Bar'},
   *                       {age: 9, name: 'Beer'})
   *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
   *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
   * }
   *
   * @see {@link min}
   *
   * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
   * value of two items.
   * @return {Observable} An Observable that emits item with the largest value.
   * @method max
   * @owner Observable
   */
  function max(comparer) {
      return max_1.max(comparer)(this);
  }
  exports.max = max;
  
  });
  
  unwrapExports(max_2$1);
  var max_3 = max_2$1.max;
  
  var max$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.max = max_2$1.max;
  
  });
  
  unwrapExports(max$2);
  
  var merge_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Creates an output Observable which concurrently emits all values from every
   * given input Observable.
   *
   * <span class="informal">Flattens multiple Observables together by blending
   * their values into one Observable.</span>
   *
   * <img src="./img/merge.png" width="100%">
   *
   * `merge` subscribes to each given input Observable (either the source or an
   * Observable given as argument), and simply forwards (without doing any
   * transformation) all the values from all the input Observables to the output
   * Observable. The output Observable only completes once all input Observables
   * have completed. Any error delivered by an input Observable will be immediately
   * emitted on the output Observable.
   *
   * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var timer = Rx.Observable.interval(1000);
   * var clicksOrTimer = clicks.merge(timer);
   * clicksOrTimer.subscribe(x => console.log(x));
   *
   * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
   * var timer1 = Rx.Observable.interval(1000).take(10);
   * var timer2 = Rx.Observable.interval(2000).take(6);
   * var timer3 = Rx.Observable.interval(500).take(10);
   * var concurrent = 2; // the argument
   * var merged = timer1.merge(timer2, timer3, concurrent);
   * merged.subscribe(x => console.log(x));
   *
   * @see {@link mergeAll}
   * @see {@link mergeMap}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   *
   * @param {ObservableInput} other An input Observable to merge with the source
   * Observable. More than one input Observables may be given as argument.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
   * concurrency of input Observables.
   * @return {Observable} An Observable that emits items that are the result of
   * every input Observable.
   * @method merge
   * @owner Observable
   */
  function merge() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return this.lift.call(merge_1.merge.apply(void 0, [this].concat(observables)));
  }
  exports.merge = merge;
  
  });
  
  unwrapExports(merge_2$1);
  var merge_3 = merge_2$1.merge;
  
  var merge$4 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.merge = merge_2$1.merge;
  
  });
  
  unwrapExports(merge$4);
  
  var mergeAll_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts a higher-order Observable into a first-order Observable which
   * concurrently delivers all values that are emitted on the inner Observables.
   *
   * <span class="informal">Flattens an Observable-of-Observables.</span>
   *
   * <img src="./img/mergeAll.png" width="100%">
   *
   * `mergeAll` subscribes to an Observable that emits Observables, also known as
   * a higher-order Observable. Each time it observes one of these emitted inner
   * Observables, it subscribes to that and delivers all the values from the
   * inner Observable on the output Observable. The output Observable only
   * completes once all inner Observables have completed. Any error delivered by
   * a inner Observable will be immediately emitted on the output Observable.
   *
   * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
   * var firstOrder = higherOrder.mergeAll();
   * firstOrder.subscribe(x => console.log(x));
   *
   * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
   * var firstOrder = higherOrder.mergeAll(2);
   * firstOrder.subscribe(x => console.log(x));
   *
   * @see {@link combineAll}
   * @see {@link concatAll}
   * @see {@link exhaust}
   * @see {@link merge}
   * @see {@link mergeMap}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   * @see {@link switch}
   * @see {@link zipAll}
   *
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits values coming from all the
   * inner Observables emitted by the source Observable.
   * @method mergeAll
   * @owner Observable
   */
  function mergeAll(concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return mergeAll_1.mergeAll(concurrent)(this);
  }
  exports.mergeAll = mergeAll;
  
  });
  
  unwrapExports(mergeAll_2$1);
  var mergeAll_3 = mergeAll_2$1.mergeAll;
  
  var mergeAll$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.mergeAll = mergeAll_2$1.mergeAll;
  
  });
  
  unwrapExports(mergeAll$2);
  
  var mergeMap_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link mergeAll}.</span>
   *
   * <img src="./img/mergeMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an Observable, and then merging those resulting Observables and
   * emitting the results of this merger.
   *
   * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
   * var letters = Rx.Observable.of('a', 'b', 'c');
   * var result = letters.mergeMap(x =>
   *   Rx.Observable.interval(1000).map(i => x+i)
   * );
   * result.subscribe(x => console.log(x));
   *
   * // Results in the following:
   * // a0
   * // b0
   * // c0
   * // a1
   * // b1
   * // c1
   * // continues to list a,b,c with respective ascending integers
   *
   * @see {@link concatMap}
   * @see {@link exhaustMap}
   * @see {@link merge}
   * @see {@link mergeAll}
   * @see {@link mergeMapTo}
   * @see {@link mergeScan}
   * @see {@link switchMap}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and merging the results of the Observables obtained
   * from this transformation.
   * @method mergeMap
   * @owner Observable
   */
  function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return mergeMap_1.mergeMap(project, resultSelector, concurrent)(this);
  }
  exports.mergeMap = mergeMap;
  
  });
  
  unwrapExports(mergeMap_2$1);
  var mergeMap_3$1 = mergeMap_2$1.mergeMap;
  
  var mergeMap$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.mergeMap = mergeMap_2$1.mergeMap;
  Observable_1.Observable.prototype.flatMap = mergeMap_2$1.mergeMap;
  
  });
  
  unwrapExports(mergeMap$2);
  
  var mergeMapTo_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is merged multiple
   * times in the output Observable.
   *
   * <span class="informal">It's like {@link mergeMap}, but maps each value always
   * to the same inner Observable.</span>
   *
   * <img src="./img/mergeMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then merges those resulting Observables into one
   * single Observable, which is the output Observable.
   *
   * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMapTo}
   * @see {@link merge}
   * @see {@link mergeAll}
   * @see {@link mergeMap}
   * @see {@link mergeScan}
   * @see {@link switchMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits items from the given
   * `innerObservable` (and optionally transformed through `resultSelector`) every
   * time a value is emitted on the source Observable.
   * @method mergeMapTo
   * @owner Observable
   */
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      if (typeof resultSelector === 'number') {
          concurrent = resultSelector;
          resultSelector = null;
      }
      return function (source) { return source.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent)); };
  }
  exports.mergeMapTo = mergeMapTo;
  // TODO: Figure out correct signature here: an Operator<Observable<T>, R>
  //       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
  var MergeMapToOperator = /** @class */ (function () {
      function MergeMapToOperator(ish, resultSelector, concurrent) {
          if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
          this.ish = ish;
          this.resultSelector = resultSelector;
          this.concurrent = concurrent;
      }
      MergeMapToOperator.prototype.call = function (observer, source) {
          return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
      };
      return MergeMapToOperator;
  }());
  exports.MergeMapToOperator = MergeMapToOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MergeMapToSubscriber = /** @class */ (function (_super) {
      __extends(MergeMapToSubscriber, _super);
      function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
          if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
          var _this = _super.call(this, destination) || this;
          _this.ish = ish;
          _this.resultSelector = resultSelector;
          _this.concurrent = concurrent;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
      }
      MergeMapToSubscriber.prototype._next = function (value) {
          if (this.active < this.concurrent) {
              var resultSelector = this.resultSelector;
              var index = this.index++;
              var ish = this.ish;
              var destination = this.destination;
              this.active++;
              this._innerSub(ish, destination, resultSelector, value, index);
          }
          else {
              this.buffer.push(value);
          }
      };
      MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
          this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
      };
      MergeMapToSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
              this.destination.complete();
          }
      };
      MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          if (resultSelector) {
              this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
          }
          else {
              destination.next(innerValue);
          }
      };
      MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          var result;
          try {
              result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          catch (err) {
              destination.error(err);
              return;
          }
          destination.next(result);
      };
      MergeMapToSubscriber.prototype.notifyError = function (err) {
          this.destination.error(err);
      };
      MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer.length > 0) {
              this._next(buffer.shift());
          }
          else if (this.active === 0 && this.hasCompleted) {
              this.destination.complete();
          }
      };
      return MergeMapToSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeMapToSubscriber = MergeMapToSubscriber;
  
  });
  
  unwrapExports(mergeMapTo_1);
  var mergeMapTo_2 = mergeMapTo_1.mergeMapTo;
  var mergeMapTo_3 = mergeMapTo_1.MergeMapToOperator;
  var mergeMapTo_4 = mergeMapTo_1.MergeMapToSubscriber;
  
  var mergeMapTo_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is merged multiple
   * times in the output Observable.
   *
   * <span class="informal">It's like {@link mergeMap}, but maps each value always
   * to the same inner Observable.</span>
   *
   * <img src="./img/mergeMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then merges those resulting Observables into one
   * single Observable, which is the output Observable.
   *
   * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMapTo}
   * @see {@link merge}
   * @see {@link mergeAll}
   * @see {@link mergeMap}
   * @see {@link mergeScan}
   * @see {@link switchMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
   * Observables being subscribed to concurrently.
   * @return {Observable} An Observable that emits items from the given
   * `innerObservable` (and optionally transformed through `resultSelector`) every
   * time a value is emitted on the source Observable.
   * @method mergeMapTo
   * @owner Observable
   */
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return mergeMapTo_1.mergeMapTo(innerObservable, resultSelector, concurrent)(this);
  }
  exports.mergeMapTo = mergeMapTo;
  
  });
  
  unwrapExports(mergeMapTo_2$1);
  var mergeMapTo_3$1 = mergeMapTo_2$1.mergeMapTo;
  
  var mergeMapTo$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.flatMapTo = mergeMapTo_2$1.mergeMapTo;
  Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_2$1.mergeMapTo;
  
  });
  
  unwrapExports(mergeMapTo$2);
  
  var mergeScan_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * Applies an accumulator function over the source Observable where the
   * accumulator function itself returns an Observable, then each intermediate
   * Observable returned is merged into the output Observable.
   *
   * <span class="informal">It's like {@link scan}, but the Observables returned
   * by the accumulator are merged into the outer Observable.</span>
   *
   * @example <caption>Count the number of click events</caption>
   * const click$ = Rx.Observable.fromEvent(document, 'click');
   * const one$ = click$.mapTo(1);
   * const seed = 0;
   * const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
   * count$.subscribe(x => console.log(x));
   *
   * // Results:
   * 1
   * 2
   * 3
   * 4
   * // ...and so on for each click
   *
   * @param {function(acc: R, value: T): Observable<R>} accumulator
   * The accumulator function called on each source value.
   * @param seed The initial accumulation value.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of
   * input Observables being subscribed to concurrently.
   * @return {Observable<R>} An observable of the accumulated values.
   * @method mergeScan
   * @owner Observable
   */
  function mergeScan(accumulator, seed, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return function (source) { return source.lift(new MergeScanOperator(accumulator, seed, concurrent)); };
  }
  exports.mergeScan = mergeScan;
  var MergeScanOperator = /** @class */ (function () {
      function MergeScanOperator(accumulator, seed, concurrent) {
          this.accumulator = accumulator;
          this.seed = seed;
          this.concurrent = concurrent;
      }
      MergeScanOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
      };
      return MergeScanOperator;
  }());
  exports.MergeScanOperator = MergeScanOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var MergeScanSubscriber = /** @class */ (function (_super) {
      __extends(MergeScanSubscriber, _super);
      function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
          var _this = _super.call(this, destination) || this;
          _this.accumulator = accumulator;
          _this.acc = acc;
          _this.concurrent = concurrent;
          _this.hasValue = false;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
      }
      MergeScanSubscriber.prototype._next = function (value) {
          if (this.active < this.concurrent) {
              var index = this.index++;
              var ish = tryCatch_1.tryCatch(this.accumulator)(this.acc, value);
              var destination = this.destination;
              if (ish === errorObject.errorObject) {
                  destination.error(errorObject.errorObject.e);
              }
              else {
                  this.active++;
                  this._innerSub(ish, value, index);
              }
          }
          else {
              this.buffer.push(value);
          }
      };
      MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
          this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
      };
      MergeScanSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
              if (this.hasValue === false) {
                  this.destination.next(this.acc);
              }
              this.destination.complete();
          }
      };
      MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var destination = this.destination;
          this.acc = innerValue;
          this.hasValue = true;
          destination.next(innerValue);
      };
      MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer.length > 0) {
              this._next(buffer.shift());
          }
          else if (this.active === 0 && this.hasCompleted) {
              if (this.hasValue === false) {
                  this.destination.next(this.acc);
              }
              this.destination.complete();
          }
      };
      return MergeScanSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeScanSubscriber = MergeScanSubscriber;
  
  });
  
  unwrapExports(mergeScan_1);
  var mergeScan_2 = mergeScan_1.mergeScan;
  var mergeScan_3 = mergeScan_1.MergeScanOperator;
  var mergeScan_4 = mergeScan_1.MergeScanSubscriber;
  
  var mergeScan_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Applies an accumulator function over the source Observable where the
   * accumulator function itself returns an Observable, then each intermediate
   * Observable returned is merged into the output Observable.
   *
   * <span class="informal">It's like {@link scan}, but the Observables returned
   * by the accumulator are merged into the outer Observable.</span>
   *
   * @example <caption>Count the number of click events</caption>
   * const click$ = Rx.Observable.fromEvent(document, 'click');
   * const one$ = click$.mapTo(1);
   * const seed = 0;
   * const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
   * count$.subscribe(x => console.log(x));
   *
   * // Results:
   * 1
   * 2
   * 3
   * 4
   * // ...and so on for each click
   *
   * @param {function(acc: R, value: T): Observable<R>} accumulator
   * The accumulator function called on each source value.
   * @param seed The initial accumulation value.
   * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of
   * input Observables being subscribed to concurrently.
   * @return {Observable<R>} An observable of the accumulated values.
   * @method mergeScan
   * @owner Observable
   */
  function mergeScan(accumulator, seed, concurrent) {
      if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
      return mergeScan_1.mergeScan(accumulator, seed, concurrent)(this);
  }
  exports.mergeScan = mergeScan;
  
  });
  
  unwrapExports(mergeScan_2$1);
  var mergeScan_3$1 = mergeScan_2$1.mergeScan;
  
  var mergeScan$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.mergeScan = mergeScan_2$1.mergeScan;
  
  });
  
  unwrapExports(mergeScan$2);
  
  var min_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
   * and when source Observable completes it emits a single item: the item with the smallest value.
   *
   * <img src="./img/min.png" width="100%">
   *
   * @example <caption>Get the minimal value of a series of numbers</caption>
   * Rx.Observable.of(5, 4, 7, 2, 8)
   *   .min()
   *   .subscribe(x => console.log(x)); // -> 2
   *
   * @example <caption>Use a comparer function to get the minimal item</caption>
   * interface Person {
   *   age: number,
   *   name: string
   * }
   * Observable.of<Person>({age: 7, name: 'Foo'},
   *                       {age: 5, name: 'Bar'},
   *                       {age: 9, name: 'Beer'})
   *           .min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1)
   *           .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
   * }
   *
   * @see {@link max}
   *
   * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
   * value of two items.
   * @return {Observable<R>} An Observable that emits item with the smallest value.
   * @method min
   * @owner Observable
   */
  function min(comparer) {
      var min = (typeof comparer === 'function')
          ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
          : function (x, y) { return x < y ? x : y; };
      return reduce_1.reduce(min);
  }
  exports.min = min;
  
  });
  
  unwrapExports(min_1);
  var min_2 = min_1.min;
  
  var min_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
   * and when source Observable completes it emits a single item: the item with the smallest value.
   *
   * <img src="./img/min.png" width="100%">
   *
   * @example <caption>Get the minimal value of a series of numbers</caption>
   * Rx.Observable.of(5, 4, 7, 2, 8)
   *   .min()
   *   .subscribe(x => console.log(x)); // -> 2
   *
   * @example <caption>Use a comparer function to get the minimal item</caption>
   * interface Person {
   *   age: number,
   *   name: string
   * }
   * Observable.of<Person>({age: 7, name: 'Foo'},
   *                       {age: 5, name: 'Bar'},
   *                       {age: 9, name: 'Beer'})
   *           .min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1)
   *           .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
   * }
   *
   * @see {@link max}
   *
   * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
   * value of two items.
   * @return {Observable<R>} An Observable that emits item with the smallest value.
   * @method min
   * @owner Observable
   */
  function min(comparer) {
      return min_1.min(comparer)(this);
  }
  exports.min = min;
  
  });
  
  unwrapExports(min_2$1);
  var min_3 = min_2$1.min;
  
  var min$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.min = min_2$1.min;
  
  });
  
  unwrapExports(min$2);
  
  var refCount_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function refCount() {
      return function refCountOperatorFunction(source) {
          return source.lift(new RefCountOperator(source));
      };
  }
  exports.refCount = refCount;
  var RefCountOperator = /** @class */ (function () {
      function RefCountOperator(connectable) {
          this.connectable = connectable;
      }
      RefCountOperator.prototype.call = function (subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
              refCounter.connection = connectable.connect();
          }
          return subscription;
      };
      return RefCountOperator;
  }());
  var RefCountSubscriber = /** @class */ (function (_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      RefCountSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (!connectable) {
              this.connection = null;
              return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
              this.connection = null;
              return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
              this.connection = null;
              return;
          }
          ///
          // Compare the local RefCountSubscriber's connection Subscription to the
          // connection Subscription on the shared ConnectableObservable. In cases
          // where the ConnectableObservable source synchronously emits values, and
          // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
          // execution continues to here before the RefCountOperator has a chance to
          // supply the RefCountSubscriber with the shared connection Subscription.
          // For example:
          // ```
          // Observable.range(0, 10)
          //   .publish()
          //   .refCount()
          //   .take(5)
          //   .subscribe();
          // ```
          // In order to account for this case, RefCountSubscriber should only dispose
          // the ConnectableObservable's shared connection Subscription if the
          // connection Subscription exists, *and* either:
          //   a. RefCountSubscriber doesn't have a reference to the shared connection
          //      Subscription yet, or,
          //   b. RefCountSubscriber's connection Subscription reference is identical
          //      to the shared connection Subscription
          ///
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
              sharedConnection.unsubscribe();
          }
      };
      return RefCountSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(refCount_1);
  var refCount_2 = refCount_1.refCount;
  
  var ConnectableObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /**
   * @class ConnectableObservable<T>
   */
  var ConnectableObservable = /** @class */ (function (_super) {
      __extends(ConnectableObservable, _super);
      function ConnectableObservable(source, subjectFactory) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subjectFactory = subjectFactory;
          _this._refCount = 0;
          _this._isComplete = false;
          return _this;
      }
      ConnectableObservable.prototype._subscribe = function (subscriber) {
          return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable.prototype.getSubject = function () {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
              this._subject = this.subjectFactory();
          }
          return this._subject;
      };
      ConnectableObservable.prototype.connect = function () {
          var connection = this._connection;
          if (!connection) {
              this._isComplete = false;
              connection = this._connection = new Subscription_1.Subscription();
              connection.add(this.source
                  .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
              if (connection.closed) {
                  this._connection = null;
                  connection = Subscription_1.Subscription.EMPTY;
              }
              else {
                  this._connection = connection;
              }
          }
          return connection;
      };
      ConnectableObservable.prototype.refCount = function () {
          return refCount_1.refCount()(this);
      };
      return ConnectableObservable;
  }(Observable_1.Observable));
  exports.ConnectableObservable = ConnectableObservable;
  var connectableProto = ConnectableObservable.prototype;
  exports.connectableObservableDescriptor = {
      operator: { value: null },
      _refCount: { value: 0, writable: true },
      _subject: { value: null, writable: true },
      _connection: { value: null, writable: true },
      _subscribe: { value: connectableProto._subscribe },
      _isComplete: { value: connectableProto._isComplete, writable: true },
      getSubject: { value: connectableProto.getSubject },
      connect: { value: connectableProto.connect },
      refCount: { value: connectableProto.refCount }
  };
  var ConnectableSubscriber = /** @class */ (function (_super) {
      __extends(ConnectableSubscriber, _super);
      function ConnectableSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      ConnectableSubscriber.prototype._error = function (err) {
          this._unsubscribe();
          _super.prototype._error.call(this, err);
      };
      ConnectableSubscriber.prototype._complete = function () {
          this.connectable._isComplete = true;
          this._unsubscribe();
          _super.prototype._complete.call(this);
      };
      ConnectableSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (connectable) {
              this.connectable = null;
              var connection = connectable._connection;
              connectable._refCount = 0;
              connectable._subject = null;
              connectable._connection = null;
              if (connection) {
                  connection.unsubscribe();
              }
          }
      };
      return ConnectableSubscriber;
  }(Subject_1.SubjectSubscriber));
  var RefCountSubscriber = /** @class */ (function (_super) {
      __extends(RefCountSubscriber, _super);
      function RefCountSubscriber(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
      }
      RefCountSubscriber.prototype._unsubscribe = function () {
          var connectable = this.connectable;
          if (!connectable) {
              this.connection = null;
              return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
              this.connection = null;
              return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
              this.connection = null;
              return;
          }
          ///
          // Compare the local RefCountSubscriber's connection Subscription to the
          // connection Subscription on the shared ConnectableObservable. In cases
          // where the ConnectableObservable source synchronously emits values, and
          // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
          // execution continues to here before the RefCountOperator has a chance to
          // supply the RefCountSubscriber with the shared connection Subscription.
          // For example:
          // ```
          // Observable.range(0, 10)
          //   .publish()
          //   .refCount()
          //   .take(5)
          //   .subscribe();
          // ```
          // In order to account for this case, RefCountSubscriber should only dispose
          // the ConnectableObservable's shared connection Subscription if the
          // connection Subscription exists, *and* either:
          //   a. RefCountSubscriber doesn't have a reference to the shared connection
          //      Subscription yet, or,
          //   b. RefCountSubscriber's connection Subscription reference is identical
          //      to the shared connection Subscription
          ///
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
              sharedConnection.unsubscribe();
          }
      };
      return RefCountSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(ConnectableObservable_1);
  var ConnectableObservable_2 = ConnectableObservable_1.ConnectableObservable;
  var ConnectableObservable_3 = ConnectableObservable_1.connectableObservableDescriptor;
  
  var multicast_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits the results of invoking a specified selector on items
   * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
   *
   * <img src="./img/multicast.png" width="100%">
   *
   * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
   * which the source sequence's elements will be multicast to the selector function
   * or Subject to push source elements into.
   * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
   * as many times as needed, without causing multiple subscriptions to the source stream.
   * Subscribers to the given source will receive all notifications of the source from the
   * time of the subscription forward.
   * @return {Observable} An Observable that emits the results of invoking the selector
   * on the items emitted by a `ConnectableObservable` that shares a single subscription to
   * the underlying stream.
   * @method multicast
   * @owner Observable
   */
  function multicast(subjectOrSubjectFactory, selector) {
      return function multicastOperatorFunction(source) {
          var subjectFactory;
          if (typeof subjectOrSubjectFactory === 'function') {
              subjectFactory = subjectOrSubjectFactory;
          }
          else {
              subjectFactory = function subjectFactory() {
                  return subjectOrSubjectFactory;
              };
          }
          if (typeof selector === 'function') {
              return source.lift(new MulticastOperator(subjectFactory, selector));
          }
          var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
          connectable.source = source;
          connectable.subjectFactory = subjectFactory;
          return connectable;
      };
  }
  exports.multicast = multicast;
  var MulticastOperator = /** @class */ (function () {
      function MulticastOperator(subjectFactory, selector) {
          this.subjectFactory = subjectFactory;
          this.selector = selector;
      }
      MulticastOperator.prototype.call = function (subscriber, source) {
          var selector = this.selector;
          var subject = this.subjectFactory();
          var subscription = selector(subject).subscribe(subscriber);
          subscription.add(source.subscribe(subject));
          return subscription;
      };
      return MulticastOperator;
  }());
  exports.MulticastOperator = MulticastOperator;
  
  });
  
  unwrapExports(multicast_1);
  var multicast_2 = multicast_1.multicast;
  var multicast_3 = multicast_1.MulticastOperator;
  
  var multicast_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Allows source Observable to be subscribed only once with a Subject of choice,
   * while still sharing its values between multiple subscribers.
   *
   * <span class="informal">Subscribe to Observable once, but send its values to multiple subscribers.</span>
   *
   * <img src="./img/multicast.png" width="100%">
   *
   * `multicast` is an operator that works in two modes.
   *
   * In the first mode you provide a single argument to it, which can be either an initialized Subject or a Subject
   * factory. As a result you will get a special kind of an Observable - a {@link ConnectableObservable}. It can be
   * subscribed multiple times, just as regular Observable, but it won't subscribe to the source Observable at that
   * moment. It will do it only if you call its `connect` method. This means you can essentially control by hand, when
   * source Observable will be actually subscribed. What is more, ConnectableObservable will share this one subscription
   * between all of its subscribers. This means that, for example, `ajax` Observable will only send a request once,
   * even though usually it would send a request per every subscriber. Since it sends a request at the moment of
   * subscription, here request would be sent when the `connect` method of a ConnectableObservable is called.
   *
   * The most common pattern of using ConnectableObservable is calling `connect` when the first consumer subscribes,
   * keeping the subscription alive while several consumers come and go and finally unsubscribing from the source
   * Observable, when the last consumer unsubscribes. To not implement that logic over and over again,
   * ConnectableObservable has a special operator, `refCount`. When called, it returns an Observable, which will count
   * the number of consumers subscribed to it and keep ConnectableObservable connected as long as there is at least
   * one consumer. So if you don't actually need to decide yourself when to connect and disconnect a
   * ConnectableObservable, use `refCount`.
   *
   * The second mode is invoked by calling `multicast` with an additional, second argument - selector function.
   * This function accepts an Observable - which basically mirrors the source Observable - and returns Observable
   * as well, which should be the input stream modified by any operators you want. Note that in this
   * mode you cannot provide initialized Subject as a first argument - it has to be a Subject factory. If
   * you provide selector function, `multicast` returns just a regular Observable, instead of ConnectableObservable.
   * Thus, as usual, each subscription to this stream triggers subscription to the source Observable. However,
   * if inside the selector function you subscribe to the input Observable multiple times, actual source stream
   * will be subscribed only once. So if you have a chain of operators that use some Observable many times,
   * but you want to subscribe to that Observable only once, this is the mode you would use.
   *
   * Subject provided as a first parameter of `multicast` is used as a proxy for the single subscription to the
   * source Observable. It means that all values from the source stream go through that Subject. Thus, if a Subject
   * has some special properties, Observable returned by `multicast` will have them as well. If you want to use
   * `multicast` with a Subject that is one of the ones included in RxJS by default - {@link Subject},
   * {@link AsyncSubject}, {@link BehaviorSubject}, or {@link ReplaySubject} - simply use {@link publish},
   * {@link publishLast}, {@link publishBehavior} or {@link publishReplay} respectively. These are actually
   * just wrappers around `multicast`, with a specific Subject hardcoded inside.
   *
   * Also, if you use {@link publish} or {@link publishReplay} with a ConnectableObservables `refCount` operator,
   * you can simply use {@link share} and {@link shareReplay} respectively, which chain these two.
   *
   * @example <caption>Use ConnectableObservable</caption>
   * const seconds = Rx.Observable.interval(1000);
   * const connectableSeconds = seconds.multicast(new Subject());
   *
   * connectableSeconds.subscribe(value => console.log('first: ' + value));
   * connectableSeconds.subscribe(value => console.log('second: ' + value));
   *
   * // At this point still nothing happens, even though we subscribed twice.
   *
   * connectableSeconds.connect();
   *
   * // From now on `seconds` are being logged to the console,
   * // twice per every second. `seconds` Observable was however only subscribed once,
   * // so under the hood Observable.interval had only one clock started.
   *
   * @example <caption>Use selector</caption>
   * const seconds = Rx.Observable.interval(1000);
   *
   * seconds
   *     .multicast(
   *         () => new Subject(),
   *         seconds => seconds.zip(seconds) // Usually zip would subscribe to `seconds` twice.
   *                                         // Because we are inside selector, `seconds` is subscribed once,
   *     )                                   // thus starting only one clock used internally by Observable.interval.
   *     .subscribe();
   *
   * @see {@link publish}
   * @see {@link publishLast}
   * @see {@link publishBehavior}
   * @see {@link publishReplay}
   * @see {@link share}
   * @see {@link shareReplay}
   *
   * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate Subject through
   * which the source sequence's elements will be multicast to the selector function input Observable or
   * ConnectableObservable returned by the operator.
   * @param {Function} [selector] - Optional selector function that can use the input stream
   * as many times as needed, without causing multiple subscriptions to the source stream.
   * Subscribers to the input source will receive all notifications of the source from the
   * time of the subscription forward.
   * @return {Observable<T>|ConnectableObservable<T>} An Observable that emits the results of invoking the selector
   * on the source stream or a special {@link ConnectableObservable}, if selector was not provided.
   *
   * @method multicast
   * @owner Observable
   */
  function multicast(subjectOrSubjectFactory, selector) {
      return multicast_1.multicast(subjectOrSubjectFactory, selector)(this);
  }
  exports.multicast = multicast;
  
  });
  
  unwrapExports(multicast_2$1);
  var multicast_3$1 = multicast_2$1.multicast;
  
  var multicast$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.multicast = multicast_2$1.multicast;
  
  });
  
  unwrapExports(multicast$2);
  
  var observeOn_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   *
   * Re-emits all notifications from source Observable with specified scheduler.
   *
   * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
   *
   * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
   * notifications emitted by the source Observable. It might be useful, if you do not have control over
   * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
   *
   * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
   * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
   * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
   * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
   * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
   * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
   * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
   * little bit more, to ensure that they are emitted at expected moments.
   *
   * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
   * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
   * will delay all notifications - including error notifications - while `delay` will pass through error
   * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
   * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
   * for notification emissions in general.
   *
   * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
   * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
   *                                               // with async scheduler by default...
   *
   * intervals
   * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
   * .subscribe(val => {                           // scheduler to ensure smooth animation.
   *   someDiv.style.height = val + 'px';
   * });
   *
   * @see {@link delay}
   *
   * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
   * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
   * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
   * but with provided scheduler.
   *
   * @method observeOn
   * @owner Observable
   */
  function observeOn(scheduler, delay) {
      if (delay === void 0) { delay = 0; }
      return observeOn_1.observeOn(scheduler, delay)(this);
  }
  exports.observeOn = observeOn;
  
  });
  
  unwrapExports(observeOn_2$1);
  var observeOn_3$1 = observeOn_2$1.observeOn;
  
  var observeOn$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.observeOn = observeOn_2$1.observeOn;
  
  });
  
  unwrapExports(observeOn$2);
  
  var onErrorResumeNext_1$1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
   * that was passed.
   *
   * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
   *
   * <img src="./img/onErrorResumeNext.png" width="100%">
   *
   * `onErrorResumeNext` is an operator that accepts a series of Observables, provided either directly as
   * arguments or as an array. If no single Observable is provided, returned Observable will simply behave the same
   * as the source.
   *
   * `onErrorResumeNext` returns an Observable that starts by subscribing and re-emitting values from the source Observable.
   * When its stream of values ends - no matter if Observable completed or emitted an error - `onErrorResumeNext`
   * will subscribe to the first Observable that was passed as an argument to the method. It will start re-emitting
   * its values as well and - again - when that stream ends, `onErrorResumeNext` will proceed to subscribing yet another
   * Observable in provided series, no matter if previous Observable completed or ended with an error. This will
   * be happening until there is no more Observables left in the series, at which point returned Observable will
   * complete - even if the last subscribed stream ended with an error.
   *
   * `onErrorResumeNext` can be therefore thought of as version of {@link concat} operator, which is more permissive
   * when it comes to the errors emitted by its input Observables. While `concat` subscribes to the next Observable
   * in series only if previous one successfully completed, `onErrorResumeNext` subscribes even if it ended with
   * an error.
   *
   * Note that you do not get any access to errors emitted by the Observables. In particular do not
   * expect these errors to appear in error callback passed to {@link subscribe}. If you want to take
   * specific actions based on what error was emitted by an Observable, you should try out {@link catch} instead.
   *
   *
   * @example <caption>Subscribe to the next Observable after map fails</caption>
   * Rx.Observable.of(1, 2, 3, 0)
   *   .map(x => {
   *       if (x === 0) { throw Error(); }
           return 10 / x;
   *   })
   *   .onErrorResumeNext(Rx.Observable.of(1, 2, 3))
   *   .subscribe(
   *     val => console.log(val),
   *     err => console.log(err),          // Will never be called.
   *     () => console.log('that\'s it!')
   *   );
   *
   * // Logs:
   * // 10
   * // 5
   * // 3.3333333333333335
   * // 1
   * // 2
   * // 3
   * // "that's it!"
   *
   * @see {@link concat}
   * @see {@link catch}
   *
   * @param {...ObservableInput} observables Observables passed either directly or as an array.
   * @return {Observable} An Observable that emits values from source Observable, but - if it errors - subscribes
   * to the next passed Observable and so on, until it completes or runs out of Observables.
   * @method onErrorResumeNext
   * @owner Observable
   */
  function onErrorResumeNext() {
      var nextSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          nextSources[_i] = arguments[_i];
      }
      if (nextSources.length === 1 && isArray.isArray(nextSources[0])) {
          nextSources = nextSources[0];
      }
      return function (source) { return source.lift(new OnErrorResumeNextOperator(nextSources)); };
  }
  exports.onErrorResumeNext = onErrorResumeNext;
  /* tslint:enable:max-line-length */
  function onErrorResumeNextStatic() {
      var nextSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          nextSources[_i] = arguments[_i];
      }
      var source = null;
      if (nextSources.length === 1 && isArray.isArray(nextSources[0])) {
          nextSources = nextSources[0];
      }
      source = nextSources.shift();
      return from_1.from(source, null).lift(new OnErrorResumeNextOperator(nextSources));
  }
  exports.onErrorResumeNextStatic = onErrorResumeNextStatic;
  var OnErrorResumeNextOperator = /** @class */ (function () {
      function OnErrorResumeNextOperator(nextSources) {
          this.nextSources = nextSources;
      }
      OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
      };
      return OnErrorResumeNextOperator;
  }());
  var OnErrorResumeNextSubscriber = /** @class */ (function (_super) {
      __extends(OnErrorResumeNextSubscriber, _super);
      function OnErrorResumeNextSubscriber(destination, nextSources) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.nextSources = nextSources;
          return _this;
      }
      OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
          this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
          this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype._error = function (err) {
          this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype._complete = function () {
          this.subscribeToNextSource();
      };
      OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
          var next = this.nextSources.shift();
          if (next) {
              this.add(subscribeToResult_1.subscribeToResult(this, next));
          }
          else {
              this.destination.complete();
          }
      };
      return OnErrorResumeNextSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(onErrorResumeNext_1$1);
  var onErrorResumeNext_2$1 = onErrorResumeNext_1$1.onErrorResumeNext;
  var onErrorResumeNext_3 = onErrorResumeNext_1$1.onErrorResumeNextStatic;
  
  var onErrorResumeNext_2$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
   * that was passed.
   *
   * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
   *
   * <img src="./img/onErrorResumeNext.png" width="100%">
   *
   * `onErrorResumeNext` is an operator that accepts a series of Observables, provided either directly as
   * arguments or as an array. If no single Observable is provided, returned Observable will simply behave the same
   * as the source.
   *
   * `onErrorResumeNext` returns an Observable that starts by subscribing and re-emitting values from the source Observable.
   * When its stream of values ends - no matter if Observable completed or emitted an error - `onErrorResumeNext`
   * will subscribe to the first Observable that was passed as an argument to the method. It will start re-emitting
   * its values as well and - again - when that stream ends, `onErrorResumeNext` will proceed to subscribing yet another
   * Observable in provided series, no matter if previous Observable completed or ended with an error. This will
   * be happening until there is no more Observables left in the series, at which point returned Observable will
   * complete - even if the last subscribed stream ended with an error.
   *
   * `onErrorResumeNext` can be therefore thought of as version of {@link concat} operator, which is more permissive
   * when it comes to the errors emitted by its input Observables. While `concat` subscribes to the next Observable
   * in series only if previous one successfully completed, `onErrorResumeNext` subscribes even if it ended with
   * an error.
   *
   * Note that you do not get any access to errors emitted by the Observables. In particular do not
   * expect these errors to appear in error callback passed to {@link subscribe}. If you want to take
   * specific actions based on what error was emitted by an Observable, you should try out {@link catch} instead.
   *
   *
   * @example <caption>Subscribe to the next Observable after map fails</caption>
   * Rx.Observable.of(1, 2, 3, 0)
   *   .map(x => {
   *       if (x === 0) { throw Error(); }
           return 10 / x;
   *   })
   *   .onErrorResumeNext(Rx.Observable.of(1, 2, 3))
   *   .subscribe(
   *     val => console.log(val),
   *     err => console.log(err),          // Will never be called.
   *     () => console.log('that\'s it!')
   *   );
   *
   * // Logs:
   * // 10
   * // 5
   * // 3.3333333333333335
   * // 1
   * // 2
   * // 3
   * // "that's it!"
   *
   * @see {@link concat}
   * @see {@link catch}
   *
   * @param {...ObservableInput} observables Observables passed either directly or as an array.
   * @return {Observable} An Observable that emits values from source Observable, but - if it errors - subscribes
   * to the next passed Observable and so on, until it completes or runs out of Observables.
   * @method onErrorResumeNext
   * @owner Observable
   */
  function onErrorResumeNext() {
      var nextSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          nextSources[_i] = arguments[_i];
      }
      return onErrorResumeNext_1$1.onErrorResumeNext.apply(void 0, nextSources)(this);
  }
  exports.onErrorResumeNext = onErrorResumeNext;
  
  });
  
  unwrapExports(onErrorResumeNext_2$2);
  var onErrorResumeNext_3$1 = onErrorResumeNext_2$2.onErrorResumeNext;
  
  var onErrorResumeNext$5 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.onErrorResumeNext = onErrorResumeNext_2$2.onErrorResumeNext;
  
  });
  
  unwrapExports(onErrorResumeNext$5);
  
  var pairwise_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Groups pairs of consecutive emissions together and emits them as an array of
   * two values.
   *
   * <span class="informal">Puts the current value and previous value together as
   * an array, and emits that.</span>
   *
   * <img src="./img/pairwise.png" width="100%">
   *
   * The Nth emission from the source Observable will cause the output Observable
   * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
   * pair. For this reason, `pairwise` emits on the second and subsequent
   * emissions from the source Observable, but not on the first emission, because
   * there is no previous value in that case.
   *
   * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var pairs = clicks.pairwise();
   * var distance = pairs.map(pair => {
   *   var x0 = pair[0].clientX;
   *   var y0 = pair[0].clientY;
   *   var x1 = pair[1].clientX;
   *   var y1 = pair[1].clientY;
   *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
   * });
   * distance.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   *
   * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
   * consecutive values from the source Observable.
   * @method pairwise
   * @owner Observable
   */
  function pairwise() {
      return function (source) { return source.lift(new PairwiseOperator()); };
  }
  exports.pairwise = pairwise;
  var PairwiseOperator = /** @class */ (function () {
      function PairwiseOperator() {
      }
      PairwiseOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new PairwiseSubscriber(subscriber));
      };
      return PairwiseOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var PairwiseSubscriber = /** @class */ (function (_super) {
      __extends(PairwiseSubscriber, _super);
      function PairwiseSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasPrev = false;
          return _this;
      }
      PairwiseSubscriber.prototype._next = function (value) {
          if (this.hasPrev) {
              this.destination.next([this.prev, value]);
          }
          else {
              this.hasPrev = true;
          }
          this.prev = value;
      };
      return PairwiseSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(pairwise_1);
  var pairwise_2 = pairwise_1.pairwise;
  
  var pairwise_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Groups pairs of consecutive emissions together and emits them as an array of
   * two values.
   *
   * <span class="informal">Puts the current value and previous value together as
   * an array, and emits that.</span>
   *
   * <img src="./img/pairwise.png" width="100%">
   *
   * The Nth emission from the source Observable will cause the output Observable
   * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
   * pair. For this reason, `pairwise` emits on the second and subsequent
   * emissions from the source Observable, but not on the first emission, because
   * there is no previous value in that case.
   *
   * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var pairs = clicks.pairwise();
   * var distance = pairs.map(pair => {
   *   var x0 = pair[0].clientX;
   *   var y0 = pair[0].clientY;
   *   var x1 = pair[1].clientX;
   *   var y1 = pair[1].clientY;
   *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
   * });
   * distance.subscribe(x => console.log(x));
   *
   * @see {@link buffer}
   * @see {@link bufferCount}
   *
   * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
   * consecutive values from the source Observable.
   * @method pairwise
   * @owner Observable
   */
  function pairwise() {
      return pairwise_1.pairwise()(this);
  }
  exports.pairwise = pairwise;
  
  });
  
  unwrapExports(pairwise_2$1);
  var pairwise_3 = pairwise_2$1.pairwise;
  
  var pairwise$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.pairwise = pairwise_2$1.pairwise;
  
  });
  
  unwrapExports(pairwise$2);
  
  var not_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function not(pred, thisArg) {
      function notPred() {
          return !(notPred.pred.apply(notPred.thisArg, arguments));
      }
      notPred.pred = pred;
      notPred.thisArg = thisArg;
      return notPred;
  }
  exports.not = not;
  
  });
  
  unwrapExports(not_1);
  var not_2 = not_1.not;
  
  var partition_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Splits the source Observable into two, one with values that satisfy a
   * predicate, and another with values that don't satisfy the predicate.
   *
   * <span class="informal">It's like {@link filter}, but returns two Observables:
   * one like the output of {@link filter}, and the other with values that did not
   * pass the condition.</span>
   *
   * <img src="./img/partition.png" width="100%">
   *
   * `partition` outputs an array with two Observables that partition the values
   * from the source Observable through the given `predicate` function. The first
   * Observable in that array emits source values for which the predicate argument
   * returns true. The second Observable emits source values for which the
   * predicate returns false. The first behaves like {@link filter} and the second
   * behaves like {@link filter} with the predicate negated.
   *
   * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
   * var clicksOnDivs = parts[0];
   * var clicksElsewhere = parts[1];
   * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
   * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
   *
   * @see {@link filter}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates each value emitted by the source Observable. If it returns `true`,
   * the value is emitted on the first Observable in the returned array, if
   * `false` the value is emitted on the second Observable in the array. The
   * `index` parameter is the number `i` for the i-th source emission that has
   * happened since the subscription, starting from the number `0`.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
   * with values that passed the predicate, and another with values that did not
   * pass the predicate.
   * @method partition
   * @owner Observable
   */
  function partition(predicate, thisArg) {
      return function (source) { return [
          filter_1.filter(predicate, thisArg)(source),
          filter_1.filter(not_1.not(predicate, thisArg))(source)
      ]; };
  }
  exports.partition = partition;
  
  });
  
  unwrapExports(partition_1);
  var partition_2 = partition_1.partition;
  
  var partition_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Splits the source Observable into two, one with values that satisfy a
   * predicate, and another with values that don't satisfy the predicate.
   *
   * <span class="informal">It's like {@link filter}, but returns two Observables:
   * one like the output of {@link filter}, and the other with values that did not
   * pass the condition.</span>
   *
   * <img src="./img/partition.png" width="100%">
   *
   * `partition` outputs an array with two Observables that partition the values
   * from the source Observable through the given `predicate` function. The first
   * Observable in that array emits source values for which the predicate argument
   * returns true. The second Observable emits source values for which the
   * predicate returns false. The first behaves like {@link filter} and the second
   * behaves like {@link filter} with the predicate negated.
   *
   * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
   * var clicksOnDivs = parts[0];
   * var clicksElsewhere = parts[1];
   * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
   * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
   *
   * @see {@link filter}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates each value emitted by the source Observable. If it returns `true`,
   * the value is emitted on the first Observable in the returned array, if
   * `false` the value is emitted on the second Observable in the array. The
   * `index` parameter is the number `i` for the i-th source emission that has
   * happened since the subscription, starting from the number `0`.
   * @param {any} [thisArg] An optional argument to determine the value of `this`
   * in the `predicate` function.
   * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
   * with values that passed the predicate, and another with values that did not
   * pass the predicate.
   * @method partition
   * @owner Observable
   */
  function partition(predicate, thisArg) {
      return partition_1.partition(predicate, thisArg)(this);
  }
  exports.partition = partition;
  
  });
  
  unwrapExports(partition_2$1);
  var partition_3 = partition_2$1.partition;
  
  var partition$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.partition = partition_2$1.partition;
  
  });
  
  unwrapExports(partition$2);
  
  var pluck_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Maps each source value (an object) to its specified nested property.
   *
   * <span class="informal">Like {@link map}, but meant only for picking one of
   * the nested properties of every emitted object.</span>
   *
   * <img src="./img/pluck.png" width="100%">
   *
   * Given a list of strings describing a path to an object property, retrieves
   * the value of a specified nested property from all values in the source
   * Observable. If a property can't be resolved, it will return `undefined` for
   * that value.
   *
   * @example <caption>Map every click to the tagName of the clicked target element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var tagNames = clicks.pluck('target', 'tagName');
   * tagNames.subscribe(x => console.log(x));
   *
   * @see {@link map}
   *
   * @param {...string} properties The nested properties to pluck from each source
   * value (an object).
   * @return {Observable} A new Observable of property values from the source values.
   * @method pluck
   * @owner Observable
   */
  function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          properties[_i] = arguments[_i];
      }
      var length = properties.length;
      if (length === 0) {
          throw new Error('list of properties cannot be empty.');
      }
      return function (source) { return map_1.map(plucker(properties, length))(source); };
  }
  exports.pluck = pluck;
  function plucker(props, length) {
      var mapper = function (x) {
          var currentProp = x;
          for (var i = 0; i < length; i++) {
              var p = currentProp[props[i]];
              if (typeof p !== 'undefined') {
                  currentProp = p;
              }
              else {
                  return undefined;
              }
          }
          return currentProp;
      };
      return mapper;
  }
  
  });
  
  unwrapExports(pluck_1);
  var pluck_2 = pluck_1.pluck;
  
  var pluck_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Maps each source value (an object) to its specified nested property.
   *
   * <span class="informal">Like {@link map}, but meant only for picking one of
   * the nested properties of every emitted object.</span>
   *
   * <img src="./img/pluck.png" width="100%">
   *
   * Given a list of strings describing a path to an object property, retrieves
   * the value of a specified nested property from all values in the source
   * Observable. If a property can't be resolved, it will return `undefined` for
   * that value.
   *
   * @example <caption>Map every click to the tagName of the clicked target element</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var tagNames = clicks.pluck('target', 'tagName');
   * tagNames.subscribe(x => console.log(x));
   *
   * @see {@link map}
   *
   * @param {...string} properties The nested properties to pluck from each source
   * value (an object).
   * @return {Observable} A new Observable of property values from the source values.
   * @method pluck
   * @owner Observable
   */
  function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          properties[_i] = arguments[_i];
      }
      return pluck_1.pluck.apply(void 0, properties)(this);
  }
  exports.pluck = pluck;
  
  });
  
  unwrapExports(pluck_2$1);
  var pluck_3 = pluck_2$1.pluck;
  
  var pluck$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.pluck = pluck_2$1.pluck;
  
  });
  
  unwrapExports(pluck$2);
  
  var publish_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
   * before it begins emitting items to those Observers that have subscribed to it.
   *
   * <img src="./img/publish.png" width="100%">
   *
   * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
   * as needed, without causing multiple subscriptions to the source sequence.
   * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
   * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
   * @method publish
   * @owner Observable
   */
  function publish(selector) {
      return selector ?
          multicast_1.multicast(function () { return new Subject_1.Subject(); }, selector) :
          multicast_1.multicast(new Subject_1.Subject());
  }
  exports.publish = publish;
  
  });
  
  unwrapExports(publish_1);
  var publish_2 = publish_1.publish;
  
  var publish_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
   * before it begins emitting items to those Observers that have subscribed to it.
   *
   * <img src="./img/publish.png" width="100%">
   *
   * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
   * as needed, without causing multiple subscriptions to the source sequence.
   * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
   * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
   * @method publish
   * @owner Observable
   */
  function publish(selector) {
      return publish_1.publish(selector)(this);
  }
  exports.publish = publish;
  
  });
  
  unwrapExports(publish_2$1);
  var publish_3 = publish_2$1.publish;
  
  var publish$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.publish = publish_2$1.publish;
  
  });
  
  unwrapExports(publish$2);
  
  var BehaviorSubject_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * @class BehaviorSubject<T>
   */
  var BehaviorSubject = /** @class */ (function (_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
      }
      Object.defineProperty(BehaviorSubject.prototype, "value", {
          get: function () {
              return this.getValue();
          },
          enumerable: true,
          configurable: true
      });
      BehaviorSubject.prototype._subscribe = function (subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          if (subscription && !subscription.closed) {
              subscriber.next(this._value);
          }
          return subscription;
      };
      BehaviorSubject.prototype.getValue = function () {
          if (this.hasError) {
              throw this.thrownError;
          }
          else if (this.closed) {
              throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          else {
              return this._value;
          }
      };
      BehaviorSubject.prototype.next = function (value) {
          _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject;
  }(Subject_1.Subject));
  exports.BehaviorSubject = BehaviorSubject;
  
  });
  
  unwrapExports(BehaviorSubject_1);
  var BehaviorSubject_2 = BehaviorSubject_1.BehaviorSubject;
  
  var publishBehavior_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * @param value
   * @return {ConnectableObservable<T>}
   * @method publishBehavior
   * @owner Observable
   */
  function publishBehavior(value) {
      return function (source) { return multicast_1.multicast(new BehaviorSubject_1.BehaviorSubject(value))(source); };
  }
  exports.publishBehavior = publishBehavior;
  
  });
  
  unwrapExports(publishBehavior_1);
  var publishBehavior_2 = publishBehavior_1.publishBehavior;
  
  var publishBehavior_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * @param value
   * @return {ConnectableObservable<T>}
   * @method publishBehavior
   * @owner Observable
   */
  function publishBehavior(value) {
      return publishBehavior_1.publishBehavior(value)(this);
  }
  exports.publishBehavior = publishBehavior;
  
  });
  
  unwrapExports(publishBehavior_2$1);
  var publishBehavior_3 = publishBehavior_2$1.publishBehavior;
  
  var publishBehavior$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.publishBehavior = publishBehavior_2$1.publishBehavior;
  
  });
  
  unwrapExports(publishBehavior$2);
  
  var publishReplay_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
      if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
          scheduler = selectorOrScheduler;
      }
      var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
      var subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
      return function (source) { return multicast_1.multicast(function () { return subject; }, selector)(source); };
  }
  exports.publishReplay = publishReplay;
  
  });
  
  unwrapExports(publishReplay_1);
  var publishReplay_2 = publishReplay_1.publishReplay;
  
  var publishReplay_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * @param bufferSize
   * @param windowTime
   * @param selectorOrScheduler
   * @param scheduler
   * @return {Observable<T> | ConnectableObservable<T>}
   * @method publishReplay
   * @owner Observable
   */
  function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
      return publishReplay_1.publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler)(this);
  }
  exports.publishReplay = publishReplay;
  
  });
  
  unwrapExports(publishReplay_2$1);
  var publishReplay_3 = publishReplay_2$1.publishReplay;
  
  var publishReplay$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.publishReplay = publishReplay_2$1.publishReplay;
  
  });
  
  unwrapExports(publishReplay$2);
  
  var publishLast_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  function publishLast() {
      return function (source) { return multicast_1.multicast(new AsyncSubject_1.AsyncSubject())(source); };
  }
  exports.publishLast = publishLast;
  
  });
  
  unwrapExports(publishLast_1);
  var publishLast_2 = publishLast_1.publishLast;
  
  var publishLast_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * @return {ConnectableObservable<T>}
   * @method publishLast
   * @owner Observable
   */
  function publishLast() {
      //TODO(benlesh): correct type-flow through here.
      return publishLast_1.publishLast()(this);
  }
  exports.publishLast = publishLast;
  
  });
  
  unwrapExports(publishLast_2$1);
  var publishLast_3 = publishLast_2$1.publishLast;
  
  var publishLast$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.publishLast = publishLast_2$1.publishLast;
  
  });
  
  unwrapExports(publishLast$2);
  
  var race_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that mirrors the first source Observable to emit an item
   * from the combination of this Observable and supplied Observables.
   * @param {...Observables} ...observables Sources used to race for which Observable emits first.
   * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
   * @method race
   * @owner Observable
   */
  function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return function raceOperatorFunction(source) {
          // if the only argument is an array, it was most likely called with
          // `pair([obs1, obs2, ...])`
          if (observables.length === 1 && isArray.isArray(observables[0])) {
              observables = observables[0];
          }
          return source.lift.call(race_1.race.apply(void 0, [source].concat(observables)));
      };
  }
  exports.race = race;
  
  });
  
  unwrapExports(race_2$1);
  var race_3$1 = race_2$1.race;
  
  var race_3$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  // NOTE: to support backwards compatability with 5.4.* and lower
  
  exports.raceStatic = race_1.race;
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that mirrors the first source Observable to emit an item
   * from the combination of this Observable and supplied Observables.
   * @param {...Observables} ...observables Sources used to race for which Observable emits first.
   * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
   * @method race
   * @owner Observable
   */
  function race() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return race_2$1.race.apply(void 0, observables)(this);
  }
  exports.race = race;
  
  });
  
  unwrapExports(race_3$2);
  var race_4$1 = race_3$2.raceStatic;
  var race_5 = race_3$2.race;
  
  var race$5 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.race = race_3$2.race;
  
  });
  
  unwrapExports(race$5);
  
  var reduce_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Applies an accumulator function over the source Observable, and returns the
   * accumulated result when the source completes, given an optional seed value.
   *
   * <span class="informal">Combines together all values emitted on the source,
   * using an accumulator function that knows how to join a new source value into
   * the accumulation from the past.</span>
   *
   * <img src="./img/reduce.png" width="100%">
   *
   * Like
   * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
   * `reduce` applies an `accumulator` function against an accumulation and each
   * value of the source Observable (from the past) to reduce it to a single
   * value, emitted on the output Observable. Note that `reduce` will only emit
   * one value, only when the source Observable completes. It is equivalent to
   * applying operator {@link scan} followed by operator {@link last}.
   *
   * Returns an Observable that applies a specified `accumulator` function to each
   * item emitted by the source Observable. If a `seed` value is specified, then
   * that value will be used as the initial value for the accumulator. If no seed
   * value is specified, the first item of the source is used as the seed.
   *
   * @example <caption>Count the number of click events that happened in 5 seconds</caption>
   * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
   *   .takeUntil(Rx.Observable.interval(5000));
   * var ones = clicksInFiveSeconds.mapTo(1);
   * var seed = 0;
   * var count = ones.reduce((acc, one) => acc + one, seed);
   * count.subscribe(x => console.log(x));
   *
   * @see {@link count}
   * @see {@link expand}
   * @see {@link mergeScan}
   * @see {@link scan}
   *
   * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
   * called on each source value.
   * @param {R} [seed] The initial accumulation value.
   * @return {Observable<R>} An Observable that emits a single value that is the
   * result of accumulating the values emitted by the source Observable.
   * @method reduce
   * @owner Observable
   */
  function reduce(accumulator, seed) {
      // providing a seed of `undefined` *should* be valid and trigger
      // hasSeed! so don't use `seed !== undefined` checks!
      // For this reason, we have to check it here at the original call site
      // otherwise inside Operator/Subscriber we won't know if `undefined`
      // means they didn't provide anything or if they literally provided `undefined`
      if (arguments.length >= 2) {
          return reduce_1.reduce(accumulator, seed)(this);
      }
      return reduce_1.reduce(accumulator)(this);
  }
  exports.reduce = reduce;
  
  });
  
  unwrapExports(reduce_2$1);
  var reduce_3 = reduce_2$1.reduce;
  
  var reduce$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.reduce = reduce_2$1.reduce;
  
  });
  
  unwrapExports(reduce$2);
  
  var repeat_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
   *
   * <img src="./img/repeat.png" width="100%">
   *
   * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
   * an empty Observable.
   * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
   * count times.
   * @method repeat
   * @owner Observable
   */
  function repeat(count) {
      if (count === void 0) { count = -1; }
      return function (source) {
          if (count === 0) {
              return empty_1.empty();
          }
          else if (count < 0) {
              return source.lift(new RepeatOperator(-1, source));
          }
          else {
              return source.lift(new RepeatOperator(count - 1, source));
          }
      };
  }
  exports.repeat = repeat;
  var RepeatOperator = /** @class */ (function () {
      function RepeatOperator(count, source) {
          this.count = count;
          this.source = source;
      }
      RepeatOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
      };
      return RepeatOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var RepeatSubscriber = /** @class */ (function (_super) {
      __extends(RepeatSubscriber, _super);
      function RepeatSubscriber(destination, count, source) {
          var _this = _super.call(this, destination) || this;
          _this.count = count;
          _this.source = source;
          return _this;
      }
      RepeatSubscriber.prototype.complete = function () {
          if (!this.isStopped) {
              var _a = this, source = _a.source, count = _a.count;
              if (count === 0) {
                  return _super.prototype.complete.call(this);
              }
              else if (count > -1) {
                  this.count = count - 1;
              }
              source.subscribe(this._unsubscribeAndRecycle());
          }
      };
      return RepeatSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(repeat_1);
  var repeat_2 = repeat_1.repeat;
  
  var repeat_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
   *
   * <img src="./img/repeat.png" width="100%">
   *
   * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
   * an empty Observable.
   * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
   * count times.
   * @method repeat
   * @owner Observable
   */
  function repeat(count) {
      if (count === void 0) { count = -1; }
      return repeat_1.repeat(count)(this);
  }
  exports.repeat = repeat;
  
  });
  
  unwrapExports(repeat_2$1);
  var repeat_3 = repeat_2$1.repeat;
  
  var repeat$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.repeat = repeat_2$1.repeat;
  
  });
  
  unwrapExports(repeat$2);
  
  var repeatWhen_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
   * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
   * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
   * this method will resubscribe to the source Observable.
   *
   * <img src="./img/repeatWhen.png" width="100%">
   *
   * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
   * which a user can `complete` or `error`, aborting the repetition.
   * @return {Observable} The source Observable modified with repeat logic.
   * @method repeatWhen
   * @owner Observable
   */
  function repeatWhen(notifier) {
      return function (source) { return source.lift(new RepeatWhenOperator(notifier)); };
  }
  exports.repeatWhen = repeatWhen;
  var RepeatWhenOperator = /** @class */ (function () {
      function RepeatWhenOperator(notifier) {
          this.notifier = notifier;
      }
      RepeatWhenOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
      };
      return RepeatWhenOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var RepeatWhenSubscriber = /** @class */ (function (_super) {
      __extends(RepeatWhenSubscriber, _super);
      function RepeatWhenSubscriber(destination, notifier, source) {
          var _this = _super.call(this, destination) || this;
          _this.notifier = notifier;
          _this.source = source;
          _this.sourceIsBeingSubscribedTo = true;
          return _this;
      }
      RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.sourceIsBeingSubscribedTo = true;
          this.source.subscribe(this);
      };
      RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
          if (this.sourceIsBeingSubscribedTo === false) {
              return _super.prototype.complete.call(this);
          }
      };
      RepeatWhenSubscriber.prototype.complete = function () {
          this.sourceIsBeingSubscribedTo = false;
          if (!this.isStopped) {
              if (!this.retries) {
                  this.subscribeToRetries();
              }
              else if (this.retriesSubscription.closed) {
                  return _super.prototype.complete.call(this);
              }
              this._unsubscribeAndRecycle();
              this.notifications.next();
          }
      };
      RepeatWhenSubscriber.prototype._unsubscribe = function () {
          var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
          if (notifications) {
              notifications.unsubscribe();
              this.notifications = null;
          }
          if (retriesSubscription) {
              retriesSubscription.unsubscribe();
              this.retriesSubscription = null;
          }
          this.retries = null;
      };
      RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
          var _a = this, notifications = _a.notifications, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
          this.notifications = null;
          this.retries = null;
          this.retriesSubscription = null;
          _super.prototype._unsubscribeAndRecycle.call(this);
          this.notifications = notifications;
          this.retries = retries;
          this.retriesSubscription = retriesSubscription;
          return this;
      };
      RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
          this.notifications = new Subject_1.Subject();
          var retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
          if (retries === errorObject.errorObject) {
              return _super.prototype.complete.call(this);
          }
          this.retries = retries;
          this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
      };
      return RepeatWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(repeatWhen_1);
  var repeatWhen_2 = repeatWhen_1.repeatWhen;
  
  var repeatWhen_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
   * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
   * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
   * this method will resubscribe to the source Observable.
   *
   * <img src="./img/repeatWhen.png" width="100%">
   *
   * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
   * which a user can `complete` or `error`, aborting the repetition.
   * @return {Observable} The source Observable modified with repeat logic.
   * @method repeatWhen
   * @owner Observable
   */
  function repeatWhen(notifier) {
      return repeatWhen_1.repeatWhen(notifier)(this);
  }
  exports.repeatWhen = repeatWhen;
  
  });
  
  unwrapExports(repeatWhen_2$1);
  var repeatWhen_3 = repeatWhen_2$1.repeatWhen;
  
  var repeatWhen$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.repeatWhen = repeatWhen_2$1.repeatWhen;
  
  });
  
  unwrapExports(repeatWhen$2);
  
  var retry_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
   * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
   * as a number parameter) rather than propagating the `error` call.
   *
   * <img src="./img/retry.png" width="100%">
   *
   * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
   * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
   * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
   * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
   * @param {number} count - Number of retry attempts before failing.
   * @return {Observable} The source Observable modified with the retry logic.
   * @method retry
   * @owner Observable
   */
  function retry(count) {
      if (count === void 0) { count = -1; }
      return function (source) { return source.lift(new RetryOperator(count, source)); };
  }
  exports.retry = retry;
  var RetryOperator = /** @class */ (function () {
      function RetryOperator(count, source) {
          this.count = count;
          this.source = source;
      }
      RetryOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
      };
      return RetryOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var RetrySubscriber = /** @class */ (function (_super) {
      __extends(RetrySubscriber, _super);
      function RetrySubscriber(destination, count, source) {
          var _this = _super.call(this, destination) || this;
          _this.count = count;
          _this.source = source;
          return _this;
      }
      RetrySubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var _a = this, source = _a.source, count = _a.count;
              if (count === 0) {
                  return _super.prototype.error.call(this, err);
              }
              else if (count > -1) {
                  this.count = count - 1;
              }
              source.subscribe(this._unsubscribeAndRecycle());
          }
      };
      return RetrySubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(retry_1);
  var retry_2 = retry_1.retry;
  
  var retry_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
   * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
   * as a number parameter) rather than propagating the `error` call.
   *
   * <img src="./img/retry.png" width="100%">
   *
   * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
   * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
   * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
   * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
   * @param {number} count - Number of retry attempts before failing.
   * @return {Observable} The source Observable modified with the retry logic.
   * @method retry
   * @owner Observable
   */
  function retry(count) {
      if (count === void 0) { count = -1; }
      return retry_1.retry(count)(this);
  }
  exports.retry = retry;
  
  });
  
  unwrapExports(retry_2$1);
  var retry_3 = retry_2$1.retry;
  
  var retry$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.retry = retry_2$1.retry;
  
  });
  
  unwrapExports(retry$2);
  
  var retryWhen_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
   * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
   * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
   * subscription. Otherwise this method will resubscribe to the source Observable.
   *
   * <img src="./img/retryWhen.png" width="100%">
   *
   * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
   * user can `complete` or `error`, aborting the retry.
   * @return {Observable} The source Observable modified with retry logic.
   * @method retryWhen
   * @owner Observable
   */
  function retryWhen(notifier) {
      return function (source) { return source.lift(new RetryWhenOperator(notifier, source)); };
  }
  exports.retryWhen = retryWhen;
  var RetryWhenOperator = /** @class */ (function () {
      function RetryWhenOperator(notifier, source) {
          this.notifier = notifier;
          this.source = source;
      }
      RetryWhenOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
      };
      return RetryWhenOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var RetryWhenSubscriber = /** @class */ (function (_super) {
      __extends(RetryWhenSubscriber, _super);
      function RetryWhenSubscriber(destination, notifier, source) {
          var _this = _super.call(this, destination) || this;
          _this.notifier = notifier;
          _this.source = source;
          return _this;
      }
      RetryWhenSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var errors = this.errors;
              var retries = this.retries;
              var retriesSubscription = this.retriesSubscription;
              if (!retries) {
                  errors = new Subject_1.Subject();
                  retries = tryCatch_1.tryCatch(this.notifier)(errors);
                  if (retries === errorObject.errorObject) {
                      return _super.prototype.error.call(this, errorObject.errorObject.e);
                  }
                  retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
              }
              else {
                  this.errors = null;
                  this.retriesSubscription = null;
              }
              this._unsubscribeAndRecycle();
              this.errors = errors;
              this.retries = retries;
              this.retriesSubscription = retriesSubscription;
              errors.next(err);
          }
      };
      RetryWhenSubscriber.prototype._unsubscribe = function () {
          var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
          if (errors) {
              errors.unsubscribe();
              this.errors = null;
          }
          if (retriesSubscription) {
              retriesSubscription.unsubscribe();
              this.retriesSubscription = null;
          }
          this.retries = null;
      };
      RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
          this.errors = null;
          this.retries = null;
          this.retriesSubscription = null;
          this._unsubscribeAndRecycle();
          this.errors = errors;
          this.retries = retries;
          this.retriesSubscription = retriesSubscription;
          this.source.subscribe(this);
      };
      return RetryWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(retryWhen_1);
  var retryWhen_2 = retryWhen_1.retryWhen;
  
  var retryWhen_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
   * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
   * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
   * subscription. Otherwise this method will resubscribe to the source Observable.
   *
   * <img src="./img/retryWhen.png" width="100%">
   *
   * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
   * user can `complete` or `error`, aborting the retry.
   * @return {Observable} The source Observable modified with retry logic.
   * @method retryWhen
   * @owner Observable
   */
  function retryWhen(notifier) {
      return retryWhen_1.retryWhen(notifier)(this);
  }
  exports.retryWhen = retryWhen;
  
  });
  
  unwrapExports(retryWhen_2$1);
  var retryWhen_3 = retryWhen_2$1.retryWhen;
  
  var retryWhen$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.retryWhen = retryWhen_2$1.retryWhen;
  
  });
  
  unwrapExports(retryWhen$2);
  
  var sample_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits the most recently emitted value from the source Observable whenever
   * another Observable, the `notifier`, emits.
   *
   * <span class="informal">It's like {@link sampleTime}, but samples whenever
   * the `notifier` Observable emits something.</span>
   *
   * <img src="./img/sample.png" width="100%">
   *
   * Whenever the `notifier` Observable emits a value or completes, `sample`
   * looks at the source Observable and emits whichever value it has most recently
   * emitted since the previous sampling, unless the source has not emitted
   * anything since the previous sampling. The `notifier` is subscribed to as soon
   * as the output Observable is subscribed.
   *
   * @example <caption>On every click, sample the most recent "seconds" timer</caption>
   * var seconds = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = seconds.sample(clicks);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounce}
   * @see {@link sampleTime}
   * @see {@link throttle}
   *
   * @param {Observable<any>} notifier The Observable to use for sampling the
   * source Observable.
   * @return {Observable<T>} An Observable that emits the results of sampling the
   * values emitted by the source Observable whenever the notifier Observable
   * emits value or completes.
   * @method sample
   * @owner Observable
   */
  function sample(notifier) {
      return function (source) { return source.lift(new SampleOperator(notifier)); };
  }
  exports.sample = sample;
  var SampleOperator = /** @class */ (function () {
      function SampleOperator(notifier) {
          this.notifier = notifier;
      }
      SampleOperator.prototype.call = function (subscriber, source) {
          var sampleSubscriber = new SampleSubscriber(subscriber);
          var subscription = source.subscribe(sampleSubscriber);
          subscription.add(subscribeToResult_1.subscribeToResult(sampleSubscriber, this.notifier));
          return subscription;
      };
      return SampleOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SampleSubscriber = /** @class */ (function (_super) {
      __extends(SampleSubscriber, _super);
      function SampleSubscriber() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.hasValue = false;
          return _this;
      }
      SampleSubscriber.prototype._next = function (value) {
          this.value = value;
          this.hasValue = true;
      };
      SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.emitValue();
      };
      SampleSubscriber.prototype.notifyComplete = function () {
          this.emitValue();
      };
      SampleSubscriber.prototype.emitValue = function () {
          if (this.hasValue) {
              this.hasValue = false;
              this.destination.next(this.value);
          }
      };
      return SampleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(sample_1);
  var sample_2 = sample_1.sample;
  
  var sample_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits the most recently emitted value from the source Observable whenever
   * another Observable, the `notifier`, emits.
   *
   * <span class="informal">It's like {@link sampleTime}, but samples whenever
   * the `notifier` Observable emits something.</span>
   *
   * <img src="./img/sample.png" width="100%">
   *
   * Whenever the `notifier` Observable emits a value or completes, `sample`
   * looks at the source Observable and emits whichever value it has most recently
   * emitted since the previous sampling, unless the source has not emitted
   * anything since the previous sampling. The `notifier` is subscribed to as soon
   * as the output Observable is subscribed.
   *
   * @example <caption>On every click, sample the most recent "seconds" timer</caption>
   * var seconds = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = seconds.sample(clicks);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounce}
   * @see {@link sampleTime}
   * @see {@link throttle}
   *
   * @param {Observable<any>} notifier The Observable to use for sampling the
   * source Observable.
   * @return {Observable<T>} An Observable that emits the results of sampling the
   * values emitted by the source Observable whenever the notifier Observable
   * emits value or completes.
   * @method sample
   * @owner Observable
   */
  function sample(notifier) {
      return sample_1.sample(notifier)(this);
  }
  exports.sample = sample;
  
  });
  
  unwrapExports(sample_2$1);
  var sample_3 = sample_2$1.sample;
  
  var sample$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.sample = sample_2$1.sample;
  
  });
  
  unwrapExports(sample$2);
  
  var sampleTime_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits the most recently emitted value from the source Observable within
   * periodic time intervals.
   *
   * <span class="informal">Samples the source Observable at periodic time
   * intervals, emitting what it samples.</span>
   *
   * <img src="./img/sampleTime.png" width="100%">
   *
   * `sampleTime` periodically looks at the source Observable and emits whichever
   * value it has most recently emitted since the previous sampling, unless the
   * source has not emitted anything since the previous sampling. The sampling
   * happens periodically in time every `period` milliseconds (or the time unit
   * defined by the optional `scheduler` argument). The sampling starts as soon as
   * the output Observable is subscribed.
   *
   * @example <caption>Every second, emit the most recent click at most once</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.sampleTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sample}
   * @see {@link throttleTime}
   *
   * @param {number} period The sampling period expressed in milliseconds or the
   * time unit determined internally by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the sampling.
   * @return {Observable<T>} An Observable that emits the results of sampling the
   * values emitted by the source Observable at the specified time interval.
   * @method sampleTime
   * @owner Observable
   */
  function sampleTime(period, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return function (source) { return source.lift(new SampleTimeOperator(period, scheduler)); };
  }
  exports.sampleTime = sampleTime;
  var SampleTimeOperator = /** @class */ (function () {
      function SampleTimeOperator(period, scheduler) {
          this.period = period;
          this.scheduler = scheduler;
      }
      SampleTimeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
      };
      return SampleTimeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SampleTimeSubscriber = /** @class */ (function (_super) {
      __extends(SampleTimeSubscriber, _super);
      function SampleTimeSubscriber(destination, period, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.period = period;
          _this.scheduler = scheduler;
          _this.hasValue = false;
          _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
          return _this;
      }
      SampleTimeSubscriber.prototype._next = function (value) {
          this.lastValue = value;
          this.hasValue = true;
      };
      SampleTimeSubscriber.prototype.notifyNext = function () {
          if (this.hasValue) {
              this.hasValue = false;
              this.destination.next(this.lastValue);
          }
      };
      return SampleTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNotification(state) {
      var subscriber = state.subscriber, period = state.period;
      subscriber.notifyNext();
      this.schedule(state, period);
  }
  
  });
  
  unwrapExports(sampleTime_1);
  var sampleTime_2 = sampleTime_1.sampleTime;
  
  var sampleTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits the most recently emitted value from the source Observable within
   * periodic time intervals.
   *
   * <span class="informal">Samples the source Observable at periodic time
   * intervals, emitting what it samples.</span>
   *
   * <img src="./img/sampleTime.png" width="100%">
   *
   * `sampleTime` periodically looks at the source Observable and emits whichever
   * value it has most recently emitted since the previous sampling, unless the
   * source has not emitted anything since the previous sampling. The sampling
   * happens periodically in time every `period` milliseconds (or the time unit
   * defined by the optional `scheduler` argument). The sampling starts as soon as
   * the output Observable is subscribed.
   *
   * @example <caption>Every second, emit the most recent click at most once</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.sampleTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sample}
   * @see {@link throttleTime}
   *
   * @param {number} period The sampling period expressed in milliseconds or the
   * time unit determined internally by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the sampling.
   * @return {Observable<T>} An Observable that emits the results of sampling the
   * values emitted by the source Observable at the specified time interval.
   * @method sampleTime
   * @owner Observable
   */
  function sampleTime(period, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return sampleTime_1.sampleTime(period, scheduler)(this);
  }
  exports.sampleTime = sampleTime;
  
  });
  
  unwrapExports(sampleTime_2$1);
  var sampleTime_3 = sampleTime_2$1.sampleTime;
  
  var sampleTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.sampleTime = sampleTime_2$1.sampleTime;
  
  });
  
  unwrapExports(sampleTime$2);
  
  var scan_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Applies an accumulator function over the source Observable, and returns each
   * intermediate result, with an optional seed value.
   *
   * <span class="informal">It's like {@link reduce}, but emits the current
   * accumulation whenever the source emits a value.</span>
   *
   * <img src="./img/scan.png" width="100%">
   *
   * Combines together all values emitted on the source, using an accumulator
   * function that knows how to join a new source value into the accumulation from
   * the past. Is similar to {@link reduce}, but emits the intermediate
   * accumulations.
   *
   * Returns an Observable that applies a specified `accumulator` function to each
   * item emitted by the source Observable. If a `seed` value is specified, then
   * that value will be used as the initial value for the accumulator. If no seed
   * value is specified, the first item of the source is used as the seed.
   *
   * @example <caption>Count the number of click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var ones = clicks.mapTo(1);
   * var seed = 0;
   * var count = ones.scan((acc, one) => acc + one, seed);
   * count.subscribe(x => console.log(x));
   *
   * @see {@link expand}
   * @see {@link mergeScan}
   * @see {@link reduce}
   *
   * @param {function(acc: R, value: T, index: number): R} accumulator
   * The accumulator function called on each source value.
   * @param {T|R} [seed] The initial accumulation value.
   * @return {Observable<R>} An observable of the accumulated values.
   * @method scan
   * @owner Observable
   */
  function scan(accumulator, seed) {
      if (arguments.length >= 2) {
          return scan_1.scan(accumulator, seed)(this);
      }
      return scan_1.scan(accumulator)(this);
  }
  exports.scan = scan;
  
  });
  
  unwrapExports(scan_2$1);
  var scan_3 = scan_2$1.scan;
  
  var scan$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.scan = scan_2$1.scan;
  
  });
  
  unwrapExports(scan$2);
  
  var sequenceEqual_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Compares all values of two observables in sequence using an optional comparor function
   * and returns an observable of a single boolean value representing whether or not the two sequences
   * are equal.
   *
   * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
   *
   * <img src="./img/sequenceEqual.png" width="100%">
   *
   * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
   * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
   * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
   * observables completes, the operator will wait for the other observable to complete; If the other
   * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
   * completes or emits after the other complets, the returned observable will never complete.
   *
   * @example <caption>figure out if the Konami code matches</caption>
   * var code = Rx.Observable.from([
   *  "ArrowUp",
   *  "ArrowUp",
   *  "ArrowDown",
   *  "ArrowDown",
   *  "ArrowLeft",
   *  "ArrowRight",
   *  "ArrowLeft",
   *  "ArrowRight",
   *  "KeyB",
   *  "KeyA",
   *  "Enter" // no start key, clearly.
   * ]);
   *
   * var keys = Rx.Observable.fromEvent(document, 'keyup')
   *  .map(e => e.code);
   * var matches = keys.bufferCount(11, 1)
   *  .mergeMap(
   *    last11 =>
   *      Rx.Observable.from(last11)
   *        .sequenceEqual(code)
   *   );
   * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
   *
   * @see {@link combineLatest}
   * @see {@link zip}
   * @see {@link withLatestFrom}
   *
   * @param {Observable} compareTo The observable sequence to compare the source sequence to.
   * @param {function} [comparor] An optional function to compare each value pair
   * @return {Observable} An Observable of a single boolean value representing whether or not
   * the values emitted by both observables were equal in sequence.
   * @method sequenceEqual
   * @owner Observable
   */
  function sequenceEqual(compareTo, comparor) {
      return function (source) { return source.lift(new SequenceEqualOperator(compareTo, comparor)); };
  }
  exports.sequenceEqual = sequenceEqual;
  var SequenceEqualOperator = /** @class */ (function () {
      function SequenceEqualOperator(compareTo, comparor) {
          this.compareTo = compareTo;
          this.comparor = comparor;
      }
      SequenceEqualOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
      };
      return SequenceEqualOperator;
  }());
  exports.SequenceEqualOperator = SequenceEqualOperator;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SequenceEqualSubscriber = /** @class */ (function (_super) {
      __extends(SequenceEqualSubscriber, _super);
      function SequenceEqualSubscriber(destination, compareTo, comparor) {
          var _this = _super.call(this, destination) || this;
          _this.compareTo = compareTo;
          _this.comparor = comparor;
          _this._a = [];
          _this._b = [];
          _this._oneComplete = false;
          _this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
          return _this;
      }
      SequenceEqualSubscriber.prototype._next = function (value) {
          if (this._oneComplete && this._b.length === 0) {
              this.emit(false);
          }
          else {
              this._a.push(value);
              this.checkValues();
          }
      };
      SequenceEqualSubscriber.prototype._complete = function () {
          if (this._oneComplete) {
              this.emit(this._a.length === 0 && this._b.length === 0);
          }
          else {
              this._oneComplete = true;
          }
      };
      SequenceEqualSubscriber.prototype.checkValues = function () {
          var _c = this, _a = _c._a, _b = _c._b, comparor = _c.comparor;
          while (_a.length > 0 && _b.length > 0) {
              var a = _a.shift();
              var b = _b.shift();
              var areEqual = false;
              if (comparor) {
                  areEqual = tryCatch_1.tryCatch(comparor)(a, b);
                  if (areEqual === errorObject.errorObject) {
                      this.destination.error(errorObject.errorObject.e);
                  }
              }
              else {
                  areEqual = a === b;
              }
              if (!areEqual) {
                  this.emit(false);
              }
          }
      };
      SequenceEqualSubscriber.prototype.emit = function (value) {
          var destination = this.destination;
          destination.next(value);
          destination.complete();
      };
      SequenceEqualSubscriber.prototype.nextB = function (value) {
          if (this._oneComplete && this._a.length === 0) {
              this.emit(false);
          }
          else {
              this._b.push(value);
              this.checkValues();
          }
      };
      return SequenceEqualSubscriber;
  }(Subscriber_1.Subscriber));
  exports.SequenceEqualSubscriber = SequenceEqualSubscriber;
  var SequenceEqualCompareToSubscriber = /** @class */ (function (_super) {
      __extends(SequenceEqualCompareToSubscriber, _super);
      function SequenceEqualCompareToSubscriber(destination, parent) {
          var _this = _super.call(this, destination) || this;
          _this.parent = parent;
          return _this;
      }
      SequenceEqualCompareToSubscriber.prototype._next = function (value) {
          this.parent.nextB(value);
      };
      SequenceEqualCompareToSubscriber.prototype._error = function (err) {
          this.parent.error(err);
      };
      SequenceEqualCompareToSubscriber.prototype._complete = function () {
          this.parent._complete();
      };
      return SequenceEqualCompareToSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(sequenceEqual_1);
  var sequenceEqual_2 = sequenceEqual_1.sequenceEqual;
  var sequenceEqual_3 = sequenceEqual_1.SequenceEqualOperator;
  var sequenceEqual_4 = sequenceEqual_1.SequenceEqualSubscriber;
  
  var sequenceEqual_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Compares all values of two observables in sequence using an optional comparor function
   * and returns an observable of a single boolean value representing whether or not the two sequences
   * are equal.
   *
   * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
   *
   * <img src="./img/sequenceEqual.png" width="100%">
   *
   * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
   * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
   * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
   * observables completes, the operator will wait for the other observable to complete; If the other
   * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
   * completes or emits after the other complets, the returned observable will never complete.
   *
   * @example <caption>figure out if the Konami code matches</caption>
   * var code = Rx.Observable.from([
   *  "ArrowUp",
   *  "ArrowUp",
   *  "ArrowDown",
   *  "ArrowDown",
   *  "ArrowLeft",
   *  "ArrowRight",
   *  "ArrowLeft",
   *  "ArrowRight",
   *  "KeyB",
   *  "KeyA",
   *  "Enter" // no start key, clearly.
   * ]);
   *
   * var keys = Rx.Observable.fromEvent(document, 'keyup')
   *  .map(e => e.code);
   * var matches = keys.bufferCount(11, 1)
   *  .mergeMap(
   *    last11 =>
   *      Rx.Observable.from(last11)
   *        .sequenceEqual(code)
   *   );
   * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
   *
   * @see {@link combineLatest}
   * @see {@link zip}
   * @see {@link withLatestFrom}
   *
   * @param {Observable} compareTo The observable sequence to compare the source sequence to.
   * @param {function} [comparor] An optional function to compare each value pair
   * @return {Observable} An Observable of a single boolean value representing whether or not
   * the values emitted by both observables were equal in sequence.
   * @method sequenceEqual
   * @owner Observable
   */
  function sequenceEqual(compareTo, comparor) {
      return sequenceEqual_1.sequenceEqual(compareTo, comparor)(this);
  }
  exports.sequenceEqual = sequenceEqual;
  
  });
  
  unwrapExports(sequenceEqual_2$1);
  var sequenceEqual_3$1 = sequenceEqual_2$1.sequenceEqual;
  
  var sequenceEqual$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.sequenceEqual = sequenceEqual_2$1.sequenceEqual;
  
  });
  
  unwrapExports(sequenceEqual$2);
  
  var share_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  function shareSubjectFactory() {
      return new Subject_1.Subject();
  }
  /**
   * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
   * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
   * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
   * This is an alias for .multicast(() => new Subject()).refCount().
   *
   * <img src="./img/share.png" width="100%">
   *
   * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
   * @method share
   * @owner Observable
   */
  function share() {
      return function (source) { return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source)); };
  }
  exports.share = share;
  
  });
  
  unwrapExports(share_1);
  var share_2 = share_1.share;
  
  var share_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
   * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
   * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
   *
   * This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete.
   * .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source.
   * Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will
   * re-emit "test" to new subscriptions.
   *
   * <img src="./img/share.png" width="100%">
   *
   * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
   * @method share
   * @owner Observable
   */
  function share() {
      return share_1.share()(this);
  }
  exports.share = share;
  
  });
  
  unwrapExports(share_2$1);
  var share_3 = share_2$1.share;
  
  var share$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.share = share_2$1.share;
  
  });
  
  unwrapExports(share$2);
  
  var shareReplay_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * @method shareReplay
   * @owner Observable
   */
  function shareReplay(bufferSize, windowTime, scheduler) {
      return function (source) { return source.lift(shareReplayOperator(bufferSize, windowTime, scheduler)); };
  }
  exports.shareReplay = shareReplay;
  function shareReplayOperator(bufferSize, windowTime, scheduler) {
      var subject;
      var refCount = 0;
      var subscription;
      var hasError = false;
      var isComplete = false;
      return function shareReplayOperation(source) {
          refCount++;
          if (!subject || hasError) {
              hasError = false;
              subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
              subscription = source.subscribe({
                  next: function (value) { subject.next(value); },
                  error: function (err) {
                      hasError = true;
                      subject.error(err);
                  },
                  complete: function () {
                      isComplete = true;
                      subject.complete();
                  },
              });
          }
          var innerSub = subject.subscribe(this);
          return function () {
              refCount--;
              innerSub.unsubscribe();
              if (subscription && refCount === 0 && isComplete) {
                  subscription.unsubscribe();
              }
          };
      };
  }
  
  });
  
  unwrapExports(shareReplay_1);
  var shareReplay_2 = shareReplay_1.shareReplay;
  
  var shareReplay_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * @method shareReplay
   * @owner Observable
   */
  function shareReplay(bufferSize, windowTime, scheduler) {
      return shareReplay_1.shareReplay(bufferSize, windowTime, scheduler)(this);
  }
  exports.shareReplay = shareReplay;
  
  });
  
  unwrapExports(shareReplay_2$1);
  var shareReplay_3 = shareReplay_2$1.shareReplay;
  
  var shareReplay$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.shareReplay = shareReplay_2$1.shareReplay;
  
  });
  
  unwrapExports(shareReplay$2);
  
  var single_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
   * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
   * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
   *
   * <img src="./img/single.png" width="100%">
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   * @param {Function} predicate - A predicate function to evaluate items emitted by the source Observable.
   * @return {Observable<T>} An Observable that emits the single item emitted by the source Observable that matches
   * the predicate.
   .
   * @method single
   * @owner Observable
   */
  function single(predicate) {
      return function (source) { return source.lift(new SingleOperator(predicate, source)); };
  }
  exports.single = single;
  var SingleOperator = /** @class */ (function () {
      function SingleOperator(predicate, source) {
          this.predicate = predicate;
          this.source = source;
      }
      SingleOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
      };
      return SingleOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SingleSubscriber = /** @class */ (function (_super) {
      __extends(SingleSubscriber, _super);
      function SingleSubscriber(destination, predicate, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.seenValue = false;
          _this.index = 0;
          return _this;
      }
      SingleSubscriber.prototype.applySingleValue = function (value) {
          if (this.seenValue) {
              this.destination.error('Sequence contains more than one element');
          }
          else {
              this.seenValue = true;
              this.singleValue = value;
          }
      };
      SingleSubscriber.prototype._next = function (value) {
          var index = this.index++;
          if (this.predicate) {
              this.tryNext(value, index);
          }
          else {
              this.applySingleValue(value);
          }
      };
      SingleSubscriber.prototype.tryNext = function (value, index) {
          try {
              if (this.predicate(value, index, this.source)) {
                  this.applySingleValue(value);
              }
          }
          catch (err) {
              this.destination.error(err);
          }
      };
      SingleSubscriber.prototype._complete = function () {
          var destination = this.destination;
          if (this.index > 0) {
              destination.next(this.seenValue ? this.singleValue : undefined);
              destination.complete();
          }
          else {
              destination.error(new EmptyError_1.EmptyError);
          }
      };
      return SingleSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(single_1);
  var single_2 = single_1.single;
  
  var single_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
   * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
   * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
   *
   * <img src="./img/single.png" width="100%">
   *
   * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
   * callback if the Observable completes before any `next` notification was sent.
   * @param {Function} predicate - A predicate function to evaluate items emitted by the source Observable.
   * @return {Observable<T>} An Observable that emits the single item emitted by the source Observable that matches
   * the predicate.
   .
   * @method single
   * @owner Observable
   */
  function single(predicate) {
      return single_1.single(predicate)(this);
  }
  exports.single = single;
  
  });
  
  unwrapExports(single_2$1);
  var single_3 = single_2$1.single;
  
  var single$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.single = single_2$1.single;
  
  });
  
  unwrapExports(single$2);
  
  var skip_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that skips the first `count` items emitted by the source Observable.
   *
   * <img src="./img/skip.png" width="100%">
   *
   * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
   * @return {Observable} An Observable that skips values emitted by the source Observable.
   *
   * @method skip
   * @owner Observable
   */
  function skip(count) {
      return function (source) { return source.lift(new SkipOperator(count)); };
  }
  exports.skip = skip;
  var SkipOperator = /** @class */ (function () {
      function SkipOperator(total) {
          this.total = total;
      }
      SkipOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SkipSubscriber(subscriber, this.total));
      };
      return SkipOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SkipSubscriber = /** @class */ (function (_super) {
      __extends(SkipSubscriber, _super);
      function SkipSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.count = 0;
          return _this;
      }
      SkipSubscriber.prototype._next = function (x) {
          if (++this.count > this.total) {
              this.destination.next(x);
          }
      };
      return SkipSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(skip_1);
  var skip_2 = skip_1.skip;
  
  var skip_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that skips the first `count` items emitted by the source Observable.
   *
   * <img src="./img/skip.png" width="100%">
   *
   * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
   * @return {Observable} An Observable that skips values emitted by the source Observable.
   *
   * @method skip
   * @owner Observable
   */
  function skip(count) {
      return skip_1.skip(count)(this);
  }
  exports.skip = skip;
  
  });
  
  unwrapExports(skip_2$1);
  var skip_3 = skip_2$1.skip;
  
  var skip$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.skip = skip_2$1.skip;
  
  });
  
  unwrapExports(skip$2);
  
  var skipLast_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Skip the last `count` values emitted by the source Observable.
   *
   * <img src="./img/skipLast.png" width="100%">
   *
   * `skipLast` returns an Observable that accumulates a queue with a length
   * enough to store the first `count` values. As more values are received,
   * values are taken from the front of the queue and produced on the result
   * sequence. This causes values to be delayed.
   *
   * @example <caption>Skip the last 2 values of an Observable with many values</caption>
   * var many = Rx.Observable.range(1, 5);
   * var skipLastTwo = many.skipLast(2);
   * skipLastTwo.subscribe(x => console.log(x));
   *
   * // Results in:
   * // 1 2 3
   *
   * @see {@link skip}
   * @see {@link skipUntil}
   * @see {@link skipWhile}
   * @see {@link take}
   *
   * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
   * ArgumentOutOrRangeError if `i < 0`.
   *
   * @param {number} count Number of elements to skip from the end of the source Observable.
   * @returns {Observable<T>} An Observable that skips the last count values
   * emitted by the source Observable.
   * @method skipLast
   * @owner Observable
   */
  function skipLast(count) {
      return function (source) { return source.lift(new SkipLastOperator(count)); };
  }
  exports.skipLast = skipLast;
  var SkipLastOperator = /** @class */ (function () {
      function SkipLastOperator(_skipCount) {
          this._skipCount = _skipCount;
          if (this._skipCount < 0) {
              throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
          }
      }
      SkipLastOperator.prototype.call = function (subscriber, source) {
          if (this._skipCount === 0) {
              // If we don't want to skip any values then just subscribe
              // to Subscriber without any further logic.
              return source.subscribe(new Subscriber_1.Subscriber(subscriber));
          }
          else {
              return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
          }
      };
      return SkipLastOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SkipLastSubscriber = /** @class */ (function (_super) {
      __extends(SkipLastSubscriber, _super);
      function SkipLastSubscriber(destination, _skipCount) {
          var _this = _super.call(this, destination) || this;
          _this._skipCount = _skipCount;
          _this._count = 0;
          _this._ring = new Array(_skipCount);
          return _this;
      }
      SkipLastSubscriber.prototype._next = function (value) {
          var skipCount = this._skipCount;
          var count = this._count++;
          if (count < skipCount) {
              this._ring[count] = value;
          }
          else {
              var currentIndex = count % skipCount;
              var ring = this._ring;
              var oldValue = ring[currentIndex];
              ring[currentIndex] = value;
              this.destination.next(oldValue);
          }
      };
      return SkipLastSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(skipLast_1);
  var skipLast_2 = skipLast_1.skipLast;
  
  var skipLast_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Skip the last `count` values emitted by the source Observable.
   *
   * <img src="./img/skipLast.png" width="100%">
   *
   * `skipLast` returns an Observable that accumulates a queue with a length
   * enough to store the first `count` values. As more values are received,
   * values are taken from the front of the queue and produced on the result
   * sequence. This causes values to be delayed.
   *
   * @example <caption>Skip the last 2 values of an Observable with many values</caption>
   * var many = Rx.Observable.range(1, 5);
   * var skipLastTwo = many.skipLast(2);
   * skipLastTwo.subscribe(x => console.log(x));
   *
   * // Results in:
   * // 1 2 3
   *
   * @see {@link skip}
   * @see {@link skipUntil}
   * @see {@link skipWhile}
   * @see {@link take}
   *
   * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
   * ArgumentOutOrRangeError if `i < 0`.
   *
   * @param {number} count Number of elements to skip from the end of the source Observable.
   * @returns {Observable<T>} An Observable that skips the last count values
   * emitted by the source Observable.
   * @method skipLast
   * @owner Observable
   */
  function skipLast(count) {
      return skipLast_1.skipLast(count)(this);
  }
  exports.skipLast = skipLast;
  
  });
  
  unwrapExports(skipLast_2$1);
  var skipLast_3 = skipLast_2$1.skipLast;
  
  var skipLast$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.skipLast = skipLast_2$1.skipLast;
  
  });
  
  unwrapExports(skipLast$2);
  
  var skipUntil_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
   *
   * <img src="./img/skipUntil.png" width="100%">
   *
   * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
   * be mirrored by the resulting Observable.
   * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
   * an item, then emits the remaining items.
   * @method skipUntil
   * @owner Observable
   */
  function skipUntil(notifier) {
      return function (source) { return source.lift(new SkipUntilOperator(notifier)); };
  }
  exports.skipUntil = skipUntil;
  var SkipUntilOperator = /** @class */ (function () {
      function SkipUntilOperator(notifier) {
          this.notifier = notifier;
      }
      SkipUntilOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
      };
      return SkipUntilOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SkipUntilSubscriber = /** @class */ (function (_super) {
      __extends(SkipUntilSubscriber, _super);
      function SkipUntilSubscriber(destination, notifier) {
          var _this = _super.call(this, destination) || this;
          _this.hasValue = false;
          _this.isInnerStopped = false;
          _this.add(subscribeToResult_1.subscribeToResult(_this, notifier));
          return _this;
      }
      SkipUntilSubscriber.prototype._next = function (value) {
          if (this.hasValue) {
              _super.prototype._next.call(this, value);
          }
      };
      SkipUntilSubscriber.prototype._complete = function () {
          if (this.isInnerStopped) {
              _super.prototype._complete.call(this);
          }
          else {
              this.unsubscribe();
          }
      };
      SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.hasValue = true;
      };
      SkipUntilSubscriber.prototype.notifyComplete = function () {
          this.isInnerStopped = true;
          if (this.isStopped) {
              _super.prototype._complete.call(this);
          }
      };
      return SkipUntilSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(skipUntil_1);
  var skipUntil_2 = skipUntil_1.skipUntil;
  
  var skipUntil_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
   *
   * <img src="./img/skipUntil.png" width="100%">
   *
   * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
   * be mirrored by the resulting Observable.
   * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
   * an item, then emits the remaining items.
   * @method skipUntil
   * @owner Observable
   */
  function skipUntil(notifier) {
      return skipUntil_1.skipUntil(notifier)(this);
  }
  exports.skipUntil = skipUntil;
  
  });
  
  unwrapExports(skipUntil_2$1);
  var skipUntil_3 = skipUntil_2$1.skipUntil;
  
  var skipUntil$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.skipUntil = skipUntil_2$1.skipUntil;
  
  });
  
  unwrapExports(skipUntil$2);
  
  var skipWhile_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
   * true, but emits all further source items as soon as the condition becomes false.
   *
   * <img src="./img/skipWhile.png" width="100%">
   *
   * @param {Function} predicate - A function to test each item emitted from the source Observable.
   * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
   * specified predicate becomes false.
   * @method skipWhile
   * @owner Observable
   */
  function skipWhile(predicate) {
      return function (source) { return source.lift(new SkipWhileOperator(predicate)); };
  }
  exports.skipWhile = skipWhile;
  var SkipWhileOperator = /** @class */ (function () {
      function SkipWhileOperator(predicate) {
          this.predicate = predicate;
      }
      SkipWhileOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
      };
      return SkipWhileOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SkipWhileSubscriber = /** @class */ (function (_super) {
      __extends(SkipWhileSubscriber, _super);
      function SkipWhileSubscriber(destination, predicate) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.skipping = true;
          _this.index = 0;
          return _this;
      }
      SkipWhileSubscriber.prototype._next = function (value) {
          var destination = this.destination;
          if (this.skipping) {
              this.tryCallPredicate(value);
          }
          if (!this.skipping) {
              destination.next(value);
          }
      };
      SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
          try {
              var result = this.predicate(value, this.index++);
              this.skipping = Boolean(result);
          }
          catch (err) {
              this.destination.error(err);
          }
      };
      return SkipWhileSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(skipWhile_1);
  var skipWhile_2 = skipWhile_1.skipWhile;
  
  var skipWhile_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
   * true, but emits all further source items as soon as the condition becomes false.
   *
   * <img src="./img/skipWhile.png" width="100%">
   *
   * @param {Function} predicate - A function to test each item emitted from the source Observable.
   * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
   * specified predicate becomes false.
   * @method skipWhile
   * @owner Observable
   */
  function skipWhile(predicate) {
      return skipWhile_1.skipWhile(predicate)(this);
  }
  exports.skipWhile = skipWhile;
  
  });
  
  unwrapExports(skipWhile_2$1);
  var skipWhile_3 = skipWhile_2$1.skipWhile;
  
  var skipWhile$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.skipWhile = skipWhile_2$1.skipWhile;
  
  });
  
  unwrapExports(skipWhile$2);
  
  var startWith_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits the items you specify as arguments before it begins to emit
   * items emitted by the source Observable.
   *
   * <img src="./img/startWith.png" width="100%">
   *
   * @param {...T} values - Items you want the modified Observable to emit first.
   * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
   * the emissions of the `next` notifications.
   * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
   * emitted by the source Observable.
   * @method startWith
   * @owner Observable
   */
  function startWith() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          array[_i] = arguments[_i];
      }
      return function (source) {
          var scheduler = array[array.length - 1];
          if (isScheduler_1.isScheduler(scheduler)) {
              array.pop();
          }
          else {
              scheduler = null;
          }
          var len = array.length;
          if (len === 1 && !scheduler) {
              return concat_1.concat(scalar_1.scalar(array[0]), source);
          }
          else if (len > 0) {
              return concat_1.concat(fromArray_1.fromArray(array, scheduler), source);
          }
          else {
              return concat_1.concat(empty_1.empty(scheduler), source);
          }
      };
  }
  exports.startWith = startWith;
  
  });
  
  unwrapExports(startWith_1);
  var startWith_2 = startWith_1.startWith;
  
  var startWith_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Returns an Observable that emits the items you specify as arguments before it begins to emit
   * items emitted by the source Observable.
   *
   * <img src="./img/startWith.png" width="100%">
   *
   * @param {...T} values - Items you want the modified Observable to emit first.
   * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
   * the emissions of the `next` notifications.
   * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
   * emitted by the source Observable.
   * @method startWith
   * @owner Observable
   */
  function startWith() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          array[_i] = arguments[_i];
      }
      return startWith_1.startWith.apply(void 0, array)(this);
  }
  exports.startWith = startWith;
  
  });
  
  unwrapExports(startWith_2$1);
  var startWith_3 = startWith_2$1.startWith;
  
  var startWith$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.startWith = startWith_2$1.startWith;
  
  });
  
  unwrapExports(startWith$2);
  
  var Immediate = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var nextHandle = 0;
  var tasksByHandle = {};
  function runIfPresent(handle) {
      var cb = tasksByHandle[handle];
      if (cb) {
          cb();
      }
  }
  exports.Immediate = {
      setImmediate: function (cb) {
          var handle = nextHandle++;
          tasksByHandle[handle] = cb;
          Promise.resolve().then(function () { return runIfPresent(handle); });
          return handle;
      },
      clearImmediate: function (handle) {
          delete tasksByHandle[handle];
      },
  };
  
  });
  
  unwrapExports(Immediate);
  var Immediate_1 = Immediate.Immediate;
  
  var AsapAction_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var AsapAction = /** @class */ (function (_super) {
      __extends(AsapAction, _super);
      function AsapAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If delay is greater than 0, request as an async action.
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          // Push the action to the end of the scheduler queue.
          scheduler.actions.push(this);
          // If a microtask has already been scheduled, don't schedule another
          // one. If a microtask hasn't been scheduled yet, schedule one now. Return
          // the current scheduled microtask id.
          return scheduler.scheduled || (scheduler.scheduled = Immediate.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
      };
      AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If delay exists and is greater than 0, or if the delay is null (the
          // action wasn't rescheduled) but was originally scheduled as an async
          // action, then recycle as an async action.
          if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          // If the scheduler queue is empty, cancel the requested microtask and
          // set the scheduled flag to undefined so the next AsapAction will schedule
          // its own.
          if (scheduler.actions.length === 0) {
              Immediate.Immediate.clearImmediate(id);
              scheduler.scheduled = undefined;
          }
          // Return undefined so the action knows to request a new async id if it's rescheduled.
          return undefined;
      };
      return AsapAction;
  }(AsyncAction_1.AsyncAction));
  exports.AsapAction = AsapAction;
  
  });
  
  unwrapExports(AsapAction_1);
  var AsapAction_2 = AsapAction_1.AsapAction;
  
  var AsapScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var AsapScheduler = /** @class */ (function (_super) {
      __extends(AsapScheduler, _super);
      function AsapScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler.prototype.flush = function (action) {
          this.active = true;
          this.scheduled = undefined;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
              while (++index < count && (action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsapScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.AsapScheduler = AsapScheduler;
  
  });
  
  unwrapExports(AsapScheduler_1);
  var AsapScheduler_2 = AsapScheduler_1.AsapScheduler;
  
  var asap = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Asap Scheduler
   *
   * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
   *
   * `asap` scheduler behaves the same as {@link async} scheduler when you use it to delay task
   * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
   * code to end and then it will try to execute given task as fast as possible.
   *
   * `asap` scheduler will do its best to minimize time between end of currently executing code
   * and start of scheduled task. This makes it best candidate for performing so called "deferring".
   * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
   * some (although minimal) unwanted delay.
   *
   * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
   * after currently executing code. In particular, if some task was also scheduled with `asap` before,
   * that task will execute first. That being said, if you need to schedule task asynchronously, but
   * as soon as possible, `asap` scheduler is your best bet.
   *
   * @example <caption>Compare async and asap scheduler</caption>
   *
   * Rx.Scheduler.async.schedule(() => console.log('async')); // scheduling 'async' first...
   * Rx.Scheduler.asap.schedule(() => console.log('asap'));
   *
   * // Logs:
   * // "asap"
   * // "async"
   * // ... but 'asap' goes first!
   *
   * @static true
   * @name asap
   * @owner Scheduler
   */
  exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
  
  });
  
  unwrapExports(asap);
  var asap_1 = asap.asap;
  
  var SubscribeOnObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @extends {Ignored}
   * @hide true
   */
  var SubscribeOnObservable = /** @class */ (function (_super) {
      __extends(SubscribeOnObservable, _super);
      function SubscribeOnObservable(source, delayTime, scheduler) {
          if (delayTime === void 0) { delayTime = 0; }
          if (scheduler === void 0) { scheduler = asap.asap; }
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.delayTime = delayTime;
          _this.scheduler = scheduler;
          if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
              _this.delayTime = 0;
          }
          if (!scheduler || typeof scheduler.schedule !== 'function') {
              _this.scheduler = asap.asap;
          }
          return _this;
      }
      SubscribeOnObservable.create = function (source, delay, scheduler) {
          if (delay === void 0) { delay = 0; }
          if (scheduler === void 0) { scheduler = asap.asap; }
          return new SubscribeOnObservable(source, delay, scheduler);
      };
      SubscribeOnObservable.dispatch = function (arg) {
          var source = arg.source, subscriber = arg.subscriber;
          return this.add(source.subscribe(subscriber));
      };
      SubscribeOnObservable.prototype._subscribe = function (subscriber) {
          var delay = this.delayTime;
          var source = this.source;
          var scheduler = this.scheduler;
          return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
              source: source, subscriber: subscriber
          });
      };
      return SubscribeOnObservable;
  }(Observable_1.Observable));
  exports.SubscribeOnObservable = SubscribeOnObservable;
  
  });
  
  unwrapExports(SubscribeOnObservable_1);
  var SubscribeOnObservable_2 = SubscribeOnObservable_1.SubscribeOnObservable;
  
  var subscribeOn_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
   *
   * <img src="./img/subscribeOn.png" width="100%">
   *
   * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
   * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
   .
   * @method subscribeOn
   * @owner Observable
   */
  function subscribeOn(scheduler, delay) {
      if (delay === void 0) { delay = 0; }
      return function subscribeOnOperatorFunction(source) {
          return source.lift(new SubscribeOnOperator(scheduler, delay));
      };
  }
  exports.subscribeOn = subscribeOn;
  var SubscribeOnOperator = /** @class */ (function () {
      function SubscribeOnOperator(scheduler, delay) {
          this.scheduler = scheduler;
          this.delay = delay;
      }
      SubscribeOnOperator.prototype.call = function (subscriber, source) {
          return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
      };
      return SubscribeOnOperator;
  }());
  
  });
  
  unwrapExports(subscribeOn_1);
  var subscribeOn_2 = subscribeOn_1.subscribeOn;
  
  var subscribeOn_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
   *
   * <img src="./img/subscribeOn.png" width="100%">
   *
   * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
   * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
   .
   * @method subscribeOn
   * @owner Observable
   */
  function subscribeOn(scheduler, delay) {
      if (delay === void 0) { delay = 0; }
      return subscribeOn_1.subscribeOn(scheduler, delay)(this);
  }
  exports.subscribeOn = subscribeOn;
  
  });
  
  unwrapExports(subscribeOn_2$1);
  var subscribeOn_3 = subscribeOn_2$1.subscribeOn;
  
  var subscribeOn$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.subscribeOn = subscribeOn_2$1.subscribeOn;
  
  });
  
  unwrapExports(subscribeOn$2);
  
  var switchMap_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable, emitting values only from the most recently projected Observable.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link switch}.</span>
   *
   * <img src="./img/switchMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. Each time it observes one of these
   * inner Observables, the output Observable begins emitting the items emitted by
   * that inner Observable. When a new inner Observable is emitted, `switchMap`
   * stops emitting items from the earlier-emitted inner Observable and begins
   * emitting items from the new one. It continues to behave like this for
   * subsequent inner Observables.
   *
   * @example <caption>Rerun an interval Observable on every click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMap}
   * @see {@link exhaustMap}
   * @see {@link mergeMap}
   * @see {@link switch}
   * @see {@link switchMapTo}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and taking only the values from the most recently
   * projected inner Observable.
   * @method switchMap
   * @owner Observable
   */
  function switchMap(project, resultSelector) {
      return function switchMapOperatorFunction(source) {
          return source.lift(new SwitchMapOperator(project, resultSelector));
      };
  }
  exports.switchMap = switchMap;
  var SwitchMapOperator = /** @class */ (function () {
      function SwitchMapOperator(project, resultSelector) {
          this.project = project;
          this.resultSelector = resultSelector;
      }
      SwitchMapOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
      };
      return SwitchMapOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SwitchMapSubscriber = /** @class */ (function (_super) {
      __extends(SwitchMapSubscriber, _super);
      function SwitchMapSubscriber(destination, project, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.resultSelector = resultSelector;
          _this.index = 0;
          return _this;
      }
      SwitchMapSubscriber.prototype._next = function (value) {
          var result;
          var index = this.index++;
          try {
              result = this.project(value, index);
          }
          catch (error) {
              this.destination.error(error);
              return;
          }
          this._innerSub(result, value, index);
      };
      SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
          var innerSubscription = this.innerSubscription;
          if (innerSubscription) {
              innerSubscription.unsubscribe();
          }
          this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
      };
      SwitchMapSubscriber.prototype._complete = function () {
          var innerSubscription = this.innerSubscription;
          if (!innerSubscription || innerSubscription.closed) {
              _super.prototype._complete.call(this);
          }
      };
      SwitchMapSubscriber.prototype._unsubscribe = function () {
          this.innerSubscription = null;
      };
      SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
          this.remove(innerSub);
          this.innerSubscription = null;
          if (this.isStopped) {
              _super.prototype._complete.call(this);
          }
      };
      SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (this.resultSelector) {
              this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
          }
          else {
              this.destination.next(innerValue);
          }
      };
      SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
          var result;
          try {
              result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return SwitchMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(switchMap_1);
  var switchMap_2 = switchMap_1.switchMap;
  
  var switchAll_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  function switchAll() {
      return switchMap_1.switchMap(identity_1.identity);
  }
  exports.switchAll = switchAll;
  
  });
  
  unwrapExports(switchAll_1);
  var switchAll_2 = switchAll_1.switchAll;
  
  var _switch_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Converts a higher-order Observable into a first-order Observable by
   * subscribing to only the most recently emitted of those inner Observables.
   *
   * <span class="informal">Flattens an Observable-of-Observables by dropping the
   * previous inner Observable once a new one appears.</span>
   *
   * <img src="./img/switch.png" width="100%">
   *
   * `switch` subscribes to an Observable that emits Observables, also known as a
   * higher-order Observable. Each time it observes one of these emitted inner
   * Observables, the output Observable subscribes to the inner Observable and
   * begins emitting the items emitted by that. So far, it behaves
   * like {@link mergeAll}. However, when a new inner Observable is emitted,
   * `switch` unsubscribes from the earlier-emitted inner Observable and
   * subscribes to the new inner Observable and begins emitting items from it. It
   * continues to behave like this for subsequent inner Observables.
   *
   * @example <caption>Rerun an interval Observable on every click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * // Each click event is mapped to an Observable that ticks every second
   * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
   * var switched = higherOrder.switch();
   * // The outcome is that `switched` is essentially a timer that restarts
   * // on every click. The interval Observables from older clicks do not merge
   * // with the current interval Observable.
   * switched.subscribe(x => console.log(x));
   *
   * @see {@link combineAll}
   * @see {@link concatAll}
   * @see {@link exhaust}
   * @see {@link mergeAll}
   * @see {@link switchMap}
   * @see {@link switchMapTo}
   * @see {@link zipAll}
   *
   * @return {Observable<T>} An Observable that emits the items emitted by the
   * Observable most recently emitted by the source Observable.
   * @method switch
   * @name switch
   * @owner Observable
   */
  function _switch() {
      return switchAll_1.switchAll()(this);
  }
  exports._switch = _switch;
  
  });
  
  unwrapExports(_switch_1);
  var _switch_2 = _switch_1._switch;
  
  var _switch$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.switch = _switch_1._switch;
  Observable_1.Observable.prototype._switch = _switch_1._switch;
  
  });
  
  unwrapExports(_switch$1);
  
  var switchMap_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to an Observable which is merged in the output
   * Observable, emitting values only from the most recently projected Observable.
   *
   * <span class="informal">Maps each value to an Observable, then flattens all of
   * these inner Observables using {@link switch}.</span>
   *
   * <img src="./img/switchMap.png" width="100%">
   *
   * Returns an Observable that emits items based on applying a function that you
   * supply to each item emitted by the source Observable, where that function
   * returns an (so-called "inner") Observable. Each time it observes one of these
   * inner Observables, the output Observable begins emitting the items emitted by
   * that inner Observable. When a new inner Observable is emitted, `switchMap`
   * stops emitting items from the earlier-emitted inner Observable and begins
   * emitting items from the new one. It continues to behave like this for
   * subsequent inner Observables.
   *
   * @example <caption>Rerun an interval Observable on every click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMap}
   * @see {@link exhaustMap}
   * @see {@link mergeMap}
   * @see {@link switch}
   * @see {@link switchMapTo}
   *
   * @param {function(value: T, ?index: number): ObservableInput} project A function
   * that, when applied to an item emitted by the source Observable, returns an
   * Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits the result of applying the
   * projection function (and the optional `resultSelector`) to each item emitted
   * by the source Observable and taking only the values from the most recently
   * projected inner Observable.
   * @method switchMap
   * @owner Observable
   */
  function switchMap(project, resultSelector) {
      return switchMap_1.switchMap(project, resultSelector)(this);
  }
  exports.switchMap = switchMap;
  
  });
  
  unwrapExports(switchMap_2$1);
  var switchMap_3 = switchMap_2$1.switchMap;
  
  var switchMap$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.switchMap = switchMap_2$1.switchMap;
  
  });
  
  unwrapExports(switchMap$2);
  
  var switchMapTo_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is flattened multiple
   * times with {@link switch} in the output Observable.
   *
   * <span class="informal">It's like {@link switchMap}, but maps each value
   * always to the same inner Observable.</span>
   *
   * <img src="./img/switchMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then flattens those resulting Observables into one
   * single Observable, which is the output Observable. The output Observables
   * emits values only from the most recently emitted instance of
   * `innerObservable`.
   *
   * @example <caption>Rerun an interval Observable on every click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMapTo}
   * @see {@link switch}
   * @see {@link switchMap}
   * @see {@link mergeMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits items from the given
   * `innerObservable` (and optionally transformed through `resultSelector`) every
   * time a value is emitted on the source Observable, and taking only the values
   * from the most recently projected inner Observable.
   * @method switchMapTo
   * @owner Observable
   */
  function switchMapTo(innerObservable, resultSelector) {
      return function (source) { return source.lift(new SwitchMapToOperator(innerObservable, resultSelector)); };
  }
  exports.switchMapTo = switchMapTo;
  var SwitchMapToOperator = /** @class */ (function () {
      function SwitchMapToOperator(observable, resultSelector) {
          this.observable = observable;
          this.resultSelector = resultSelector;
      }
      SwitchMapToOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
      };
      return SwitchMapToOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var SwitchMapToSubscriber = /** @class */ (function (_super) {
      __extends(SwitchMapToSubscriber, _super);
      function SwitchMapToSubscriber(destination, inner, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.inner = inner;
          _this.resultSelector = resultSelector;
          _this.index = 0;
          return _this;
      }
      SwitchMapToSubscriber.prototype._next = function (value) {
          var innerSubscription = this.innerSubscription;
          if (innerSubscription) {
              innerSubscription.unsubscribe();
          }
          this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
      };
      SwitchMapToSubscriber.prototype._complete = function () {
          var innerSubscription = this.innerSubscription;
          if (!innerSubscription || innerSubscription.closed) {
              _super.prototype._complete.call(this);
          }
      };
      SwitchMapToSubscriber.prototype._unsubscribe = function () {
          this.innerSubscription = null;
      };
      SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
          this.remove(innerSub);
          this.innerSubscription = null;
          if (this.isStopped) {
              _super.prototype._complete.call(this);
          }
      };
      SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          if (resultSelector) {
              this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          else {
              destination.next(innerValue);
          }
      };
      SwitchMapToSubscriber.prototype.tryResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
          var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
          var result;
          try {
              result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
          }
          catch (err) {
              destination.error(err);
              return;
          }
          destination.next(result);
      };
      return SwitchMapToSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(switchMapTo_1);
  var switchMapTo_2 = switchMapTo_1.switchMapTo;
  
  var switchMapTo_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Projects each source value to the same Observable which is flattened multiple
   * times with {@link switch} in the output Observable.
   *
   * <span class="informal">It's like {@link switchMap}, but maps each value
   * always to the same inner Observable.</span>
   *
   * <img src="./img/switchMapTo.png" width="100%">
   *
   * Maps each source value to the given Observable `innerObservable` regardless
   * of the source value, and then flattens those resulting Observables into one
   * single Observable, which is the output Observable. The output Observables
   * emits values only from the most recently emitted instance of
   * `innerObservable`.
   *
   * @example <caption>Rerun an interval Observable on every click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link concatMapTo}
   * @see {@link switch}
   * @see {@link switchMap}
   * @see {@link mergeMapTo}
   *
   * @param {ObservableInput} innerObservable An Observable to replace each value from
   * the source Observable.
   * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
   * A function to produce the value on the output Observable based on the values
   * and the indices of the source (outer) emission and the inner Observable
   * emission. The arguments passed to this function are:
   * - `outerValue`: the value that came from the source
   * - `innerValue`: the value that came from the projected Observable
   * - `outerIndex`: the "index" of the value that came from the source
   * - `innerIndex`: the "index" of the value from the projected Observable
   * @return {Observable} An Observable that emits items from the given
   * `innerObservable` (and optionally transformed through `resultSelector`) every
   * time a value is emitted on the source Observable, and taking only the values
   * from the most recently projected inner Observable.
   * @method switchMapTo
   * @owner Observable
   */
  function switchMapTo(innerObservable, resultSelector) {
      return switchMapTo_1.switchMapTo(innerObservable, resultSelector)(this);
  }
  exports.switchMapTo = switchMapTo;
  
  });
  
  unwrapExports(switchMapTo_2$1);
  var switchMapTo_3 = switchMapTo_2$1.switchMapTo;
  
  var switchMapTo$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.switchMapTo = switchMapTo_2$1.switchMapTo;
  
  });
  
  unwrapExports(switchMapTo$2);
  
  var take_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Emits only the first `count` values emitted by the source Observable.
   *
   * <span class="informal">Takes the first `count` values from the source, then
   * completes.</span>
   *
   * <img src="./img/take.png" width="100%">
   *
   * `take` returns an Observable that emits only the first `count` values emitted
   * by the source Observable. If the source emits fewer than `count` values then
   * all of its values are emitted. After that, it completes, regardless if the
   * source completes.
   *
   * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
   * var interval = Rx.Observable.interval(1000);
   * var five = interval.take(5);
   * five.subscribe(x => console.log(x));
   *
   * @see {@link takeLast}
   * @see {@link takeUntil}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
   *
   * @param {number} count The maximum number of `next` values to emit.
   * @return {Observable<T>} An Observable that emits only the first `count`
   * values emitted by the source Observable, or all of the values from the source
   * if the source emits fewer than `count` values.
   * @method take
   * @owner Observable
   */
  function take(count) {
      return function (source) {
          if (count === 0) {
              return empty_1.empty();
          }
          else {
              return source.lift(new TakeOperator(count));
          }
      };
  }
  exports.take = take;
  var TakeOperator = /** @class */ (function () {
      function TakeOperator(total) {
          this.total = total;
          if (this.total < 0) {
              throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
          }
      }
      TakeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeSubscriber(subscriber, this.total));
      };
      return TakeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TakeSubscriber = /** @class */ (function (_super) {
      __extends(TakeSubscriber, _super);
      function TakeSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.count = 0;
          return _this;
      }
      TakeSubscriber.prototype._next = function (value) {
          var total = this.total;
          var count = ++this.count;
          if (count <= total) {
              this.destination.next(value);
              if (count === total) {
                  this.destination.complete();
                  this.unsubscribe();
              }
          }
      };
      return TakeSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(take_1);
  var take_2 = take_1.take;
  
  var take_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the first `count` values emitted by the source Observable.
   *
   * <span class="informal">Takes the first `count` values from the source, then
   * completes.</span>
   *
   * <img src="./img/take.png" width="100%">
   *
   * `take` returns an Observable that emits only the first `count` values emitted
   * by the source Observable. If the source emits fewer than `count` values then
   * all of its values are emitted. After that, it completes, regardless if the
   * source completes.
   *
   * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
   * var interval = Rx.Observable.interval(1000);
   * var five = interval.take(5);
   * five.subscribe(x => console.log(x));
   *
   * @see {@link takeLast}
   * @see {@link takeUntil}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
   *
   * @param {number} count The maximum number of `next` values to emit.
   * @return {Observable<T>} An Observable that emits only the first `count`
   * values emitted by the source Observable, or all of the values from the source
   * if the source emits fewer than `count` values.
   * @method take
   * @owner Observable
   */
  function take(count) {
      return take_1.take(count)(this);
  }
  exports.take = take;
  
  });
  
  unwrapExports(take_2$1);
  var take_3 = take_2$1.take;
  
  var take$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.take = take_2$1.take;
  
  });
  
  unwrapExports(take$2);
  
  var takeLast_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits only the last `count` values emitted by the source Observable.
   *
   * <span class="informal">Remembers the latest `count` values, then emits those
   * only when the source completes.</span>
   *
   * <img src="./img/takeLast.png" width="100%">
   *
   * `takeLast` returns an Observable that emits at most the last `count` values
   * emitted by the source Observable. If the source emits fewer than `count`
   * values then all of its values are emitted. This operator must wait until the
   * `complete` notification emission from the source in order to emit the `next`
   * values on the output Observable, because otherwise it is impossible to know
   * whether or not more values will be emitted on the source. For this reason,
   * all values are emitted synchronously, followed by the complete notification.
   *
   * @example <caption>Take the last 3 values of an Observable with many values</caption>
   * var many = Rx.Observable.range(1, 100);
   * var lastThree = many.takeLast(3);
   * lastThree.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeUntil}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
   * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
   *
   * @param {number} count The maximum number of values to emit from the end of
   * the sequence of values emitted by the source Observable.
   * @return {Observable<T>} An Observable that emits at most the last count
   * values emitted by the source Observable.
   * @method takeLast
   * @owner Observable
   */
  function takeLast(count) {
      return takeLast_1.takeLast(count)(this);
  }
  exports.takeLast = takeLast;
  
  });
  
  unwrapExports(takeLast_2$1);
  var takeLast_3 = takeLast_2$1.takeLast;
  
  var takeLast$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.takeLast = takeLast_2$1.takeLast;
  
  });
  
  unwrapExports(takeLast$2);
  
  var takeUntil_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Emits the values emitted by the source Observable until a `notifier`
   * Observable emits a value.
   *
   * <span class="informal">Lets values pass until a second Observable,
   * `notifier`, emits a value. Then, it completes.</span>
   *
   * <img src="./img/takeUntil.png" width="100%">
   *
   * `takeUntil` subscribes and begins mirroring the source Observable. It also
   * monitors a second Observable, `notifier` that you provide. If the `notifier`
   * emits a value, the output Observable stops mirroring the source Observable
   * and completes. If the `notifier` doesn't emit any value and completes
   * then `takeUntil` will pass all values.
   *
   * @example <caption>Tick every second until the first click happens</caption>
   * var interval = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = interval.takeUntil(clicks);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeLast}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @param {Observable} notifier The Observable whose first emitted value will
   * cause the output Observable of `takeUntil` to stop emitting values from the
   * source Observable.
   * @return {Observable<T>} An Observable that emits the values from the source
   * Observable until such time as `notifier` emits its first value.
   * @method takeUntil
   * @owner Observable
   */
  function takeUntil(notifier) {
      return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
  }
  exports.takeUntil = takeUntil;
  var TakeUntilOperator = /** @class */ (function () {
      function TakeUntilOperator(notifier) {
          this.notifier = notifier;
      }
      TakeUntilOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
      };
      return TakeUntilOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TakeUntilSubscriber = /** @class */ (function (_super) {
      __extends(TakeUntilSubscriber, _super);
      function TakeUntilSubscriber(destination, notifier) {
          var _this = _super.call(this, destination) || this;
          _this.notifier = notifier;
          _this.add(subscribeToResult_1.subscribeToResult(_this, notifier));
          return _this;
      }
      TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.complete();
      };
      TakeUntilSubscriber.prototype.notifyComplete = function () {
          // noop
      };
      return TakeUntilSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(takeUntil_1);
  var takeUntil_2 = takeUntil_1.takeUntil;
  
  var takeUntil_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits the values emitted by the source Observable until a `notifier`
   * Observable emits a value.
   *
   * <span class="informal">Lets values pass until a second Observable,
   * `notifier`, emits a value. Then, it completes.</span>
   *
   * <img src="./img/takeUntil.png" width="100%">
   *
   * `takeUntil` subscribes and begins mirroring the source Observable. It also
   * monitors a second Observable, `notifier` that you provide. If the `notifier`
   * emits a value, the output Observable stops mirroring the source Observable
   * and completes. If the `notifier` doesn't emit any value and completes
   * then `takeUntil` will pass all values.
   *
   * @example <caption>Tick every second until the first click happens</caption>
   * var interval = Rx.Observable.interval(1000);
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = interval.takeUntil(clicks);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeLast}
   * @see {@link takeWhile}
   * @see {@link skip}
   *
   * @param {Observable} notifier The Observable whose first emitted value will
   * cause the output Observable of `takeUntil` to stop emitting values from the
   * source Observable.
   * @return {Observable<T>} An Observable that emits the values from the source
   * Observable until such time as `notifier` emits its first value.
   * @method takeUntil
   * @owner Observable
   */
  function takeUntil(notifier) {
      return takeUntil_1.takeUntil(notifier)(this);
  }
  exports.takeUntil = takeUntil;
  
  });
  
  unwrapExports(takeUntil_2$1);
  var takeUntil_3 = takeUntil_2$1.takeUntil;
  
  var takeUntil$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.takeUntil = takeUntil_2$1.takeUntil;
  
  });
  
  unwrapExports(takeUntil$2);
  
  var takeWhile_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits values emitted by the source Observable so long as each value satisfies
   * the given `predicate`, and then completes as soon as this `predicate` is not
   * satisfied.
   *
   * <span class="informal">Takes values from the source only while they pass the
   * condition given. When the first value does not satisfy, it completes.</span>
   *
   * <img src="./img/takeWhile.png" width="100%">
   *
   * `takeWhile` subscribes and begins mirroring the source Observable. Each value
   * emitted on the source is given to the `predicate` function which returns a
   * boolean, representing a condition to be satisfied by the source values. The
   * output Observable emits the source values until such time as the `predicate`
   * returns false, at which point `takeWhile` stops mirroring the source
   * Observable and completes the output Observable.
   *
   * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.takeWhile(ev => ev.clientX > 200);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeLast}
   * @see {@link takeUntil}
   * @see {@link skip}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates a value emitted by the source Observable and returns a boolean.
   * Also takes the (zero-based) index as the second argument.
   * @return {Observable<T>} An Observable that emits the values from the source
   * Observable so long as each value satisfies the condition defined by the
   * `predicate`, then completes.
   * @method takeWhile
   * @owner Observable
   */
  function takeWhile(predicate) {
      return function (source) { return source.lift(new TakeWhileOperator(predicate)); };
  }
  exports.takeWhile = takeWhile;
  var TakeWhileOperator = /** @class */ (function () {
      function TakeWhileOperator(predicate) {
          this.predicate = predicate;
      }
      TakeWhileOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
      };
      return TakeWhileOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TakeWhileSubscriber = /** @class */ (function (_super) {
      __extends(TakeWhileSubscriber, _super);
      function TakeWhileSubscriber(destination, predicate) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.index = 0;
          return _this;
      }
      TakeWhileSubscriber.prototype._next = function (value) {
          var destination = this.destination;
          var result;
          try {
              result = this.predicate(value, this.index++);
          }
          catch (err) {
              destination.error(err);
              return;
          }
          this.nextOrComplete(value, result);
      };
      TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
          var destination = this.destination;
          if (Boolean(predicateResult)) {
              destination.next(value);
          }
          else {
              destination.complete();
          }
      };
      return TakeWhileSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(takeWhile_1);
  var takeWhile_2 = takeWhile_1.takeWhile;
  
  var takeWhile_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits values emitted by the source Observable so long as each value satisfies
   * the given `predicate`, and then completes as soon as this `predicate` is not
   * satisfied.
   *
   * <span class="informal">Takes values from the source only while they pass the
   * condition given. When the first value does not satisfy, it completes.</span>
   *
   * <img src="./img/takeWhile.png" width="100%">
   *
   * `takeWhile` subscribes and begins mirroring the source Observable. Each value
   * emitted on the source is given to the `predicate` function which returns a
   * boolean, representing a condition to be satisfied by the source values. The
   * output Observable emits the source values until such time as the `predicate`
   * returns false, at which point `takeWhile` stops mirroring the source
   * Observable and completes the output Observable.
   *
   * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.takeWhile(ev => ev.clientX > 200);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link take}
   * @see {@link takeLast}
   * @see {@link takeUntil}
   * @see {@link skip}
   *
   * @param {function(value: T, index: number): boolean} predicate A function that
   * evaluates a value emitted by the source Observable and returns a boolean.
   * Also takes the (zero-based) index as the second argument.
   * @return {Observable<T>} An Observable that emits the values from the source
   * Observable so long as each value satisfies the condition defined by the
   * `predicate`, then completes.
   * @method takeWhile
   * @owner Observable
   */
  function takeWhile(predicate) {
      return takeWhile_1.takeWhile(predicate)(this);
  }
  exports.takeWhile = takeWhile;
  
  });
  
  unwrapExports(takeWhile_2$1);
  var takeWhile_3 = takeWhile_2$1.takeWhile;
  
  var takeWhile$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.takeWhile = takeWhile_2$1.takeWhile;
  
  });
  
  unwrapExports(takeWhile$2);
  
  var throttle_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  exports.defaultThrottleConfig = {
      leading: true,
      trailing: false
  };
  /**
   * Emits a value from the source Observable, then ignores subsequent source
   * values for a duration determined by another Observable, then repeats this
   * process.
   *
   * <span class="informal">It's like {@link throttleTime}, but the silencing
   * duration is determined by a second Observable.</span>
   *
   * <img src="./img/throttle.png" width="100%">
   *
   * `throttle` emits the source Observable values on the output Observable
   * when its internal timer is disabled, and ignores source values when the timer
   * is enabled. Initially, the timer is disabled. As soon as the first source
   * value arrives, it is forwarded to the output Observable, and then the timer
   * is enabled by calling the `durationSelector` function with the source value,
   * which returns the "duration" Observable. When the duration Observable emits a
   * value or completes, the timer is disabled, and this process repeats for the
   * next source value.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounce}
   * @see {@link delayWhen}
   * @see {@link sample}
   * @see {@link throttleTime}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the silencing
   * duration for each source value, returned as an Observable or a Promise.
   * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
   * to `{ leading: true, trailing: false }`.
   * @return {Observable<T>} An Observable that performs the throttle operation to
   * limit the rate of emissions from the source.
   * @method throttle
   * @owner Observable
   */
  function throttle(durationSelector, config) {
      if (config === void 0) { config = exports.defaultThrottleConfig; }
      return function (source) { return source.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing)); };
  }
  exports.throttle = throttle;
  var ThrottleOperator = /** @class */ (function () {
      function ThrottleOperator(durationSelector, leading, trailing) {
          this.durationSelector = durationSelector;
          this.leading = leading;
          this.trailing = trailing;
      }
      ThrottleOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
      };
      return ThrottleOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc
   * @ignore
   * @extends {Ignored}
   */
  var ThrottleSubscriber = /** @class */ (function (_super) {
      __extends(ThrottleSubscriber, _super);
      function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.durationSelector = durationSelector;
          _this._leading = _leading;
          _this._trailing = _trailing;
          _this._hasTrailingValue = false;
          return _this;
      }
      ThrottleSubscriber.prototype._next = function (value) {
          if (this.throttled) {
              if (this._trailing) {
                  this._hasTrailingValue = true;
                  this._trailingValue = value;
              }
          }
          else {
              var duration = this.tryDurationSelector(value);
              if (duration) {
                  this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
              }
              if (this._leading) {
                  this.destination.next(value);
                  if (this._trailing) {
                      this._hasTrailingValue = true;
                      this._trailingValue = value;
                  }
              }
          }
      };
      ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
          try {
              return this.durationSelector(value);
          }
          catch (err) {
              this.destination.error(err);
              return null;
          }
      };
      ThrottleSubscriber.prototype._unsubscribe = function () {
          var _a = this, throttled = _a.throttled, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue, _trailing = _a._trailing;
          this._trailingValue = null;
          this._hasTrailingValue = false;
          if (throttled) {
              this.remove(throttled);
              this.throttled = null;
              throttled.unsubscribe();
          }
      };
      ThrottleSubscriber.prototype._sendTrailing = function () {
          var _a = this, destination = _a.destination, throttled = _a.throttled, _trailing = _a._trailing, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue;
          if (throttled && _trailing && _hasTrailingValue) {
              destination.next(_trailingValue);
              this._trailingValue = null;
              this._hasTrailingValue = false;
          }
      };
      ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this._sendTrailing();
          this._unsubscribe();
      };
      ThrottleSubscriber.prototype.notifyComplete = function () {
          this._sendTrailing();
          this._unsubscribe();
      };
      return ThrottleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(throttle_1);
  var throttle_2 = throttle_1.defaultThrottleConfig;
  var throttle_3 = throttle_1.throttle;
  
  var throttle_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Emits a value from the source Observable, then ignores subsequent source
   * values for a duration determined by another Observable, then repeats this
   * process.
   *
   * <span class="informal">It's like {@link throttleTime}, but the silencing
   * duration is determined by a second Observable.</span>
   *
   * <img src="./img/throttle.png" width="100%">
   *
   * `throttle` emits the source Observable values on the output Observable
   * when its internal timer is disabled, and ignores source values when the timer
   * is enabled. Initially, the timer is disabled. As soon as the first source
   * value arrives, it is forwarded to the output Observable, and then the timer
   * is enabled by calling the `durationSelector` function with the source value,
   * which returns the "duration" Observable. When the duration Observable emits a
   * value or completes, the timer is disabled, and this process repeats for the
   * next source value.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
   * result.subscribe(x => console.log(x));
   *
   * @see {@link audit}
   * @see {@link debounce}
   * @see {@link delayWhen}
   * @see {@link sample}
   * @see {@link throttleTime}
   *
   * @param {function(value: T): SubscribableOrPromise} durationSelector A function
   * that receives a value from the source Observable, for computing the silencing
   * duration for each source value, returned as an Observable or a Promise.
   * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
   * to `{ leading: true, trailing: false }`.
   * @return {Observable<T>} An Observable that performs the throttle operation to
   * limit the rate of emissions from the source.
   * @method throttle
   * @owner Observable
   */
  function throttle(durationSelector, config) {
      if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
      return throttle_1.throttle(durationSelector, config)(this);
  }
  exports.throttle = throttle;
  
  });
  
  unwrapExports(throttle_2$1);
  var throttle_3$1 = throttle_2$1.throttle;
  
  var throttle$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.throttle = throttle_2$1.throttle;
  
  });
  
  unwrapExports(throttle$2);
  
  var throttleTime_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Emits a value from the source Observable, then ignores subsequent source
   * values for `duration` milliseconds, then repeats this process.
   *
   * <span class="informal">Lets a value pass, then ignores source values for the
   * next `duration` milliseconds.</span>
   *
   * <img src="./img/throttleTime.png" width="100%">
   *
   * `throttleTime` emits the source Observable values on the output Observable
   * when its internal timer is disabled, and ignores source values when the timer
   * is enabled. Initially, the timer is disabled. As soon as the first source
   * value arrives, it is forwarded to the output Observable, and then the timer
   * is enabled. After `duration` milliseconds (or the time unit determined
   * internally by the optional `scheduler`) has passed, the timer is disabled,
   * and this process repeats for the next source value. Optionally takes a
   * {@link IScheduler} for managing timers.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.throttleTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttle}
   *
   * @param {number} duration Time to wait before emitting another value after
   * emitting the last value, measured in milliseconds or the time unit determined
   * internally by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the throttling.
   * @return {Observable<T>} An Observable that performs the throttle operation to
   * limit the rate of emissions from the source.
   * @method throttleTime
   * @owner Observable
   */
  function throttleTime(duration, scheduler, config) {
      if (scheduler === void 0) { scheduler = async.async; }
      if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
      return function (source) { return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing)); };
  }
  exports.throttleTime = throttleTime;
  var ThrottleTimeOperator = /** @class */ (function () {
      function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
          this.duration = duration;
          this.scheduler = scheduler;
          this.leading = leading;
          this.trailing = trailing;
      }
      ThrottleTimeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
      };
      return ThrottleTimeOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ThrottleTimeSubscriber = /** @class */ (function (_super) {
      __extends(ThrottleTimeSubscriber, _super);
      function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
          var _this = _super.call(this, destination) || this;
          _this.duration = duration;
          _this.scheduler = scheduler;
          _this.leading = leading;
          _this.trailing = trailing;
          _this._hasTrailingValue = false;
          _this._trailingValue = null;
          return _this;
      }
      ThrottleTimeSubscriber.prototype._next = function (value) {
          if (this.throttled) {
              if (this.trailing) {
                  this._trailingValue = value;
                  this._hasTrailingValue = true;
              }
          }
          else {
              this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
              if (this.leading) {
                  this.destination.next(value);
              }
          }
      };
      ThrottleTimeSubscriber.prototype.clearThrottle = function () {
          var throttled = this.throttled;
          if (throttled) {
              if (this.trailing && this._hasTrailingValue) {
                  this.destination.next(this._trailingValue);
                  this._trailingValue = null;
                  this._hasTrailingValue = false;
              }
              throttled.unsubscribe();
              this.remove(throttled);
              this.throttled = null;
          }
      };
      return ThrottleTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchNext(arg) {
      var subscriber = arg.subscriber;
      subscriber.clearThrottle();
  }
  
  });
  
  unwrapExports(throttleTime_1);
  var throttleTime_2 = throttleTime_1.throttleTime;
  
  var throttleTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Emits a value from the source Observable, then ignores subsequent source
   * values for `duration` milliseconds, then repeats this process.
   *
   * <span class="informal">Lets a value pass, then ignores source values for the
   * next `duration` milliseconds.</span>
   *
   * <img src="./img/throttleTime.png" width="100%">
   *
   * `throttleTime` emits the source Observable values on the output Observable
   * when its internal timer is disabled, and ignores source values when the timer
   * is enabled. Initially, the timer is disabled. As soon as the first source
   * value arrives, it is forwarded to the output Observable, and then the timer
   * is enabled. After `duration` milliseconds (or the time unit determined
   * internally by the optional `scheduler`) has passed, the timer is disabled,
   * and this process repeats for the next source value. Optionally takes a
   * {@link IScheduler} for managing timers.
   *
   * @example <caption>Emit clicks at a rate of at most one click per second</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.throttleTime(1000);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link auditTime}
   * @see {@link debounceTime}
   * @see {@link delay}
   * @see {@link sampleTime}
   * @see {@link throttle}
   *
   * @param {number} duration Time to wait before emitting another value after
   * emitting the last value, measured in milliseconds or the time unit determined
   * internally by the optional `scheduler`.
   * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
   * managing the timers that handle the throttling.
   * @return {Observable<T>} An Observable that performs the throttle operation to
   * limit the rate of emissions from the source.
   * @method throttleTime
   * @owner Observable
   */
  function throttleTime(duration, scheduler, config) {
      if (scheduler === void 0) { scheduler = async.async; }
      if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
      return throttleTime_1.throttleTime(duration, scheduler, config)(this);
  }
  exports.throttleTime = throttleTime;
  
  });
  
  unwrapExports(throttleTime_2$1);
  var throttleTime_3 = throttleTime_2$1.throttleTime;
  
  var throttleTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.throttleTime = throttleTime_2$1.throttleTime;
  
  });
  
  unwrapExports(throttleTime$2);
  
  var timeInterval_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  function timeInterval(scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return function (source) { return source.lift(new TimeIntervalOperator(scheduler)); };
  }
  exports.timeInterval = timeInterval;
  var TimeInterval = /** @class */ (function () {
      function TimeInterval(value, interval) {
          this.value = value;
          this.interval = interval;
      }
      return TimeInterval;
  }());
  exports.TimeInterval = TimeInterval;
  var TimeIntervalOperator = /** @class */ (function () {
      function TimeIntervalOperator(scheduler) {
          this.scheduler = scheduler;
      }
      TimeIntervalOperator.prototype.call = function (observer, source) {
          return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
      };
      return TimeIntervalOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TimeIntervalSubscriber = /** @class */ (function (_super) {
      __extends(TimeIntervalSubscriber, _super);
      function TimeIntervalSubscriber(destination, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.scheduler = scheduler;
          _this.lastTime = 0;
          _this.lastTime = scheduler.now();
          return _this;
      }
      TimeIntervalSubscriber.prototype._next = function (value) {
          var now = this.scheduler.now();
          var span = now - this.lastTime;
          this.lastTime = now;
          this.destination.next(new TimeInterval(value, span));
      };
      return TimeIntervalSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(timeInterval_1);
  var timeInterval_2 = timeInterval_1.timeInterval;
  var timeInterval_3 = timeInterval_1.TimeInterval;
  
  var timeInterval_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  exports.TimeInterval = timeInterval_1.TimeInterval;
  /**
   * @param scheduler
   * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
   * @method timeInterval
   * @owner Observable
   */
  function timeInterval(scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return timeInterval_1.timeInterval(scheduler)(this);
  }
  exports.timeInterval = timeInterval;
  
  });
  
  unwrapExports(timeInterval_2$1);
  var timeInterval_3$1 = timeInterval_2$1.TimeInterval;
  var timeInterval_4 = timeInterval_2$1.timeInterval;
  
  var timeInterval$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.timeInterval = timeInterval_2$1.timeInterval;
  
  });
  
  unwrapExports(timeInterval$2);
  
  var TimeoutError_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * An error thrown when duetime elapses.
   *
   * @see {@link timeout}
   *
   * @class TimeoutError
   */
  var TimeoutError = /** @class */ (function (_super) {
      __extends(TimeoutError, _super);
      function TimeoutError() {
          var _this = _super.call(this, 'Timeout has occurred') || this;
          Object.setPrototypeOf(_this, TimeoutError.prototype);
          return _this;
      }
      return TimeoutError;
  }(Error));
  exports.TimeoutError = TimeoutError;
  
  });
  
  unwrapExports(TimeoutError_1);
  var TimeoutError_2 = TimeoutError_1.TimeoutError;
  
  var timeout_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   *
   * Errors if Observable does not emit a value in given time span.
   *
   * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
   *
   * <img src="./img/timeout.png" width="100%">
   *
   * `timeout` operator accepts as an argument either a number or a Date.
   *
   * If number was provided, it returns an Observable that behaves like a source
   * Observable, unless there is a period of time where there is no value emitted.
   * So if you provide `100` as argument and first value comes after 50ms from
   * the moment of subscription, this value will be simply re-emitted by the resulting
   * Observable. If however after that 100ms passes without a second value being emitted,
   * stream will end with an error and source Observable will be unsubscribed.
   * These checks are performed throughout whole lifecycle of Observable - from the moment
   * it was subscribed to, until it completes or errors itself. Thus every value must be
   * emitted within specified period since previous value.
   *
   * If provided argument was Date, returned Observable behaves differently. It throws
   * if Observable did not complete before provided Date. This means that periods between
   * emission of particular values do not matter in this case. If Observable did not complete
   * before provided Date, source Observable will be unsubscribed. Other than that, resulting
   * stream behaves just as source Observable.
   *
   * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
   * when returned Observable will check if source stream emitted value or completed.
   *
   * @example <caption>Check if ticks are emitted within certain timespan</caption>
   * const seconds = Rx.Observable.interval(1000);
   *
   * seconds.timeout(1100) // Let's use bigger timespan to be safe,
   *                       // since `interval` might fire a bit later then scheduled.
   * .subscribe(
   *     value => console.log(value), // Will emit numbers just as regular `interval` would.
   *     err => console.log(err) // Will never be called.
   * );
   *
   * seconds.timeout(900).subscribe(
   *     value => console.log(value), // Will never be called.
   *     err => console.log(err) // Will emit error before even first value is emitted,
   *                             // since it did not arrive within 900ms period.
   * );
   *
   * @example <caption>Use Date to check if Observable completed</caption>
   * const seconds = Rx.Observable.interval(1000);
   *
   * seconds.timeout(new Date("December 17, 2020 03:24:00"))
   * .subscribe(
   *     value => console.log(value), // Will emit values as regular `interval` would
   *                                  // until December 17, 2020 at 03:24:00.
   *     err => console.log(err) // On December 17, 2020 at 03:24:00 it will emit an error,
   *                             // since Observable did not complete by then.
   * );
   *
   * @see {@link timeoutWith}
   *
   * @param {number|Date} due Number specifying period within which Observable must emit values
   *                          or Date specifying before when Observable should complete
   * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
   * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
   * @method timeout
   * @owner Observable
   */
  function timeout(due, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      var absoluteTimeout = isDate_1.isDate(due);
      var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
      return function (source) { return source.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError())); };
  }
  exports.timeout = timeout;
  var TimeoutOperator = /** @class */ (function () {
      function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
          this.waitFor = waitFor;
          this.absoluteTimeout = absoluteTimeout;
          this.scheduler = scheduler;
          this.errorInstance = errorInstance;
      }
      TimeoutOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
      };
      return TimeoutOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TimeoutSubscriber = /** @class */ (function (_super) {
      __extends(TimeoutSubscriber, _super);
      function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
          var _this = _super.call(this, destination) || this;
          _this.absoluteTimeout = absoluteTimeout;
          _this.waitFor = waitFor;
          _this.scheduler = scheduler;
          _this.errorInstance = errorInstance;
          _this.action = null;
          _this.scheduleTimeout();
          return _this;
      }
      TimeoutSubscriber.dispatchTimeout = function (subscriber) {
          subscriber.error(subscriber.errorInstance);
      };
      TimeoutSubscriber.prototype.scheduleTimeout = function () {
          var action = this.action;
          if (action) {
              // Recycle the action if we've already scheduled one. All the production
              // Scheduler Actions mutate their state/delay time and return themeselves.
              // VirtualActions are immutable, so they create and return a clone. In this
              // case, we need to set the action reference to the most recent VirtualAction,
              // to ensure that's the one we clone from next time.
              this.action = action.schedule(this, this.waitFor);
          }
          else {
              this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
          }
      };
      TimeoutSubscriber.prototype._next = function (value) {
          if (!this.absoluteTimeout) {
              this.scheduleTimeout();
          }
          _super.prototype._next.call(this, value);
      };
      TimeoutSubscriber.prototype._unsubscribe = function () {
          this.action = null;
          this.scheduler = null;
          this.errorInstance = null;
      };
      return TimeoutSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(timeout_1);
  var timeout_2 = timeout_1.timeout;
  
  var timeout_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Errors if Observable does not emit a value in given time span.
   *
   * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
   *
   * <img src="./img/timeout.png" width="100%">
   *
   * `timeout` operator accepts as an argument either a number or a Date.
   *
   * If number was provided, it returns an Observable that behaves like a source
   * Observable, unless there is a period of time where there is no value emitted.
   * So if you provide `100` as argument and first value comes after 50ms from
   * the moment of subscription, this value will be simply re-emitted by the resulting
   * Observable. If however after that 100ms passes without a second value being emitted,
   * stream will end with an error and source Observable will be unsubscribed.
   * These checks are performed throughout whole lifecycle of Observable - from the moment
   * it was subscribed to, until it completes or errors itself. Thus every value must be
   * emitted within specified period since previous value.
   *
   * If provided argument was Date, returned Observable behaves differently. It throws
   * if Observable did not complete before provided Date. This means that periods between
   * emission of particular values do not matter in this case. If Observable did not complete
   * before provided Date, source Observable will be unsubscribed. Other than that, resulting
   * stream behaves just as source Observable.
   *
   * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
   * when returned Observable will check if source stream emitted value or completed.
   *
   * @example <caption>Check if ticks are emitted within certain timespan</caption>
   * const seconds = Rx.Observable.interval(1000);
   *
   * seconds.timeout(1100) // Let's use bigger timespan to be safe,
   *                       // since `interval` might fire a bit later then scheduled.
   * .subscribe(
   *     value => console.log(value), // Will emit numbers just as regular `interval` would.
   *     err => console.log(err) // Will never be called.
   * );
   *
   * seconds.timeout(900).subscribe(
   *     value => console.log(value), // Will never be called.
   *     err => console.log(err) // Will emit error before even first value is emitted,
   *                             // since it did not arrive within 900ms period.
   * );
   *
   * @example <caption>Use Date to check if Observable completed</caption>
   * const seconds = Rx.Observable.interval(1000);
   *
   * seconds.timeout(new Date("December 17, 2020 03:24:00"))
   * .subscribe(
   *     value => console.log(value), // Will emit values as regular `interval` would
   *                                  // until December 17, 2020 at 03:24:00.
   *     err => console.log(err) // On December 17, 2020 at 03:24:00 it will emit an error,
   *                             // since Observable did not complete by then.
   * );
   *
   * @see {@link timeoutWith}
   *
   * @param {number|Date} due Number specifying period within which Observable must emit values
   *                          or Date specifying before when Observable should complete
   * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
   * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
   * @method timeout
   * @owner Observable
   */
  function timeout(due, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return timeout_1.timeout(due, scheduler)(this);
  }
  exports.timeout = timeout;
  
  });
  
  unwrapExports(timeout_2$1);
  var timeout_3 = timeout_2$1.timeout;
  
  var timeout$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.timeout = timeout_2$1.timeout;
  
  });
  
  unwrapExports(timeout$2);
  
  var timeoutWith_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /* tslint:enable:max-line-length */
  /**
   *
   * Errors if Observable does not emit a value in given time span, in case of which
   * subscribes to the second Observable.
   *
   * <span class="informal">It's a version of `timeout` operator that let's you specify fallback Observable.</span>
   *
   * <img src="./img/timeoutWith.png" width="100%">
   *
   * `timeoutWith` is a variation of `timeout` operator. It behaves exactly the same,
   * still accepting as a first argument either a number or a Date, which control - respectively -
   * when values of source Observable should be emitted or when it should complete.
   *
   * The only difference is that it accepts a second, required parameter. This parameter
   * should be an Observable which will be subscribed when source Observable fails any timeout check.
   * So whenever regular `timeout` would emit an error, `timeoutWith` will instead start re-emitting
   * values from second Observable. Note that this fallback Observable is not checked for timeouts
   * itself, so it can emit values and complete at arbitrary points in time. From the moment of a second
   * subscription, Observable returned from `timeoutWith` simply mirrors fallback stream. When that
   * stream completes, it completes as well.
   *
   * Scheduler, which in case of `timeout` is provided as as second argument, can be still provided
   * here - as a third, optional parameter. It still is used to schedule timeout checks and -
   * as a consequence - when second Observable will be subscribed, since subscription happens
   * immediately after failing check.
   *
   * @example <caption>Add fallback observable</caption>
   * const seconds = Rx.Observable.interval(1000);
   * const minutes = Rx.Observable.interval(60 * 1000);
   *
   * seconds.timeoutWith(900, minutes)
   *     .subscribe(
   *         value => console.log(value), // After 900ms, will start emitting `minutes`,
   *                                      // since first value of `seconds` will not arrive fast enough.
   *         err => console.log(err) // Would be called after 900ms in case of `timeout`,
   *                                 // but here will never be called.
   *     );
   *
   * @param {number|Date} due Number specifying period within which Observable must emit values
   *                          or Date specifying before when Observable should complete
   * @param {Observable<T>} withObservable Observable which will be subscribed if source fails timeout check.
   * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
   * @return {Observable<T>} Observable that mirrors behaviour of source or, when timeout check fails, of an Observable
   *                          passed as a second parameter.
   * @method timeoutWith
   * @owner Observable
   */
  function timeoutWith(due, withObservable, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return function (source) {
          var absoluteTimeout = isDate_1.isDate(due);
          var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
          return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
      };
  }
  exports.timeoutWith = timeoutWith;
  var TimeoutWithOperator = /** @class */ (function () {
      function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
          this.waitFor = waitFor;
          this.absoluteTimeout = absoluteTimeout;
          this.withObservable = withObservable;
          this.scheduler = scheduler;
      }
      TimeoutWithOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
      };
      return TimeoutWithOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var TimeoutWithSubscriber = /** @class */ (function (_super) {
      __extends(TimeoutWithSubscriber, _super);
      function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.absoluteTimeout = absoluteTimeout;
          _this.waitFor = waitFor;
          _this.withObservable = withObservable;
          _this.scheduler = scheduler;
          _this.action = null;
          _this.scheduleTimeout();
          return _this;
      }
      TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
          var withObservable = subscriber.withObservable;
          subscriber._unsubscribeAndRecycle();
          subscriber.add(subscribeToResult_1.subscribeToResult(subscriber, withObservable));
      };
      TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
          var action = this.action;
          if (action) {
              // Recycle the action if we've already scheduled one. All the production
              // Scheduler Actions mutate their state/delay time and return themeselves.
              // VirtualActions are immutable, so they create and return a clone. In this
              // case, we need to set the action reference to the most recent VirtualAction,
              // to ensure that's the one we clone from next time.
              this.action = action.schedule(this, this.waitFor);
          }
          else {
              this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
          }
      };
      TimeoutWithSubscriber.prototype._next = function (value) {
          if (!this.absoluteTimeout) {
              this.scheduleTimeout();
          }
          _super.prototype._next.call(this, value);
      };
      TimeoutWithSubscriber.prototype._unsubscribe = function () {
          this.action = null;
          this.scheduler = null;
          this.withObservable = null;
      };
      return TimeoutWithSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(timeoutWith_1);
  var timeoutWith_2 = timeoutWith_1.timeoutWith;
  
  var timeoutWith_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   *
   * Errors if Observable does not emit a value in given time span, in case of which
   * subscribes to the second Observable.
   *
   * <span class="informal">It's a version of `timeout` operator that let's you specify fallback Observable.</span>
   *
   * <img src="./img/timeoutWith.png" width="100%">
   *
   * `timeoutWith` is a variation of `timeout` operator. It behaves exactly the same,
   * still accepting as a first argument either a number or a Date, which control - respectively -
   * when values of source Observable should be emitted or when it should complete.
   *
   * The only difference is that it accepts a second, required parameter. This parameter
   * should be an Observable which will be subscribed when source Observable fails any timeout check.
   * So whenever regular `timeout` would emit an error, `timeoutWith` will instead start re-emitting
   * values from second Observable. Note that this fallback Observable is not checked for timeouts
   * itself, so it can emit values and complete at arbitrary points in time. From the moment of a second
   * subscription, Observable returned from `timeoutWith` simply mirrors fallback stream. When that
   * stream completes, it completes as well.
   *
   * Scheduler, which in case of `timeout` is provided as as second argument, can be still provided
   * here - as a third, optional parameter. It still is used to schedule timeout checks and -
   * as a consequence - when second Observable will be subscribed, since subscription happens
   * immediately after failing check.
   *
   * @example <caption>Add fallback observable</caption>
   * const seconds = Rx.Observable.interval(1000);
   * const minutes = Rx.Observable.interval(60 * 1000);
   *
   * seconds.timeoutWith(900, minutes)
   *     .subscribe(
   *         value => console.log(value), // After 900ms, will start emitting `minutes`,
   *                                      // since first value of `seconds` will not arrive fast enough.
   *         err => console.log(err) // Would be called after 900ms in case of `timeout`,
   *                                 // but here will never be called.
   *     );
   *
   * @param {number|Date} due Number specifying period within which Observable must emit values
   *                          or Date specifying before when Observable should complete
   * @param {Observable<T>} withObservable Observable which will be subscribed if source fails timeout check.
   * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
   * @return {Observable<T>} Observable that mirrors behaviour of source or, when timeout check fails, of an Observable
   *                          passed as a second parameter.
   * @method timeoutWith
   * @owner Observable
   */
  function timeoutWith(due, withObservable, scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return timeoutWith_1.timeoutWith(due, withObservable, scheduler)(this);
  }
  exports.timeoutWith = timeoutWith;
  
  });
  
  unwrapExports(timeoutWith_2$1);
  var timeoutWith_3 = timeoutWith_2$1.timeoutWith;
  
  var timeoutWith$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.timeoutWith = timeoutWith_2$1.timeoutWith;
  
  });
  
  unwrapExports(timeoutWith$2);
  
  var timestamp_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * @param scheduler
   * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
   * @method timestamp
   * @owner Observable
   */
  function timestamp(scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return map_1.map(function (value) { return new Timestamp(value, scheduler.now()); });
      // return (source: Observable<T>) => source.lift(new TimestampOperator(scheduler));
  }
  exports.timestamp = timestamp;
  var Timestamp = /** @class */ (function () {
      function Timestamp(value, timestamp) {
          this.value = value;
          this.timestamp = timestamp;
      }
      return Timestamp;
  }());
  exports.Timestamp = Timestamp;
  
  });
  
  unwrapExports(timestamp_1);
  var timestamp_2 = timestamp_1.timestamp;
  var timestamp_3 = timestamp_1.Timestamp;
  
  var timestamp_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * @param scheduler
   * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
   * @method timestamp
   * @owner Observable
   */
  function timestamp(scheduler) {
      if (scheduler === void 0) { scheduler = async.async; }
      return timestamp_1.timestamp(scheduler)(this);
  }
  exports.timestamp = timestamp;
  
  });
  
  unwrapExports(timestamp_2$1);
  var timestamp_3$1 = timestamp_2$1.timestamp;
  
  var timestamp$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.timestamp = timestamp_2$1.timestamp;
  
  });
  
  unwrapExports(timestamp$2);
  
  var toArray_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function toArrayReducer(arr, item, index) {
      if (index === 0) {
          return [item];
      }
      arr.push(item);
      return arr;
  }
  function toArray() {
      return reduce_1.reduce(toArrayReducer, []);
  }
  exports.toArray = toArray;
  
  });
  
  unwrapExports(toArray_1);
  var toArray_2 = toArray_1.toArray;
  
  var toArray_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Collects all source emissions and emits them as an array when the source completes.
   *
   * <span class="informal">Get all values inside an array when the source completes</span>
   *
   * <img src="./img/toArray.png" width="100%">
   *
   * `toArray` will wait until the source Observable completes
   * before emitting the array containing all emissions.
   * When the source Observable errors no array will be emitted.
   *
   * @example <caption>Create array from input</caption>
   * const input = Rx.Observable.interval(100).take(4);
   *
   * input.toArray()
   *   .subscribe(arr => console.log(arr)); // [0,1,2,3]
   *
   * @see {@link buffer}
   *
   * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
   * @method toArray
   * @owner Observable
   */
  function toArray() {
      return toArray_1.toArray()(this);
  }
  exports.toArray = toArray;
  
  });
  
  unwrapExports(toArray_2$1);
  var toArray_3 = toArray_2$1.toArray;
  
  var toArray$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.toArray = toArray_2$1.toArray;
  
  });
  
  unwrapExports(toArray$2);
  
  // HACK: does nothing, because `toPromise` now lives on the `Observable` itself.
  // leaving this module here to prevent breakage.
  
  var window_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  /**
   * Branch out the source Observable values as a nested Observable whenever
   * `windowBoundaries` emits.
   *
   * <span class="informal">It's like {@link buffer}, but emits a nested Observable
   * instead of an array.</span>
   *
   * <img src="./img/window.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits connected, non-overlapping
   * windows. It emits the current window and opens a new one whenever the
   * Observable `windowBoundaries` emits an item. Because each window is an
   * Observable, the output is a higher-order Observable.
   *
   * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var interval = Rx.Observable.interval(1000);
   * var result = clicks.window(interval)
   *   .map(win => win.take(2)) // each window has at most 2 emissions
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link windowWhen}
   * @see {@link buffer}
   *
   * @param {Observable<any>} windowBoundaries An Observable that completes the
   * previous window and starts a new window.
   * @return {Observable<Observable<T>>} An Observable of windows, which are
   * Observables emitting values of the source Observable.
   * @method window
   * @owner Observable
   */
  function window(windowBoundaries) {
      return function windowOperatorFunction(source) {
          return source.lift(new WindowOperator(windowBoundaries));
      };
  }
  exports.window = window;
  var WindowOperator = /** @class */ (function () {
      function WindowOperator(windowBoundaries) {
          this.windowBoundaries = windowBoundaries;
      }
      WindowOperator.prototype.call = function (subscriber, source) {
          var windowSubscriber = new WindowSubscriber(subscriber);
          var sourceSubscription = source.subscribe(windowSubscriber);
          if (!sourceSubscription.closed) {
              windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
          }
          return sourceSubscription;
      };
      return WindowOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WindowSubscriber = /** @class */ (function (_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.window = new Subject_1.Subject();
          destination.next(_this.window);
          return _this;
      }
      WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.openWindow();
      };
      WindowSubscriber.prototype.notifyError = function (error, innerSub) {
          this._error(error);
      };
      WindowSubscriber.prototype.notifyComplete = function (innerSub) {
          this._complete();
      };
      WindowSubscriber.prototype._next = function (value) {
          this.window.next(value);
      };
      WindowSubscriber.prototype._error = function (err) {
          this.window.error(err);
          this.destination.error(err);
      };
      WindowSubscriber.prototype._complete = function () {
          this.window.complete();
          this.destination.complete();
      };
      WindowSubscriber.prototype._unsubscribe = function () {
          this.window = null;
      };
      WindowSubscriber.prototype.openWindow = function () {
          var prevWindow = this.window;
          if (prevWindow) {
              prevWindow.complete();
          }
          var destination = this.destination;
          var newWindow = this.window = new Subject_1.Subject();
          destination.next(newWindow);
      };
      return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(window_1);
  var window_2 = window_1.window;
  
  var window_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Branch out the source Observable values as a nested Observable whenever
   * `windowBoundaries` emits.
   *
   * <span class="informal">It's like {@link buffer}, but emits a nested Observable
   * instead of an array.</span>
   *
   * <img src="./img/window.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits connected, non-overlapping
   * windows. It emits the current window and opens a new one whenever the
   * Observable `windowBoundaries` emits an item. Because each window is an
   * Observable, the output is a higher-order Observable.
   *
   * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var interval = Rx.Observable.interval(1000);
   * var result = clicks.window(interval)
   *   .map(win => win.take(2)) // each window has at most 2 emissions
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link windowWhen}
   * @see {@link buffer}
   *
   * @param {Observable<any>} windowBoundaries An Observable that completes the
   * previous window and starts a new window.
   * @return {Observable<Observable<T>>} An Observable of windows, which are
   * Observables emitting values of the source Observable.
   * @method window
   * @owner Observable
   */
  function window(windowBoundaries) {
      return window_1.window(windowBoundaries)(this);
  }
  exports.window = window;
  
  });
  
  unwrapExports(window_2$1);
  var window_3 = window_2$1.window;
  
  var window$3 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.window = window_2$1.window;
  
  });
  
  unwrapExports(window$3);
  
  var windowCount_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * Branch out the source Observable values as a nested Observable with each
   * nested Observable emitting at most `windowSize` values.
   *
   * <span class="informal">It's like {@link bufferCount}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowCount.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits windows every `startWindowEvery`
   * items, each containing no more than `windowSize` items. When the source
   * Observable completes or encounters an error, the output Observable emits
   * the current window and propagates the notification from the source
   * Observable. If `startWindowEvery` is not provided, then new windows are
   * started immediately at the start of the source and when each window completes
   * with size `windowSize`.
   *
   * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.windowCount(3)
   *   .map(win => win.skip(1)) // skip first of every 3 clicks
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.windowCount(2, 3)
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link windowWhen}
   * @see {@link bufferCount}
   *
   * @param {number} windowSize The maximum number of values emitted by each
   * window.
   * @param {number} [startWindowEvery] Interval at which to start a new window.
   * For example if `startWindowEvery` is `2`, then a new window will be started
   * on every other value from the source. A new window is started at the
   * beginning of the source by default.
   * @return {Observable<Observable<T>>} An Observable of windows, which in turn
   * are Observable of values.
   * @method windowCount
   * @owner Observable
   */
  function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) { startWindowEvery = 0; }
      return function windowCountOperatorFunction(source) {
          return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
      };
  }
  exports.windowCount = windowCount;
  var WindowCountOperator = /** @class */ (function () {
      function WindowCountOperator(windowSize, startWindowEvery) {
          this.windowSize = windowSize;
          this.startWindowEvery = startWindowEvery;
      }
      WindowCountOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
      };
      return WindowCountOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WindowCountSubscriber = /** @class */ (function (_super) {
      __extends(WindowCountSubscriber, _super);
      function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.windowSize = windowSize;
          _this.startWindowEvery = startWindowEvery;
          _this.windows = [new Subject_1.Subject()];
          _this.count = 0;
          destination.next(_this.windows[0]);
          return _this;
      }
      WindowCountSubscriber.prototype._next = function (value) {
          var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
          var destination = this.destination;
          var windowSize = this.windowSize;
          var windows = this.windows;
          var len = windows.length;
          for (var i = 0; i < len && !this.closed; i++) {
              windows[i].next(value);
          }
          var c = this.count - windowSize + 1;
          if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
              windows.shift().complete();
          }
          if (++this.count % startWindowEvery === 0 && !this.closed) {
              var window_1 = new Subject_1.Subject();
              windows.push(window_1);
              destination.next(window_1);
          }
      };
      WindowCountSubscriber.prototype._error = function (err) {
          var windows = this.windows;
          if (windows) {
              while (windows.length > 0 && !this.closed) {
                  windows.shift().error(err);
              }
          }
          this.destination.error(err);
      };
      WindowCountSubscriber.prototype._complete = function () {
          var windows = this.windows;
          if (windows) {
              while (windows.length > 0 && !this.closed) {
                  windows.shift().complete();
              }
          }
          this.destination.complete();
      };
      WindowCountSubscriber.prototype._unsubscribe = function () {
          this.count = 0;
          this.windows = null;
      };
      return WindowCountSubscriber;
  }(Subscriber_1.Subscriber));
  
  });
  
  unwrapExports(windowCount_1);
  var windowCount_2 = windowCount_1.windowCount;
  
  var windowCount_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Branch out the source Observable values as a nested Observable with each
   * nested Observable emitting at most `windowSize` values.
   *
   * <span class="informal">It's like {@link bufferCount}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowCount.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits windows every `startWindowEvery`
   * items, each containing no more than `windowSize` items. When the source
   * Observable completes or encounters an error, the output Observable emits
   * the current window and propagates the notification from the source
   * Observable. If `startWindowEvery` is not provided, then new windows are
   * started immediately at the start of the source and when each window completes
   * with size `windowSize`.
   *
   * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.windowCount(3)
   *   .map(win => win.skip(1)) // skip first of every 3 clicks
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks.windowCount(2, 3)
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link windowWhen}
   * @see {@link bufferCount}
   *
   * @param {number} windowSize The maximum number of values emitted by each
   * window.
   * @param {number} [startWindowEvery] Interval at which to start a new window.
   * For example if `startWindowEvery` is `2`, then a new window will be started
   * on every other value from the source. A new window is started at the
   * beginning of the source by default.
   * @return {Observable<Observable<T>>} An Observable of windows, which in turn
   * are Observable of values.
   * @method windowCount
   * @owner Observable
   */
  function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) { startWindowEvery = 0; }
      return windowCount_1.windowCount(windowSize, startWindowEvery)(this);
  }
  exports.windowCount = windowCount;
  
  });
  
  unwrapExports(windowCount_2$1);
  var windowCount_3 = windowCount_2$1.windowCount;
  
  var windowCount$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.windowCount = windowCount_2$1.windowCount;
  
  });
  
  unwrapExports(windowCount$2);
  
  var windowTime_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  function windowTime(windowTimeSpan) {
      var scheduler = async.async;
      var windowCreationInterval = null;
      var maxWindowSize = Number.POSITIVE_INFINITY;
      if (isScheduler_1.isScheduler(arguments[3])) {
          scheduler = arguments[3];
      }
      if (isScheduler_1.isScheduler(arguments[2])) {
          scheduler = arguments[2];
      }
      else if (isNumeric_1.isNumeric(arguments[2])) {
          maxWindowSize = arguments[2];
      }
      if (isScheduler_1.isScheduler(arguments[1])) {
          scheduler = arguments[1];
      }
      else if (isNumeric_1.isNumeric(arguments[1])) {
          windowCreationInterval = arguments[1];
      }
      return function windowTimeOperatorFunction(source) {
          return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
      };
  }
  exports.windowTime = windowTime;
  var WindowTimeOperator = /** @class */ (function () {
      function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
          this.windowTimeSpan = windowTimeSpan;
          this.windowCreationInterval = windowCreationInterval;
          this.maxWindowSize = maxWindowSize;
          this.scheduler = scheduler;
      }
      WindowTimeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
      };
      return WindowTimeOperator;
  }());
  var CountedSubject = /** @class */ (function (_super) {
      __extends(CountedSubject, _super);
      function CountedSubject() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this._numberOfNextedValues = 0;
          return _this;
      }
      CountedSubject.prototype.next = function (value) {
          this._numberOfNextedValues++;
          _super.prototype.next.call(this, value);
      };
      Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
          get: function () {
              return this._numberOfNextedValues;
          },
          enumerable: true,
          configurable: true
      });
      return CountedSubject;
  }(Subject_1.Subject));
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WindowTimeSubscriber = /** @class */ (function (_super) {
      __extends(WindowTimeSubscriber, _super);
      function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.windowTimeSpan = windowTimeSpan;
          _this.windowCreationInterval = windowCreationInterval;
          _this.maxWindowSize = maxWindowSize;
          _this.scheduler = scheduler;
          _this.windows = [];
          var window = _this.openWindow();
          if (windowCreationInterval !== null && windowCreationInterval >= 0) {
              var closeState = { subscriber: _this, window: window, context: null };
              var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
              _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
              _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
          }
          else {
              var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
              _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
          }
          return _this;
      }
      WindowTimeSubscriber.prototype._next = function (value) {
          var windows = this.windows;
          var len = windows.length;
          for (var i = 0; i < len; i++) {
              var window_1 = windows[i];
              if (!window_1.closed) {
                  window_1.next(value);
                  if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                      this.closeWindow(window_1);
                  }
              }
          }
      };
      WindowTimeSubscriber.prototype._error = function (err) {
          var windows = this.windows;
          while (windows.length > 0) {
              windows.shift().error(err);
          }
          this.destination.error(err);
      };
      WindowTimeSubscriber.prototype._complete = function () {
          var windows = this.windows;
          while (windows.length > 0) {
              var window_2 = windows.shift();
              if (!window_2.closed) {
                  window_2.complete();
              }
          }
          this.destination.complete();
      };
      WindowTimeSubscriber.prototype.openWindow = function () {
          var window = new CountedSubject();
          this.windows.push(window);
          var destination = this.destination;
          destination.next(window);
          return window;
      };
      WindowTimeSubscriber.prototype.closeWindow = function (window) {
          window.complete();
          var windows = this.windows;
          windows.splice(windows.indexOf(window), 1);
      };
      return WindowTimeSubscriber;
  }(Subscriber_1.Subscriber));
  function dispatchWindowTimeSpanOnly(state) {
      var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
      if (window) {
          subscriber.closeWindow(window);
      }
      state.window = subscriber.openWindow();
      this.schedule(state, windowTimeSpan);
  }
  function dispatchWindowCreation(state) {
      var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
      var window = subscriber.openWindow();
      var action = this;
      var context = { action: action, subscription: null };
      var timeSpanState = { subscriber: subscriber, window: window, context: context };
      context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
      action.add(context.subscription);
      action.schedule(state, windowCreationInterval);
  }
  function dispatchWindowClose(state) {
      var subscriber = state.subscriber, window = state.window, context = state.context;
      if (context && context.action && context.subscription) {
          context.action.remove(context.subscription);
      }
      subscriber.closeWindow(window);
  }
  
  });
  
  unwrapExports(windowTime_1);
  var windowTime_2 = windowTime_1.windowTime;
  
  var windowTime_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  function windowTime(windowTimeSpan) {
      var scheduler = async.async;
      var windowCreationInterval = null;
      var maxWindowSize = Number.POSITIVE_INFINITY;
      if (isScheduler_1.isScheduler(arguments[3])) {
          scheduler = arguments[3];
      }
      if (isScheduler_1.isScheduler(arguments[2])) {
          scheduler = arguments[2];
      }
      else if (isNumeric_1.isNumeric(arguments[2])) {
          maxWindowSize = arguments[2];
      }
      if (isScheduler_1.isScheduler(arguments[1])) {
          scheduler = arguments[1];
      }
      else if (isNumeric_1.isNumeric(arguments[1])) {
          windowCreationInterval = arguments[1];
      }
      return windowTime_1.windowTime(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler)(this);
  }
  exports.windowTime = windowTime;
  
  });
  
  unwrapExports(windowTime_2$1);
  var windowTime_3 = windowTime_2$1.windowTime;
  
  var windowTime$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.windowTime = windowTime_2$1.windowTime;
  
  });
  
  unwrapExports(windowTime$2);
  
  var windowToggle_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  /**
   * Branch out the source Observable values as a nested Observable starting from
   * an emission from `openings` and ending when the output of `closingSelector`
   * emits.
   *
   * <span class="informal">It's like {@link bufferToggle}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowToggle.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits windows that contain those items
   * emitted by the source Observable between the time when the `openings`
   * Observable emits an item and when the Observable returned by
   * `closingSelector` emits an item.
   *
   * @example <caption>Every other second, emit the click events from the next 500ms</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var openings = Rx.Observable.interval(1000);
   * var result = clicks.windowToggle(openings, i =>
   *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
   * ).mergeAll();
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowWhen}
   * @see {@link bufferToggle}
   *
   * @param {Observable<O>} openings An observable of notifications to start new
   * windows.
   * @param {function(value: O): Observable} closingSelector A function that takes
   * the value emitted by the `openings` observable and returns an Observable,
   * which, when it emits (either `next` or `complete`), signals that the
   * associated window should complete.
   * @return {Observable<Observable<T>>} An observable of windows, which in turn
   * are Observables.
   * @method windowToggle
   * @owner Observable
   */
  function windowToggle(openings, closingSelector) {
      return function (source) { return source.lift(new WindowToggleOperator(openings, closingSelector)); };
  }
  exports.windowToggle = windowToggle;
  var WindowToggleOperator = /** @class */ (function () {
      function WindowToggleOperator(openings, closingSelector) {
          this.openings = openings;
          this.closingSelector = closingSelector;
      }
      WindowToggleOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
      };
      return WindowToggleOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WindowToggleSubscriber = /** @class */ (function (_super) {
      __extends(WindowToggleSubscriber, _super);
      function WindowToggleSubscriber(destination, openings, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.openings = openings;
          _this.closingSelector = closingSelector;
          _this.contexts = [];
          _this.add(_this.openSubscription = subscribeToResult_1.subscribeToResult(_this, openings, openings));
          return _this;
      }
      WindowToggleSubscriber.prototype._next = function (value) {
          var contexts = this.contexts;
          if (contexts) {
              var len = contexts.length;
              for (var i = 0; i < len; i++) {
                  contexts[i].window.next(value);
              }
          }
      };
      WindowToggleSubscriber.prototype._error = function (err) {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
              var len = contexts.length;
              var index = -1;
              while (++index < len) {
                  var context_1 = contexts[index];
                  context_1.window.error(err);
                  context_1.subscription.unsubscribe();
              }
          }
          _super.prototype._error.call(this, err);
      };
      WindowToggleSubscriber.prototype._complete = function () {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
              var len = contexts.length;
              var index = -1;
              while (++index < len) {
                  var context_2 = contexts[index];
                  context_2.window.complete();
                  context_2.subscription.unsubscribe();
              }
          }
          _super.prototype._complete.call(this);
      };
      WindowToggleSubscriber.prototype._unsubscribe = function () {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
              var len = contexts.length;
              var index = -1;
              while (++index < len) {
                  var context_3 = contexts[index];
                  context_3.window.unsubscribe();
                  context_3.subscription.unsubscribe();
              }
          }
      };
      WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (outerValue === this.openings) {
              var closingSelector = this.closingSelector;
              var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
              if (closingNotifier === errorObject.errorObject) {
                  return this.error(errorObject.errorObject.e);
              }
              else {
                  var window_1 = new Subject_1.Subject();
                  var subscription = new Subscription_1.Subscription();
                  var context_4 = { window: window_1, subscription: subscription };
                  this.contexts.push(context_4);
                  var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context_4);
                  if (innerSubscription.closed) {
                      this.closeWindow(this.contexts.length - 1);
                  }
                  else {
                      innerSubscription.context = context_4;
                      subscription.add(innerSubscription);
                  }
                  this.destination.next(window_1);
              }
          }
          else {
              this.closeWindow(this.contexts.indexOf(outerValue));
          }
      };
      WindowToggleSubscriber.prototype.notifyError = function (err) {
          this.error(err);
      };
      WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
          if (inner !== this.openSubscription) {
              this.closeWindow(this.contexts.indexOf(inner.context));
          }
      };
      WindowToggleSubscriber.prototype.closeWindow = function (index) {
          if (index === -1) {
              return;
          }
          var contexts = this.contexts;
          var context = contexts[index];
          var window = context.window, subscription = context.subscription;
          contexts.splice(index, 1);
          window.complete();
          subscription.unsubscribe();
      };
      return WindowToggleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(windowToggle_1);
  var windowToggle_2 = windowToggle_1.windowToggle;
  
  var windowToggle_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Branch out the source Observable values as a nested Observable starting from
   * an emission from `openings` and ending when the output of `closingSelector`
   * emits.
   *
   * <span class="informal">It's like {@link bufferToggle}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowToggle.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits windows that contain those items
   * emitted by the source Observable between the time when the `openings`
   * Observable emits an item and when the Observable returned by
   * `closingSelector` emits an item.
   *
   * @example <caption>Every other second, emit the click events from the next 500ms</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var openings = Rx.Observable.interval(1000);
   * var result = clicks.windowToggle(openings, i =>
   *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
   * ).mergeAll();
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowWhen}
   * @see {@link bufferToggle}
   *
   * @param {Observable<O>} openings An observable of notifications to start new
   * windows.
   * @param {function(value: O): Observable} closingSelector A function that takes
   * the value emitted by the `openings` observable and returns an Observable,
   * which, when it emits (either `next` or `complete`), signals that the
   * associated window should complete.
   * @return {Observable<Observable<T>>} An observable of windows, which in turn
   * are Observables.
   * @method windowToggle
   * @owner Observable
   */
  function windowToggle(openings, closingSelector) {
      return windowToggle_1.windowToggle(openings, closingSelector)(this);
  }
  exports.windowToggle = windowToggle;
  
  });
  
  unwrapExports(windowToggle_2$1);
  var windowToggle_3 = windowToggle_2$1.windowToggle;
  
  var windowToggle$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.windowToggle = windowToggle_2$1.windowToggle;
  
  });
  
  unwrapExports(windowToggle$2);
  
  var windowWhen_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  /**
   * Branch out the source Observable values as a nested Observable using a
   * factory function of closing Observables to determine when to start a new
   * window.
   *
   * <span class="informal">It's like {@link bufferWhen}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowWhen.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits connected, non-overlapping windows.
   * It emits the current window and opens a new one whenever the Observable
   * produced by the specified `closingSelector` function emits an item. The first
   * window is opened immediately when subscribing to the output Observable.
   *
   * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks
   *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
   *   .map(win => win.take(2)) // each window has at most 2 emissions
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link bufferWhen}
   *
   * @param {function(): Observable} closingSelector A function that takes no
   * arguments and returns an Observable that signals (on either `next` or
   * `complete`) when to close the previous window and start a new one.
   * @return {Observable<Observable<T>>} An observable of windows, which in turn
   * are Observables.
   * @method windowWhen
   * @owner Observable
   */
  function windowWhen(closingSelector) {
      return function windowWhenOperatorFunction(source) {
          return source.lift(new WindowOperator(closingSelector));
      };
  }
  exports.windowWhen = windowWhen;
  var WindowOperator = /** @class */ (function () {
      function WindowOperator(closingSelector) {
          this.closingSelector = closingSelector;
      }
      WindowOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
      };
      return WindowOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WindowSubscriber = /** @class */ (function (_super) {
      __extends(WindowSubscriber, _super);
      function WindowSubscriber(destination, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.closingSelector = closingSelector;
          _this.openWindow();
          return _this;
      }
      WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.openWindow(innerSub);
      };
      WindowSubscriber.prototype.notifyError = function (error, innerSub) {
          this._error(error);
      };
      WindowSubscriber.prototype.notifyComplete = function (innerSub) {
          this.openWindow(innerSub);
      };
      WindowSubscriber.prototype._next = function (value) {
          this.window.next(value);
      };
      WindowSubscriber.prototype._error = function (err) {
          this.window.error(err);
          this.destination.error(err);
          this.unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype._complete = function () {
          this.window.complete();
          this.destination.complete();
          this.unsubscribeClosingNotification();
      };
      WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
          if (this.closingNotification) {
              this.closingNotification.unsubscribe();
          }
      };
      WindowSubscriber.prototype.openWindow = function (innerSub) {
          if (innerSub === void 0) { innerSub = null; }
          if (innerSub) {
              this.remove(innerSub);
              innerSub.unsubscribe();
          }
          var prevWindow = this.window;
          if (prevWindow) {
              prevWindow.complete();
          }
          var window = this.window = new Subject_1.Subject();
          this.destination.next(window);
          var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
          if (closingNotifier === errorObject.errorObject) {
              var err = errorObject.errorObject.e;
              this.destination.error(err);
              this.window.error(err);
          }
          else {
              this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
          }
      };
      return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(windowWhen_1);
  var windowWhen_2 = windowWhen_1.windowWhen;
  
  var windowWhen_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * Branch out the source Observable values as a nested Observable using a
   * factory function of closing Observables to determine when to start a new
   * window.
   *
   * <span class="informal">It's like {@link bufferWhen}, but emits a nested
   * Observable instead of an array.</span>
   *
   * <img src="./img/windowWhen.png" width="100%">
   *
   * Returns an Observable that emits windows of items it collects from the source
   * Observable. The output Observable emits connected, non-overlapping windows.
   * It emits the current window and opens a new one whenever the Observable
   * produced by the specified `closingSelector` function emits an item. The first
   * window is opened immediately when subscribing to the output Observable.
   *
   * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var result = clicks
   *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
   *   .map(win => win.take(2)) // each window has at most 2 emissions
   *   .mergeAll(); // flatten the Observable-of-Observables
   * result.subscribe(x => console.log(x));
   *
   * @see {@link window}
   * @see {@link windowCount}
   * @see {@link windowTime}
   * @see {@link windowToggle}
   * @see {@link bufferWhen}
   *
   * @param {function(): Observable} closingSelector A function that takes no
   * arguments and returns an Observable that signals (on either `next` or
   * `complete`) when to close the previous window and start a new one.
   * @return {Observable<Observable<T>>} An observable of windows, which in turn
   * are Observables.
   * @method windowWhen
   * @owner Observable
   */
  function windowWhen(closingSelector) {
      return windowWhen_1.windowWhen(closingSelector)(this);
  }
  exports.windowWhen = windowWhen;
  
  });
  
  unwrapExports(windowWhen_2$1);
  var windowWhen_3 = windowWhen_2$1.windowWhen;
  
  var windowWhen$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.windowWhen = windowWhen_2$1.windowWhen;
  
  });
  
  unwrapExports(windowWhen$2);
  
  var withLatestFrom_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /* tslint:enable:max-line-length */
  /**
   * Combines the source Observable with other Observables to create an Observable
   * whose values are calculated from the latest values of each, only when the
   * source emits.
   *
   * <span class="informal">Whenever the source Observable emits a value, it
   * computes a formula using that value plus the latest values from other input
   * Observables, then emits the output of that formula.</span>
   *
   * <img src="./img/withLatestFrom.png" width="100%">
   *
   * `withLatestFrom` combines each value from the source Observable (the
   * instance) with the latest values from the other input Observables only when
   * the source emits a value, optionally using a `project` function to determine
   * the value to be emitted on the output Observable. All input Observables must
   * emit at least one value before the output Observable will emit a value.
   *
   * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var timer = Rx.Observable.interval(1000);
   * var result = clicks.withLatestFrom(timer);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link combineLatest}
   *
   * @param {ObservableInput} other An input Observable to combine with the source
   * Observable. More than one input Observables may be given as argument.
   * @param {Function} [project] Projection function for combining values
   * together. Receives all values in order of the Observables passed, where the
   * first parameter is a value from the source Observable. (e.g.
   * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
   * passed, arrays will be emitted on the output Observable.
   * @return {Observable} An Observable of projected values from the most recent
   * values from each input Observable, or an array of the most recent values from
   * each input Observable.
   * @method withLatestFrom
   * @owner Observable
   */
  function withLatestFrom() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return function (source) {
          var project;
          if (typeof args[args.length - 1] === 'function') {
              project = args.pop();
          }
          var observables = args;
          return source.lift(new WithLatestFromOperator(observables, project));
      };
  }
  exports.withLatestFrom = withLatestFrom;
  var WithLatestFromOperator = /** @class */ (function () {
      function WithLatestFromOperator(observables, project) {
          this.observables = observables;
          this.project = project;
      }
      WithLatestFromOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
      };
      return WithLatestFromOperator;
  }());
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var WithLatestFromSubscriber = /** @class */ (function (_super) {
      __extends(WithLatestFromSubscriber, _super);
      function WithLatestFromSubscriber(destination, observables, project) {
          var _this = _super.call(this, destination) || this;
          _this.observables = observables;
          _this.project = project;
          _this.toRespond = [];
          var len = observables.length;
          _this.values = new Array(len);
          for (var i = 0; i < len; i++) {
              _this.toRespond.push(i);
          }
          for (var i = 0; i < len; i++) {
              var observable = observables[i];
              _this.add(subscribeToResult_1.subscribeToResult(_this, observable, observable, i));
          }
          return _this;
      }
      WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.values[outerIndex] = innerValue;
          var toRespond = this.toRespond;
          if (toRespond.length > 0) {
              var found = toRespond.indexOf(outerIndex);
              if (found !== -1) {
                  toRespond.splice(found, 1);
              }
          }
      };
      WithLatestFromSubscriber.prototype.notifyComplete = function () {
          // noop
      };
      WithLatestFromSubscriber.prototype._next = function (value) {
          if (this.toRespond.length === 0) {
              var args = [value].concat(this.values);
              if (this.project) {
                  this._tryProject(args);
              }
              else {
                  this.destination.next(args);
              }
          }
      };
      WithLatestFromSubscriber.prototype._tryProject = function (args) {
          var result;
          try {
              result = this.project.apply(this, args);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return WithLatestFromSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  
  });
  
  unwrapExports(withLatestFrom_1);
  var withLatestFrom_2 = withLatestFrom_1.withLatestFrom;
  
  var withLatestFrom_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * Combines the source Observable with other Observables to create an Observable
   * whose values are calculated from the latest values of each, only when the
   * source emits.
   *
   * <span class="informal">Whenever the source Observable emits a value, it
   * computes a formula using that value plus the latest values from other input
   * Observables, then emits the output of that formula.</span>
   *
   * <img src="./img/withLatestFrom.png" width="100%">
   *
   * `withLatestFrom` combines each value from the source Observable (the
   * instance) with the latest values from the other input Observables only when
   * the source emits a value, optionally using a `project` function to determine
   * the value to be emitted on the output Observable. All input Observables must
   * emit at least one value before the output Observable will emit a value.
   *
   * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
   * var clicks = Rx.Observable.fromEvent(document, 'click');
   * var timer = Rx.Observable.interval(1000);
   * var result = clicks.withLatestFrom(timer);
   * result.subscribe(x => console.log(x));
   *
   * @see {@link combineLatest}
   *
   * @param {ObservableInput} other An input Observable to combine with the source
   * Observable. More than one input Observables may be given as argument.
   * @param {Function} [project] Projection function for combining values
   * together. Receives all values in order of the Observables passed, where the
   * first parameter is a value from the source Observable. (e.g.
   * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
   * passed, arrays will be emitted on the output Observable.
   * @return {Observable} An Observable of projected values from the most recent
   * values from each input Observable, or an array of the most recent values from
   * each input Observable.
   * @method withLatestFrom
   * @owner Observable
   */
  function withLatestFrom() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return withLatestFrom_1.withLatestFrom.apply(void 0, args)(this);
  }
  exports.withLatestFrom = withLatestFrom;
  
  });
  
  unwrapExports(withLatestFrom_2$1);
  var withLatestFrom_3 = withLatestFrom_2$1.withLatestFrom;
  
  var withLatestFrom$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_2$1.withLatestFrom;
  
  });
  
  unwrapExports(withLatestFrom$2);
  
  var zip$3 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /* tslint:enable:max-line-length */
  /**
   * @param observables
   * @return {Observable<R>}
   * @method zip
   * @owner Observable
   */
  function zipProto() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return this.lift.call(zip_1.zip.apply(void 0, [this].concat(observables)));
  }
  exports.zipProto = zipProto;
  
  });
  
  unwrapExports(zip$3);
  var zip_2$1 = zip$3.zipProto;
  
  var zip$5 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.zip = zip$3.zipProto;
  
  });
  
  unwrapExports(zip$5);
  
  var zipAll_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  function zipAll(project) {
      return function (source) { return source.lift(new zip_1.ZipOperator(project)); };
  }
  exports.zipAll = zipAll;
  
  });
  
  unwrapExports(zipAll_1);
  var zipAll_2 = zipAll_1.zipAll;
  
  var zipAll_2$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  /**
   * @param project
   * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
   * @method zipAll
   * @owner Observable
   */
  function zipAll(project) {
      return zipAll_1.zipAll(project)(this);
  }
  exports.zipAll = zipAll;
  
  });
  
  unwrapExports(zipAll_2$1);
  var zipAll_3 = zipAll_2$1.zipAll;
  
  var zipAll$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  Observable_1.Observable.prototype.zipAll = zipAll_2$1.zipAll;
  
  });
  
  unwrapExports(zipAll$2);
  
  var SubscriptionLog_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var SubscriptionLog = /** @class */ (function () {
      function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
          if (unsubscribedFrame === void 0) { unsubscribedFrame = Number.POSITIVE_INFINITY; }
          this.subscribedFrame = subscribedFrame;
          this.unsubscribedFrame = unsubscribedFrame;
      }
      return SubscriptionLog;
  }());
  exports.SubscriptionLog = SubscriptionLog;
  
  });
  
  unwrapExports(SubscriptionLog_1);
  var SubscriptionLog_2 = SubscriptionLog_1.SubscriptionLog;
  
  var SubscriptionLoggable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var SubscriptionLoggable = /** @class */ (function () {
      function SubscriptionLoggable() {
          this.subscriptions = [];
      }
      SubscriptionLoggable.prototype.logSubscribedFrame = function () {
          this.subscriptions.push(new SubscriptionLog_1.SubscriptionLog(this.scheduler.now()));
          return this.subscriptions.length - 1;
      };
      SubscriptionLoggable.prototype.logUnsubscribedFrame = function (index) {
          var subscriptionLogs = this.subscriptions;
          var oldSubscriptionLog = subscriptionLogs[index];
          subscriptionLogs[index] = new SubscriptionLog_1.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
      };
      return SubscriptionLoggable;
  }());
  exports.SubscriptionLoggable = SubscriptionLoggable;
  
  });
  
  unwrapExports(SubscriptionLoggable_1);
  var SubscriptionLoggable_2 = SubscriptionLoggable_1.SubscriptionLoggable;
  
  var applyMixins_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function applyMixins(derivedCtor, baseCtors) {
      for (var i = 0, len = baseCtors.length; i < len; i++) {
          var baseCtor = baseCtors[i];
          var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
          for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
              var name_1 = propertyKeys[j];
              derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
          }
      }
  }
  exports.applyMixins = applyMixins;
  
  });
  
  unwrapExports(applyMixins_1);
  var applyMixins_2 = applyMixins_1.applyMixins;
  
  var ColdObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var ColdObservable = /** @class */ (function (_super) {
      __extends(ColdObservable, _super);
      function ColdObservable(messages, scheduler) {
          var _this = _super.call(this, function (subscriber) {
              var observable = this;
              var index = observable.logSubscribedFrame();
              subscriber.add(new Subscription_1.Subscription(function () {
                  observable.logUnsubscribedFrame(index);
              }));
              observable.scheduleMessages(subscriber);
              return subscriber;
          }) || this;
          _this.messages = messages;
          _this.subscriptions = [];
          _this.scheduler = scheduler;
          return _this;
      }
      ColdObservable.prototype.scheduleMessages = function (subscriber) {
          var messagesLength = this.messages.length;
          for (var i = 0; i < messagesLength; i++) {
              var message = this.messages[i];
              subscriber.add(this.scheduler.schedule(function (_a) {
                  var message = _a.message, subscriber = _a.subscriber;
                  message.notification.observe(subscriber);
              }, message.frame, { message: message, subscriber: subscriber }));
          }
      };
      return ColdObservable;
  }(Observable_1.Observable));
  exports.ColdObservable = ColdObservable;
  applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
  
  });
  
  unwrapExports(ColdObservable_1);
  var ColdObservable_2 = ColdObservable_1.ColdObservable;
  
  var HotObservable_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var HotObservable = /** @class */ (function (_super) {
      __extends(HotObservable, _super);
      function HotObservable(messages, scheduler) {
          var _this = _super.call(this) || this;
          _this.messages = messages;
          _this.subscriptions = [];
          _this.scheduler = scheduler;
          return _this;
      }
      HotObservable.prototype._subscribe = function (subscriber) {
          var subject = this;
          var index = subject.logSubscribedFrame();
          subscriber.add(new Subscription_1.Subscription(function () {
              subject.logUnsubscribedFrame(index);
          }));
          return _super.prototype._subscribe.call(this, subscriber);
      };
      HotObservable.prototype.setup = function () {
          var subject = this;
          var messagesLength = subject.messages.length;
          /* tslint:disable:no-var-keyword */
          for (var i = 0; i < messagesLength; i++) {
              (function () {
                  var message = subject.messages[i];
                  /* tslint:enable */
                  subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
              })();
          }
      };
      return HotObservable;
  }(Subject_1.Subject));
  exports.HotObservable = HotObservable;
  applyMixins_1.applyMixins(HotObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);
  
  });
  
  unwrapExports(HotObservable_1);
  var HotObservable_2 = HotObservable_1.HotObservable;
  
  var VirtualTimeScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  var VirtualTimeScheduler = /** @class */ (function (_super) {
      __extends(VirtualTimeScheduler, _super);
      function VirtualTimeScheduler(SchedulerAction, maxFrames) {
          if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
          if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
          var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
          _this.maxFrames = maxFrames;
          _this.frame = 0;
          _this.index = -1;
          return _this;
      }
      /**
       * Prompt the Scheduler to execute all of its queued actions, therefore
       * clearing its queue.
       * @return {void}
       */
      VirtualTimeScheduler.prototype.flush = function () {
          var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
          var error, action;
          while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          }
          if (error) {
              while (action = actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      VirtualTimeScheduler.frameTimeFactor = 10;
      return VirtualTimeScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.VirtualTimeScheduler = VirtualTimeScheduler;
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var VirtualAction = /** @class */ (function (_super) {
      __extends(VirtualAction, _super);
      function VirtualAction(scheduler, work, index) {
          if (index === void 0) { index = scheduler.index += 1; }
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.index = index;
          _this.active = true;
          _this.index = scheduler.index = index;
          return _this;
      }
      VirtualAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (!this.id) {
              return _super.prototype.schedule.call(this, state, delay);
          }
          this.active = false;
          // If an action is rescheduled, we save allocations by mutating its state,
          // pushing it to the end of the scheduler queue, and recycling the action.
          // But since the VirtualTimeScheduler is used for testing, VirtualActions
          // must be immutable so they can be inspected later.
          var action = new VirtualAction(this.scheduler, this.work);
          this.add(action);
          return action.schedule(state, delay);
      };
      VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          this.delay = scheduler.frame + delay;
          var actions = scheduler.actions;
          actions.push(this);
          actions.sort(VirtualAction.sortActions);
          return true;
      };
      VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          return undefined;
      };
      VirtualAction.prototype._execute = function (state, delay) {
          if (this.active === true) {
              return _super.prototype._execute.call(this, state, delay);
          }
      };
      VirtualAction.sortActions = function (a, b) {
          if (a.delay === b.delay) {
              if (a.index === b.index) {
                  return 0;
              }
              else if (a.index > b.index) {
                  return 1;
              }
              else {
                  return -1;
              }
          }
          else if (a.delay > b.delay) {
              return 1;
          }
          else {
              return -1;
          }
      };
      return VirtualAction;
  }(AsyncAction_1.AsyncAction));
  exports.VirtualAction = VirtualAction;
  
  });
  
  unwrapExports(VirtualTimeScheduler_1);
  var VirtualTimeScheduler_2 = VirtualTimeScheduler_1.VirtualTimeScheduler;
  var VirtualTimeScheduler_3 = VirtualTimeScheduler_1.VirtualAction;
  
  var TestScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  
  
  
  
  var defaultMaxFrame = 750;
  var TestScheduler = /** @class */ (function (_super) {
      __extends(TestScheduler, _super);
      function TestScheduler(assertDeepEqual) {
          var _this = _super.call(this, VirtualTimeScheduler_1.VirtualAction, defaultMaxFrame) || this;
          _this.assertDeepEqual = assertDeepEqual;
          _this.hotObservables = [];
          _this.coldObservables = [];
          _this.flushTests = [];
          return _this;
      }
      TestScheduler.prototype.createTime = function (marbles) {
          var indexOf = marbles.indexOf('|');
          if (indexOf === -1) {
              throw new Error('marble diagram for time should have a completion marker "|"');
          }
          return indexOf * TestScheduler.frameTimeFactor;
      };
      TestScheduler.prototype.createColdObservable = function (marbles, values, error) {
          if (marbles.indexOf('^') !== -1) {
              throw new Error('cold observable cannot have subscription offset "^"');
          }
          if (marbles.indexOf('!') !== -1) {
              throw new Error('cold observable cannot have unsubscription marker "!"');
          }
          var messages = TestScheduler.parseMarbles(marbles, values, error);
          var cold = new ColdObservable_1.ColdObservable(messages, this);
          this.coldObservables.push(cold);
          return cold;
      };
      TestScheduler.prototype.createHotObservable = function (marbles, values, error) {
          if (marbles.indexOf('!') !== -1) {
              throw new Error('hot observable cannot have unsubscription marker "!"');
          }
          var messages = TestScheduler.parseMarbles(marbles, values, error);
          var subject = new HotObservable_1.HotObservable(messages, this);
          this.hotObservables.push(subject);
          return subject;
      };
      TestScheduler.prototype.materializeInnerObservable = function (observable, outerFrame) {
          var _this = this;
          var messages = [];
          observable.subscribe(function (value) {
              messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createNext(value) });
          }, function (err) {
              messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createError(err) });
          }, function () {
              messages.push({ frame: _this.frame - outerFrame, notification: Notification_1.Notification.createComplete() });
          });
          return messages;
      };
      TestScheduler.prototype.expectObservable = function (observable, unsubscriptionMarbles) {
          var _this = this;
          if (unsubscriptionMarbles === void 0) { unsubscriptionMarbles = null; }
          var actual = [];
          var flushTest = { actual: actual, ready: false };
          var unsubscriptionFrame = TestScheduler
              .parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
          var subscription;
          this.schedule(function () {
              subscription = observable.subscribe(function (x) {
                  var value = x;
                  // Support Observable-of-Observables
                  if (x instanceof Observable_1.Observable) {
                      value = _this.materializeInnerObservable(value, _this.frame);
                  }
                  actual.push({ frame: _this.frame, notification: Notification_1.Notification.createNext(value) });
              }, function (err) {
                  actual.push({ frame: _this.frame, notification: Notification_1.Notification.createError(err) });
              }, function () {
                  actual.push({ frame: _this.frame, notification: Notification_1.Notification.createComplete() });
              });
          }, 0);
          if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
              this.schedule(function () { return subscription.unsubscribe(); }, unsubscriptionFrame);
          }
          this.flushTests.push(flushTest);
          return {
              toBe: function (marbles, values, errorValue) {
                  flushTest.ready = true;
                  flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
              }
          };
      };
      TestScheduler.prototype.expectSubscriptions = function (actualSubscriptionLogs) {
          var flushTest = { actual: actualSubscriptionLogs, ready: false };
          this.flushTests.push(flushTest);
          return {
              toBe: function (marbles) {
                  var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
                  flushTest.ready = true;
                  flushTest.expected = marblesArray.map(function (marbles) {
                      return TestScheduler.parseMarblesAsSubscriptions(marbles);
                  });
              }
          };
      };
      TestScheduler.prototype.flush = function () {
          var hotObservables = this.hotObservables;
          while (hotObservables.length > 0) {
              hotObservables.shift().setup();
          }
          _super.prototype.flush.call(this);
          var readyFlushTests = this.flushTests.filter(function (test) { return test.ready; });
          while (readyFlushTests.length > 0) {
              var test_1 = readyFlushTests.shift();
              this.assertDeepEqual(test_1.actual, test_1.expected);
          }
      };
      TestScheduler.parseMarblesAsSubscriptions = function (marbles) {
          if (typeof marbles !== 'string') {
              return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);
          }
          var len = marbles.length;
          var groupStart = -1;
          var subscriptionFrame = Number.POSITIVE_INFINITY;
          var unsubscriptionFrame = Number.POSITIVE_INFINITY;
          for (var i = 0; i < len; i++) {
              var frame = i * this.frameTimeFactor;
              var c = marbles[i];
              switch (c) {
                  case '-':
                  case ' ':
                      break;
                  case '(':
                      groupStart = frame;
                      break;
                  case ')':
                      groupStart = -1;
                      break;
                  case '^':
                      if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                          throw new Error('found a second subscription point \'^\' in a ' +
                              'subscription marble diagram. There can only be one.');
                      }
                      subscriptionFrame = groupStart > -1 ? groupStart : frame;
                      break;
                  case '!':
                      if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                          throw new Error('found a second subscription point \'^\' in a ' +
                              'subscription marble diagram. There can only be one.');
                      }
                      unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                      break;
                  default:
                      throw new Error('there can only be \'^\' and \'!\' markers in a ' +
                          'subscription marble diagram. Found instead \'' + c + '\'.');
              }
          }
          if (unsubscriptionFrame < 0) {
              return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame);
          }
          else {
              return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
          }
      };
      TestScheduler.parseMarbles = function (marbles, values, errorValue, materializeInnerObservables) {
          if (materializeInnerObservables === void 0) { materializeInnerObservables = false; }
          if (marbles.indexOf('!') !== -1) {
              throw new Error('conventional marble diagrams cannot have the ' +
                  'unsubscription marker "!"');
          }
          var len = marbles.length;
          var testMessages = [];
          var subIndex = marbles.indexOf('^');
          var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
          var getValue = typeof values !== 'object' ?
              function (x) { return x; } :
              function (x) {
                  // Support Observable-of-Observables
                  if (materializeInnerObservables && values[x] instanceof ColdObservable_1.ColdObservable) {
                      return values[x].messages;
                  }
                  return values[x];
              };
          var groupStart = -1;
          for (var i = 0; i < len; i++) {
              var frame = i * this.frameTimeFactor + frameOffset;
              var notification = void 0;
              var c = marbles[i];
              switch (c) {
                  case '-':
                  case ' ':
                      break;
                  case '(':
                      groupStart = frame;
                      break;
                  case ')':
                      groupStart = -1;
                      break;
                  case '|':
                      notification = Notification_1.Notification.createComplete();
                      break;
                  case '^':
                      break;
                  case '#':
                      notification = Notification_1.Notification.createError(errorValue || 'error');
                      break;
                  default:
                      notification = Notification_1.Notification.createNext(getValue(c));
                      break;
              }
              if (notification) {
                  testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification: notification });
              }
          }
          return testMessages;
      };
      return TestScheduler;
  }(VirtualTimeScheduler_1.VirtualTimeScheduler));
  exports.TestScheduler = TestScheduler;
  
  });
  
  unwrapExports(TestScheduler_1);
  var TestScheduler_2 = TestScheduler_1.TestScheduler;
  
  var AnimationFrame = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var RequestAnimationFrameDefinition = /** @class */ (function () {
      function RequestAnimationFrameDefinition(root$$1) {
          if (root$$1.requestAnimationFrame) {
              this.cancelAnimationFrame = root$$1.cancelAnimationFrame.bind(root$$1);
              this.requestAnimationFrame = root$$1.requestAnimationFrame.bind(root$$1);
          }
          else if (root$$1.mozRequestAnimationFrame) {
              this.cancelAnimationFrame = root$$1.mozCancelAnimationFrame.bind(root$$1);
              this.requestAnimationFrame = root$$1.mozRequestAnimationFrame.bind(root$$1);
          }
          else if (root$$1.webkitRequestAnimationFrame) {
              this.cancelAnimationFrame = root$$1.webkitCancelAnimationFrame.bind(root$$1);
              this.requestAnimationFrame = root$$1.webkitRequestAnimationFrame.bind(root$$1);
          }
          else if (root$$1.msRequestAnimationFrame) {
              this.cancelAnimationFrame = root$$1.msCancelAnimationFrame.bind(root$$1);
              this.requestAnimationFrame = root$$1.msRequestAnimationFrame.bind(root$$1);
          }
          else if (root$$1.oRequestAnimationFrame) {
              this.cancelAnimationFrame = root$$1.oCancelAnimationFrame.bind(root$$1);
              this.requestAnimationFrame = root$$1.oRequestAnimationFrame.bind(root$$1);
          }
          else {
              this.cancelAnimationFrame = root$$1.clearTimeout.bind(root$$1);
              this.requestAnimationFrame = function (cb) { return root$$1.setTimeout(cb, 1000 / 60); };
          }
      }
      return RequestAnimationFrameDefinition;
  }());
  exports.RequestAnimationFrameDefinition = RequestAnimationFrameDefinition;
  exports.AnimationFrame = new RequestAnimationFrameDefinition(root.root);
  
  });
  
  unwrapExports(AnimationFrame);
  var AnimationFrame_1 = AnimationFrame.RequestAnimationFrameDefinition;
  var AnimationFrame_2 = AnimationFrame.AnimationFrame;
  
  var AnimationFrameAction_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   * We need this JSDoc comment for affecting ESDoc.
   * @ignore
   * @extends {Ignored}
   */
  var AnimationFrameAction = /** @class */ (function (_super) {
      __extends(AnimationFrameAction, _super);
      function AnimationFrameAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If delay is greater than 0, request as an async action.
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          // Push the action to the end of the scheduler queue.
          scheduler.actions.push(this);
          // If an animation frame has already been requested, don't request another
          // one. If an animation frame hasn't been requested yet, request one. Return
          // the current animation frame request id.
          return scheduler.scheduled || (scheduler.scheduled = AnimationFrame.AnimationFrame.requestAnimationFrame(function () { return scheduler.flush(null); }));
      };
      AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          // If delay exists and is greater than 0, or if the delay is null (the
          // action wasn't rescheduled) but was originally scheduled as an async
          // action, then recycle as an async action.
          if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          // If the scheduler queue is empty, cancel the requested animation frame and
          // set the scheduled flag to undefined so the next AnimationFrameAction will
          // request its own.
          if (scheduler.actions.length === 0) {
              AnimationFrame.AnimationFrame.cancelAnimationFrame(id);
              scheduler.scheduled = undefined;
          }
          // Return undefined so the action knows to request a new async id if it's rescheduled.
          return undefined;
      };
      return AnimationFrameAction;
  }(AsyncAction_1.AsyncAction));
  exports.AnimationFrameAction = AnimationFrameAction;
  
  });
  
  unwrapExports(AnimationFrameAction_1);
  var AnimationFrameAction_2 = AnimationFrameAction_1.AnimationFrameAction;
  
  var AnimationFrameScheduler_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  
  var AnimationFrameScheduler = /** @class */ (function (_super) {
      __extends(AnimationFrameScheduler, _super);
      function AnimationFrameScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler.prototype.flush = function (action) {
          this.active = true;
          this.scheduled = undefined;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
              while (++index < count && (action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AnimationFrameScheduler;
  }(AsyncScheduler_1.AsyncScheduler));
  exports.AnimationFrameScheduler = AnimationFrameScheduler;
  
  });
  
  unwrapExports(AnimationFrameScheduler_1);
  var AnimationFrameScheduler_2 = AnimationFrameScheduler_1.AnimationFrameScheduler;
  
  var animationFrame = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  
  /**
   *
   * Animation Frame Scheduler
   *
   * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
   *
   * When `animationFrame` scheduler is used with delay, it will fall back to {@link async} scheduler
   * behaviour.
   *
   * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
   * It makes sure scheduled task will happen just before next browser content repaint,
   * thus performing animations as efficiently as possible.
   *
   * @example <caption>Schedule div height animation</caption>
   * const div = document.querySelector('.some-div');
   *
   * Rx.Scheduler.animationFrame.schedule(function(height) {
   *   div.style.height = height + "px";
   *
   *   this.schedule(height + 1);  // `this` references currently executing Action,
   *                               // which we reschedule with new state
   * }, 0, 0);
   *
   * // You will see .some-div element growing in height
   *
   *
   * @static true
   * @name animationFrame
   * @owner Scheduler
   */
  exports.animationFrame = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
  
  });
  
  unwrapExports(animationFrame);
  var animationFrame_1 = animationFrame.animationFrame;
  
  var operators = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  
  exports.audit = audit_1.audit;
  
  exports.auditTime = auditTime_1.auditTime;
  
  exports.buffer = buffer_1.buffer;
  
  exports.bufferCount = bufferCount_1.bufferCount;
  
  exports.bufferTime = bufferTime_1.bufferTime;
  
  exports.bufferToggle = bufferToggle_1.bufferToggle;
  
  exports.bufferWhen = bufferWhen_1.bufferWhen;
  
  exports.catchError = catchError_1.catchError;
  
  exports.combineAll = combineAll_1.combineAll;
  
  exports.concatAll = concatAll_1.concatAll;
  
  exports.concatMap = concatMap_1.concatMap;
  
  exports.concatMapTo = concatMapTo_1.concatMapTo;
  
  exports.count = count_1.count;
  
  exports.debounce = debounce_1.debounce;
  
  exports.debounceTime = debounceTime_1.debounceTime;
  
  exports.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
  
  exports.delay = delay_1.delay;
  
  exports.delayWhen = delayWhen_1.delayWhen;
  
  exports.dematerialize = dematerialize_1.dematerialize;
  
  exports.distinct = distinct_1.distinct;
  
  exports.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
  
  exports.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
  
  exports.elementAt = elementAt_1.elementAt;
  
  exports.every = every_1.every;
  
  exports.exhaust = exhaust_1.exhaust;
  
  exports.exhaustMap = exhaustMap_1.exhaustMap;
  
  exports.expand = expand_1.expand;
  
  exports.filter = filter_1.filter;
  
  exports.finalize = finalize_1.finalize;
  
  exports.find = find_1.find;
  
  exports.findIndex = findIndex_1.findIndex;
  
  exports.first = first_1.first;
  
  exports.groupBy = groupBy_1.groupBy;
  
  exports.ignoreElements = ignoreElements_1.ignoreElements;
  
  exports.isEmpty = isEmpty_1.isEmpty;
  
  exports.last = last_1.last;
  
  exports.map = map_1.map;
  
  exports.mapTo = mapTo_1.mapTo;
  
  exports.materialize = materialize_1.materialize;
  
  exports.max = max_1.max;
  
  exports.mergeAll = mergeAll_1.mergeAll;
  
  exports.mergeMap = mergeMap_1.mergeMap;
  var mergeMap_2 = mergeMap_1;
  exports.flatMap = mergeMap_2.mergeMap;
  
  exports.mergeMapTo = mergeMapTo_1.mergeMapTo;
  
  exports.mergeScan = mergeScan_1.mergeScan;
  
  exports.min = min_1.min;
  
  exports.multicast = multicast_1.multicast;
  
  exports.observeOn = observeOn_1.observeOn;
  
  exports.onErrorResumeNext = onErrorResumeNext_1$1.onErrorResumeNext;
  
  exports.pairwise = pairwise_1.pairwise;
  
  exports.partition = partition_1.partition;
  
  exports.pluck = pluck_1.pluck;
  
  exports.publish = publish_1.publish;
  
  exports.publishBehavior = publishBehavior_1.publishBehavior;
  
  exports.publishLast = publishLast_1.publishLast;
  
  exports.publishReplay = publishReplay_1.publishReplay;
  
  exports.race = race_2$1.race;
  
  exports.reduce = reduce_1.reduce;
  
  exports.repeat = repeat_1.repeat;
  
  exports.repeatWhen = repeatWhen_1.repeatWhen;
  
  exports.retry = retry_1.retry;
  
  exports.retryWhen = retryWhen_1.retryWhen;
  
  exports.refCount = refCount_1.refCount;
  
  exports.sample = sample_1.sample;
  
  exports.sampleTime = sampleTime_1.sampleTime;
  
  exports.scan = scan_1.scan;
  
  exports.sequenceEqual = sequenceEqual_1.sequenceEqual;
  
  exports.share = share_1.share;
  
  exports.shareReplay = shareReplay_1.shareReplay;
  
  exports.single = single_1.single;
  
  exports.skip = skip_1.skip;
  
  exports.skipLast = skipLast_1.skipLast;
  
  exports.skipUntil = skipUntil_1.skipUntil;
  
  exports.skipWhile = skipWhile_1.skipWhile;
  
  exports.startWith = startWith_1.startWith;
  /**
   * TODO(https://github.com/ReactiveX/rxjs/issues/2900): Add back subscribeOn once it can be
   * treeshaken. Currently if this export is added back, it
   * forces apps to bring in asap scheduler along with
   * Immediate, root, and other supporting code.
   */
  // export { subscribeOn } from './subscribeOn';
  
  exports.switchAll = switchAll_1.switchAll;
  
  exports.switchMap = switchMap_1.switchMap;
  
  exports.switchMapTo = switchMapTo_1.switchMapTo;
  
  exports.take = take_1.take;
  
  exports.takeLast = takeLast_1.takeLast;
  
  exports.takeUntil = takeUntil_1.takeUntil;
  
  exports.takeWhile = takeWhile_1.takeWhile;
  
  exports.tap = tap_1.tap;
  
  exports.throttle = throttle_1.throttle;
  
  exports.throttleTime = throttleTime_1.throttleTime;
  
  exports.timeInterval = timeInterval_1.timeInterval;
  
  exports.timeout = timeout_1.timeout;
  
  exports.timeoutWith = timeoutWith_1.timeoutWith;
  
  exports.timestamp = timestamp_1.timestamp;
  
  exports.toArray = toArray_1.toArray;
  
  exports.window = window_1.window;
  
  exports.windowCount = windowCount_1.windowCount;
  
  exports.windowTime = windowTime_1.windowTime;
  
  exports.windowToggle = windowToggle_1.windowToggle;
  
  exports.windowWhen = windowWhen_1.windowWhen;
  
  exports.withLatestFrom = withLatestFrom_1.withLatestFrom;
  
  exports.zipAll = zipAll_1.zipAll;
  
  });
  
  unwrapExports(operators);
  var operators_1 = operators.audit;
  var operators_2 = operators.auditTime;
  var operators_3 = operators.buffer;
  var operators_4 = operators.bufferCount;
  var operators_5 = operators.bufferTime;
  var operators_6 = operators.bufferToggle;
  var operators_7 = operators.bufferWhen;
  var operators_8 = operators.catchError;
  var operators_9 = operators.combineAll;
  var operators_10 = operators.concatAll;
  var operators_11 = operators.concatMap;
  var operators_12 = operators.concatMapTo;
  var operators_13 = operators.count;
  var operators_14 = operators.debounce;
  var operators_15 = operators.debounceTime;
  var operators_16 = operators.defaultIfEmpty;
  var operators_17 = operators.delay;
  var operators_18 = operators.delayWhen;
  var operators_19 = operators.dematerialize;
  var operators_20 = operators.distinct;
  var operators_21 = operators.distinctUntilChanged;
  var operators_22 = operators.distinctUntilKeyChanged;
  var operators_23 = operators.elementAt;
  var operators_24 = operators.every;
  var operators_25 = operators.exhaust;
  var operators_26 = operators.exhaustMap;
  var operators_27 = operators.expand;
  var operators_28 = operators.filter;
  var operators_29 = operators.finalize;
  var operators_30 = operators.find;
  var operators_31 = operators.findIndex;
  var operators_32 = operators.first;
  var operators_33 = operators.groupBy;
  var operators_34 = operators.ignoreElements;
  var operators_35 = operators.isEmpty;
  var operators_36 = operators.last;
  var operators_37 = operators.map;
  var operators_38 = operators.mapTo;
  var operators_39 = operators.materialize;
  var operators_40 = operators.max;
  var operators_41 = operators.mergeAll;
  var operators_42 = operators.mergeMap;
  var operators_43 = operators.flatMap;
  var operators_44 = operators.mergeMapTo;
  var operators_45 = operators.mergeScan;
  var operators_46 = operators.min;
  var operators_47 = operators.multicast;
  var operators_48 = operators.observeOn;
  var operators_49 = operators.onErrorResumeNext;
  var operators_50 = operators.pairwise;
  var operators_51 = operators.partition;
  var operators_52 = operators.pluck;
  var operators_53 = operators.publish;
  var operators_54 = operators.publishBehavior;
  var operators_55 = operators.publishLast;
  var operators_56 = operators.publishReplay;
  var operators_57 = operators.race;
  var operators_58 = operators.reduce;
  var operators_59 = operators.repeat;
  var operators_60 = operators.repeatWhen;
  var operators_61 = operators.retry;
  var operators_62 = operators.retryWhen;
  var operators_63 = operators.refCount;
  var operators_64 = operators.sample;
  var operators_65 = operators.sampleTime;
  var operators_66 = operators.scan;
  var operators_67 = operators.sequenceEqual;
  var operators_68 = operators.share;
  var operators_69 = operators.shareReplay;
  var operators_70 = operators.single;
  var operators_71 = operators.skip;
  var operators_72 = operators.skipLast;
  var operators_73 = operators.skipUntil;
  var operators_74 = operators.skipWhile;
  var operators_75 = operators.startWith;
  var operators_76 = operators.switchAll;
  var operators_77 = operators.switchMap;
  var operators_78 = operators.switchMapTo;
  var operators_79 = operators.take;
  var operators_80 = operators.takeLast;
  var operators_81 = operators.takeUntil;
  var operators_82 = operators.takeWhile;
  var operators_83 = operators.tap;
  var operators_84 = operators.throttle;
  var operators_85 = operators.throttleTime;
  var operators_86 = operators.timeInterval;
  var operators_87 = operators.timeout;
  var operators_88 = operators.timeoutWith;
  var operators_89 = operators.timestamp;
  var operators_90 = operators.toArray;
  var operators_91 = operators.window;
  var operators_92 = operators.windowCount;
  var operators_93 = operators.windowTime;
  var operators_94 = operators.windowToggle;
  var operators_95 = operators.windowWhen;
  var operators_96 = operators.withLatestFrom;
  var operators_97 = operators.zipAll;
  
  var Rx = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /* tslint:disable:no-unused-variable */
  // Subject imported before Observable to bypass circular dependency issue since
  // Subject extends Observable and Observable references Subject in it's
  // definition
  
  exports.Subject = Subject_1.Subject;
  exports.AnonymousSubject = Subject_1.AnonymousSubject;
  /* tslint:enable:no-unused-variable */
  
  exports.Observable = Observable_1.Observable;
  // statics
  /* tslint:disable:no-use-before-declare */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //dom
  
  
  //internal/operators
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  exports.Subscription = Subscription_1.Subscription;
  
  exports.Subscriber = Subscriber_1.Subscriber;
  
  exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
  
  exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
  
  exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
  
  exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
  
  exports.Notification = Notification_1.Notification;
  
  exports.EmptyError = EmptyError_1.EmptyError;
  
  exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
  
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
  
  exports.TimeoutError = TimeoutError_1.TimeoutError;
  
  exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
  
  exports.TimeInterval = timeInterval_2$1.TimeInterval;
  
  exports.Timestamp = timestamp_1.Timestamp;
  
  exports.TestScheduler = TestScheduler_1.TestScheduler;
  
  exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
  
  exports.AjaxResponse = AjaxObservable_1.AjaxResponse;
  exports.AjaxError = AjaxObservable_1.AjaxError;
  exports.AjaxTimeoutError = AjaxObservable_1.AjaxTimeoutError;
  
  exports.pipe = pipe_1.pipe;
  
  
  
  
  
  
  
  
  exports.operators = operators;
  /* tslint:enable:no-unused-variable */
  /**
   * @typedef {Object} Rx.Scheduler
   * @property {Scheduler} queue Schedules on a queue in the current event frame
   * (trampoline scheduler). Use this for iteration operations.
   * @property {Scheduler} asap Schedules on the micro task queue, which uses the
   * fastest transport mechanism available, either Node.js' `process.nextTick()`
   * or Web Worker MessageChannel or setTimeout or others. Use this for
   * asynchronous conversions.
   * @property {Scheduler} async Schedules work with `setInterval`. Use this for
   * time-based operations.
   * @property {Scheduler} animationFrame Schedules work with `requestAnimationFrame`.
   * Use this for synchronizing with the platform's painting
   */
  var Scheduler = {
      asap: asap.asap,
      queue: queue.queue,
      animationFrame: animationFrame.animationFrame,
      async: async.async
  };
  exports.Scheduler = Scheduler;
  /**
   * @typedef {Object} Rx.Symbol
   * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
   * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
   * an object that has all of the traits of an Rx Subscriber, including the
   * ability to add and remove subscriptions to the subscription chain and
   * guarantees involving event triggering (can't "next" after unsubscription,
   * etc).
   * @property {Symbol|string} observable A symbol to use as a property name to
   * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
   * @property {Symbol|string} iterator The ES6 symbol to use as a property name
   * to retrieve an iterator from an object.
   */
  var Symbol = {
      rxSubscriber: rxSubscriber.rxSubscriber,
      observable: observable.observable,
      iterator: iterator.iterator
  };
  exports.Symbol = Symbol;
  
  });
  
  unwrapExports(Rx);
  var Rx_1 = Rx.Subject;
  var Rx_2 = Rx.AnonymousSubject;
  var Rx_3 = Rx.Observable;
  var Rx_4 = Rx.Subscription;
  var Rx_5 = Rx.Subscriber;
  var Rx_6 = Rx.AsyncSubject;
  var Rx_7 = Rx.ReplaySubject;
  var Rx_8 = Rx.BehaviorSubject;
  var Rx_9 = Rx.ConnectableObservable;
  var Rx_10 = Rx.Notification;
  var Rx_11 = Rx.EmptyError;
  var Rx_12 = Rx.ArgumentOutOfRangeError;
  var Rx_13 = Rx.ObjectUnsubscribedError;
  var Rx_14 = Rx.TimeoutError;
  var Rx_15 = Rx.UnsubscriptionError;
  var Rx_16 = Rx.TimeInterval;
  var Rx_17 = Rx.Timestamp;
  var Rx_18 = Rx.TestScheduler;
  var Rx_19 = Rx.VirtualTimeScheduler;
  var Rx_20 = Rx.AjaxResponse;
  var Rx_21 = Rx.AjaxError;
  var Rx_22 = Rx.AjaxTimeoutError;
  var Rx_23 = Rx.pipe;
  var Rx_24 = Rx.operators;
  var Rx_25 = Rx.Scheduler;
  var Rx_26 = Rx.Symbol;
  
  window.Observable = Rx_3;
  
  }());
  