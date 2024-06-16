import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('UvLib Library')
.setDescription('The Library API description')
.setVersion('1.0')
.addTag('UvLib')
.build();