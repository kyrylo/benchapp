var app = app || {};

$(function () {
    'use strict';

    var Slide = Backbone.Model.extend({
	defaults: {
	    uri: '',
	    timestamp: new Date(),
	    time: '',
	    bgcolor: '#000000',
	    state: '',
	},

	initialize: function() {
	    this.set('time', this.readableTimestamp());
	},

	readableTimestamp: function() {
	    var timestamp, mins, hrs;

	    timestamp = this.get('timestamp');
	    mins = timestamp.getMinutes() + "";
	    hrs = timestamp.getHours();

	    if (mins.length == 1) {
		mins = mins + '0';
	    }

	    return hrs + ':' + mins;
	},
    });

    var SlideList = Backbone.Collection.extend({
	model: Slide,

	fetch: function() {
	    var t = this;
	    return _.map([
		{url: 'img/6_00.jpg', bgcolor: '#f6f5f3'},
		{url: 'img/6_30.jpg', bgcolor: '#f5f4f2'},
		{url: 'img/7_00.jpg', bgcolor: '#f5f4f2'},
		{url: 'img/7_30.jpg', bgcolor: '#f5f4f2'},
		{url: 'img/8_00.jpg', bgcolor: '#f6f4f3'},
		{url: 'img/8_30.jpg', bgcolor: '#f5f4f2'},
		{url: 'img/9_00.jpg', bgcolor: '#f6f4f3'},
		{url: 'img/9_30.jpg', bgcolor: '#f6f5f3'},
		{url: 'img/10_00.jpg', bgcolor: '#f6f5f3'},
		{url: 'img/10_30.jpg', bgcolor: '#f5f4f2'},
		{url: 'img/11_00.jpg', bgcolor: '#f6f5f3'},
		{url: 'img/11_30.jpg', bgcolor: '#f6f5f3'},
		{url: 'img/12_00.jpg', bgcolor: '#f7f3f2'},
		{url: 'img/12_30.jpg', bgcolor: '#f6f2f1'},
		{url: 'img/13_00.jpg', bgcolor: '#f7f3f2'},
		{url: 'img/13_30.jpg', bgcolor: '#f6f2f1'},
		{url: 'img/14_00.jpg', bgcolor: '#f6f2ef'},
		{url: 'img/14_30.jpg', bgcolor: '#f7f3f2'},
		{url: 'img/15_00.jpg', bgcolor: '#f5f1ee'},
		{url: 'img/15_30.jpg', bgcolor: '#f6f2f1'},
		{url: 'img/16_00.jpg', bgcolor: '#f6f2f1'},
		{url: 'img/16_30.jpg', bgcolor: '#f5f1ee'},
		{url: 'img/17_00.jpg', bgcolor: '#f5f1ee'},
		{url: 'img/17_30.jpg', bgcolor: '#f5f1ee'},
		{url: 'img/18_00.jpg', bgcolor: '#f3eded'},
		{url: 'img/18_30.jpg', bgcolor: '#f2eeeb'},
		{url: 'img/19_00.jpg', bgcolor: '#f3eded'},
		{url: 'img/19_30.jpg', bgcolor: '#f3eded'},
		{url: 'img/20_00.jpg', bgcolor: '#f4efec'},
		{url: 'img/20_30.jpg', bgcolor: '#f3efec'},
		{url: 'img/21_00.jpg', bgcolor: '#f1edec'},
		{url: 'img/21_30.jpg', bgcolor: '#f1edec'},
		{url: 'img/22_00.jpg', bgcolor: '#f1edec'},
		{url: 'img/22_30.jpg', bgcolor: '#f1edee'},
		{url: 'img/23_00.jpg', bgcolor: '#f1edec'},
		{url: 'img/23_30.jpg', bgcolor: '#f0eceb'},
		{url: 'img/0_00.jpg', bgcolor: '#eceaeb'},
		{url: 'img/0_30.jpg', bgcolor: '#eeeced'},
		{url: 'img/1_00.jpg', bgcolor: '#eeeced'},
		{url: 'img/1_30.jpg', bgcolor: '#eceaed'},
		{url: 'img/2_00.jpg', bgcolor: '#eeeced'},
		{url: 'img/2_30.jpg', bgcolor: '#eeeced'},
		{url: 'img/3_00.jpg', bgcolor: '#ecebf0'},
		{url: 'img/3_30.jpg', bgcolor: '#edebee'},
		{url: 'img/4_00.jpg', bgcolor: '#eceaed'},
		{url: 'img/4_30.jpg', bgcolor: '#ecebf0'},
		{url: 'img/5_00.jpg', bgcolor: '#ececee'},
		{url: 'img/5_30.jpg', bgcolor: '#eeecef'},
	    ], function(s) {
		return new Slide({
		    uri: s.url,
		    timestamp: new Date('Jun 1 2013 ' + t.extractTimestamp(s.url)),
		    bgcolor: s.bgcolor,
		});
	    });
	},

	extractTimestamp: function(url) {
	    return url.match('img/(.+).jpg')[1].replace('_', ':');
	},
    });

    var SlideView = Backbone.View.extend({
	template: _.template($('#slides-template').html()),

	el: $('#slide'),

	events: {
	    'click #next_slide' : 'nextSlide'
	},

	render: function(slide) {
	    this.$el.html(this.template((
		slide ? slide : this.currentSlide()
	    ).toJSON()));
	},

	currentSlide: function() {
	    var slide = _.find(this.model, function(model) {
		var date, timestamp;

		date = new Date();
		timestamp = model.get('timestamp');

		return date.getHours() === timestamp.getHours() &&
		    ((timestamp.getMinutes() === 0 && date.getMinutes() < 30) ||
		     (timestamp.getMinutes() === 30 && date.getMinutes() >= 30));
	    });

	    this.slideIdx = this.model.indexOf(slide);
	    return slide;
	},

	nextSlide: function() {
	    var that = this;
	    this.$el.find('img').animate({opacity: 0}, function() {
		that.render(that.model[(that.slideIdx += 1) % 48]);
		that.$el.find('img').css('opacity', '0');
		that.$el.find('img').animate({opacity: 1});
	    });
	},
    });

    var slides = new SlideList().fetch();

    new SlideView({model: slides}).render();
});
