module.exports = { 
  exec: {
      'reset-mongo': {
        command: function() {
          var collections = ['building', 'action', 'lease', 'portfolio', 'property']
          , cmd = [];
          collections.forEach(function(collection){
            cmd.push('mongoimport -h localhost -d tornado -c '+collection+' --drop test-data/'+collection+'.json');
          });
          return cmd.join(';');
        },
        stdout: true,
        stderr: true
      },
      'db-seed': {
        command: function() {
          var cmd = [];
          grunt.log.writeln('Done seeding!');
          cmd.push('node server/config/seeds.js');
          return cmd.join(';');
        },
        stdout: true,
        stderr: true
      },
    }
  };