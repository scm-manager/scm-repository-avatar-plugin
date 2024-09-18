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

package com.cloudogu.repositoryavatar;

import sonia.scm.api.v2.resources.HalAppender;
import sonia.scm.repository.RepositoryCoordinates;

import jakarta.inject.Inject;

public class AvatarEnricher {

  private final AvatarStore avatarStore;
  private final AvatarMapper mapper;

  @Inject
  public AvatarEnricher(AvatarStore avatarStore, AvatarMapper mapper) {
    this.avatarStore = avatarStore;
    this.mapper = mapper;
  }

  public void enrich(HalAppender appender, RepositoryCoordinates repository) {
    AvatarDto dto = mapper.map(repository, avatarStore.getAvatar(repository));
    appender.appendEmbedded("avatar", dto);
  }
}
