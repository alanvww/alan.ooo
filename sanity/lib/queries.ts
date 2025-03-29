// sanity/lib/queries.ts
import { defineQuery } from 'next-sanity'

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"]{
  _id,
  fullName,
  headline,
  profileImage {alt, "image": asset->url},
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  skillCategories[]{
    category,
    skills
  },
  experience[]->{
    _id,
    name,
    jobTitle,
    "logo": logo.asset->url,
    url,
    location,
    description,
    startDate,
    endDate,
    projectLinks[]{
      label,
      url
    },
    projectImages[]{
      "image": asset->url,
      alt,
      caption
    }
  },
  cvCategories[]->{
    _id,
    categoryName,
    categoryDescription,
    items[]{
      title,
      date,
      endDate,
      eventName,
      location,
      description,
      links[]{
        label,
        url
      },
      images[]{
        "image": asset->url,
        alt,
        caption
      }
    }
  }
}`)

export const JOB_QUERY = defineQuery(`*[_type == "job"]{
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  location,
  description,
  startDate,
  endDate,
  projectLinks[]{
    label,
    url
  },
  projectImages[]{
    "image": asset->url,
    alt,
    caption
  }
}`)

export const TECH_QUERY = defineQuery(`*[_type == "tech"]{
  _id,
  techName,
  comment,
  platform,
  "techIcon": techIcon.asset->url,
  link,
}`)

export const GEAR_QUERY = defineQuery(`*[_type == "gear"]{
  _id,
  gearName,
  comment,
  gearImage {alt, "image": asset->url},
  link,
}`)

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"]{
  _id, 
  name,
  "slug": slug.current,
  coverImage { alt, "image": asset->url },
  medium,
  year,
}`)

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  coverImage { alt, "image": asset->url },
  tagline,
  description,
  overview
}`)