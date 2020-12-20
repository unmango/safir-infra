import * as pulumi from '@pulumi/pulumi';
import { safirRepo } from './repo';

const cli = safirRepo('cli', {
  description: 'The Safir CLI tool',
  gitignoreTemplate: 'VisualStudio',
});
