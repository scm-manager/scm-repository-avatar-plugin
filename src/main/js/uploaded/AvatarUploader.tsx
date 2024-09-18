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

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { FileUpload, Notification } from "@scm-manager/ui-components";
import { File as UploadFile, HalRepresentation, Link, Repository } from "@scm-manager/ui-types";
import { useTranslation } from "react-i18next";
import { fileSizeLimit, isFileExtensionInvalid } from "../avatars";
import styled from "styled-components";
import AvatarPreview from "../predefined/AvatarPreview";
import UploadedAvatar from "./UploadedAvatar";

const Wrapper = styled.div`
  div + div {
    margin-top: 1.5rem;
  }
`;

const Uploader = styled.div`
  display: flex;
  flex-direction: row;
  .file {
    width: 100%;
    align-self: flex-end;
  }
`;

type Props = {
  repository: Repository;
  file: UploadFile;
  setFile: (file: UploadFile) => void;
  disabled: boolean;
};

const AvatarUploader: FC<Props> = ({ repository, file, setFile, disabled }) => {
  const [t] = useTranslation("plugins");
  const [previewFile, setPreviewFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      if (previewFile) {
        reader.readAsDataURL(previewFile);
      }
    }
  }, [file]);

  return (
    <Wrapper>
      <Uploader>
        <div>
          <AvatarPreview
            avatar={
              <UploadedAvatar
                imageLink={
                  imagePreviewUrl ||
                  ((repository?._embedded?.avatar as HalRepresentation)?._links?.avatar as Link)?.href
                }
              />
            }
          />
        </div>
        {repository?._links?.updateAvatar && (
          <FileUpload
            handleFile={(file: File, event: ChangeEvent<HTMLInputElement>) => {
              setFile(file);
              setPreviewFile(event?.target?.files![0] as File);
            }}
            filenamePlaceholder={t("scm-repository-avatar-plugin.avatarConfig.uploadInfo")}
            disabled={!repository._links.updateAvatar}
          />
        )}
      </Uploader>

      {file?.size > fileSizeLimit && (
        <Notification type="danger">{t("scm-repository-avatar-plugin.avatarConfig.uploadLimit")}</Notification>
      )}
      {isFileExtensionInvalid(file?.name) && (
        <Notification type="danger">{t("scm-repository-avatar-plugin.avatarConfig.invalidImageFormat")}</Notification>
      )}
    </Wrapper>
  );
};

export default AvatarUploader;
