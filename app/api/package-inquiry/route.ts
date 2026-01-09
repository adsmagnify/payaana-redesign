import { NextResponse } from "next/server";

export const revalidate = 0; // No caching for form submissions

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, travelers, travelDate, message, packageName, packageId } = body;

    // Validate required fields
    if (!name || !email || !phone || !travelers) {
      return NextResponse.json(
        { message: "Name, email, phone, and number of travelers are required" },
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

    // Send email to pravita@payaana.in
    const emailSubject = encodeURIComponent(`New Package Inquiry: ${packageName || "Package"}`);
    const emailBody = encodeURIComponent(
      `New Package Inquiry\n\n` +
      `Package: ${packageName || "N/A"}\n` +
      `Package ID: ${packageId || "N/A"}\n\n` +
      `Contact Details:\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Number of Travelers: ${travelers}\n` +
      `Preferred Travel Date: ${travelDate || "Not specified"}\n\n` +
      `Additional Message:\n${message || "None"}\n\n` +
      `Submitted at: ${new Date().toLocaleString()}`
    );

    // Log the submission
    console.log("Package inquiry submission:", {
      name,
      email,
      phone,
      travelers,
      travelDate,
      message,
      packageName,
      packageId,
      timestamp: new Date().toISOString(),
      emailTo: "pravita@payaana.in",
    });

    // In production, you can integrate with Resend, SendGrid, or Nodemailer
    // Example with Resend (uncomment and configure):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@payaana.in",
    //   to: "pravita@payaana.in",
    //   subject: `New Package Inquiry: ${packageName}`,
    //   html: `<h2>New Package Inquiry</h2><p><strong>Package:</strong> ${packageName}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Travelers:</strong> ${travelers}</p><p><strong>Travel Date:</strong> ${travelDate || "Not specified"}</p><p><strong>Message:</strong></p><p>${message || "None"}</p>`,
    // });

    return NextResponse.json(
      {
        message: "Thank you! Your inquiry has been submitted. We'll get back to you soon.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing package inquiry:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
