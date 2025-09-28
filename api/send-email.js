// api/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const { nome, email, telefone, assunto, mensagem } = req.body;

  try {
    await resend.emails.send({
      from: "https://portfolio01-cyan-six.vercel.app/", // precisa ser domínio verificado no Resend
      to: "leonardodlima615@hotmail.com",
      subject: `Nova mensagem: ${assunto}`,
      html: `
        <h2>Novo contato pelo portfólio</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Mensagem:</strong><br/>${mensagem}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ success: false, message: "Erro ao enviar email." });
  }
}
