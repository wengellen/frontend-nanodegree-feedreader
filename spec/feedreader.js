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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a url', function(){
            allFeeds.forEach(function(item){
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe('');
            })
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function(){
            allFeeds.forEach(function(item){
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            })
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        var $body,
            $menu;
        describe("Jasmine jQuery Custom Matchers", function(){
            beforeEach(function() {
                jasmine.getFixtures().fixturesPath = 'spec/fixtures';
                loadFixtures('HTML_Fixture.html');
            });


            /* TODO: Write a test that ensures the menu element is
             * hidden by default. You'll have to analyze the HTML and
             * the CSS to determine how we're performing the
             * hiding/showing of the menu element.
             */
            it('should be hidden by default', function(){
                expect($('body')).toHaveClass('menu-hidden');
            });

             /* TODO: Write a test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */
            it('should be shown when menu icon is clicked.', function(){
                var $body =  $('body');
                var $menuIcon =  $('.menu-icon-link');

                $menuIcon.trigger('click');
                expect($body).not.toHaveClass('menu-hidden');

                $menuIcon.trigger('click');
                expect($body).toHaveClass('menu-hidden');
            });
        });
    });
    describe("Jasmine Specs for Asynchronous Operations: ", function() {
        //Scenario -1
        describe("With Done() function: ", function(){
            var myCallback, showErrorMessage;
            beforeEach(function(done) {
                myCallback = jasmine.createSpy();
                $.ajax({
                    url: "spec/fixtures/feed.json",
                    dataType: "json",
                    success: function(responseResult) {
                        myCallback(responseResult);
                        done();
                    },
                    error: showErrorMessage,
                    timeout: 5000
                });
            });
            it("should support JavaScript " +
            "asynchronous operations", function() {
                expect(myCallback).toHaveBeenCalled();
            });
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('should has a .entry element within the .feed container.', function(done){
            expect($('.feed')).toContainElement('.entry');
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var index = 0,
             oldContent = 'No content';

         beforeEach(function(done){
             loadFeed(index, function(){
                 done();
             });
         });

         afterEach(function(){
             index = index + 1;
         });

        it('should change the initial content', function(done){
            entries = $('.feed').find('.entry');
            expect(entries[index].innerText).not.toEqual(oldContent);
            oldContent = entries[index].innerText;
            done();
        });

        it('should change the content on each load', function(done){
            entries = $('.feed').find('.entry');
            expect(entries[index].innerText).not.toEqual(oldContent);
            oldContent = entries[index].innerText;
            done();
        });
    });
}());
