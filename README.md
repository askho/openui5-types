# ui5ts

A ridiculously simple adapter to develop SAPUI5 and OpenUI5 applications using TypeScript and ES2015 modules/classes.


## How to use

Check this Master-Detail example app https://github.com/lmcarreiro/ui5-typescript-example that is already working with ui5+typescript.

### 1) Install the package

```
npm install ui5ts --save
```

### 2) Add a reference to the "library"

Put a reference to the `ui5ts.js` script in your `index.html` file using a script tag `<script src="node_modules/ui5ts/ui5ts.js" type="text/javascript"></script>` between the `sap-ui-core.js` script tag and the `sap.ui.getCore().attachInit()` call:

```diff
...
<!-- Bootstrapping UI5 -->
<script id="sap-ui-bootstrap" src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js" ... ></script>

+ <!-- Convert typescript generated modules/classes into ui5 modules/classes -->
+ <script type="text/javascript" src="node_modules/ui5ts/ui5ts.js"></script>

<script>
    sap.ui.getCore().attachInit(function () { ... });
</script>
...
```

### 3) Change your `<class-name>.js` to a `<class-name>.ts`.

#### UI5 JavaScript way:
```javascript
sap.ui.define([
    "sap/ui/core/UIComponent",
    "typescript/example/ui5app/model/models"
], function (UIComponent, models) {
    "use strict";
    
    return UIComponent.extend("typescript.example.ui5app.Component", {
        metadata: {
            manifest: "json"
        },
        
        init: function () {
            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            // call the base component's init function and create the App view
            UIComponent.prototype.init.call(this);
            // create the views based on the url/hash
            this.getRouter().initialize();
        }
    });
});
```

#### ES2015 TypeScript way:
```typescript
import UIComponent  from "sap/ui/core/UIComponent";
import models       from "typescript/example/ui5app/model/models";

namespace typescript.example.ui5app
{
    @UI5("typescript.example.ui5app.Component")
    export class Component extends UIComponent
    {
        public static metadata: any = {
            manifest : "json"
        };

        public init(): void {
            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            // call the base component's init function and create the App view
            super.init();
            // create the views based on the url/hash
            this.getRouter().initialize();
        }
    }
}

export default typescript.example.ui5app.Component;
```

 - Don't forget to decorate your class with `@UI5("your.full.namespace.ClassName")`, this decorator parameter will be passed to `BaseClass.extend("your.full.namespace.ClassName", { ... });` call at runtime.
 - You need to export your class as default export at the end of the file: `export default your.full.namespace.ClassName;`
 - If your class has the ui5 metadata object, doesn't forget to declare it as `static`
 - The TypeScript module generation option (key `compilerOptions -> module` in `tsconfig.json`) must be set to `"amd"`
 - The paths in the `import` statements must be the same as it would be if you were using `sap.ui.define()` function. The TypeScript compiler will generate an AMD module with a `define()` call with these paths, and the `define()` function that **ui5ts** overrides will call the real `sap.ui.define()` function. This is the way that **ui5ts** works.
 - If `your/app/namespace/is/too/big`, you don't need to have all this levels of directories in your physical project structure, you can create a virtual mapping using the `tsconfig.json` configuration option `paths` (see it in the common problems bellow).

### 4) Resolving common typescript errors and module resolution problems

**Problem:** Doesn't find the @UI5 decorator:
```typescript
...
// error TS2304: Cannot find name 'UI5'.
@UI5("your.full.namespace.ClassName")
export class Component extends UIComponent {
...
```

**Solution:** Make sure you have the ui5ts.d.ts referenced in your `tsconfig.json`
```diff
...
"files": [
    ...,
+   "node_modules/ui5ts/ui5ts.d.ts"
],
...
```

**Problem:** Doesn't find your own `*.ts` class:
```typescript
...
// error TS2307: Cannot find module 'your/app/namespace/folder/ClassName'.
import ClassName from "your/app/namespace/folder/ClassName";
...
```

**Solution:** Make sure you have the path of your namespace root in the `tsconfig.json` and if it match with your application startup in the `index.html`
```diff
...
"compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
        ...
+       "your/app/namespace/*": [ "./src/*" ]
    }
...
```
```diff
...
sap.ui.getCore().attachInit(function () {
    sap.ui.require(["sap/m/Shell", "sap/ui/core/ComponentContainer"], function (Shell, ComponentContainer) {
        new Shell({
            app: new ComponentContainer({
                height : "100%",
+               name : "your.app.namespace"
            })
        }).placeAt("content");
    });
});
...
```

**Problem:** Doesn't find your own `*.js` class:
```typescript
...
// error TS2307: Cannot find module 'your/app/namespace/folder/ClassName'.
import ClassName from "your/app/namespace/folder/ClassName";
...
```

**Solution:** Create a corresponding `*.d.ts` of your `*.js` class or forget about it. You can live with this error and the app will still work. Even if you allow the TypeScript compiler to accept `*.js` modules, it will not recognize it as a AMD module, since you declare it using `sap.ui.define()` instead of `define()`.


**Problem:** Doesn't find a class in sap.* namespace:
```typescript
...
// error TS2307: Cannot find module 'sap/ui/core/UIComponent'.
import UIComponent from "sap/ui/core/UIComponent";
...
```

**Solution:** The solution in this case are still ugly, but I didn't have time to make it better. Using the npm @types/openui5 package to get the definition files of OpenUI5, for each class in the `sap.*` namespace that I need to import, I need to create a `*.d.ts` file in a corresponding `sap/*` folder that exports the @types/openui5 declaration of this class as default export.

Example: to import `"sap/ui/core/UIComponent"` I need to create a `mySapExports/sap/ui/core/UIComponent.d.ts` with the following content:
```typescript
export default sap.ui.core.UIComponent;
```

With that done, you still need to map the path to your `mySapExports` folder in yout `tsconfig.json` file, make sure you did it:

```diff
...
"compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
        ...
+       "sap/*": [ "./mySapExports/sap/*" ]
    }
...
```

I'll try to find another solution or to create all the `*.d.ts` export files in the correct structure with the corresponding default exports and put inside **ui5ts** package in a future version. Pull Requests welcome here.