export const getDomain = (stage: string) => {
  return stage === 'production' ? 'posts-app.stacktape.com' : `${stage}-posts-app.stacktape.com`;
};
