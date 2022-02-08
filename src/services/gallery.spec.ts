import { Filter, getFilteredGallery, updateFilters, User } from './gallery';

describe('search should', () => {
  const users: User[] = [
    //lowercase
    {
      lastName: 'toto',
      firstName: 'michel',
      picture: '',
    },
    // singe quote
    {
      lastName: "ot'oole",
      firstName: 'michel',
      picture: '',
    },
    // double quote
    {
      lastName: 'O"Toole',
      firstName: 'Harry',
      picture: '',
    },
    //leftSingleQuotationMark
    {
      lastName: 'Nay‘MAR',
      firstName: 'Jules',
      picture: '',
    },
    //rightSingleQuotationMark
    {
      lastName: 'Nay’MAR',
      firstName: 'Jean',
      picture: '',
    },
    //hyphen
    {
      lastName: 'Co-ver',
      firstName: 'Harry',
      picture: '',
    },
    //diacritics
    {
      lastName: 'Çàïée',
      firstName: 'MIchel',
      picture: '',
    },
    // other
    {
      lastName: 'toto',
      firstName: 'Jacques',
      picture: '',
    },
  ];
  const filter_name = 'search';

  test('match in beginning of both lastName and firstName', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'toto' }])).toHaveLength(2);
  });

  test('not match when filter value is not the beginning of value', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'arr' }])).toHaveLength(0);
  });

  test('be case insensitive', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'michel' }])).toHaveLength(3);
  });

  test('not consider diacritics', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'caieé' }])).toHaveLength(1);
  });

  test('not consider hyphens or underscores', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: '_cove-r' }])).toHaveLength(1);
  });

  test('not consider single or double quotes', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'oto"ol\'e' }])).toHaveLength(2);
  });

  test('not consider left or right quotations marks', () => {
    expect(getFilteredGallery(users, [{ name: filter_name, value: 'NAYM‘’AR' }])).toHaveLength(2);
  });
});

describe('updateFilters should', () => {
  const emptyFilters: Filter[] = [];
  const alreadyExistingFilter: Filter = { name: 'search', value: 'test' };
  const anotherFilter: Filter = { name: 'capability', value: 'whatever' };
  const newFilter: Filter = { name: 'search', value: 'updatedValue' };

  test('Add new filter when it does not exist yet', () => {
    expect(updateFilters(emptyFilters, newFilter.name, newFilter.value)).toHaveLength(1);
    expect(updateFilters(emptyFilters, newFilter.name, newFilter.value)).toContainEqual(newFilter);
  });

  test('Update existing filter when it already exists', () => {
    expect(updateFilters([alreadyExistingFilter], newFilter.name, newFilter.value)).toHaveLength(1);
    expect(updateFilters([alreadyExistingFilter], newFilter.name, newFilter.value)).toContainEqual(newFilter);
  });

  test('not change any other filter that may exist', () => {
    expect(updateFilters([anotherFilter], newFilter.name, newFilter.value)).toEqual(
      expect.arrayContaining([expect.objectContaining(newFilter), expect.objectContaining(anotherFilter)])
    );
    expect(updateFilters([anotherFilter], newFilter.name, newFilter.value)).toHaveLength(2);
  });
});
