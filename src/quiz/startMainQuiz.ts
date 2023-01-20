import { FileList, QuizParameters, QuizResult } from './types';
import inquirerImport from './inquirer';

const formatFileList = (fileList: FileList) => fileList
  .map((file) => `${file.isDirectory() ? '📁' : '📄'} ${file.name.slice(0, -1)}`)
  .sort((fileName) => (fileName.includes('📁') ? -1 : 1));

const startQuiz = async (params: QuizParameters) => {
  const inquirer = await inquirerImport;

  const {
    optionalFileList,
    needName,
    needFiles,
  } = params;
  const optionalFileListStyled = needFiles ? formatFileList(optionalFileList) : [];

  const answers = await inquirer
    .prompt<QuizResult>([
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

  // Remove emoji
  const clearedOptionalFileNames = answers.files?.map((file) => file.slice(2).trim());

  return {
    entityName: answers.entityName,
    files: clearedOptionalFileNames,
  };
};

export default startQuiz;
