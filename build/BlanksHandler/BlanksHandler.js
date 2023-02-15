"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = __importStar(require("fs-extra"));
const constants_1 = require("../constants");
const TemplateHandler_1 = __importDefault(require("../TemplateHandler"));
class BlanksHandler {
    constructor({ dest, name, selectedOptionalFiles }) {
        this.pathToBlank = dest;
        this.valueForReplace = name;
        this.selectedOptionalFileList = selectedOptionalFiles;
    }
    static getFiles(source) {
        return (0, fs_extra_1.readdirSync)(source, { withFileTypes: true });
    }
    static getOptionalFiles(source) {
        return BlanksHandler.getFiles(source)
            .filter((file) => file.name[file.name.length - 1] === constants_1.OPTIONAL_FILE_CHAR);
    }
    static getBlanks(source) {
        return BlanksHandler.getFiles(source)
            .filter((file) => (constants_1.TEMPLATE_FOLDER_PREFIX.findIndex((prefix) => file.name.startsWith(prefix)) !== -1));
    }
    modifyBlank(source) {
        const pathToBlank = source !== null && source !== void 0 ? source : this.pathToBlank;
        const templateHandlerParameters = {
            hashEdges: [
                constants_1.HASH_PREFIX,
                constants_1.HASH_POSTFIX,
            ],
            data: {
                [constants_1.ENTITY_NAME_HASH]: this.valueForReplace,
            },
        };
        BlanksHandler.getFiles(pathToBlank).forEach((file) => {
            let newName = null;
            let prevPath = (0, path_1.join)(pathToBlank, file.name);
            const getActualFileName = () => newName !== null && newName !== void 0 ? newName : file.name;
            const getActualFilePath = () => (0, path_1.join)(pathToBlank, getActualFileName());
            if (file.name.includes(constants_1.ENTITY_NAME_HASH)) {
                const templateHandler = new TemplateHandler_1.default({
                    ...templateHandlerParameters,
                    template: file.name,
                });
                newName = templateHandler.replaceHashes();
                fs_extra_1.default.renameSync(prevPath, getActualFilePath());
                prevPath = (0, path_1.join)(pathToBlank, newName);
            }
            const fileIsOptional = file.name[file.name.length - 1] === '^';
            const optionalFileIsSelected = this.selectedOptionalFileList.includes(file.name.slice(0, -1));
            if (fileIsOptional && optionalFileIsSelected) {
                newName = getActualFileName().slice(0, -1);
                fs_extra_1.default.renameSync(prevPath, getActualFilePath());
            }
            else if (fileIsOptional) {
                fs_extra_1.default.removeSync(getActualFilePath());
                return;
            }
            if (file.isDirectory()) {
                this.modifyBlank(getActualFilePath());
            }
            else {
                const fileContent = fs_extra_1.default.readFileSync(getActualFilePath(), 'utf8');
                const templateHandler = new TemplateHandler_1.default({
                    ...templateHandlerParameters,
                    template: fileContent,
                });
                fs_extra_1.default.writeFileSync(getActualFilePath(), templateHandler.replaceHashes(), 'utf8');
            }
        });
    }
}
exports.default = BlanksHandler;
//# sourceMappingURL=BlanksHandler.js.map