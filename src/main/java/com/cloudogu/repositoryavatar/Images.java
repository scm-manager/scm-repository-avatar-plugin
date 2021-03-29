/*
 * MIT License
 *
 * Copyright (c) 2020-present Cloudogu GmbH and Contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.cloudogu.repositoryavatar;

import javax.imageio.ImageIO;
import javax.ws.rs.core.MediaType;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class Images {

  static boolean shouldScale(MediaType mediaType) {
    return mediaType.getType().equals("image")
      && (mediaType.getSubtype().equals("jpeg")
      || mediaType.getSubtype().equals("jpg")
      || mediaType.getSubtype().equals("png"));
  }

  static byte[] scaleImage(byte[] imageBytes, String format) throws IOException {
    try (ByteArrayInputStream bais = new ByteArrayInputStream(imageBytes); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
      Image tmpImage = ImageIO.read(bais);
      Image scaled = tmpImage.getScaledInstance(64, 64, Image.SCALE_SMOOTH);
      ImageIO.write(toBufferedImage(scaled), format, baos);
      baos.flush();
      return baos.toByteArray();
    }
  }

  private static BufferedImage toBufferedImage(Image img) {
    if (img instanceof BufferedImage) {
      return (BufferedImage) img;
    }

    BufferedImage bufferedImage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_RGB);
    Graphics2D bGr = bufferedImage.createGraphics();
    bGr.drawImage(img, 0, 0, null);
    bGr.dispose();

    return bufferedImage;
  }
}
