import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    stega: {
        enabled: process.env.NODE_ENV === 'production',
        studioUrl: '/studio'
    }
})

export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags = [],
    revalidate = 60
}: {
    query: string
    params?: QueryParams
    tags?: string[]
    revalidate?: number | false
}) {
    return client.fetch<QueryResponse>(query, params, {
        next: {
            revalidate: tags.length ? false : revalidate,
            tags
        }
    })
}