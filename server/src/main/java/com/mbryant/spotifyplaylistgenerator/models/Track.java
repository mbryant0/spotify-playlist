package com.mbryant.spotifyplaylistgenerator.models;

import javax.persistence.*;

@Entity
@Table(name = "tracks")
public class Track
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long trackid;

    @Column
    private String trackname;

    @Column
    private String artistname;

    @Column
    private int tempo;

    @Column
    private int numyear;
}
