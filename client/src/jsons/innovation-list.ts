import type { InnovationDetail } from '~/interfaces/innovation-catalog.interface';

export const innovationCatalog: InnovationDetail[] = [
  {
    id: 1,
    title: 'Innovative Water Purification System',
    narrative:
      'A cutting-edge water purification system that uses nanotechnology to remove contaminants and provide clean drinking water in remote areas.',
    year: 2023,
    phase: {
      id: 3,
      name: 'Pilot'
    },
    innovationType: {
      id: 2,
      name: 'Product'
    },
    readinessScale: 6,
    countries: [
      {
        id: 1,
        countryName: 'Kenya',
        name: 'Kenya',
        idCountry: 47,
        projectInnovationId: 1,
        idPhase: 3
      }
    ],
    regions: [{ id: 1, name: 'Sub-Saharan Africa' }],
    sdgs: [
      {
        id: 6,
        sdgShortName: 'Clean Water and Sanitation',
        sdgFullName: 'Ensure availability and sustainable management of water and sanitation for all',
        idPhase: 3,
        sdgId: 6,
        innovationId: 1,
        isActive: true
      }
    ],
    organizations: [{ id: 1, name: 'Global Water Initiative' }],
    externalPartners: [
      {
        id: 1,
        institutionName: 'Tech for Good',
        activeSince: new Date('2022-01-15'),
        contactPersons: [
          {
            id: 1,
            partnershipId: 1,
            userName: 'John Doe',
            activeSince: new Date('2022-01-15'),
            isActive: true,
            userEmail: 'john.doe@example.com',
            userId: 101
          }
        ],
        innovationPartnerTypeId: 1,
        institutionAcronym: 'TFG',
        institutionWebsite: 'https://techforgood.org',
        isActive: true,
        idPhase: 3,
        partnerTypeName: 'Technology Provider',
        institutionId: 201,
        projectInnovationId: 1
      }
    ],
    activeSince: new Date(),
    createdBy: null,
    modifiedBy: null,
    modificationJustification: null,
    phaseResearchId: null,
    stageInnovationId: null,
    geographicScopeId: null,
    repIndRegionId: null,
    repIndContributionCrpId: null,
    repIndDegreeInnovationId: null,
    projectExpectedStudiesId: null,
    genderFocusLevelId: null,
    youthFocusLevelId: null,
    leadOrganizationId: null,
    adaptativeResearchNarrative: null,
    isClearLead: false,
    otherInnovationType: null,
    externalLink: null,
    numberOfInnovations: null,
    hasMilestones: null,
    shortTitle: '',
    innovationNatureId: 17,
    hasCgiarContribution: null,
    reasonNotCgiarContribution: null,
    intellectualPropertyInstitutionId: null,
    hasLegalRestrictions: null,
    hasAssetPotential: null,
    hasFurtherDevelopment: null,
    innovationStage: null,
    geographicScope: null,
    region: null,
    contributionCrp: null,
    degreeInnovation: null,
    leadOrganization: null,
    genderFocusLevel: null,
    youthFocusLevel: null,
    intellectualPropertyInstitution: null,
    phaseResearch: null,
    knowledgeResultsNarrative: '',
    contributingOrganizations: [],
    projectInnovationId: 0,
    idPhase: 0,
    innovationTypeId: 0,
    descriptionStage: '',
    evidenceLink: '',
    genderExplanation: '',
    youthExplanation: '',
    beneficiariesNarrative: '',
    otherIntellectualProperty: '',
    innovationImportance: '',
    readinessReason: '',
    genderScoreId: 0,
    climateChangeScoreId: 0,
    foodSecurityScoreId: 0,
    environmentalScoreId: 0,
    povertyJobsScoreId: 0,
    projectId: 0,
    isActive: false,
    actors: []
  }
];
