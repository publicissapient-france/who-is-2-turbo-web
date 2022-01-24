export interface User {
  firstName: string;
  lastName: string;
  picture: string;
  capability?: string;
}

export interface Filter {
  name: string;
  value: string;
}

const removeQuotes = (value: string) => {
  const allQuotes = [
    '"',  // U+0022
    '\'', // U+0027
    '‘', // U+2018
    '’', // U+2019
  ]
  return allQuotes.reduce((value, quoteChar) => {
    const re = new RegExp(quoteChar, 'g')
    // Remove the quote
    return value.replace(re, '');
  }, value);
}

const removeDiacritics = (value: string) => {
  // Get rid of all glyph that may be added to all letters.
  // If will not affect what is stored in DB, it is only used for search filtering
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const normalizeString = (value: string) => {
  return removeQuotes(removeDiacritics(value)).toLowerCase()
}

const isMatchingSearch = (member: User, criteria: string) => {
  const normalizedCriteria = normalizeString(criteria)
  return normalizeString(member.firstName).startsWith(normalizedCriteria) || normalizeString(member.lastName).startsWith(normalizedCriteria);
}

const isMatchingCapability = (member: User, criteria: string) => (criteria === "") || (member.capability === criteria)

export const updateFilters = (filters: Filter[], filter_name: string, value: string) => {
  let updated = false;
  let updated_filters = filters.map((filter: Filter) => {
    if (filter.name === filter_name) {
      let updated_filter = Object.assign({}, filter);
      updated_filter.value = value;
      updated = true;
      return updated_filter;
    } else {
      return filter;
    }
  });
  if (!updated) {
    updated_filters.push({name: filter_name, value: value});
  }
  return updated_filters;
}

const isMemberMatchingCriteria = (member: User, filter: Filter) => {
  switch (filter.name) {
    case 'search':
      return isMatchingSearch(member, filter.value);
      break;
    case 'capability':
      return isMatchingCapability(member, filter.value);
      break;
    default:
      console.log('Filtering on ' + JSON.stringify(filter.name) + '/' + JSON.stringify(filter.value));
      console.log('Unhandled search criteria : ' + filter.name + '/' + filter.value)
  }
}

export const isMemberMatchingCriterias = (member: User, filters: Filter[]) => {
  return filters
    .map((filter: Filter) => isMemberMatchingCriteria(member, filter))
    .reduce((a, b) => a && b, true);
}
