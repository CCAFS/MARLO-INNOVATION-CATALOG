export interface SearchComplete {
  innovations: Innovation[];
  totalCount: number;
  appliedFilters: AppliedFilters;
  pagination: Pagination;
}

export interface Innovation {
  id: number;
  projectInnovationId: number;
  idPhase: number;
  year: number;
  title: string;
  narrative: string;
  phaseResearchId: any;
  stageInnovationId: any;
  geographicScopeId: any;
  repIndRegionId: any;
  repIndContributionCrpId: any;
  repIndDegreeInnovationId: any;
  projectExpectedStudiesId: any;
  descriptionStage: string;
  evidenceLink: string;
  genderFocusLevelId: any;
  genderExplanation: string;
  youthFocusLevelId: any;
  youthExplanation: string;
  leadOrganizationId: any;
  adaptativeResearchNarrative: any;
  isClearLead: boolean;
  otherInnovationType?: string;
  externalLink: any;
  numberOfInnovations: any;
  hasMilestones?: boolean;
  shortTitle: string;
  innovationNatureId: number;
  hasCgiarContribution?: boolean;
  reasonNotCgiarContribution: any;
  beneficiariesNarrative: string;
  knowledgeResultsNarrative: string;
  intellectualPropertyInstitutionId?: number;
  hasLegalRestrictions?: boolean;
  hasAssetPotential?: boolean;
  hasFurtherDevelopment?: boolean;
  otherIntellectualProperty: string;
  innovationImportance?: string;
  readinessScale?: number;
  readinessReason?: string;
  genderScoreId?: number;
  climateChangeScoreId?: number;
  foodSecurityScoreId?: number;
  environmentalScoreId?: number;
  povertyJobsScoreId?: number;
  phase: Phase;
  innovationStage: any;
  geographicScope: any;
  innovationType?: InnovationType;
  region: any;
  contributionCrp: any;
  degreeInnovation: any;
  leadOrganization: any;
  genderFocusLevel: any;
  youthFocusLevel: any;
  intellectualPropertyInstitution?: IntellectualPropertyInstitution;
  phaseResearch: any;
  projectId: number;
  isActive: boolean;
  activeSince: string;
  createdBy: any;
  modifiedBy: any;
  modificationJustification: any;
  actors: Actor[];
  sdgs: Sdg[];
  regions: Region[];
  countries: Country[];
  references: Reference[];
  organizations: any[];
  contactPersons: ContactPerson[];
  contributingOrganizations: ContributingOrganization[];
  bundles: InnovationBundle[];
}

export interface Phase {
  id: number;
  name: string;
}

export interface InnovationType {
  id: number;
  name: string;
  definition: any;
  isOldType: boolean;
  prmsIdEquivalent: any;
  prmsNameEquivalent: string;
}

export interface IntellectualPropertyInstitution {
  id: number;
  name: string;
  acronym: string;
}

export interface Actor {
  id: number;
  innovationId: number;
  actorId: number;
  actorInfo: ActorInfo;
  isActive: boolean;
  activeSince: string;
  createdBy: number;
  modifiedBy: any;
  modificationJustification: any;
  idPhase: number;
  isWomenYouth?: boolean;
  isWomenNotYouth?: boolean;
  isMenYouth?: boolean;
  isMenNotYouth?: boolean;
  isNonbinaryYouth: any;
  isNonbinaryNotYouth: any;
  isSexAgeNotApply?: boolean;
  womenYouthNumber?: number;
  womenNonYouthNumber?: number;
  menYouthNumber?: number;
  menNonYouthNumber?: number;
  other?: string;
  total?: number;
}

export interface ActorInfo {
  id: number;
  name: string;
  description: any;
  isActive: boolean;
  prmsNameEquivalent: string;
}

export interface Sdg {
  id: number;
  innovationId: number;
  sdgId: number;
  sdgShortName: string;
  sdgFullName: string;
  idPhase: number;
  isActive: boolean;
}

export interface Region {
  id: number;
  projectInnovationId: number;
  idRegion: number;
  regionName: string;
  idPhase: number;
}

export interface Country {
  id: number;
  projectInnovationId: number;
  idCountry: number;
  countryName: string;
  name?: string; // Alias for compatibility
  idPhase: number;
}

export interface Reference {
  id: number;
  reference: string;
  phaseId: number;
  link: string;
  isExternalAuthor: boolean;
  hasEvidenceByDeliverable?: boolean;
  deliverableId?: number;
  deliverableName?: string;
  typeId?: number;
  activeSince: string;
  createdBy: number;
  modifiedBy: number;
  modificationJustification: string;
}

export interface ContactPerson {
  id: number;
  projectInnovationId: number;
  institutionId: number;
  institutionName: string;
  institutionAcronym?: string;
  institutionWebsite: string;
  idPhase: number;
  innovationPartnerTypeId: number;
  partnerTypeName: string;
  isActive: boolean;
  activeSince: string;
  contactPersons: ContactPerson2[];
}

export interface ContactPerson2 {
  id: number;
  partnershipId: number;
  userId: number;
  userName: string;
  userEmail: string;
  isActive: boolean;
  activeSince: string;
}

export interface ContributingOrganization {
  id: number;
  projectInnovationId: number;
  idPhase: number;
  institutionId: number;
  institutionName: string;
  institutionAcronym?: string;
}

export interface InnovationBundle {
  id: number;
  projectInnovationId: number;
  selectedInnovationId: number;
  selectedInnovationName: string;
  selectedInnovationReadinessScale: number;
  phaseId: number;
  isActive: boolean;
  activeSince: string;
  createdBy: number;
  modifiedBy: number;
  modificationJustification: string;
}

export interface AppliedFilters {
  phase: number;
  readinessScale: any;
  innovationTypeId: any;
  innovationId: any;
  sdgId: any;
  countryIds: any;
  searchType: string;
}

export interface Pagination {
  offset: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
