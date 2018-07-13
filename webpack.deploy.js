const merge = require('webpack-merge');
const S3Plugin = require('webpack-s3-plugin');

// Webpack configuration for production
module.exports = (directory, bucket) => {
  return merge([
    {
      plugins: [
        new S3Plugin({
          directory,
          s3Options: {
            accessKeyId: process.env.WRI_SITES_AWS_KEY,
            secretAccessKey: process.env.WRI_SITES_AWS_SECRET,
            region: 'us-east-1'
          },
          s3UploadOptions: {
            Bucket: bucket
          },
        }),
      ],
    },
  ]);
};
