// import sharp from 'sharp';

// export default async function handler(req, res) {
//   try {
//     const { imageUrl, filename } = req.body;

//     const response = await fetch(imageUrl);
//     const buffer = await response.buffer();

//     const convertedBuffer = await sharp(buffer).jpeg().toBuffer();

//     res.setHeader('Content-Type', 'image/jpeg');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename=${filename}.jpg`
//     );
//     res.send(convertedBuffer);
//   } catch (error) {
//     console.error('Error converting image to JPEG:', error);
//     res.status(500).send('Error converting image to JPEG');
//   }
// }
