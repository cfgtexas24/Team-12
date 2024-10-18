"""storm_platform package initializer."""
import flask

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name

# Read settings from config module (storm_platform/config.py)
app.config.from_object('storm_platform.config')

# Overlay settings read from a Python file whose path is set in the environment
# variable storm_platform_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export storm_platform_SETTINGS=secret_key_config.py
app.config.from_envvar('storm_platform_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import storm_platform.views  # type: ignore # noqa: E402  pylint: disable=wrong-import-position
import storm_platform.model  # type: ignore # noqa: E402  pylint: disable=wrong-import-position
