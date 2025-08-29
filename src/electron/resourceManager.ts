import osUtils from 'os-utils';

export const getCPUUsage = () => {
  return new Promise(resolve => {
    osUtils.cpuUsage(resolve);
  });
};

export const getRAMUsage = () => {
  return 1 - osUtils.freememPercentage();
};
