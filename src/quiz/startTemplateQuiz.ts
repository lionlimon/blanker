import { TemplateQuizParameters } from './types';
import inquirerImport from './inquirer';

const startTemplateQuiz = async (params: TemplateQuizParameters) => {
  const inquirer = await inquirerImport;
  const { templates } = params;
  const templateFileListStyled = templates.map((template) => template.name);

  const templateAnswers = await inquirer
    .prompt<{ selectedTemplate: string }>([{
      type: 'list',
      name: 'selectedTemplate',
      message: 'What template do you want to use?',
      choices: templateFileListStyled,
    }]);

  return templateAnswers.selectedTemplate;
};

export default startTemplateQuiz;
