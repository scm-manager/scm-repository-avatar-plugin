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
import { Link, Repository } from "@scm-manager/ui-types";
import AutoGeneratedAvatar from "./autogenerated/AutoGeneratedAvatar";
import PredefinedAvatar from "./predefined/PredefinedAvatar";
import { Avatar } from "./avatars";
import UploadedAvatar from "./uploaded/UploadedAvatar";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  border-radius: 5px;
`;

type Props = {
  repository: Repository;
  size: number;
};

const AvatarGate: FC<Props> = ({ repository, size = 64 }) => {
  const avatar = repository._embedded?.avatar as Avatar | undefined;

  if (avatar?.type === "PREDEFINED") {
    return <PredefinedAvatar avatar={avatar} />;
  } else if (avatar?.type === "UPLOADED" && avatar._links.avatar) {
    return <UploadedAvatar imageLink={(avatar._links.avatar as Link).href} size={size} />;
  } else {
    return <AutoGeneratedAvatar repository={repository} />;
  }
};

const AvatarRenderer: FC<Props> = ({ repository, size }) => {
  return (
    <AvatarWrapper>
      <AvatarGate repository={repository} size={size} />
    </AvatarWrapper>
  );
};

export default AvatarRenderer;
