"use strict";

angular.module("eportfolioConfig")
  .constant("MODELS", {
    indices:{
        title:'Indices',
        genYears:true,
        cols: [
        {
            name: 'name'
        }
        ],
        rows: [],
        action: 'new indice',
        url: 'ind',
        noProject: true,
        icon: 'glyphicon glyphicon-tree-deciduous'
    },
    fluids:{
        title:'Fluid',
        genYears: true,
        cols: [
            {
                name: 'name'
            }
        ],
        rows: [],
        action: 'new fluid',
        url: 'fld',
        icon: 'glyphicon glyphicon-tree-deciduous'
    },
    fluidType:{
        title: "FluidType",
        url:"fldt",
        cols: [
            {
            name: 'name'
            }
        ],
             rows: [
            {
                _id: 'elec',
                name: 'Electricité'
            },
            {
                _id: 'chaleur',
                name: 'Chaleur'
            },
            {
                _id: 'eau',
                name: 'Eau'
            }
        ]
    },
    vendor:{
        title:'Provider',
        url:"pvr",
        cols: [
            {
            name: 'name'
            }
        ],
             rows: [
            {
                _id: 'edf',
                name: 'EDF'
            },
            {
                _id: 'gdf',
                name: 'GDF'
            }
        ]
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
  });
