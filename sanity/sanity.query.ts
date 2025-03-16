// sanity/sanity.query.ts
import { groq } from 'next-sanity';
import client from './sanity.client';

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
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
      }
    }`,
    {},
    { next: { tags: ['profile'] } }
  );
}

export async function getJob() {
  return client.fetch(
    groq`*[_type == "job"]{
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
    }`,
    {},
    { next: { tags: ['jobs'] } }
  );
}

export async function getTech() {
  return client.fetch(
    groq`*[_type == "tech"]{
      _id,
      techName,
      comment,
      platform,
      "techIcon": techIcon.asset->url,
      link,
    }`,
    {},
    { next: { tags: ['techstack'] } }
  );
}

export async function getGear() {
  return client.fetch(
    groq`*[_type == "gear"]{
      _id,
      gearName,
      comment,
      "gearImage": gearImage.asset->url,
      link,
    }`,
    {},
    { next: { tags: ['techstack'] } }
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id, 
      name,
      "slug": slug.current,
      coverImage { alt, "image": asset->url },
      medium,
      year,
    }`,
    {},
    { next: { tags: ['projects'] } }
  );
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      projectUrl,
      coverImage { alt, "image": asset->url },
      tagline,
      description,
      overview
    }`,
    { slug },
    { next: { tags: [`project:${slug}`, 'projects'] } }
  );
}