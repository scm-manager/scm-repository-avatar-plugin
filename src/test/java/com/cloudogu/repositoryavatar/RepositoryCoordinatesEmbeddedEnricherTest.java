package com.cloudogu.repositoryavatar;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sonia.scm.api.v2.resources.HalAppender;
import sonia.scm.api.v2.resources.HalEnricherContext;
import sonia.scm.repository.Repository;
import sonia.scm.repository.RepositoryCoordinates;
import sonia.scm.repository.RepositoryTestData;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RepositoryCoordinatesEmbeddedEnricherTest {

  @Mock
  private AvatarEnricher avatarEnricher;

  @InjectMocks
  private RepositoryCoordinatesEmbeddedEnricher enricher;

  @Mock
  private HalEnricherContext context;

  @Mock
  private HalAppender appender;

  @Test
  void shouldDelegate() {
    Repository repository = RepositoryTestData.createHeartOfGold();
    when(context.oneRequireByType(RepositoryCoordinates.class)).thenReturn(repository);

    enricher.enrich(context, appender);

    verify(avatarEnricher).enrich(appender, repository);
  }

}
