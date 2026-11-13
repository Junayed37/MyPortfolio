import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ফ্রন্টএন্ডের fetch(`${apiUrl}/api/contact`) এর সাথে ম্যাচ করার জন্য
  app.setGlobalPrefix("api");

  // Next.js ফ্রন্টএন্ড থেকে রিকোয়েস্ট অ্যালাউ করার জন্য CORS সেটআপ
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  });

  // DTO ভ্যালিডেশন এনাবল করা
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}/api`);
}
bootstrap();
