import type { Country, Region } from "~/interfaces/innovation-catalog-v2.interface";

// Type for structured country text result
interface CountryTextResult {
    text: string;
    additionalText?: string;
    hasMore: boolean;
}

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
    
    if (isMore) {
        const countryCount = validCountries.length > 1 ? validCountries.length - 1 : 0;
        const regionCount = validRegions.length > 1 ? validRegions.length - 1 : 0;
        const totalAdditional = countryCount + regionCount;

        if (totalAdditional > 0) {
            additionalText = `+${totalAdditional} more`;
            hasAdditional = true;
        }
    }

    const mainText = validCountries.length > 0 
        ? (validCountries[0].name || validCountries[0].countryName || 'Global')
        : validRegions.length > 0 
            ? (validRegions[0].name || validRegions[0].regionName || 'Global')
            : 'Global';

    return {
        text: mainText,
        additionalText: hasAdditional ? additionalText : undefined,
        hasMore: hasAdditional
    };
};

export { getCountryTextStructured, type CountryTextResult };