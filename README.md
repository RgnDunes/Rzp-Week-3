## Webpack

Webpack is a module builder. It takes your “js”, “sass” and other dependencies files and converts them to plain “js”, “css”, “jpg” and “png” files which the browser can understand. It should be noted that webpack doesn’t run during your page load, but it runs during development.

## Babel

Babel is a JavaScript compiler that converts edge JavaScript (ES6) into plain old ES5 JavaScript that can run in any browser (even the old ones). In the React world it is used to transform the JSX code into vanilla JavaScript. The Babel website lists what you can do with Babel:

- Transform syntax
- Polyfill features that are missing in your target environment
- Source code transformations (codemods)

A simple example of what Babel does for arrow function.

```
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
    return n + 1;
});
```

[Blog used](https://www.innominds.com/blog/create-a-react-app-without-create-react-app)
