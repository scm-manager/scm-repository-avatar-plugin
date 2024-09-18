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

import de.otto.edison.hal.Links;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ObjectFactory;
import sonia.scm.api.v2.resources.LinkBuilder;
import sonia.scm.api.v2.resources.ScmPathInfoStore;
import sonia.scm.repository.RepositoryCoordinates;

import jakarta.inject.Inject;
import jakarta.inject.Provider;

import static de.otto.edison.hal.Link.link;
import static de.otto.edison.hal.Links.linkingTo;

@Mapper
public abstract class AvatarMapper {

  @Inject
  Provider<ScmPathInfoStore> scmPathInfoStore;

  @Mapping(target = "attributes", ignore = true)
  abstract AvatarDto map(@Context RepositoryCoordinates repository, Avatar avatar);

  @ObjectFactory
  AvatarDto createDto(@Context RepositoryCoordinates repository, Avatar avatar) {
    if (avatar.getType() == AvatarType.UPLOADED) {
      Links.Builder links = linkingTo()
        .single(link("avatar", createAvatarLink(repository)));
      return new AvatarDto(links.build());
    }
    return new AvatarDto();
  }

  private String createAvatarLink(@Context RepositoryCoordinates repository) {
    return new LinkBuilder(scmPathInfoStore.get().get(), AvatarResource.class)
      .method("getUploadedAvatar")
      .parameters(repository.getNamespace(), repository.getName())
      .href();
  }
}
