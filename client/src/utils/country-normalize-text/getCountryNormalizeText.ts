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

const getCountryLabel = (c: Country): string | undefined => c.name || c.countryName;

const getRegionLabel = (r: Region): string | undefined => ('name' in r ? r.name : undefined) || r.regionName;

// Alternative function that returns structured data
const getCountryTextStructured = (countries: Country[], regions: Region[], isMore?: boolean): CountryTextResult => {
  // Add more defensive checks
  const validCountries = Array.isArray(countries) ? countries.filter(c => c && getCountryLabel(c)) : [];
  const validRegions = Array.isArray(regions) ? regions.filter(r => r && getRegionLabel(r)) : [];

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
      additionalInfo = validCountries.map(getCountryLabel).concat(validRegions.map(getRegionLabel)).slice(1).join(', ');
    }
  }

  const mainText =
    validCountries.length > 0
      ? getCountryLabel(validCountries[0]) || 'Global'
      : validRegions.length > 0
        ? getRegionLabel(validRegions[0]) || 'Global'
        : 'Global';

  return {
    text: mainText,
    additionalText: hasAdditional ? additionalText : undefined,
    hasMore: hasAdditional,
    additionalInfo: additionalInfo
  };
};

export { getCountryTextStructured, type CountryTextResult };
