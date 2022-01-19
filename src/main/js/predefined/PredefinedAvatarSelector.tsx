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

import React, { FC, useRef, useState } from "react";
import { Button, FullscreenModal } from "@scm-manager/ui-components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AvatarPreview from "./AvatarPreview";
import { businessIcons, colors, otherIcons, technologyIcons } from "../avatars";
import StyledLabel from "../StyledLabel";
import PredefinedAvatar from "./PredefinedAvatar";

const Selector = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.46rem;
`;

const Chooser = styled.button`
  height: 64px;
  width: 64px;
  margin-right: 1rem;
  margin-bottom: 0.75rem;
  padding: 0;
  border: 0;
  background: transparent;
  border-radius: 5px;
`;

const Palette = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type Props = {
  icon: string;
  setIcon: (icon: string) => void;
  color: string;
  setColor: (icon: string) => void;
  disabled: boolean;
};

const PredefinedAvatarSelector: FC<Props> = ({ icon, color, setIcon, setColor, disabled }) => {
  const [t] = useTranslation("plugins");
  const [avatarModal, setAvatarModal] = useState(false);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const renderIconPalette = (label: string, icons: string[]) => {
    return (
      <>
        <StyledLabel>{label}</StyledLabel>
        <Palette>
          {icons.map((iconName, index) => (
            <Chooser
              onClick={() => setIcon(iconName)}
              color="white"
              key={index}
              onKeyPress={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                if (event.key === "Enter") {
                  setIcon(iconName);
                  setAvatarModal(false);
                }
              }}
            >
              <PredefinedAvatar avatar={{ type: "PREDEFINED", iconName, color, _links: {} }} />
            </Chooser>
          ))}
        </Palette>
      </>
    );
  };

  return (
    <Selector>
      <AvatarPreview
        avatar={<PredefinedAvatar avatar={{ iconName: icon, color: color, type: "PREDEFINED", _links: {} }} />}
      />
      <Button
        color="info"
        action={() => setAvatarModal(true)}
        label={t("scm-repository-avatar-plugin.avatarSelector.avatarModal")}
        disabled={disabled}
      />
      <FullscreenModal
        body={
          <>
            <AvatarPreview
              avatar={<PredefinedAvatar avatar={{ iconName: icon, color: color, type: "PREDEFINED", _links: {} }} />}
              className="mr-4"
            />
            <hr />
            <StyledLabel>{t("scm-repository-avatar-plugin.avatarSelector.colors")}</StyledLabel>
            <Palette>
              {colors.map((c, index) => (
                <Chooser
                  onClick={() => setColor(c)}
                  ref={index === 0 ? initialFocusRef : undefined}
                  onKeyPress={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                    if (event.key === "Enter") {
                      setColor(c);
                      setAvatarModal(false);
                    }
                  }}
                >
                  <PredefinedAvatar avatar={{ iconName: icon, color: c, type: "PREDEFINED", _links: {} }} />
                </Chooser>
              ))}
            </Palette>
            <hr />
            {renderIconPalette(t("scm-repository-avatar-plugin.avatarSelector.icons.technology"), technologyIcons)}
            {renderIconPalette(t("scm-repository-avatar-plugin.avatarSelector.icons.business"), businessIcons)}
            {renderIconPalette(t("scm-repository-avatar-plugin.avatarSelector.icons.other"), otherIcons)}
          </>
        }
        active={avatarModal}
        title={t("scm-repository-avatar-plugin.avatarSelector.avatarModal")}
        closeFunction={() => setAvatarModal(false)}
        closeButtonLabel={t("scm-repository-avatar-plugin.avatarSelector.selectButton")}
        initialFocusRef={initialFocusRef}
      />
    </Selector>
  );
};

export default PredefinedAvatarSelector;
