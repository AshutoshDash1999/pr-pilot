export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};
export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};
export const isMac = () => {
  return process.platform === 'darwin';
};
export const isWin = () => {
  return process.platform === 'win32';
};
export const isLinux = () => {
  return process.platform === 'linux';
};
