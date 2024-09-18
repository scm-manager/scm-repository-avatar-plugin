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

import React, { FC, ReactChild } from "react";
import StyledLabel from "../StyledLabel";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  avatar: ReactChild;
  className?: string;
};

const SizedAvatar = styled.div`
  width: 64px;
  height: 64px;
`;

const AvatarPreview: FC<Props> = ({ avatar, className }) => {
  const [t] = useTranslation("plugins");

  return (
    <div className={className || "mx-4"}>
      <StyledLabel>{t("scm-repository-avatar-plugin.avatarConfig.preview")}</StyledLabel>
      <SizedAvatar>
      {avatar}
      </SizedAvatar>
    </div>
  );
};

export default AvatarPreview;
