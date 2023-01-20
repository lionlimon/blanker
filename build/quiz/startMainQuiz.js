"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("./inquirer"));
const formatFileList = (fileList) => fileList
    .map((file) => `${file.isDirectory() ? '📁' : '📄'} ${file.name.slice(0, -1)}`)
    .sort((fileName) => (fileName.includes('📁') ? -1 : 1));
const startQuiz = async (params) => {
    var _a;
    const inquirer = await inquirer_1.default;
    const { optionalFileList, needName, needFiles, } = params;
    const optionalFileListStyled = needFiles ? formatFileList(optionalFileList) : [];
    const answers = await inquirer
        .prompt([
        ...(needName ? [{
                type: 'input',
                name: 'entityName',
                message: 'What is the name of the entity?',
            }] : []),
        ...(needFiles ? [{
                type: 'checkbox',
                name: 'files',
                message: 'What optional files do you want to include?',
                choices: optionalFileListStyled,
            }] : []),
    ]);
    const clearedOptionalFileNames = (_a = answers.files) === null || _a === void 0 ? void 0 : _a.map((file) => file.slice(2).trim());
    return {
        entityName: answers.entityName,
        files: clearedOptionalFileNames,
    };
};
exports.default = startQuiz;
//# sourceMappingURL=startMainQuiz.js.map