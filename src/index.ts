#!/usr/bin/env node
import { join as joinPath, resolve } from 'path';
import { copySync } from 'fs-extra';
import initCommand from './command';
import { BlanksHandler } from './libs/BlanksHandler';
import { DEST_PATH, TEMPLATE_EXAMPLES_PATH } from './constants';
import { HandlerParameters } from './types';
import { startMainQuiz, startTemplateQuiz } from './quiz';

(async function initApp() {
  // Command parsing
  const { args, options } = initCommand();
  const devPath = resolve('./') + TEMPLATE_EXAMPLES_PATH;
  // Current working directory
  const cwd = !options.dev ? process.cwd() : devPath;
  const templates = BlanksHandler.getBlanks(cwd);

  if (!templates.length) throw new Error('Templates are not found');

  // Start quiz if there is more than one template
  const templateName = templates.length > 1
    ? await startTemplateQuiz({ templates })
    : templates[0].name;

  const pathToTemplate = joinPath(cwd, templateName);
  const allOptionalFiles = BlanksHandler.getOptionalFiles(pathToTemplate);

  const parameters = {
    name: args[0] ?? null,
    selectedOptionalFiles: options.include ?? [],
  } as HandlerParameters;

  if (!parameters.selectedOptionalFiles.length) {
    if (options.required) {
      parameters.selectedOptionalFiles = [];
    }

    if (options.optional) {
      parameters.selectedOptionalFiles = allOptionalFiles.map((file) => file.name.slice(0, -1));
    }
  }

  const needOptionalFiles = !options.required
    && !parameters.selectedOptionalFiles.length
    && allOptionalFiles.length > 0;

  const needMainQuiz = !parameters.name || needOptionalFiles;

  if (needMainQuiz) {
    const { entityName, files } = await startMainQuiz({
      needName: !parameters.name,
      needFiles: needOptionalFiles,
      optionalFileList: allOptionalFiles,
    });

    if (entityName) parameters.name = entityName;
    if (files) parameters.selectedOptionalFiles = files;
  }

  const dest = joinPath(cwd, args[1] ?? DEST_PATH, parameters.name);

  copySync(pathToTemplate, dest);

  const filesHandler = new BlanksHandler({
    dest,
    ...parameters,
  });

  filesHandler.modifyBlank();
}());
