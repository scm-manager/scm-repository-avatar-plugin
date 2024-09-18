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
