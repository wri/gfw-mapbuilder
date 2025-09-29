# Global Forest Watch MapBuilder — Deployment Guide

## 1. Title & Overview

This document explains how to build the library, upload the compiled assets to the versioned S3 path, and invalidate CloudFront caches for production releases. Follow these steps to perform a clean, repeatable deployment.

## 2. Prerequisites

- Node.js + npm installed.
- AWS CLI installed and configured (`aws configure --profile WRI-Profile`).
- IAM permissions for S3 + CloudFront.
- Correct version number chosen (e.g., `1.5.0`).

## 3. Versioning Strategy

All builds are deployed to versioned folders:

- Example: `s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/`

A matching `{version}.js` file must be added to the root of the S3 bucket for the release.

## 4. Build the Project

```sh
# From the gfw-mapbuilder project root
npm install
npm run lib-cms
```

This generates the compiled library files for deployment.

## 5. Deploy to S3

```sh
# Replace [source] with your local build output directory (e.g., ./dist)
aws s3 sync ./dist s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/ --profile WRI-Profile
```

Verify that files are uploaded.

Add a new version file:

```sh
touch 1.5.0.js
aws s3 cp 1.5.0.js s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/ --profile WRI-Profile
```

## 6. Invalidate CloudFront Cache

Run both commands to clear caches for production distributions:

```sh
aws cloudfront create-invalidation --distribution-id E58RE0T7L0R9N --path "/" --profile wri
aws cloudfront create-invalidation --distribution-id E2B81LN86UDRTJ --path "/" --profile wri
```

Wait until invalidation status is Completed.

This ensures users see the latest files immediately.

## 7. Verification

- Open the production site in a private/incognito window.
- Confirm the correct version (e.g., `1.5.0`) is being served.
- Check browser console for errors.

## 8. Rollback Strategy

- If a deployment fails, redeploy the previous version (e.g., `1.4.9`).
- Invalidate CloudFront cache again.
- Communicate rollback in release notes.

## 9. Troubleshooting

- Access denied on upload: Verify AWS profile/permissions.
- Files not updating: Double-check CloudFront invalidation ran successfully.
- Wrong version served: Ensure `{version}.js` file exists at S3 root.
- Broken links or 404s: Verify that the sync command included all files from the `dist` folder.

## 10. Example Workflow

```sh
# 1. Build
npm run lib-cms

# 2. Sync files to S3
aws s3 sync ./dist s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/1.5.0/ --profile WRI-Profile

# 3. Upload version file
touch 1.5.0.js
aws s3 cp 1.5.0.js s3://wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/ --profile WRI-Profile

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E58RE0T7L0R9N --path "/" --profile wri
aws cloudfront create-invalidation --distribution-id E2B81LN86UDRTJ --path "/" --profile wri
```
