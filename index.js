const fs = require('fs');
const path = require('path');
const upperCamelCase = require('uppercamelcase');

const printHelp = () => {
    const name = 'Create Angular Component (cngc)';
    const usage = 'Usage: cngc <component-name>';
    const hint = 'For create a new angular component please enter component name in "kebab-case", for example:';
    const example = '$ cngc hello-world';

    console.log(`\n${name}\n\n${usage}\n\n${hint}\n${example}\n`);
};

const getTemplates = (componentName) => {
    const className = upperCamelCase(componentName);

    const templateFileName = `${componentName}.component.html`;
    const templateContent = `<div class=".${componentName}"></div>\n`;

    const stylesFileName = `${componentName}.component.styl`;
    const stylesContent = `.${componentName} {\n    \n}\n`;

    const componentClassName = `${className}Component`;
    const scriptFileName = `${componentName}.component.ts`;
    const scriptContent = `import {Component} from '@angular/core';\n\n`
        + `@Component({\n`
        + `    selector: '${componentName}',\n`
        + `    templateUrl: './${templateFileName}',\n`
        + `    styleUrls: ['./${stylesFileName}']\n`
        + `})\nexport class ${componentClassName} {\n    \n}\n`;

    const moduleClassName = `${className}Module`;
    const moduleFileName = `${componentName}.module.ts`;
    const moduleContent = `import {NgModule} from '@angular/core';\n`
        + `import {CommonModule} from '@angular/common';\n`
        + `import {${componentClassName}} from './${componentName}.component';\n\n`
        + `@NgModule({\n`
        + `    imports: [\n`
        + `        CommonModule\n    ],\n`
        + `    declarations: [\n`
        + `        ${componentClassName}\n    ],\n`
        + `    exports: [\n`
        + `        ${componentClassName}\n    ]\n})\n`
        + `export class ${moduleClassName} {}\n`;


    const indexFileName = 'index.ts';
    const indexContent = `export * from './${componentName}.component';\n`
        + `export * from './${componentName}.module';\n`;

    return [
        {fileName: templateFileName, fileContent: templateContent},
        {fileName: stylesFileName, fileContent: stylesContent},
        {fileName: scriptFileName, fileContent: scriptContent},
        {fileName: moduleFileName, fileContent: moduleContent},
        {fileName: indexFileName, fileContent: indexContent}
    ];
};

const createComponent = (componentName) => {
    const componentDir = `${process.cwd()}${path.sep}${componentName}${path.sep}`;

    try {
        fs.mkdirSync(componentDir);

        const files = getTemplates(componentName);

        files.forEach((template) => {
            fs.appendFileSync(`${componentDir}${template.fileName}`, template.fileContent);
        });

        console.log(`Component '${componentName}' has been created successfully.`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = (params) => {
    if (!params.length) {
        printHelp();
    } else {
        createComponent(params[0]);
    }
};
