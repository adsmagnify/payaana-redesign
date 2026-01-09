# Form Submission & Lead Management Guide

## Overview

This guide explains how form submissions are handled and how you can receive and manage leads from the contact form and package inquiry forms.

## Current Setup

### 1. Contact Form API Route
- **Location**: `/app/api/contact/route.ts`
- **Endpoint**: `POST /api/contact`
- **Status**: ✅ Created and ready to use

### 2. Form Component
- **Location**: `/components/forms/ContactForm.tsx`
- **Status**: ✅ Updated to use the API route

## How to Handle Form Submissions

You have several options for handling form submissions. Choose the one that best fits your needs:

---

## Option 1: Save to Sanity CMS (Recommended) ⭐

**Best for**: Managing leads directly in your Sanity Studio, viewing all submissions in one place, and tracking lead status.

### Setup Steps:

1. **Add the Lead Schema** (Already created):
   - File: `sanity/schemas/lead.ts`
   - This schema includes: name, email, phone, message, source, status, etc.

2. **Register the Schema**:
   - Add to `sanity/schemaTypes/index.ts`:
   ```typescript
   import leadSchema from "../schemas/lead";
   
   export const schema: { types: SchemaTypeDefinition[] } = {
     types: [packageSchema, destinationSchema, serviceSchema, gallerySchema, leadSchema],
   };
   ```

3. **Update the API Route** to save to Sanity:
   ```typescript
   // In app/api/contact/route.ts
   import { client } from "@/lib/sanity/client";
   
   // Inside POST function:
   const lead = await client.create({
     _type: "lead",
     name,
     email,
     phone: phone || undefined,
     message,
     source: "contact",
     status: "new",
     submittedAt: new Date().toISOString(),
   });
   ```

4. **Deploy Sanity Schema**:
   ```bash
   sanity deploy
   ```

5. **Access Leads in Sanity Studio**:
   - Go to `/studio` in your browser
   - You'll see a "Lead" section in the sidebar
   - All form submissions will appear there
   - You can update status, add notes, and manage leads

### Benefits:
- ✅ All leads in one place (Sanity Studio)
- ✅ Easy to track and manage lead status
- ✅ Can add internal notes
- ✅ Searchable and filterable
- ✅ No additional services needed

---

## Option 2: Send Email Notifications

**Best for**: Getting instant notifications when someone submits a form.

### Using Resend (Recommended for Next.js):

1. **Install Resend**:
   ```bash
   npm install resend
   ```

2. **Get API Key**:
   - Sign up at https://resend.com
   - Get your API key

3. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   NOTIFICATION_EMAIL=your-email@example.com
   ```

4. **Update API Route**:
   ```typescript
   import { Resend } from "resend";
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: "contact@payaana.in",
     to: process.env.NOTIFICATION_EMAIL,
     subject: `New Contact Form Submission from ${name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>
     `,
   });
   ```

### Alternative: Nodemailer (Gmail, SMTP):

1. **Install Nodemailer**:
   ```bash
   npm install nodemailer
   ```

2. **Update API Route** (see Nodemailer documentation)

---

## Option 3: Save to Database

**Best for**: If you have an existing database or want more control.

### Using Prisma + PostgreSQL/MySQL:

1. **Install Prisma**:
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Create Lead Model**:
   ```prisma
   model Lead {
     id        String   @id @default(cuid())
     name      String
     email     String
     phone     String?
     message   String
     source    String
     status    String   @default("new")
     createdAt DateTime @default(now())
   }
   ```

3. **Update API Route** to save to database

---

## Option 4: Send to Webhook (Zapier, Make.com, etc.)

**Best for**: Integrating with existing CRM or automation tools.

### Setup:

1. **Get Webhook URL** from Zapier/Make.com

2. **Update API Route**:
   ```typescript
   await fetch(process.env.WEBHOOK_URL, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name,
       email,
       phone,
       message,
       source: "contact",
     }),
   });
   ```

---

## Option 5: Multiple Methods (Recommended for Production)

**Best for**: Maximum coverage - save to Sanity AND send email notification.

### Implementation:

```typescript
// In app/api/contact/route.ts

// 1. Save to Sanity
const lead = await client.create({
  _type: "lead",
  name,
  email,
  phone: phone || undefined,
  message,
  source: "contact",
  status: "new",
  submittedAt: new Date().toISOString(),
});

// 2. Send email notification
await resend.emails.send({
  from: "contact@payaana.in",
  to: process.env.NOTIFICATION_EMAIL,
  subject: `New Contact: ${name}`,
  html: `...`,
});

// 3. Optional: Send to webhook
if (process.env.WEBHOOK_URL) {
  await fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({ name, email, phone, message }),
  });
}
```

---

## Package Inquiry Form

The package inquiry form (`PackageInquiryForm`) can use the same system. You'll need to:

1. Create `/app/api/package-inquiry/route.ts` (similar to contact route)
2. Include `packageId` and `packageName` in the submission
3. Set `source: "package"` in the lead record

---

## Testing

1. **Test the form**:
   - Fill out the contact form on `/contact`
   - Submit and check browser console for errors
   - Check your chosen storage method (Sanity, email, etc.)

2. **Check API Route**:
   - Use a tool like Postman or curl:
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

---

## Security Considerations

1. **Rate Limiting**: Add rate limiting to prevent spam
   ```bash
   npm install @upstash/ratelimit @upstash/redis
   ```

2. **Honeypot Field**: Add a hidden field to catch bots

3. **reCAPTCHA**: Add Google reCAPTCHA for additional protection

4. **Input Validation**: Already implemented in the API route

---

## Recommended Setup for Production

1. ✅ **Save to Sanity** - For lead management
2. ✅ **Send Email** - For instant notifications
3. ✅ **Add Rate Limiting** - Prevent spam
4. ✅ **Add reCAPTCHA** - Additional bot protection

---

## Next Steps

1. Choose your preferred method(s) from above
2. Update `/app/api/contact/route.ts` with your chosen implementation
3. Test thoroughly
4. Deploy and monitor

---

## Questions?

If you need help implementing any of these options, let me know which one you'd like to use and I can provide more detailed code examples.
