"""Views, one for each storm_platform page."""
from storm_platform.views.index import show_index
from storm_platform.views.uploads import get_image
from storm_platform.views.login import show_login, login, logout
from storm_platform.views.accounts import show_create, show_delete
from storm_platform.views.accounts import show_edit, show_password, account_auth
