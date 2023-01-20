const getInquirer = async () => {
  const { default: inquirer } = await import('inquirer');
  return inquirer;
};

export default getInquirer();
