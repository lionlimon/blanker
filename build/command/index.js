"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const constants_1 = require("../constants");
const initCommand = () => {
    commander_1.program
        .name('blanker');
    commander_1.program
        .argument('[name]', 'name for placeholders')
        .argument('[dest]', 'destination of realized template', constants_1.DEST_PATH)
        .option('-o, --optional', 'include all optional files')
        .option('-d, --dev', 'enable dev mode')
        .option('-r, --required', 'include only required files')
        .option('-f, --find-template', 'find template upper if files doesn\'t exist in current directory')
        .option('-i, --include [files...]', 'include optional files by file names list')
        .parse();
    const { args } = commander_1.program;
    const options = commander_1.program.opts();
    return { args, options };
};
exports.default = initCommand;
//# sourceMappingURL=index.js.map