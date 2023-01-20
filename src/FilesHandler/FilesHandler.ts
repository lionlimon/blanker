import { join as joinPath } from 'path';
import fse, { readdirSync } from 'fs-extra';
import { FileList, FilesHandlerConstructorParams } from './types';
import {
  ENTITY_NAME_HASH,
  HASH_POSTFIX,
  HASH_PREFIX,
  OPTIONAL_FILE_CHAR,
  TEMPLATE_FOLDER_PREFIX,
} from '../constants';
import { TemplateHandlerConstructorParams } from '../TemplateHandler/types';
import TemplateHandler from '../TemplateHandler';

export default class FilesHandler {
  optionalFileList: FileList;

  selectedOptionalFileList: string[] | null;

  valueForReplace: string;

  pathToTemplate: string;

  constructor({ dest, name, selectedOptionalFiles }: FilesHandlerConstructorParams) {
    this.pathToTemplate = dest;
    this.valueForReplace = name;
    this.optionalFileList = FilesHandler.getOptionalFiles(this.pathToTemplate);
    this.selectedOptionalFileList = selectedOptionalFiles;
  }

  static getFiles(source: string) {
    return readdirSync(source, { withFileTypes: true });
  }

  static getOptionalFiles(source: string) {
    return FilesHandler.getFiles(source)
      .filter((file) => file.name[file.name.length - 1] === OPTIONAL_FILE_CHAR);
  }

  static getTemplates(source: string) {
    return FilesHandler.getFiles(source)
      .filter((file) => (
        TEMPLATE_FOLDER_PREFIX.findIndex((prefix) => file.name.startsWith(prefix)) !== -1
      ));
  }

  modifyBlank(source?: string) {
    const pathToTemplate = source ?? this.pathToTemplate;

    const templateHandlerParameters: Omit<TemplateHandlerConstructorParams, 'template'> = {
      hashEdges: [
        HASH_PREFIX,
        HASH_POSTFIX,
      ],

      data: {
        [ENTITY_NAME_HASH]: this.valueForReplace,
      },
    };

    FilesHandler.getFiles(pathToTemplate).forEach((file) => {
      let newName: string | null = null;
      const oldPath = joinPath(pathToTemplate, file.name);
      const getActualFileName = () => newName ?? file.name;
      const getActualFilePath = () => joinPath(pathToTemplate, getActualFileName());

      if (file.name.includes(ENTITY_NAME_HASH)) {
        const templateHandler = new TemplateHandler({
          ...templateHandlerParameters,
          template: file.name,
        });

        newName = templateHandler.replaceHashes();
        fse.renameSync(oldPath, getActualFilePath());
      }

      if (this.selectedOptionalFileList) {
        const fileIsOptional = file.name[file.name.length - 1] === '^';
        const optionalFileIsSelected = this.selectedOptionalFileList.includes(
          file.name.slice(0, -1),
        );

        if (
          fileIsOptional && optionalFileIsSelected
        ) {
          newName = getActualFileName().slice(0, -1);
          fse.renameSync(oldPath, getActualFilePath());
        } else if (fileIsOptional) {
          fse.removeSync(getActualFilePath());

          return;
        }
      }

      if (file.isDirectory()) {
        this.modifyBlank(getActualFilePath());
      } else {
        const fileContent = fse.readFileSync(getActualFilePath(), 'utf8');

        const templateHandler = new TemplateHandler({
          ...templateHandlerParameters,
          template: fileContent,
        });

        fse.writeFileSync(getActualFilePath(), templateHandler.replaceHashes(), 'utf8');
      }
    });
  }
}
