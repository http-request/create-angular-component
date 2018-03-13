const fs = require('fs');
const path = require('path');
const upperCamelCase = require('uppercamelcase');

const printHelp = () => {
    const name = 'Create Angular Component (cngc)';
    const usage = 'Usage: cngc <component-name>';
    const hint = 'For create a new angular component please enter component name in "kebab-case", for example:';
    const example = '$ cngc hello-world-component';

    console.log(`${name}\n\n${usage}\n\n${hint}\n${example}\n`);
};

const createComponent = (componentName) => {
    const componentDir = `${process.cwd()}${path.sep}${componentName}${path.sep}`;

    try {
        fs.mkdirSync(componentDir);

        const className = upperCamelCase(componentName);

        const templateFileName = `${componentName}.component.html`;
        const templateContent = `<div class=".${componentName}"></div>`;

        const stylesFileName = `${componentName}.component.styl`;
        const stylesContent = `.${componentName} {\n    \n}`;

        const scriptFileName = `${componentName}.component.ts`;
        const scriptContent = `import {Component} from '@angular/core';\n\n`
            + `@Component({\n`
            + `    selector: '${componentName}',\n`
            + `    templateUrl: './${templateFileName}',\n`
            + `    styleUrls: ['./${stylesFileName}']\n`
            + `})\nexport class ${className} {\n    \n}`;

        fs.appendFileSync(`${componentDir}${templateFileName}`, templateContent);
        fs.appendFileSync(`${componentDir}${stylesFileName}`, stylesContent);
        fs.appendFileSync(`${componentDir}${scriptFileName}`, scriptContent);

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
