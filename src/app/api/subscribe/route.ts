import { NextRequest, NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = 'Wuw1zeX6J_j7gRw5iDvWLwWuw1zeX6J_j7gRw5iDvWLw';
const CONVERTKIT_FORM_ID = 'YOUR_FORM_ID'; // You'll need to get this from ConvertKit

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // ConvertKit API call
    const response = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
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

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
