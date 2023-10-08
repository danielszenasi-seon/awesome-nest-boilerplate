import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Node.js service starter')
    .setDescription('Modify this description to fit your project');

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }
  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api', app, document);
}
