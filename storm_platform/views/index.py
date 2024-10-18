"""
storm_platform index (main) view.

URLs include:
/
"""
import flask
import storm_platform


@storm_platform.app.route('/')
def show_index():
    """Display / route."""
    if 'username' not in flask.session:
        return flask.redirect(flask.url_for('show_login'))

    logname = flask.session["username"]
    context = {"logname": logname}
    context["logged_in"] = True
    return flask.render_template("index.html", **context)

