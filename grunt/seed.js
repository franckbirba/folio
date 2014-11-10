// grunt seed:

module.exports = function(grunt){
  // var modelMap = {
  //   lease: Lease,
  //   portfolio: Portfolio,
  //   building: Building,
  //   user: User
  // };

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  var mongoose = require('mongoose');
  var Seed = require(__dirname + '/../server/config/seed.js');
  console.log(Seed)
  grunt.registerTask('seed', function(target) {
    if (target === 'dev') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'db-seed'
      ]);
    }

    else if (target === 'prod') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'db-seed'
      ]);
    }
    else {
      Seed();
      console.log('please specify an env {dev, prod} to seed')
    }
  });

  grunt.registerTask('clean-seed', function(){
    grunt.task.run('mongo_drop');
  });

  grunt.registerTask('add-users', function(){
    createUsers(grunt.option('quantity'));
  });

  grunt.registerTask('add-buildings', function(){
    createBuildings(grunt.option('quantity'), grunt.option('user'), grunt.option('portfolio'));
  });

  grunt.registerTask('add-portfolios', function(){
    createPortfolios(grunt.option('quantity'), grunt.option('user'))
  });

  grunt.registerTask('add-leases', function(){
    createLeases(grunt.option('quantity'), grunt.option('user'), grunt.option('building'))
  });


  grunt.registerTask('getInfo', function(){
    var done = this.async();

    /*if (grunt.option('model') === 'lease') {
      Lease.find({_id:grunt.option('id')}, function(err, doc){
        done();
      });
    }*/
    modelMap[grunt.option('model')].findById(grunt.option('id'),function(err, doc){
      console.log(arguments);
      done();
    });
  })
}



// function seed(){
//
//   var user = createUsers()[0];
//   console.log("==> NEW USER <==");
//   user.save();
//   console.log("===================");
//
//   var holding = createHolding()
//   holding.save();
//   console.log("==> NEW HOLDING <==");
//   console.log("\n===================");
//
//   var portfolios = createPortfolios(Faker.random.number(10), user._id);
//   portfolios.forEach(function(portfolio){
//         portfolio.save();
//
//     console.log("==> NEW PORTFOLIO <==");
//     var tmpBuildings = createBuildings(Faker.random.number(10), user._id, portfolio);
//     tmpBuildings.forEach(function(building){
//       building.save();
//       console.log("==> NEW BUILDING <==");
//       var tmpLeases = createLeases(Faker.random.number(10), user._id, building);
//       tmpLeases.forEach(function(lease){
//         console.log("==> NEW LEASE <==");
//         lease.save();
//       });
//
//     });
//     console.log("===================");
//   });
//
// }
