import { BookStore } from '../book';
const store = new BookStore();

describe('Book store model', () => {
  it('it should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
