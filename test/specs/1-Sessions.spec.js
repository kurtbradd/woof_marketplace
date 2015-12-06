describe('Sessions', function () {

  beforeEach(function(done) {
    setTimeout(done, 1000);
  });
	
	describe('Register', function (){
		
		it('register with required parameters', function (done) {

			var requestBody = {
				f_name: "Kurt",
				l_name: "DaCosta",
				age: 23,
				phone: "5192220320",
				email: "kurtbradd@gmail.com",
				password: "password",
				description: "developer"
			}

			api.post('/session/register')
			.send(requestBody)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
		});
	});

});