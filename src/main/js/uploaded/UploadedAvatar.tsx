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
import styled from "styled-components";
// @ts-ignore Unknown module for svg but the file does exist
import placeholder from "./placeholder.svg";

const StyledImage = styled.img`
  border-radius: 5px;
  margin-bottom: -0.4rem;
`;

type Props = {
  imageLink: string;
  size: number;
};

const UploadedAvatar: FC<Props> = ({ imageLink, size = 64 }) => {
  return <StyledImage src={imageLink || placeholder} alt="Avatar Preview" className={`image is-${size}x${size}`} />;
};

export default UploadedAvatar;
