import { uuid } from './uuid';

describe('Given with uuid function', () => {
  it('should return unique value', () => {
    const value1 = uuid();
    const value2 = uuid();
    expect(value1).not.toStrictEqual(value2);
  });
});
