import { CountryListPipe } from './country-list.pipe';

describe('CountryListPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryListPipe();
    expect(pipe).toBeTruthy();
  });
});
