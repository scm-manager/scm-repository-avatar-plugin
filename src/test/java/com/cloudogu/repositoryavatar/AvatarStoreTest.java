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

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import sonia.scm.repository.Repository;
import sonia.scm.repository.RepositoryTestData;
import sonia.scm.store.InMemoryDataStore;
import sonia.scm.store.InMemoryDataStoreFactory;

import static org.assertj.core.api.Assertions.assertThat;

class AvatarStoreTest {

  private static final Repository REPOSITORY = RepositoryTestData.createHeartOfGold();

  private AvatarStore store;

  @BeforeEach
  void init() {
    InMemoryDataStore<Avatar> dataStore = new InMemoryDataStore<>();
    store = new AvatarStore(new InMemoryDataStoreFactory(dataStore));
  }

  @Test
  void shouldReturnAutoGeneratedAvatarIfNoAvatarSavedYet() {
    Avatar avatar = store.getAvatar(REPOSITORY);

    assertThat(avatar.getType()).isEqualTo(AvatarType.AUTO_GENERATED);
  }

  @Test
  void shouldSaveAutoGeneratedAvatar() {
    store.saveAvatar(REPOSITORY, Avatar.autoGenerated());

    Avatar storedAvatar = store.getAvatar(REPOSITORY);

    assertThat(storedAvatar.getType()).isEqualTo(AvatarType.AUTO_GENERATED);
  }

  @Test
  void shouldSavePredefinedAvatar() {
    store.saveAvatar(REPOSITORY, Avatar.predefined("fish", "blue"));

    Avatar storedAvatar = store.getAvatar(REPOSITORY);

    assertThat(storedAvatar.getType()).isEqualTo(AvatarType.PREDEFINED);
    assertThat(storedAvatar.getColor()).isEqualTo("blue");
    assertThat(storedAvatar.getIconName()).isEqualTo("fish");
  }

  @Test
  void shouldUploadedAvatar() {
    byte[] imageBytes = "image".getBytes();
    store.saveAvatar(REPOSITORY, Avatar.uploaded(imageBytes, "png"));

    Avatar storedAvatar = store.getAvatar(REPOSITORY);

    assertThat(storedAvatar.getType()).isEqualTo(AvatarType.UPLOADED);
    assertThat(storedAvatar.getImage()).isEqualTo(imageBytes);
    assertThat(storedAvatar.getMediaType()).isEqualTo("png");
  }
}
