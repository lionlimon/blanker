# Blanker

Blanker is CLI for creating typical folders of yours project by blanks

1. Create your blank in directory
2. Run `blanker NewAwesomeComponent` there
3. Start writing code

## Installation
```bash 
sudo npm i blanker -g
```

## Command
```
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

## Template syntax

* `[blanker_name]` - name of your entity
* `[<placeholder_name>:<formatter_name>]` - use forrmating for placeholder
* `file_name^` - optional files are marked with `^` at the end


## Formatters 
* `[<placeholder_name>:kebabCase]` - change your value to **kebab-case** style
* `[<placeholder_name>:camelCase]` - change your value to **camelCase** style
* `[<placeholder_name>:pascalCase]` - change your value to **PascalCase** style

**Example:**  
Command:
`blanker SomeName`

Template `[blanker_name].scss`:
```scss
.[blanker_name:kebabCase] {
  /* ... styles ...*/
}
```

Result `SomeName.scss`: 
```scss
.some-name {
  /* ... styles ...*/
}
```
