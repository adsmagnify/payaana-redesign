import { NextResponse } from "next/server";

export const revalidate = 0; // No caching for form submissions

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Here you can:
    // 1. Save to Sanity CMS (recommended - see below)
    // 2. Send email using a service like SendGrid, Resend, or Nodemailer
    // 3. Save to a database
    // 4. Send to a CRM like HubSpot, Salesforce, etc.
    // 5. Send to a webhook (Zapier, Make.com, etc.)

    // Example: Log the submission (remove in production)
    console.log("Contact form submission:", {
      name,
      email,
      phone: phone || "Not provided",
      message,
      timestamp: new Date().toISOString(),
    });

    // For now, we'll return success
    // In production, implement one of the options above
    return NextResponse.json(
      {
        message: "Thank you! Your message has been received. We'll get back to you soon.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
