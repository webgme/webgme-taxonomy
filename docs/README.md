## Generating locally

```
make html
```

### Setting up python3 and virtual env

Make sure you've got python ~= 3.11 (see version in .readthedocs.yml) installed
together with pip. Then install
[virtualenv](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
and create a `venv` for this project (this is done once). Perform these commands
from the root-dir of this project (where this file is)

1. `pip install virtualenv` - Install the python package ("globally").
1. `python3 -m virtualenv venv` - Create the virtual environment for this
   project.
1. `source venv/bin/activate` - Activate the virtual environment (for windows
   there is a .bat).
1. `which python` - Should point to `./venv/bin/python`.
1. `pip install -r requirements.txt` - Installs the dependencies for this
   project.
