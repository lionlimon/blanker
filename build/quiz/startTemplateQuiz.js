"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("./inquirer"));
const startTemplateQuiz = async (params) => {
    const inquirer = await inquirer_1.default;
    const { templates } = params;
    const templateFileListStyled = templates.map((template) => template.name);
    const templateAnswers = await inquirer
        .prompt([{
            type: 'list',
            name: 'selectedTemplate',
            message: 'What template do you want to use?',
            choices: templateFileListStyled,
        }]);
    return templateAnswers.selectedTemplate;
};
exports.default = startTemplateQuiz;
//# sourceMappingURL=startTemplateQuiz.js.map