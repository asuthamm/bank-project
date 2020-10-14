# HTML Templates and Routes in a Web App

<!-- ![video](video-url) -->

## [Pre-lecture quiz](.github/pre-lecture-quiz.md)

### Introduction

Since the advent of JavaScript in browsers, websites are becoming more interactive and complex than ever. Web technologies are now commonly used to create fully functional applications that runs directly into a browser that we call [web applications](https://en.wikipedia.org/wiki/Web_application). As Web apps are highly interactive, users do not want to wait for a full page reload every time an action is performed. That's why JavaScript is used to update the HTML directly using the DOM, to provide a smoother user experience.

In this lesson, we're going to lay out the foundations to create bank web app, using HTML templates to create multiple screens that can be displayed and updated without having to reload the entire HTML page.

### Prerequisite

You need a local web server to test the web app we'll build in this lesson. If don't have one, you can install [Node.js](https://nodejs.org) and use the command `npx lite-server` from your project folder. It will create a local web server and open your app in a browser.

### Preparation

On your computer, create a folder named `bank` with a file named `index.html` inside it. We'll start from this HTML [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank App</title>
  </head>
  <body>
    <!-- This is where you'll work on -->
  </body>
</html>
```

---

## HTML templates

If you want to create multiples screens for a web page, one solution would be to create one HTML file for every screen you want to display. However, this solution comes with some inconvenients:

- You have to reload the entire HTML when switching screen, which can be slow.
- It's difficult to share data between the different screens.

Another approach is have only one HTML file, and define multiple [HTML templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) using the `<template>` element. A template is a reusable HTML block that is not displayed by the browser, and needs to be instanciated at runtime using JavaScript.

### Task:

We'll create a bank app with two screens: the login page and the dashboard. First, let's add in the HTML body a placeholder element that we'll use to instanciate the different screens of our app:

```html
<div id="app">Loading...</div>
```

We're giving it an `id` to make it easier to locate it with JavaScript later.

> Tip: since the content of this element will be replaced, we can put in a loading message or indicator that will be shown while the app is loading.

Next, let's add below the HTML template for the login page. For now we'll only put in there a title and a section containing a button that we'll use to perform the navigation.

```html
<template id="login">
  <h1>Bank App</h1>
  <section>
    <button>Login</button>
  </section>
</template>
```

Then we'll add another HTML template for the dashboard page. This page will contain different sections:
- A header with a title and a logout button
- The current balance of the bank account
- A list of transactions, displayed in a table

```html
<template id="dashboard">
  <header>
    <h1>Bank App</h1>
    <button>Logout</button>
  </header>
  <section>
    Balance: 100$
  </section>
  <section>
    <h2>Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Object</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </section>
</template>
```

> Tip: when creating HTML templates, if you want to see what it will look like, you can comment out the `<template>` and `</template>` lines by enclosing them with `<!-- -->`.

✅ Why do you think we use `id` attributes on the templates? Could we use something else like classes?

## Displaying templates with JavaScript

If you try your current HTML file in a browser, you'll see that it get stuck displaying `Loading...`. That's because we need to add some JavaScript code to instantiate and display the HTML templates.

Instanciating a template is usually done in 3 steps:

1. Retrieve the template element in the DOM, for example using [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).
2. Clone the template element, using [`cloneNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode).
3. Attach it to the DOM under a visible element, for example using [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).

✅ Why do we need to clone the template before attaching it to the DOM? What do you think would happen if we skipped this step?

### Task

Create a new file named `app.js` in your project folder and import that file in the `<head>` section of your HTML:

```html
<script src="app.js" defer></script>
```

Now in that `app.js` file, we'll create a new function `updateRoute`:

```js
function updateRoute(templateId) {
  const template = document.getElementById(templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view);
}
```

What we do here is exactly the 3 steps described above to instanciate the template with the id `templateId` and put its cloned content within our app placeholder. We need to use `cloneNode(true)` to copy the entire subtree of the template.

Now call this function with one of the template and look at the result.

```js
updateRoute('login');
```

✅ What's the purpose of the line `app.innerHTML = '';`? What happens without it?

## Creating routes


## Handling the browser's back and forward buttons





🚀 Challenge: Add a challenge for students to work on collaboratively in class to enhance the project

Optional: add a screenshot of the completed lesson's UI if appropriate

## [Post-lecture quiz](.github/post-lecture-quiz.md)

## Review & Self Study

**Assignment**: [Style your bank app](assignment.md)
