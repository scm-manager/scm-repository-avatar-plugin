/*
 * Copyright (c) 2020 - present Cloudogu GmbH
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */

package com.cloudogu.repositoryavatar;

import javax.imageio.ImageIO;
import jakarta.ws.rs.core.MediaType;
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
