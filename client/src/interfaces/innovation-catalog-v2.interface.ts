export interface InnovationCatalogV2 {
    innovations:    InnovationResume[];
    totalCount:     number;
    appliedFilters: AppliedFilters;
}

export interface AppliedFilters {
    phase:            number;
    readinessScale:   null;
    innovationTypeId: null;
    innovationId:     null;
    sdgId:            null;
    searchType:       string;
}

export interface InnovationResume {
    id:                                number;
    projectInnovationId:               number;
    idPhase:                           number;
    year:                              number;
    title:                             string;
    narrative:                         string;
    innovationTypeId:                  number;
    innovationNatureId:                number;
    readinessScale:                    number;
    phase:                             InnovationType;
    innovationType:                    InnovationType;
    projectId:                         number;
    isActive:                          boolean;
    sdgs:                              Sdg[];
    regions:                           Region[];
    countries:                         Country[];
}

export interface InnovationDetail {
    id:                                number;
    projectInnovationId:               number;
    idPhase:                           number;
    year:                              number;
    title:                             string;
    narrative:                         string;
    phaseResearchId:                   null;
    stageInnovationId:                 null;
    geographicScopeId:                 null;
    innovationTypeId:                  number;
    repIndRegionId:                    null;
    repIndContributionCrpId:           null;
    repIndDegreeInnovationId:          null;
    projectExpectedStudiesId:          null;
    descriptionStage:                  string;
    evidenceLink:                      string;
    genderFocusLevelId:                null;
    genderExplanation:                 string;
    youthFocusLevelId:                 null;
    youthExplanation:                  string;
    leadOrganizationId:                null;
    adaptativeResearchNarrative:       null;
    isClearLead:                       boolean;
    otherInnovationType:               null;
    externalLink:                      null;
    numberOfInnovations:               null;
    hasMilestones:                     null;
    shortTitle:                        string;
    innovationNatureId:                number;
    hasCgiarContribution:              null;
    reasonNotCgiarContribution:        null;
    beneficiariesNarrative:            string;
    intellectualPropertyInstitutionId: null;
    hasLegalRestrictions:              null;
    hasAssetPotential:                 null;
    hasFurtherDevelopment:             null;
    otherIntellectualProperty:         string;
    innovationImportance:              string;
    readinessScale:                    number;
    readinessReason:                   string;
    genderScoreId:                     number;
    climateChangeScoreId:              number;
    foodSecurityScoreId:               number;
    environmentalScoreId:              number;
    povertyJobsScoreId:                number;
    knowledgeResultsNarrative:         string;
    phase:                             InnovationType;
    innovationStage:                   null;
    geographicScope:                   null;
    innovationType:                    InnovationType;
    region:                            null;
    contributionCrp:                   null;
    degreeInnovation:                  null;
    leadOrganization:                  null;
    genderFocusLevel:                  null;
    youthFocusLevel:                   null;
    intellectualPropertyInstitution:   null;
    phaseResearch:                     null;
    projectId:                         number;
    isActive:                          boolean;
    activeSince:                       Date;
    createdBy:                         null;
    modifiedBy:                        null;
    modificationJustification:         null;
    actors:                            Actor[];
    sdgs:                              Sdg[];
    regions:                           any[];
    countries:                         Country[];
    organizations:                     any[];
    externalPartners:                  ExternalPartner[];
}

export enum Name {
    CGIAR = "CGIAR",
    AgriculturalExtensionsAgents = "Agricultural extensions agents",
    FarmersAgroPastoralistHedersFishers = "Farmers/(agro)pastoralist/heders/fishers",
    PolicyActorsPublicOrPrivate = "Policy actors (public or private)",
    Researchers = "Researchers ",
}

export enum OtherIntellectualProperty {
    Agrhymet = "AGRHYMET",
    ColumbiaUniversity = "Columbia University ",
    Empty = "",
    GreenAgroSolutionsAndCIMMYT = "Green Agro Solutions and CIMMYT",
}

export interface Actor {
    id:                        number;
    innovationId:              number;
    actorId:                   number;
    actorInfo:                 ActorInfo;
    isActive:                  boolean;
    activeSince:               Date;
    createdBy:                 number;
    modifiedBy:                null;
    modificationJustification: null;
    idPhase:                   number;
    isWomenYouth:              boolean;
    isWomenNotYouth:           null;
    isMenYouth:                boolean;
    isMenNotYouth:             null;
    isNonbinaryYouth:          null;
    isNonbinaryNotYouth:       null;
    isSexAgeNotApply:          null;
    womenYouthNumber:          number;
    womenNonYouthNumber:       null;
    menYouthNumber:            number;
    menNonYouthNumber:         null;
    other:                     null;
    total:                     null;
}

export interface ActorInfo {
    id:          number;
    name:        string;
    description: null;
    isActive:    boolean;
}

export interface Country {
    id:                  number;
    projectInnovationId: number;
    idCountry:           number;
    name:         string;
    idPhase:             number;
    countryName?:    string;
}

export interface Region {
    id:                  number;
    projectInnovationId: number;
    idRegion:           number;
    name:         string;
    idPhase:             number;
    regionName?:   string;
}

export interface ExternalPartner {
    id:                      number;
    projectInnovationId:     number;
    institutionId:           number;
    institutionName:         string;
    institutionAcronym:      string;
    institutionWebsite:      string;
    idPhase:                 number;
    innovationPartnerTypeId: number;
    partnerTypeName:         string;
    isActive:                boolean;
    activeSince:             Date;
    contactPersons:          ContactPerson[];
}

export interface ContactPerson {
    id:            number;
    partnershipId: number;
    userId:        number;
    userName:      string;
    userEmail:     string;
    isActive:      boolean;
    activeSince:   Date;
}

export interface InnovationType {
    id:   number;
    name: string;
}

export interface Sdg {
    id:           number;
    innovationId: number;
    sdgId:        number;
    sdgShortName: string;
    sdgFullName:  string;
    idPhase:      number;
    isActive:     boolean;
}
