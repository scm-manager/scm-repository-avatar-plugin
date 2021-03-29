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
import { HalRepresentation } from "@scm-manager/ui-types";

export type AvatarType = "AUTO_GENERATED" | "PREDEFINED" | "UPLOADED";

export type Avatar = HalRepresentation & {
  type: AvatarType;
  iconName?: string;
  color?: string;
};

// Only allow files smaller than 5 megabyte
export const fileSizeLimit = 5000000;

export const supportedImageFormats = ["png", "jpg", "jpeg", "gif", "svg"];

export const isFileExtensionInvalid = (filename: string) => {
  if (!filename) {
    return false;
  }
  const parts = filename?.split(".");
  const extension = parts[parts.length - 1];

  return !supportedImageFormats.some(format => format.toLowerCase() === extension.toLowerCase());
};

export const technologyIcons = [
  "bug",
  "cloud",
  "cogs",
  "gamepad",
  "lock",
  "microphone",
  "shield-alt",
  "user-secret",
  "virus",
  "wifi",
  "mobile-alt",
  "server",
  "tablet-alt",
  "at"
];

export const businessIcons = [
  "balance-scale",
  "globe-europe",
  "map-marker-alt",
  "wallet",
  "truck",
  "shopping-cart",
  "credit-card",
  "gem",
  "coins",
  "box-open"
];
export const otherIcons = [
  "cat",
  "dragon",
  "feather",
  "fire",
  "heart",
  "kiwi-bird",
  "leaf",
  "moon",
  "palette",
  "poo",
  "spider",
  "tint",
  "glasses",
  "umbrella",
  "atom",
  "award",
  "biohazard",
  "briefcase-medical",
  "compass"
];

export const colors = ["#363636", "#175069", "#00949e", "#00876a", "#bf8900", "#ff3860", "#de168f"];
