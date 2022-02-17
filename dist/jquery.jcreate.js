/**
 * jquery.jcreate.js v1.3.0
 * Marco Montalbano © 2011-2022 - https://marcomontalbano.com
 * ----------------------------------------------------------
 */
(function($, domManip, append, prepend, before, after, html, replaceWith) {
    var _createList = [], _utility = {};
    _utility.camelize = function(str) {
        return str.toLowerCase().replace(/[-_\.]+(.)/g, function(match, group) {
            return group.toUpperCase();
        });
    };
    _utility.firstLetterToLowerCase = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    };
    _utility.firstLetterToUpperCase = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    _utility.filterDataByKey = function(data, key) {
        var _data = {}, regexp = new RegExp("^" + key + "([A-Za-z0-9]+)$"), matches;
        if (typeof data !== "object") {
            return data;
        }
        for (var data_key in data) {
            if (Object.hasOwnProperty.call(data, data_key)) {
                matches = data_key.match(regexp);
                if (matches) {
                    _data[_utility.firstLetterToLowerCase(matches[1])] = data[data_key];
                }
            }
        }
        return _data;
    };
    var _create = function(_createItem) {
        var $elements = _createItem.is_document ? $(_createItem.handleObj.selector) : _createItem.$delegateTarget.find(_createItem.handleObj.selector);
        $elements.each(function() {
            var $this = $(this), data_key = "$.event.special.create", data_sep = ",", data = $this.data(data_key) ? $this.data(data_key).split(data_sep) : [];
            if ($.inArray(_createItem.id, data) === -1) {
                data.push(_createItem.id);
                $this.data(data_key, data.join(data_sep));
                _createItem.handleObj.handler.apply(this, [ new $.Event("create", {
                    currentTarget: this,
                    $currentTarget: $this,
                    delegateTarget: _createItem.delegateTarget,
                    $delegateTarget: _createItem.$delegateTarget,
                    data: _createItem.handleObj.data,
                    options: function(key) {
                        return _utility.filterDataByKey($this.data(), _utility.camelize(key));
                    }
                }) ]);
            }
        });
    };
    var _domManip = function() {
        if (_createList.length >= 1) {
            var _createItem = null;
            for (var key in _createList) {
                if (_createList.hasOwnProperty(key)) {
                    _createItem = _createList[key];
                    _create(_createItem);
                }
            }
        }
        return this;
    };
    $.event.special.create = {
        add: function(handleObj) {
            var $this = $(this);
            var _createItem = {
                id: _createList.length.toString(),
                delegateTarget: this,
                $delegateTarget: $this,
                is_document: $this.is(document),
                handleObj: handleObj
            };
            _createList.push(_createItem);
            _create(_createItem);
        },
        remove: function(handleObj) {
            for (var _createList_key in _createList) {
                if (_createList.hasOwnProperty(_createList_key) && $(this).is(_createList[_createList_key].$delegateTarget) && _createList[_createList_key].handleObj.selector === handleObj.selector) {
                    delete _createList[_createList_key];
                    break;
                }
            }
        },
        utility: _utility,
        version: "1.3.0"
    };
    $.fn.append = function() {
        return _domManip.apply(append.apply(this, arguments), arguments);
    };
    $.fn.before = function() {
        return _domManip.apply(before.apply(this, arguments), arguments);
    };
    $.fn.after = function() {
        return _domManip.apply(after.apply(this, arguments), arguments);
    };
    $.fn.html = function() {
        return _domManip.apply(html.apply(this, arguments), arguments);
    };
    $.fn.replaceWith = function() {
        return _domManip.apply(replaceWith.apply(this, arguments), arguments);
    };
})(jQuery, jQuery.fn.domManip, jQuery.fn.append, jQuery.fn.prepend, jQuery.fn.before, jQuery.fn.after, jQuery.fn.html, jQuery.fn.replaceWith);