import * as fs from 'fs';
import * as fsasync from 'fs/promises';
import * as path from 'path';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

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

    if (args?.files) {
      this.files = args.files.map(x => {
        const { file, dest } = x;

        if (!fs.existsSync(file)) {
          throw new Error(`Invalid file ${file}`);
        }

        const content = pulumi.output(fsasync.readFile(file)).apply(x => x.toString());

        const fileName = path.basename(file);
        return new github.RepositoryFile(fileName, {
          repository: this.repo.name,
          file: dest.endsWith(fileName) ? dest : path.join(dest, fileName),
          content,
        }, { parent: this });
      });
    }

    this.registerOutputs();
  }

}

export interface SafirRepositoryArgs {
  description?: string;
  gitignoreTemplate?: 'VisualStudio' | 'Node';
  files?: { file: string, dest: string }[];
}
