import * as pulumi from '@pulumi/pulumi';
import { SafirRepository } from './repo';

const cli = new SafirRepository('cli', {
  description: 'The Safir CLI tool',
  gitignoreTemplate: 'VisualStudio',
});

const manager = new SafirRepository('manager', {
  description: 'Safir manager service',
  gitignoreTemplate: 'VisualStudio',
});

const agent = new SafirRepository('agent', {
  description: 'Safir agent service',
  gitignoreTemplate: 'VisualStudio',
  files: [{
    file: './repo/dotnet/global.json',
    dest: './',
  }, {
    file: './repo/dotnet/NuGet.Config',
    dest: './',
  }, {
    file: './repo/dotnet/.editorconfig',
    dest: './',
  }],
});

const common = new SafirRepository('common', {
  description: 'Safir common packages',
  gitignoreTemplate: 'VisualStudio',
  files: [{
    file: './repo/dotnet/global.json',
    dest: './',
  }, {
    file: './repo/dotnet/NuGet.Config',
    dest: './',
  }, {
    file: './repo/dotnet/.editorconfig',
    dest: './',
  }, {
    file: './repo/dotnet/.github/dependabot.yml',
    dest: './.github/',
  }, {
    file: './repo/dotnet/.github/workflows/package_publish.yml',
    dest: './.github/',
  }, {
    file: './repo/dotnet/.github/workflows/pull_request.yml',
    dest: './.github/',
  }],
});

const ui = new SafirRepository('ui', {
  description: 'Safir frontend',
  gitignoreTemplate: 'Node',
});
