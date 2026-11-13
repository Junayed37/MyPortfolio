import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("SMTP_HOST"),
      port: Number(this.configService.get<number>("SMTP_PORT")),
      secure: true, // true for port 465
      auth: {
        user: this.configService.get<string>("SMTP_USER"),
        pass: this.configService.get<string>("SMTP_PASS"),
      },
    });
  }

  async sendContactEmail(dto: CreateContactDto) {
    const receiver = this.configService.get<string>("RECEIVER_EMAIL");

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Contact" <${this.configService.get<string>("SMTP_USER")}>`,
        to: receiver,
        replyTo: dto.email,
        subject: `New Portfolio Inquiry from ${dto.name}`,
        text: `Name: ${dto.name}\nEmail: ${dto.email}\n\nMessage:\n${dto.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
            <h2 style="color: #10b981;">New Message from Your Portfolio</h2>
            <p><strong>Name:</strong> ${dto.name}</p>
            <p><strong>Email:</strong> ${dto.email}</p>
            <hr style="border: 1px solid #e2e8f0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${dto.message}</p>
          </div>
        `,
      });

      this.logger.log(`Contact email sent from ${dto.email}`);
      return { success: true, message: "Message sent successfully!" };
    } catch (error) {
      this.logger.error("Failed to send contact email", error);
      throw new InternalServerErrorException(
        "Failed to send message. Please try again later.",
      );
    }
  }
}
