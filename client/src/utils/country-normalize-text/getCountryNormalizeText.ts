import type { Country as CountryV2, Region as RegionV2 } from '~/interfaces/innovation-catalog.interface';
import type { Country as CountryComplete, Region as RegionComplete } from '~/interfaces/search-complete.interface';

// Type for structured country text result
interface CountryTextResult {
  text: string;
  additionalText?: string;
  hasMore: boolean;
  additionalInfo?: string;
}

// Union types to accept both interface versions
type Country = CountryV2 | CountryComplete;
type Region = RegionV2 | RegionComplete;

// Alternative function that returns structured data
const getCountryTextStructured = (countries: Country[], regions: Region[], isMore?: boolean): CountryTextResult => {
  // Add more defensive checks
  const validCountries = Array.isArray(countries) ? countries.filter(c => c && (c.name || c.countryName)) : [];
  const validRegions = Array.isArray(regions) ? regions.filter(r => r && (r.name || r.regionName)) : [];

  if (validCountries.length === 0 && validRegions.length === 0) {
    return { text: 'Global', hasMore: false };
  }

  let additionalText = '';
  let hasAdditional = false;
  let additionalInfo = '';

  if (isMore) {
    const countryCount = validCountries.length > 1 ? validCountries.length - 1 : 0;
    const regionCount = validRegions.length > 1 ? validRegions.length - 1 : 0;
    const totalAdditional = countryCount + regionCount;

    if (totalAdditional > 0) {
      additionalText = `+${totalAdditional} more`;
      hasAdditional = true;
      additionalInfo = validCountries
        .map(c => c.name || c.countryName)
        .concat(validRegions.map(r => r.name || r.regionName))
        .slice(1)
        .join(', ');
    }
  }

  const mainText =
    validCountries.length > 0
      ? validCountries[0].name || validCountries[0].countryName || 'Global'
      : validRegions.length > 0
      ? validRegions[0].name || validRegions[0].regionName || 'Global'
      : 'Global';

  return {
    text: mainText,
    additionalText: hasAdditional ? additionalText : undefined,
    hasMore: hasAdditional,
    additionalInfo: additionalInfo
  };
};

export { getCountryTextStructured, type CountryTextResult };
