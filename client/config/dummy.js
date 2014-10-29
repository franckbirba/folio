'use strict'

angular.module("eportfolioConfig")
  .constant("DUMMY", {
    // BuildingService Values
    images: [
      { src: "http://www.zepros.fr/img_articles/images/articles/bati/actu/BZP1%20Reg%20GO%20Bepos%20Tours2.jpg" },
      { src: "http://acifmantoue.e-monsite.com/medias/images/faure-ingenierie-batiment-251544-1.jpg" },
      { src: "http://dtxtq4w60xqpw.cloudfront.net/sites/all/files/photocontest2012/untitled-1copy.jpg" }
    ],
    certs: [
      {src: "http://www.ffbatiment.fr/Files/pub/Fede_N00/MINISITE_ECO_CONSTRUCTION_3374/4ee8529f4d2d460db2121e9104f1f3b3/EDIT/logo_nf_service_batiment.png" },
      {src: "http://www.bio-teknik-consulting.com/wp-content/uploads/2010/05/logo_effinergie.jpg"},
      {src: "http://www.gerflor.fr/cache/media/20-environnement/logos-environnement/leed_72dpi/s,180,300-eb11e7.png"},
      {src: "http://www.ffbatiment.fr/Files/pub/Fede_N00/MINISITE_ECO_CONSTRUCTION_3374/4ee8529f4d2d460db2121e9104f1f3b3/EDIT/logo_nf_service_batiment.png"},
      {src: "http://www.bio-teknik-consulting.com/wp-content/uploads/2010/05/logo_effinergie.jpg"},
      {src: "http://www.gerflor.fr/cache/media/20-environnement/logos-environnement/leed_72dpi/s,180,300-eb11e7.png"}
    ],
    usage_types: {
      '0' : "Par type d\'usage",
      'A' : 'A label',
      'B' : 'B label',
      'C' : 'C label',
      'D' : 'D label',
      'E' : 'E label',
      'F' : 'F label',
      'G' : 'G label',
      'H' : 'H label'
    },

    // ObservatoryService values
    observatory_map: {
      center: {
        latitude: 48.8715008,
        longitude: 2.3268878999999743
        },
      zoom: 10
    },

    hqe_types: {
      'all': 'Touts les bâtiments',
      'hqe': 'Bâtiments HQE',
      'nohqe': 'Bâtiments NON-HQE'
    },

    consumptionChartDataDefaults: [
      { "label" : "A Label", "value" : 0},
      { "label" : "B Label", "value" : 0},
      { "label" : "C Label", "value" : 0},
      { "label" : "D Label", "value" : 0},
      { "label" : "E Label", "value" : 0},
      { "label" : "F Label", "value" : 0},
      { "label" : "G Label", "value" : 0},
      { "label" : "H Label", "value" : 0}
    ],

    portfolios: [
      {name: 'first', description: 'hello world'},
      {name: 'second', description: 'hello universe'}
    ],

    // BuildingService values
    building_map: {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
    }
  })
