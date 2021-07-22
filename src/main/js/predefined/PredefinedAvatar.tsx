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

import { Icon } from "@scm-manager/ui-components";
import React, { FC } from "react";
import styled from "styled-components";
import { Avatar } from "../avatars";

const IconWrapper = styled.div<{ backgroundColor: string }>`
  width: 64px;
  height: 64px;
  background-color: ${props => props.backgroundColor};
  font-size: 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

type Props = {
  avatar: Avatar;
};

const PredefinedAvatar: FC<Props> = ({ avatar }) => {
  return (
    <IconWrapper backgroundColor={avatar.color || "#363636"} className="predefined-avatar">
      <Icon name={avatar.iconName || "bug"} color="white" />
    </IconWrapper>
  );
};

export default PredefinedAvatar;
