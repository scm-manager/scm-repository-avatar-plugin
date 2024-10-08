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

import React, { FC, useState } from "react";
import { Link, Repository, File } from "@scm-manager/ui-types";
import {
  apiClient,
  ErrorNotification,
  Level,
  Notification,
  Select,
  SubmitButton,
  Subtitle
} from "@scm-manager/ui-components";
import { useTranslation } from "react-i18next";
import { colors, fileSizeLimit, isFileExtensionInvalid, Avatar, technologyIcons, AvatarType } from "./avatars";
import AvatarForms from "./AvatarForms";

type Props = {
  repository: Repository;
};

const AvatarConfig: FC<Props> = ({ repository }) => {
  const [t] = useTranslation("plugins");
  const oldAvatar = repository?._embedded?.avatar as Avatar;
  const [avatarType, setAvatarType] = useState<AvatarType>(oldAvatar.type);
  const [submitNotification, setSubmitNotification] = useState(false);
  const [color, setColor] = useState(oldAvatar.color || colors[0]);
  const [icon, setIcon] = useState(oldAvatar.iconName || technologyIcons[0]);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<Error | undefined>();

  const changeAvatarType = (value: AvatarType) => {
    if (value) {
      setAvatarType(value);
    }
  };

  const getAvatarLinkByName = (name: string) => {
    return (repository._links.updateAvatar as Link[]).filter(link => link.name === name)[0].href;
  };

  const submitAvatar = () => {
    setSubmitNotification(false);
    if (avatarType === "AUTO_GENERATED") {
      apiClient
        .post(getAvatarLinkByName("autoGenerated"))
        .then(() => setSubmitNotification(true))
        .catch(setError);
    }
    if (avatarType === "PREDEFINED") {
      apiClient
        .post(
          getAvatarLinkByName("predefined"),
          { iconName: icon, color },
          "application/vnd.scmm-repository-avatar+json"
        )
        .then(() => setSubmitNotification(true))
        .catch(setError);
    }
    if (avatarType === "UPLOADED") {
      apiClient
        .postBinary(getAvatarLinkByName("upload"), formData => {
          formData.append("file", file);
        })
        .then(() => setSubmitNotification(true))
        .catch(setError);
    }
  };

  const renderNotifications = () => {
    if (submitNotification) {
      return (
        <Notification onClose={() => setSubmitNotification(false)}>
          {t("scm-repository-avatar-plugin.avatarConfig.submitNotification")}
        </Notification>
      );
    }
    if (error) {
      return <ErrorNotification error={error} />;
    }
  };

  const isValid = () => {
    if (!repository?._links.updateAvatar) {
      return false;
    }
    if (avatarType === "UPLOADED" && file) {
      return file.size < fileSizeLimit && !isFileExtensionInvalid(file.name);
    } else {
      return true;
    }
  };

  if (!repository) {
    return null;
  }

  return (
    <>
      <hr />
      <Subtitle subtitle={t("scm-repository-avatar-plugin.avatarConfig.subtitle")} />
      <Select
        label={t("scm-repository-avatar-plugin.avatarTypes.label")}
        options={[
          { label: t("scm-repository-avatar-plugin.avatarTypes.auto.label"), value: "AUTO_GENERATED" },
          { label: t("scm-repository-avatar-plugin.avatarTypes.predefined.label"), value: "PREDEFINED" },
          { label: t("scm-repository-avatar-plugin.avatarTypes.uploaded.label"), value: "UPLOADED" }
        ]}
        onChange={value => changeAvatarType(value as AvatarType)}
        value={avatarType}
        name={avatarType}
        disabled={!repository._links.update}
      />
      <AvatarForms
        repository={repository}
        avatarType={avatarType}
        icon={icon}
        setIcon={setIcon}
        color={color}
        setColor={setColor}
        file={file}
        setFile={setFile}
      />
      {renderNotifications()}
      <Level
        right={
          <SubmitButton
            disabled={!isValid() || (avatarType === "UPLOADED" && !file)}
            label={t("scm-repository-avatar-plugin.avatarConfig.submit")}
            action={() => submitAvatar()}
            scrollToTop={false}
          />
        }
      />
    </>
  );
};

export default AvatarConfig;
