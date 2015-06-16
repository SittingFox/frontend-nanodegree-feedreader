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
    });


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
    });

    // Checking that feeds are being loaded
    describe('Initial Entries', function() {
        // Preparing for asynchronous test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
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
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
