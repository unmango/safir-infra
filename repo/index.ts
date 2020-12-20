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

export function safirRepo(name: string, args: github.RepositoryArgs = defaultRepoOptions): github.Repository {
  const sfName = `safir-${name}`;
  
  return new github.Repository(sfName, {
    name: args.name ?? sfName,
    ...defaultRepoOptions,
    ...args,
  });
}

export function repoFile(name: string, repo: github.Repository, fileName: string, content: string): void {
  const _ = new github.RepositoryFile(name, {
    repository: repo.name,
    file: fileName,
    content,
  });
}
