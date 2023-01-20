# Blanker

Blanker is cli for creating typical folders of yours project by blanks

1. Create your blank in directory
2. Run `blanker NewAwesomeComponent` there
3. Start writing code

## Installation
```bash 
sudo npm i blanker -g
```

## Command
```bash
Usage: blanker [options] [name] [dest]

Arguments:
  name                      name for placeholders
  dest                      destination of realized template (default: "./")

Options:
  -o, --optional            include all optional files
  -d, --dev                 enable dev mode
  -r, --required            include only required files
  -f, --find-template       find template upper if files doesn't exist in current directory
  -i, --include [files...]  include optional files by file names list
  -h, --help                display help for command
```

## Template example
Vue component example

```angular2html
_blankVueComponent
    ├── [blanker_name].scss
    ├── [blanker_name].vue
    ├── index.ts
    └── mock.ts^ - optional file
```

**[blanker_name].scss**
```scss
.[blanker_name:kebabCase] {
  
}
```
**[blanker_name].vue**
```vue
<template>
  <div class="[blanker_name:kebabCase]">
    [blanker_name]
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss" src="./[blanker_name].scss"></style>
```

**index.ts**
```vue
import [blanker_name] from './[blanker_name].vue';

export default [blanker_name];
```

## Hashes and formatters

* `[blanker_name]` - name of your entity  
* `[*:kebabCase]` - change your value to kebab-case style
* `file_name^` - optional files are marked with `^` at the end
