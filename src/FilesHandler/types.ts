import { readdirSync } from 'fs-extra';

export type FilesHandlerConstructorParams = {
  dest: string
  name: string,
  selectedOptionalFiles: string[] | null
}

export type FileList = ReturnType<typeof readdirSync>
