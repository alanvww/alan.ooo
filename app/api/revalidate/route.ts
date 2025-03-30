import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Your webhook secret - store this in environment variables
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        // Verify the webhook signature
        const { isValidSignature, body } = await parseBody(
            req,
            SANITY_WEBHOOK_SECRET
        );

        if (!isValidSignature) {
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 401 }
            );
        }

        // Get the document that was changed
        if (!body) {
            return NextResponse.json(
                { success: false, message: 'Empty request body' },
                { status: 400 }
            );
        }

        // Type assertion to define expected properties
        const { _type, slug } = body as { _type: string, slug?: { current: string } };

        // Determine which paths to revalidate based on document type
        switch (_type) {
            case 'project':
                // Revalidate the specific project page
                if (slug?.current) {
                    console.log(`Revalidating project: ${slug.current}`);
                    revalidatePath(`/projects/${slug.current}`);
                }

                // Also revalidate the projects list page
                console.log('Revalidating projects list');
                revalidatePath('/projects');
                revalidateTag('projects');
                break;

            case 'profile':
                // Revalidate the about page which displays profile info
                console.log('Revalidating profile data');
                revalidatePath('/about');
                revalidateTag('profile');
                break;

            case 'job':
                // Revalidate the about page which displays job history
                console.log('Revalidating job data');
                revalidatePath('/about');
                revalidateTag('jobs');
                break;

            case 'tech':
            case 'gear':
                // Revalidate the tech-and-gear page
                console.log('Revalidating tech/gear data');
                revalidatePath('/tech-and-gear');
                revalidateTag('tech-and-gear');
                break;

            default:
                // For any other content type, revalidate the homepage
                console.log(`Revalidating default content: ${_type}`);
                revalidatePath('/');
        }

        return NextResponse.json({
            success: true,
            revalidated: true,
            message: `Revalidated ${_type} content`
        });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { success: false, message: 'Error revalidating' },
            { status: 500 }
        );
    }
}