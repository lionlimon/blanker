"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlanksHandler = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const constants_1 = require("../../constants");
const TemplateHandler_1 = require("../TemplateHandler");
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
                const templateHandler = new TemplateHandler_1.TemplateHandler({
                    ...templateHandlerParameters,
                    template: file.name,
                });
                newName = templateHandler.replaceHashes();
                (0, fs_extra_1.renameSync)(prevPath, getActualFilePath());
                prevPath = (0, path_1.join)(pathToBlank, newName);
            }
            const fileIsOptional = file.name[file.name.length - 1] === '^';
            const optionalFileIsSelected = this.selectedOptionalFileList.includes(file.name.slice(0, -1));
            if (fileIsOptional && optionalFileIsSelected) {
                newName = getActualFileName().slice(0, -1);
                (0, fs_extra_1.renameSync)(prevPath, getActualFilePath());
            }
            else if (fileIsOptional) {
                (0, fs_extra_1.removeSync)(getActualFilePath());
                return;
            }
            if (file.isDirectory()) {
                this.modifyBlank(getActualFilePath());
            }
            else {
                const fileContent = (0, fs_extra_1.readFileSync)(getActualFilePath(), 'utf8');
                const templateHandler = new TemplateHandler_1.TemplateHandler({
                    ...templateHandlerParameters,
                    template: fileContent,
                });
                (0, fs_extra_1.writeFileSync)(getActualFilePath(), templateHandler.replaceHashes(), 'utf8');
            }
        });
    }
}
exports.BlanksHandler = BlanksHandler;
//# sourceMappingURL=BlanksHandler.js.map