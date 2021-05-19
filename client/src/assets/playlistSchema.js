import * as yup from 'yup';

// Yup Form Validation Schema
const schema = yup.object().shape({
  playlistName: yup.string().required('Playlist name is required.').nullable(),
  description: yup.string().nullable(),
  privacy: yup.boolean().nullable(),
  genre: yup.string().required('Genre is required').nullable(),
  numSongs: yup.string().required('Number of songs is required.').nullable(),
});

export { schema };
