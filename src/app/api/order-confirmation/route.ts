import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Format price helper (duplicated for server-side use)
function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderNumber,
      email,
      items,
      total,
      shippingAddress,
      phone,
      deliveryTime,
    } = body;

    // Validate required fields
    if (!orderNumber || !email || !items || !total) {
      return NextResponse.json(
        { error: 'Fehlende erforderliche Felder' },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log('=== Order Confirmation Email (Fallback - RESEND_API_KEY nicht gesetzt) ===');
      console.log('To:', email);
      console.log('Subject: Vielen Dank für Ihre Bestellung bei B-Ware Outlet!');
      console.log('Order Number:', orderNumber);
      console.log('===================');
      
      return NextResponse.json(
        { message: 'Order confirmation logged (RESEND_API_KEY not set)', emailSent: false },
        { status: 200 }
      );
    }

    // Build items list HTML
    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.title}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatPrice(item.price)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>
    `).join('');

    // Calculate subtotal
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = total - subtotal;

    try {
      const resend = new Resend(resendApiKey);
      
      const emailResult = await resend.emails.send({
        from: 'B-Ware Outlet <onboarding@resend.dev>',
        to: email,
        subject: `Vielen Dank für Ihre Bestellung #${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #0066CC; margin-bottom: 20px;">Vielen Dank für Ihre Bestellung!</h1>
            
            <p>Sehr geehrte/r Kunde/in,</p>
            
            <p>vielen Dank für Ihre Bestellung bei B-Ware Outlet! Wir haben Ihre Bestellung erhalten und werden sie schnellstmöglich bearbeiten.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #0066CC; margin-top: 0;">Bestelldetails</h2>
              <p><strong>Bestellnummer:</strong> ${orderNumber}</p>
              <p><strong>Telefonnummer:</strong> ${phone || 'Nicht angegeben'}</p>
              <p><strong>Voraussichtliche Lieferzeit:</strong> ${deliveryTime || 'Nicht angegeben'}</p>
              <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">
                Hinweis: Dies ist eine vorläufige Zeit. Der Kurier wird Sie anrufen, um die genaue Zeit zu bestätigen.
              </p>
            </div>

            <div style="margin: 20px 0;">
              <h2 style="color: #0066CC;">Lieferadresse</h2>
              <p>
                ${shippingAddress.name || ''}<br>
                ${shippingAddress.street || ''}<br>
                ${shippingAddress.postalCode || ''} ${shippingAddress.city || ''}
              </p>
            </div>

            <div style="margin: 20px 0;">
              <h2 style="color: #0066CC;">Bestellte Artikel</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                  <tr style="background-color: #f3f4f6;">
                    <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e5e7eb;">Artikel</th>
                    <th style="padding: 8px; text-align: center; border-bottom: 2px solid #e5e7eb;">Menge</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Einzelpreis</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 2px solid #e5e7eb;">Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0;">Zwischensumme:</td>
                  <td style="padding: 8px 0; text-align: right;">${formatPrice(subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Versand:</td>
                  <td style="padding: 8px 0; text-align: right;">${formatPrice(shipping)}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; font-size: 18px;">Gesamt:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 18px;">${formatPrice(total)}</td>
                </tr>
              </table>
            </div>

            <p>Sie können den Status Ihrer Bestellung jederzeit in Ihrem Konto einsehen.</p>
            
            <p>Falls Sie Fragen haben, zögern Sie nicht, unseren Support zu kontaktieren.</p>
            
            <p>Mit freundlichen Grüßen,<br>Ihr Team von B-Ware Outlet</p>
          </div>
        `,
        text: `
          Vielen Dank für Ihre Bestellung!
          
          Sehr geehrte/r Kunde/in,
          
          vielen Dank für Ihre Bestellung bei B-Ware Outlet! Wir haben Ihre Bestellung erhalten und werden sie schnellstmöglich bearbeiten.
          
          Bestelldetails:
          Bestellnummer: ${orderNumber}
          Telefonnummer: ${phone || 'Nicht angegeben'}
          Voraussichtliche Lieferzeit: ${deliveryTime || 'Nicht angegeben'}
          
          Hinweis: Dies ist eine vorläufige Zeit. Der Kurier wird Sie anrufen, um die genaue Zeit zu bestätigen.
          
          Lieferadresse:
          ${shippingAddress.name || ''}
          ${shippingAddress.street || ''}
          ${shippingAddress.postalCode || ''} ${shippingAddress.city || ''}
          
          Bestellte Artikel:
          ${items.map((item: any) => `${item.title} - ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`).join('\n')}
          
          Zwischensumme: ${formatPrice(subtotal)}
          Versand: ${formatPrice(shipping)}
          Gesamt: ${formatPrice(total)}
          
          Sie können den Status Ihrer Bestellung jederzeit in Ihrem Konto einsehen.
          
          Mit freundlichen Grüßen,
          Ihr Team von B-Ware Outlet
        `,
      });

      if (emailResult.data) {
        console.log('✅ Order confirmation email sent successfully:', emailResult.data);
        return NextResponse.json(
          { message: 'Email sent successfully', emailSent: true },
          { status: 200 }
        );
      } else if (emailResult.error) {
        console.error('❌ Order confirmation email failed:', emailResult.error);
        return NextResponse.json(
          { message: 'Email sending failed', emailSent: false, error: emailResult.error },
          { status: 200 } // Don't fail the order if email fails
        );
      }
    } catch (emailErr: any) {
      console.error('❌ Order confirmation email exception:', emailErr);
      return NextResponse.json(
        { message: 'Email sending error', emailSent: false, error: emailErr.message },
        { status: 200 } // Don't fail the order if email fails
      );
    }

    return NextResponse.json(
      { message: 'Unknown error', emailSent: false },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Order confirmation API error:', error);
    return NextResponse.json(
      { error: error.message || 'Ein Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

