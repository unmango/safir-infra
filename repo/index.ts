import * as github from '@pulumi/github';

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
    // Name should be overwritten if supplied
    return new github.Repository(name, { name, ...defaultRepoOptions, ...args });
};
