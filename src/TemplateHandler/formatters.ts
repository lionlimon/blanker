const formatters: Record<string, (value: string) => string> = {
  kebabCase(value: string) {
    return value
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },
}

export default formatters;
