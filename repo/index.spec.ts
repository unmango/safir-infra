import { expect } from 'chai';
import * as chai from 'chai';
import chaiString from 'chai-string';
import * as pulumi from '@pulumi/pulumi';
import { expectOutput } from './helpers.spec';

chai.use(chaiString);

pulumi.runtime.setMocks({
  newResource: (type, name, inputs) => {
    return { id: inputs.name + '_id', state: inputs };
  },
  call: (token, args, provider) => args,
});

describe('repo', () => {
  let infra: typeof import('./index');

  before(async () => {
    infra = await import('./index');
  });

  describe('safir-repo', () => {

    it('should prefix names with safir', (done) => {
      const repo = infra.safirRepo('test');

      expectOutput(repo.name, done, (name) => {
        expect(name).to.equal('safir-test');
      });
    });

    it('should overwrite name with args.name', (done) => {
      const repo = infra.safirRepo('test', { name: 'test' });

      expectOutput(repo.name, done, (name) => {
        expect(name).to.equal('test');
      });
    });

    it('should not allow merge commits', (done) => {
      const repo = infra.safirRepo('test');

      expectOutput(repo.allowMergeCommit, done, (allow) => {
        expect(allow).to.be.false;
      });
    });

    it('should delete branch on merge', (done) => {
      const repo = infra.safirRepo('test');

      expectOutput(repo.deleteBranchOnMerge, done, (deleteBranch) => {
        expect(deleteBranch).to.be.true;
      });
    });

  });
});
