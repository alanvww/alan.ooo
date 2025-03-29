import { createClient, type ClientConfig } from 'next-sanity'

const config: ClientConfig = {
	projectId: 'rxyp3qge',
	dataset: 'production',
	apiVersion: '2023-09-14',
	useCdn: false,
	stega: {
		enabled: process.env.NODE_ENV === 'production',
		studioUrl: '/studio'
	}
}

const client = createClient(config)

export default client