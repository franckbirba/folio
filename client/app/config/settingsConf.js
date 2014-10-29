"use strict";

angular.module("eportfolioConfig")
.constant("SETTINGS_CONF", {
  indices:{
    title:'Indices',
    genYears:true,
    cols: [
      {name: 'name'}
    ],
    rows: [],
    action: 'new indice',  /* LOLQUE !? */
    url: 'indices',
    noProject: true, /* LOLQUE !? */
    icon: 'glyphicon glyphicon-tree-deciduous'
  },
  fluids:{
    title:'Fluids',
    genYears: true,
    cols: [
      {name: 'name'}
    ],
    rows: [],
    action: 'new fluid',
    url: 'fluids',
    icon: 'glyphicon glyphicon-tree-deciduous'
  },
  fluidType:{
    title: "Fluid Types",
    url:"fluidtype",
    cols: [
      {name: 'name'}
    ],
    rows: []
  },
  vendor:{
        title:'Providers',
        url:"provider",
        cols: [
            {
            name: 'name'
            }
        ],
             rows: []
    },
    fluidcons:{
        title:'fluidcons',
        cols: [
            {
                name: 'name'
            },
            {
                name: 'type',
                link: 'fluidType',
                type: 'single'
            },
            {
                name: 'source',
                link: 'vendor',
                type: 'single'
            },
            {
                name: 'rent'
            },
            {
                name: 'year'
            },
            {
                name: 'annual cost'
            }
        ],
        rows: [],
        action: 'new fluid cons',
        url: 'fldc',
        icon: 'glyphicon glyphicon-tree-deciduous'
    },
    uses: {
        title:'uses',
        cols: [
            {
                name: 'name'
            },
            {
                name: 'type',
                link: 'fluidType',
                type: 'single'
            },
            {
                name: 'source',
                link: 'vendor',
                type: 'single'
            },
            {
                name: 'rent'
            }
        ],
        rows: [],
        action: 'new use',
        url: 'uses',
        icon: 'glyphicon glyphicon-tree-deciduous'
    }
})
;
