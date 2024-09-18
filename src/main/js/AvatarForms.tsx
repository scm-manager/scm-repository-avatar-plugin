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

import { Repository, File } from "@scm-manager/ui-types";
import React, { FC } from "react";
import AutoGeneratedAvatar from "./autogenerated/AutoGeneratedAvatar";
import PredefinedAvatarSelector from "./predefined/PredefinedAvatarSelector";
import styled from "styled-components";
import AvatarUploader from "./uploaded/AvatarUploader";
import AvatarPreview from "./predefined/AvatarPreview";
import { AvatarType } from "./avatars";

const Wrapper = styled.div`
  margin: 1em 0;
  padding: 1em;
  border: #f5f5f5 1px solid;
  border-radius: 5px;
  min-height: 140px;
`;

type Props = {
  repository: Repository;
  avatarType: AvatarType;
  icon: string;
  setIcon: (icon: string) => void;
  color: string;
  setColor: (color: string) => void;
  file: File;
  setFile: (file: File) => void;
};

const AvatarForms: FC<Props> = ({ repository, avatarType, icon, setIcon, color, setColor, file, setFile }) => {
  const disabled = !repository?._links.updateAvatar;

  let avatar;
  switch (avatarType) {
    case "AUTO_GENERATED":
      avatar = <AvatarPreview avatar={<AutoGeneratedAvatar repository={repository} className="image is-64x64" />} />;
      break;
    case "PREDEFINED":
      avatar = (
        <PredefinedAvatarSelector icon={icon} color={color} setColor={setColor} setIcon={setIcon} disabled={disabled} />
      );
      break;
    case "UPLOADED":
      avatar = <AvatarUploader repository={repository} file={file} setFile={setFile} disabled={disabled} />;
      break;
  }

  return <Wrapper className="is-clipped">{avatar}</Wrapper>;
};

export default AvatarForms;
