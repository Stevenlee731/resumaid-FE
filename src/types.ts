//#region Modules

export type ModuleList = {
  basics: React.FC<BasicsModuleProps>
  skills: any
  awards: any
  education: React.FC<EducationModuleProps>
  interests: any
  references: any
  work: any
}

export type ModulesProps = {
  module: keyof ModuleList
  data: any
  background: string
  slot: string
}

//#endregion Modules

export type SectionProps = {
  key: string
  children: React.ReactNode
}

//#region Basics
export type Location = {
  city?: string
  countryCode?: string
}

export type Profile = {
  username?: string
  url?: string
  network?: string
}

export type BaseModuleProps = {
  background: string
  layout?: string
  slot?: string
}

export type BasicsProps = {
  name?: string
  label?: string
  image?: string
  summary?: string
  website?: string
  email?: string
  location?: Location
  profiles?: Array<Profile>
}

export interface BasicsModuleProps extends BaseModuleProps {
  name?: string
  label?: string
  image?: string
  summary?: string
  website?: string
  email?: string
  location?: Location
  profiles?: Array<Profile>
}
//#endregion Basics

//#region Education
export type EducationProps = {
  area?: string
  endDate?: string
  institution?: string
  startDate?: string
  studyType?: string
}

export interface EducationModuleProps extends BaseModuleProps {
  data: Array<EducationProps>
}

//#endregion Education

//#region Interests

export type InterestsProps = {
  name?: string
}

export interface InterestsModuleProps extends BaseModuleProps {
  data: Array<InterestsProps>
}
//#endregion Interests

//#region Awards

export type AwardsProps = {
  awarder?: string
  title?: string
}

export interface AwardsModuleProps extends BaseModuleProps {
  data: Array<AwardsProps>
}
//#endregion Awards

//#region References
export type ReferencesProps = {
  name?: string
  reference?: string
}

export interface ReferencesModuleProps extends BaseModuleProps {
  data: Array<ReferencesProps>
}

//#endregion References

//#region Skills
export type SkillsProps = {
  level: string
  name: string
  keywords: Array<{keyword: string}>
}

export interface SkillsModuleProps extends BaseModuleProps {
  data: Array<SkillsProps>
}

//#endregion Skills

//#region Work
export type WorkProps = {
  company?: string
  highlights?: string[]
  location?: string
  pinned?: boolean
  startDate?: string
  endDate?: string
  summary?: string
  website?: string
}

//#endregion Work

//#region Style Props

export type StyledPageProps = {
  readonly theme: any
}

export type StyledSectionProps = {
  readonly theme: any
}

export type StyledBaseModuleProps = {
  readonly theme: any
  background: string
}

export type SidebarSectionProps = {
  children: React.ReactChild
  module: any
}

//#endregion Style Props
