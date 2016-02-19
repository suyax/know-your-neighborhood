angular.module('Myapp', [])

.service('sharedProperties', function() {
  var yelpKeyword = {
    data: 'restaurant'
  };
  var yelpselectCa = {
    data: 'food'
  };
    return {
      getKeyword : function() {
        return yelpKeyword;
      },
      setKeyword : function(value) {
        yelpKeyword.data = value;
      },
      getselectCa : function() {
        return yelpselectCa;
      },
      setselectCa : function(value) {
        yelpselectCa.data = value;
      },

    }
})

.controller('yelpCaController', function ($scope, sharedProperties) {
  $scope.sizes = [
     {code: 1, name: 'hotels'},
     {code: 2, name: 'food'},
     {code: 3, name: 'shopping'},
     {code: 4, name: 'buses'}
    ];
    $scope.yelpselectCa = sharedProperties.getselectCa.data;
  /*  $scope.yelpselectCa ={data: "eeee"};*/
/*  $scope.setselectCa = function(newSelect) {
    console.log(newSelect);
    $scope.yelpselectCa.data = newSelect;
    sharedProperties.setselectCa(newValue);
  }*/
  $scope.update = function(){
     $scope.yelpselectCa = $scope.item.name;
     console.log($scope.yelpselectCa);
     sharedProperties.setselectCa($scope.yelpselectCa);
  };


})

.controller('yelpKeywordController', function ($scope, sharedProperties) {
  $scope.yelpKeyword = sharedProperties.getKeyword();
  // $scope.yelpKeyword = {data: 'hello'};
  $scope.yelpselectCa = sharedProperties.getselectCa();
   $scope.setKeyword = function(newValue) {
    $scope.yelpKeyword.data = newValue;
    sharedProperties.setKeyword(newValue);
    console.log($scope.yelpKeyword, $scope.yelpselectCa);
    //make ajax call
    var defaultData = {
      center: {
        lat: 40.665911,
        lng: -111.513906,
        location: "Park+City"},
      img: "images/Hotel.svg",
      term: "inn",
      category: "hotels",
      yelp_url: "//api.yelp.com/v2/search"
    };

    defaultData.term = $scope.yelpKeyword.data;
    defaultData.category = $scope.yelpselectCa.data;

    var parameters = {
      oauth_consumer_key: "7rqoAa2v6JN6e-OxrS6fHQ",
      oauth_token: "jTINSkrHtlq0Vw8eRrYyK1SFrXmLWUnt",
      oauth_nonce: nonce,
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      location: defaultData.center.location,
      cll: defaultData.center.lat + ',' + defaultData.center.lng,
      term: dataValidater(defaultData.term,"term"),
      limit: 10,
      category_filter: dataValidater(defaultData.category,"category")
    };

    //get encodedSignature;
    var encodedSignature = oauthSignature.generate('GET', defaultData.yelp_url, parameters,
        "YOoYY4UHe1D3tEixMbExUtBqptI", "0H8fIAhkGp_z9M09IIfQxmvZoIk");

    parameters.oauth_signature = encodedSignature;
    $.ajax({
        url: defaultData.yelp_url,
        data: parameters,
        cache: true,
        dataType: "jsonp",
        error: function( error ){
          throw erro;
        },

        //jsonp: "callback",
        success: function( response ) {
          console.log("success");
          items=[];
          $.each(response.businesses, function(business){
            var bizname = response.businesses[business].name;
            var bizurl =  response.businesses[business].url;
            var bizrate = response.businesses[business].rating_img_url;
            var bizimg = response.businesses[business].image_url;
            var bizreview = response.businesses[business].review_count;
            var bizlat = response.businesses[business].location.coordinate.latitude;
            var bizlng = response.businesses[business].location.coordinate.longitude;
            var bizll =  {lat: bizlat, lng: bizlng};
            items.push( new Item(bizname, bizurl, bizrate, bizimg, bizreview, bizll));
          });
          console.log();
          clearTimeout(yelpRequestTimeout);
          initList(items);
        }
    });

  }
});


