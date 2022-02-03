export interface User {
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Filter {
  name: string;
  value: string;
}

const removeSigns = (value: string) => {
  const allSigns = [
    '"',  // U+0022
    '\'', // U+0027
    '‘', // U+2018
    '’', // U+2019
    '-', // hyphen
    '_', // underscore
    ' ' // space
  ]
  return allSigns.reduce((value, signChar) => {
    const re = new RegExp(signChar, 'g')
    // Remove the signs
    return value.replace(re, '');
  }, value);
}

// Get rid of all glyph that may be added to all letters.
// If will not affect what is stored in DB, it is only used for search filtering
const removeDiacritics = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "");

const normalizeString = (value: string) => removeSigns(removeDiacritics(value)).toLowerCase();

const isMatchingSearch = (member: User, criteria: string) => {
  const normalizedCriteria = normalizeString(criteria)
  return normalizeString(member.firstName+member.lastName).startsWith(normalizedCriteria) || normalizeString(member.lastName+member.firstName).startsWith(normalizedCriteria);
}

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

export const getSearchedValue = (filters: Filter[]) => filters.filter((f: Filter) => f.name === 'search').map((f: Filter) => f.value).toString();

const isMemberMatchingCriteria = (member: User, filter: Filter) => {
  const filterType: { [index: string]: any } = {
    'search': isMatchingSearch(member, filter.value),
  }
  return filterType[filter.name];
}

const isMemberMatchingCriterias = (member: User, filters: Filter[]) => {
  // Check all filters for this member and return whether it fits them all or not.
  // When no filter is set, all members match.
  return filters
    .map((filter: Filter) => isMemberMatchingCriteria(member, filter))
    .reduce((a, b) => a && b, true);
}

export const getFilteredGallery = (members: User[], filters: Filter[]) => members.filter((member: User) => isMemberMatchingCriterias(member, filters));

