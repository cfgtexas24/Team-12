"""
storm_platform index (main) view.

URLs include:
/accounts/create/
/accounts/edit/
/accounts/delete/
/accounts/password/
/accounts/auth/
"""
import flask
import storm_platform


@storm_platform.app.route('/accounts/create/')
def show_create():
    """Display /accounts/create route."""
    # if logged in go to /accounts/edit/
    if 'username' in flask.session:
        return flask.redirect(flask.url_for('show_edit'))
    return flask.render_template("create.html")


@storm_platform.app.route('/accounts/delete/')
def show_delete():
    """Display /accounts/delete/ route."""
    if 'username' not in flask.session:
        return flask.redirect(flask.url_for('show_login'))

    logname = flask.session["username"]
    context = {"logname": logname}
    context["logged_in"] = True
    return flask.render_template("delete.html", **context)


@storm_platform.app.route('/accounts/edit/')
def show_edit():
    """Display /accounts/edit/ route."""
    if 'username' not in flask.session:
        return flask.redirect(flask.url_for('show_login'))
    # Connect to database
    connection = storm_platform.model.get_db()
    logname = flask.session["username"]
    context = {"logname": logname}

    # Get user data
    cur = connection.execute(
        "SELECT * FROM users where username =?",
        (logname, )
    )

    user = cur.fetchone()

    context['user'] = user
    context["logged_in"] = True
    return flask.render_template("edit.html", **context)


@storm_platform.app.route('/accounts/password/')
def show_password():
    """Display /accounts/password/ route."""
    if 'username' not in flask.session:
        return flask.render_template('login.html')

    logname = flask.session["username"]
    context = {"logname": logname}
    context["logged_in"] = True
    return flask.render_template("password.html", **context)


@storm_platform.app.route('/accounts/auth/')
def account_auth():
    """Display /account/auth/ route."""
    if 'username' not in flask.session:
        flask.abort(403)

    return '', 200
