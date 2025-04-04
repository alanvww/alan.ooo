import { PortableTextBlock } from 'sanity';

export type CVItemType = {
	title: string;
	date: Date;
	endDate?: Date;
	eventName: string;
	location: string;
	description: PortableTextBlock[];
	links: ProjectLinkType[];
	images: ProjectImageType[];
};

export type CVType = {
	_id: string;
	categoryName: string;
	categoryDescription: string;
	items: CVItemType[];
};

export type SkillCategoryType = {
	category: string;
	skills: string[];
};

export type ProfileType = {
	_id: string;
	fullName: string;
	headline: string;
	profileImage: {
		alt: string;
		image: string;
	};
	shortBio: string;
	email: string;
	fullBio: PortableTextBlock[];
	location: string;
	resumeURL: string;
	socialLinks: {
		github?: string;
		linkedin?: string;
		instagram?: string;
	};
	skillCategories: SkillCategoryType[];
	experience: JobType[];
	cvCategories: CVType[];
};

export type ProjectLinkType = {
	label: string;
	url: string;
};

export type ProjectImageType = {
	alt: string;
	caption: string;
	image: string;
};

export type JobType = {
	_id: string;
	name: string;
	jobTitle: string;
	logo: string;
	url: string;
	location: string;
	description: PortableTextBlock[];
	startDate: Date;
	endDate: Date;
	projectLinks: ProjectLinkType[];
	projectImages: ProjectImageType[];
};

export type ProjectType = {
	_id: string;
	name: string;
	slug: string;
	medium: string;
	year: number;
	tagline: string;
	projectUrl: string;
	coverImage: {
		alt: string;
		image: string;
	};
	description: PortableTextBlock[];
	overview: PortableTextBlock[];
};

export type TechType = {
	_id: string;
	techName: string;
	comment: string;
	platform: string[];
	techIcon: string;
	link: PortableTextBlock[];
};

export type GearType = {
	_id: string;
	gearName: string;
	comment: string;
	link: string;
	gearImage: {
		alt: string | null;
		image: string;
	};
};
