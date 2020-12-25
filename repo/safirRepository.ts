import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { safirRepo } from './index';

const defaultRepoOptions: github.RepositoryArgs = {
  allowMergeCommit: false,
  allowRebaseMerge: true,
  allowSquashMerge: true,
  autoInit: true,
  deleteBranchOnMerge: true,
  gitignoreTemplate: 'Node',
  hasIssues: true,
  hasProjects: false,
  hasWiki: false,
  licenseTemplate: 'wtfpl',
};

export class SafirRepository extends pulumi.ComponentResource {

  public readonly repo: github.Repository;
  public readonly files: github.RepositoryFile[] = [];

  constructor(
    name: string,
    args?: SafirRepositoryArgs,
    opts?: pulumi.ComponentResourceOptions) {
    super('unmango:safir:repo', name, undefined, opts);
    const sfName = `safir-${name}`;

    this.repo = new github.Repository(sfName, {
      name: sfName,
      ...defaultRepoOptions,
      ...args,
    }, { parent: this });

    this.registerOutputs();
  }

}

export interface SafirRepositoryArgs {
  description?: string;
  gitignoreTemplate?: 'VisualStudio' | 'Node';
}
