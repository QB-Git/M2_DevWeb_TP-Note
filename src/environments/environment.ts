export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      toutesLesMusiques: '/musics',
      musiqueAleatoire: '/musics/random',
      uneMusique: '/musics/:id',
      filterByTitle: '/musics/title/:title'
    }
  }
};
