(function() {

  var GeoLocator = {
    addObservers: function() {
      $('[type="submit"]').on('click', this.fetchCoordinates);
    },
    fetchCoordinates: function(e) {
      e.preventDefault();

      var userLocation = $('.user-location').val();

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: userLocation }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          GeoLocator.createLocation(results[0]);
        } else {
          console.log('failed hard', status, results);
        };
      });
    },
    createLocation: function(json) {
      $.ajax({
        url: '/locations',
        method: 'POST',
        type: 'JSON',
        data: {
          location: {
            user_id: SmashBros.WhatsUpListener.prototype.userId.call(),
            lat: json.geometry.location.A,
            long: json.geometry.location.F
            formatted_name: json.formatted_address
          }
        }
      })
    }
  };

  $(function() {
    GeoLocator.addObservers();
  });

})();
