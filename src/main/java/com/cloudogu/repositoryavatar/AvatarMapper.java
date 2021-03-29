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
package com.cloudogu.repositoryavatar;

import com.google.common.annotations.VisibleForTesting;
import de.otto.edison.hal.Links;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ObjectFactory;
import sonia.scm.api.v2.resources.LinkBuilder;
import sonia.scm.api.v2.resources.ScmPathInfoStore;
import sonia.scm.repository.Repository;

import javax.inject.Inject;
import javax.inject.Provider;

import static de.otto.edison.hal.Link.link;
import static de.otto.edison.hal.Links.linkingTo;

@Mapper
public abstract class AvatarMapper {

  @Inject
  Provider<ScmPathInfoStore> scmPathInfoStore;

  @Mapping(target = "attributes", ignore = true)
  abstract AvatarDto map(@Context Repository repository, Avatar avatar);

  @ObjectFactory
  AvatarDto createDto(@Context Repository repository, Avatar avatar) {

    if (avatar.getType() == AvatarType.UPLOADED) {

      Links.Builder links = linkingTo()
        .single(link("avatar", createAvatarLink(repository)));
      return new AvatarDto(links.build());
    }
    return new AvatarDto();
  }

  private String createAvatarLink(@Context Repository repository) {
    return new LinkBuilder(scmPathInfoStore.get().get(), AvatarResource.class)
      .method("getUploadedAvatar")
      .parameters(repository.getNamespace(), repository.getName())
      .href();
  }
}
