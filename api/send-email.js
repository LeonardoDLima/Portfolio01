// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido' 
    });
  }

  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    // Validação básica
    if (!nome || !email || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e mensagem são obrigatórios'
      });
    }

    const data = await resend.emails.send({
      from: 'Leonardo <onboarding@resend.dev>',
      to: 'leonardodlima615@hotmail.com',
      subject: `Nova mensagem: ${assunto || 'Sem assunto'}`,
      html: `
        <h2>📩 Nova mensagem recebida!</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${telefone || 'Não informado'}</p>
        <p><b>Mensagem:</b><br/>${mensagem}</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'E-mail enviado com sucesso!', 
      id: data.id 
    });
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao enviar email',
      error: error.message,
    });
  }
}