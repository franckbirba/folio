(function(){
  var faker = require('faker')
  var randomBool;

  randomBool = function() {
    var _ref;
    return (_ref = faker.helpers.randomNumber() % 2 > 0) != null ? _ref : {
      "true": false
    };
  };
  var Address, Building;

  Address = (function() {
    function Address() {
      this.address1 = faker.address.streetAddress();
      this.city = faker.address.city();
      this.country = faker.address.country();
    }

    return Address;

  })();

  Building = (function() {
    function Building() {
      this.name = faker.name.firstName();
      this.address = new Address;
      this.info = {
        construction_year: faker.random.number(),
        control: {
          full: randomBool(),
          shared: randomBool()
        },
        user: {
          own_use: randomBool(),
          rented: randomBool()
        },
        area_total: faker.helpers.randomNumber(),
        area_usefull: faker.helpers.randomNumber(),
        floors: faker.helpers.randomNumber(),
        parking_spaces: faker.helpers.randomNumber(),
        parking_surface: faker.helpers.randomNumber()
      };
    }

    return Building;

  })();
  module.exports = Building
})();
