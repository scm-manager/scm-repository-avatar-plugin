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

import { Icon } from "@scm-manager/ui-components";
import React, { FC } from "react";
import { Avatar } from "../avatars";
import styled from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2.5em;
`;

type Props = {
  avatar: Avatar;
};

const PredefinedAvatar: FC<Props> = ({ avatar }) => {
  return (
    <svg viewBox="0 0 64 64">
      <rect width="64px" height="64px" fill={avatar.color || "#363636"} rx="5px" ry="5px" />
      <foreignObject x="0" y="0" width="64px" height="64px">
        <IconWrapper>
          <Icon name={avatar.iconName || "bug"} color="white" />
        </IconWrapper>
      </foreignObject>
    </svg>
  );
};

export default PredefinedAvatar;
