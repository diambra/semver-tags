# Semver Tags Action

The Semver Tags Action is designed to calculate container image tags based on semantic versioning (semver). It helps in automatically generating appropriate tags for container images based on Git reference names, SHA hashes, and Git tags.

## Inputs

### `images`

**Required** - A whitespace-separated list of image names that you want to tag. This input will be processed to generate tags based on the rules defined in the action.

Example:

```yaml
inputs:
  images: 'image1 image2'
```

## Outputs

### `tags`

The generated tags that should be applied to the specified images.

## Example Usage

Here's an example of how you can use the Semver Tags Action in your GitHub Actions workflow:

```yaml
- name: Generate Semver Tags
  uses: diambra/semver-tags-action@v1
  with:
    images: 'myrepo/myimage anotherrepo/anotherimage'
```

## Implementation Details

The action retrieves the images from the input, along with the Git SHA and reference name. It then calculates the major and minor versions and the latest Git tag. Tags are created based on these details, following specific rules.

- Always tags with SHA and reference name.
- If there's no latest tag, or the latest tag matches the version, the image is tagged with the major and minor version, as well as the "latest" tag.

The tags are then set as an output and can be used in subsequent steps in your workflow.

## Running the Action Locally

You can test the action locally by ensuring that the appropriate environment variables are set. Refer to the code in `index.js` for details on the expected inputs and the logic behind the tag generation.