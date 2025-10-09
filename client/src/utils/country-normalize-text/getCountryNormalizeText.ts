import type { Country, Region } from "~/interfaces/innovation-catalog-v2.interface";

// Type for structured country text result
interface CountryTextResult {
    text: string;
    additionalText?: string;
    hasMore: boolean;
}

// Alternative function that returns structured data
const getCountryTextStructured = (countries: Country[], regions: Region[], isMore?: boolean): CountryTextResult => {
    if ((!countries || countries.length === 0) && (!regions || regions.length === 0)) {
        return { text: 'Unknown', hasMore: false };
    }

    let additionalText = '';
    let hasAdditional = false;
    
    if (isMore) {
        const countryCount = countries && countries.length > 0 ? countries.length-1 : 0;
        const regionCount = regions && regions.length > 0 ? regions.length-1 : 0;
        const totalAdditional = countryCount + regionCount;

        if (totalAdditional > 0) {
            additionalText = `+${totalAdditional} more`;
            hasAdditional = true;
        }
    }

    const mainText = countries && countries.length > 0 
        ? countries[0].name 
        : regions && regions.length > 0 
            ? regions[0].name 
            : 'Unknown';

    return {
        text: mainText,
        additionalText: hasAdditional ? additionalText : undefined,
        hasMore: hasAdditional
    };
};

export { getCountryTextStructured, type CountryTextResult };