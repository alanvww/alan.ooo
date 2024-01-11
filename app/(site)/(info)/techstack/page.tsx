import { getTech, getGear } from '@/sanity/sanity.query';
import type { ProfileType, TechType, GearType } from '@/types';
import { PortableText } from '@portabletext/react';
import { BiEnvelope, BiFile } from 'react-icons/bi';
import { Metadata } from 'next';
import { StackList } from '../../components/techstack/StackList';

export const metadata: Metadata = {
	title: 'Stack & Gear - Alan Ren',
	description: 'All my tech stack and gear I use for development.',
};

export default async function About() {
	const tech: TechType[] = await getTech();
	const gear: GearType[] = await getGear();

	return <StackList tech={tech} gear={gear} />;
}
