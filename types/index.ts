import { PortableTextBlock } from 'sanity';

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
	socialLinks: string[];
	skills: string[];
};

export type JobType = {
	_id: string;
	name: string;
	jobTitle: string;
	logo: string;
	url: string;
	description: string;
	startDate: Date;
	endDate: Date;
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
