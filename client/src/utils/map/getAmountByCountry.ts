// utils/map/getAmountByCountry.ts
import type { InnovationCatalogV2 } from '~/interfaces/innovation-catalog.interface';

export interface CountryInnovationData {
  countryId: string;
  countryName: string;
  innovationCount: number;
  fill: string;
  stroke: string;
}

export interface GreyChromaticScale {
  min: string;
  max: string;
  steps: string[];
}

/**
 * Grey chromatic scale for mapping innovation counts to colors
 * From light grey (few innovations) to dark grey (many innovations)
 */
export const GREY_CHROMATIC_SCALE: GreyChromaticScale = {
  min: '#C6DBE3', // Very light grey for 0 innovations
  max: '#F39619', // Very dark grey for highest count
  steps: [
    '#C6DBE3', // 0 innovations
    '#B5D0D0', // 1-2 innovations
    '#A4C4BC', // 3-5 innovations
    '#94BFB3', // 6-10 innovations
    '#A8C595', // 11-20 innovations
    '#BDCB77', // 21-35 innovations
    '#D2D159', // 36-50 innovations
    '#E7D73B', // 51-75 innovations
    '#FEDB7B', // 76-100 innovations
    '#F39619' // 100+ innovations
  ]
};

/**
 * Maps innovation data to country-based counts
 * @param innovationsData - The innovation catalog data
 * @returns Array of countries with their innovation counts and colors
 */
export function getAmountByCountry(innovationsData: InnovationCatalogV2 | null): CountryInnovationData[] {
  if (!innovationsData?.innovations) {
    return [];
  }

  // Create a map to count innovations by country
  const countryMap = new Map<string, { name: string; count: number }>();

  // Count innovations per country
  innovationsData.innovations.forEach(innovation => {
    if (innovation.countries && innovation.countries.length > 0) {
      innovation.countries.forEach(country => {
        const countryId = country.id.toString();
        const countryName = country.name || country.countryName || 'Unknown';

        if (countryMap.has(countryId)) {
          const existing = countryMap.get(countryId)!;
          countryMap.set(countryId, {
            name: countryName,
            count: existing.count + 1
          });
        } else {
          countryMap.set(countryId, {
            name: countryName,
            count: 1
          });
        }
      });
    }
  });

  // Convert to array and add colors
  const countryData: CountryInnovationData[] = [];

  // Find max count for scaling
  const maxCount = Math.max(...Array.from(countryMap.values()).map(c => c.count));

  countryMap.forEach((data, countryId) => {
    const fill = getGreyColorByCount(data.count, maxCount);

    countryData.push({
      countryId,
      countryName: data.name,
      innovationCount: data.count,
      fill,
      stroke: '#bababa' // Standard stroke color
    });
  });

  return countryData.sort((a, b) => b.innovationCount - a.innovationCount);
}

/**
 * Gets the appropriate grey color based on innovation count
 * @param count - Number of innovations in the country
 * @param maxCount - Maximum number of innovations across all countries
 * @returns Hex color string
 */
export function getGreyColorByCount(count: number, maxCount: number): string {
  if (count === 0) {
    return GREY_CHROMATIC_SCALE.min;
  }

  if (maxCount <= 1) {
    return GREY_CHROMATIC_SCALE.steps[1];
  }

  // Calculate percentage of max
  const percentage = count / maxCount;

  // Map to color steps
  if (percentage >= 1) return GREY_CHROMATIC_SCALE.steps[9]; // 100%+
  if (percentage >= 0.85) return GREY_CHROMATIC_SCALE.steps[8]; // 85-99%
  if (percentage >= 0.7) return GREY_CHROMATIC_SCALE.steps[7]; // 70-84%
  if (percentage >= 0.55) return GREY_CHROMATIC_SCALE.steps[6]; // 55-69%
  if (percentage >= 0.4) return GREY_CHROMATIC_SCALE.steps[5]; // 40-54%
  if (percentage >= 0.25) return GREY_CHROMATIC_SCALE.steps[4]; // 25-39%
  if (percentage >= 0.15) return GREY_CHROMATIC_SCALE.steps[3]; // 15-24%
  if (percentage >= 0.08) return GREY_CHROMATIC_SCALE.steps[2]; // 8-14%
  if (percentage >= 0.03) return GREY_CHROMATIC_SCALE.steps[1]; // 3-7%

  return GREY_CHROMATIC_SCALE.steps[0]; // 0-2%
}

/**
 * Gets innovation count for a specific country
 * @param countryId - The country ID to look for
 * @param countryData - Array of country innovation data
 * @returns Number of innovations or 0 if not found
 */
export function getCountryInnovationCount(countryId: string, countryData: CountryInnovationData[]): number {
  const country = countryData.find(c => c.countryId === countryId);
  return country?.innovationCount || 0;
}

/**
 * Gets the color for a specific country based on its innovation count
 * @param countryId - The country ID to look for
 * @param countryData - Array of country innovation data
 * @returns Hex color string or default white
 */
export function getCountryColor(countryId: string, countryData: CountryInnovationData[]): string {
  const country = countryData.find(c => c.countryId === countryId);
  return country?.fill || '#ffffff';
}
