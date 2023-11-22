export type FileList = {
  isDirectory(): boolean,
  name: string
}[];

export type TemplateQuizParameters = {
  templates: FileList
};

export type TemplateQuizResult = {
  template: string
};

export type QuizParameters = {
  optionalFileList: FileList,
  needName: boolean,
  needFiles: boolean,
};

export type QuizResult = {
  files?: string[],
  entityName?: string,
};
