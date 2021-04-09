package com.mbryant.spotifyplaylistgenerator.repositories;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;
import org.springframework.data.repository.CrudRepository;

public interface PlaylistRepository extends CrudRepository<Playlist, Long>
{
}
