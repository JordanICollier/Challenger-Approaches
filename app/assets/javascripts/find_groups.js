(function() {

  function PopulateMap(el) {
    this.el = el;
    this.$el = $(el);
    this.userId = this.$el.data('userId');

    this.userLocationPromise = new $.Deferred();

    this.fetchLocation = this.fetchLocation.bind(this);
    this.instantiateMap = this.instantiateMap.bind(this);
    this.draw = this.draw.bind(this);
  }

  PopulateMap.prototype.draw = function() {
    this.fetchLocation().done(this.instantiateMap);
  };

  PopulateMap.prototype.fetchLocation = function() {
    return $.ajax({
      url: '/api/locations',
      dataType: 'JSON',
      type: 'GET',
      data: {
        user_id: this.userId
      }

    });
  };

  PopulateMap.prototype.instantiateMap = function(json) {
    var location = json[0],
        userLocation = new google.maps.LatLng(location.lat, location.long),
        mapOptions = _.extend(this.defaultMapOptions, { center: userLocation } );

    this.userLocation = userLocation;
    this.userLocationPromise.resolve(userLocation);

    this.map = new GoogleMap(
      new google.maps.Map(this.el, mapOptions)
    );
  };

  PopulateMap.prototype.defaultMapOptions = {
    zoom: 10
  };

  function GoogleMap(map) {
    this.map = map;
  }

  GoogleMap.prototype.toMap = function() {
    return this.map;
  };

  function yallreadyforthis() {
    if ($('#map-canvas').length === 0) return;
    var populate = new PopulateMap(document.getElementById('map-canvas'));
    populate.draw();

    var bounds = new google.maps.LatLngBounds();

    var locator = new DistanceLocator();
    var geocoder = new google.maps.Geocoder();

    var makeMarker = function(results) {
      console.log('making marker');
      var map = populate.map.toMap();

      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        //icon: "http://www.nintendo.com/consumer/images/wiiGCN.gif"
        icon: '/assets/videogames.png'     });

      MarkerStack.push(marker);

      var rnd = function(x) {
        return Math.round(x*100)/100;
      };

      var location = _.select(GroupCache.cache, function(el) {
        var lat1 = rnd(el[0]), lat2 = rnd(results[0].geometry.location.A),
            long1 = rnd(el[1]), long2 = rnd(results[0].geometry.location.F);

        return lat1 == lat2 && long1 == long2;
      });

      new InfoWindow(location[0][2], marker, map).addObservers();
    };

    locator.addObservers(populate);
    locator.on("calculated", function(distances) {
      var map = populate.map.toMap();
      MarkerStack.deleteAll();

      bounds = new google.maps.LatLngBounds();

      for (var i=0; i < distances.length; i++) {
        geocoder.geocode({ 'address': distances[i]}, makeMarker);
      }
    });
  }

  function InfoWindow(groupId, marker, map) {
    this.groupId = groupId;
    this.marker = marker;
    this.map = map;

    this.openWindow = this.openWindow.bind(this);
    this.fetchGroup = this.fetchGroup.bind(this);
  }

  InfoWindow.prototype.addObservers = function() {
    google.maps.event.addListener(this.marker, 'click', this.fetchGroup);
  };

  InfoWindow.prototype.fetchGroup = function() {
    $.ajax({
      url: '/api/groups',
      dataType: 'JSON',
      type: 'GET',
      data: {
        id: this.groupId
      },
      success: this.openWindow
    });
  };

  InfoWindow.prototype.openWindow = function(json) {
    console.log(json);
    var content = HandlebarsTemplates.group(json);

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    infowindow.open(this.map, this.marker);
  };

  var MarkerStack = {
    markers: [],
    deleteAll: function() {
      console.log(this.markers);
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

      this.markers = [];
    },
    push: function(marker) {
      this.markers.push(marker);
    }
  };

  function DistanceLocator() {
    this.matrix = new google.maps.DistanceMatrixService();
    this.calculateDistances = this.calculateDistances.bind(this);
    this.returnResults = this.returnResults.bind(this);
  }

  _.extend(DistanceLocator.prototype, new Events());

  $(function() {
    if ($('#groups').length === 0) return;
    var locations = $('#groups').data('locations'),
        results = [];


    for (var i=0; i < locations.length; i++) {
      results.push(new google.maps.LatLng(locations[i][0], locations[i][1]));
      GroupCache.cache.push(locations[i]);
    }

    DistanceLocator.prototype.groups = results;
  });

  window.GroupCache = { cache: []};

  DistanceLocator.prototype.addObservers = function(populate) {
    var self = this;

    $('.search-button').on('click', function(e) {
      e.preventDefault();
      var origin = $('#find-groups input').val();

      self.calculateDistances(origin);
    });

    $('.search-user').on('click', function(e) {
      e.preventDefault();
      var origin = populate.userLocation;

      self.calculateDistances(origin);
    });

    $(document).on('find_groups:search_query', function(e, origin) {
      e.preventDefault();
      self.calculateDistances(origin);
    });
  };

  DistanceLocator.prototype.calculateDistances = function(origin) {
    this.matrix.getDistanceMatrix({
      origins: [origin],
      destinations: this.groups,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, this.returnResults);
  };

  DistanceLocator.ONE_HUNDRED_MILES = 160934;

  DistanceLocator.prototype.returnResults = function(distances) {
    var results=[], elements = distances.rows[0].elements;

    for (var i=0; i < elements.length; i++) {
      if (elements[i].distance.value < DistanceLocator.ONE_HUNDRED_MILES) {
        results.push(distances.destinationAddresses[i]);
      }
    }

    this.emit("calculated", results);
  };

$(function() {
  google.maps.event.addDomListener(window, 'load', yallreadyforthis);
});

})();
