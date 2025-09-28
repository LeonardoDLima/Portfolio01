import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota para receber o formulário e mandar via Resend
app.post("/enviar-email", async (req, res) => {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `re_fvUmoaHM_G1vZ68xRDWv1PBBrpCQ3MPSq`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Seu Nome <seuemail@seudominio.com>", // precisa ser domínio verificado no Resend
                to: "leonardodlima615@hotmail.com",
                subject: assunto,
                html: `
                    <h2>Nova mensagem do portfólio</h2>
                    <p><b>Nome:</b> ${nome}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Telefone:</b> ${telefone}</p>
                    <p><b>Mensagem:</b><br>${mensagem}</p>
                `
            })
        });

        const data = await response.json();
        console.log(data);
        res.json({ sucesso: true, data });

    } catch (err) {
        console.error(err);
        res.status(500).json({ sucesso: false, erro: "Falha ao enviar e-mail." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
