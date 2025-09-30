// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    const data = await resend.emails.send({
      from: 'Leonardo <onboarding@resend.dev>',
      to: 'leonardodlima615@hotmail.com',
      subject: `Nova mensagem: ${assunto}`,
      html: `
        <h2>📩 Nova mensagem recebida!</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Mensagem:</b><br/>${mensagem}</p>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
