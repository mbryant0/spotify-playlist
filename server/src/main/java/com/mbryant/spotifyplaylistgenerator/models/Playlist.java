package com.mbryant.spotifyplaylistgenerator.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long playlistid;

    @Column(nullable = false)
    private String playlistname;

    @Column
    private boolean playlistprivacy;

    @Column
    private String description;

    @Column
    private int numtracks;

    @Column
    private int lowtempo;

    @Column
    private int hightempo;

    @Column
    private int lowyear;

    @Column
    private int highyear;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Track> tracks = new ArrayList<>();

    public Playlist()
    {
    }


}
