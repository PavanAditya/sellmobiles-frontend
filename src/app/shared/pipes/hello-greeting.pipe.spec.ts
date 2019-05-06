import { HelloGreetingPipe } from './hello-greeting.pipe';

describe('HelloGreetingPipe', () => {
  it('Mobile Detail Component should be created', () => {
    const pipe = new HelloGreetingPipe();
    expect(pipe).toBeTruthy();
  });
});
describe('HelloGreetingPipe', () => {
  let pipe: HelloGreetingPipe;
  beforeEach(() => {
    pipe = new HelloGreetingPipe();
  });

  it('should return hello abcd if value is abcd', () => {
    expect(pipe.transform('abcd', 'Hello')).toEqual('Hello abcd');
  });

  it('should return only Hi if value is null', () => {
    expect(pipe.transform(null, 'Hi')).toEqual('Hi ');
  });

  it('should return Hi mary if value is mary', () => {
    expect(pipe.transform('mary', 'Hi')).toEqual('Hi mary');
  });

  it('should return only hello if value is null', () => {
    expect(pipe.transform(null, 'Hello')).toEqual('Hello ');
  });
});
