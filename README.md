# Frontend Boilerplate with React, Redux & TypeScript

A bare minimum react-redux-webpack-typescript boilerplate with TodoMVC example.

Note that this project does not include **Server-Side Rendering**,  **Testing Frameworks** and other stuffs that makes the package unnecessarily complicated.

Ideal for creating React apps from the scratch.

See also: [react-mobx-typescript-boilerplate](https://github.com/rokoroku/react-mobx-typescript-boilerplate)

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 2.4
- [x] [React](https://facebook.github.io/react/) 15.6
- [x] [Redux](https://github.com/reactjs/redux) 3.7
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.1
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 3
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [CSS next](https://github.com/MoOx/postcss-cssnext)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [ExtractText Plugin](https://github.com/webpack/extract-text-webpack-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)


## Setup

```
$ npm install
```

### Firebase Tools
```
npm install -g firebase-tools
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

## Build and Deploy to Firebase Hosting Services

```
$ npm run deploy
```


# Test Wait Times

Load the page with the default clinic.
```
http://localhost:3000/
```

Load the page with a specific clinic.
```
http://localhost:3000/?providerID=<value goes here>
```

Force an update using the Firebase console.
```
https://console.firebase.google.com/project/osiris-26b00/database/data/providers/wa211134271/waitTime
```

# Deploy firebase function(s)

```
firebase deploy --only functions
```


# Embeddable Widget

The code below describes how to embed widgets on host sites.  These widgets update in realtime and are hosted in iFrames.
If you want to change the provider then you can pass a providerID on the query string using the provider key from Firebase.

```
https://osiris-26b00.firebaseapp.com/dentalWidget/?providerID=wa21156026a
```

## Renton Public Health - Dental Use Case
Paste the html below into the site under the "Interpreter Services" section.

http://www.kingcounty.gov/depts/health/locations/renton.aspx

```
<div class="row addon-row addon-row-attached">
  <div class="col-sm-6">
    <div>
      <span></span>
      <span style="font-size: 1.4em; font-weight: 700;">Current Availability</span>
    </div>
    <br>
    <iframe src="https://osiris-26b00.firebaseapp.com/dentalWidget/" allowfullscreen="" frameborder="0"
      style="width: 100%; height: 230px;"></iframe>
    </div>
</div>
```

## Sound Mental Health - Urgent Care Use Case
Paste the html below wherever you want.

http://www.kingcounty.gov/depts/health/locations/renton.aspx

```
<div>
  <div>
    <span class="fa fa-spin fa-circle-o-notch fa-2x fa-color-default pull-left"></span>
    <span style="font-size: 1.4em; font-weight: 700;line-height:42px">Current Availability</span>
  </div>
  <br>
  <iframe src="https://osiris-26b00.firebaseapp.com/waitTimeWidget/" allowfullscreen="" frameborder="0"
    style="width: 100%; height: 82px;"></iframe>
</div>
```


# License

MIT
