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
