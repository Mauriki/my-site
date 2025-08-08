import { NextRequest, NextResponse } from 'next/server';

// const CONVERTKIT_API_KEY = 'Wuw1zeX6J_j7gRw5iDvWLwWuw1zeX6J_j7gRw5iDvWLw';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // For now, let's log the subscription and return success
    // This will work immediately while you set up ConvertKit properly
    console.log('New newsletter subscription:', email);

    // TODO: Replace this with actual ConvertKit API call
    // You'll need to:
    // 1. Go to ConvertKit dashboard
    // 2. Create a form
    // 3. Get the Form ID
    // 4. Uncomment the code below

    /*
    const response = await fetch(`https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
    */

    // For now, simulate success
    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email for confirmation.' },
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
