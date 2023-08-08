const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

try {
  const images = core.getInput('images').split(/\s+/);
  const sha = github.context.sha;
  const ref = github.context.ref_name;

  // Extract major and minor version
  const major_minor = ref.substring(0, ref.lastIndexOf('.'));
  // Find the latest Git tag
  const latest_tag = execSync('git tag --sort=version:refname | tail -n 1').toString().trim();

  console.log(`GITHUB_REF_NAME=${GITHUB_REF_NAME}`);
  console.log(`major_minor=${major_minor}`);
  console.log(`latest_tag=${latest_tag}`);
  console.log(`images=${images}`);

  const tags = [];
  images.forEach(image => {
    console.log(`image=${image}`);
    tags.push(`${image}:${GITHUB_SHA}`);
    tags.push(`${image}:${GITHUB_REF_NAME}`);
  
    if (latest_tag === '' || GITHUB_REF_NAME === latest_tag) {
      tags.push(`${image}:${major_minor}`);
      tags.push(`${image}:latest`);
    }
  });
  console.log(`tags=${tags.join(',')}`);
  core.setOutput("tags", tags);
} catch (error) {
  core.setFailed(error.message);
}
