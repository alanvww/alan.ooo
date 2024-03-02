import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'rxyp3qge',
	dataset: 'production',
	apiVersion: '2023-09-14',
	useCdn: true,
};

const client = createClient(config);

export default client;
