import { MaxPriceFilterPipe } from './max-price-filter.pipe';

describe('MaxPriceFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxPriceFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
