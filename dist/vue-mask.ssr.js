'use strict';function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}var stringMask = createCommonjsModule(function (module, exports) {
(function(root, factory) {
    /* istanbul ignore next */
    {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    }
}(commonjsGlobal, function() {
    var tokens = {
        '0': {pattern: /\d/, _default: '0'},
        '9': {pattern: /\d/, optional: true},
        '#': {pattern: /\d/, optional: true, recursive: true},
        'A': {pattern: /[a-zA-Z0-9]/},
        'S': {pattern: /[a-zA-Z]/},
        'U': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleUpperCase(); }},
        'L': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleLowerCase(); }},
        '$': {escape: true}
    };

    function isEscaped(pattern, pos) {
        var count = 0;
        var i = pos - 1;
        var token = {escape: true};
        while (i >= 0 && token && token.escape) {
            token = tokens[pattern.charAt(i)];
            count += token && token.escape ? 1 : 0;
            i--;
        }
        return count > 0 && count % 2 === 1;
    }

    function calcOptionalNumbersToUse(pattern, value) {
        var numbersInP = pattern.replace(/[^0]/g,'').length;
        var numbersInV = value.replace(/[^\d]/g,'').length;
        return numbersInV - numbersInP;
    }

    function concatChar(text, character, options, token) {
        if (token && typeof token.transform === 'function') {
            character = token.transform(character);
        }
        if (options.reverse) {
            return character + text;
        }
        return text + character;
    }

    function hasMoreTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
    }

    function hasMoreRecursiveTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && token.recursive ? true : hasMoreRecursiveTokens(pattern, pos + inc, inc);
    }

    function insertChar(text, char, position) {
        var t = text.split('');
        t.splice(position, 0, char);
        return t.join('');
    }

    function StringMask(pattern, opt) {
        this.options = opt || {};
        this.options = {
            reverse: this.options.reverse || false,
            usedefaults: this.options.usedefaults || this.options.reverse
        };
        this.pattern = pattern;
    }

    StringMask.prototype.process = function proccess(value) {
        if (!value) {
            return {result: '', valid: false};
        }
        value = value + '';
        var pattern2 = this.pattern;
        var valid = true;
        var formatted = '';
        var valuePos = this.options.reverse ? value.length - 1 : 0;
        var patternPos = 0;
        var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
        var escapeNext = false;
        var recursive = [];
        var inRecursiveMode = false;

        var steps = {
            start: this.options.reverse ? pattern2.length - 1 : 0,
            end: this.options.reverse ? -1 : pattern2.length,
            inc: this.options.reverse ? -1 : 1
        };

        function continueCondition(options) {
            if (!inRecursiveMode && !recursive.length && hasMoreTokens(pattern2, patternPos, steps.inc)) {
                // continue in the normal iteration
                return true;
            } else if (!inRecursiveMode && recursive.length &&
                hasMoreRecursiveTokens(pattern2, patternPos, steps.inc)) {
                // continue looking for the recursive tokens
                // Note: all chars in the patterns after the recursive portion will be handled as static string
                return true;
            } else if (!inRecursiveMode) {
                // start to handle the recursive portion of the pattern
                inRecursiveMode = recursive.length > 0;
            }

            if (inRecursiveMode) {
                var pc = recursive.shift();
                recursive.push(pc);
                if (options.reverse && valuePos >= 0) {
                    patternPos++;
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                } else if (!options.reverse && valuePos < value.length) {
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                }
            }
            return patternPos < pattern2.length && patternPos >= 0;
        }

        /**
         * Iterate over the pattern's chars parsing/matching the input value chars
         * until the end of the pattern. If the pattern ends with recursive chars
         * the iteration will continue until the end of the input value.
         *
         * Note: The iteration must stop if an invalid char is found.
         */
        for (patternPos = steps.start; continueCondition(this.options); patternPos = patternPos + steps.inc) {
            // Value char
            var vc = value.charAt(valuePos);
            // Pattern char to match with the value char
            var pc = pattern2.charAt(patternPos);

            var token = tokens[pc];
            if (recursive.length && token && !token.recursive) {
                // In the recursive portion of the pattern: tokens not recursive must be seen as static chars
                token = null;
            }

            // 1. Handle escape tokens in pattern
            // go to next iteration: if the pattern char is a escape char or was escaped
            if (!inRecursiveMode || vc) {
                if (this.options.reverse && isEscaped(pattern2, patternPos)) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    // skip escape token
                    patternPos = patternPos + steps.inc;
                    continue;
                } else if (!this.options.reverse && escapeNext) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this.options, token);
                    escapeNext = false;
                    continue;
                } else if (!this.options.reverse && token && token.escape) {
                    // mark to escape the next pattern char
                    escapeNext = true;
                    continue;
                }
            }

            // 2. Handle recursive tokens in pattern
            // go to next iteration: if the value str is finished or
            //                       if there is a normal token in the recursive portion of the pattern
            if (!inRecursiveMode && token && token.recursive) {
                // save it to repeat in the end of the pattern and handle the value char now
                recursive.push(pc);
            } else if (inRecursiveMode && !vc) {
                // in recursive mode but value is finished. Add the pattern char if it is not a recursive token
                formatted = concatChar(formatted, pc, this.options, token);
                continue;
            } else if (!inRecursiveMode && recursive.length > 0 && !vc) {
                // recursiveMode not started but already in the recursive portion of the pattern
                continue;
            }

            // 3. Handle the value
            // break iterations: if value is invalid for the given pattern
            if (!token) {
                // add char of the pattern
                formatted = concatChar(formatted, pc, this.options, token);
                if (!inRecursiveMode && recursive.length) {
                    // save it to repeat in the end of the pattern
                    recursive.push(pc);
                }
            } else if (token.optional) {
                // if token is optional, only add the value char if it matchs the token pattern
                //                       if not, move on to the next pattern char
                if (token.pattern.test(vc) && optionalNumbersToUse) {
                    formatted = concatChar(formatted, vc, this.options, token);
                    valuePos = valuePos + steps.inc;
                    optionalNumbersToUse--;
                } else if (recursive.length > 0 && vc) {
                    valid = false;
                    break;
                }
            } else if (token.pattern.test(vc)) {
                // if token isn't optional the value char must match the token pattern
                formatted = concatChar(formatted, vc, this.options, token);
                valuePos = valuePos + steps.inc;
            } else if (!vc && token._default && this.options.usedefaults) {
                // if the token isn't optional and has a default value, use it if the value is finished
                formatted = concatChar(formatted, token._default, this.options, token);
            } else {
                // the string value don't match the given pattern
                valid = false;
                break;
            }
        }

        return {result: formatted, valid: valid};
    };

    StringMask.prototype.apply = function(value) {
        return this.process(value).result;
    };

    StringMask.prototype.validate = function(value) {
        return this.process(value).valid;
    };

    StringMask.process = function(value, pattern, options) {
        return new StringMask(pattern, options).process(value);
    };

    StringMask.apply = function(value, pattern, options) {
        return new StringMask(pattern, options).apply(value);
    };

    StringMask.validate = function(value, pattern, options) {
        return new StringMask(pattern, options).validate(value);
    };

    return StringMask;
}));
});var getInputElement = function getInputElement(el) {
  var inputEl = el.tagName.toLowerCase() !== 'input' ? el.querySelector('input:not([readonly])') : el;
  if (!inputEl) {
    throw new Error('Mask directive requires at least one input');
  }
  return inputEl;
};
function createEvent(name) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(name, true, true);
  return event;
}
var filterNumbers = function filterNumbers(v) {
  return v.replace(/\D/g, '');
};
var filterLetters = function filterLetters(v) {
  return v.replace(/[^a-zA-Z]/g, '');
};
var filterAlphanumeric = function filterAlphanumeric(v) {
  return v.replace(/[^a-zA-Z0-9]/g, '');
};
var parsePreFn = function parsePreFn(arg) {
  if (typeof arg === 'function') {
    return arg;
  }
  switch (arg) {
    case 'filter-number':
      return filterNumbers;
    case 'filter-letter':
      return filterLetters;
    default:
      return filterAlphanumeric;
  }
};
var parsePostFn = function parsePostFn(arg) {
  if (typeof arg === 'function') {
    return arg;
  }
  return function (value) {
    return value.trim().replace(/[^0-9]$/, '');
  };
};var delimiter = "\xA7";
function masker(fn) {
  return function (args) {
    var data = fn(args);
    var pre = parsePreFn('pre' in data ? data.pre : null);
    var post = parsePostFn('post' in data ? data.post : null);
    var formatter = 'pattern' in data && data.pattern ? new stringMask(data.pattern, data.options || {}) : null;
    var handler = 'handler' in data && typeof data.handler === 'function' ? data.handler : function (value) {
      return formatter ? formatter.apply(value) : value;
    };
    return function (str) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      args = _objectSpread2(_objectSpread2({}, args), {}, {
        delimiter: delimiter
      });
      str = pre(str, args);
      var _split = (!str.includes(delimiter) ? "".concat(delimiter).concat(str) : str).split(delimiter),
        _split2 = _slicedToArray(_split, 2),
        prefix = _split2[0],
        value = _split2[1];
      value = handler(value, args);
      return post("".concat(prefix).concat(value), args);
    };
  };
}var mask = masker(function (_ref) {
  var pattern = _ref.value;
  return {
    pattern: pattern,
    pre: filterAlphanumeric,
    post: function post(value) {
      return value.trim().replace(/[^a-zA-Z0-9]$/, '');
    }
  };
});var patterns = {
  us: '0000-00-00',
  br: '00/00/0000'
};
var date = masker(function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? null : _ref$locale;
  return {
    pattern: patterns[locale || 'us'],
    pre: filterNumbers
  };
});var hour = masker(function () {
  return {
    pattern: '00:00',
    pre: filterNumbers
  };
});var handlers$1 = {
  get us() {
    var phone = new stringMask('(000) 000-0000');
    return function (value) {
      return phone.apply(value);
    };
  },
  get br() {
    var phone = new stringMask('(00) 0000-0000');
    var phone9 = new stringMask('(00) 9 0000-0000');
    var phone0800 = new stringMask('0000-000-0000');
    return function (value) {
      if (value.startsWith('0800'.slice(0, value.length))) {
        return phone0800.apply(value);
      } else if (value.length <= 10) {
        return phone.apply(value);
      }
      return phone9.apply(value);
    };
  }
};
var phone = masker(function (_ref) {
  var locale = _ref.locale;
  var handler = handlers$1[locale || 'us'];
  return {
    pre: filterNumbers,
    handler: handler
  };
});var config = {
  us: {
    thousand: ',',
    decimal: '.'
  },
  br: {
    thousand: '.',
    decimal: ','
  }
};
var decimal = masker(function (_ref) {
  var locale = _ref.locale,
    value = _ref.value;
  var conf = config[locale || 'us'];
  var patternParts = ["#".concat(conf.thousand, "##0")];
  var precision = value || 0;
  if (precision) {
    patternParts.push(conf.decimal, new Array(precision).fill('0').join(''));
  }
  return {
    pattern: patternParts.join(''),
    options: {
      reverse: true
    },
    pre: function pre(value, _ref2) {
      var delimiter = _ref2.delimiter;
      if (!value) {
        return '';
      }
      var sign = value.startsWith('-') ? '-' : '';
      var _value$split$map = value.split(conf.decimal).map(filterNumbers),
        _value$split$map2 = _slicedToArray(_value$split$map, 2),
        number = _value$split$map2[0],
        _value$split$map2$ = _value$split$map2[1],
        fraction = _value$split$map2$ === void 0 ? '' : _value$split$map2$;
      if (fraction && fraction.length > precision) {
        number = "".concat(number).concat(fraction.slice(0, -precision));
        fraction = fraction.slice(-precision);
      }
      return [sign, delimiter, Number(number), fraction].join('');
    },
    post: function post(value) {
      return value;
    }
  };
});var number = masker(function () {
  return {
    pattern: '#0',
    options: {
      reverse: true
    },
    pre: filterNumbers
  };
});var cpf = masker(function () {
  return {
    pattern: '000.000.000-00',
    pre: filterNumbers
  };
});var cnpj = masker(function () {
  return {
    pattern: '00.000.000/0000-00',
    pre: filterNumbers
  };
});var handlers = {
  get us() {
    var cpf = new stringMask('000.000.000-00');
    var cnpj = new stringMask('00.000.000/0000-00');
    return function (value) {
      if (value.length <= 11) return cpf.apply(value);else return cnpj.apply(value);
    };
  },
  get br() {
    var cpf = new stringMask('000.000.000-00');
    var cnpj = new stringMask('00.000.000/0000-00');
    return function (value) {
      if (value.length <= 11) return cpf.apply(value);else return cnpj.apply(value);
    };
  }
};
var cpfcnpj = masker(function (_ref) {
  var locale = _ref.locale;
  var handler = handlers[locale || 'br'];
  return {
    pre: filterNumbers,
    handler: handler
  };
});var cep = masker(function () {
  return {
    pattern: '00.000-000',
    pre: filterNumbers
  };
});var creditCard = masker(function () {
  return {
    pattern: '0000 0000 0000 0000',
    pre: filterNumbers
  };
});var masks=/*#__PURE__*/Object.freeze({__proto__:null,mask:mask,maskDate:date,maskHour:hour,maskPhone:phone,maskDecimal:decimal,maskNumber:number,maskCpf:cpf,maskCnpj:cnpj,maskCpfCnpj:cpfcnpj,maskCep:cep,maskCc:creditCard});function updater(el, masker) {
  var currentValue = el.value;
  var oldValue = el.dataset.value;
  if (oldValue === currentValue) {
    return;
  }
  var newValue = masker(currentValue, {
    el: el
  });
  if (newValue === currentValue) {
    el.dataset.value = currentValue;
    return;
  }

  // Get current cursor position
  var position = el.selectionEnd;

  // Find next cursor position
  if (position === currentValue.length) {
    position = newValue.length;
  } else if (position > 0 && position <= newValue.length) {
    var digit = currentValue.charAt(position - 1);
    if (digit !== newValue.charAt(position - 1)) {
      if (digit === newValue.charAt(position)) {
        position += 1;
      } else if (digit === newValue.charAt(position - 2)) {
        position -= 1;
      }
    }
  }
  el.value = newValue;
  el.dataset.value = newValue;
  if (el === document.activeElement) {
    // Restore cursor position
    el.setSelectionRange(position, position);
  }
  el.dispatchEvent(createEvent('input'));
}
function make(maskerFn) {
  var maskerMap = new WeakMap();
  var inputMap = new WeakMap();
  // const eventMap = new WeakMap();

  return {
    beforeMount: function beforeMount(el, binding) {
      var masker = maskerFn({
        value: binding.value,
        locale: binding.arg || Object.keys(binding.modifiers)[0] || null
      });
      var inputEl = getInputElement(el);

      // const eventHandler = ({ isTrusted }) => {
      //   if (isTrusted) {
      //     updater(inputEl, masker);
      //   }
      // };

      maskerMap.set(el, masker);
      inputMap.set(el, inputEl);
      // eventMap.set(el, eventHandler);

      // inputEl.addEventListener('input', eventHandler);
    },
    mounted: function mounted(el) {
      updater(inputMap.get(el), maskerMap.get(el));
    },
    updated: function updated(el) {
      updater(inputMap.get(el), maskerMap.get(el));
    },
    unmounted: function unmounted(el) {
      // el.removeEventListener('input', inputMap.get(el));
      maskerMap.delete(el);
      inputMap.delete(el);
      // eventMap.delete(el);
    }
  };
}// install function executed by Vue.use()
var install = function installPlugin(app) {
  // Register directives
  for (var name in masks) {
    app.directive(name, make(masks[name]));
  }
};// iife/cjs usage extends esm default export - so import it all
module.exports=install;