(function() {
  var Include;
    if (typeof Spine !== "undefined" && Spine !== null) {
    Spine;
  } else {
    Spine = require('spine');
  };
  Include = {
    savePrevious: function() {
      return this.constructor.records[this.id].previousAttributes = this.attributes();
    }
  };
  Spine.Model.Dirty = {
    extended: function() {
      this.bind('refresh', function(records) {
        var record, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = records.length; _i < _len; _i++) {
          record = records[_i];
          _results.push(record.savePrevious());
        }
        return _results;
      });
      this.bind('save', function(record) {
        var key, _i, _len, _ref;
        if (record.previousAttributes != null) {
          _ref = record.constructor.attributes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if (key in record) {
              if (record[key] !== record.previousAttributes[key]) {
                record.trigger('change:' + key, record[key]);
              }
            }
          }
        }
        return record.savePrevious();
      });
      return this.include(Include);
    }
  };
}).call(this);
