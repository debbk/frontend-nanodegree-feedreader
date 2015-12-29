/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var body = document.body;
            expect(body.className).toBe('menu-hidden');
        });
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the icon is clicked', function() {
            var body = document.body;
            /* Trigger a click event to 'open' menu */
            $('.menu-icon-link').trigger('click');
            expect(body.className).not.toBe('menu-hidden');
            /* Trigger a click event to 'close' menu */
            $('.menu-icon-link').trigger('click');
            expect(body.className).toBe('menu-hidden');
            // Reference: http://stackoverflow.com/questions/10823790/testing-a-click-event-with-jasmine-that-appends-a-style-sheet-to-the-head
        });
    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('has at least one .entry element within the .feed container', function () {
            expect($('.feed.entries')).toBeDefined();
            expect($('.feed').length).not.toBe(0);
        });
    });


    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initial;
        beforeEach(function (done) {
            $('.feed').empty();
            /* load feed '0' - the Udacity blog in this case */
            loadFeed(0, function() {
                initial=$('.feed').html();
                done();
            });
        });
        it('should change when a new feed is loaded', function() {
            var newfeed;
            $('.feed').empty();
            /* load feed '1' - CSS tricks in this case */
            loadFeed(1, function() {
                newfeed=$('.feed').html();
                /* check that both feeds are defined */
                expect(initial).toBeDefined();
                expect(newfeed).toBeDefined();
                done();
            });
        expect(newfeed).not.toEqual(initial);
        });
    });
}());
