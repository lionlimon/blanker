#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const command_1 = __importDefault(require("./command"));
const BlanksHandler_1 = __importDefault(require("./BlanksHandler"));
const constants_1 = require("./constants");
const quiz_1 = require("./quiz");
(async function initApp() {
    var _a, _b, _c;
    const { args, options } = (0, command_1.default)();
    const devPath = (0, path_1.resolve)('./') + constants_1.TEMPLATE_EXAMPLES_PATH;
    const cwd = !options.dev ? process.cwd() : devPath;
    const templates = BlanksHandler_1.default.getBlanks(cwd);
    if (!templates.length)
        throw new Error('Templates are not found');
    const templateName = templates.length > 1
        ? await (0, quiz_1.startTemplateQuiz)({ templates })
        : templates[0].name;
    const pathToTemplate = (0, path_1.join)(cwd, templateName);
    const allOptionalFiles = BlanksHandler_1.default.getOptionalFiles(pathToTemplate);
    const parameters = {
        name: (_a = args[0]) !== null && _a !== void 0 ? _a : null,
        selectedOptionalFiles: (_b = options.include) !== null && _b !== void 0 ? _b : [],
    };
    if (!parameters.selectedOptionalFiles.length) {
        if (options.required) {
            parameters.selectedOptionalFiles = [];
        }
        if (options.optional) {
            parameters.selectedOptionalFiles = allOptionalFiles.map((file) => file.name.slice(0, -1));
        }
    }
    const needOptionalFiles = !parameters.selectedOptionalFiles.length && allOptionalFiles.length > 0;
    const needMainQuiz = !parameters.name || needOptionalFiles;
    if (needMainQuiz) {
        const { entityName, files } = await (0, quiz_1.startMainQuiz)({
            needName: !parameters.name,
            needFiles: needOptionalFiles,
            optionalFileList: allOptionalFiles,
        });
        if (entityName)
            parameters.name = entityName;
        if (files)
            parameters.selectedOptionalFiles = files;
    }
    const dest = (0, path_1.join)(cwd, (_c = args[1]) !== null && _c !== void 0 ? _c : constants_1.DEST_PATH, parameters.name);
    (0, fs_extra_1.copySync)(pathToTemplate, dest);
    const filesHandler = new BlanksHandler_1.default({
        dest,
        ...parameters,
    });
    filesHandler.modifyBlank();
}());
//# sourceMappingURL=index.js.map