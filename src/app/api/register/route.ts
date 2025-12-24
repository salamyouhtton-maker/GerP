import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Passwort muss mindestens 6 Zeichen lang sein' },
        { status: 400 }
      );
    }

    // In production, you would save user to database here
    // For now, we'll just send the email

    let emailSent = false;
    let emailError = null;

    // Send welcome email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    console.log('=== Registration Debug ===');
    console.log('RESEND_API_KEY exists:', !!resendApiKey);
    console.log('RESEND_API_KEY length:', resendApiKey?.length || 0);
    console.log('RESEND_API_KEY first 10 chars:', resendApiKey?.substring(0, 10) || 'N/A');
    console.log('Email to send to:', email);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    if (resendApiKey) {
      try {
        // Initialize Resend inside the function to avoid module-level errors
        const resend = new Resend(resendApiKey);
        console.log('Resend initialized, sending email...');
        
        const emailResult = await resend.emails.send({
          from: 'B-Ware Outlet <onboarding@resend.dev>', // You should replace this with your verified domain
          to: email,
          subject: 'Vielen Dank für Ihre Registrierung bei B-Ware Outlet!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0066CC;">Vielen Dank für Ihre Registrierung!</h1>
              <p>Hallo ${firstName} ${lastName},</p>
              <p>vielen Dank für Ihre Registrierung bei B-Ware Outlet! Wir freuen uns, Sie an Bord zu haben.</p>
              <p>Ihr Konto wurde erfolgreich erstellt. Jetzt können Sie:</p>
              <ul>
                <li>Ihre Bestellungen verfolgen</li>
                <li>Von exklusiven Angeboten profitieren</li>
                <li>Ihre persönlichen Daten verwalten</li>
              </ul>
              <p>Falls Sie Fragen haben, zögern Sie nicht, unseren Support zu kontaktieren.</p>
              <p>Mit freundlichen Grüßen,<br>Ihr Team von B-Ware Outlet</p>
            </div>
          `,
          text: `
            Vielen Dank für Ihre Registrierung!
            
            Hallo ${firstName} ${lastName},
            
            vielen Dank für Ihre Registrierung bei B-Ware Outlet! Wir freuen uns, Sie an Bord zu haben.
            
            Ihr Konto wurde erfolgreich erstellt. Jetzt können Sie:
            - Ihre Bestellungen verfolgen
            - Von exklusiven Angeboten profitieren
            - Ihre persönlichen Daten verwalten
            
            Falls Sie Fragen haben, zögern Sie nicht, unseren Support zu kontaktieren.
            
            Mit freundlichen Grüßen,
            Ihr Team von B-Ware Outlet
          `,
        });

        console.log('Email result:', JSON.stringify(emailResult, null, 2));
        
        if (emailResult.data) {
          emailSent = true;
          console.log('✅ Email sent successfully!');
          console.log('Email ID:', emailResult.data.id);
          console.log('⚠️ ВАЖНО: onboarding@resend.dev работает только для email, добавленных в Resend dashboard!');
          console.log('⚠️ Проверьте: https://resend.com/emails - добавьте ваш email для тестирования');
        } else if (emailResult.error) {
          emailError = emailResult.error.message || 'Email konnte nicht gesendet werden';
          console.error('❌ Email sending failed!');
          console.error('Error type:', emailResult.error.name);
          console.error('Error message:', emailResult.error.message);
          console.error('Full error:', JSON.stringify(emailResult.error, null, 2));
          
          // Полезные подсказки для частых ошибок
          if (emailResult.error.message?.includes('domain') || emailResult.error.message?.includes('from')) {
            console.error('💡 Подсказка: onboarding@resend.dev - тестовый адрес. Добавьте ваш email в Resend dashboard.');
          }
          if (emailResult.error.message?.includes('recipient') || emailResult.error.message?.includes('to')) {
            console.error('💡 Подсказка: Email получателя должен быть добавлен в список разрешенных для тестирования.');
          }
          if (emailResult.error.message?.includes('unauthorized') || emailResult.error.message?.includes('api key')) {
            console.error('💡 Подсказка: Проверьте правильность RESEND_API_KEY в .env.local');
          }
        } else {
          console.warn('⚠️ Email result has no data or error:', emailResult);
        }
      } catch (emailErr: any) {
        emailError = emailErr.message || 'Email konnte nicht gesendet werden';
        console.error('❌ Email sending exception!');
        console.error('Exception message:', emailErr.message);
        console.error('Exception name:', emailErr.name);
        console.error('Full exception:', {
          message: emailErr.message,
          stack: emailErr.stack,
          name: emailErr.name,
        });
        // Don't block registration if email fails, but log the error
      }
      console.log('=== End Email Debug ===');
    } else {
      // Fallback: log to console if API key is not set
      console.log('=== Email отправка (Fallback - RESEND_API_KEY nicht gesetzt) ===');
      console.log('To:', email);
      console.log('Subject: Vielen Dank für Ihre Registrierung bei B-Ware Outlet!');
      console.log('Body:', `
        Hallo ${firstName} ${lastName},
        
        vielen Dank für Ihre Registrierung bei B-Ware Outlet! Wir freuen uns, Sie an Bord zu haben.
        
        Ihr Konto wurde erfolgreich erstellt. Jetzt können Sie:
        - Ihre Bestellungen verfolgen
        - Von exklusiven Angeboten profitieren
        - Ihre persönlichen Daten verwalten
        
        Mit freundlichen Grüßen,
        Ihr Team von B-Ware Outlet
      `);
      console.log('===================');
      emailSent = true; // Mark as sent for development
    }

    return NextResponse.json(
      { 
        message: 'Registrierung erfolgreich',
        emailSent: emailSent,
        emailError: emailError || undefined
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
      },
      { status: 500 }
    );
  }
}

