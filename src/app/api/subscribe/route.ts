import { NextRequest, NextResponse } from 'next/server';

// Simple email storage (in production, you'd use a database)
// eslint-disable-next-line prefer-const
let subscribers: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Add to subscribers list
    subscribers.push(email);
    
    // Log the subscription (you can see this in Vercel logs)
    console.log('New subscriber:', email);
    console.log('Total subscribers:', subscribers.length);

    // TODO: For production, you should:
    // 1. Store emails in a database (like MongoDB, PostgreSQL)
    // 2. Send welcome email
    // 3. Integrate with ConvertKit, Mailchimp, or similar

    return NextResponse.json(
      { 
        message: 'Successfully subscribed! Check your email for confirmation.',
        subscriberCount: subscribers.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to view subscribers (for admin purposes)
export async function GET() {
  return NextResponse.json(
    { 
      subscribers: subscribers,
      count: subscribers.length 
    },
    { status: 200 }
  );
}
