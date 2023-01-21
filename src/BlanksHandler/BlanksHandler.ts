import { join as joinPath } from 'path';
import fse, { readdirSync } from 'fs-extra';
import { FilesHandlerConstructorParams } from './types';
import {
  ENTITY_NAME_HASH,
  HASH_POSTFIX,
  HASH_PREFIX,
  OPTIONAL_FILE_CHAR,
  TEMPLATE_FOLDER_PREFIX,
} from '../constants';
import { TemplateHandlerConstructorParams } from '../TemplateHandler/types';
import TemplateHandler from '../TemplateHandler';

export default class BlanksHandler {
  /**
   * Optional files selected by the user
   */
  selectedOptionalFileList: string[];

  /**
   * The name entered by the user,
   * which will be inserted behind the placeholder
   */
  valueForReplace: string;

  /**
   * Path to copied blank
   */
  pathToBlank: string;

  constructor({ dest, name, selectedOptionalFiles }: FilesHandlerConstructorParams) {
    this.pathToBlank = dest;
    this.valueForReplace = name;
    this.selectedOptionalFileList = selectedOptionalFiles;
  }

  /**
   * Get list of files by source
   */
  static getFiles(source: string) {
    return readdirSync(source, { withFileTypes: true });
  }

  /**
   * Get list of optional files (that have char '^' at the end of name)
   */
  static getOptionalFiles(source: string) {
    return BlanksHandler.getFiles(source)
      .filter((file) => file.name[file.name.length - 1] === OPTIONAL_FILE_CHAR);
  }

  /**
   * Find blanks in source by prefix
   */
  static getBlanks(source: string) {
    return BlanksHandler.getFiles(source)
      .filter((file) => (
        TEMPLATE_FOLDER_PREFIX.findIndex((prefix) => file.name.startsWith(prefix)) !== -1
      ));
  }

  /**
   * Recursive files processing in blanks
   */
  modifyBlank(source?: string) {
    const pathToBlank = source ?? this.pathToBlank;

    const templateHandlerParameters: Omit<TemplateHandlerConstructorParams, 'template'> = {
      hashEdges: [
        HASH_PREFIX,
        HASH_POSTFIX,
      ],

      data: {
        [ENTITY_NAME_HASH]: this.valueForReplace,
      },
    };

    BlanksHandler.getFiles(pathToBlank).forEach((file) => {
      let newName: string | null = null;
      const oldPath = joinPath(pathToBlank, file.name);
      const getActualFileName = () => newName ?? file.name;
      const getActualFilePath = () => joinPath(pathToBlank, getActualFileName());

      if (file.name.includes(ENTITY_NAME_HASH)) {
        const templateHandler = new TemplateHandler({
          ...templateHandlerParameters,
          template: file.name,
        });

        newName = templateHandler.replaceHashes();
        fse.renameSync(oldPath, getActualFilePath());
      }

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
