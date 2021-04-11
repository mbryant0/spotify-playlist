package com.mbryant.spotifyplaylistgenerator.repositories;

import com.mbryant.spotifyplaylistgenerator.models.Track;
import org.springframework.data.repository.CrudRepository;

public interface TrackRepository extends CrudRepository<Track, Long>
{
}
