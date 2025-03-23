# API de Conversión

Esta API REST fue desarrollada con **NestJS** y permite convertir documentos entre los formatos soportados: **docx, pdf, md** y **html**. La aplicación está diseñada de forma modular, utilizando patrones de diseño (como Strategy y Composite) para separar la lógica de conversión, y ofrece documentación interactiva mediante Swagger.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Variables de Entorno](#variables-de-entorno)
- [Licencia](#licencia)

## Características

- **Conversión de archivos:** Convierte documentos entre los formatos docx, pdf, md y html.
- **Arquitectura modular:** Separación clara de controladores, servicios y estrategias de conversión.
- **Patrones de diseño:** Se utilizan los patrones Strategy y Composite Strategy para gestionar conversiones.
- **Logging y manejo de errores:** Registro de actividad y errores con el logger integrado de NestJS.
- **Documentación OpenAPI:** Documentación interactiva generada con Swagger.
- **Configuración centralizada:** Variables de entorno para definir formatos soportados y parámetros de Swagger.

## Tecnologías

- **[NestJS](https://nestjs.com/):** Framework de Node.js para construir aplicaciones escalables y mantenibles.
- **TypeScript:** Superset tipado de JavaScript que mejora la calidad y mantenibilidad del código.
- **@nestjs/config:** Módulo para gestionar configuraciones y variables de entorno.
- **@nestjs/swagger:** Genera documentación OpenAPI/Swagger automáticamente.
- **md-to-pdf:** Librería para convertir Markdown a PDF.
- **marked:** Para convertir Markdown a HTML.
- **mammoth:** Para convertir documentos DOCX a HTML.
- **html-pdf:** Para convertir HTML a PDF.
- **turndown:** Para convertir HTML a Markdown.
- **Logger de NestJS:** Para registrar la actividad y facilitar la depuración.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   SUPPORTED_FORMATS=docx,pdf,md,html
   SWAGGER_TITLE=API de Conversión
   SWAGGER_DESCRIPTION=API para convertir documentos entre formatos (docx, pdf, md, html)
   SWAGGER_VERSION=1.0.0
   ```

4. **Iniciar la aplicación:**

   ```bash
   npm run start
   ```

   La API se ejecutará en `http://localhost:3000`.

## Uso

- **Documentación de la API:**

  Accede a la documentación interactiva en `http://localhost:3000/api` para ver todos los endpoints, parámetros y ejemplos.

- **Endpoints principales:**

  - **POST /convert:**
    Convierte un archivo entre formatos.
    **Parámetros:**
    - `file`: Archivo a convertir (formato multipart/form-data).
    - `from`: Formato de origen (por ejemplo, `md`).
    - `to`: Formato de destino (por ejemplo, `pdf`).

  - **GET /formats:**
    Devuelve un objeto JSON con la lista de formatos soportados.

## Variables de Entorno

- **SUPPORTED_FORMATS:** Lista de formatos soportados, separados por comas (por ejemplo, `docx,pdf,md,html`).
- **SWAGGER_TITLE:** Título de la documentación Swagger.
- **SWAGGER_DESCRIPTION:** Descripción de la API en la documentación Swagger.
- **SWAGGER_VERSION:** Versión de la API.

## Licencia

Este proyecto se distribuye bajo la Licencia MIT.
