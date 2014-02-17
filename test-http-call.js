if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to test-http-call.";
  };

  Template.hello.events({
    'submit form' : function (evt) {
      evt.preventDefault()

      Meteor.call('makeHTTPCall',
        function (err, result) {
          if (err) {
            alert('Error: ' + err.message)
          } else {
            alert(JSON.stringify(result, null, 2))
          }
        })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    makeHTTPCall: function () {
      var url = 'http://localhost:3000/ping'
      this.unblock()
      try {
        var result = HTTP.call('GET', url)
        return result
      } catch (e) {
        console && console.log && console.log('Exception calling', url)
        throw e
      }
    }
  })

  Router.map(function () {
    this.route('serverRoute', {
      where: 'server',
      path: '/ping',

      action: function () {
        this.response.writeHead(200, {'Content-Type': 'application/json'})
        this.response.end('{"status":"success"}')
      }
    })
  })
}
