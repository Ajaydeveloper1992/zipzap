import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Clear the token cookie by setting an empty value and an expired date
        response.cookies.set("next-auth.session-token", "", {
            httpOnly: true,
            expires: new Date(0), // This effectively deletes the cookie
            path: '/' // Set the path to match where the cookie was set
        });

        return response;
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}