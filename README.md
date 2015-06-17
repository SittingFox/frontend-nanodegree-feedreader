Feed Reader Tester
==================

Starting with a simple web-based application that included [Jasmine](http://jasmine.github.io/), further tests beyond the initial have been filled in based on TODOs left behind by the initial developer.


How to Use?
-----------

Open up the index.html file in your browser. You will see the feed reader application, with feedback from Jasmine on the written tests passing at the very bottom.

The tests can be found within the jasmine/feedreader.js file.


Test Suites
------------

These are the different test suites that have been implemented, each one consisting of one or more individual tests.


### RSS Feeds ###

This checks that the list of feeds to use are alright. The initial test that was included, which checked that the variable was defined, was here. Two tests were added that check that the feed objects all have names and URLs.

The provided test was very helpful. The two added tests were very similar in nature and, as such, use very similar code.


### The Menu ###

This checks that the menu works. There are two tests. The first tests that the menu is hidden initially, while the second checks that the menu's appearance is toggled by the menu button correctly.

Figuring out the first test required figuring out what was triggering the menu to slide in and out. Attached to the body tag was a class, menu-hidden. It would disappear when the menu would open, something confirmed in the CSS. A check just needed to be made that the body tag started out with that class on it.

The second test required simulating clicks on the menu button. Then, it would have to make sure that the menu-hidden class on the body tag would disappear after one click and then reappear after another.


### Initial Entries ###

This checks that the feeds are properly being loaded. The single test here makes sure that there are some items being added to the page, erroring if there are none.

This makes use of loadFeed(), an asynchronous function. Jasmine has to wait for the calls for data to be finished before checking things. A done function is passed through, and Jasmine waits for the loadFeed function to call this function at the end so it knows it is all done. After that, the test checks if any entries (not 0) are loaded onto the page.


### News Feed Selection ###

This checks that different feeds can be loaded, not that just the same one is getting called each time. In the one test, two different feeds are loaded, and their content is compared to make sure that they are different.

Like the previous suite, this one makes use of loadFeed(). To compare data between two different feeds, loadFeed() has to be called twice. Calling them both one after another, passing them done() didn't seem to work. The idea that did work was to make a sort of chain calling, passing in an anonymous function that has the first loadFeed() call another instance of loadFeed() when it is done, and then the second one calls done() at the end.

Comparing the content was the next issue to figure out. It was easy enough to work in setting variables within the chaining, but figuring out what to store in them was tricky. Storing the content as it was, using $('.content'), would always make the test pass--even if the two feeds were the same. It seemed to have nothing to do with the content itself, but the fact that calling $('.content') twice made two separate instances that could never directly equal. Instead, the actual content needed to be compared, the actual plain text. Using jQuery's html() was what ended up being used.


Tools
-----

Jasmine and jQuery were used in this project.