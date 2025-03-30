// sanity/sanity.query.ts
import { client, sanityFetch } from './lib/client'
import { PROFILE_QUERY, JOB_QUERY, TECH_QUERY, GEAR_QUERY, PROJECTS_QUERY, PROJECT_QUERY } from './lib/queries'
import type { ProfileType, JobType, TechType, GearType, ProjectType } from '@/types'

export async function getProfile() {
  return sanityFetch<ProfileType[]>({
    query: PROFILE_QUERY,
    tags: ['profile']
  })
}

export async function getJob() {
  return sanityFetch<JobType[]>({
    query: JOB_QUERY,
    tags: ['jobs']
  })
}

export async function getTech() {
  return sanityFetch<TechType[]>({
    query: TECH_QUERY,
    tags: ['tech-and-gear']
  })
}

export async function getGear() {
  return sanityFetch<GearType[]>({
    query: GEAR_QUERY,
    tags: ['tech-and-gear']
  })
}

export async function getProjects() {
  return sanityFetch<ProjectType[]>({
    query: PROJECTS_QUERY,
    tags: ['projects']
  })
}

export async function getSingleProject(slug: string) {
  return sanityFetch<ProjectType>({
    query: PROJECT_QUERY,
    params: { slug },
    tags: [`project:${slug}`, 'projects']
  })
}