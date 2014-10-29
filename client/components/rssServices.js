'use strict';

angular.module('rssServices', ['ngResource']);

angular.module('rssServices')
  .factory('FeedLoader', function ($resource) {
    console.log("Creating FeedLoader...");
    return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
    });
  })
  .service('RssList', function ($rootScope, FeedLoader) {
    var feeds = [];
    console.log("loading feeds...");
    this.get = function() {
        var feedSources = [
            {title: 'Egis', url: 'http://www.egis.fr/rss.xml'}
        ];
        if (feeds.length === 0) {
            for (var i=0; i<feedSources.length; i++) {
                FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
                    var feed = data.responseData.feed;
                    feeds.push(feed);
                });
            }
        }
        return feeds;
    };
  });
