angular.module("Config", [])
.constant("SETTINGS_CONF", {
  indices:{
    title:'Indices',
    url: 'indices',
    cols: [
      {name: 'name'}
    ],
    icon: 'glyphicon glyphicon-tree-deciduous'
  },
  fluids:{
    title:'Fluids',
    url: 'fluids',
    cols: [
      {name: 'name'}
    ],
    icon: 'glyphicon glyphicon-tree-deciduous'
  },
  fluidTypes:{
    title: "Fluid Types",
    url: 'fluidtype',
    cols: [
      {name: 'name'}
    ],
    icon: 'glyphicon glyphicon-tree-deciduous'
  },
  providers:{
    title:'Providers',
    url: 'provider',
    cols: [
      {name: 'name'}
    ],
    icon: 'glyphicon glyphicon-tree-deciduous'
  }
})
;
