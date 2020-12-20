import * as pulumi from '@pulumi/pulumi';

export function expectOutput<T>(output: pulumi.Output<T>, done: Mocha.Done, callback: (arg: T) => void): void {
  output.apply(x => {
    try {
      callback(x);
      done();
    } catch(e) {
      done(e);
    }
  });
}
