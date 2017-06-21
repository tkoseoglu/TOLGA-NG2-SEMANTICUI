# TOLGA-NG2-SEMANTIC-UI
A collection of custom angular2 components using semantic UI.

## Getting Started

```shell
npm install tolga-ng2-semantic-ui --save
```

## Semantic UI
Follow the "Getting Started" instructions on the semantic-ui website.
[Getting Started](https://semantic-ui.com/introduction/getting-started.html)
After that, you should have a "semantic" folder parallel to your "src" folder.

## angular-cli.json
Make sure your angular-cli.json file references the semantic-ui .css and .js files.
```shell
...
"styles": [
            "styles.css",
            "../semantic/dist/semantic.css",
            "../node_modules/semantic-ui-calendar/dist/calendar.css"
        ],
        "scripts": [
            "../node_modules/jquery/dist/jquery.min.js",
            "../semantic/dist/semantic.js",
            "../node_modules/semantic-ui-calendar/dist/calendar.js"            
        ],
...
```

## Import Modules
```shell
import { NgsmDatepickerComponent,NgsmTimepickerComponent, NgsmLoaderComponent, NgsmSelectComponent } from 'tolga-ng2-semantic-ui/src/app';
```

[Demo](http://ng2semanticui.azurewebsites.net)