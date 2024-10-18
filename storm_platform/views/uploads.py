"""
storm_platform image loader.

URLs include:
/uploads/<string:filename>
"""
import os
import flask
import storm_platform


# Route to serve uploaded files
@storm_platform.app.route('/uploads/<string:filename>')
def get_image(filename):
    """Display /uploads/<img_url>/ route."""
    if 'username' not in flask.session:
        flask.abort(403)
    else:
        directory = storm_platform.app.config['UPLOAD_FOLDER']

        if not os.path.exists(directory):
            flask.abort(404)

        # Check if the file exists
        file_path = os.path.join(directory, filename)
        if not os.path.isfile(file_path):
            flask.abort(404)  # Return a 404 error if the file does not exist

        return flask.send_from_directory(
            directory, filename, as_attachment=False
        )
