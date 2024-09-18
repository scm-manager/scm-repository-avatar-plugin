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

import sonia.scm.api.v2.resources.Enrich;
import sonia.scm.api.v2.resources.HalAppender;
import sonia.scm.api.v2.resources.HalEnricher;
import sonia.scm.api.v2.resources.HalEnricherContext;
import sonia.scm.plugin.Extension;
import sonia.scm.repository.RepositoryCoordinates;

import jakarta.inject.Inject;

@Extension
@Enrich(RepositoryCoordinates.class)
public class RepositoryCoordinatesEmbeddedEnricher implements HalEnricher {

  private final AvatarEnricher enricher;

  @Inject
  public RepositoryCoordinatesEmbeddedEnricher(AvatarEnricher enricher) {
    this.enricher = enricher;
  }

  @Override
  public void enrich(HalEnricherContext context, HalAppender appender) {
    RepositoryCoordinates repository = context.oneRequireByType(RepositoryCoordinates.class);
    enricher.enrich(appender, repository);
  }
}
