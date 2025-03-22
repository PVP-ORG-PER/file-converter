export const SUPPORTED_FORMATS: string[] = process.env.SUPPORTED_FORMATS
  ? process.env.SUPPORTED_FORMATS.split(',').map((format) => format.trim())
  : ['docx', 'pdf', 'md', 'html'];

export function getMimeType(format: string): string {
  switch (format) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'md':
      return 'text/markdown';
    case 'html':
      return 'text/html';
    default:
      return 'application/octet-stream';
  }
}
