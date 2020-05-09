export type Location = {
  city?: string
  countryCode?: string
}

export type Profile = {
  username?: string
  url?: string
  network: string
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

export type ModuleList = {
  basics: React.FC<BasicsProps>
  skills: any
  awards: any
  education: any
  interests: any
  references: any
  work: any
}

export type ModulesProps = {
  module: keyof ModuleList
  data: any
  key: string
}

export type StyledPageProps = {
  readonly theme: any
}
