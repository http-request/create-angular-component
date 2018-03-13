# create-angular-component (cngc)
CLI tool for creating Angular2+ components.

# Install
`$ npm install -g create-angular-component`

# Usage
`$ cngc <component-name>`

where `<component-name>` in kebab-case.

# Example:
1. Open directory in console where you want to create a component.
2. Type `cngc hello-world`

Tool will create `hello-world` folder with following component files:

- hello-world.component.html 
- hello-world.component.styl 
- hello-world.component.ts 
- hello-world.module.ts
- index.ts

Each file will have default content:

`hello-world.component.html`
```html
<div class=".hello-world"></div>
```

`hello-world.component.styl` 

```stylus
.hello-world {
    
}
```

`hello-world.component.ts`
```typescript
import {Component} from '@angular/core';
    
@Component({
    selector: 'hello-world',
    templateUrl: './hello-world.component.html',
    styleUrls: ['./hello-world.component.styl']
})
export class HelloWorldComponent {
    
}
```

`hello-world.module.ts`
```typescript
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelloWorldComponent} from './hello-world.component';
    
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HelloWorldComponent
    ],
    exports: [
        HelloWorldComponent
    ],
})
export class HelloWorldModule {}
```

`index.ts`
```typescript
export * from './hello-world.component';
export * from './hello-world.module';
```

# License
[MIT](https://github.com/http-request/create-angular-component/blob/master/LICENSE) © Svyatoslav Strygin  