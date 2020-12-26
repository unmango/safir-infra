import * as pulumi from '@pulumi/pulumi';
import { SafirRepository } from './repo';

const cli = new SafirRepository('cli', {
  description: 'The Safir CLI tool',
  gitignoreTemplate: 'VisualStudio',
});
