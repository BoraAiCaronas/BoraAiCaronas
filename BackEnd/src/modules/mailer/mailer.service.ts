import { Injectable } from "@nestjs/common";
import * as nodeMailer from 'nodemailer';

@Injectable()
export class MailerService {

    private static readonly EMAIL_TESTE_EVIROMENT = 'jessica.mcclure@ethereal.email'
    private static readonly PASSWORD_TESTE_EVIROMENT = 'E8HAVZgMMNWPpRZK1t'
    private transporter: nodeMailer.transporter
   
    constructor () {

        this.transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: MailerService.EMAIL_TESTE_EVIROMENT,
                pass: MailerService.PASSWORD_TESTE_EVIROMENT
            }
        });
    }

    async sendVerificationEmail(id: number, email: string, verificacaoToken: string): Promise<void> {

        let htmlContent = require('fs').readFileSync(require('path').resolve(__dirname,'../../../src/templates/verification_email.html'), 'utf8');

        htmlContent = htmlContent.replace('${id}', id.toString()).replace('${verificacaoToken}', verificacaoToken);

        var mailOptions = {
            from: MailerService.EMAIL_TESTE_EVIROMENT,
            to: email,
            subject: "BoraAí - Verficação do email",
            text: 'Cofirme o e-mail viculado a sua conta! Acesse o link informado: https://boraaideplot-api.onrender.com/verificacao-email/${id}/${verificacaoToken}', 
            html: htmlContent
        }

        await this.transporter.sendMail(mailOptions)
    }
}