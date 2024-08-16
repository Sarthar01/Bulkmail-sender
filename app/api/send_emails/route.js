import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import pLimit from 'p-limit';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Limit the number of concurrent emails being sent
const limit = pLimit(10);

export async function POST(request) {
  try {
    // Convert Request to a FormData
    const formData = await request.formData();
    const userEmail = formData.get('userEmail');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const file = formData.get('file');

    // Ensure file is received
    if (!file) {
      console.error('No file received');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get file buffer and filename
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // Save file to disk
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    fs.writeFileSync(filePath, fileBuffer);

    // Read and parse the uploaded JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const emails = Object.values(jsonData);

    const emailStatus = [];
    const batchSize = 50; // Number of emails to send per batch
    const delay = 1000;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);

      const emailStatusBatch = await Promise.all(batch.map((email) =>
        limit(async () => {
          try {
            await transporter.sendMail({
              from: userEmail,
              to: email,
              subject,
              text: message,
            });
            return { email, status: 'sent' };
          } catch (error) {
            return { email, status: 'failed', error: error.message };
          }
        })
      ));

      // Combine results from this batch
      emailStatus.push(...emailStatusBatch);

      // Wait before sending the next batch
      await new Promise(res => setTimeout(res, delay));
    }

    // Remove the uploaded file
    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: 'Emails sent successfully!',
      emailStatus: {
        total: emails.length,
        sent: emailStatus.filter(status => status.status === 'sent').length,
        details: emailStatus,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
