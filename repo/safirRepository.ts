import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { safirRepo } from './index';

export class SafirRepository extends pulumi.ComponentResource {

  public readonly repo: github.Repository;
  public readonly files: github.RepositoryFile[] = [];

  constructor(
    private name: string,
    private args?: SafirRepositoryArgs,
    private opts?: pulumi.ComponentResourceOptions) {
    super('unmango:safir:repo', name, undefined, opts);

    this.repo = safirRepo(this.name, this.args);

    this.registerOutputs();
  }

}

export interface SafirRepositoryArgs {
  description?: string;
  gitignoreTemplate?: 'VisualStudio' | 'Node';
}
