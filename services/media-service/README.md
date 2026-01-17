# Media Service

Media upload and CDN service with AWS S3 and CloudFront.

## Setup

1. Copy `.env.example` to `.env` and configure AWS credentials
2. Create S3 bucket and CloudFront distribution
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Endpoints

- `GET /health` - Health check
- `POST /media/upload` - Upload file to S3
- `GET /media/:id/url` - Get signed URL
- `GET /media/:id` - Get file metadata

## Port

Default: 3005
