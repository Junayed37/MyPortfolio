"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let ContactService = ContactService_1 = class ContactService {
    configService;
    logger = new common_1.Logger(ContactService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get("SMTP_HOST"),
            port: Number(this.configService.get("SMTP_PORT")),
            secure: true,
            auth: {
                user: this.configService.get("SMTP_USER"),
                pass: this.configService.get("SMTP_PASS"),
            },
        });
    }
    async sendContactEmail(dto) {
        const receiver = this.configService.get("RECEIVER_EMAIL");
        try {
            await this.transporter.sendMail({
                from: `"Portfolio Contact" <${this.configService.get("SMTP_USER")}>`,
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
        }
        catch (error) {
            this.logger.error("Failed to send contact email", error);
            throw new common_1.InternalServerErrorException("Failed to send message. Please try again later.");
        }
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = ContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContactService);
//# sourceMappingURL=contact.service.js.map