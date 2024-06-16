import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Libuv Library')
.setDescription('The Library API description')
.setVersion('1.0')
.addTag('lib')
.build();