(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.setNumIns = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var setNumIns = function setNumIns(state, action) {
    var node = Object.assign({}, state.node);

    var num = parseInt(action.num);
    var nodeid = action.nodeid;

    var nodePins = Object.assign([], node[nodeid].ins);

    var numPins = nodePins.length;

    if (isNaN(num) || numPins === num) return state;

    if (numPins < num) {
      // Adding pins.
      for (var i = numPins; i < num; i++) {
        nodePins.push("in" + i);
      }
    } else {
      var _loop = function _loop(_i) {
        var isConnected = false;

        // Look for links connected to this pin.
        Object.keys(state.link).forEach(function (linkid) {
          if (isConnected) return;

          var link = state.link[linkid];

          isConnected = link.to[0] === nodeid && link.to[1] === _i - 1;
        });

        // Remove pin only if it is not connected.
        if (!isConnected) nodePins.pop();
      };

      // Removing pins.
      for (var _i = numPins; _i > num; _i--) {
        _loop(_i);
      }
    }

    node[nodeid].ins = nodePins;

    return Object.assign({}, state, { node: node });
  };

  exports.default = setNumIns;
  module.exports = exports["default"];
});