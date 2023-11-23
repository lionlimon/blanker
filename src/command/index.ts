import { program } from 'commander';
import { DEST_PATH } from '../constants';
import { Options } from './types';

const initCommand = () => {
  program
    .name('blanker');

  program
    .argument('[name]', 'name for placeholders')
    .argument('[dest]', 'destination of realized template', DEST_PATH)
    .option('-o, --optional', 'include all optional files')
    .option('-d, --dev', 'enable dev mode')
    .option('-r, --required', 'include only required files')
    .option('-i, --include [files...]', 'include optional files by file names list')
    .parse();

  const { args } = program;
  const options = program.opts<Options>();

  return { args, options };
};

export default initCommand;
