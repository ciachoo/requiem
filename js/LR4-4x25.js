(function() {
  var url;

  window.sum = function(arr) {
    return arr.reduce(function(a, b) {
      return +a + +b;
    });
  };

  window.average = function(arr) {
    return sum(arr) / arr.length;
  };

  Vue.filter('perc', function(val) {
    var perc;
    perc = Math.round(val * 100);
    if (perc > 100) {
      return 100;
    } else {
      return perc;
    }
  });

  Vue.filter('color', function(val) {
    if ((0 < val && val < .7)) {
      return 'red';
    }
    if ((.7 < val && val < .9)) {
      return 'yellow';
    }
    if ((.9 < val && val <= 2)) {
      return 'green';
    }
  });

  url = 'http://wmatvmlr401/lr4/oee-monitor/cache/oee_query_SiLens_every_x_h.json';

  Vue.http.get(url, function(data, status, request) {
    window.urldt = data;
    vm.bu['LR4-4x25'].SiLens.avail = average(_.pluck(urldt, 'AVAILABILITY'));
    vm.bu['LR4-4x25'].SiLens.perf = average(_.pluck(urldt, 'PERFORMANCE'));
    vm.bu['LR4-4x25'].SiLens.yiel = average(_.pluck(urldt, 'YIELD'));
    return vm.bu['LR4-4x25'].SiLens.oee = average(_.pluck(urldt, 'OEE'));
  });

  window.vm = new Vue({
    el: '#template',
    data: {
      bu: {
        'LR4-4x25': {
          'SiLens': {
            avail: 0,
            perf: 0,
            yiel: 0,
            oee: 0
          },
          'OSA Test': {
            avail: 0,
            perf: 0,
            yiel: 0,
            oee: 0
          },
          'LIV Pack': {
            avail: 0,
            perf: 0,
            yiel: 0,
            oee: 0
          }
        }
      }
    }
  });

}).call(this);
