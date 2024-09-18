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

import React, { FC } from "react";
import { Repository } from "@scm-manager/ui-types";
import SvgIcon from "./SvgIcon";
import { colors } from "../avatars";

type Props = {
  repository: Repository;
  className?: string;
};

const calculateBackgroundColor = (iconText: string) => {
  const colorCode = (iconText.charCodeAt(0) + iconText.charCodeAt(1)) % colors.length;

  return colors[colorCode];
};

const AutoGeneratedAvatar: FC<Props> = ({ repository, className }) => {
  const iconText = repository.namespace.charAt(0) + repository.name.charAt(0);

  return (
    <SvgIcon
      text={iconText.toUpperCase()}
      backgroundColor={calculateBackgroundColor(iconText)}
      iconColor="#ffffff"
      className={className}
    />
  );
};

export default AutoGeneratedAvatar;
