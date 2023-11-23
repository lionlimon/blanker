export type TemplateHandlerConstructorParams = {
  template: string
  data: Record<string, string>
  hashEdges: [string, string],
  formatters?: Record<string, (template: string) => string>
};
