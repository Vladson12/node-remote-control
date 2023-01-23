import { FileType, mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const makeScreenshot = async () => {
  const mousePosition = await mouse.getPosition();
  const leftCoord = mousePosition.x - 100;
  const topCoord = mousePosition.y - 100;
  const width = 200;
  const height = 200;

  const regionToCapture = new Region(leftCoord, topCoord, width, height);

  const regionScreenshot = await (
    await screen.grabRegion(regionToCapture)
  ).toRGB();

  const jimp = new Jimp({
    data: regionScreenshot.data,
    width: regionScreenshot.width,
    height: regionScreenshot.height,
  });

  const base64Buffer = (await jimp.getBufferAsync(Jimp.MIME_PNG)).toString(
    'base64',
  );
  return base64Buffer;
};
