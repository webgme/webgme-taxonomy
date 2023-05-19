# Notes

## Action Items

- [ ] Process existing CI to identify existing state*
- [ ] Identify CI axes*
    - [ ] Target Persistance Layers
    - [ ] Target Hosting Platforms
    - [ ] Target Node Versions
    - [ ] Identify Testing Groups
        - [ ] Smoke Test
        - [ ] CI Testing
        - [ ] Component Testing (e.g., domain activity, such as logging, UI, data access, etc.)
- [ ] Review caching options**
- [ ] Investigate construction of docker images for hosting pre-built environments (e.g., pre-constructed data)*
- [ ] Investigate leveraging dockerized images in GitHub actions*
- [ ] Investigate value of custom GitHub actions for common activities (e.g., pulling pre-built dockerized image)**

Notes:

_\* Primary Items_<br/>
_\*\* Secondary Items_

## GitHub Actions Steps

### Conditional on user interaction wtih github

<pre>
# if: ${{ github.actor != 'dax-westerman'}}
  #   steps:
</pre>