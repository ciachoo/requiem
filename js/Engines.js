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

  url = 'http://wmatvmlr401/lr4/oee-monitor/cache/oee_query_Engines_Functional.json';

  Vue.http.get(url, function(data, status, request) {
    window.urldt = data;
    vm.bu['Engines']['Functional'].avail = average(_.pluck(urldt, 'AVAILABILITY'));
    vm.bu['Engines']['Functional'].perf = average(_.pluck(urldt, 'PERFORMANCE'));
    vm.bu['Engines']['Functional'].yiel = average(_.pluck(urldt, 'YIELD'));
    return vm.bu['Engines']['Functional'].oee = average(_.pluck(urldt, 'OEE'));
  });

  window.vm = new Vue({
    el: '#template',
    data: {
      bu: {
        'Engines': {
          'Welder': {
            avail: 0,
            perf: 0,
            yiel: 0,
            oee: 0
          },
          'Functional': {
            avail: 0,
            perf: 0,
            yiel: 0,
            oee: 0
          },
          'Pruebas 161x': {
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
