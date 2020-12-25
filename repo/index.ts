import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

export const defaultRepoOptions: github.RepositoryArgs = {
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

export function safirRepo(
  name: string,
  args: github.RepositoryArgs = defaultRepoOptions,
  opts?: pulumi.CustomResourceOptions): github.Repository {
  const sfName = `safir-${name}`;

  return new github.Repository(
    sfName,
    {
      name: args.name ?? sfName,
      ...defaultRepoOptions,
      ...args,
    },
    opts,
  );
}
