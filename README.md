# css class replacer for bootstrap upgrade from v3 to v4

Small CSS-class-replacer to change bootstrap v3 markup to v4

This project is created to help me convert the CSS-class-attributes for a project. I can not parse the DOM with a XML-parser, because the templates are not valid.

In the **upgrade-rules.txt** you can see what kind of markup will be replaced. Lines that starts with an **#** will
be ignored, to reduce time consuming complexity. :)

**!! Unstable and maybe not working at the moment when you catch this project !!**

in the *fixture-small.html* is a some small piece of sample html.

To check the test you can use this command

~~~
npm run replaceSmall
~~~

have fun
