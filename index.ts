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
});
