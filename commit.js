module.exports = {
  getVersionMessage: async (releasePlan) => {
    // Get packages that have explicit changesets (not just dependency updates)
    // releasePlan.changesets contains the changesets being applied
    const packagesWithChangesets = new Set();
    
    if (releasePlan.changesets && Array.isArray(releasePlan.changesets)) {
      releasePlan.changesets.forEach((changeset) => {
        if (changeset.releases && Array.isArray(changeset.releases)) {
          changeset.releases.forEach((release) => {
            if (release.name) {
              packagesWithChangesets.add(release.name);
            }
          });
        }
      });
    }
    
    // If we found packages with explicit changesets, use those
    // Otherwise fall back to all releases (for backwards compatibility)
    const packages = packagesWithChangesets.size > 0
      ? Array.from(packagesWithChangesets).sort()
      : releasePlan.releases
          .map((release) => release.name)
          .filter(Boolean)
          .sort();
    
    return packages.length
      ? `chore(packages): version ${packages.join(', ')}`
      : 'chore(packages): version packages';
  },
};
