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
              className="button"
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
                  className="button"
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
