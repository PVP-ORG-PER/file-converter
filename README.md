# Markdown to PDF API

Markdown to PDF API is a simple and efficient API that allows users to convert Markdown files into PDF documents. This project is designed to streamline the process of generating PDFs from Markdown content, making it ideal for developers and teams who need automated document generation.

## Features

- Convert Markdown files to PDF format.
- Support for Markdown syntax, including headings, lists, tables, and more.
- Easy-to-use API endpoints.
- Lightweight and fast.

## How It Works

1. The API accepts a Markdown file or raw Markdown content as input.
2. It processes the Markdown content and converts it into a PDF document.
3. The generated PDF is returned as a downloadable file.

## Installation

Follow these steps to download and install the project:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/markdown-to-pdf-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd markdown-to-pdf-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:3000`.

## Usage

### API Endpoints

#### Convert Markdown to PDF

- **Endpoint**: `POST /convert`
- **Description**: Converts Markdown content to a PDF file.
- **Request Body**:
  ```json
  {
    "markdown": "# Your Markdown Content Here"
  }
  ```
- **Response**: A downloadable PDF file.

### Example Request

Use `curl` to send a request:
```bash
curl -X POST http://localhost:3000/convert \
-H "Content-Type: application/json" \
-d '{"markdown": "# Hello, World!"}' --output output.pdf
```

This will save the generated PDF as `output.pdf`.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com].
