MySmus
------

A project to learn TDD with JavaScript and JsTestDriver.

How to build
------------

`ant compile`

This will create `public/mysmus.js`. Run it in your Browser via `public/index.html`.

How to run the tests
--------------------

1. ``java -jar lib/JsTestDriver-1.3.2.jar --port 42442 --browser `which firefox`,`which chromium-browser` &``
2. `java -jar lib/JsTestDriver-1.3.2.jar --tests all`

Local deployment?
-----------------

`ant deploy-local`

This will copy the `public` folder to `/var/www`.
