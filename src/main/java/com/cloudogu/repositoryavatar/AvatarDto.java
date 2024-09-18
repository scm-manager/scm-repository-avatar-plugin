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

import com.fasterxml.jackson.annotation.JsonInclude;
import de.otto.edison.hal.HalRepresentation;
import de.otto.edison.hal.Links;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@SuppressWarnings("squid:S2160") // we do not need equals for dto
public class AvatarDto extends HalRepresentation {

  private AvatarType type;
  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private String iconName;
  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private String color;

  AvatarDto() {}

  public AvatarDto(Links links) {
    super(links);
  }
  }
