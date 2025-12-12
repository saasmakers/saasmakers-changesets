module.exports = {
  getVersionMessage: async (releasePlan) => {
    const packages = releasePlan.releases
      .map((release) => release.name)
      .filter(Boolean);
    
    return packages.length
      ? `chore(packages): version ${packages.join(', ')}`
      : 'chore(packages): version packages';
  },
};
