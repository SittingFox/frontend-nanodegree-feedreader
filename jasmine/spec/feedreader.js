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
    "use strict";

    // Checking the list of feeds in allFeeds
    describe('RSS Feeds', function() {
        /* Make sure that the allFeeds variable has been defined and
         * that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures that each feed in allFeeds has a URL defined and
         * that the URL is not empty.
         */
        it('have defined URLs', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Ensures that each feed in allFeeds has a name defined and
         * that the name is not empty.
         */
        it('have defined names', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    }); // end of RSS Feeds suite


    // Checking the functionality of the menu
    describe('The menu', function() {
        /* Checks if menu is hidden by looking at body's list of
         * classes for the class responsible for hiding it.
         */
        var isMenuHidden = function() {
            return $('body').hasClass('menu-hidden');
        };

        // Ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect( isMenuHidden() ).toBe(true);
        });

         /* Ensures the menu changes visibility when the menu icon is
          * clicked.
          */
        it('changes visibility on icon click', function() {
            var menuButton = $('.menu-icon-link');

            // Should display menu after first click
            menuButton.click();
            expect( isMenuHidden() ).toBe(false);

            // Should hide menu after second click
            menuButton.click();
            expect( isMenuHidden() ).toBe(true);
        });
    }); // end of the menu suite

    // Checking that feeds are being loaded
    describe('Initial Entries', function() {
        // Preparing for asynchronous test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Ensures that when the loadFeed function is called and
         * completes its work, there is at least a single .entry
         * element within the .feed container.
         */
        it('should exist', function(done) {
            var container = $('.feed');
            var entries = container.find('.entry');

            expect(entries.length).not.toBe(0);
            done();
        });
    }); // end of Initial Entries suite

    // Checking that content changes on new feed load
    describe('New Feed Selection', function() {
        // Stores the content of both feed loads
        var content1, content2;

        /* Two separate calls are made to loadFeed, each using a
         * different feed id. The first call to loadFeed calls the
         * second one. When the second one is finished, it says the
         * asynchronous loading is all done. Different IDs should make
         * for different content to compare.
         */
        beforeEach(function(done) {
            // First call to loadFeed, using ID 1
            loadFeed(1, function() {
                content1 = $('.feed').html();
                // Second call to loadFeed, using ID 2
                loadFeed(2, function() {
                    content2 = $('.feed').html();
                    done();
                });
            });
        });

        /* Ensures that when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */
        it('changes content', function(done) {
            expect(content1).not.toBe(content2);
            done();
        });
    }); // end of New Feed Selection suite

}());
