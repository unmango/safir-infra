import * as github from '@pulumi/github';
import * as pulumi from "@pulumi/pulumi";

const defaultRepoOptions: github.RepositoryArgs = {
    allowMergeCommit: false,
    allowRebaseMerge: true,
    allowSquashMerge: true,
    autoInit: true,
    deleteBranchOnMerge: true,
    gitignoreTemplate: 'wtfpl',
    hasIssues: true,
    hasProjects: false,
    hasWiki: false,
    licenseTemplate: 'wtfpl',
};

function safirRepo(name: string, args: github.RepositoryArgs = defaultRepoOptions): github.Repository {
    // Name should be overwritten if supplied
    return new github.Repository(name, { name, ...defaultRepoOptions, ...args });
};
