import { Resend } from 'resend';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const { email, message } = await request.json();
    const contactToEmail =
      process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL || process.env.TO_EMAIL || 'hello@dentsuai.com';
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (!email || !message) {
      return Response.json({ errorCode: 'REQUIRED_FIELDS' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Response.json({ errorCode: 'INVALID_EMAIL' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return Response.json({ errorCode: 'NOT_CONFIGURED' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: `Contact Form <${contactFromEmail}>`,
      to: contactToEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (result.error) {
      console.error('Resend send error:', result.error);
      return Response.json({ errorCode: 'SEND_FAILED' }, { status: 500 });
    }

    return Response.json({ success: true, code: 'SENT' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json({ errorCode: 'INTERNAL' }, { status: 500 });
  }
}
